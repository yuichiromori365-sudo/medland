import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from "recharts";
import {
  Leaf, Sparkles, Star, ChevronRight, Share2, Copy, Sprout,
  Sun, Award, Compass, GraduationCap, MessageCircle, Users, Check,
} from "lucide-react";

/* ============================== THEME ============================== */
const T = {
  ivory: "#FAF6EC",
  white: "#FFFFFF",
  emerald: "#2F7A5B",
  emeraldDeep: "#1F5C43",
  wakaba: "#8FBF5A",
  sky: "#8FCFE0",
  wood: "#A9764F",
  navy: "#232B3A",
  navySoft: "#4B5566",
};

/* ============================== DATA ============================== */
const PROFESSIONS = [
  { name: "医師", exam: true, workplace: "病院・クリニック・研究機関", salary: "700万〜1500万円以上", night: "当直あり（診療科による）", holiday: "不定期（勤務先による）", suited: "強い責任感と冷静な判断力がある人", future: "AI診断支援と共存しながら専門性がさらに重要になる", fields: [["🩺","内科・外科"],["🧠","専門診療科"],["🚑","救急医療"],["🔬","研究・臨床開発"]] },
  { name: "歯科医師", exam: true, workplace: "歯科医院・病院口腔外科", salary: "600万〜1200万円", night: "基本なし", holiday: "週1〜2日", suited: "手先が器用で細かい作業が得意な人", future: "審美・予防歯科など専門分化が進む", fields: [["🦷","一般歯科"],["😁","矯正・審美"],["🔧","口腔外科"]] },
  { name: "薬剤師", exam: true, workplace: "調剤薬局・病院・製薬会社", salary: "500万〜700万円", night: "病院勤務は当直あり", holiday: "週休2日制が多い", suited: "几帳面で化学が得意な人", future: "在宅医療・オンライン服薬指導の需要が増加", fields: [["💊","調剤"],["🧪","創薬研究"],["🏠","在宅医療"]] },
  { name: "看護師", exam: true, workplace: "病院・クリニック・介護施設", salary: "400万〜600万円", night: "あり（交代制）", holiday: "シフト制", suited: "体力があり人に寄り添える人", future: "専門・特定行為看護師など活躍の場が拡大", fields: [["💉","病棟看護"],["🚑","救急看護"],["🏠","訪問看護"]] },
  { name: "助産師", exam: true, workplace: "産科病院・助産院", salary: "450万〜650万円", night: "あり", holiday: "シフト制", suited: "冷静さと温かさを併せ持つ人", future: "少子化の中でも専門性の高い需要が続く", fields: [["👶","分娩介助"],["🤰","妊婦健診"],["👪","産後ケア"]] },
  { name: "保健師", exam: true, workplace: "保健所・自治体・企業", salary: "400万〜600万円", night: "基本なし", holiday: "週休2日制", suited: "人と地域社会を支えたい人", future: "予防医療・健康経営分野で需要が拡大", fields: [["🏢","産業保健"],["🏘️","地域保健"],["👨‍👩‍👧","母子保健"]] },
  { name: "診療放射線技師", exam: true, workplace: "病院・健診センター", salary: "450万〜650万円", night: "施設により当直あり", holiday: "週休2日制", suited: "機械操作が得意で正確な作業ができる人", future: "AI画像診断との連携がさらに進む", fields: [["📷","CT撮影"],["🧲","MRI撮影"],["☢️","放射線治療"],["🤖","AI画像診断"]] },
  { name: "臨床検査技師", exam: true, workplace: "病院・検査センター", salary: "400万〜600万円", night: "施設による", holiday: "週休2日制", suited: "論理的で探究心がある人", future: "遺伝子検査・再生医療分野が拡大", fields: [["🔬","生理機能検査"],["🧫","検体検査"],["🧬","遺伝子検査"]] },
  { name: "臨床工学技士", exam: true, workplace: "病院・手術室・透析施設", salary: "450万〜650万円", night: "施設による", holiday: "週休2日制", suited: "機械が好きで手先が器用な人", future: "医療機器の高度化で需要が拡大", fields: [["🫀","人工透析"],["⚙️","手術室機器管理"],["❤️","心臓カテーテル"]] },
  { name: "理学療法士", exam: true, workplace: "病院・リハビリ施設・介護施設", salary: "400万〜550万円", night: "基本なし", holiday: "週休2日制", suited: "体を動かすことが好きで根気強い人", future: "高齢化社会で需要が拡大", fields: [["🦵","運動療法"],["🏃","スポーツリハビリ"],["🧓","高齢者リハビリ"]] },
  { name: "作業療法士", exam: true, workplace: "病院・精神科・福祉施設", salary: "400万〜550万円", night: "基本なし", holiday: "週休2日制", suited: "人の生活を支えたい人", future: "精神科・発達支援分野で注目度が上昇", fields: [["✋","作業療法"],["🧩","発達支援"],["🧠","精神科リハビリ"]] },
  { name: "言語聴覚士", exam: true, workplace: "病院・小児施設・福祉施設", salary: "400万〜550万円", night: "基本なし", holiday: "週休2日制", suited: "人の話をじっくり聴ける人", future: "高齢化・発達支援分野で需要が拡大", fields: [["🗣️","言語訓練"],["👂","聴覚訓練"],["🍚","摂食嚥下訓練"]] },
  { name: "管理栄養士", exam: true, workplace: "病院・学校・企業", salary: "350万〜500万円", night: "基本なし", holiday: "週休2日制", suited: "食と健康に関心が高い人", future: "予防医療・スポーツ栄養分野で活躍の場が拡大", fields: [["🥗","栄養指導"],["🏥","病院食管理"],["🏃","スポーツ栄養"]] },
  { name: "救急救命士", exam: true, workplace: "消防署・救急搬送", salary: "400万〜600万円（消防士待遇）", night: "24時間勤務あり", holiday: "交代制", suited: "体力があり瞬時の判断ができる人", future: "病院前救護の高度化が進行中", fields: [["🚑","救急搬送"],["❤️‍🩹","応急処置"],["🔥","災害医療"]] },
  { name: "診療情報管理士", exam: false, workplace: "病院・医療情報部門", salary: "350万〜500万円", night: "基本なし", holiday: "週休2日制", suited: "情報整理が得意で正確性を重視する人", future: "医療DX推進でニーズが急拡大", fields: [["📊","診療情報分析"],["💻","医療情報システム"],["📁","病歴管理"]] },
];
const PROF = Object.fromEntries(PROFESSIONS.map(p => [p.name, p]));
const AXES = ["分析力", "科学力", "機械適性", "判断力", "協調性", "コミュニケーション"];

