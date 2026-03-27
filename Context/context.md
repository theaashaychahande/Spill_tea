# Spill - Digital Slam Book PRD

## 1. Product Overview
A web-based digital slam book where you create a personalized question set, share it with friends via a simple link, collect their answers, and get a beautiful shareable card to post on Instagram stories. It is designed specifically for the Indian audience.

**One line:** "Let them spill. Find out what your friends really think about you — no app needed."

## 2. Target Audience
- Age 18–35
- Active on Instagram / WhatsApp
- Nostalgic millennials & Gen Z
- Social, friend-group oriented people

## 3. Core Problem It Solves
- No fun, personal way to know how friends see you
- Existing personality tools (like 16personalities) are solo — not social
- Nothing shareable + nostalgic exists for adults right now

## 4. Feature List

### Must Have (V1)
- Create a slam book with preset + custom questions
- Unique shareable link generation
- Friends fill it anonymously or with name
- Short answer types — one word, emoji, multiple choice, rating
- Beautiful result card generated automatically
- Card downloadable for Instagram story

### Good to Have (V2)
- Multiple card templates / themes
- Stats view — "80% say you're the funny one"
- Roast mode vs appreciation mode toggle
- View count vs fill count
- Expiry on links (24hr, 7 days)

### Future (V3)
- Group slam books (whole friend group fills one)
- Leaderboard style — most votes on a trait
- Seasonal templates (birthday, New Year etc.)

## 5. User Flow
1. **Create Book** → Customize Questions → Get Link
2. **Share** on WhatsApp/Instagram
3. **Friends** open link → Fill answers
4. **Creator** gets notified
5. **View Results** + Download Card → Post on Instagram Story

## 6. Question Types
- One word answer
- Pick one (multiple choice)
- Emoji reaction
- Rate 1–5
- One sentence max (for spicy questions only)

## 7. The Card (Most Important Feature)
- Shows "Your friends think you are..."
- Bold personality words in big font
- Clean aesthetic — 3-4 template styles
- Instagram story dimensions (9:16)
- Downloadable as PNG instantly

## 8. Tech Stack Idea
| Part | What to Use | Why |
| :--- | :--- | :--- |
| Frontend | Next.js | Fast, SEO friendly, easy deploy |
| Styling | Tailwind CSS | Quick beautiful UI |
| Backend | Supabase / Firebase | Easy database + auth, free tier |
| Link system | Nanoid (short IDs) | Clean short links |
| Card generation | html2canvas | Convert card to downloadable image |
| Hosting | Vercel / Netlify | Free, instant deploy |

## 9. Success Metrics
- Links shared per user
- Fill rate (how many who open actually complete)
- Card download rate
- Return users (people who make a second book)

## 10. What Makes It Viral
- The card is the distribution engine — every story post = free marketing
- Zero friction (no signup needed to fill)
- Emotionally satisfying to see results
- Nostalgic angle = people talk about it

---

## Slam Book Questions — Psychologically Designed
- Max 15 questions per category (filling = under 3 mins)
- Every question triggers an emotion — nostalgia, humor, curiosity, warmth
- Mix of formats — no 3 same types in a row
- Slightly spicy but never offensive
- Makes the filler feel clever & entertained

### 👯 Category 1 — Friends
| # | Question | Answer Type |
| :--- | :--- | :--- |
| 1 | If I was a snack, I'd be... | One word |
| 2 | Honestly, my vibe is more... | 🌙 Night owl / ☀️ Morning chaos |
| 3 | Rate my rizz out of 10 | 1–10 slider |
| 4 | I would survive a zombie apocalypse | ✅ Absolutely / ❌ First to go / 😂 Depends on mood |
| 5 | The one thing I'm lowkey delusional about | One line |
| 6 | My biggest red flag is... | One word |
| 7 | If my life was a movie genre it'd be | Rom-com / Horror / Documentary / Chaos |
| 8 | Am I the main character or side character energy? | Main / Side / Villain arc |
| 9 | One word that is literally just... me | One word |
| 10 | My toxic trait in a friendship is... | One line |
| 11 | If I had a warning label it would say... | One line |
| 12 | How likely am I to cancel plans last minute? | 🔥 Always / Sometimes / Never (liar) |
| 13 | The thing I'm secretly the best at | One line |
| 14 | My friendship style is... | Therapist friend / Hype person / The funny one / Disappears then reappears |
| 15 | One thing you'd never change about me | One line |

