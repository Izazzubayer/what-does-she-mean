import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Using Mistral-7B-Instruct-v0.2 for best free tier performance
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';

export async function POST(request: Request) {
  try {
    const { message, context, tone } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const toneMap: Record<string, string> = {
      chill: 'casual and laid-back',
      warm: 'warm and caring',
      flirty: 'playful and flirty',
      serious: 'thoughtful and serious',
    };

    const selectedTone = toneMap[tone] || 'balanced and respectful';

    const prompt = `You are a communication assistant helping someone understand a text message better.

Message received: "${message}"
${context ? `Context: ${context}` : ''}

Analyze this message and provide:
1. Three plausible interpretations (each 1-2 sentences)
2. One clarifying question they could ask
3. Three reply suggestions with a ${selectedTone} tone

Format your response EXACTLY as JSON:
{
  "interpretations": [
    {"title": "Interpretation 1", "description": "..."},
    {"title": "Interpretation 2", "description": "..."},
    {"title": "Interpretation 3", "description": "..."}
  ],
  "clarifyingQuestion": "...",
  "replies": ["...", "...", "..."],
  "confidence": "high|medium|low"
}

Important:
- Be respectful and avoid stereotypes
- Present interpretations as possibilities, not certainties
- Keep replies appropriate and kind
- Use "I might be wrong" language`;

    const response = await hf.textGeneration({
      model: MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
        top_p: 0.9,
        return_full_text: false,
      },
    });

    // Extract JSON from response
    const text = response.generated_text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      // Fallback response if AI doesn't return proper JSON
      return NextResponse.json({
        interpretations: [
          {
            title: 'Seeking reassurance',
            description: 'They might be looking for confirmation or support from you.',
          },
          {
            title: 'Sharing feelings',
            description: 'They could be expressing how they feel and want you to understand.',
          },
          {
            title: 'Setting a boundary',
            description: 'They might be communicating a need or limit in a gentle way.',
          },
        ],
        clarifyingQuestion: 'Can you tell me more about what you\'re feeling?',
        replies: [
          'I hear you. Want to talk about it?',
          'Thanks for sharing. How can I support you?',
          'I appreciate you telling me. Let\'s figure this out together.',
        ],
        confidence: 'medium',
      });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze message. Please try again.' },
      { status: 500 }
    );
  }
}

