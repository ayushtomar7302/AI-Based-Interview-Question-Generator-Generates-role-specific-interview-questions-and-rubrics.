# AI-Based Interview Question Generator

Generates **role-specific interview questions** with **scoring rubrics**, follow-up probes and a practice scorer.
Works fully offline in the browser, and has an optional **AI mode (Google Gemini)** for fresh, unique questions.

## Features
- 5 roles: Web Developer, Data Scientist / ML Engineer, Software Engineer (DSA & Core CS), Cybersecurity Analyst, HR / Behavioral
- Choose difficulty (Easy / Medium / Hard / Mixed), number of questions and skill areas
- Every question comes with a 10-mark rubric (criteria, key points, red flags, score bands)
- Follow-up question for deeper interviews
- Practice mode: enter your score per question and get an overall result
- Export: Copy, TXT, JSON, Print / Save as PDF
- Dark / light theme
- Optional Gemini AI mode with automatic fallback to the offline engine

## How it works
1. **Offline engine** (`data.js` + `script.js`): a knowledge base of topics, keywords and questions per role.
   The generator filters by role, skills and difficulty, shuffles, and builds a rubric from role-type templates.
2. **AI mode**: sends a structured prompt to the Gemini API, asks for strict JSON (questions + rubric), validates it and renders it.

## Run it
No installation needed. Just open `index.html` in any browser.

Or serve locally:
```
python -m http.server 8000
```
then open http://localhost:8000

## Using AI mode
1. Get a free API key from Google AI Studio.
2. Tick "Use AI mode", paste the key (it is only kept in the page, never stored or uploaded).
3. Click Generate.

## Project structure
```
index.html   - UI layout
style.css    - styling (responsive, dark mode, print styles)
data.js      - role/topic/question knowledge base, rubric templates, score bands
script.js    - generator logic, AI integration, rendering, export
```

## Tech stack
HTML5, CSS3, vanilla JavaScript, Google Gemini API (optional)

## Future scope
- Resume-based question generation
- Voice answers with speech-to-text and automatic AI scoring
- More roles and company-specific question banks

## Author
Ayush Tomar, ABES Engineering College (CSE-AIML)
