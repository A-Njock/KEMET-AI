// Fetch trainings from GitHub
export async function fetchTrainings(): Promise<any[]> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/kemet-ai/trainings/main/trainings.json', {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to fetch trainings');
    return await res.json();
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [
      { title: 'Formation IA: Introduction', date: '22 octobre 2025', location: 'Yaoundé', status: 'upcoming', signup: 'https://kemet.ai/inscription' },
      { title: 'Formation IA: RAG Avancé', date: '15 décembre 2025', location: 'Douala', status: 'upcoming', signup: 'https://kemet.ai/inscription' }
    ];
  }
}

function getBackendUrl(): string {
  const env = import.meta.env.VITE_RAG_BACKEND_URL;
  return (!env || env === 'proxy' || env === '') ? '' : env;
}

// Chatbot API
export async function chatbot(
  query: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
  language: string = 'fr'
): Promise<{ answer: string; sources: any[] }> {
  try {
    const backendUrl = getBackendUrl();
    const queryUrl = backendUrl ? `${backendUrl}/query` : '/query';

    const response = await fetch(queryUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: query,
        history: conversationHistory,
        top_k: 5,
        language,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return { answer: data.answer || 'Erreur: aucune réponse du serveur.', sources: data.sources || [] };
  } catch (error) {
    console.error('Error calling RAG backend:', error);
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
      return { answer: language === 'en'
        ? 'Connection error. Please check that the server is online.'
        : 'Erreur de connexion au serveur. Veuillez vérifier que le serveur est en ligne.',
        sources: [] };
    }
    return { answer: `Erreur: ${msg}`, sources: [] };
  }
}

// Submit thumbs-up / thumbs-down rating
export async function submitFeedback(
  question: string,
  answer: string,
  rating: 'up' | 'down',
  language: string = 'fr'
): Promise<void> {
  try {
    const backendUrl = getBackendUrl();
    const url = backendUrl ? `${backendUrl}/feedback` : '/feedback';
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, rating, language }),
    });
  } catch {
    // non-blocking — rating failure must never break the chat
  }
}
