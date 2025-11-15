import { Groq } from 'groq-sdk';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
const client = new Groq({ apiKey: GROQ_API_KEY });

export async function chunkDocument(document: string): Promise<string[]> {
  const prompt = `You are an expert in legal document analysis. Given a Cameroon legal document, chunk it intelligently by section or article without splitting any article's content across multiple chunks. Detect headers like "Article X" or "Section Y" and preserve full context. Return a JSON array of chunks where each chunk is a complete article or section. Document: ${document}`;
  
  try {
    const response = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
    });
    
    const content = response.choices[0].message.content;
    if (!content) return [];
    
    // Try to parse as JSON array
    try {
      return JSON.parse(content);
    } catch {
      // If not JSON, split by articles manually
      return content.split(/\n(?=Article \d+|Section \d+)/i).filter(chunk => chunk.trim().length > 0);
    }
  } catch (error) {
    console.error('Error chunking document:', error);
    return [];
  }
}

export async function generateResponse(
  query: string, 
  retrievedChunks: string[], 
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<string> {
  if (!retrievedChunks || retrievedChunks.length === 0) {
    return `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`;
  }

  const chunksText = retrievedChunks.join('\n\n---\n\n');
  
  // Build conversation context
  const conversationContext = conversationHistory.length > 0
    ? '\n\nContexte de la conversation précédente:\n' + 
      conversationHistory.slice(-4).map(msg => `${msg.role}: ${msg.content}`).join('\n')
    : '';

  const prompt = `Tu es un expert juridique répondant aux questions sur le droit camerounais en te basant UNIQUEMENT sur les extraits de documents fournis.

RÈGLES CRITIQUES - SUIS CES RÈGLES EXACTEMENT:
1. Tu DOIS baser ta réponse UNIQUEMENT sur les extraits de documents fournis. N'utilise AUCUNE connaissance externe.
2. Toujours fournir les numéros d'articles ou de sections exacts dans ta réponse (ex: "Selon l'Article 82 du Code Pénal...").
3. Après ta réponse, suggérer des articles similaires qui complètent ou contredisent la réponse (ex: "Articles similaires: Article 83 (complémentaire), Article 90 (contradictoire)").
4. Si la réponse ne peut PAS être trouvée dans les extraits fournis, répondre EXACTEMENT: "Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle." avec un lien vers /formations.
5. Si la question actuelle se rapporte aux questions précédentes dans la conversation, les référencer de manière appropriée.
6. Sois précis, cite les sources, et fournis des informations juridiques complètes.
7. Réponds EN FRANÇAIS, de manière professionnelle et claire.

Question actuelle: ${query}
${conversationContext}

Extraits de documents (utilise UNIQUEMENT ceux-ci):
${chunksText}

Fournis ta réponse maintenant:`;

  try {
    const response = await client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });
    
    return response.choices[0].message.content || 'Erreur lors de la génération de la réponse.';
  } catch (error) {
    console.error('Error generating response:', error);
    return `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`;
  }
}

// Improved similarity search with better matching
export function findRelevantChunks(query: string, chunks: string[], maxResults: number = 5): string[] {
  if (!chunks || chunks.length === 0) {
    console.warn('No chunks provided to findRelevantChunks');
    return [];
  }

  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2);
  
  const scoredChunks = chunks.map((chunk, index) => {
    if (!chunk || typeof chunk !== 'string') {
      return { chunk: '', score: -1, index };
    }
    
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    
    // Exact phrase matching (highest priority)
    if (chunkLower.includes(queryLower)) {
      score += 10;
    }
    
    // Word matching with frequency
    queryWords.forEach(word => {
      const wordCount = (chunkLower.match(new RegExp(word, 'g')) || []).length;
      score += wordCount * 2;
    });
    
    // Boost for legal terms
    const legalTerms = ['article', 'section', 'code', 'loi', 'droit', 'juridique', 'pénal', 'civil'];
    legalTerms.forEach(term => {
      if (chunkLower.includes(term)) {
        score += 1;
      }
    });
    
    // Boost if query mentions article numbers and chunk has them
    const articleMatch = query.match(/(?:article|art\.?)\s*(\d+)/i);
    if (articleMatch) {
      const articleNum = articleMatch[1];
      if (chunkLower.includes(`article ${articleNum}`) || chunkLower.includes(`art. ${articleNum}`)) {
        score += 20; // Very high boost for exact article match
      }
    }
    
    // Boost for longer, more complete chunks (likely more informative)
    if (chunk.length > 100) {
      score += 1;
    }
    
    return { chunk, score, index };
  });
  
  // Filter out invalid chunks and sort by score
  const validChunks = scoredChunks
    .filter(item => item.score > 0 && item.chunk.length > 0)
    .sort((a, b) => b.score - a.score);
  
  console.log(`Scored ${validChunks.length} valid chunks, top scores:`, validChunks.slice(0, 3).map(c => c.score));
  
  const results = validChunks.slice(0, maxResults).map(item => item.chunk);
  
  // If no good matches, return first few chunks anyway (better than nothing)
  if (results.length === 0 && chunks.length > 0) {
    console.log('No good matches found, returning first chunks as fallback');
    return chunks.slice(0, Math.min(3, chunks.length));
  }
  
  return results;
}