### ✨ Category 2 — The "What Are We" Energy
*Attracted, exploring, fun — not awkward, never too much*
| # | Question | Answer Type |
| :--- | :--- | :--- |
| 1 | First word that came to mind when you first saw me | One word |
| 2 | My vibe is more... | 🌙 Mysterious & interesting / ☀️ Warm & easy to be around / ⚡ Exciting & unpredictable |
| 3 | Honestly, talking to me feels... | Comfortable / Exciting / Both at the same time (dangerous) |
| 4 | If I was a song, what kind would I be | Slow burn playlist / Late night drive / Feel good summer hit / Can't get out of your head |
| 5 | The thing about me that caught your attention first | One line |
| 6 | My flirting style is... | Subtle & you'd almost miss it / Very obvious / Pretends not to flirt / Accidentally charming |
| 7 | How easy am I to read? | Open book / Takes time / Total mystery / Thinks they're mysterious but aren't 😂 |
| 8 | Rate the vibe between us | 1–10 (you know what you picked 👀) |
| 9 | I seem like someone who is... | A better texter than caller / Worse texter but better in person / Both chaotic |
| 10 | One thing you're genuinely curious about me | One line |
| 11 | My energy when I like someone is... | Extra attentive / Acts normal but thinks about them 24/7 / Teases them / Gets awkward |
| 12 | If we went on a spontaneous trip, I'd probably... | Plan everything secretly / Just go with flow / Suggest something unexpected / Get us lost in a fun way |
| 13 | One green flag you've noticed about me | One line |
| 14 | The feeling I give you is closest to... | Butterflies / Comfort / Excitement / "why am I smiling at my phone" |
| 15 | If this thing between us was a movie scene it'd be... | Almost kiss moment / Late night talking forever / Pretending we're just friends / The moment before everything changes |

