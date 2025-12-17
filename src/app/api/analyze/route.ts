import { NextResponse } from 'next/server';

// Using Meta Llama 3.1 - excellent at understanding context and sarcasm  
const MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';

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

    const prompt = `<s>[INST] You are an expert at understanding subtext, sarcasm, and hidden meanings in text messages.

Message: "${message}"
${context ? `Context: ${context}` : 'No additional context provided'}

IMPORTANT: Analyze for sarcasm, passive-aggressiveness, and hidden emotions. Consider:
- Is this message sarcastic? (e.g., "do whatever you want" often means "don't do that")
- Are they hiding frustration, hurt, or other emotions?
- What are they REALLY trying to communicate?

Provide your analysis as JSON (ONLY JSON, no other text):
{
  "interpretations": [
    {"title": "Brief interpretation name", "description": "1-2 sentence explanation of what they might really mean"},
    {"title": "Second interpretation", "description": "Another possible meaning"},
    {"title": "Third interpretation", "description": "A third possibility"}
  ],
  "clarifyingQuestion": "A thoughtful question to ask them to understand better",
  "replies": ["Reply option 1 in ${selectedTone} tone", "Reply option 2 in ${selectedTone} tone", "Reply option 3 in ${selectedTone} tone"],
  "confidence": "high or medium or low"
}

Be direct about sarcasm and passive-aggression when detected. Avoid stereotypes. [/INST]`;

    // Try to use Hugging Face AI with retries
    let result;
    let retries = 3;
    
    while (retries > 0 && !result) {
      try {
        // Use serverless inference endpoint (works with free tier)
        const apiResponse = await fetch(
          `https://api-inference.huggingface.co/models/${MODEL}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: prompt,
              parameters: {
                max_new_tokens: 1000,
                temperature: 0.8,
                top_p: 0.95,
                return_full_text: false,
              },
              options: {
                wait_for_model: true,
              }
            }),
          }
        );

        if (apiResponse.ok) {
          const data = await apiResponse.json();
          
          // Handle different response formats
          let text = '';
          if (Array.isArray(data)) {
            text = data[0]?.generated_text || '';
          } else if (data.generated_text) {
            text = data.generated_text;
          } else if (typeof data === 'string') {
            text = data;
          }
          
          // Extract JSON from response
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          
          if (jsonMatch) {
            try {
              result = JSON.parse(jsonMatch[0]);
              console.log('AI successfully analyzed message');
            } catch (parseError) {
              console.log('Failed to parse AI response');
            }
          }
        } else {
          const error = await apiResponse.text();
          console.log(`API error (${apiResponse.status}): ${error}`);
          
          // If model is loading, wait and retry
          if (apiResponse.status === 503 && retries > 1) {
            console.log('Model loading, waiting 3 seconds...');
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      } catch (error) {
        console.log('AI API error:', error);
      }
      
      retries--;
      if (!result && retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
      }
    }
    
    // Use intelligent fallback only if AI completely failed
    if (!result) {
      console.log('Using intelligent fallback (AI did not respond)');
      const msgLower = message.toLowerCase();
      const isShort = message.length < 10;
      const isFine = msgLower.includes('fine') || msgLower.includes('ok') && !msgLower.includes('okay');
      const needToTalk = msgLower.includes('talk') || msgLower.includes('discuss');
      const doWhatever = msgLower.includes('whatever') || (msgLower.includes('do') && msgLower.includes('want'));
      const dontCare = msgLower.includes('don\'t care') || msgLower.includes('doesnt matter') || msgLower.includes('doesn\'t matter');
      const upToYou = (msgLower.includes('up to you') || msgLower.includes('your choice') || msgLower.includes('you decide'));
      const nothing = msgLower === 'nothing' || msgLower === 'nvm' || msgLower === 'nevermind';
      const justK = msgLower.trim() === 'k' || msgLower.trim() === 'ok' || msgLower.trim() === 'okay';
      
      // Generate contextual interpretations based on the message
      if (doWhatever || dontCare || upToYou) {
        result = {
          interpretations: [
            { title: 'Passive-aggressive / Sarcastic', description: 'They\'re upset and this is sarcasm - they definitely don\'t want you to "do whatever." This is a classic passive-aggressive response.' },
            { title: 'Frustrated & Hurt', description: 'They feel like their opinion isn\'t being valued or heard. They\'re expressing frustration that you\'re not considering what they actually want.' },
            { title: 'Testing Your Attentiveness', description: 'They want to see if you\'ll notice they\'re bothered and ask what they really want, without them having to explicitly say it.' },
          ],
          clarifyingQuestion: 'I can tell you\'re not actually okay with this. What would you really prefer?',
          replies: selectedTone === 'serious' ? [
            'I can tell this bothers you. Please tell me what you really want.',
            'Your opinion matters to me. What are you actually thinking?',
            'I don\'t want to just do whatever. What would make you happy?',
          ] : [
            'Come on, I know you care. What do you actually want?',
            'That doesn\'t sound like you mean it. Talk to me!',
            'Your opinion matters to me - what would you really prefer?',
          ],
          confidence: 'high',
        };
      } else if (nothing || justK) {
        result = {
          interpretations: [
            { title: 'Not Nothing / Dismissive', description: 'It\'s probably not "nothing." They might be upset but don\'t want to talk about it right now, or testing if you\'ll push to find out.' },
            { title: 'Minimally Engaged', description: 'They could be busy, distracted, or not in the mood to communicate. The short response shows low engagement.' },
            { title: 'Passive Acknowledgment', description: 'They heard you but don\'t have much to say, or they\'re being short because they\'re annoyed about something else.' },
          ],
          clarifyingQuestion: 'Is everything okay? You seem brief.',
          replies: selectedTone === 'warm' ? [
            'You sure? I\'m here if something\'s on your mind.',
            'Alright, but let me know if you want to talk ❤️',
            'Okay, but I\'m here whenever you need me.',
          ] : [
            'Okay, but let me know if you want to talk.',
            'Got it. Here if you need anything.',
            'Alright, just checking in.',
          ],
          confidence: 'medium',
        };
      } else if (needToTalk) {
        result = {
          interpretations: [
            { title: 'Something important', description: 'They have something significant they want to discuss with you.' },
            { title: 'Seeking resolution', description: 'There might be an issue they want to address together.' },
            { title: 'Checking in', description: 'They could want to have a meaningful conversation or update.' },
          ],
          clarifyingQuestion: 'Is everything okay? When would be a good time to talk?',
          replies: selectedTone === 'serious' ? [
            'Of course. When works for you?',
            'I\'m here. What\'s on your mind?',
            'Sure, let\'s talk. Is now a good time?',
          ] : [
            'Sure! What\'s up?',
            'Of course! When\'s good for you?',
            'I\'m all ears. Want to chat now?',
          ],
          confidence: 'medium',
        };
      } else if (isFine) {
        result = {
          interpretations: [
            { title: 'Genuinely okay', description: 'They might actually be fine and just letting you know.' },
            { title: 'Not ready to talk', description: 'They could need some space to process their feelings.' },
            { title: 'Minimizing feelings', description: 'They might be downplaying what they\'re going through.' },
          ],
          clarifyingQuestion: 'You sure? I\'m here if you want to talk about anything.',
          replies: selectedTone === 'warm' ? [
            'Glad to hear it! Let me know if that changes.',
            'Okay, but I\'m here if you need anything.',
            'Alright, just checking in on you ❤️',
          ] : [
            'Cool, just wanted to check.',
            'Okay, here if you need me.',
            'Got it. Let me know if anything comes up.',
          ],
          confidence: 'low',
        };
      } else if (isShort) {
        result = {
          interpretations: [
            { title: 'Busy or distracted', description: 'They might be occupied and replying quickly.' },
            { title: 'Not in the mood', description: 'They could be feeling off and not up for chatting.' },
            { title: 'Just acknowledging', description: 'It might be a simple acknowledgment without deeper meaning.' },
          ],
          clarifyingQuestion: 'Everything alright? You seem brief.',
          replies: [
            'Got it!',
            'Okay, talk later?',
            'Cool, let me know if you want to chat.',
          ],
          confidence: 'low',
        };
      } else {
        result = {
          interpretations: [
            { title: 'Direct communication', description: 'They\'re being straightforward about what they mean.' },
            { title: 'Seeking response', description: 'They want your thoughts or input on what they said.' },
            { title: 'Sharing an update', description: 'They\'re keeping you in the loop about something.' },
          ],
          clarifyingQuestion: 'Want me to respond to anything specific?',
          replies: selectedTone === 'warm' ? [
            'Thanks for letting me know!',
            'I appreciate you sharing that with me.',
            'Got it, thanks for the heads up!',
          ] : [
            'Understood!',
            'Thanks for the update.',
            'Got it, appreciate it.',
          ],
          confidence: 'medium',
        };
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze message. Please try again.' },
      { status: 500 }
    );
  }
}

