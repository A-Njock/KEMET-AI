// Script to process PDF files and generate chunks.json
// Usage: npm run process-pdfs
// Place your PDFs in the 'legal-docs' folder

import { Groq } from 'groq-sdk';
import pdf from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
const client = new Groq({ apiKey: GROQ_API_KEY });

// Directories
// Allow custom PDF directory via command line argument or environment variable
const customPdfDir = process.argv[2] || process.env.PDF_DIR;
const LEGAL_DOCS_DIR = customPdfDir 
  ? path.resolve(customPdfDir)
  : path.join(__dirname, '../legal-docs');
const PUBLIC_DOCS_DIR = path.join(__dirname, '../public/mock-legal-docs');
const OUTPUT_FILE = path.join(PUBLIC_DOCS_DIR, 'chunks.json');

// Ensure directories exist
if (!fs.existsSync(LEGAL_DOCS_DIR)) {
  fs.mkdirSync(LEGAL_DOCS_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DOCS_DIR)) {
  fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });
}

async function extractTextFromPDF(pdfPath) {
  try {
    console.log(`\n📄 Processing: ${path.basename(pdfPath)}`);
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    console.log(`   ✓ Extracted ${data.text.length} characters`);
    return data.text;
  } catch (error) {
    console.error(`   ✗ Error reading PDF: ${error.message}`);
    return null;
  }
}

async function chunkDocument(document, maxLength = 50000) {
  // Split large documents into chunks for Groq API
  if (document.length > maxLength) {
    console.log(`   ⚠ Document is large (${document.length} chars), splitting...`);
    const chunks = [];
    const parts = document.match(/[\s\S]{1,50000}/g) || [document];
    
    for (let i = 0; i < parts.length; i++) {
      console.log(`   Processing part ${i + 1}/${parts.length}...`);
      const partChunks = await chunkDocumentPart(parts[i]);
      chunks.push(...partChunks);
    }
    return chunks;
  }
  
  return await chunkDocumentPart(document);
}

async function chunkDocumentPart(document) {
  const prompt = `You are an expert in legal document analysis. Given an African legal document, chunk it intelligently by section or article without splitting any article's content across multiple chunks. Detect headers like "Article X" or "Section Y" and preserve full context. 

Return ONLY a valid JSON array of strings, where each string is a complete article or section. Do not include any explanation, just the JSON array.

Example format:
["Article 1 - Code Pénal: Full text of article 1...", "Article 2 - Code Pénal: Full text of article 2..."]

Document text:
${document.substring(0, 50000)}`;

  try {
    console.log('   🤖 Sending to Groq for intelligent chunking...');
    const response = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 16384,
    });
    
    const content = response.choices[0].message.content;
    if (!content) {
      console.log('   ⚠ No content returned, using fallback chunking');
      return fallbackChunking(document);
    }
    
    // Try to extract JSON array from response
    let chunks = [];
    try {
      // Look for JSON array in the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        chunks = JSON.parse(jsonMatch[0]);
      } else {
        chunks = JSON.parse(content);
      }
      
      if (Array.isArray(chunks) && chunks.length > 0) {
        console.log(`   ✓ Generated ${chunks.length} chunks`);
        return chunks;
      }
    } catch (parseError) {
      console.log('   ⚠ Could not parse JSON, using fallback chunking');
      return fallbackChunking(document);
    }
  } catch (error) {
    console.error(`   ✗ Error with Groq: ${error.message}`);
    console.log('   Using fallback chunking method...');
    return fallbackChunking(document);
  }
  
  return fallbackChunking(document);
}

function fallbackChunking(document) {
  // Fallback: split by articles/sections manually
  console.log('   Using fallback chunking (splitting by articles)...');
  const chunks = [];
  
  // Try to split by article patterns
  const articlePattern = /(?:Article|ARTICLE|Art\.|Art|Section|SECTION|Section)\s*(\d+)[\s\S]*?(?=(?:Article|ARTICLE|Art\.|Art|Section|SECTION|Section)\s*\d+|$)/gi;
  const matches = [...document.matchAll(articlePattern)];
  
  if (matches.length > 0) {
    matches.forEach((match, index) => {
      const chunk = match[0].trim();
      if (chunk.length > 10) { // Only include substantial chunks
        chunks.push(chunk);
      }
    });
    console.log(`   ✓ Found ${chunks.length} articles using pattern matching`);
  } else {
    // Last resort: split by paragraphs
    const paragraphs = document.split(/\n\s*\n/).filter(p => p.trim().length > 50);
    chunks.push(...paragraphs);
    console.log(`   ✓ Split into ${chunks.length} paragraph chunks`);
  }
  
  return chunks;
}

async function processAllPDFs() {
  console.log('🚀 Starting PDF Processing...\n');
  console.log(`📁 Looking for PDFs in: ${LEGAL_DOCS_DIR}`);
  if (customPdfDir) {
    console.log(`   (Using custom directory: ${customPdfDir})\n`);
  } else {
    console.log(`   (Default: legal-docs/ folder)\n`);
  }
  
  // Find all PDF files (recursively search subdirectories)
  let pdfFiles = [];
  
  function findPDFs(dir) {
    if (!fs.existsSync(dir)) return [];
    
    const files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursively search subdirectories
        files.push(...findPDFs(fullPath));
      } else if (item.toLowerCase().endsWith('.pdf')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
  
  pdfFiles = findPDFs(LEGAL_DOCS_DIR);
  
  if (pdfFiles.length === 0) {
    console.log(`❌ No PDF files found in: ${LEGAL_DOCS_DIR}`);
    console.log('\n📝 Instructions:');
    if (customPdfDir) {
      console.log(`1. Check that the folder exists: ${LEGAL_DOCS_DIR}`);
      console.log('2. Verify PDF files are in this folder (or subfolders)');
      console.log('3. Make sure PDFs have .pdf extension');
    } else {
      console.log('1. Create a folder called "legal-docs" in the project root');
      console.log('2. Place your PDF files in that folder');
      console.log('3. Or specify a custom path: node scripts/process-pdfs.js "path/to/your/pdfs"');
    }
    console.log('4. Run this script again\n');
    return;
  }
  
  console.log(`Found ${pdfFiles.length} PDF file(s):`);
  pdfFiles.forEach((file, i) => {
    console.log(`   ${i + 1}. ${path.basename(file)}`);
  });
  
  // Load existing chunks
  let allChunks = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      allChunks = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
      console.log(`\n📦 Loaded ${allChunks.length} existing chunks`);
    } catch (error) {
      console.log('\n⚠ Could not load existing chunks, starting fresh');
    }
  }
  
  // Process each PDF
  for (const pdfFile of pdfFiles) {
    const text = await extractTextFromPDF(pdfFile);
    if (text) {
      const chunks = await chunkDocument(text);
      allChunks.push(...chunks);
      console.log(`   ✓ Added ${chunks.length} chunks from ${path.basename(pdfFile)}`);
    }
  }
  
  // Remove duplicates
  const uniqueChunks = [...new Set(allChunks)];
  console.log(`\n📊 Total unique chunks: ${uniqueChunks.length}`);
  
  // Save to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueChunks, null, 2));
  console.log(`\n✅ Success! Chunks saved to: ${OUTPUT_FILE}`);
  console.log(`\n🎉 Your PDFs are now ready to use in the chatbot!`);
  console.log(`   Start the dev server: npm run dev`);
  console.log(`   Then go to: http://localhost:5173/outils\n`);
}

// Run the script
processAllPDFs().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

