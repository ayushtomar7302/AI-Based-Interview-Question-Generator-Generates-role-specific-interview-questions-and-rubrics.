/* AI-Based Interview Question Generator
 * Two modes:
 *  1) Offline engine  - rule-based generator using the knowledge base in data.js
 *  2) AI mode (Gemini) - optional; paste your own API key, questions + rubrics come from the LLM
 */

const $ = (id) => document.getElementById(id);
let currentSet = null; // { role, level, questions: [...], source }

// ---------- Setup UI ----------
function init() {
  const roleSel = $("role");
  Object.keys(ROLE_DATA).forEach((r) => roleSel.add(new Option(r, r)));
  roleSel.addEventListener("change", renderSkills);
  renderSkills();

  $("generateBtn").addEventListener("click", onGenerate);
  $("useAI").addEventListener("change", () => {
    $("aiBox").classList.toggle("hidden", !$("useAI").checked);
  });
  $("copyBtn").addEventListener("click", copyAll);
  $("txtBtn").addEventListener("click", () => download("interview-questions.txt", toText(currentSet), "text/plain"));
  $("jsonBtn").addEventListener("click", () =>
    download("interview-questions.json", JSON.stringify(currentSet, null, 2), "application/json")
  );
  $("printBtn").addEventListener("click", () => window.print());
  $("themeBtn").addEventListener("click", () => document.body.classList.toggle("dark"));
}

function renderSkills() {
  const role = $("role").value;
  const wrap = $("skills");
  wrap.innerHTML = "";
  ROLE_DATA[role].skills.forEach((s) => {
    const id = "sk_" + s.replace(/\W+/g, "_");
    const label = document.createElement("label");
    label.className = "chip";
    label.innerHTML = `<input type="checkbox" id="${id}" value="${s}" checked><span>${s}</span>`;
    wrap.appendChild(label);
  });
}

function selectedSkills() {
  return [...document.querySelectorAll("#skills input:checked")].map((i) => i.value);
}

// ---------- Offline engine ----------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRubric(role, topic, keywords, level) {
  const isBehavioral = role === "HR / Behavioral Round";
  const tpl = RUBRIC_TEMPLATES[isBehavioral ? "behavioral" : "technical"];
  return {
    criteria: tpl.map((c) => ({ ...c })),
    keyPoints: keywords.slice(0, 5),
    redFlags: isBehavioral
      ? ["Generic answer with no example", "Blames others", "Rambling without a result"]
      : ["Memorized definition without understanding", "Incorrect core concept", "Cannot give any example"],
    bands: SCORE_BANDS,
    level,
  };
}

function generateOffline(role, level, count, skills) {
  const data = ROLE_DATA[role];
  const pool = [];
  skills.forEach((skill) => {
    const t = data.topics[skill];
    if (!t) return;
    const levels = level === "Mixed" ? ["Easy", "Medium", "Hard"] : [level];
    levels.forEach((lv) => {
      (t[lv] || []).forEach((q) =>
        pool.push({ topic: skill, difficulty: lv, question: q, keywords: t.keywords })
      );
    });
  });

  let picked = shuffle(pool).slice(0, count);
  if (level === "Mixed") {
    const order = { Easy: 0, Medium: 1, Hard: 2 };
    picked.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }

  return picked.map((p, i) => ({
    id: i + 1,
    topic: p.topic,
    difficulty: p.difficulty,
    question: p.question,
    followUp: FOLLOW_UPS[Math.floor(Math.random() * FOLLOW_UPS.length)],
    rubric: buildRubric(role, p.topic, p.keywords, p.difficulty),
  }));
}