const QUESTIONS = [
  { q: "得意な科目・分野は？", opts: [
    { t: "生物・人体のしくみ", b: { 看護師:3, 助産師:2, 保健師:2, 理学療法士:2, 作業療法士:1 }, a: { 協調性:2, 判断力:1 } },
    { t: "化学・薬学", b: { 薬剤師:4, 臨床検査技師:2, 管理栄養士:2 }, a: { 科学力:3 } },
    { t: "物理・数学", b: { 診療放射線技師:4, 臨床工学技士:3, 診療情報管理士:1 }, a: { 分析力:3, 機械適性:2 } },
    { t: "国語・心理・コミュニケーション", b: { 言語聴覚士:3, 保健師:2, 看護師:1 }, a: { コミュニケーション:3 } },
    { t: "情報・パソコン", b: { 診療情報管理士:4, 臨床工学技士:2, 臨床検査技師:1 }, a: { 分析力:2, 機械適性:2 } },
  ]},
  { q: "医療現場でやりがいを感じそうな瞬間は？", opts: [
    { t: "命を救う緊迫した瞬間", b: { 医師:4, 救急救命士:4, 歯科医師:1 }, a: { 判断力:3 } },
    { t: "患者さんに寄り添い支える瞬間", b: { 看護師:3, 助産師:2, 作業療法士:2, 言語聴覚士:2 }, a: { 協調性:3, コミュニケーション:2 } },
    { t: "データや検査結果から真実を見抜く瞬間", b: { 臨床検査技師:4, 診療放射線技師:2, 診療情報管理士:2 }, a: { 分析力:3 } },
    { t: "機器を正確に操作しきる瞬間", b: { 臨床工学技士:4, 診療放射線技師:3 }, a: { 機械適性:3 } },
    { t: "体の機能が回復していく瞬間", b: { 理学療法士:4, 作業療法士:3 }, a: { 判断力:1, 協調性:2 } },
  ]},
  { q: "自分の得意なことは？", opts: [
    { t: "手先が器用", b: { 歯科医師:3, 臨床工学技士:2, 看護師:1 }, a: { 機械適性:2 } },
    { t: "論理的に考えること", b: { 薬剤師:2, 臨床検査技師:3, 診療情報管理士:2 }, a: { 分析力:3 } },
    { t: "体力・瞬発力", b: { 救急救命士:4, 理学療法士:2 }, a: { 判断力:2 } },
    { t: "人の話をじっくり聴くこと", b: { 言語聴覚士:3, 保健師:3, 看護師:2 }, a: { コミュニケーション:3 } },
    { t: "チームをまとめること", b: { 医師:2, 助産師:2, 作業療法士:2 }, a: { 協調性:3 } },
  ]},
  { q: "興味のある分野は？", opts: [
    { t: "AI・最新技術", b: { 臨床工学技士:3, 診療放射線技師:3, 診療情報管理士:2 }, a: { 機械適性:2, 分析力:1 } },
    { t: "画像診断（CT・MRI）", b: { 診療放射線技師:4 }, a: { 分析力:2, 機械適性:2 } },
    { t: "薬・化学反応", b: { 薬剤師:4 }, a: { 科学力:3 } },
    { t: "リハビリ・機能回復", b: { 理学療法士:3, 作業療法士:3 }, a: { 協調性:2 } },
    { t: "栄養・食事管理", b: { 管理栄養士:4 }, a: { 科学力:2, コミュニケーション:1 } },
  ]},
  { q: "自分の性格に近いものは？", opts: [
    { t: "冷静沈着", b: { 医師:2, 診療放射線技師:2, 臨床工学技士:2, 救急救命士:2 }, a: { 判断力:3 } },
    { t: "社交的で明るい", b: { 看護師:2, 助産師:2, 保健師:2 }, a: { コミュニケーション:3 } },
    { t: "几帳面・正確", b: { 薬剤師:3, 臨床検査技師:3, 診療情報管理士:2 }, a: { 分析力:2 } },
    { t: "責任感が強い", b: { 医師:2, 歯科医師:2, 助産師:2, 救急救命士:2 }, a: { 判断力:2 } },
    { t: "探究心が強い", b: { 臨床検査技師:2, 薬剤師:2, 臨床工学技士:2 }, a: { 科学力:2 } },
  ]},
  { q: "将来働きたい環境は？", opts: [
    { t: "総合病院", b: { 医師:2, 看護師:2, 診療放射線技師:2, 臨床工学技士:2 }, a: { 判断力:1 } },
    { t: "クリニック・歯科医院", b: { 歯科医師:3, 薬剤師:2 }, a: {} },
    { t: "在宅・地域医療", b: { 保健師:3, 理学療法士:2, 作業療法士:2 }, a: { コミュニケーション:2 } },
    { t: "研究機関・検査室", b: { 臨床検査技師:3, 薬剤師:2 }, a: { 分析力:2 } },
    { t: "救急・災害現場", b: { 救急救命士:4, 医師:1 }, a: { 判断力:3 } },
  ]},
  { q: "大切にしたい価値観は？", opts: [
    { t: "人の命に直接関わりたい", b: { 医師:3, 救急救命士:3, 助産師:2 }, a: { 判断力:2 } },
    { t: "専門性を極めたい", b: { 薬剤師:2, 臨床検査技師:2, 臨床工学技士:2, 診療放射線技師:2 }, a: { 科学力:2 } },
    { t: "縁の下の力持ちでありたい", b: { 診療情報管理士:3, 臨床検査技師:2, 臨床工学技士:2 }, a: { 分析力:1 } },
    { t: "チームで協力して支えたい", b: { 看護師:2, 理学療法士:2, 作業療法士:2, 言語聴覚士:2 }, a: { 協調性:3 } },
    { t: "人と深く関わり続けたい", b: { 言語聴覚士:2, 保健師:2, 管理栄養士:2, 看護師:1 }, a: { コミュニケーション:2 } },
  ]},
];

