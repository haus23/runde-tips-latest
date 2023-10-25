declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    TOTP_ENCRYPTION_SECRET: string;
    RESEND_API_KEY: string;
    SESSION_SECRET: string;
  }
}
