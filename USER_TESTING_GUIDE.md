# 👥 User Testing Guide

## Why Test?

For your portfolio case study, **user testing is critical**. It shows:
- You validate designs with real people
- You iterate based on feedback
- You measure impact with data

**Goal**: Test with 5-8 people, capture metrics + quotes.

---

## 🎯 Who to Test With

**Ideal participants:**
- Ages 18-35 (primary demographic for text communication)
- Mix of genders
- People who text regularly
- Friends, classmates, colleagues (not family—they're biased!)

**Recruit message:**
```
Hey! I built an AI tool that helps decode confusing text messages. 
Would you have 10 minutes to try it and give feedback? 
It's for my portfolio, and I'll share the results with you!
```

---

## 📋 Testing Script (10 minutes per person)

### Part 1: Introduction (1 min)
"Thanks for helping! I built a tool called Vibe Check that helps people understand ambiguous messages and craft replies. I want to see if it's useful and easy to use. There are no wrong answers—I want honest feedback!"

### Part 2: First Impressions (1 min)
**Show them the homepage (before they interact)**

Ask:
- "What do you think this tool does?"
- "Would you use something like this? Why or why not?"

### Part 3: Task 1 - Try an Example (3 min)
"Try one of the example messages. Choose a tone and click 'Decode Message'."

**Observe:**
- Do they understand the tone slider?
- Do they read all 3 interpretations?
- Do they notice the clarifying question?

**Ask after results appear:**
- "Are these interpretations helpful? Why or why not?"
- "Would you use any of these replies? Would you edit them?"
- "What do you think of the clarifying question?"

### Part 4: Task 2 - Use Their Own Message (3 min)
"Now think of a confusing message you've received recently. Type it in and try the tool."

**Observe:**
- Do they use the context field?
- Do they change the tone?
- Do they copy a reply?

**Ask:**
- "Did the results match what you expected?"
- "How long would it normally take you to draft a reply?"
- "Do you trust these suggestions? Why or why not?"

### Part 5: Feedback (2 min)
**Ask:**
1. "On a scale of 1-5, how helpful were the interpretations?"
2. "On a scale of 1-5, how much would you trust using these replies?"
3. "What would make this more useful?"
4. "Any concerns about using AI for communication?"

---

## 📊 Data to Capture

### Quantitative Metrics

Create a simple spreadsheet:

| Participant | Comprehension (1-5) | Trust (1-5) | Would Use? | Tone Used | Edited Reply? |
|-------------|---------------------|-------------|------------|-----------|---------------|
| P1          | 4                   | 3           | Yes        | Warm      | Yes           |
| P2          | 5                   | 4           | Yes        | Chill     | No            |
| ...         | ...                 | ...         | ...        | ...       | ...           |

**Calculate:**
- Average comprehension score
- Average trust score
- % who would use it
- Most popular tone
- % who edited replies

### Qualitative Feedback

Capture direct quotes:
- ✅ Positive: "This made me feel less anxious about 'we need to talk'"
- ❌ Negative: "The replies felt too formal for my style"
- 💡 Suggestions: "I wish it remembered previous messages"

---

## 🎯 Success Criteria

**Good results:**
- Comprehension: 3.5+ / 5
- Trust: 3.0+ / 5
- Would use: 60%+
- Positive quotes outnumber concerns

**If results are low:**
- That's okay! Iterate and test again
- Show both versions in your case study
- Demonstrates your process

---

## 🎨 What to Capture for Portfolio

### Screenshots
- [ ] Participant using the tool (with permission)
- [ ] Results screen with annotations
- [ ] Before/after of an iteration

### Quotes
- [ ] 3-5 positive quotes
- [ ] 1-2 constructive critiques
- [ ] 1-2 "aha moments"

### Data Visualization
Create a simple chart:
```
Comprehension: ████████░░ 4.2/5
Trust:         ███████░░░ 3.8/5
Would Use:     ████████░░ 75%
```

---

## 📝 Testing Template (Copy-Paste)

```
PARTICIPANT #___
Date: ___________
Age: ___ Gender: ___

FIRST IMPRESSIONS
Q: What does this tool do?
A: 

Q: Would you use it?
A: 

TASK 1 - EXAMPLE MESSAGE
Message tried: 
Tone selected: 
Observations:

Q: Are interpretations helpful? (1-5)
A: 

Q: Would you use these replies?
A: 

TASK 2 - OWN MESSAGE
Message used: 
Context added: Yes / No
Tone selected: 

Q: Did results match expectations?
A: 

Q: How long to draft normally?
A: 

Q: Trust level? (1-5)
A: 

FINAL FEEDBACK
Q: What would make this better?
A: 

Q: Any concerns?
A: 

BEST QUOTE:
"..."
```

---

## 🔄 Common Issues & Fixes

### Issue 1: "Interpretations are too similar"
**Fix**: Prompt engineering—ask AI for more diverse perspectives

### Issue 2: "Replies are too formal"
**Fix**: Adjust tone descriptions in the API prompt

### Issue 3: "I don't know what tone to pick"
**Fix**: Add descriptions under each tone label

### Issue 4: "Results take too long"
**Fix**: Add better loading state or switch to faster model

---

## 🎯 After Testing: Iteration Example

**Before Testing:**
- 4 tones (Chill, Warm, Flirty, Serious)
- No tone descriptions

**Feedback:**
- "I don't know the difference between Chill and Warm"
- "Flirty feels awkward for most situations"

**After Testing:**
- 3 tones (Casual, Warm, Thoughtful)
- Added descriptions: "Casual: laid-back and friendly"

**Result:**
- Comprehension improved from 3.2 → 4.1
- Usage of tone slider increased 40%

---

## 📊 Sample Results (For Your Case Study)

**Tested with 8 participants (ages 22-34, 5F/3M)**

### Quantitative Results:
- **Comprehension**: 4.2/5 (84%)
- **Trust**: 3.8/5 (76%)
- **Would use regularly**: 75% (6/8)
- **Time saved**: ~50% (3-4 min → 1.5-2 min)
- **Most popular tone**: Warm (55%), Chill (30%), Serious (15%)

### Key Insights:
1. Users valued having 3 interpretations (not just 1)
2. Clarifying question was used 62% of the time
3. 75% edited replies before sending (expected!)
4. Privacy notice increased trust significantly

### Top Quotes:
- ✅ "Made me feel less anxious about unclear messages"
- ✅ "Tone slider is genius—I got a reply I'd actually send"
- ✅ "Love that it suggests asking instead of assuming"
- ⚠️ "First load was slow, but results were worth it"
- 💡 "Would love to paste a whole conversation"

---

## 🎤 How to Present in Case Study

### Slide 1: Testing Overview
"Tested with 8 participants to validate design decisions"

### Slide 2: Key Metrics
[Chart showing comprehension, trust, usage]

### Slide 3: Insights
"Users wanted multiple interpretations, not a single 'answer'"

### Slide 4: Iteration
"Based on feedback, I added example messages → reduced time-to-first-use by 40%"

### Slide 5: Quotes
[3 user quotes with photos/avatars]

---

## ✅ Testing Checklist

Before testing:
- [ ] Tool is deployed and working
- [ ] You have 5-8 participants lined up
- [ ] Testing script printed/ready
- [ ] Screen recording software ready (with permission)
- [ ] Spreadsheet for data ready

During testing:
- [ ] Take notes on observations
- [ ] Capture direct quotes
- [ ] Screenshot key moments (with permission)
- [ ] Ask follow-up questions

After testing:
- [ ] Calculate average scores
- [ ] Identify top 3 insights
- [ ] List top 3 improvements to make
- [ ] Thank participants!
- [ ] Iterate and test again (optional)

---

**Testing = Portfolio Gold** 🏆

Big tech companies LOVE seeing:
- Real user feedback
- Data-driven decisions
- Iteration based on insights
- Humility (showing what didn't work)

Good luck! 🚀

