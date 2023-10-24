declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    RESEND_API_KEY: string;
    SESSION_SECRET: string;
  }
}
