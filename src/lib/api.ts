// Fetch trainings from GitHub
export async function fetchTrainings(): Promise<any[]> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/kemet-ai/trainings/main/trainings.json', {
      headers: {
        'Accept': 'application/json',
      }
    });
    if (!res.ok) throw new Error('Failed to fetch trainings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching trainings:', error);
    // Return fallback data
    return [
      {
        title: 'Formation IA: Introduction',
        date: '22 octobre 2025',
        location: 'Yaoundé',
        status: 'upcoming',
        signup: 'https://kemet.ai/inscription'
      },
      {
        title: 'Formation IA: RAG Avancé',
        date: '15 décembre 2025',
        location: 'Douala',
        status: 'upcoming',
        signup: 'https://kemet.ai/inscription'
      }
    ];
  }
}

// Chatbot API - in production, this would call a backend API
// For now, we'll use a client-side implementation
export async function chatbot(query: string): Promise<{ answer: string; sources: string[] }> {
  try {
    // In production, this would fetch from /api/chatbot endpoint
    // For now, we'll use a mock implementation that loads chunks from GitHub
    const chunks = await loadChunksFromGitHub();
    const { findRelevantChunks, generateResponse } = await import('./rag');
    
    const relevantChunks = findRelevantChunks(query, chunks, 3);
    const answer = await generateResponse(query, relevantChunks);
    
    // Extract sources from chunks
    const sources = relevantChunks
      .map(chunk => {
        const match = chunk.match(/(?:Article|Section)\s+(\d+)/i);
        return match ? match[0] : 'Document juridique';
      })
      .filter((v, i, a) => a.indexOf(v) === i);
    
    return { answer, sources };
  } catch (error) {
    console.error('Error in chatbot:', error);
    return {
      answer: `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`,
      sources: []
    };
  }
}

// Load chunks from GitHub (in production, this would be from embeddings)
async function loadChunksFromGitHub(): Promise<string[]> {
  // First, try local file for development/testing
  if (import.meta.env.DEV) {
    try {
      const localRes = await fetch('/mock-legal-docs/chunks.json');
      if (localRes.ok) {
        const localChunks = await localRes.json();
        console.log('Loaded chunks from local file:', localChunks.length);
        return localChunks;
      }
    } catch (error) {
      console.log('Local chunks not found, trying GitHub...');
    }
  }

  // Try to load from GitHub raw content
  try {
    const res = await fetch('https://raw.githubusercontent.com/kemet-ai/legal-docs/main/embeddings/chunks.json', {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (res.ok) {
      const chunks = await res.json();
      console.log('Loaded chunks from GitHub:', chunks.length);
      return chunks;
    }
  } catch (error) {
    console.log('Chunks not available from GitHub');
  }
  
  // Fallback: return empty array (will trigger fallback message)
  console.log('No chunks found, using fallback message');
  return [];
}

