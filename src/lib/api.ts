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
    console.log('📦 Loading chunks...');
    const chunks = await loadChunksFromGitHub();
    console.log(`✅ Loaded ${chunks.length} chunks`);
    
    if (chunks.length === 0) {
      console.error('❌ No chunks loaded! Check if chunks.json exists and is accessible.');
    } else {
      console.log('📄 Sample chunk:', chunks[0]?.substring(0, 200) || 'N/A');
    }
    
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
    console.log('Sample chunks:', relevantChunks.slice(0, 2).map(c => c.substring(0, 100) + '...'));
    
    // Even if no perfect matches, try with all chunks if query is about marriage
    if (relevantChunks.length === 0) {
      console.log('No relevant chunks found, trying broader search...');
      // Try with original query without context
      const broaderChunks = findRelevantChunks(query, chunks, 5);
      if (broaderChunks.length > 0) {
        console.log(`Found ${broaderChunks.length} chunks with broader search`);
        const answer = await generateResponse(query, broaderChunks, conversationHistory);
        const sources = broaderChunks
          .map(chunk => {
            const match = chunk.match(/(?:Article|Section)\s+(\d+)/i);
            return match ? match[0] : 'Document juridique';
          })
          .filter((v, i, a) => a.indexOf(v) === i);
        return { answer, sources };
      }
      
      // Last resort: use first few chunks
      if (chunks.length > 0) {
        console.log('Using first chunks as fallback');
        const fallbackChunks = chunks.slice(0, 3);
        const answer = await generateResponse(query, fallbackChunks, conversationHistory);
        const sources = fallbackChunks
          .map(chunk => {
            const match = chunk.match(/(?:Article|Section)\s+(\d+)/i);
            return match ? match[0] : 'Document juridique';
          })
          .filter((v, i, a) => a.indexOf(v) === i);
        return { answer, sources };
      }
      
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
    console.error('❌ Error in chatbot:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : typeof error
    });
    
    // Return more informative error message
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      answer: `Erreur lors du traitement de votre question: ${errorMessage}. Veuillez réessayer. Si le problème persiste, contactez-nous.`,
      sources: []
    };
  }
}

// Load chunks from GitHub (in production, this would be from embeddings)
async function loadChunksFromGitHub(): Promise<string[]> {
  // First, try local file (works in both dev and production)
  try {
    console.log('🔍 Trying to load chunks from local file...');
    const localRes = await fetch('/mock-legal-docs/chunks.json', {
      cache: 'no-cache'
    });
    
    if (localRes.ok) {
      console.log('📥 Parsing chunks.json (this may take a moment for large files)...');
      const localChunks = await localRes.json();
      console.log('✅ Loaded chunks from local file:', localChunks.length);
      
      // Validate chunks
      if (!Array.isArray(localChunks)) {
        console.error('❌ chunks.json is not an array!');
        return [];
      }
      
      // Filter out invalid chunks
      const validChunks = localChunks.filter(chunk => 
        chunk && typeof chunk === 'string' && chunk.length > 0
      );
      
      if (validChunks.length !== localChunks.length) {
        console.warn(`⚠️ Filtered out ${localChunks.length - validChunks.length} invalid chunks`);
      }
      
      return validChunks;
    } else {
      console.log(`⚠️ Local chunks not found (status: ${localRes.status})`);
    }
  } catch (error) {
    console.error('❌ Error loading local chunks:', error);
  }

  // Try to load from GitHub raw content (from main repo)
  try {
    console.log('🌐 Attempting to load chunks from GitHub...');
    const res = await fetch('https://raw.githubusercontent.com/A-Njock/KEMET-AI/main/public/mock-legal-docs/chunks.json', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache'
    });
    
    if (res.ok) {
      const chunks = await res.json();
      console.log('✅ Loaded chunks from GitHub:', chunks.length);
      if (chunks.length > 0) {
        console.log('Sample chunk:', chunks[0].substring(0, 150));
      }
      return chunks;
    } else {
      console.log('⚠️ GitHub chunks not found (status:', res.status, ')');
      // Try alternative location
      const altRes = await fetch('https://raw.githubusercontent.com/kemet-ai/legal-docs/main/embeddings/chunks.json', {
        headers: { 'Accept': 'application/json' },
        cache: 'no-cache'
      });
      if (altRes.ok) {
        const chunks = await altRes.json();
        console.log('✅ Loaded chunks from alternative GitHub location:', chunks.length);
        return chunks;
      }
    }
  } catch (error) {
    console.log('⚠️ Error loading chunks from GitHub:', error);
  }
  
  // Fallback: return empty array (will trigger fallback message)
  console.warn('❌ No chunks found anywhere - returning empty array');
  return [];
}