// max possible per axis (for normalizing radar to 0-100)
const AXIS_MAX = AXES.reduce((acc, ax) => {
  acc[ax] = QUESTIONS.reduce((s, q) => s + Math.max(...q.opts.map(o => o.a[ax] || 0)), 0) || 1;
  return acc;
}, {});
// max possible score per profession
const PROF_MAX = PROFESSIONS.reduce((acc, p) => {
  acc[p.name] = QUESTIONS.reduce((s, q) => s + Math.max(...q.opts.map(o => o.b[p.name] || 0)), 0) || 1;
  return acc;
}, {});

/* ============================== HELPERS ============================== */
function computeResults(answers) {
  const profScores = Object.fromEntries(PROFESSIONS.map(p => [p.name, 0]));
  const axesScores = Object.fromEntries(AXES.map(a => [a, 0]));
  answers.forEach(({ opt }) => {
    Object.entries(opt.b).forEach(([name, v]) => { profScores[name] += v; });
    Object.entries(opt.a).forEach(([ax, v]) => { axesScores[ax] += v; });
  });
  const ranked = Object.entries(profScores).sort((a, b) => b[1] - a[1]);
  const top = ranked[0][0];
  const topPct = Math.round((ranked[0][1] / PROF_MAX[top]) * 100);
  const stars = Math.max(3, Math.min(5, Math.round(topPct / 20)));
  const others = ranked.slice(1, 6).map(([name, score]) => ({
    name, score, pct: Math.round((score / PROF_MAX[name]) * 100),
  }));
  const radar = AXES.map(ax => ({ axis: ax, value: Math.min(100, Math.round((axesScores[ax] / AXIS_MAX[ax]) * 100)) }));
  return { top, topPct, stars, others, radar, profScores };
}

