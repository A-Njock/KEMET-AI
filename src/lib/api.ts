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
    
    console.log('📤 Sending request to:', `${backendUrl}/ask`);
    console.log('📤 Request payload:', { query, historyLength: conversationHistory.length });
    
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

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error response:', errorText);
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Backend response received:', data);
    
    // Check if backend returned its fallback message
    if (data.answer && data.answer.includes("Pierre Guy A.Njock qui a fais le song")) {
      console.warn('⚠️ Backend returned fallback message - no relevant context found');
    }
    
    // Extract sources from answer if available (backend may include them)
    // For now, we'll return empty sources array as the backend doesn't seem to return them
    const sources: string[] = [];
    
    return {
      answer: data.answer || 'Erreur: aucune réponse du serveur.',
      sources: sources
    };
  } catch (error) {
    console.error('❌ Error calling RAG backend:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Only return fallback if it's a network/connection error
    // If backend responded but with an error, show that error
    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return {
        answer: `Erreur de connexion au serveur. Veuillez réessayer dans quelques instants. Si le problème persiste, contactez-nous.`,
        sources: []
      };
    }
    
    // Return fallback message for other errors
    return {
      answer: `Erreur: ${errorMessage}. Veuillez réessayer.`,
      sources: []
    };
  }
}
