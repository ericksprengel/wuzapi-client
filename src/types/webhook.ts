import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod schemas (passthrough so unknown fields are preserved for inspection)
// ---------------------------------------------------------------------------

export const wuzapiMessageInfoSchema = z
  .object({
    Chat: z.string(),
    Sender: z.string(),
    IsFromMe: z.boolean(),
    IsGroup: z.boolean(),
    ID: z.string(),
    Type: z.string(), // "text", "image", "sticker", etc.
    PushName: z.string(),
    Timestamp: z.string(),
    RecipientAlt: z.string(),
    // fields observed in real payloads
    AddressingMode: z.string().optional(),
    SenderAlt: z.string().optional(),
    BroadcastListOwner: z.string().optional(),
    BroadcastRecipients: z.array(z.string()).nullable().optional(),
    ServerID: z.number().optional(),
    Category: z.string().optional(),
    Multicast: z.boolean().optional(),
    MediaType: z.string().optional(),
    Edit: z.string().optional(),
    MsgBotInfo: z
      .object({
        EditType: z.string(),
        EditTargetID: z.string(),
        EditSenderTimestampMS: z.string(),
      })
      .optional(),
    MsgMetaInfo: z
      .object({
        TargetID: z.string(),
        TargetSender: z.string(),
        TargetChat: z.string(),
        DeprecatedLIDSession: z.unknown().nullable(),
        ThreadMessageID: z.string(),
        ThreadMessageSenderJID: z.string(),
      })
      .optional(),
    VerifiedName: z.unknown().nullable().optional(),
    DeviceSentMeta: z.unknown().nullable().optional(),
  })
  .passthrough();

