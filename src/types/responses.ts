export type WuzapiSendResponse = {
  Results: Array<{
    RecipientJID: string;
    Status: string;
    MessageID?: string;
    Error?: string;
  }>;
};

export type WuzapiUserInfo = {
  JID: string;
  Name: string;
  Status: string;
};

export type WuzapiCheckNumberResult = {
  exists: boolean;
  JID?: string;
};
