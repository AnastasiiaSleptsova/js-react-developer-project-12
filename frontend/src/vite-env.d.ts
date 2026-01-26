/// <reference types="vite/client" />

declare module '*.module.scss' {
  const content: Record<string, string>
  export default content
}

declare module '*.module.css' {
  const content: Record<string, string>
  export default content
}

interface ImportMetaEnv {
  readonly VITE_ROLLBAR_ACCESS_TOKEN?: string
  readonly VITE_ROLLBAR_ENVIRONMENT?: string
}
