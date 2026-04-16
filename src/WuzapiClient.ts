import type { WuzapiConfig } from "./config";
import { ChatResource } from "./resources/ChatResource";
import { UserResource } from "./resources/UserResource";
import { GroupResource } from "./resources/GroupResource";

export class WuzapiClient {
  readonly chat: ChatResource;
  readonly user: UserResource;
  readonly group: GroupResource;

  constructor(config: WuzapiConfig) {
    this.chat = new ChatResource(config);
    this.user = new UserResource(config);
    this.group = new GroupResource(config);
  }
}
