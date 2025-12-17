# Environment Setup Guide

## 🔑 Getting Your Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up for a free account (if you don't have one)
3. Navigate to Settings → [Access Tokens](https://huggingface.co/settings/tokens)
4. Click "New token"
5. Give it a name (e.g., "vibe-check-app")
6. Select "Read" permissions (that's all you need)
7. Click "Generate token"
8. Copy the token

## 📝 Setting Up Your Environment

Create a `.env.local` file in the root of your project:

```bash
# In the what-does-she-mean directory
touch .env.local
```

Add your API key to the file:

```env
HUGGINGFACE_API_KEY=hf_your_actual_token_here
```

**Important**: Never commit your `.env.local` file to git. It's already in `.gitignore`.

## 🎯 Model Options

The app is configured to use **Mistral-7B-Instruct-v0.2** by default, but you can try these alternatives:

### Option 1: Mistral-7B (Default - Recommended)
```typescript
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2';
```
- **Best for**: Balanced quality and speed
- **Free tier**: ✅ Yes
- **Response quality**: Excellent

### Option 2: Meta Llama 3
```typescript
const MODEL = 'meta-llama/Meta-Llama-3-8B-Instruct';
```
- **Best for**: Highest reasoning quality
- **Free tier**: ✅ Yes
- **Response quality**: Outstanding

### Option 3: Microsoft Phi-3
```typescript
const MODEL = 'microsoft/Phi-3-mini-4k-instruct';
```
- **Best for**: Speed (fastest)
- **Free tier**: ✅ Yes
- **Response quality**: Very good

### Option 4: Flan-T5
```typescript
const MODEL = 'google/flan-t5-large';
```
- **Best for**: Structured JSON outputs
- **Free tier**: ✅ Yes
- **Response quality**: Good

## 🚀 Vercel Deployment

When deploying to Vercel:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - Key: `HUGGINGFACE_API_KEY`
   - Value: Your token
   - Environment: Production (and Preview if you want)
4. Redeploy

## ⚠️ Free Tier Limits

Hugging Face free tier limits:
- ~1,000 requests per day
- Rate limit: ~1 request per second
- Perfect for portfolio projects and demos

If you need more, consider:
- Hugging Face Pro ($9/month)
- Running models locally with Ollama (free, but needs setup)

## 🔧 Troubleshooting

**"Invalid token" error?**
- Make sure your token starts with `hf_`
- Check you've selected "Read" permissions
- Try generating a new token

**"Model loading" or slow responses?**
- First request can take 20-30 seconds (cold start)
- Subsequent requests are much faster
- Consider switching to Phi-3 for speed

**Rate limit errors?**
- Wait a few seconds between requests
- Upgrade to Pro for higher limits

## 📞 Need Help?

- [Hugging Face Docs](https://huggingface.co/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

