# Vibe Check 💬

**Decode the subtext. Reply with class.**

A playful, respectful AI-powered web app that helps you understand ambiguous text messages and craft thoughtful replies. Built for anyone navigating modern communication.

## ✨ Features

- **3 Plausible Interpretations**: Get multiple perspectives on what a message might mean
- **Clarifying Questions**: Suggestions for what to ask if you're unsure
- **Smart Reply Generation**: Context-aware replies with adjustable tone
- **Tone Slider**: Choose from Chill, Warm, Flirty, or Serious
- **Privacy-First**: No message storage, secure processing
- **Uncertainty UI**: AI presents guesses, not certainties
- **Accessible**: WCAG-compliant, keyboard-friendly
- **Beautiful UI**: Clean black & white design with shadcn components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A free Hugging Face API key ([get one here](https://huggingface.co/settings/tokens))

### Installation

1. Clone the repository:
```bash
cd what-does-she-mean
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
HUGGINGFACE_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🤖 AI Models

This app uses **Mistral-7B-Instruct-v0.2** via Hugging Face's free Inference API. Alternative models you can try:

- `meta-llama/Meta-Llama-3-8B-Instruct` - Latest Meta model
- `microsoft/Phi-3-mini-4k-instruct` - Super fast & lightweight
- `google/flan-t5-large` - Great for structured outputs

Change the model in `src/app/api/analyze/route.ts`:
```typescript
const MODEL = 'your-preferred-model';
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (zinc theme)
- **Icons**: Lucide React
- **AI**: Hugging Face Inference API
- **Deployment**: Vercel-ready

## 📦 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts       # AI inference endpoint
│   ├── page.tsx               # Main UI
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/                    # shadcn components
└── lib/
    └── utils.ts
```

## 🔒 Privacy & Safety

- **No data storage**: Messages are processed but never saved
- **Respectful AI**: Avoids stereotypes and "mind-reading" language
- **Uncertainty framing**: Results presented as possibilities
- **Sensitivity detection**: Graceful handling of concerning content

## 🎯 Portfolio Highlights

This project demonstrates:

- **Product thinking**: User-centered design for a real communication problem
- **Responsible AI UX**: Transparency, uncertainty, and user control
- **Craft**: Polished UI, micro-interactions, accessibility
- **Technical depth**: Next.js API routes, AI integration, state management
- **Safety**: Privacy controls, ethical considerations

## 🚢 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/what-does-she-mean)

1. Click the button above
2. Add your `HUGGINGFACE_API_KEY` environment variable
3. Deploy!

## 📝 Usage Examples

**Input**: "I'm fine"
**Context**: Had an argument earlier

**Output**:
- ✅ Interpretations: Seeking space / Actually okay / Wanting you to ask more
- 💡 Clarifying question: "Do you want to talk about it, or do you need some space?"
- 💬 Replies: "I'm here if you want to talk" / "Take your time, no pressure" / "Let me know if I can help"

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Lint
npm run lint
```

## 📄 License

MIT License - feel free to use this for your portfolio!

## 🙏 Credits

Built with [Next.js](https://nextjs.org), [shadcn/ui](https://ui.shadcn.com), and [Hugging Face](https://huggingface.co)

---

Made with care for better communication 💌
