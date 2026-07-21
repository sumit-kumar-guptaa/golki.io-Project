import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckCircle2, Zap, Users, BarChart3, ArrowRight, 
  Star, Shield, Layers, Clock, Target, Sparkles,
  Github, Twitter, ChevronRight, Play, MessageCircle,
  Bot, Database, Server, GitBranch, Lock, Cpu,
  Globe, Rocket, Code2, Workflow, BrainCircuit,
  MousePointerClick, ChevronDown, ExternalLink, Activity
} from 'lucide-react'

// ─── Scroll-triggered animation hook ──────────────────
function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsInView(true); observer.unobserve(el) }
    }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, isInView]
}

// ─── Animated counter hook ────────────────────────────
function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const end = parseInt(target.replace(/[^0-9]/g, ''))
    if (isNaN(end)) { setCount(target); return }
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

// ─── Floating Emoji component ─────────────────────────
function FloatingEmoji({ emoji, className }) {
  return (
    <span className={`inline-block animate-bounce-subtle ${className}`} aria-hidden="true">{emoji}</span>
  )
}

// ─── Animated stat counter ────────────────────────────
function AnimatedStat({ value, label, active }) {
  const numericVal = value.replace(/[^0-9.]/g, '')
  const suffix = value.replace(/[0-9.]/g, '')
  const count = useCounter(numericVal, 2000, active)
  return (
    <div className="text-center group">
      <div className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
        {typeof count === 'number' ? count.toLocaleString() : count}{suffix}
      </div>
      <div className="text-[#8888aa] text-sm mt-2 group-hover:text-[#c0c0d8] transition-colors">{label}</div>
    </div>
  )
}

