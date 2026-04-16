import { createWuzapiRequest } from "../http";
import type { WuzapiConfig } from "../config";
import type { WuzapiGroupListResponse } from "../types/group";

export class GroupResource {
  private readonly http: ReturnType<typeof createWuzapiRequest>;

  constructor(config: WuzapiConfig) {
    this.http = createWuzapiRequest(config);
  }

  list(): Promise<WuzapiGroupListResponse> {
    return this.http.get<WuzapiGroupListResponse>("/group/list");
  }

  removeParticipant(groupJID: string, participantJID: string): Promise<void> {
    return this.http.post<void>("/group/updateparticipants", {
      GroupJID: groupJID,
      Phone: [participantJID],
      Action: "remove",
    });
  }

  addParticipant(groupJID: string, participantJID: string): Promise<void> {
    return this.http.post<void>("/group/updateparticipants", {
      GroupJID: groupJID,
      Phone: [participantJID],
      Action: "add",
    });
  }
}
