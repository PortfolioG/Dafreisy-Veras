import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/content'

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`${fd.get('type')} — ${fd.get('name')}`)
    const body = encodeURIComponent(`${fd.get('message')}\n\n— ${fd.get('name')} (${fd.get('email')})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const field = 'w-full border-b hairline bg-transparent py-4 text-lg text-bone placeholder:text-mute focus:border-bone focus:outline-none'

  return (
    <section id="contact" ref={ref} className="border-t hairline px-6 py-28 md:px-10 md:py-40 lg:px-14">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow" data-reveal>07 — Contact</p>
          <h2 className="serif mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl">
            <span data-mask className="mask"><span>Need someone</span></span>
            <span data-mask className="mask"><span className="italic text-bone-2">who keeps it</span></span>
            <span data-mask className="mask"><span>together?</span></span>
          </h2>
          <p className="mt-8 max-w-md text-bone-2" data-reveal>
            Whether you’re hiring an office manager, building out an operations team, or need dependable administrative leadership — let’s talk.
          </p>
          <ul className="mt-10 space-y-4 text-sm" data-reveal>
            <li><a href={`mailto:${profile.email}`} className="group inline-flex items-center gap-3 text-bone-2 hover:text-bone"><Mail size={15} /> {profile.email}</a></li>
            <li><a href={profile.phoneHref} className="inline-flex items-center gap-3 text-bone-2 hover:text-bone"><Phone size={15} /> {profile.phone}</a></li>
            {profile.linkedin && <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-bone-2 hover:text-bone"><ExternalLink size={15} /> LinkedIn</a></li>}
          </ul>
        </div>

        <form onSubmit={submit} className="lg:col-span-7 lg:pt-16" data-reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <label className="block"><span className="eyebrow">Name</span><input name="name" required className={field} placeholder="Your name" /></label>
            <label className="block"><span className="eyebrow">Email</span><input name="email" type="email" required className={field} placeholder="you@company.com" /></label>
          </div>
          <label className="mt-8 block"><span className="eyebrow">I’m reaching out about</span>
            <select name="type" className={`${field} appearance-none`} defaultValue="Office Manager role">
              {['Office Manager role', 'Operations / Administrative role', 'Team supervision', 'Contract or project support', 'Something else'].map((o) => <option key={o} className="bg-ink">{o}</option>)}
            </select>
          </label>
          <label className="mt-8 block"><span className="eyebrow">Message</span><textarea name="message" rows={4} required className={`${field} resize-none`} placeholder="Tell me about the role or the team." /></label>
          <button type="submit" data-cursor="link"
            className="group mt-10 inline-flex items-center gap-4 border border-bone px-7 py-4 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-bone hover:text-ink">
            {sent ? 'Opening your email app' : 'Send message'} <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
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
    <section ref={ref} className="border-t hairline px-6 py-32 text-center md:py-48">
      <h2 className="serif text-[11vw] font-medium leading-[0.95] tracking-[-0.03em] md:text-[7vw]">
        <span data-mask className="mask"><span>Your office could</span></span>
        <span data-mask className="mask"><span className="italic text-bone-2">run like this.</span></span>
      </h2>
      <button onClick={onCta} data-cursor="link" data-reveal
        className="group mt-12 inline-flex items-center gap-4 border border-bone px-8 py-4 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-bone hover:text-ink">
        Start a conversation <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
      </button>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="grid gap-4 border-t hairline px-6 py-8 text-xs text-mute md:grid-cols-3 md:px-10 lg:px-14">
      <span className="serif text-xl italic text-bone">{profile.name}</span>
      <span className="md:text-center">Organized with care · {profile.location}</span>
      <span className="flex gap-6 md:justify-end">
        <a href={`mailto:${profile.email}`} className="hover:text-bone">Email</a>
        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-bone">LinkedIn</a>}
        <span>© {new Date().getFullYear()}</span>
      </span>
    </footer>
  )
}
