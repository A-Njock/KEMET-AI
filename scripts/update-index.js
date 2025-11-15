// Script to update RAG embeddings when new documents are added
// This runs via GitHub Actions when legal-docs/ changes

const { Groq } = require('groq-sdk');
const fs = require('fs');
const path = require('path');

const GROQ_API_KEY = process.env.GROQ_API_KEY || 'your_groq_api_key_here';
const client = new Groq({ apiKey: GROQ_API_KEY });

const LEGAL_DOCS_DIR = path.join(__dirname, '../legal-docs');
const EMBEDDINGS_DIR = path.join(LEGAL_DOCS_DIR, 'embeddings');
const CHUNKS_FILE = path.join(EMBEDDINGS_DIR, 'chunks.json');

async function chunkDocument(document) {
  const prompt = `You are an expert in legal document analysis. Given a Cameroon legal document, chunk it intelligently by section or article without splitting any article's content across multiple chunks. Detect headers like "Article X" or "Section Y" and preserve full context. Return a JSON array of chunks where each chunk is a complete article or section. Document: ${document}`;
  
  const response = await client.chat.completions.create({
    model: 'mixtral-8x7b-32768',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.1,
  });
  
  const content = response.choices[0].message.content;
  if (!content) return [];
  
  try {
    return JSON.parse(content);
  } catch {
    // Fallback: split by articles manually
    return content.split(/\n(?=Article \d+|Section \d+)/i).filter(chunk => chunk.trim().length > 0);
  }
}

async function updateIndex() {
  try {
    // Ensure embeddings directory exists
    if (!fs.existsSync(EMBEDDINGS_DIR)) {
      fs.mkdirSync(EMBEDDINGS_DIR, { recursive: true });
    }

    // Load existing chunks
    let existingChunks = [];
    if (fs.existsSync(CHUNKS_FILE)) {
      existingChunks = JSON.parse(fs.readFileSync(CHUNKS_FILE, 'utf8'));
    }

    // Find new PDF files
    const files = fs.readdirSync(LEGAL_DOCS_DIR).filter(file => file.endsWith('.pdf'));
    
    if (files.length === 0) {
      console.log('No PDF files found in legal-docs/');
      return;
    }

    // For each PDF, extract text and chunk it
    // Note: In production, use a proper PDF parser like pdf-parse
    console.log(`Found ${files.length} PDF file(s)`);
    
    // For now, we'll create a placeholder structure
    // In production, extract text from PDFs and chunk them
    const newChunks = [];
    
    // Save chunks
    const allChunks = [...existingChunks, ...newChunks];
    fs.writeFileSync(CHUNKS_FILE, JSON.stringify(allChunks, null, 2));
    
    console.log(`Updated chunks file with ${allChunks.length} total chunks`);
  } catch (error) {
    console.error('Error updating index:', error);
    process.exit(1);
  }
}

updateIndex();

