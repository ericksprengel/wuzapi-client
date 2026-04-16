# service-wuzapi

TypeScript client library for [Wuzapi](https://github.com/asternic/wuzapi) — a REST API for WhatsApp.

## Installation

```bash
npm install service-wuzapi
# or
bun add service-wuzapi
```

## Usage

```ts
import { WuzapiClient } from "service-wuzapi";

const client = new WuzapiClient({
  baseUrl: "https://wuzapi.example.com",
  token: "your-token",
});
```

## API

### `client.chat`

| Method | Description |
|---|---|
| `sendText(phone, body)` | Send a text message |
| `sendImage(phone, image, caption?)` | Send an image (URL or base64) |
| `sendDocument(phone, document, fileName)` | Send a document (URL or base64) |
| `sendAudio(phone, audio)` | Send an audio file (URL or base64) |
| `sendVideo(phone, video, caption?)` | Send a video (URL or base64) |
| `sendLocation(phone, lat, lng, name?, address?)` | Send a location |

### `client.user`

| Method | Description |
|---|---|
| `getInfo()` | Get connected account info (JID, name, status) |
| `checkNumber(phone)` | Check if a phone number exists on WhatsApp |

### `client.group`

| Method | Description |
|---|---|
| `list()` | List all groups with participants |
| `addParticipant(groupJID, participantJID)` | Add a participant to a group |
| `removeParticipant(groupJID, participantJID)` | Remove a participant from a group |

## Webhook types

The library exports Zod schemas and TypeScript types for parsing incoming webhook payloads:

```ts
import { wuzapiEventSchema } from "service-wuzapi";
import type { WuzapiEvent, WuzapiEventType } from "service-wuzapi";

const event = wuzapiEventSchema.parse(JSON.parse(payload.jsonData));

if (event.type === "Message") {
  const text = event.event.Message?.conversation;
}
```

## Error handling

```ts
import { WuzapiHttpError, WuzapiNetworkError, WuzapiJsonError } from "service-wuzapi";

try {
  await wuzapi.chat.sendText("5511999990000", "Hello!");
} catch (err) {
  if (err instanceof WuzapiHttpError) {
    console.error(err.statusCode, err.body);
  }
}
```

## License

MIT