// ─── Section wrapper with scroll animation ────────────
function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isInView] = useInView()
  return (
    <div ref={ref} className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────
const FEATURES = [
  { icon: Layers, title: 'Kanban Boards', desc: 'Visualize your workflow with drag-and-drop task cards across customizable columns.', color: '#6550f7' },
  { icon: MessageCircle, title: 'Real-time Chat', desc: 'Project-level chatrooms with WebSocket messaging, typing indicators, and online presence.', color: '#06b6d4' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track team productivity, project progress, and key metrics with beautiful charts.', color: '#10b981' },
  { icon: Users, title: 'Team Collaboration', desc: 'Invite team members, assign roles, and collaborate in real-time on projects.', color: '#f59e0b' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admin, Team Lead, and Member roles with granular permission controls.', color: '#ec4899' },
  { icon: Target, title: 'Priority Management', desc: 'Mark tasks as High, Medium, or Low priority to focus on what matters most.', color: '#8b5cf6' },
]

const BETA_FEATURES = [
  { icon: BrainCircuit, title: 'AI Helpdesk', desc: 'RAG-powered AI assistant that understands your projects. Ask questions, get smart suggestions, create tasks with natural language.', color: '#f59e0b', tag: 'RAG + MCP' },
  { icon: Activity, title: 'Event-Driven Notifications', desc: 'Kafka-powered real-time notifications for task assignments, deadlines, and team activities across all services.', color: '#ef4444', tag: 'Kafka' },
  { icon: Database, title: 'Smart Caching', desc: 'Redis-backed intelligent caching for dashboard stats, task queries, and AI responses with automatic invalidation.', color: '#06b6d4', tag: 'Redis' },
]

const STATS = [
  { value: '10K+', label: 'Teams Using golki.io' },
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '2M+', label: 'Tasks Completed' },
  { value: '4.9★', label: 'Average Rating' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Engineering Lead @ Stripe', text: 'golki.io transformed how our team operates. The Kanban board and real-time chat are incredibly powerful.', avatar: 'SC', rating: 5 },
  { name: 'Marcus Williams', role: 'CTO @ TechStartup', text: 'We shipped 40% faster after switching to golki.io. The team visibility and analytics are unmatched.', avatar: 'MW', rating: 5 },
  { name: 'Priya Sharma', role: 'Product Manager @ Notion', text: 'Clean UI, powerful features, zero learning curve. The AI helpdesk is a game changer for our workflow.', avatar: 'PS', rating: 5 },
]

const TECH_STACK = [
  { name: 'Spring Boot', icon: Server, color: '#6DB33F' },
  { name: 'React', icon: Code2, color: '#61DAFB' },
  { name: 'PostgreSQL', icon: Database, color: '#4169E1' },
  { name: 'WebSocket', icon: Globe, color: '#06b6d4' },
  { name: 'JWT Auth', icon: Lock, color: '#f59e0b' },
  { name: 'Docker', icon: Cpu, color: '#2496ED' },
  { name: 'Kafka', icon: Workflow, color: '#231F20' },
  { name: 'Redis', icon: Database, color: '#DC382D' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Team', desc: 'Sign up, invite your team members, and set up role-based permissions in seconds.', icon: Users },
  { step: '02', title: 'Organize Projects', desc: 'Create projects, set deadlines, and break work into tasks with priority levels.', icon: Layers },
  { step: '03', title: 'Ship & Collaborate', desc: 'Use Kanban boards, real-time chat, and analytics to deliver remarkable products.', icon: Rocket },
]

// ─── Main Component ───────────────────────────────────
export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [navSolid, setNavSolid] = useState(false)
  const [statsRef, statsInView] = useInView()

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setNavSolid(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-x-hidden">

      {/* ═══ Animated Background ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/8 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-purple-500/6 rounded-full blur-[100px] animate-float-delay" />
        <div className="absolute top-2/3 right-1/3 w-[300px] h-[300px] bg-pink-500/4 rounded-full blur-[100px] animate-float" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(101,80,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(101,80,247,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />
      </div>

      {/* ═══ Navigation ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navSolid ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#2a2a3e]/50 py-3' : 'py-5'}`}>
        <div className="flex items-center justify-between px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center animate-pulse-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">golki.io</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-[#8888aa]">
            <a href="#features" className="hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors relative group">
              How it works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#beta" className="hover:text-white transition-colors relative group flex items-center gap-1.5">
              AI & Beta
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-medium">NEW</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors relative group">
              Reviews
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm flex items-center gap-2 group">
              Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm border border-brand-500/30 mb-8 hover:border-brand-500/60 transition-colors cursor-default group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
              </span>
              <span className="text-brand-400">Now with AI-powered helpdesk & real-time chat</span>
              <ChevronRight className="w-4 h-4 text-brand-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </AnimatedSection>

          {/* Static headline */}
          <AnimatedSection delay={100}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-6">
              <span className="text-white">Where teams</span>
              <br />
              <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                turn chaos into clarity
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-[#8888aa] max-w-2xl mx-auto mb-10 leading-relaxed">
              The modern task & team management platform with real-time collaboration, 
              AI-powered insights, and enterprise-grade security.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2 text-lg group animate-pulse-glow">
                Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/sumit-kumar-guptaa/golki.io-Project" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#8888aa] hover:text-white transition-all group border border-[#2a2a3e] hover:border-[#3a3a5e] rounded-xl px-6 py-4">
                <Github className="w-5 h-5" />
                <span className="font-medium">View on GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </AnimatedSection>

          {/* Social proof avatars */}
          <AnimatedSection delay={400}>
            <div className="flex items-center justify-center gap-3 mt-10 text-sm text-[#8888aa]">
              <div className="flex -space-x-2.5">
                {[
                  { bg: 'from-brand-400 to-purple-500', letter: 'S' },
                  { bg: 'from-cyan-400 to-blue-500', letter: 'A' },
                  { bg: 'from-emerald-400 to-teal-500', letter: 'R' },
                  { bg: 'from-amber-400 to-orange-500', letter: 'P' },
                  { bg: 'from-pink-400 to-rose-500', letter: 'M' },
                ].map((a, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${a.bg} hover:scale-110 hover:z-10 transition-transform cursor-default`}>
                    {a.letter}
                  </div>
                ))}
              </div>
              <span>Join <strong className="text-white">10,000+</strong> teams shipping faster</span>
            </div>
          </AnimatedSection>
        </div>

        {/* ─── Dashboard Preview ─── */}
        <AnimatedSection delay={500} className="relative mt-20 max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2rem] blur-2xl opacity-50" />
          <div className="relative glass rounded-3xl border border-[#2a2a3e] overflow-hidden shadow-2xl shadow-brand-500/10 hover:shadow-brand-500/20 transition-shadow duration-500">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#2a2a3e] bg-[#12121a]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70 hover:bg-amber-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70 hover:bg-emerald-500 transition-colors" />
              </div>
              <div className="flex-1 ml-4 bg-[#0a0a0f] rounded-lg px-4 py-1.5 text-xs text-[#8888aa] text-center font-mono flex items-center justify-center gap-2">
                <Lock className="w-3 h-3 text-emerald-400" />
                app.golki.io/dashboard
              </div>
            </div>
            
            {/* Mock Dashboard */}
            <div className="p-6 bg-[#0e0e16]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Tasks', value: '248', color: '#6550f7', change: '+12%', up: true },
                  { label: 'Completed', value: '182', color: '#10b981', change: '+8%', up: true },
                  { label: 'In Progress', value: '41', color: '#3b82f6', change: '+3%', up: true },
                  { label: 'Overdue', value: '7', color: '#ef4444', change: '-2%', up: false },
                ].map((s, i) => (
                  <div key={i} className="glass rounded-xl p-4 hover:border-brand-500/30 transition-all duration-300 group cursor-default">
                    <p className="text-xs text-[#8888aa] mb-1">{s.label}</p>
                    <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                    <p className="text-xs mt-1 flex items-center gap-1" style={{color: s.color}}>
                      <span className={s.up ? '' : 'rotate-180 inline-block'}>↑</span> {s.change}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Kanban preview */}
              <div className="grid grid-cols-3 gap-4">
                {['To Do', 'In Progress', 'Done'].map((col, ci) => (
                  <div key={ci} className="glass rounded-xl p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{background: ['#8888aa','#3b82f6','#10b981'][ci]}} />
                        <span className="text-xs font-medium text-[#c0c0d8]">{col}</span>
                      </div>
                      <span className="text-xs bg-[#2a2a3e] px-2 py-0.5 rounded-full text-[#8888aa]">{[3,2,4][ci]}</span>
                    </div>
                    {Array.from({length: [2,1,2][ci]}).map((_, i) => (
                      <div key={i} className="bg-[#1a1a26] rounded-lg p-3 mb-2 hover:bg-[#1e1e2e] transition-colors group/card cursor-default">
                        <div className="h-2.5 bg-[#2a2a3e] rounded-full mb-2 group-hover/card:bg-[#3a3a50] transition-colors" style={{width: `${60+i*20}%`}} />
                        <div className="h-2 bg-[#2a2a3e] rounded-full w-2/3 mb-3" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-purple-500" />
                            <div className="h-1.5 bg-[#2a2a3e] rounded-full w-12" />
                          </div>
                          <div className={`text-[8px] px-1.5 py-0.5 rounded font-medium ${['bg-red-500/15 text-red-400','bg-amber-500/15 text-amber-400','bg-emerald-500/15 text-emerald-400'][ci]}`}>
                            {['HIGH','MED','LOW'][ci]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-10" />
        </AnimatedSection>
      </section>

      {/* ═══ Stats ═══ */}
      <section ref={statsRef} className="relative z-10 border-y border-[#1a1a26] py-16">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <AnimatedStat key={i} value={s.value} label={s.label} active={statsInView} />
          ))}
        </div>
      </section>

      {/* ═══ Tech Stack Marquee ═══ */}
      <section className="relative z-10 py-12 overflow-hidden border-b border-[#1a1a26]">
        <div className="text-center mb-8">
          <p className="text-[#8888aa] text-sm uppercase tracking-widest">Powered by modern technologies</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10" />
          <div className="flex animate-marquee">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <div key={i} className="flex items-center gap-3 mx-8 whitespace-nowrap">
                <t.icon className="w-5 h-5" style={{ color: t.color }} />
                <span className="text-[#8888aa] font-medium text-sm">{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ What is golki.io? — Fun Explainer ═══ */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-8 py-28">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-emerald-400 border border-emerald-500/20 mb-5">
            <Rocket className="w-3.5 h-3.5" /> WHAT IS GOLKI.IO?
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Your team's second brain <FloatingEmoji emoji="🧠" className="text-4xl md:text-5xl" />
          </h2>
          <p className="text-[#8888aa] max-w-2xl mx-auto text-lg">
            golki.io is a smart project management platform that combines task boards, 
            real-time chat, and AI — so your team spends less time managing work and more time <em className="text-white not-italic">doing it</em>.
          </p>
        </AnimatedSection>

        {/* Before vs After comparison */}
        <AnimatedSection delay={100}>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Without golki.io */}
            <div className="glass rounded-2xl p-8 border-red-500/10 hover:border-red-500/20 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">😩</div>
                  <div>
                    <p className="text-red-400 text-xs font-bold uppercase tracking-wider">Without golki.io</p>
                    <p className="text-white font-display font-bold text-lg">The old way</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    { emoji: '📋', text: 'Scattered tasks across 5 different apps' },
                    { emoji: '💬', text: 'Endless Slack threads nobody reads' },
                    { emoji: '📊', text: '"Hey, what\'s the status?" meetings' },
                    { emoji: '🔥', text: 'Missed deadlines and finger-pointing' },
                    { emoji: '😴', text: 'Zero visibility into team workload' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#8888aa] group-hover:text-[#a0a0c0] transition-colors">
                      <span className="text-lg leading-none mt-0.5">{item.emoji}</span>
                      <span className="line-through decoration-red-500/40">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* With golki.io */}
            <div className="glass rounded-2xl p-8 border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl">🚀</div>
                  <div>
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">With golki.io</p>
                    <p className="text-white font-display font-bold text-lg">The smart way</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    { emoji: '✅', text: 'All tasks in one beautiful Kanban board', color: 'text-emerald-400' },
                    { emoji: '💬', text: 'Real-time project chat — right where you work', color: 'text-cyan-400' },
                    { emoji: '📊', text: 'Live dashboards with zero-effort analytics', color: 'text-brand-400' },
                    { emoji: '🤖', text: 'AI helpdesk that knows your project context', color: 'text-amber-400' },
                    { emoji: '👀', text: 'Full team visibility with role-based access', color: 'text-pink-400' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm transition-colors">
                      <span className="text-lg leading-none mt-0.5">{item.emoji}</span>
                      <span className={`${item.color} font-medium`}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Who is it for? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              emoji: '👨‍💻',
              title: 'Developers',
              desc: 'Track sprints, manage backlogs, and collaborate on code tasks with your engineering team.',
              color: '#6550f7',
              delay: 0,
            },
            {
              emoji: '👩‍💼',
              title: 'Team Leads',
              desc: 'Get bird\'s-eye view of projects, assign tasks, monitor deadlines, and keep everyone aligned.',
              color: '#06b6d4',
              delay: 100,
            },
            {
              emoji: '🎯',
              title: 'Startups & Teams',
              desc: 'From 2-person teams to 200 — golki.io scales with you. Free to start, powerful to grow.',
              color: '#10b981',
              delay: 200,
            },
          ].map((card, i) => (
            <AnimatedSection key={i} delay={card.delay}>
              <div className="glass rounded-2xl p-6 text-center hover:border-brand-500/30 transition-all duration-500 group hover:-translate-y-1 h-full">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {card.emoji}
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2 group-hover:text-brand-300 transition-colors">{card.title}</h3>
                <p className="text-[#8888aa] text-sm leading-relaxed">{card.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Fun fact bar */}
        <AnimatedSection delay={300} className="mt-12">
          <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center border border-brand-500/10">
            <span className="text-2xl">💡</span>
            <p className="text-[#c0c0d8] text-sm">
              <strong className="text-white">Fun fact:</strong> Teams using golki.io report shipping <span className="text-brand-400 font-bold">40% faster</span> and spending <span className="text-cyan-400 font-bold">60% less time</span> in status meetings.
              All your tasks, chats, and analytics — <span className="text-emerald-400 font-bold">one single tab</span>.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ Features ═══ */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-8 py-28">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-brand-400 border border-brand-500/20 mb-5">
            <Sparkles className="w-3.5 h-3.5" /> CORE FEATURES
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Everything your team needs
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">
            Powerful tools designed to help teams collaborate, ship faster, and achieve more together.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-6 hover:border-brand-500/30 transition-all duration-500 group h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                  <f.icon className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-brand-300 transition-colors">{f.title}</h3>
                <p className="text-[#8888aa] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="how-it-works" className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-5">
            <MousePointerClick className="w-3.5 h-3.5" /> HOW IT WORKS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Up and running in minutes
          </h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-500/40 via-purple-500/40 to-cyan-500/40" />
          
          {HOW_IT_WORKS.map((item, i) => (
            <AnimatedSection key={i} delay={i * 150} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br from-brand-500/20 to-purple-500/20 border border-brand-500/30">
                <item.icon className="w-7 h-7 text-brand-400" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center text-xs font-bold text-white">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-3">{item.title}</h3>
              <p className="text-[#8888aa] text-sm leading-relaxed">{item.desc}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ Beta Features ═══ */}
      <section id="beta" className="relative z-10 max-w-7xl mx-auto px-8 py-28">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-amber-400 border border-amber-500/20 mb-5">
            <Sparkles className="w-3.5 h-3.5" /> COMING SOON — BETA
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The future of project management
          </h2>
          <p className="text-[#8888aa] max-w-xl mx-auto">
            AI-powered features and enterprise-grade infrastructure coming to golki.io.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-6">
          {BETA_FEATURES.map((f, i) => (
            <AnimatedSection key={i} delay={i * 120}>
              <div className="relative glass rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 group h-full hover:-translate-y-1 overflow-hidden">
                {/* Beta ribbon */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-500/30">
                    β Beta
                  </span>
                </div>
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent animate-shimmer bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-bold text-white text-lg">{f.title}</h3>
                  </div>
                  <span className="inline-block text-[10px] bg-[#2a2a3e] text-[#8888aa] px-2 py-0.5 rounded-md font-mono mb-3">{f.tag}</span>
                  <p className="text-[#8888aa] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ Architecture Preview ═══ */}
      <section className="relative z-10 max-w-5xl mx-auto px-8 py-20">
        <AnimatedSection>
          <div className="glass rounded-3xl p-8 md:p-12 border border-[#2a2a3e] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                  <Server className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl">Enterprise Architecture</h3>
                  <p className="text-xs text-[#8888aa]">Built for scale, designed for developers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Concurrent Users', value: '200+', desc: 'Tomcat thread pool' },
                  { label: 'Cache Response', value: '<5ms', desc: 'Redis hit latency' },
                  { label: 'Event Latency', value: '<50ms', desc: 'Kafka end-to-end' },
                  { label: 'JWT Validation', value: '<3ms', desc: 'Redis token lookup' },
                ].map((m, i) => (
                  <div key={i} className="bg-[#0a0a0f]/50 rounded-xl p-4 border border-[#2a2a3e]/50 hover:border-brand-500/20 transition-colors">
                    <p className="text-2xl font-display font-bold text-brand-400">{m.value}</p>
                    <p className="text-sm text-white font-medium mt-1">{m.label}</p>
                    <p className="text-xs text-[#8888aa] mt-0.5">{m.desc}</p>
                  </div>
                ))}
              </div>

              {/* Role permission matrix */}
              <div className="mt-8 overflow-x-auto">
                <h4 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-400" /> Role Permissions
                </h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2a2a3e]">
                      <th className="text-left text-[#8888aa] pb-3 font-medium">Feature</th>
                      <th className="text-center text-purple-400 pb-3 font-medium">Admin</th>
                      <th className="text-center text-cyan-400 pb-3 font-medium">Team Lead</th>
                      <th className="text-center text-amber-400 pb-3 font-medium">Member</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#c0c0d8]">
                    {[
                      ['Manage Teams', true, true, false],
                      ['Create Projects', true, true, false],
                      ['Edit Tasks', true, true, 'own'],
                      ['Analytics', true, true, true],
                      ['AI Helpdesk', true, true, true],
                    ].map(([feat, ...perms], i) => (
                      <tr key={i} className="border-b border-[#2a2a3e]/50">
                        <td className="py-2.5">{feat}</td>
                        {perms.map((p, j) => (
                          <td key={j} className="text-center py-2.5">
                            {p === true ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> :
                             p === 'own' ? <span className="text-xs text-amber-400">Assigned</span> :
                             <span className="text-[#3a3a50]">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Loved by teams worldwide</h2>
          <div className="flex justify-center gap-1">
            {Array.from({length: 5}).map((_,i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-6 hover:border-brand-500/20 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-start gap-1 mb-4">
                  {Array.from({length: t.rating}).map((_,j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[#c0c0d8] text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{t.name}</div>
                    <div className="text-[#8888aa] text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-20 text-center">
        <AnimatedSection>
          <div className="relative glass rounded-3xl p-12 md:p-16 border border-brand-500/20 overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-purple-500/5 to-cyan-500/10 animate-gradient-x bg-[length:200%_200%]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-500/20 rounded-full blur-[100px]" />
            
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to ship faster?
              </h2>
              <p className="text-[#8888aa] mb-8 max-w-lg mx-auto text-lg">
                Join thousands of teams who trust golki.io to manage their projects and collaboration.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link to="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2 group animate-pulse-glow">
                  Start for free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-6 py-4">
                  Sign in
                </Link>
              </div>
              <p className="text-xs text-[#8888aa] mt-6 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free forever plan</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime</span>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative z-10 border-t border-[#1a1a26]">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-white text-lg">golki.io</span>
              </div>
              <p className="text-[#8888aa] text-sm leading-relaxed">Smart task & team management for modern engineering teams.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 text-sm">Product</h4>
              <ul className="space-y-2.5 text-sm text-[#8888aa]">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#beta" className="hover:text-white transition-colors">AI Helpdesk <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1 py-0.5 rounded ml-1">BETA</span></a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 text-sm">Developers</h4>
              <ul className="space-y-2.5 text-sm text-[#8888aa]">
                <li><a href="https://github.com/sumit-kumar-guptaa/golki.io-Project" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Self-Host Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 text-sm">Company</h4>
              <ul className="space-y-2.5 text-sm text-[#8888aa]">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1a1a26]">
            <div className="text-[#8888aa] text-sm">© 2025 golki.io. Built by Sumit Kumar Gupta.</div>
            <div className="flex items-center gap-4 text-[#8888aa]">
              <a href="https://github.com/sumit-kumar-guptaa" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors hover:scale-110 transform"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
