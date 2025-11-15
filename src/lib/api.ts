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
export async function chatbot(
  query: string, 
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<{ answer: string; sources: string[] }> {
  try {
    console.log('Loading chunks from GitHub...');
    const chunks = await loadChunksFromGitHub();
    console.log(`Loaded ${chunks.length} chunks`);
    
    if (chunks.length === 0) {
      console.warn('No chunks available - returning fallback message');
      return {
        answer: `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`,
        sources: []
      };
    }
    
    const { findRelevantChunks, generateResponse } = await import('./rag');
    
    // Find relevant chunks based on query and conversation context
    const contextQuery = conversationHistory.length > 0
      ? conversationHistory.slice(-2).map(m => m.content).join(' ') + ' ' + query
      : query;
    
    const relevantChunks = findRelevantChunks(contextQuery, chunks, 5);
    console.log(`Found ${relevantChunks.length} relevant chunks`);
    
    if (relevantChunks.length === 0) {
      return {
        answer: `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`,
        sources: []
      };
    }
    
    const answer = await generateResponse(query, relevantChunks, conversationHistory);
    console.log('Generated answer:', answer.substring(0, 100) + '...');
    
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
      answer: `Erreur lors du traitement de votre question. Veuillez réessayer. Si le problème persiste, contactez-nous.`,
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

