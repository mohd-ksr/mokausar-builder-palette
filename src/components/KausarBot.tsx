import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  links?: { label: string; href: string; external?: boolean }[];
}

const SYSTEM_PROMPT = `You are KausarBot, a friendly and concise personal assistant for Mo Kausar's portfolio website. Your job is to help visitors learn about Mo quickly and direct them to the right section or external platform.

RULES:
- Keep every reply to 2-4 sentences maximum. Never write long paragraphs.
- Always end with a JSON block of relevant links when applicable (see format below).
- Only answer questions about Mo Kausar. For unrelated questions say: "I can only answer questions about Mo Kausar! Try asking about his projects, skills, or achievements."
- Be friendly, professional, and enthusiastic about Mo's work.
- Speak in third person about Mo ("Mo has...", "He built...").
- When someone asks about a platform (LeetCode, GitHub, LinkedIn, etc.), always include the direct external link.
- When someone asks for resume/CV, provide the Google Drive link.

LINKS FORMAT (always include at end of reply when relevant):
[LINKS]{"links":[{"label":"View Projects","href":"/#portfolio"},{"label":"GitHub","href":"https://github.com/mohd-ksr","external":true}]}[/LINKS]

PORTFOLIO SECTION LINKS (internal navigation):
- Home: /#home
- About: /#about
- Skills: /#skills
- Expertise: /#services
- Projects: /#portfolio
- Certifications: /certifications
- Achievements: /#achievements
- Contact: /#contact

EXTERNAL PLATFORM LINKS (always use these when asked):
- GitHub: https://github.com/mohd-ksr
- LinkedIn: https://www.linkedin.com/in/mo-kausar
- LeetCode: https://leetcode.com/u/Mo_Kausar/
- Codeforces: https://codeforces.com/profile/mohd.ksr
- CodeChef: https://www.codechef.com/users/mohd_ksr
- Instagram: https://www.instagram.com/mohd.ksr
- Resume/CV: https://drive.google.com/file/d/1fzNNVrCw7U0RE6FEUVeDEi6pQKCPdmak/view
- Food Demand Predictor (Live): https://huggingface.co/spaces/mohd-ksr/food-demand-predictor
- Career Chatbot (Live): https://careermate-chatbot-gmkgqomcfeh5zkqu3huxue.streamlit.app/
- Smart Food Pre-Order (Live): https://pre-food-order.netlify.app/
- ResQNet (Live): https://resqnet-frontend.netlify.app/
- Word Battle (Live): https://wordxbattle.netlify.app/
- Email: mailto:mohd.ksr2003@gmail.com

═══════════════════════════════════════
COMPLETE INFORMATION ABOUT MO KAUSAR
═══════════════════════════════════════

PERSONAL INFO:
- Full name: Mo Kausar (Mohammad Kausar Khan)
- Location: Phagwara, Punjab, India
- Email: mohd.ksr2003@gmail.com
- Phone: +91 7023315900
- Status: Fresher actively looking for internships and entry-level roles
- Open to: Internships, entry-level roles, collaborations in software development / AI/ML / web development

EDUCATION:
- B.Tech in Computer Science (Machine Learning) current CGPA 8.73 Lovely Professional University (LPU), Registration No: 12316343, Batch 2027, Currently Pursuing. Specializing in Machine Learning, AI algorithms, and software development.
- Senior Secondary (12th) 94% — Jai Prakash Narayan Sr. Sec. School. from jaipur, Strong foundation in Mathematics and Science.

SKILLS:
Programming Languages: C++, Python, Java, JavaScript, HTML, CSS
AI & Machine Learning: Time Series Forecasting, Data Analysis, NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, PyTorch
Web Development: React, Node.js, Flutter, Streamlit, Gradio, Responsive Design, UI/UX
Tools & Platforms: GitHub, Jupyter, VS Code, Hugging Face, OpenAI, Anaconda
AI Services: OpenAI API, DeepSeek, Gemini, Chatbot Development, AI Integration
Specializations: Machine Learning, Optimization Models, Education Tech, Automation, Data Visualization

COMPETITIVE PROGRAMMING:
- LeetCode: Knight rank, max rating 1914, 100+ day streak, 800+ problems solved | https://leetcode.com/u/Mo_Kausar/
- Codeforces: Pupil rank | https://codeforces.com/profile/mohd.ksr
- CodeChef: 3-Star | https://www.codechef.com/users/mohd_ksr
- Also active on AtCoder and GeeksForGeeks (GFG)
- Total: 800+ problems solved across all platforms

PROJECTS (6 main + 1 featured):

1. Website Activity Tracker Extension
   - Type: Browser Extension | Status: Completed
   - Description: Chrome extension that tracks time spent on websites, visualizes usage through interactive pie charts with CSV export functionality.
   - Tech: JavaScript, HTML/CSS, Chrome Extension API, Chart.js
   - Features: Website Time Tracking, Pie Chart Visualization, CSV Data Export, Automatic Daily Reports
   - GitHub: https://github.com/mohd-ksr/web-time-tracker

2. Food Distribution Optimization (ML)
   - Type: AI/ML | Status: Live
   - Description: Machine learning model for predicting food demand to minimize waste and optimize distribution logistics.
   - Tech: Python, Machine Learning, Data Analysis, Optimization
   - Features: Demand Prediction, Waste Reduction, Data Visualization, ML Algorithms
   - GitHub: https://github.com/mohd-ksr/food-demand-predictor
   - Live: https://huggingface.co/spaces/mohd-ksr/food-demand-predictor

3. Career Chatbot (Oracle Career Pathway)
   - Type: AI/Chatbot | Status: Live
   - Description: Intelligent career guidance assistant providing personalized recommendations and pathway suggestions.
   - Tech: Chatbot Development, AI, Natural Language Processing, Career Guidance
   - Features: Personalized Guidance, AI-Powered, Career Pathways, Interactive Interface
   - GitHub: https://github.com/mohd-ksr/CareerMate-chatbot
   - Live: https://careermate-chatbot-gmkgqomcfeh5zkqu3huxue.streamlit.app/

4. Smart Food Pre-Ordering System
   - Type: Full Stack Application | Status: Live
   - Description: Full-stack food pre-ordering platform that allows students to order meals in advance using time slots, reducing queues and enabling admins to manage demand efficiently.
   - Tech: FastAPI, PostgreSQL, React, JWT Auth, SQLAlchemy
   - Features: JWT Authentication, Time-Slot Based Ordering, Bill-Style Order Summary, Admin Order Management
   - GitHub: https://github.com/mohd-ksr/pre-food-order
   - Live: https://pre-food-order.netlify.app/

5. ResQNet – Disaster Management & Volunteer Coordination Platform
   - Type: Full Stack / AI Application | Status: Live
   - Description: Full-stack MERN platform for real-time disaster response that connects victims, volunteers, and authorities, enabling incident reporting, geolocation tracking, and efficient task coordination.
   - Tech: MongoDB, Express.js, React, Node.js, JWT Auth, Framer Motion
   - Features: Role-Based Auth, Geolocation Reporting, Volunteer Verification, Task Assignment
   - GitHub: https://github.com/mohd-ksr/resqnet
   - Live: https://resqnet-frontend.netlify.app/

6. Snake Game (Desktop Application)
   - Type: Game Development | Status: Completed
   - Description: Classic Snake game reimagined with modern styling, high-score tracking, and enhanced user interface.
   - Tech: Game Development, JavaScript, UI/UX, Local Storage
   - Features: High Score System, Modern UI, Smooth Animations, Local Storage
   - GitHub: https://github.com/mohd-ksr/snake-game

7. Word Battle (FEATURED PROJECT)
   - Type: Real-Time Multiplayer Game | Status: Live
   - Description: Real-time multiplayer word strategy game where players compete to create valid English words on a shared grid. Features turn-based gameplay, life system, animated leaderboard ranking, and live chat. Built using WebSockets with Socket.IO.
   - Tech: Socket.IO, Node.js, React, WebSockets, Custom Game Engine
   - Features: Real-time multiplayer gameplay, WebSocket-based live synchronization, Custom Node.js game engine, Animated leaderboard, Live in-game chat
   - GitHub: https://github.com/mohd-ksr/word-battle
   - Live: https://wordxbattle.netlify.app/

CERTIFICATIONS (26 total):
HIGHLIGHTED:
- Social Network Analysis — NPTEL IIT Madras (Elite, 75% score, 12-week proctored, Jul-Oct 2025)
- Introduction to Front-End Development — Meta / Coursera (Nov 2025)
- Data Structures & Algorithms — CipherSchools (offline training at LPU, July 2025, ID: CS2025-14731)
- Computer Communications Specialization (4 courses) — Univ. of Colorado / Coursera (Nov 2024)
- Master Generative AI & Tools (ChatGPT & more) — Udemy (Aug 2025, 14 hrs)
- Build Generative AI Apps with No-Code Tools — Udemy (Aug 2025)
- ChatGPT Made Easy — Udemy (Aug 2025)
- Critical Thinking Skills for the Professional — UC Davis / Coursera (Nov 2025)
- Delivering Quality Work with Agility — IBM / Coursera (Nov 2025)
- Communication in the 21st Century Workplace — UC Irvine / Coursera (Mar 2026)
- The Bits and Bytes of Computer Networking — Google / Coursera (Sep 2024)
- Fundamentals of Network Communication — Univ. of Colorado / Coursera (Oct 2024)
- Introduction to Hardware and Operating Systems — IBM / Coursera (Sep 2024)
- Digital Systems: From Logic Gates to Processors — UAB / Coursera (Sep 2024)
- Computer Architecture — Princeton University / Coursera
- Java Programming (72 hrs) — iamneo / LPU (Jan-May 2025)
- Data Structures and Algorithm (72 hrs) — iamneo / LPU (Aug-Dec 2024)
- Object Oriented Programming (72 hrs) — iamneo / LPU (Aug-Dec 2024)
- Python in Hindi — MindLuster (Feb 2024, 27 hrs)
- Python for Data Science — Board Infinity (Feb 2024)
- GfG 160 — 160 Days of Problem Solving — GeeksforGeeks
- Word Forms and Simple Present Tense — UC Irvine / Coursera (May 2024)
- The English Master Course — Udemy (Apr 2024, 43 hrs)
- Computational Theory: Language Principle & Finite Automata — Infosys Springboard (Aug 2025)
- Prototype Marathon Participation — LPU Student Welfare Wing (Nov 2025)
Full list at: /certifications

ACHIEVEMENTS:
- 1st Place Winner — HACK-IOT Hackathon, LPU (Feb 16-17, 2024) — Team Leader, web-based IoT solution, organized by School of Electronics & Electrical Engineering
- Knight on LeetCode — Max rating 1914 | https://leetcode.com/u/Mo_Kausar/
- Pupil on Codeforces | https://codeforces.com/profile/mohd.ksr
- 3-Star on CodeChef | https://www.codechef.com/users/mohd_ksr
- 100+ Day LeetCode Streak (March 2026)
- 800+ Problems Solved across LeetCode, Codeforces, CodeChef, AtCoder, GFG
- Dean's List — LPU (Sep 2025, Top 10% of students, academic excellence)
- Prototype Marathon: Gateway to AIU's Anveshan 2025-26 participant — LPU (Nov 2025)

EXPERTISE / SERVICES:
- Web Development: React, JavaScript, Responsive Design, Performance Optimization
- Chatbot Development: AI-powered, CSV/API integration, multi-platform
- AI & ML Solutions: Forecasting, optimization, predictive analytics
- Automation Tools: Custom scripts, workflow automation, report generation
- UI/UX Enhancements: Modern design, user research, interactive prototypes

DEVELOPMENT PROCESS: Discovery → Planning → Development → Maintenance

QUICK FACTS:
- Years of Learning: 3.5+
- Projects Built: 10+
- Passion for Tech: 100%
- Languages: C++, Python, Java, JavaScript`;