function fallbackAI(top, answers, others) {
  const info = PROF[top];
  const picks = answers.slice(0, 3).map(a => a.opt.t);
  return {
    overallComment: `あなたの回答からは、${top}に向いている資質がはっきりと見えてきました。物事への向き合い方や興味の方向性が、${top}が現場で求められる力と重なっています。焦らず、自分のペースで進路を深めていきましょう。この診断はひとつのきっかけです。実際に現場を見たり、話を聞いたりしながら、納得のいく選択につなげてください。`,
    personalityNarrative: `あなたは「${picks[0]}」を選んだことからもわかるように、物事にじっくりと向き合える人です。また「${picks[1]}」という回答からは、人や状況をよく見て考える力がうかがえます。そして「${picks[2] || picks[0]}」を大切にする姿勢は、${top}の現場でまさに求められる素養です。こうした一つひとつの選択が積み重なって、${info.suited}という${top}の適性像に自然と重なっていきました。`,
    aiComment: `全体を通して、一貫した興味と強みの方向性が見られました。それが${top}という結果につながっています。`,
    strengths: ["冷静な判断力", "責任感", "学び続ける姿勢", "人と関わる力", "課題を見抜く観察力"],
    admissionsAdvice: {
      departments: `${info.workplace.split("・")[0]}系の学部・学科`,
      schools: "国家資格に対応した養成校・大学を中心に検討しましょう",
      studyNow: "基礎科目（生物・化学・数学など）を幅広く固めておくこと",
      highSchoolFocus: "オープンキャンパスや職業体験に積極的に参加すること",
    },
    compatibleProfessions: (others || []).slice(0, 3).map(o => ({
      name: o.name,
      reason: `${top}への回答傾向と重なる部分があり、${PROF[o.name].suited}という点でも相性が良いと考えられます。`,
    })),
  };
}

async function callClaudeForResult(top, answers, radar, others) {
  const info = PROF[top];
  const answerLines = answers.map((a, i) => `Q${i + 1}「${a.q}」→ 選択:「${a.opt.t}」`).join("\n");
  const axesLines = radar.map(r => `${r.axis}:${r.value}点`).join(" / ");
  const system = `あなたは高校生・大学生向けの医療職適性診断アプリ「Medical Forest」のAI診断ライターです。
以下の情報をもとに、必ずJSON形式のみで出力してください。前置き・説明・コードフェンス（\`\`\`）は一切不要です。
出力は次のスキーマに厳密に従うこと:
{
 "overallComment": "200〜300文字程度の総合コメント。温かく前向きな口調。",
 "personalityNarrative": "300〜400文字程度の、自然な地の文（箇条書きや記号は使わない）。ユーザーが実際に選んだ回答（2〜4個ほど）を『』で引用しながら、それが${top}に向いている性格・資質としてどうつながるかを、一つの滑らかな文章として語る。『あなたは〜』のような読み手に語りかける口調で、"選択→理由"の機械的な列挙ではなく、人物像を描写するエッセイのように書くこと。",
 "aiComment": "回答全体から見える診断理由のまとめ（150文字程度）",
 "strengths": ["強み1","強み2","強み3","強み4","強み5"],
 "admissionsAdvice": {"departments":"おすすめ学部","schools":"おすすめ学校の傾向","studyNow":"今から勉強しておくこと","highSchoolFocus":"高校で力を入れること"},
 "compatibleProfessions": [ {"name":"候補職種名(下記の相性候補リストの中から、先頭のものを優先して3つ選び、リストの表記と完全一致させる)","reason":"その職種とも相性が良い理由を、ユーザーの回答内容に触れながら60〜90文字程度で説明"} を3つ ]
}`;
  const othersLines = (others || []).map(o => `・${o.name}（適性${o.pct}%）`).join("\n");
  const user = `診断結果の職種: ${top}
職種情報: 仕事内容の場: ${info.workplace} / 向いている人: ${info.suited} / 将来性: ${info.future}
ユーザーの回答:
${answerLines}
6項目の適性スコア: ${axesLines}
相性候補リスト（適性順・上位3つを基本的に採用）:
${othersLines}
上記に基づき、指定のJSONスキーマで診断結果を生成してください。personalityNarrativeは必ずユーザーの実際の回答から引用しつつ、自然な文章で人物像を描写してください。compatibleProfessionsのnameは相性候補リストの表記と完全に一致させてください。`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await response.json();
  const text = (data.content || []).map(b => b.text || "").join("").trim();
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

/* ============================== BACKGROUND ============================== */
function Forest() {
  const leaves = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    dur: 10 + Math.random() * 10,
    size: 10 + Math.random() * 14,
    rot: Math.random() * 360,
  })), []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", background: `linear-gradient(180deg, ${T.ivory}, #F1EADA 60%, ${T.ivory})` }}>
      <div style={{
        position: "absolute", inset: "-20%", opacity: 0.55,
        background: `radial-gradient(circle at 20% 15%, rgba(255,250,210,0.9), transparent 40%),
                     radial-gradient(circle at 75% 30%, rgba(255,250,210,0.7), transparent 35%),
                     radial-gradient(circle at 50% 70%, rgba(255,250,210,0.6), transparent 40%)`,
        animation: "komorebi 18s ease-in-out infinite alternate",
      }} />
      {leaves.map(l => (
        <div key={l.id} style={{
          position: "absolute", top: -30, left: `${l.left}%`,
          animation: `fall ${l.dur}s linear ${l.delay}s infinite`,
          color: [T.wakaba, T.emerald, T.wood][l.id % 3], opacity: 0.55,
        }}>
          <Leaf size={l.size} style={{ transform: `rotate(${l.rot}deg)` }} fill="currentColor" />
        </div>
      ))}
      <div style={{ position: "absolute", top: "12%", left: "-10%", animation: "fly 26s linear infinite" }}>🐦</div>
    </div>
  );
}

