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

export async function generateResponse(query: string, retrievedChunks: string[]): Promise<string> {
  if (!retrievedChunks || retrievedChunks.length === 0) {
    return `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`;
  }

  const chunksText = retrievedChunks.join('\n\n---\n\n');
  const prompt = `You are a legal expert answering questions about Cameroon law based ONLY on the provided document chunks. 

Rules:
1. Provide an accurate answer with exact article or section numbers (e.g., "Article 82, Penal Code").
2. Suggest similar articles that complement or contradict the answer (e.g., "Article 83 (complémentaire), Article 90 (contradictoire)").
3. If the answer cannot be found in the provided chunks, respond EXACTLY: "Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle." with a link to /formations.

Query: ${query}

Chunks:
${chunksText}`;

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

// Simple similarity search (in production, use proper embeddings)
export function findRelevantChunks(query: string, chunks: string[], maxResults: number = 3): string[] {
  const queryLower = query.toLowerCase();
  const scoredChunks = chunks.map(chunk => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    
    // Simple keyword matching
    const queryWords = queryLower.split(/\s+/);
    queryWords.forEach(word => {
      if (word.length > 2 && chunkLower.includes(word)) {
        score += 1;
      }
    });
    
    // Boost if article numbers are mentioned
    if (chunkLower.includes('article') || chunkLower.includes('section')) {
      score += 2;
    }
    
    return { chunk, score };
  });
  
  return scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.chunk);
}