export const wuzapiMessageContentSchema = z
  .object({
    conversation: z.string().optional(),
    extendedTextMessage: z
      .object({
        text: z.string(),
        // present when message is a reply to another message
        contextInfo: z
          .object({
            stanzaID: z.string().optional(),       // ID of the quoted message
            participant: z.string().optional(),     // sender JID of the quoted message
            quotedMessage: z.object({}).passthrough().optional(), // quoted message content
            quotedType: z.number().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough()
      .optional(),
    imageMessage: z
      .object({ caption: z.string().optional(), url: z.string().optional() })
      .passthrough()
      .optional(),
    documentMessage: z
      .object({ fileName: z.string().optional(), url: z.string().optional() })
      .passthrough()
      .optional(),
    audioMessage: z
      .object({
        URL: z.string().optional(),
        mimetype: z.string().optional(),
        fileSHA256: z.string().optional(),
        fileLength: z.number().optional(),
        seconds: z.number().optional(),
        PTT: z.boolean().optional(),
        mediaKey: z.string().optional(),
        fileEncSHA256: z.string().optional(),
        directPath: z.string().optional(),
        mediaKeyTimestamp: z.number().optional(),
        streamingSidecar: z.string().optional(),
        waveform: z.string().optional(),
        contextInfo: z
          .object({
            forwardingScore: z.number().optional(),
            isForwarded: z.boolean().optional(),
            pairedMediaType: z.number().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough()
      .optional(),
    videoMessage: z
      .object({
        URL: z.string().optional(),
        mimetype: z.string().optional(),
        fileSHA256: z.string().optional(),
        fileLength: z.number().optional(),
        seconds: z.number().optional(),
        mediaKey: z.string().optional(),
        fileEncSHA256: z.string().optional(),
        directPath: z.string().optional(),
        mediaKeyTimestamp: z.number().optional(),
        caption: z.string().optional(),
        height: z.number().optional(),
        width: z.number().optional(),
        // gifPlayback: true distinguishes a GIF from a regular video
        gifPlayback: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
    stickerMessage: z
      .object({
        URL: z.string().optional(),
        fileSHA256: z.string().optional(),
        fileEncSHA256: z.string().optional(),
        mediaKey: z.string().optional(),
        mimetype: z.string().optional(),
        directPath: z.string().optional(),
        fileLength: z.number().optional(),
        mediaKeyTimestamp: z.number().optional(),
        isAnimated: z.boolean().optional(),
        stickerSentTS: z.number().optional(),
        isAvatar: z.boolean().optional(),
        isAiSticker: z.boolean().optional(),
        isLottie: z.boolean().optional(),
        accessibilityLabel: z.string().optional(),
        premium: z.number().optional(),
      })
      .passthrough()
      .optional(),
    contactMessage: z
      .object({ displayName: z.string().optional(), vcard: z.string().optional() })
      .passthrough()
      .optional(),
    contactsArrayMessage: z
      .object({
        displayName: z.string().optional(), // e.g. "15 contacts"
        contacts: z
          .array(
            z.object({ displayName: z.string().optional(), vcard: z.string().optional() }).passthrough(),
          )
          .optional(),
      })
      .passthrough()
      .optional(),
    locationMessage: z
      .object({
        degreesLatitude: z.number().optional(),
        degreesLongitude: z.number().optional(),
        name: z.string().optional(),
        address: z.string().optional(),
        JPEGThumbnail: z.string().optional(), // base64 map preview
      })
      .passthrough()
      .optional(),
    reactionMessage: z
      .object({ key: z.object({}).passthrough().optional(), text: z.string().optional() })
      .passthrough()
      .optional(),
    // Fired when someone votes on a poll — vote content is E2E encrypted
    pollUpdateMessage: z
      .object({
        pollCreationMessageKey: z
          .object({
            remoteJID: z.string().optional(),
            fromMe: z.boolean().optional(),
            ID: z.string().optional(),       // ID of the original pollCreationMessageV3
            participant: z.string().optional(),
          })
          .passthrough()
          .optional(),
        vote: z
          .object({
            encPayload: z.string().optional(), // encrypted vote — requires session key to decrypt
            encIV: z.string().optional(),
          })
          .passthrough()
          .optional(),
        senderTimestampMS: z.number().optional(),
      })
      .passthrough()
      .optional(),
    pollCreationMessageV3: z
      .object({
        name: z.string().optional(),
        options: z
          .array(z.object({ optionName: z.string().optional() }).passthrough())
          .optional(),
        selectableOptionsCount: z.number().optional(),
        pollContentType: z.number().optional(),
        pollType: z.number().optional(),
      })
      .passthrough()
      .optional(),
    eventMessage: z
      .object({
        name: z.string().optional(),
        description: z.string().optional(),
        startTime: z.number().optional(), // unix timestamp
        endTime: z.number().optional(),   // unix timestamp
        location: z
          .object({
            degreesLatitude: z.number().optional(),
            degreesLongitude: z.number().optional(),
            name: z.string().optional(),
          })
          .passthrough()
          .optional(),
        joinLink: z.string().optional(),
        isCanceled: z.boolean().optional(),
        extraGuestsAllowed: z.boolean().optional(),
        isScheduleCall: z.boolean().optional(),
        hasReminder: z.boolean().optional(),
        reminderOffsetSec: z.number().optional(),
      })
      .passthrough()
      .optional(),
    quotedMessage: z.object({}).passthrough().optional(),
    // E2E encryption metadata — always present in real payloads
    messageContextInfo: z
      .object({ messageSecret: z.string().optional() })
      .passthrough()
      .optional(),
  })
  .passthrough();

export const wuzapiEventTypeSchema = z.enum([
  "Message",
  "ReadReceipt",
  "Presence",
  "HistorySync",
  "ChatPresence",
  "UserAbout",
]);

export const wuzapiEventSchema = z
  .object({
    type: wuzapiEventTypeSchema,
    // top-level media fields (present alongside event on media messages)
    base64: z.string().optional(),
    fileName: z.string().optional(),
    mimeType: z.string().optional(),
    isSticker: z.boolean().optional(),
    stickerAnimated: z.boolean().optional(),
    event: z
      .object({
        Info: wuzapiMessageInfoSchema.optional(),
        Message: wuzapiMessageContentSchema.optional(),
        RawMessage: wuzapiMessageContentSchema.optional(),
        // flags observed in real payloads
        IsEphemeral: z.boolean().optional(),
        IsViewOnce: z.boolean().optional(),
        IsViewOnceV2: z.boolean().optional(),
        IsViewOnceV2Extension: z.boolean().optional(),
        IsDocumentWithCaption: z.boolean().optional(),
        IsLottieSticker: z.boolean().optional(),
        IsBotInvoke: z.boolean().optional(),
        IsEdit: z.boolean().optional(),
        RetryCount: z.number().optional(),
        UnavailableRequestID: z.string().optional(),
        SourceWebMsg: z.unknown().nullable().optional(),
        NewsletterMeta: z.unknown().nullable().optional(),
      })
      .passthrough(),
  })
  .passthrough();

// ---------------------------------------------------------------------------
// TypeScript types derived from schemas
// ---------------------------------------------------------------------------

export type WuzapiFormPayload = {
  instanceName: string;
  userID: string;
  jsonData: string; // JSON string — parse separately
};

export type WuzapiEventType = z.infer<typeof wuzapiEventTypeSchema>;
export type WuzapiMessageInfo = z.infer<typeof wuzapiMessageInfoSchema>;
export type WuzapiMessageContent = z.infer<typeof wuzapiMessageContentSchema>;
export type WuzapiEvent = z.infer<typeof wuzapiEventSchema>;
