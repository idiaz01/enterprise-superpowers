---
name: videodb
description: VideoDB -- perception, memory, and actions for video, live streams, and desktop sessions. Ingest, index, search, edit, and monitor video content programmatically.
origin: ECC
---

# VideoDB Skill

Perception + memory + actions for video, live streams, and desktop sessions.

## When to Use

### Desktop Perception
- Start/stop desktop sessions capturing screen, mic, and system audio
- Stream live context and store episodic session memory
- Run real-time alerts/triggers on what's spoken and happening on screen

### Video ingest + stream
- Ingest a file or URL and return a playable web stream link
- Transcode/normalize: codec, bitrate, fps, resolution, aspect ratio

### Index + search
- Build visual, spoken, and keyword indexes
- Search and return exact moments with timestamps and playable evidence
- Auto-create clips from search results

### Timeline editing + generation
- Subtitles: generate, translate, burn-in
- Overlays: text/image/branding, motion captions
- Audio: background music, voiceover, dubbing

### Live streams (RTSP) + monitoring
- Connect RTSP/live feeds
- Run real-time visual and spoken understanding and emit events/alerts

## Setup

```bash
pip install "videodb[capture]" python-dotenv
```

Set `VIDEO_DB_API_KEY` via environment variable or `.env` file. Get a free API key at console.videodb.io.

## Quick Reference

```python
from dotenv import load_dotenv
load_dotenv(".env")
import videodb
conn = videodb.connect()
coll = conn.get_collection()

# Upload
video = coll.upload(url="https://example.com/video.mp4")

# Transcript + subtitle
video.index_spoken_words(force=True)
text = video.get_transcript_text()
stream_url = video.add_subtitle()

# Search
results = video.search("product demo")
stream_url = results.compile()
```

## Common Pitfalls

| Scenario | Solution |
|----------|----------|
| Already-indexed video | Use `force=True` |
| Search finds no matches | Catch `InvalidRequestError` and treat as empty |
| Reframe times out | Limit segment with `start`/`end` or use `callback_url` |
| Negative timestamps | Always validate `start >= 0` |

Do not use ffmpeg, moviepy, or local encoding tools when VideoDB supports the operation server-side.
