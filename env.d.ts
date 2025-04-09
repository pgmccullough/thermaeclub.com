// env.d.ts or global.d.ts
export {}

declare global {
  interface Window {
    ENV: {
      WS_SERVER_URL: string;
    };
  }
}