const parseLinks = (content: string): { text: string; links: { label: string; href: string; external?: boolean }[] } => {
  const linkMatch = content.match(/\[LINKS\](.*?)\[\/LINKS\]/s);
  if (!linkMatch) return { text: content, links: [] };
  try {
    const parsed = JSON.parse(linkMatch[1]);
    const text = content.replace(/\[LINKS\].*?\[\/LINKS\]/s, '').trim();
    return { text, links: parsed.links || [] };
  } catch {
    return { text: content.replace(/\[LINKS\].*?\[\/LINKS\]/s, '').trim(), links: [] };
  }
};

const SUGGESTIONS = [
  "What projects has Kausar built?",
  "What are Kausar's skills?",
  "Is Kausar open to internships?",
  "Show me Kausar's achievements",
  "How to contact Kausar?",
  "Show resume",
];

const INITIAL_MESSAGES: Message[] = [
  {
    role: 'assistant',
    content: "Hi! I'm KausarBot 👋 Ask me anything about Mo Kausar — his projects, skills, achievements, certifications, and more!",
    links: [
      { label: 'View Projects', href: '/#portfolio' },
      { label: 'View Resume', href: 'https://drive.google.com/file/d/1fzNNVrCw7U0RE6FEUVeDEi6pQKCPdmak/view', external: true },
      { label: 'Contact Kausar', href: '/#contact' },
    ],
  },
];



