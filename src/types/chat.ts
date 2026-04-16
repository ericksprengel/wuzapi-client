export type SendTextPayload = {
  Phone: string;
  Body: string;
};

export type SendImagePayload = {
  Phone: string;
  Image: string; // URL ou base64
  Caption?: string;
};

export type SendDocumentPayload = {
  Phone: string;
  Document: string; // URL ou base64
  FileName: string;
};

export type SendAudioPayload = {
  Phone: string;
  Audio: string; // URL ou base64
};

export type SendVideoPayload = {
  Phone: string;
  Video: string; // URL ou base64
  Caption?: string;
};

export type SendLocationPayload = {
  Phone: string;
  Lat: number;
  Lng: number;
  Name?: string;
  Address?: string;
};
