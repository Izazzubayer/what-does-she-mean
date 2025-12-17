'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Loader2, Copy, Check, Sparkles, MessageCircle, Lightbulb } from 'lucide-react';
import { ExampleMessages } from '@/components/example-messages';

type ToneType = 'chill' | 'warm' | 'flirty' | 'serious';

interface AnalysisResult {
  interpretations: Array<{
    title: string;
    description: string;
  }>;
  clarifyingQuestion: string;
  replies: string[];
  confidence: 'high' | 'medium' | 'low';
}

export default function Home() {
  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<ToneType>('warm');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showPrivacyNote, setShowPrivacyNote] = useState(true);

  const tones: Array<{ value: ToneType; label: string; index: number }> = [
    { value: 'chill', label: 'Chill', index: 0 },
    { value: 'warm', label: 'Warm', index: 1 },
    { value: 'flirty', label: 'Flirty', index: 2 },
    { value: 'serious', label: 'Serious', index: 3 },
  ];

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context, tone }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">Vibe Check</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Decode the subtext. Reply with class.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Privacy Notice */}
        {showPrivacyNote && (
          <Card className="mb-6 border-muted">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">🔒 Privacy-first</p>
                  <p className="text-sm text-muted-foreground">
                    Messages are processed securely and not stored on our servers.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPrivacyNote(false)}
                  className="text-xs"
                >
                  Got it
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What did they say?</CardTitle>
              <CardDescription>
                Paste the message you received below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g., &quot;I'm fine&quot; or &quot;We need to talk&quot;"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none"
              />

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Optional context
                </label>
                <Textarea
                  placeholder="e.g., We had an argument earlier, or They seem stressed lately"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[80px] resize-none text-sm"
                />
              </div>

              {/* Tone Selector */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Reply tone</label>
                  <Badge variant="secondary" className="text-xs">
                    {tones.find((t) => t.value === tone)?.label}
                  </Badge>
                </div>
                <Slider
                  value={[tones.findIndex((t) => t.value === tone)]}
                  onValueChange={([value]) => setTone(tones[value].value)}
                  max={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {tones.map((t) => (
                    <span key={t.value}>{t.label}</span>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!message.trim() || loading}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Decode Message
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Example Messages - Show only when no result */}
          {!result && !loading && (
            <ExampleMessages
              onSelect={(msg, ctx) => {
                setMessage(msg);
                if (ctx) setContext(ctx);
              }}
            />
          )}

          {/* Results Section */}
          {result && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Confidence Badge */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    result.confidence === 'high'
                      ? 'default'
                      : result.confidence === 'medium'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {result.confidence} confidence
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Remember: these are just possibilities, not certainties
                </span>
              </div>

              {/* Interpretations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Possible meanings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.interpretations.map((interp, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border bg-muted/30"
                    >
                      <h3 className="font-medium mb-1 text-sm">{interp.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {interp.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Clarifying Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Not sure? Ask this
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg border border-border bg-muted/30">
                    <p className="text-sm">{result.clarifyingQuestion}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Reply Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggested replies</CardTitle>
                  <CardDescription>
                    Pick one or use as inspiration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.replies.map((reply, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
                    >
                      <p className="text-sm flex-1">{reply}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(reply, index)}
                        className="shrink-0"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <p className="text-xs text-center text-muted-foreground">
                AI suggestions may not always be accurate. Use your judgment and communicate openly.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <p className="text-xs text-center text-muted-foreground">
            Built with care • No data stored • Respectful AI
          </p>
        </div>
      </footer>
    </div>
  );
}
