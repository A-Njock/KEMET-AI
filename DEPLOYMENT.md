# Deployment Guide - Kemet AI

## Prerequisites

1. Node.js 18+ installed
2. Vercel account (or alternative hosting)
3. GitHub account
4. Domain name (kemet.ai or kemetai.cm)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_GITHUB_TOKEN=your_github_token_here
```

## Step 3: Local Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 4: Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## Step 5: Deploy to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. Add Environment Variables:
   - `VITE_GROQ_API_KEY`: Your Groq API key
   - `VITE_GITHUB_TOKEN`: Your GitHub token

5. Deploy

## Step 6: Configure Custom Domain

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your domain (kemet.ai or kemetai.cm)
4. Follow DNS configuration instructions:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record as instructed by Vercel

5. SSL certificate will be automatically provisioned

## Step 7: GitHub Repositories Setup

Create the following repositories:

1. **kemet-ai/kemet-ai** (main repo - this one)
2. **kemet-ai/legal-docs** - For legal PDFs and embeddings
3. **kemet-ai/trainings** - For training calendar JSON
4. **kemet-ai/immobilier** - For real estate marketplace
5. **kemet-ai/ashavant** - For e-commerce marketplace

### Legal Docs Repository Setup

1. Create `kemet-ai/legal-docs` repository
2. Create folder structure:
   ```
   legal-docs/
   ├── embeddings/
   │   └── chunks.json
   └── [PDF files here]
   ```

3. Upload legal PDFs (OHADA, Penal Code, etc.)

### Trainings Repository Setup

1. Create `kemet-ai/trainings` repository
2. Create `trainings.json` in the root:
```json
[
  {
    "title": "Formation IA: Introduction",
    "date": "22 octobre 2025",
    "location": "Yaoundé",
    "status": "upcoming",
    "signup": "https://kemet.ai/inscription"
  },
  {
    "title": "Formation IA: RAG Avancé",
    "date": "15 décembre 2025",
    "location": "Douala",
    "status": "upcoming",
    "signup": "https://kemet.ai/inscription"
  }
]
```

## Step 8: GitHub Actions Setup

1. In `kemet-ai/legal-docs` repository, go to Settings > Secrets
2. Add secret: `GROQ_API_KEY` with your Groq API key
3. The workflow will automatically run when new PDFs are added

## Step 9: Verify Deployment

1. Visit your deployed URL
2. Test all pages:
   - Homepage
   - Solutions page
   - Outils (chatbot)
   - Formations
   - Immobilier
   - Achat-Vente

3. Test bilingual toggle
4. Test chatbot functionality
5. Verify connection counter displays

## Troubleshooting

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_`
- Restart dev server after adding variables
- In Vercel, ensure variables are set in project settings

### Chatbot Not Working

- Verify Groq API key is correct
- Check browser console for errors
- Ensure legal-docs repository is accessible
- Verify chunks.json exists in legal-docs/embeddings/

### Domain Not Working

- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check Vercel domain configuration

## Performance Optimization

1. **Image Optimization**: Replace Unsplash placeholders with optimized images
2. **Code Splitting**: Already handled by Vite
3. **Lazy Loading**: Images use `loading="lazy"` attribute
4. **Minification**: Handled automatically by Vite build

## Monitoring

- Set up Vercel Analytics (optional)
- Monitor Groq API usage
- Track GitHub API rate limits

## Support

For issues or questions:
- GitHub Issues: [kemet-ai/kemet-ai](https://github.com/kemet-ai/kemet-ai)
- Email: [Your contact email]

---

**Live URL**: https://kemet-ai.vercel.app

