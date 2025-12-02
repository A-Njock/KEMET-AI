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

// Chatbot API - calls the new Python backend
export async function chatbot(
  query: string, 
  conversationHistory: Array<{role: string, content: string}> = []
): Promise<{ answer: string; sources: string[] }> {
  try {
    // Get backend URL from environment variable or use Render default
    const backendUrl = import.meta.env.VITE_RAG_BACKEND_URL || 'https://kemet-ai-4.onrender.com';
    
    console.log('📡 Calling RAG backend at:', backendUrl);
    
    const response = await fetch(`${backendUrl}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        history: conversationHistory
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract sources from answer if available (backend may include them)
    // For now, we'll return empty sources array as the backend doesn't seem to return them
    const sources: string[] = [];
    
    return {
      answer: data.answer || 'Erreur: aucune réponse du serveur.',
      sources: sources
    };
  } catch (error) {
    console.error('❌ Error calling RAG backend:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Return fallback message
    return {
      answer: `Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle. <a href="/formations" class="text-gold underline">Voir les formations</a>`,
      sources: []
    };
  }
}
