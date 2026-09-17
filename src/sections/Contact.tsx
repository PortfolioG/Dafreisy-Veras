import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/content'
import { Episode } from './About'

/** Web3Forms delivers submissions straight to profile.email. The key is public by design. */
const WEB3FORMS_KEY = 'f65370bd-a403-4ac9-8724-76ed678d1e8c'
type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('botcheck')) return                       // honeypot: bots fill it, people don't
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const type = String(fd.get('type') ?? '')
    const message = String(fd.get('message') ?? '').trim()

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Portfolio] ${type} — ${name}`,
          from_name: 'dafreisyveras.vercel.app',
          name, email, type, message,
          replyto: email,
        }),
      })
      const data = (await res.json()) as { success?: boolean }
      if (!res.ok || !data.success) throw new Error('send failed')
      setStatus('sent')
      form.reset()
    } catch {
      // Fallback: hand the message to the visitor's own email client.
      setStatus('error')
      const subject = encodeURIComponent(`${type} — ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    }
  }

  const field = 'w-full rounded-md border border-white/10 bg-[#0e0e0e] px-4 py-3.5 text-sm text-bone placeholder:text-mute focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50'

  return (
    <section id="contact" ref={ref} className="px-6 py-24 md:px-10 md:py-32 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Episode n="05" label="Get in touch" />
          <h2 className="display mt-6 text-6xl leading-[0.9] md:text-8xl">
            <span data-mask className="mask"><span>Let’s build</span></span>
            <span data-mask className="mask"><span className="text-accent">something</span></span>
            <span data-mask className="mask"><span>reliable.</span></span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone-2" data-reveal>
            Hiring an office manager, building out an operations team, or need dependable administrative leadership? Send a direct signal.
          </p>
          <ul className="mt-8 space-y-3 mono text-[0.68rem] tracking-[0.1em]" data-reveal>
            <li><a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 text-bone-2 hover:text-bone"><Mail size={14} className="text-accent" /> {profile.email}</a></li>
            <li><a href={profile.phoneHref} className="inline-flex items-center gap-3 text-bone-2 hover:text-bone"><Phone size={14} className="text-accent" /> {profile.phone}</a></li>
            {profile.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-bone-2 hover:text-bone"><ExternalLink size={14} className="text-accent" /> LinkedIn</a></li>}
          </ul>
        </div>

        <form onSubmit={submit} className="card p-7 md:p-9 lg:col-span-7" data-reveal aria-live="polite">
          <p className="mono text-[0.6rem] uppercase tracking-[0.22em] text-accent">// Direct message</p>
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block"><span className="eyebrow">Name</span><input name="name" required className={`${field} mt-2`} placeholder="Your name" /></label>
            <label className="block"><span className="eyebrow">Email</span><input name="email" type="email" required className={`${field} mt-2`} placeholder="you@company.com" /></label>
          </div>
          <label className="mt-5 block"><span className="eyebrow">I’m reaching out about</span>
            <select name="type" className={`${field} mt-2 appearance-none`} defaultValue="Office Manager role">
              {['Office Manager role', 'Operations / Administrative role', 'Team supervision', 'Contract or project support', 'Something else'].map((o) => <option key={o} className="bg-ink">{o}</option>)}
            </select>
          </label>
          <label className="mt-5 block"><span className="eyebrow">Message</span><textarea name="message" rows={5} required className={`${field} mt-2 resize-none`} placeholder="Tell me about the role or the team." /></label>
          <p className="mono mt-4 text-[0.55rem] leading-relaxed tracking-[0.05em] text-mute">
            {status === 'sent' ? 'Delivered. Dafreisy will reply to the address you gave.'
              : status === 'error' ? 'Direct send failed — opening your email app instead.'
              : 'Your message is delivered straight to Dafreisy’s inbox.'}
          </p>
          <button type="submit" data-cursor="link" disabled={status === 'sending' || status === 'sent'}
            className="btn-red group mt-6 inline-flex items-center gap-3 disabled:cursor-default disabled:opacity-70">
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✓' : 'Send message'}
            {status === 'idle' && <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />}
          </button>
        </form>
      </div>
    </section>
  )
}

export function FinalCta({ onCta }: { onCta: () => void }) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28 text-center md:py-40">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <p className="mono relative text-[0.6rem] uppercase tracking-[0.25em] text-accent" data-reveal>Next episode</p>
      <h2 className="display relative mt-4 text-[13vw] leading-[0.88] md:text-[8vw]">
        <span data-mask className="mask"><span>Your office could</span></span>
        <span data-mask className="mask"><span className="text-accent">run like this.</span></span>
      </h2>
      <button onClick={onCta} data-cursor="link" data-reveal className="btn-red relative mt-10 inline-flex items-center gap-3">
        Start a conversation <ArrowRight size={14} />
      </button>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t hairline px-6 py-10 md:px-10 lg:px-14">
      <div className="grid gap-8 md:grid-cols-3 md:items-start">
        <div>
          <span className="display text-3xl tracking-[0.12em] text-accent">{profile.name.split(' ')[0]}</span>
          <p className="mono mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-mute">// Office Operations Series • Season 2026</p>
        </div>
        <ul className="mono flex flex-wrap gap-x-6 gap-y-2 text-[0.6rem] uppercase tracking-[0.2em] text-bone-2 md:justify-center">
          {[['Home', '#top'], ['About', '#about'], ['Expertise', '#services'], ['Skills', '#skills'], ['Experience', '#work'], ['Contact', '#contact']].map(([l, h]) => (
            <li key={h}><a href={h} className="hover:text-bone">{l}</a></li>
          ))}
        </ul>
        <ul className="mono space-y-2 text-[0.6rem] uppercase tracking-[0.2em] text-bone-2 md:text-right">
          <li><a href={`mailto:${profile.email}`} className="hover:text-bone">Email //</a></li>
          {profile.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">LinkedIn //</a></li>}
          <li className="text-mute">Location: {profile.location}</li>
        </ul>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t hairline pt-6 mono text-[0.55rem] uppercase tracking-[0.2em] text-mute">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Streaming worldwide • Built with React &amp; GSAP</span>
      </div>
    </footer>
  )
}
