import React, { useState, useEffect } from "react";
import { 
  Heart, MessageCircle, ShieldCheck, UserPlus, AlertCircle, ArrowLeft, 
  Smile, Frown, Zap, Coffee, Palette, Gavel, Info, ChevronRight
} from "lucide-react";

const CRISIS_KEYWORDS = ["suicide", "kill myself", "end my life", "don't want to live", "self harm", "die", "hopeless"];
const MOODS = [
  { label: "Happy", icon: <Smile className="w-4 h-4" />, color: "bg-green-100 text-green-700", border: "border-green-200" },
  { label: "Sad", icon: <Frown className="w-4 h-4" />, color: "bg-rose-100 text-rose-700", border: "border-rose-200" },
  { label: "Anxious", icon: <Zap className="w-4 h-4" />, color: "bg-amber-100 text-amber-700", border: "border-amber-200" },
  { label: "Reflective", icon: <Coffee className="w-4 h-4" />, color: "bg-indigo-100 text-indigo-700", border: "border-indigo-200" },
];
const THEMES = [
  { name: "Midnight Calm", class: "bg-slate-900 text-slate-100", card: "bg-slate-800 border-slate-700", input: "bg-slate-900 border-slate-700 text-white" },
  { name: "Soft Slate", class: "bg-slate-50", card: "bg-white border-slate-200", input: "bg-slate-50 border-slate-100 text-slate-800" },
];

export default function App() {
  const [view, setView] = useState("feed");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [stories, setStories] = useState([
    { id: "1", text: "Finally found the courage to speak up. It feels like a weight is lifting.", mood: "Reflective", author: "User_4291", timestamp: "10:30 AM" }
  ]);
  const [newStory, setNewStory] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [reports, setReports] = useState([]);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const currentTheme = THEMES[themeIndex];

  const handlePost = () => {
    if (!selectedMood || !newStory.trim()) return;
    if (CRISIS_KEYWORDS.some(k => newStory.toLowerCase().includes(k))) setShowCrisisModal(true);
    const post = { id: Date.now().toString(), text: newStory, mood: selectedMood, author: "Anonymous", timestamp: "Just now" };
    setStories([post, ...stories]);
    setNewStory("");
    setSelectedMood("");
  };

  if (!hasAcceptedTerms) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 text-center">
          <ShieldCheck className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Safety First</h2>
          <p className="text-sm text-slate-600 mb-8">Life Share is a peer support community. By entering, you agree to kindness.</p>
          <button onClick={() => setHasAcceptedTerms(true)} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold">Agree & Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-32 ${currentTheme.class}`}>
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-500 flex items-center gap-2"><Heart className="fill-teal-500 w-5 h-5" /> Life Share</h1>
        <button onClick={() => setThemeIndex((themeIndex + 1) % THEMES.length)} className="p-2 bg-slate-100/10 rounded-full"><Palette /></button>
      </header>
      <main className="max-w-2xl mx-auto p-4 mt-6">
        <h2 className="text-3xl font-bold text-center mb-8">The world is loud. <span className="text-teal-500">We are listening.</span></h2>
        <div className={`p-6 rounded-3xl border ${currentTheme.card}`}>
          <textarea value={newStory} onChange={(e) => setNewStory(e.target.value)} placeholder="What's on your mind?" className={`w-full h-32 p-4 rounded-2xl outline-none ${currentTheme.input}`} />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {MOODS.map(m => <button key={m.label} onClick={() => setSelectedMood(m.label)} className={`px-4 py-2 rounded-xl text-xs font-bold border ${selectedMood === m.label ? 'bg-teal-600 text-white' : 'text-slate-400'}`}>{m.label}</button>)}
          </div>
          <button onClick={handlePost} className="w-full mt-4 py-3 bg-teal-600 text-white rounded-xl font-bold">Share Story</button>
        </div>
        <div className="mt-8 space-y-4">
          {stories.map(s => (
            <div key={s.id} className={`p-6 rounded-3xl border ${currentTheme.card}`}>
              <p className="text-sm text-slate-500 mb-2">{s.author} • {s.mood}</p>
              <p className="text-lg">{s.text}</p>
            </div>
          ))}
        </div>
      </main>
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-[40px] max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Stay with us.</h2>
            <p className="text-sm mb-6">You matter. Please reach out to 988 or 741741 (USA).</p>
            <button onClick={() => setShowCrisisModal(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl">I will get help</button>
          </div>
        </div>
      )}
    </div>
  );
}
