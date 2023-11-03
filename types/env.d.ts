declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    APP_SECRET: string;
    RESEND_API_KEY: string;
  }
}
