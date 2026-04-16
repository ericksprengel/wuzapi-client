import { createWuzapiRequest } from "../http";
import type { WuzapiConfig } from "../config";
import type { WuzapiCheckNumberResult, WuzapiUserInfo } from "../types/responses";

export class UserResource {
  private readonly http: ReturnType<typeof createWuzapiRequest>;

  constructor(config: WuzapiConfig) {
    this.http = createWuzapiRequest(config);
  }

  getInfo(): Promise<WuzapiUserInfo> {
    return this.http.get<WuzapiUserInfo>("/user/info");
  }

  checkNumber(phone: string): Promise<WuzapiCheckNumberResult> {
    return this.http.post<WuzapiCheckNumberResult>("/user/check", {
      Phone: phone,
    });
  }
}
