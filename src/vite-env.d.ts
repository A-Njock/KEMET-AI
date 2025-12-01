/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAG_BACKEND_URL?: string
  readonly VITE_GITHUB_TOKEN?: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

