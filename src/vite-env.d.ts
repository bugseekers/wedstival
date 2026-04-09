/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      'auto-rotate'?: boolean;
      'camera-controls'?: boolean;
      'disable-zoom'?: boolean;
      'shadow-intensity'?: string;
      'camera-orbit'?: string;
      'min-camera-orbit'?: string;
      'max-camera-orbit'?: string;
      'interaction-prompt'?: string;
      'touch-action'?: string;
      loading?: 'eager' | 'lazy' | 'auto';
      ar?: boolean;
    };
  }
}
