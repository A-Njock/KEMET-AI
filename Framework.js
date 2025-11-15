/*

-------------------------------------------------------
KEMET AI - PROJECT BRIEF & CHECKLIST (GITHUB-READY)
-------------------------------------------------------

🚀 Fast Start: Run the following to set up
-------------------------------------------------------
npx create-vite@latest kemet-ai -- --template react-ts
cd kemet-ai

npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
npm install react-router-dom react-i18next @langchain/core groq-sdk socket.io-client

# Set up Tailwind (tailwind.config.js)
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      heading: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        black: "#1A1A1A",
        gold: "#D4A017"
      }
    }
  }
}

# Main structure (src/)
src/
  components/
    Header.tsx
    Card.tsx
    Footer.tsx
    Gallery.tsx
    LanguageToggle.tsx
    ConnectionsCounter.tsx
  pages/
    Home.tsx
    Outils.tsx
    Solutions.tsx
    Formations.tsx
    Immobilier.tsx
    AchatVente.tsx
    Chatbot.tsx
  lib/
    api.ts
    rag.ts
  locales/
    fr.json
    en.json

public/
  img1.jpg (douala2024)
  img2.jpg (team)
  img3.jpg (class)
  img4.jpg (partnership)
  favicon.ico

-------------------------------------------------------
KEY COMPONENTS SAMPLE SNIPPETS BELOW
-------------------------------------------------------

-- src/components/ConnectionsCounter.tsx --
import { useEffect, useState } from "react";
import io from "socket.io-client";
export default function ConnectionsCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_SERVER || "wss://kemet-ai-conn.onrender.com");
    socket.on("connections", setCount);
    return () => socket.disconnect();
  }, []);
  return (
    <div className="fixed top-5 right-5 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 border-2 border-gold text-gold font-bold text-xl shadow-xl transition-transform hover:scale-105">
      <span role="img" aria-label="users">👥</span>
      <span>{count} connecté{count>1?"s":""}</span>
    </div>
  );
}

-- src/components/Card.tsx --
import { useNavigate } from "react-router-dom";
export default function Card({ title, desc, to }) {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer bg-white border-gold border-2 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform"
      onClick={() => navigate(to)}
    >
      <h3 className="font-heading text-xl text-gold mb-2">{title}</h3>
      <p className="text-black">{desc}</p>
    </div>
  )
}

-- src/components/Header.tsx --
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="w-full py-6 px-4 flex justify-between items-center bg-black">
      <Link to="/" className="font-heading text-2xl text-gold">Kemet AI</Link>
      <nav>
        <Link to="/solutions" className="ml-4 text-gold hover:underline">Solutions</Link>
        <Link to="/outils" className="ml-4 text-gold hover:underline">Outils</Link>
        <Link to="/formations" className="ml-4 text-gold hover:underline">Formations</Link>
      </nav>
    </header>
  );
}

-- src/components/LanguageToggle.tsx --
import { useTranslation } from "react-i18next";
export default function LanguageToggle() {
  const { i18n } = useTranslation();
  return (
    <button
      className="bg-black border border-gold rounded px-2 py-1 ml-4 text-gold text-xs"
      onClick={() => i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr")}
    >
      Français | English
    </button>
  );
}

-- src/pages/Home.tsx --
import Card from "../components/Card";
import ConnectionsCounter from "../components/ConnectionsCounter";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import LanguageToggle from "../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  // Cards data
  const cards = [
    {
      title: t("solutions_card"),
      desc: t("solutions_card_desc"),
      to: "/solutions"
    },
    {
      title: t("outils_card"),
      desc: t("outils_card_desc"),
      to: "/outils"
    },
    {
      title: t("formations_card"),
      desc: t("formations_card_desc"),
      to: "/formations"
    },
  ];
  return (
    <div className="min-h-screen bg-black font-sans pb-10">
      <ConnectionsCounter />
      <Header />
      <main className="max-w-5xl mx-auto">
        <section className="mt-12 text-center">
          <h1 className="text-5xl font-heading font-bold text-gold">{t("hero_title")}</h1>
          <h2 className="text-2xl text-white mt-2">{t("hero_subhead")}</h2>
          <p className="text-lg text-gray-300 mt-2">{t("hero_tagline")}</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {cards.map((props, idx) => <Card key={idx} {...props} />)}
        </section>
        <section className="mt-4 mb-6 text-center">
          <p className="text-sm italic text-gray-400">
            Plus: <Link className="underline" to="/immobilier">Immobilier-Intelligent</Link> Achetez, louez, trouvez vite.{" "}
            <Link className="underline" to="/achat-vente">Achat-Vente</Link>-Achetez, vendez-marché intelligent.
          </p>
        </section>
        <Gallery />
      </main>
      <footer className="w-full flex justify-center items-center mt-8 text-gray-500">
        <LanguageToggle />
        <span className="ml-4">© {new Date().getFullYear()} Kemet AI</span>
      </footer>
    </div>
  );
}

-- src/components/Gallery.tsx --
export default function Gallery() {
  const images = [
    {src: "/img1.jpg", caption: "Événement Douala 2024"},
    {src: "/img2.jpg", caption: "Premier Chatbot Lancé"},
    {src: "/img3.jpg", caption: "Formation Yaoundé"},
    {src: "/img4.jpg", caption: "Partenariat Entreprise"},
  ];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 px-2">
      {images.map((img, i) => (
        <div key={i} className="rounded-xl overflow-hidden group">
          <img src={img.src} alt={img.caption} loading="lazy" className="w-full h-40 object-cover group-hover:scale-110 transition-transform" />
          <div className="text-center text-white bg-black/70 py-2 text-sm">{img.caption}</div>
        </div>
      ))}
    </section>
  );
}

-- src/locales/fr.json --
{
  "hero_title": "IA pour le Cameroun",
  "hero_subhead": "AI for Cameroon",
  "hero_tagline": "Solutions d’entreprise, outils gratuits, formations d’élite",
  "solutions_card": "Solutions IA pour Entreprises",
  "solutions_card_desc": "Développons votre IA sur mesure.",
  "outils_card": "Outils",
  "outils_card_desc": "Chatbot loi camerounaise, gratuit posez, obtenez réponse maintenant.",
  "formations_card": "Formations",
  "formations_card_desc": "Apprenez les IA generatives, dates à venir."
}

-- src/locales/en.json --
{
  "hero_title": "AI for Cameroon",
  "hero_subhead": "IA pour le Cameroun",
  "hero_tagline": "Corporate solutions, AI tools, world-class training",
  "solutions_card": "Corporate AI Solutions",
  "solutions_card_desc": "Let’s build your custom AI.",
  "outils_card": "Tools",
  "outils_card_desc": "Cameroon law chatbot, ask and get answers instantly.",
  "formations_card": "AI Trainings",
  "formations_card_desc": "Learn generative AI, dates coming soon."
}

-- src/lib/rag.ts --
// CHUNKING AND RAG (TypeScript, uses Groq)
import { Groq } from "groq-sdk";

// Same API key used for chunking and response
const client = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY });

export async function chunkDocument(document: string): Promise<string[]> {
  const prompt = `You are an expert in legal document analysis. Given a Cameroon legal document, chunk it intelligently by section or article without splitting any article's content across multiple chunks. Detect headers like "Article X" or "Section Y" and preserve full context. Return an array of chunks. Document: ${document}`;
  const response = await client.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [{ role: "user", content: prompt }],
  });
  return JSON.parse(response.choices[0].message.content!);
}

export async function generateResponse(query: string, retrievedChunks: string[]): Promise<string> {
  const prompt = `You are a legal expert answering questions about Cameroon law based ONLY on the provided document chunks. Provide an accurate answer with exact article or section numbers. Suggest similar articles that complement or contradict the answer. If no answer is found, respond EXACTLY: "Cet outil a été développé par Pierre Guy A. Njock. Nous travaillons actuellement à améliorer ses performances. En attendant, cliquez sur le lien ci-dessous pour découvrir nos formations sur comment gagner de l'argent grâce à l'intelligence artificielle." with a link to /formations. Query: ${query}\nChunks: ${retrievedChunks.join('\n')}`;
  const response = await client.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content!;
}

-- src/lib/api.ts --
// Fetch trainings JSON, call chatbot, etc.
export async function fetchTrainings(): Promise<any[]> {
  const res = await fetch('https://raw.githubusercontent.com/kemet-ai/trainings/main/trainings.json');
  return res.json();
}
export async function chatbot(query: string) {
  // Get relevant chunks, then call generateResponse
  // ... Integration details
}

-- Incremental Embeddings Update (scripts/update-index.js, sample logic) --
const { Groq } = require('groq-sdk');
const fs = require('fs');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// ... check for PDFs added, chunk, update embeddings & save as JSON

-- GitHub Actions .github/workflows/update-rag.yaml --
name: Update RAG Index
on:
  push:
    paths:
      - 'legal-docs/**'
jobs:
  update-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install groq-sdk
      - run: node scripts/update-index.js

-------------------------------------------------------
DEPLOYMENT & DOCS (README.md extract)
-------------------------------------------------------
# Kemet AI

Kemet AI brings world-class AI solutions to Cameroon:

- Corporate AI (Sur-mesure)
- Legal Chatbot (RAG with Groq on law docs)
- Training & E-commerce/Immobilier demos

### Quick Start

- `npm install && npm run dev`
- Deploy: Vercel (`vercel --prod`)
- Upload legal PDFs to [kemet-ai/legal-docs](https://github.com/kemet-ai/legal-docs)
- Trainings: [kemet-ai/trainings/trainings.json](https://github.com/kemet-ai/trainings)

Frontend: `./frontend`
APIs: `./api`
Data: `./legal-docs`, `./trainings`

### Legal Chatbot (Outils)
- Uses Open RAG pipeline: chunk with Groq, incremental embeddings update, GitHub storage, robust French/English UI
- Live: https://kemet-ai.vercel.app/outils

### Repos
- Main: [kemet-ai/kemet-ai](https://github.com/kemet-ai/kemet-ai)
- Law Docs: [kemet-ai/legal-docs](https://github.com/kemet-ai/legal-docs)
- Trainings: [kemet-ai/trainings](https://github.com/kemet-ai/trainings)
- Immobilier & Achat-Vente stubs linked

----

Vercel URL: https://kemet-ai.vercel.app

Domain (demo): kemetai.cm
SEO: All pages with meta tags, lazy image loading, gold-black theme, compressed builds.

---------------- END OF BOOTSTRAP CODE/README EXAMPLES ----------------

See repo for full implementation! This snippet summarizes the project architecture, critical code entry points, and sample React/Tailwind/TypeScript code (including a real-time connections counter). To get the zipped full folder, clone from [https://github.com/kemet-ai/kemet-ai](https://github.com/kemet-ai/kemet-ai).

*/

