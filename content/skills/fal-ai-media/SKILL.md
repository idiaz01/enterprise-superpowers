---
name: fal-ai-media
description: fal.ai media generation -- unified access to AI models for images, videos, and audio through MCP server integration.
origin: ECC
---

# fal.ai Media Generation

Unified access to multiple AI models for creating images, videos, and audio content through an MCP server integration.

## When to Use

- Generating images from text prompts
- Creating videos from text or images
- Synthesizing speech or generating audio from video
- Prototyping creative content with AI models

## Setup

Configure MCP server in `~/.claude.json` with a `FAL_KEY` environment variable obtained from fal.ai.

## Capabilities

### Image Generation

- **Nano Banana 2**: Fast, cost-effective image generation for prompt iteration
- **Nano Banana Pro**: Production images, realism, typography, detailed prompts

### Video Creation

- **Seedance 1.0 Pro**: Text-to-video and image-to-video
- **Kling Video v3 Pro**: High-quality video generation
- **Veo 3**: Advanced video generation with durations up to 10 seconds

### Audio Synthesis

- **CSM-1B**: Conversational speech synthesis
- **ThinkSound**: Generate matching audio from video content

## Best Practices

- Start with lower-cost models (Nano Banana 2) for prompt iteration, then switch to Pro for finals
- Image-to-video produces more controlled results than pure text-to-video
- Use cost estimation tools to assess expenses before generation
- Provide detailed, specific prompts for better results
