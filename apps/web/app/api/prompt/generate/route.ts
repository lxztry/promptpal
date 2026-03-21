import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const IMAGE_STYLE_PROMPTS = {
  photorealistic: 'photorealistic, natural lighting, professional camera, Canon EOS R5, 85mm lens, shallow depth of field, 8K resolution, hyperrealistic',
  portrait: 'portrait photography, soft lighting, studio lighting, Canon 85mm f/1.4, creamy bokeh background, professional retouching',
  anime: 'anime illustration style, Studio Ghibli, Hayao Miyazaki style, hand-drawn texture, warm colors, soft lighting, high quality animation',
  '3d-render': '3D render style, Octane renderer, Cinema 4D, cinematic lighting, detailed modeling, next-gen quality, cool background',
  cyberpunk: 'cyberpunk style, neon lights, Blade Runner aesthetic, dark tones, rainy city, futuristic tech vibe, digital glitch effects',
};

export async function POST(request: NextRequest) {
  try {
    const { type, input, style } = await request.json();

    let prompt = '';

    if (type === 'text') {
      // 文本转提示词
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a professional AI image prompt engineer. Generate optimized prompts for AI image generation based on user input.

Rules:
1. Understand user intent and extract core elements
2. Add appropriate artistic style and quality parameters
3. Output in English (better for AI image models)
4. Keep it concise but detailed
5. Include lighting, composition, and style keywords

Output format: Just the prompt, no explanations.`,
          },
          {
            role: 'user',
            content: `Generate an AI image prompt for: ${input}\n\nStyle: ${style?.name || 'photorealistic'}`,
          },
        ],
        max_tokens: 200,
      });

      prompt = response.choices[0]?.message?.content || '';
    } else if (type === 'image') {
      // 图片转提示词
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a professional AI image prompt engineer. Analyze the reference image and generate a prompt that can recreate similar style images.

Extract and include:
1. Main subject and content
2. Artistic style and visual effects
3. Lighting and color tone
4. Composition and perspective
5. Mood and atmosphere

Output in English, concise but detailed.`,
          },
          {
            role: 'user',
            content: `Analyze this image and generate an AI image prompt that can recreate similar style:\n\n${input}`,
          },
        ],
        max_tokens: 200,
      });

      prompt = response.choices[0]?.message?.content || '';
    } else if (type === 'video') {
      // 视频脚本
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a professional video storyboard assistant. Generate a video script/storyboard based on user input.

Output format:
1. Scene description
2. Shot type (close-up/medium/wide)
3. Camera movement (pan/tilt/dolly)
4. Duration suggestion
5. Visual description
6. Narration suggestions`,
          },
          {
            role: 'user',
            content: `Generate a video storyboard for: ${input}`,
          },
        ],
        max_tokens: 500,
      });

      prompt = response.choices[0]?.message?.content || '';
    }

    return NextResponse.json({ prompt: prompt.trim() });
  } catch (error) {
    console.error('Prompt generation error:', error);
    return NextResponse.json(
      { error: '生成失败，请重试' },
      { status: 500 }
    );
  }
}
