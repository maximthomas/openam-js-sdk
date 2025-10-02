interface ImportMetaEnv {
  VITE_OPENAM_SERVER?: string; 
  VITE_OPENAM_CONTEXT_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}