### 💕 Category 3 — Partner
*Romantic + Spicy + Funny + Sarcastic — for people who are actually together*
| # | Question | Answer Type |
| :--- | :--- | :--- |
| 1 | On a scale of 1–10 how obsessed are you with me | 1–10 (be honest we both know it's 10) |
| 2 | The first thing you notice when I walk into a room | One line |
| 3 | My kiss style is... | Soft & slow / Intense & passionate / Depends on the mood / Always catches me off guard |
| 4 | When I'm being annoying you... | Find it secretly cute / Actually get annoyed / Pretend to be annoyed but love it / Leave the room 😂 |
| 5 | The most attractive thing about me that has nothing to do with looks | One line |
| 6 | Rate how well I am at... making you feel wanted | 1–10 |
| 7 | When I say "I'm fine" you know it means... | Actually fine / Run. Now. / Give me 10 mins / Check in quietly |
| 8 | The thing I do that makes you think "god why am I like this about them" | One line |
| 9 | My energy at 2am is... | Deep talks & overthinking / Cuddly & soft / Randomly funny / Still somehow attractive which is unfair |
| 10 | One thing I do that you'd never admit turns you on | One line 👀 |
| 11 | If our relationship was a series it'd be... | Slow burn that finally happened / Chaotic love story / Comfort show you rewatch forever / Too good to be real |
| 12 | Biggest thing you've had to put up with because of me | One line (sarcasm fully welcome 😂) |
| 13 | The way I love you is... | Loudly & obviously / Quietly in a million small ways / Through actions not words / Chaotically but fully |
| 14 | One thing you hope never changes about us | One line |
| 15 | Finish this — being with you feels like... | One line |

---

## 🏆 Final Tech Stack
| Part | Tech |
| :--- | :--- |
| Frontend | Next.js (JavaScript) |
| Styling | Tailwind CSS |
| Database | Firebase Firestore |
| Auth | Firebase Anonymous Auth |
| Card Generation | html2canvas |
| Unique Links | Nanoid |
| Hosting | Netlify |

---

## 🚀 5 Step-by-Step Prompts to Build Complete App

### PROMPT 1 — Project Setup + Base Structure
Create a Next.js app with Tailwind CSS for a web app called "Spill" (One line: "Let them spill.") — a digital version of the classic slam book where users create a personalized question set, share it via a unique link, friends fill it out, and the creator gets a beautiful shareable card.

**Setup the following:**
- Initialize Next.js app with JavaScript (not TypeScript)
- Configure Tailwind CSS fully
- Setup Firebase project with Firestore and Anonymous Auth
- Install dependencies: `firebase`, `nanoid`, `html2canvas`
- Create the folder structure:
  - `/pages/index.js` (Landing page)
  - `/pages/create.js` (Create your slam book)
  - `/pages/book/[id].js` (Friend fills the book)
  - `/pages/results/[id].js` (Creator sees results)
  - `/components/QuestionCard.js`
  - `/components/ResultCard.js`
  - `/components/Navbar.js`
  - `/lib/firebase.js`
  - `/lib/questions.js` (Define 3 categories as arrays: `friends`, `exploring`, `partner`)

Each question object: `{ id, question, type, options[] }`. Types: `one-word`, `one-line`, `mcq`, `rating`, `emoji`.
Make sure Firebase initializes only once using a singleton pattern. Show complete code for all files.

### PROMPT 2 — Create Book Flow + Firestore Save
Build the complete Create Slam Book flow in `/pages/create.js`.
- Step 1: Pick category (Friends / Exploring / Partner)
- Step 2: Load 15 preset questions for that category
- Step 3: Optionally add up to 3 custom questions
- Step 4: Toggle anonymous mode (ON/OFF)
- Step 5: "Generate My Slam Book" button

On submit:
- Generate 8-char nanoid ID
- Save to Firestore `books` collection with: `id`, `creatorId`, `category`, `questions`, `anonymousMode`, `createdAt`, `responses: []`.
- Redirect to success page showing: unique link, "Copy Link", "Share on WhatsApp", "View Results".

UI: Clean, mobile-first, step transitions, loading state.

### PROMPT 3 — Friend Filling The Book
Build the filling experience at `/pages/book/[id].js`.
- Fetch book data from Firestore.
- Show one question at a time (story/swipe format) with a progress bar.
- Input types: `one-word`, `one-line` (max 80 chars), `mcq` (option cards), `rating` (1-10 slider), `emoji` (picker).
- If anonymousMode is OFF → ask for name.
- Save response to Firestore `responses` array.
- Show completion screen with confetti.

UI: Full screen mobile-first card layout, smooth animations.

### PROMPT 4 — Results Page + Stats View
Build the results page at `/pages/results/[id].js`.
- Real-time updates via `onSnapshot`.
- **SECTION 1 — Stats Overview:**
  - Total response count.
  - MCQ percentages.
  - Rating averages.
  - One-word cloud visualization.
  - One-line response list.
- **SECTION 2 — Individual Responses:**
  - Response cards with filler name and timestamp.
- Floating "Generate My Card 🎨" button.

### PROMPT 5 — Instagram Card Generator + Final Polish
- **CARD GENERATOR (/components/ResultCard.js):**
  - Use `html2canvas` for 1080x1920px (9:16) PNG.
  - Headline: "My friends think I am..."
  - Display top 5 interesting answers.
  - Branding: "slambook.app"
  - 4 templates: Dark gradient, Light pastel, Neon, Minimal.
- **FINAL POLISH:**
  - Landing page (`index.js`) with Hero, CTA, "How it works".
  - Page transitions, mobile responsiveness, Meta tags (OG tags).
  - Error states handling.
  - `netlify.toml` config and deployment instructions.

---

### Tips
1. Every MCQ question should have an option for custom input.
2. Limit emoji usage to keep the UI clean and avoid an "AI-generated" look.
3. Aim for an interesting, eye-catching UI.
