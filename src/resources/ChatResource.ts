import { createWuzapiRequest } from "../http";
import type { WuzapiConfig } from "../config";
import type {
  SendAudioPayload,
  SendDocumentPayload,
  SendImagePayload,
  SendLocationPayload,
  SendTextPayload,
  SendVideoPayload,
} from "../types/chat";
import type { WuzapiSendResponse } from "../types/responses";

export class ChatResource {
  private readonly http: ReturnType<typeof createWuzapiRequest>;

  constructor(config: WuzapiConfig) {
    this.http = createWuzapiRequest(config);
  }

  sendText(phone: string, body: string): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/text", {
      Phone: phone,
      Body: body,
    } satisfies SendTextPayload);
  }

  sendImage(
    phone: string,
    image: string,
    caption?: string,
  ): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/image", {
      Phone: phone,
      Image: image,
      Caption: caption,
    } satisfies SendImagePayload);
  }

  sendDocument(
    phone: string,
    document: string,
    fileName: string,
  ): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/document", {
      Phone: phone,
      Document: document,
      FileName: fileName,
    } satisfies SendDocumentPayload);
  }

  sendAudio(phone: string, audio: string): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/audio", {
      Phone: phone,
      Audio: audio,
    } satisfies SendAudioPayload);
  }

  sendVideo(
    phone: string,
    video: string,
    caption?: string,
  ): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/video", {
      Phone: phone,
      Video: video,
      Caption: caption,
    } satisfies SendVideoPayload);
  }

  sendLocation(
    phone: string,
    lat: number,
    lng: number,
    name?: string,
    address?: string,
  ): Promise<WuzapiSendResponse> {
    return this.http.post<WuzapiSendResponse>("/chat/send/location", {
      Phone: phone,
      Lat: lat,
      Lng: lng,
      Name: name,
      Address: address,
    } satisfies SendLocationPayload);
  }
}
