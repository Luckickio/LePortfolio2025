/// <reference types="vite/client" />

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}