/* ============================== UI PRIMITIVES ============================== */
function ForestButton({ children, onClick, big, style, ...rest }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${T.emerald}, ${T.emeraldDeep})`,
        color: T.ivory,
        border: "none",
        borderRadius: 999,
        padding: big ? "18px 40px" : "12px 26px",
        fontSize: big ? 19 : 15,
        fontWeight: 700,
        fontFamily: "'Zen Maru Gothic', sans-serif",
        boxShadow: pressed ? "0 2px 8px rgba(31,92,67,0.35)" : "0 8px 20px rgba(31,92,67,0.35)",
        transform: pressed ? "translateY(3px) scale(0.98)" : "translateY(0) scale(1)",
        transition: "all 0.15s ease",
        cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 10,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(6px)",
      borderRadius: 24,
      boxShadow: "0 10px 30px rgba(75,85,102,0.12)",
      border: "1px solid rgba(143,191,90,0.25)",
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ============================== SCREENS ============================== */
function TopScreen({ onStart }) {
  return (
    <div className="animate-fadein" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 44 }}>🌲🌿🌲</div>
      <h1 style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: 42, fontWeight: 800, color: T.emeraldDeep, margin: "12px 0 4px", letterSpacing: 1 }}>
        Medical Forest
      </h1>
      <p style={{ fontFamily: "'Zen Maru Gothic', sans-serif", color: T.wood, fontSize: 15, marginBottom: 22 }}>
        ― あなたの未来を育てる、医療職適性診断 ―
      </p>
      <Card style={{ maxWidth: 420, padding: "28px 26px" }}>
        <p style={{ color: T.navySoft, fontSize: 15, lineHeight: 1.9 }}>
          7つの質問に答えるだけで、あなたに最も向いている医療職をAIが分析します。<br />
          なぜその職種なのか、あなたの強み、そして将来どう活躍できるかまで、やさしく紐解きます。
        </p>
      </Card>
      <div style={{ marginTop: 30 }}>
        <ForestButton big onClick={onStart}>
          <Sprout size={22} /> 診断スタート
        </ForestButton>
      </div>
    </div>
  );
}

function QuizScreen({ index, onAnswer }) {
  const question = QUESTIONS[index];
  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 440, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Zen Maru Gothic', sans-serif", color: T.emeraldDeep, fontSize: 13, marginBottom: 6 }}>
          <span>質問 {index + 1} / {QUESTIONS.length}</span>
          <span>🌿</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: "rgba(143,191,90,0.25)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((index) / QUESTIONS.length) * 100}%`, background: `linear-gradient(90deg, ${T.wakaba}, ${T.emerald})`, transition: "width 0.4s ease" }} />
        </div>
      </div>
      <Card key={index} className="animate-slidein" style={{ width: "100%", maxWidth: 440, padding: "30px 24px" }}>
        <h2 style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: 20, fontWeight: 700, color: T.navy, marginBottom: 22, textAlign: "center" }}>
          {question.q}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {question.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(opt, question.q)}
              style={{
                textAlign: "left", padding: "14px 18px", borderRadius: 16,
                border: `1.5px solid ${T.wakaba}55`, background: T.white,
                color: T.navy, fontSize: 14.5, fontFamily: "'Noto Sans JP', sans-serif",
                cursor: "pointer", transition: "all 0.15s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#F1F8EA"; e.currentTarget.style.borderColor = T.emerald; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.white; e.currentTarget.style.borderColor = T.wakaba + "55"; }}
            >
              {opt.t}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AnalyzingScreen() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d.length >= 3 ? "" : d + ".")), 450);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ fontSize: 56, animation: "grow 1.6s ease-in-out infinite" }}>🌱</div>
      <p style={{ fontFamily: "'Zen Maru Gothic', sans-serif", color: T.emeraldDeep, fontSize: 18, marginTop: 16, fontWeight: 700 }}>
        あなたの未来を見つけています{dots}
      </p>
      <div style={{ width: 220, height: 6, borderRadius: 999, background: "rgba(143,191,90,0.25)", overflow: "hidden", marginTop: 20 }}>
        <div style={{ height: "100%", width: "60%", background: `linear-gradient(90deg, ${T.wakaba}, ${T.emerald})`, animation: "loadbar 1.4s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

function AxisTick({ x, y, cx, cy, payload, radarData }) {
  const item = (radarData || []).find(r => r.axis === payload.value);
  const value = item ? item.value : 0;
  // push the label slightly further out along the line from center through (x,y)
  const dx = x - cx, dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ox = x + (dx / len) * 6;
  const oy = y + (dy / len) * 6;
  return (
    <g transform={`translate(${ox},${oy})`}>
      <text textAnchor="middle" dy={-3} fontSize={13.5} fontWeight={700} fill={T.navy} fontFamily="'Zen Maru Gothic', sans-serif">
        {payload.value}
      </text>
      <text textAnchor="middle" dy={15} fontSize={14} fontWeight={800} fill={T.emeraldDeep}>
        {value}
      </text>
    </g>
  );
}

function highlightQuotes(text) {
  if (!text) return null;
  const parts = text.split(/(「[^」]*」)/g);
  return parts.map((part, i) =>
    part.startsWith("「") && part.endsWith("」") ? (
      <span key={i} style={{ color: T.emeraldDeep, fontWeight: 700 }}>{part}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function Stars({ n }) {
  return (
    <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={22} color={T.wood} fill={i <= n ? T.wood : "none"} />
      ))}
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <Card style={{ padding: "22px 22px", marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        {icon}
        <h3 style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 700, color: T.emeraldDeep, fontSize: 16 }}>{title}</h3>
      </div>
      {children}
    </Card>
  );
}

function ResultScreen({ top, topPct, stars, others, radar, ai, answers, onRestart }) {
  const info = PROF[top];
  const [copied, setCopied] = useState(false);
  const radarData = radar;
  return (
    <div style={{ minHeight: "100vh", padding: "36px 16px 60px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="animate-fadein" style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <div style={{ fontSize: 40 }}>🏆</div>
          <h2 style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: 28, fontWeight: 800, color: T.emeraldDeep, margin: "6px 0" }}>{top}</h2>
          <p style={{ color: T.navySoft, fontSize: 13, marginBottom: 8 }}>適性度 {topPct}%</p>
          <Stars n={stars} />
        </div>

        <Section icon={<Sparkles size={18} color={T.emerald} />} title="AI総合分析">
          <p style={{ color: T.navySoft, fontSize: 14.5, lineHeight: 1.9 }}>{ai.overallComment}</p>
        </Section>

        <Section icon={<Compass size={18} color={T.emerald} />} title="この職業になった理由">
          <div style={{ background: "#F1F8EA", borderRadius: 16, padding: "18px 18px", position: "relative" }}>
            <span style={{ position: "absolute", top: 8, left: 12, fontSize: 26, color: T.wakaba, opacity: 0.6, fontFamily: "Georgia, serif" }}>“</span>
            <p style={{ fontSize: 14.5, color: T.navy, lineHeight: 2, textIndent: "1em" }}>
              {highlightQuotes(ai.personalityNarrative)}
            </p>
          </div>
          <p style={{ color: T.navySoft, fontSize: 13.5, lineHeight: 1.8, marginTop: 12 }}>{ai.aiComment}</p>
        </Section>

        <Section icon={<Award size={18} color={T.emerald} />} title="AI評価（適性6項目）">
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            <div style={{
              position: "absolute", inset: 0, margin: "auto", width: 108, height: 108, borderRadius: "50%",
              background: `radial-gradient(circle, ${T.white} 0%, ${T.white} 55%, transparent 100%)`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(75,85,102,0.12)", pointerEvents: "none", zIndex: 2,
              top: "50%", left: "50%", transform: "translate(-50%,-52%)",
            }}>
              <span style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontSize: 30, fontWeight: 800, color: T.emeraldDeep, lineHeight: 1 }}>
                {Math.round(radarData.reduce((s, r) => s + r.value, 0) / radarData.length)}
              </span>
              <span style={{ fontSize: 11, color: T.navySoft, marginTop: 2 }}>総合適性</span>
            </div>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="80%" cx="50%" cy="50%">
                <defs>
                  <radialGradient id="radarFill" cx="50%" cy="50%" r="75%">
                    <stop offset="0%" stopColor={T.wakaba} stopOpacity={0.9} />
                    <stop offset="75%" stopColor={T.emerald} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={T.emeraldDeep} stopOpacity={0.25} />
                  </radialGradient>
                  <filter id="radarGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={T.emerald} floodOpacity="0.5" />
                  </filter>
                </defs>
                <PolarGrid gridType="circle" stroke={T.wakaba + "45"} radialLines={true} />
                <PolarAngleAxis dataKey="axis" tick={<AxisTick radarData={radarData} />} tickLine={false} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tickCount={5} axisLine={false}
                  tick={{ fill: T.navySoft, fontSize: 10 }} />
                <Radar
                  dataKey="value" stroke={T.emeraldDeep} strokeWidth={3}
                  fill="url(#radarFill)" fillOpacity={1} filter="url(#radarGlow)"
                  dot={{ r: 5, fill: T.ivory, stroke: T.emeraldDeep, strokeWidth: 2.5 }}
                  isAnimationActive animationBegin={150} animationDuration={1100} animationEasing="ease-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section icon={<Leaf size={18} color={T.emerald} />} title="あなたの強み">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ai.strengths.map((s, i) => (
              <span key={i} style={{ background: T.emerald, color: T.ivory, borderRadius: 999, padding: "7px 14px", fontSize: 13 }}>🌿 {s}</span>
            ))}
          </div>
        </Section>

        <Section icon={<Sun size={18} color={T.emerald} />} title="活躍できる分野">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {info.fields.map(([icon, label], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: T.white, border: `1px solid ${T.wakaba}40`, borderRadius: 12, padding: "10px 12px" }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontSize: 13, color: T.navy }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<Users size={18} color={T.emerald} />} title="他に向いている職種 TOP5">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {others.map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 4px", borderBottom: i < others.length - 1 ? `1px dashed ${T.wakaba}50` : "none" }}>
                <span style={{ fontFamily: "'Zen Maru Gothic', sans-serif", fontWeight: 800, color: T.wood, width: 22 }}>{i + 2}</span>
                <span style={{ flex: 1, fontSize: 14, color: T.navy }}>{o.name}</span>
                <span style={{ fontSize: 12.5, color: T.navySoft }}>{o.pct}%</span>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<MessageCircle size={18} color={T.emerald} />} title={`${top} の職種紹介`}>
          <table style={{ width: "100%", fontSize: 13, color: T.navySoft, borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["国家資格", info.exam ? "あり" : "民間資格"],
                ["主な勤務先", info.workplace],
                ["年収目安", info.salary],
                ["夜勤", info.night],
                ["休日", info.holiday],
                ["向いている人", info.suited],
                ["将来性", info.future],
              ].map(([k, v], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${T.wakaba}30` }}>
                  <td style={{ padding: "8px 6px", fontWeight: 700, color: T.emeraldDeep, whiteSpace: "nowrap", verticalAlign: "top" }}>{k}</td>
                  <td style={{ padding: "8px 6px" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section icon={<GraduationCap size={18} color={T.emerald} />} title="AI進学アドバイス">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13.5, color: T.navySoft, lineHeight: 1.8 }}>
            <p><b style={{ color: T.emeraldDeep }}>おすすめ学部：</b>{ai.admissionsAdvice.departments}</p>
            <p><b style={{ color: T.emeraldDeep }}>おすすめ学校：</b>{ai.admissionsAdvice.schools}</p>
            <p><b style={{ color: T.emeraldDeep }}>今から勉強しておくこと：</b>{ai.admissionsAdvice.studyNow}</p>
            <p><b style={{ color: T.emeraldDeep }}>高校で力を入れること：</b>{ai.admissionsAdvice.highSchoolFocus}</p>
          </div>
        </Section>

        <Section icon={<Users size={18} color={T.emerald} />} title="相性の良い医療職種">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ai.compatibleProfessions.map((c, i) => {
              const p = PROF[c.name];
              const icon = p?.fields?.[0]?.[0] || "🌿";
              return (
                <div key={i} style={{ background: "#F1F8EA", borderRadius: 14, padding: "12px 16px", display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 22, lineHeight: 1 }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: T.emeraldDeep, marginBottom: 3 }}>{c.name}</p>
                    <p style={{ fontSize: 13, color: T.navySoft, lineHeight: 1.7 }}>{c.reason}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section icon={<Share2 size={18} color={T.emerald} />} title="結果をシェア">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["LINE", "X", "TikTok"].map(label => (
              <button key={label} style={{ flex: "1 1 auto", padding: "10px 14px", borderRadius: 12, border: `1px solid ${T.wakaba}60`, background: T.white, color: T.navy, fontSize: 13, cursor: "pointer" }}>
                {label}で共有
              </button>
            ))}
            <button
              onClick={() => {
                try { navigator.clipboard.writeText(window.location.href); } catch (e) {}
                setCopied(true); setTimeout(() => setCopied(false), 1500);
              }}
              style={{ flex: "1 1 auto", padding: "10px 14px", borderRadius: 12, border: `1px solid ${T.wakaba}60`, background: T.white, color: T.navy, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {copied ? <><Check size={14} /> コピーしました</> : <><Copy size={14} /> URLコピー</>}
            </button>
          </div>
        </Section>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <ForestButton onClick={onRestart}><Sprout size={16} /> もう一度診断する</ForestButton>
        </div>
      </div>
    </div>
  );
}

/* ============================== APP ============================== */
export default function App() {
  const [screen, setScreen] = useState("top");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  function handleStart() { setScreen("quiz"); setQIndex(0); setAnswers([]); }

  function handleAnswer(opt, q) {
    const next = [...answers, { q, opt }];
    setAnswers(next);
    if (qIndex + 1 < QUESTIONS.length) {
      setQIndex(qIndex + 1);
    } else {
      setScreen("analyzing");
      runAnalysis(next);
    }
  }

  async function runAnalysis(finalAnswers) {
    const computed = computeResults(finalAnswers);
    let ai;
    try {
      ai = await callClaudeForResult(computed.top, finalAnswers, computed.radar, computed.others);
      if (!ai || !ai.overallComment || !ai.compatibleProfessions || !ai.compatibleProfessions.length) throw new Error("empty");
    } catch (e) {
      setAiError(true);
      ai = fallbackAI(computed.top, finalAnswers, computed.others);
    }
    setResult({ ...computed, ai });
    setScreen("result");
  }

  function handleRestart() { setScreen("top"); setAnswers([]); setResult(null); setAiError(false); }

  return (
    <div style={{ position: "relative", fontFamily: "'Noto Sans JP', sans-serif" }}>
      <style>{`
        @keyframes komorebi { 0% { transform: translate(0,0) scale(1);} 100% { transform: translate(3%,-2%) scale(1.05);} }
        @keyframes fall { 0% { transform: translateY(-5vh) translateX(0) rotate(0deg); opacity:0;} 10%{opacity:0.6;} 100% { transform: translateY(105vh) translateX(40px) rotate(360deg); opacity:0.2;} }
        @keyframes fly { 0% { transform: translateX(0) translateY(0);} 50% { transform: translateX(60vw) translateY(-20px);} 100% { transform: translateX(120vw) translateY(0);} }
        @keyframes grow { 0%,100% { transform: scale(1);} 50% { transform: scale(1.15);} }
        @keyframes loadbar { 0% { margin-left: -60%; } 100% { margin-left: 100%; } }
        @keyframes fadein { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform: translateY(0);} }
        @keyframes slidein { from { opacity:0; transform: translateX(24px);} to { opacity:1; transform: translateX(0);} }
        .animate-fadein { animation: fadein 0.5s ease both; }
        .animate-slidein { animation: slidein 0.4s ease both; }
      `}</style>
      <Forest />
      <div style={{ position: "relative", zIndex: 1 }}>
        {screen === "top" && <TopScreen onStart={handleStart} />}
        {screen === "quiz" && <QuizScreen index={qIndex} onAnswer={handleAnswer} />}
        {screen === "analyzing" && <AnalyzingScreen />}
        {screen === "result" && result && (
          <ResultScreen
            top={result.top} topPct={result.topPct} stars={result.stars}
            others={result.others} radar={result.radar} ai={result.ai}
            answers={answers} onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
