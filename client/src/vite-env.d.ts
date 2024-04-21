/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLISHABLE_KEY: string;
  readonly VITE_GOOGLEMAPS_API_KEY: string;
  readonly VITE_APP_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