// ---------- AI mode (Gemini) ----------
async function generateWithGemini(role, level, count, skills) {
  const key = $("apiKey").value.trim();
  const model = $("model").value.trim() || "gemini-2.0-flash";
  if (!key) throw new Error("Please paste your Gemini API key.");

  const prompt = `You are an expert technical interviewer. Generate ${count} interview questions for the role "${role}".
Difficulty: ${level}. Focus topics: ${skills.join(", ")}.
Return ONLY valid JSON (no markdown) in this exact shape:
{"questions":[{"topic":"","difficulty":"Easy|Medium|Hard","question":"","followUp":"",
"rubric":{"criteria":[{"criterion":"","weight":0,"desc":""}],"keyPoints":[""],"redFlags":[""]}}]}
Rules: criteria weights must sum to 10; give 3-5 keyPoints and 2-3 redFlags per question; questions must be specific, not generic.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) throw new Error("Gemini API error " + res.status + ": " + (await res.text()).slice(0, 200));
  const json = await res.json();
  let text = json.candidates?.[0]?.content?.parts?.[0]?.text || "";
  text = text.replace(/^```json|```$/g, "").trim();
  const parsed = JSON.parse(text);
  return parsed.questions.map((q, i) => ({
    id: i + 1,
    topic: q.topic || skills[0],
    difficulty: q.difficulty || level,
    question: q.question,
    followUp: q.followUp || FOLLOW_UPS[0],
    rubric: {
      criteria: q.rubric?.criteria || RUBRIC_TEMPLATES.technical,
      keyPoints: q.rubric?.keyPoints || [],
      redFlags: q.rubric?.redFlags || [],
      bands: SCORE_BANDS,
      level: q.difficulty || level,
    },
  }));
}

// ---------- Generate ----------
async function onGenerate() {
  const role = $("role").value;
  const level = $("level").value;
  const count = Math.max(1, Math.min(20, parseInt($("count").value, 10) || 5));
  const skills = selectedSkills();
  const status = $("status");

  if (!skills.length) {
    status.textContent = "Select at least one skill area.";
    return;
  }

  status.textContent = "Generating...";
  $("generateBtn").disabled = true;
  let questions, source = "Offline engine";
  try {
    if ($("useAI").checked) {
      try {
        questions = await generateWithGemini(role, level, count, skills);
        source = "Gemini AI";
        status.textContent = "";
      } catch (e) {
        status.textContent = "AI mode failed (" + e.message + "). Used offline engine instead.";
        questions = generateOffline(role, level, count, skills);
      }
    } else {
      questions = generateOffline(role, level, count, skills);
      status.textContent = "";
    }
    if (!questions.length) {
      status.textContent = "No questions found for this combination. Try 'Mixed' difficulty or more skill areas.";
      return;
    }
    currentSet = { role, level, source, generatedAt: new Date().toISOString(), questions };
    render();
  } finally {
    $("generateBtn").disabled = false;
  }
}

// ---------- Render ----------
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function render() {
  const { role, level, source, questions } = currentSet;
  $("results").classList.remove("hidden");
  $("summary").textContent = `${questions.length} questions • ${role} • ${level} • Source: ${source}`;
  const list = $("list");
  list.innerHTML = "";

  questions.forEach((q) => {
    const r = q.rubric;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-head">
        <span class="num">Q${q.id}</span>
        <span class="tag">${esc(q.topic)}</span>
        <span class="tag lvl ${esc(q.difficulty)}">${esc(q.difficulty)}</span>
      </div>
      <p class="q">${esc(q.question)}</p>
      <p class="follow"><b>Follow-up:</b> ${esc(q.followUp)}</p>
      <details>
        <summary>View scoring rubric (10 marks)</summary>
        <table>
          <thead><tr><th>Criterion</th><th>Marks</th><th>What to look for</th></tr></thead>
          <tbody>
            ${r.criteria.map((c) => `<tr><td>${esc(c.criterion)}</td><td>${esc(c.weight)}</td><td>${esc(c.desc)}</td></tr>`).join("")}
          </tbody>
        </table>
        ${r.keyPoints.length ? `<p><b>Key points expected:</b> ${r.keyPoints.map(esc).join(", ")}</p>` : ""}
        ${r.redFlags.length ? `<p><b>Red flags:</b> ${r.redFlags.map(esc).join("; ")}</p>` : ""}
        <p class="bands">${r.bands.map((b) => `<span><b>${b.min}+</b> ${esc(b.label)}</span>`).join("")}</p>
      </details>
      <div class="selfscore">
        <label>Practice score (0-10):
          <input type="number" min="0" max="10" value="" data-q="${q.id}" class="score-input">
        </label>
      </div>`;
    list.appendChild(card);
  });

  document.querySelectorAll(".score-input").forEach((i) => i.addEventListener("input", updateTotal));
  updateTotal();
  $("results").scrollIntoView({ behavior: "smooth" });
}

function updateTotal() {
  const inputs = [...document.querySelectorAll(".score-input")];
  const filled = inputs.filter((i) => i.value !== "");
  const total = filled.reduce((s, i) => s + Math.min(10, Math.max(0, +i.value)), 0);
  const max = inputs.length * 10;
  const pct = max ? Math.round((total / max) * 100) : 0;
  let label = "";
  if (filled.length) {
    const avg = total / filled.length;
    label = SCORE_BANDS.find((b) => avg >= b.min).label;
  }
  $("total").textContent = filled.length
    ? `Practice total: ${total}/${max} (${pct}%) — ${label}`
    : "Enter practice scores below each question to track your performance.";
}

// ---------- Export ----------
function toText(set) {
  if (!set) return "";
  let t = `AI-Based Interview Question Generator\nRole: ${set.role} | Difficulty: ${set.level} | Source: ${set.source}\n\n`;
  set.questions.forEach((q) => {
    t += `Q${q.id}. [${q.topic} | ${q.difficulty}] ${q.question}\n`;
    t += `   Follow-up: ${q.followUp}\n   Rubric:\n`;
    q.rubric.criteria.forEach((c) => (t += `     - ${c.criterion} (${c.weight}): ${c.desc}\n`));
    if (q.rubric.keyPoints.length) t += `   Key points: ${q.rubric.keyPoints.join(", ")}\n`;
    if (q.rubric.redFlags.length) t += `   Red flags: ${q.rubric.redFlags.join("; ")}\n`;
    t += "\n";
  });
  return t;
}

function download(name, content, type) {
  if (!currentSet) return;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function copyAll() {
  if (!currentSet) return;
  try {
    await navigator.clipboard.writeText(toText(currentSet));
    $("copyBtn").textContent = "Copied!";
    setTimeout(() => ($("copyBtn").textContent = "Copy all"), 1500);
  } catch {
    alert("Copy failed. Use the Download TXT button instead.");
  }
}

// Allow Node-based testing without a DOM
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", init);
}
if (typeof module !== "undefined") {
  module.exports = { generateOffline, buildRubric, toText };
}