export default function KausarBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom whenever messages change or chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: userText };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const history = updated.map(m => ({
        role: m.role,
        content: m.content,
      }));
      // console.log('API Key:', import.meta.env.VITE_GROQ_API_KEY);
      // console.log('Sending request...');
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          max_tokens: 200,
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      });

      const data = await res.json();
      // console.log('Response:', data);
      const raw = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again!";
      const { text: cleanText, links } = parseLinks(raw);

      setMessages(prev => [...prev, { role: 'assistant', content: cleanText, links }]);
    } catch(err) {
      // console.error('Error fetching bot response:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err}`,
        links: [{ label: 'Contact Mo', href: '/#contact' }],
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLink = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, '_blank');
      return;
    }
    if (href.startsWith('/certifications')) {
      window.location.href = href;
    } else {
      const id = href.replace('/#', '');
      setOpen(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      {/* Floating button + tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">

        {showTooltip && !open && (
          <div
            className="flex items-center gap-2 px-4 py-2.5 shadow-xl text-sm font-medium text-white cursor-pointer animate-bounce"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              borderRadius: '18px 18px 18px 4px',
              maxWidth: '220px',
              position: 'relative',
            }}
            onClick={() => { setOpen(true); setShowTooltip(false); }}
          >
            <Bot className="h-4 w-4 flex-shrink-0" />
            <span>I have everything about Kausar!</span>
            <button
              onClick={e => { e.stopPropagation(); setShowTooltip(false); }}
              className="ml-1 opacity-70 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>

            {/* Pointy arrow at bottom-right */}
            <span style={{
              position: 'absolute',
              bottom: '-8px',
              right: '18px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #8b5cf6',
            }} />
          </div>
        )}
        <button
          onClick={() => { setOpen(o => !o); setShowTooltip(false); }}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          aria-label="Open KausarBot"
        >
          {open
            ? <X className="h-6 w-6 text-white" />
            : <Bot className="h-6 w-6 text-white" />
          }
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          )}
        </button>
      </div>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: '520px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">KausarBot</p>
              <p className="text-white/70 text-xs">Ask me about Mo Kausar!</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-xs">Online</span>
            </div>
          </div>

          {/* Messages — scrollable, always starts at bottom */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
            style={{ scrollbarWidth: 'thin' }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-purple-600'
                  }`}>
                  {msg.role === 'user'
                    ? <User className="h-4 w-4 text-white" />
                    : <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`max-w-[80%] space-y-2 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className="px-3 py-2 text-sm leading-relaxed"
                    style={{
                      background: msg.role === 'user'
                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                        : 'rgba(255,255,255,0.85)',
                      color: msg.role === 'user' ? '#fff' : '#1f2937',
                      borderRadius: msg.role === 'user'
                        ? '18px 18px 4px 18px'
                        : '18px 18px 18px 4px',
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {msg.links.map((link, li) => (
                        <button
                          key={li}
                          onClick={() => handleLink(link.href, link.external)}
                          className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 flex items-center gap-1"
                          style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: '#fff',
                          }}
                        >
                          {link.label} {link.external ? '↗' : '→'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="px-3 py-2" style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '18px 18px 18px 4px' }}>
                  <div className="flex gap-1 items-center h-5">
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Anchor — always scroll here */}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — only on first open */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => send(s)}
                  className="px-2.5 py-1 text-xs rounded-full border transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.3)',
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: '#1f2937',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            className="px-3 py-3 flex gap-2 items-center flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about Mo..."
              className="flex-1 bg-white/80 rounded-full px-4 py-2 text-sm outline-none placeholder:text-gray-400 text-gray-800"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
