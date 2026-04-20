import { createWuzapiRequest } from "../http";
import type { WuzapiConfig } from "../config";
import type {
  WuzapiGroupListResponse,
  WuzapiGroupInfoResponse,
  WuzapiGroupJoinResponse,
} from "../types/group";

export class GroupResource {
  private readonly http: ReturnType<typeof createWuzapiRequest>;

  constructor(config: WuzapiConfig) {
    this.http = createWuzapiRequest(config);
  }

  list(): Promise<WuzapiGroupListResponse> {
    return this.http.get<WuzapiGroupListResponse>("/group/list");
  }

  inviteInfo(inviteCode: string): Promise<WuzapiGroupInfoResponse> {
    return this.http.post<WuzapiGroupInfoResponse>("/group/inviteinfo", {
      Code: inviteCode,
    });
  }

  join(inviteCode: string): Promise<WuzapiGroupJoinResponse> {
    return this.http.post<WuzapiGroupJoinResponse>("/group/join", {
      Code: inviteCode,
    });
  }

  getInfo(groupJID: string): Promise<WuzapiGroupInfoResponse> {
    return this.http.get<WuzapiGroupInfoResponse>(
      `/group/info?groupJID=${encodeURIComponent(groupJID)}`
    );
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
