# 🚀 Quick Start (5 Minutes)

## Step 1: Get API Key (2 min)
1. Go to https://huggingface.co/settings/tokens
2. Create account (free)
3. Click "New token" → Name it → Select "Read"
4. Copy token (starts with `hf_`)

## Step 2: Setup (1 min)
```bash
cd ~/what-does-she-mean

# Create env file
echo 'HUGGINGFACE_API_KEY=hf_your_token_here' > .env.local
# ⚠️ Replace hf_your_token_here with your actual token!

# Install
npm install
```

## Step 3: Run (1 min)
```bash
npm run dev
```

Open http://localhost:3000

## Step 4: Test (1 min)
Try these messages:
- "I'm fine"
- "We need to talk"
- "k"

Choose a tone, click "Decode Message" ✨

---

## 🎯 For Your Portfolio

### Capture These:
- [ ] Screenshots of the UI
- [ ] User testing with 5-8 people
- [ ] Metrics: time saved, trust rating
- [ ] Before/after comparisons

### Case Study Structure:
1. Problem (communication ambiguity)
2. Approach (responsible AI, no stereotypes)
3. Design iterations (show 2-3)
4. Key features (interpretations, tone slider)
5. Results (user feedback, metrics)
6. Next steps (what you'd improve)

See `PORTFOLIO_GUIDE.md` for full details!

---

## 🚢 Deploy to Vercel
```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial commit: Vibe Check app"
git remote add origin your-repo-url
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Import your repo
# 3. Add HUGGINGFACE_API_KEY in settings
# 4. Deploy!
```

---

## 💡 Tips

**First request slow?**
- Cold start takes 20-30s
- After that: 1-3s per request

**Want faster responses?**
- Change model to `microsoft/Phi-3-mini-4k-instruct` in `src/app/api/analyze/route.ts`

**Need help?**
- Check `ENV_SETUP.md` for troubleshooting
- Check `PORTFOLIO_GUIDE.md` for case study tips

---

Good luck with your portfolio! 🎨

