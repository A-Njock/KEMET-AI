# Kemet AI

Kemet AI brings world-class AI solutions to Cameroon: Corporate AI Solutions, AI Tools (including a powerful RAG-based Cameroon law chatbot), and AI Training programs.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Deploy to Vercel:
```bash
vercel --prod
```

## 📁 Project Structure

```
kemet-ai/
├── src/
│   ├── components/     # React components (Header, Card, Footer, etc.)
│   ├── pages/          # Page components (Home, Solutions, Outils, etc.)
│   ├── lib/            # Utilities (RAG, API calls)
│   └── locales/        # i18n translations (fr.json, en.json)
├── public/             # Static assets
└── scripts/            # Build and deployment scripts
```

## 🌟 Features

### Core Pillars

1. **Solutions IA pour Entreprises** (`/solutions`)
   - Custom AI solutions for businesses
   - Contact form for inquiries

2. **Outils** (`/outils`)
   - RAG-based Cameroon law chatbot
   - Powered by Groq for intelligent chunking and response generation
   - Document-exclusive results with article/section numbers

3. **Formations IA** (`/formations`)
   - Dynamic training calendar from GitHub JSON
   - Timeline view with upcoming and completed events

### Secondary Features

- **Immobilier Intelligent** (`/immobilier`) - Smart real estate marketplace (coming soon)
- **Achat-Vente** (`/achat-vente`) - AI-powered e-commerce marketplace (coming soon)

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GITHUB_TOKEN=your_github_token
```

### Legal Documents

Upload legal PDFs to [kemet-ai/legal-docs](https://github.com/kemet-ai/legal-docs) repository.

The RAG system will:
1. Chunk documents intelligently using Groq (preserving article integrity)
2. Store embeddings in `legal-docs/embeddings/`
3. Update incrementally when new documents are added

### Trainings Data

Training events are loaded from:
`https://raw.githubusercontent.com/kemet-ai/trainings/main/trainings.json`

Example format:
```json
[
  {
    "title": "Formation IA: Introduction",
    "date": "22 octobre 2025",
    "location": "Yaoundé",
    "status": "upcoming",
    "signup": "https://kemet.ai/inscription"
  }
]
```

## 🤖 RAG Chatbot System

The chatbot uses:
- **Groq** for intelligent document chunking (preserves article integrity)
- **Groq** for response generation (separate instance)
- **Simple similarity search** for chunk retrieval (in production, use proper embeddings)

### How It Works

1. Documents are chunked by article/section (no splitting)
2. Chunks are stored with embeddings
3. User query triggers similarity search
4. Relevant chunks are passed to Groq for response generation
5. Response includes article numbers and similar articles

### Fallback Message

If no answer is found, the chatbot responds with:
> "Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle."

## 🌐 Bilingual Support

- Default language: **French**
- Toggle to English via footer button
- Uses `react-i18next` for translations
- All text is translatable via `src/locales/`

## 📊 Connection Tracking

The homepage displays a real-time connection counter showing the number of active users. This is tracked via localStorage (in production, use a proper backend API).

## 🎨 Design

- **Theme**: Black (#1A1A1A) and Gold (#D4A017)
- **Fonts**: Inter (body), Montserrat (headings)
- **Responsive**: Mobile-first design
- **Performance**: Optimized images, lazy loading

## 📦 GitHub Repositories

- **Main**: [kemet-ai/kemet-ai](https://github.com/kemet-ai/kemet-ai) (this repo)
- **Legal Docs**: [kemet-ai/legal-docs](https://github.com/kemet-ai/legal-docs)
- **Trainings**: [kemet-ai/trainings](https://github.com/kemet-ai/trainings)
- **Immobilier**: [kemet-ai/immobilier](https://github.com/kemet-ai/immobilier)
- **Ashavant**: [kemet-ai/ashavant](https://github.com/kemet-ai/ashavant)

## 🚀 Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Set environment variables in Vercel dashboard
4. Configure custom domain (kemet.ai or kemetai.cm)

### Domain Setup

- Point DNS to Vercel (CNAME: `cname.vercel-dns.com`)
- SSL is automatically configured

## 🔄 GitHub Actions

Automated RAG index updates when new documents are added to `legal-docs/`:

See `.github/workflows/update-rag.yaml`

## 📝 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

- Test bilingual toggle (French default, English on click)
- Test chatbot with queries like "Droit de succession au Cameroun"
- Verify mobile responsiveness
- Check all GitHub links resolve correctly

## 📄 License

Copyright © 2025 Kemet AI. All rights reserved.

## 👤 Author

Pierre Guy A. Njock

---

**Live URL**: https://kemet-ai.vercel.app

