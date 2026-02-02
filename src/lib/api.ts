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
  conversationHistory: Array<{ role: string, content: string }> = []
): Promise<{ answer: string; sources: any[] }> {
  try {
    const envBackendUrl = import.meta.env.VITE_RAG_BACKEND_URL;
    const backendUrl = (!envBackendUrl || envBackendUrl === 'proxy' || envBackendUrl === '')
      ? ''
      : envBackendUrl;

    // Use /query endpoint which is the new standard
    const queryUrl = backendUrl ? `${backendUrl}/query` : '/query';

    console.log('🔍 [DEBUG] Env Backend URL:', envBackendUrl);
    console.log('🔍 [DEBUG] Computed Backend URL:', backendUrl);
    console.log('📡 [DEBUG] Final Query URL:', queryUrl);

    const response = await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: query,         // New standard
        history: conversationHistory, // Pass history for future context usage
        top_k: 5
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Backend response received:', data);

    return {
      answer: data.answer || 'Erreur: aucune réponse du serveur.',
      sources: data.sources || []
    };
  } catch (error) {
    console.error('❌ Error calling RAG backend:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
      return {
        answer: `Erreur de connexion au serveur backend (${import.meta.env.VITE_RAG_BACKEND_URL}). Veuillez vérifier que le serveur est en ligne.`,
        sources: []
      };
    }

    return {
      answer: `Erreur: ${errorMessage}`,
      sources: []
    };
  }
}

