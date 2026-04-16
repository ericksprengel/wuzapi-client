export type WuzapiGroupParticipant = {
  JID: string;
  LID: string;
  PhoneNumber: string; // e.g. "5511996382272@s.whatsapp.net" — empty for LID-only contacts
  DisplayName: string; // empty string when not available
  IsAdmin: boolean;
  IsSuperAdmin: boolean;
  Error: number;
  AddRequest: unknown | null;
};

export type WuzapiGroup = {
  JID: string; // e.g. "5511983112385-1582022056@g.us"
  Name: string;
  Participants: WuzapiGroupParticipant[];
  GroupCreated: string; // ISO date string
  IsAnnounce: boolean;
  IsLocked: boolean;
  ParticipantCount: number; // NOTE: WuzAPI returns 0 — use Participants.length instead
  [key: string]: unknown;
};

export type WuzapiGroupListResponse = {
  code: number;
  data: {
    Groups: WuzapiGroup[];
  };
};
