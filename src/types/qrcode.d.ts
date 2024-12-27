declare module 'qrcode.react' {
  import * as React from 'react';

  export interface QRCodeCanvasProps {
    value: string;
    size?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    imageSettings?: {
      src: string;
      height: number;
      width: number;
      excavate: boolean;
    };
  }

  export class QRCodeCanvas extends React.Component<QRCodeCanvasProps> {}
  export class QRCodeSVG extends React.Component<QRCodeCanvasProps> {}
} 