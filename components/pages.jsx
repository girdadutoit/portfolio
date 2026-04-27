/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav, MarketingNav, Footer */
const { useState: uS } = React;

// ===== Shared page shell =====
const PageShell = ({ children }) =>
<>
    <div className="amb-bg" />
    <MarketingNav />
    {children}
    <Footer />
  </>;


// Shared hero block
const PageHero = ({ eyebrow, title, sub, cta, onCta, ctaLabel }) => {
  const { go } = useNav();
  return (
    <section style={{ padding: "40px 0px 31.4531px" }}>
      <div className="container-wide">
        {eyebrow &&
        <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 18 }}>
            {eyebrow}
          </div>
        }
        <h1 className="display" style={{ fontSize: 'clamp(48px, 6.5vw, 96px)', margin: 0, lineHeight: 1.02 }}>
          {title}
        </h1>
        {sub &&
        <p style={{ fontSize: 19, color: 'var(--ink-2)', maxWidth: 680, marginTop: 24, lineHeight: 1.5 }}>
            {sub}
          </p>
        }
        {cta &&
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={onCta || (() => go('/signup'))}>
              {ctaLabel || cta} <Icon name="arrowRight" size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('/how-it-works')}>
              See how it works
            </button>
          </div>
        }
      </div>
    </section>);

};

// ===== FOR TENANTS =====
const ForTenantsPage = () => {
  const { go } = useNav();
  const benefits = [
  { icon: 'shield', title: 'Verified references you own', body: 'Collect endorsements from every landlord you’ve had. They move with you, forever.' },
  { icon: 'spark', title: 'Be discovered, not ignored', body: 'Go live and matching landlords will see your profile in their scouting feed.' },
  { icon: 'heart', title: 'No guarantor? No problem.', body: 'A strong Care Score + Home Story can replace traditional guarantor requirements with many landlords.' },
  { icon: 'home', title: 'Apply with one tap', body: 'Your Home Story pre-fills every application. No more 40-field forms per listing.' },
  { icon: 'user', title: 'Protected characteristics stay private', body: 'Matching is on lifestyle and care signals, never on demographics.' },
  { icon: 'sparkles', title: 'Real compatibility scores', body: 'See upfront which homes match your budget, lease length, pets and commute — before you apply.' }];


  return (
    <PageShell>
      <PageHero
        eyebrow="For tenants"
        title={<>Show the tenant<br />you already are.</>}
        sub="Build a verified renting portfolio with photos of the homes you’ve cared for, endorsements from past landlords, and a Care Score that grows with every tenancy."
        cta="Create my free profile"
        ctaLabel={<>Create my free profile</>} />
      

      {/* feature grid */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {benefits.map((b) =>
            <div key={b.title} className="solid-card" style={{ padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={b.icon} size={20} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>{b.title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{b.body}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mock profile preview */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Your profile</div>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 1.05, margin: '12px 0 20px' }}>
                More than a credit score.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20 }}>
                Your GoodLet profile shows the real evidence of how you live — photos of the homes you cared for, improvements you made, and the landlords who'd have you back.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Home Story timeline with before/afters', 'Care Score out of 100', 'Verified references that follow you', 'Lifestyle preferences (pets, lease length, quiet hours)'].map((i) =>
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15 }}>
                    <Icon name="check" size={16} style={{ color: 'var(--coral-700)' }} />
                    {i}
                  </li>
                )}
              </ul>
              <button className="btn btn-primary btn-lg" style={{ marginTop: 28 }} onClick={() => go('/signup')}>
                Start my profile <Icon name="arrowRight" size={16} />
              </button>
            </div>
            <div className="glass-strong" style={{ padding: 22, borderRadius: 28 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                <Avatar name="Ayo Bankole" size={48} hue={30} />
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600 }}>Ayo & Maya</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>3 yrs renting · Hackney, London</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div className="display" style={{ fontSize: 32, color: 'var(--coral-700)', lineHeight: 1 }}>92</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>CARE SCORE</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
                <PhImg label="2019" h={80} hue={30} />
                <PhImg label="2021" h={80} hue={50} />
                <PhImg label="2024" h={80} hue={20} />
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                <span className="chip chip-verified"><Icon name="check" size={12} /> 3 verified refs</span>
                <span className="chip chip-coral">No missed payments</span>
                <span className="chip">Pet: cat</span>
              </div>
              <div style={{ padding: 12, background: 'var(--cream-2)', borderRadius: 12, fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic' }}>
                “Left the flat cleaner than they found it.” — R. Khan, previous landlord
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section style={{ padding: '60px 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
            { n: '40k+', l: 'Tenants on GoodLet' },
            { n: '3.2x', l: 'More responses than traditional listings' },
            { n: '14 days', l: 'Average time to sign a lease' },
            { n: '0%', l: 'Fees for tenants, ever' }].
            map((s) =>
            <div key={s.l} style={{ padding: 28, background: 'white', border: '1px solid var(--line)', borderRadius: 20 }}>
                <div className="display" style={{ fontSize: 48, color: 'var(--coral-700)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8 }}>{s.l}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <PageCTA
        title={<>Ready to be chosen<br />on merit?</>}
        sub="Create your Home Story in under five minutes. Free, forever."
        primaryLabel="Create my profile"
        onPrimary={() => go('/signup')} />
      
    </PageShell>);

};

// ===== FOR LANDLORDS =====
const ForLandlordsPage = () => {
  const { go } = useNav();
  const benefits = [
  { icon: 'shield', title: 'Verified applicant evidence', body: 'Every reference is tied to a verified landlord identity — not an unknown email address.' },
  { icon: 'sparkles', title: 'Compatibility scoring', body: 'See at a glance how well each applicant fits your lease, property type, and preferences.' },
  { icon: 'spark', title: 'Scout live tenants', body: 'Browse verified tenants actively searching in your area. Invite them to apply.' },
  { icon: 'home', title: 'Condition reports built-in', body: 'Standardised check-in / check-out with photo evidence. Deposit disputes disappear.' },
  { icon: 'message', title: 'Centralised messaging', body: 'All tenant communication, viewing bookings, and offers in one audit-ready thread.' },
  { icon: 'user', title: 'Fair housing compliant', body: 'Matching is demographic-blind by design. Audit logs for every decision.' }];


  return (
    <PageShell>
      <PageHero
        eyebrow="For landlords & agents"
        title={<>Pick tenants on<br />substance, not guesswork.</>}
        sub="Replace patchy references and gut-feel with verified evidence, compatibility scores, and a shortlist that’s done the work for you."
        cta="List a property"
        ctaLabel="List a property" />
      

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {benefits.map((b) =>
            <div key={b.title} className="solid-card" style={{ padding: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
                  <Icon name={b.icon} size={20} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 16 }}>{b.title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{b.body}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Applicant dashboard mock */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div className="glass-strong" style={{ padding: 22, borderRadius: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Applicants</div>
                  <div className="display" style={{ fontSize: 22, marginTop: 4 }}>12 Harlow Mews</div>
                </div>
                <span className="chip chip-coral">7 shortlisted</span>
              </div>
              {[
              { n: 'Ayo & Maya', score: 94, tag: '3 yrs · pet · £2,400 budget', hue: 30 },
              { n: 'Priya S.', score: 88, tag: '2 yrs · no pet · £2,300 budget', hue: 330 },
              { n: 'T. Okafor', score: 82, tag: '4 yrs · family · £2,500 budget', hue: 200 },
              { n: 'J. Lindqvist', score: 76, tag: '1 yr · no pet · £2,400 budget', hue: 100 }].
              map((a, i) =>
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--glass-border)' }}>
                  <Avatar name={a.n} size={36} hue={a.hue} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{a.n}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{a.tag}</div>
                  </div>
                  <div className="display" style={{ fontSize: 24, color: 'var(--coral-700)' }}>{a.score}</div>
                </div>
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Your dashboard</div>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', lineHeight: 1.05, margin: '12px 0 20px' }}>
                Shortlisted before<br />you’ve finished your coffee.
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20 }}>
                Applicants arrive ranked by compatibility, with verified references already attached. Focus your time on the final three — not the first thirty.
              </p>
              <button className="btn btn-primary btn-lg" onClick={() => go('/signup')}>
                Start shortlisting <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        title={<>Let merit do<br />the heavy lifting.</>}
        sub="List your first property and review verified applicants in minutes."
        primaryLabel="List a property"
        onPrimary={() => go('/signup')} />
      
    </PageShell>);

};

// ===== HOW IT WORKS =====
const HowItWorksPage = () => {
  const { go } = useNav();
  const tenantSteps = [
  { n: '01', title: 'Build your Home Story', body: 'Add photos of homes you’ve cared for, improvements, and the landlords who’ll vouch for you.', icon: 'user' },
  { n: '02', title: 'Collect verified references', body: 'We invite your past landlords by email. They rate you privately, then you choose which to publish.', icon: 'shield' },
  { n: '03', title: 'Go live', body: 'Flip the switch when you’re searching. Matching landlords see you in their scouting feed.', icon: 'spark' },
  { n: '04', title: 'Apply in one tap', body: 'Your profile pre-fills every application. Landlords reply faster because you’ve done the homework.', icon: 'heart' }];

  const landlordSteps = [
  { n: '01', title: 'List your property', body: 'Add photos, specs, and the kind of tenant you’re looking for — lease length, pets, lifestyle.', icon: 'home' },
  { n: '02', title: 'Receive ranked applicants', body: 'Everyone who applies arrives with a compatibility score and verified references attached.', icon: 'sparkles' },
  { n: '03', title: 'Scout live tenants', body: 'Browse verified tenants actively searching your area. Invite the right ones to apply.', icon: 'spark' },
  { n: '04', title: 'Sign with confidence', body: 'Condition reports, digital lease, and deposit protection — all built in.', icon: 'check' }];


  const Steps = ({ steps }) =>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
      {steps.map((s) =>
    <div key={s.n} className="glass-strong" style={{ padding: 26, borderRadius: 24, minHeight: 280, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.n}</div>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
              <Icon name={s.icon} size={18} />
            </div>
          </div>
          <div className="display" style={{ fontSize: 24, lineHeight: 1.05, marginBottom: 10 }}>{s.title}</div>
          <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{s.body}</div>
        </div>
    )}
    </div>;


  return (
    <PageShell>
      <PageHero
        eyebrow="How it works"
        title={<>A fairer rental,<br />end to end.</>}
        sub="Every step is built on verified evidence of care — so tenants and landlords can trust each other without friction." />
      

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-wide">
          <h3 className="display" style={{ fontSize: 32, margin: '0 0 24px' }}>For tenants</h3>
          <Steps steps={tenantSteps} />
          <h3 className="display" style={{ fontSize: 32, margin: '60px 0 24px' }}>For landlords</h3>
          <Steps steps={landlordSteps} />
        </div>
      </section>

      {/* Trust & safety rail */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Trust & safety</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '10px 0 0' }}>Verified at every step.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
            { icon: 'shield', t: 'Identity verified', d: 'Photo-ID check for all landlords and tenants, HMRC check for commercial landlords.' },
            { icon: 'check', t: 'Demographic-blind matching', d: 'Protected characteristics are never visible to landlords. Audited quarterly.' },
            { icon: 'sparkles', t: 'GDPR-native', d: 'You own your data. Export or delete it any time, in one click.' }].
            map((x) =>
            <div key={x.t} className="solid-card" style={{ padding: 28 }}>
                <Icon name={x.icon} size={22} style={{ color: 'var(--coral-700)' }} />
                <div style={{ fontSize: 18, fontWeight: 600, marginTop: 14 }}>{x.t}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{x.d}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <PageCTA title="Ready to get started?" sub="Join for free — tenant or landlord." primaryLabel="Create account" onPrimary={() => go('/signup')} />
    </PageShell>);

};

// ===== PRICING (full page) =====
const PricingPage = () => {
  const { go } = useNav();
  const [yearly, setYearly] = uS(false);

  const tiers = [
  {
    name: 'Tenant', price: 'Free', sub: 'Forever',
    features: ['Profile & Home Story', 'Go live when searching', 'Up to 3 verified references', 'Apply to any property', 'Compatibility scoring'],
    cta: 'Create profile', accent: false
  },
  {
    name: 'Tenant Pro', price: yearly ? '£38' : '£4', sub: yearly ? 'per year (save 20%)' : 'per month',
    features: ['Everything in Tenant', 'Unlimited references', 'Care Score insights', 'Priority in scouting feed', 'Public shareable profile', 'Remove GoodLet branding'],
    cta: 'Try Pro free', accent: true
  },
  {
    name: 'Landlord', price: yearly ? '£115' : '£12', sub: yearly ? 'per property / year' : 'per property / month',
    features: ['List properties', 'Verified applicant scoring', 'Scout tenants in-market', 'Tenant endorsements', 'Condition reports', 'Digital lease + deposit protection'],
    cta: 'List a property', accent: false
  }];


  const faqs = [
  { q: 'Is GoodLet really free for tenants?', a: 'Yes — the tenant plan is free forever. Pro is optional, for tenants who want advanced features like unlimited references and priority placement.' },
  { q: 'Do I pay per property as a landlord?', a: 'Yes. £12/month per property (or £115/year). Agents managing 10+ properties — contact us for bulk pricing.' },
  { q: 'Can I cancel at any time?', a: 'Yes. No contracts, no termination fees. Your profile and data stay with you.' },
  { q: 'Is there a free trial for Tenant Pro?', a: '14 days free, no card required.' }];


  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Simple, fair,<br />and free for most.</>}
        sub="Tenants never pay to find a home. Landlords pay per property — only when they’re listing." />
      

      {/* toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0 40px' }}>
        <div className="seg">
          <button className={!yearly ? 'on' : ''} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? 'on' : ''} onClick={() => setYearly(true)}>Yearly · save 20%</button>
        </div>
      </div>

      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {tiers.map((t) =>
            <div key={t.name}
            style={{
              padding: 28, borderRadius: 24,
              background: t.accent ? 'var(--ink)' : 'white',
              color: t.accent ? 'var(--cream)' : 'var(--ink)',
              border: t.accent ? 'none' : '1px solid var(--line)',
              boxShadow: t.accent ? '0 30px 60px -20px oklch(0.3 0.05 30 / 0.3)' : 'var(--sh-md)',
              position: 'relative', display: 'flex', flexDirection: 'column'
            }}>
                {t.accent && <span style={{ position: 'absolute', top: 20, right: 20, fontSize: 11, padding: '4px 10px', borderRadius: 99, background: 'var(--coral-500)', color: 'var(--ink)', fontWeight: 500 }}>Most popular</span>}
                <div style={{ fontSize: 14, color: t.accent ? 'oklch(0.78 0.02 30)' : 'var(--ink-3)', fontWeight: 500 }}>{t.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
                  <span className="display" style={{ fontSize: 56 }}>{t.price}</span>
                  <span style={{ fontSize: 13, color: t.accent ? 'oklch(0.78 0.02 30)' : 'var(--ink-3)' }}>{t.sub}</span>
                </div>
                <div style={{ height: 1, background: t.accent ? 'oklch(1 0 0 / 0.12)' : 'var(--line)', margin: '22px 0' }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {t.features.map((f) =>
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                      <Icon name="check" size={14} style={{ color: t.accent ? 'var(--coral-400)' : 'var(--coral-700)' }} />
                      {f}
                    </li>
                )}
                </ul>
                <button className={`btn btn-lg ${t.accent ? 'btn-coral' : 'btn-primary'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 28 }} onClick={() => go('/signup')}>
                  {t.cta}
                </button>
              </div>
            )}
          </div>

          {/* Enterprise strip */}
          <div style={{ marginTop: 28, padding: 28, borderRadius: 24, background: 'white', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Managing 10+ properties?</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>Bulk pricing, team seats, and API access for letting agents.</div>
            </div>
            <button className="btn btn-ghost btn-lg" onClick={() => go('/contact')}>Talk to sales <Icon name="arrowRight" size={14} /></button>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '0 0 32px', textAlign: 'center' }}>Billing, simplified.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) =>
            <div key={i} className="solid-card" style={{ padding: 22 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.55 }}>{f.a}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>);

};

// ===== ABOUT =====
const AboutPage = () => {
  const { go } = useNav();
  const team = [
  { n: 'Ayo Bankole', r: 'Co-founder, CEO', hue: 30 },
  { n: 'Maya Patel', r: 'Co-founder, Product', hue: 330 },
  { n: 'Rohan Khan', r: 'Head of Engineering', hue: 250 },
  { n: 'Jo Lindqvist', r: 'Head of Trust & Safety', hue: 100 },
  { n: 'Tomi Okafor', r: 'Design Lead', hue: 200 },
  { n: 'Priya Sharma', r: 'Head of Operations', hue: 60 }];


  return (
    <PageShell>
      <PageHero
        eyebrow="About GoodLet"
        title={<>Built because renting<br />could be fairer.</>}
        sub="We’re a small team in London fixing a rental market that judges tenants on postcodes instead of on how they actually live. GoodLet replaces gut-feel with evidence of care." />
      

      {/* Manifesto / values */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container-wide" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
            { t: 'Evidence over promises', d: 'Every claim on GoodLet is verified at source. No anonymous references.' },
            { t: 'Privacy by default', d: 'Protected characteristics are never surfaced to landlords. Matching is demographic-blind.' },
            { t: 'Free for tenants, always', d: 'Finding a home shouldn’t come with a paywall. Tenants never pay.' }].
            map((v) =>
            <div key={v.t} style={{ padding: 26, background: 'white', border: '1px solid var(--line)', borderRadius: 20 }}>
                <div style={{ fontSize: 18, fontWeight: 600 }}>{v.t}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{v.d}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Our story</div>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, margin: '10px 0 24px' }}>
            We built what we wished existed.
          </h2>
          <div style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>Ayo spent six weeks in 2023 trying to rent a flat in Hackney. He had a stable job, a cat, and three previous landlords who loved him. None of that mattered: every application asked for a guarantor, two months’ rent, or both.</p>
            <p>Maya was on the other side of the same market, trying to find a tenant for a small flat she’d inherited. She’d had two sets of nightmare tenants in a row — both with spotless credit scores. She wanted to know who actually cared for a home.</p>
            <p>We started GoodLet because the signals that matter — evidence of care, endorsements from real landlords, proof of how someone lives — weren’t anywhere on a rental application. Now they are.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>The team</div>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', margin: '10px 0 0' }}>Small team, big care.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {team.map((m) =>
            <div key={m.n} style={{ padding: 24, background: 'white', border: '1px solid var(--line)', borderRadius: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                <Avatar name={m.n} size={56} hue={m.hue} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{m.n}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{m.r}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <PageCTA title="Join us." sub="We’re hiring engineers, designers, and trust & safety leads." primaryLabel="See open roles" onPrimary={() => go('/contact')} />
    </PageShell>);

};

// ===== CONTACT =====
const ContactPage = () => {
  const [sent, setSent] = uS(false);
  const [topic, setTopic] = uS('general');
  const topics = [
  { k: 'general', l: 'General question' },
  { k: 'sales', l: 'Agent / bulk pricing' },
  { k: 'press', l: 'Press & partnerships' },
  { k: 'safety', l: 'Trust & safety' }];


  return (
    <PageShell>
      <section style={{ padding: '60px 0' }}>
        <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Contact</div>
            <h1 className="display" style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', margin: '12px 0 20px', lineHeight: 1.05 }}>
              Talk to a human.
            </h1>
            <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 32 }}>
              We reply within one working day. For urgent tenant or landlord safety issues, email <strong>safety@goodlet.co</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
              { icon: 'message', t: 'hello@goodlet.co', d: 'General enquiries' },
              { icon: 'user', t: 'sales@goodlet.co', d: 'Bulk & agent pricing' },
              { icon: 'shield', t: 'safety@goodlet.co', d: 'Trust & safety issues' },
              { icon: 'home', t: '10 Boundary Row, London SE1 8HP', d: 'Our London office' }].
              map((c) =>
              <div key={c.t} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
                    <Icon name={c.icon} size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{c.d}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="glass-strong" style={{ padding: 32, borderRadius: 28 }}>
            {sent ?
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 76, height: 76, margin: '0 auto', borderRadius: 99, background: 'linear-gradient(135deg, oklch(0.88 0.14 155), oklch(0.72 0.14 155))', display: 'grid', placeItems: 'center', color: 'white' }}>
                  <Icon name="check" size={40} stroke={2.5} />
                </div>
                <div className="display" style={{ fontSize: 32, marginTop: 20 }}>Message sent.</div>
                <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>We'll be in touch within a working day.</div>
                <button className="btn btn-ghost btn-lg" style={{ marginTop: 20 }} onClick={() => setSent(false)}>Send another</button>
              </div> :

            <form onSubmit={(e) => {e.preventDefault();setSent(true);}}>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>What’s this about?</label>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {topics.map((t) =>
                  <button type="button" key={t.k} onClick={() => setTopic(t.k)}
                  style={{
                    padding: '10px 14px', borderRadius: 12,
                    background: topic === t.k ? 'var(--ink)' : 'white',
                    color: topic === t.k ? 'var(--cream)' : 'var(--ink-2)',
                    border: '1px solid ' + (topic === t.k ? 'transparent' : 'var(--line)'),
                    fontSize: 13, fontWeight: 500
                  }}>{t.l}</button>
                  )}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div className="field"><label>First name</label><input className="input" defaultValue="Ayo" /></div>
                  <div className="field"><label>Last name</label><input className="input" defaultValue="Bankole" /></div>
                </div>
                <div className="field" style={{ marginBottom: 14 }}><label>Email</label><input className="input" type="email" defaultValue="ayo@bankole.co" /></div>
                <div className="field" style={{ marginBottom: 20 }}>
                  <label>Message</label>
                  <textarea className="textarea" rows={6} defaultValue="Hi GoodLet team — I'd love to learn more about…" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  Send message <Icon name="arrowRight" size={16} />
                </button>
              </form>
            }
          </div>
        </div>
      </section>
    </PageShell>);

};

// ===== HELP CENTRE =====
const HelpPage = () => {
  const { go } = useNav();
  const [q, setQ] = uS('');

  const categories = [
  { icon: 'user', t: 'Getting started', c: 12, k: 'start' },
  { icon: 'shield', t: 'Verification & trust', c: 8, k: 'verify' },
  { icon: 'home', t: 'Applications', c: 14, k: 'apps' },
  { icon: 'sparkles', t: 'Care Score', c: 6, k: 'care' },
  { icon: 'message', t: 'Messaging', c: 5, k: 'msg' },
  { icon: 'spark', t: 'Billing', c: 9, k: 'bill' }];


  const faqs = [
  { q: 'How do I build my Home Story?', a: 'Go to Profile → Home Story and add entries for each place you’ve rented. Upload before/after photos, note improvements, and invite the landlord for a reference.' },
  { q: 'How long does reference verification take?', a: 'Most references are verified within 24 hours. Commercial landlords (via HMRC) can take up to 48 hours.' },
  { q: 'Can I hide my profile from specific landlords?', a: 'Yes — under Privacy → Blocked. They’ll never see your profile in scouting.' },
  { q: 'What if a past landlord refuses to give a reference?', a: 'You can add an unverified entry with your own notes. It displays as unverified until a reference is received.' },
  { q: 'How do I cancel my Tenant Pro subscription?', a: 'Settings → Billing → Cancel plan. Your profile stays free forever; only Pro features are removed.' },
  { q: 'How is my Care Score calculated?', a: 'Weighted 40% references, 25% tenure, 20% lease adherence, 15% community signal. Score updates within minutes of any new signal.' }];


  return (
    <PageShell>
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 860, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Help centre</div>
          <h1 className="display" style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', margin: '12px 0 20px', lineHeight: 1.05 }}>
            How can we help?
          </h1>

          <div style={{ position: 'relative', maxWidth: 600, margin: '20px auto 0' }}>
            <Icon name="search" size={18} style={{ position: 'absolute', left: 18, top: 18, color: 'var(--ink-3)' }} />
            <input className="input" style={{ height: 56, paddingLeft: 48, fontSize: 16 }}
            placeholder="Search for answers…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>

          <div style={{ marginTop: 20, fontSize: 13, color: 'var(--ink-3)' }}>
            Popular: <a style={{ color: 'var(--coral-700)', cursor: 'pointer', fontWeight: 500 }}>reference verification</a>,{' '}
            <a style={{ color: 'var(--coral-700)', cursor: 'pointer', fontWeight: 500 }}>Care Score</a>,{' '}
            <a style={{ color: 'var(--coral-700)', cursor: 'pointer', fontWeight: 500 }}>guarantors</a>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 60px' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {categories.map((c) =>
            <div key={c.k} className="solid-card" style={{ padding: 26, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 600 }}>{c.t}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{c.c} articles</div>
                  </div>
                  <Icon name="chevRight" size={18} style={{ marginLeft: 'auto', color: 'var(--ink-3)' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '60px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: '0 0 28px' }}>Top questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) =>
            <details key={i} className="solid-card" style={{ padding: '18px 22px' }}>
                <summary style={{ cursor: 'pointer', fontSize: 16, fontWeight: 500, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {f.q}
                  <Icon name="chevDown" size={16} />
                </summary>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.55 }}>{f.a}</div>
              </details>
            )}
          </div>
          <div style={{ marginTop: 32, padding: 24, background: 'white', border: '1px solid var(--line)', borderRadius: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Still stuck?</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>We reply within one working day.</div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => go('/contact')}>Contact support <Icon name="arrowRight" size={14} /></button>
          </div>
        </div>
      </section>
    </PageShell>);

};

// ===== LEGAL (shared component) =====
const LegalPage = ({ kind }) => {
  const lastUpdated = 'April 2026';
  const privacySections = [
  { t: '1. Who we are', b: 'GoodLet Ltd is a company registered in England & Wales (company no. 14928301) with its office at 10 Boundary Row, London SE1 8HP. We are the data controller for the information you give us.' },
  { t: '2. Data we collect', b: 'We collect only what’s needed to operate GoodLet: your name, email, phone (optional), photos you upload to your Home Story, references you receive, and usage data to improve the service. We never collect protected characteristics such as race, religion, or disability.' },
  { t: '3. How we use your data', b: 'To run your account, match you to compatible landlords or tenants, verify references, and communicate with you. We will never sell your data. We will never share it with third-party marketers.' },
  { t: '4. Your rights', b: 'You can export, correct, or delete your data at any time under Settings → Privacy. We respond to GDPR/UK DPA data requests within 30 days.' },
  { t: '5. Cookies', b: 'We use strictly necessary cookies to run the service and (with consent) analytics cookies to understand how GoodLet is used. See our Cookie Policy for details.' },
  { t: '6. Retention', b: 'We keep your data while your account is active. If you close your account, we delete personal data within 90 days, except where we must retain it for legal or tax reasons.' },
  { t: '7. Contact', b: 'Email privacy@goodlet.co or write to the address above.' }];

  const termsSections = [
  { t: '1. Agreement', b: 'By creating a GoodLet account you agree to these Terms and our Privacy Policy.' },
  { t: '2. Eligibility', b: 'You must be 18 or over and legally able to rent or let property in the United Kingdom.' },
  { t: '3. Accuracy', b: 'You agree that everything on your profile — photos, references, tenancy history — is accurate to the best of your knowledge. Submitting false information is grounds for account termination.' },
  { t: '4. Fair use', b: 'GoodLet is demographic-blind by design. You agree not to use the platform to discriminate on protected characteristics. We audit for compliance and will terminate accounts that breach this.' },
  { t: '5. Payments', b: 'Tenant accounts are free. Tenant Pro and Landlord plans are billed in advance. You can cancel any time; we don’t refund partial months but we don’t lock you in.' },
  { t: '6. Liability', b: 'GoodLet provides matching and verification tools. We are not a party to any tenancy agreement you form with another user. Disputes between users are between those users.' },
  { t: '7. Termination', b: 'You can close your account any time. We can terminate accounts that breach these Terms. We’ll give 30 days’ notice except for urgent safety issues.' },
  { t: '8. Changes', b: 'We’ll email you at least 30 days before any material change to these Terms. Continued use means acceptance.' }];


  const isPrivacy = kind === 'privacy';
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <PageShell>
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            Legal
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '12px 0 10px', lineHeight: 1.05 }}>
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h1>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 40 }}>Last updated: {lastUpdated}</div>

          <div style={{ padding: 32, background: 'white', border: '1px solid var(--line)', borderRadius: 24 }}>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 0 }}>
              {isPrivacy ?
              'Your privacy matters. This page explains what data we collect, how we use it, and the choices you have. Plain English. No dark patterns.' :
              'These Terms govern your use of GoodLet. They set out what you agree to when you use the service — and what we promise in return.'}
            </p>
            <div style={{ height: 1, background: 'var(--line)', margin: '24px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {sections.map((s) =>
              <div key={s.t}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>{s.t}</h3>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{s.b}</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 24, display: 'flex', gap: 16, fontSize: 14, color: 'var(--ink-3)' }}>
            <a style={{ cursor: 'pointer', color: 'var(--coral-700)', fontWeight: 500 }}>Download PDF</a>
            <span>·</span>
            <a style={{ cursor: 'pointer', color: 'var(--coral-700)', fontWeight: 500 }}>Previous versions</a>
          </div>
        </div>
      </section>
    </PageShell>);

};

// ===== Shared CTA band (reusable with props) =====
const PageCTA = ({ title, sub, primaryLabel, onPrimary, secondaryLabel, onSecondary }) =>
<section style={{ padding: '80px 0' }}>
    <div className="container">
      <div style={{
      padding: '60px 48px', borderRadius: 36,
      background: 'linear-gradient(135deg, oklch(0.72 0.16 28) 0%, oklch(0.80 0.12 50) 100%)',
      color: 'var(--ink)', position: 'relative', overflow: 'hidden',
      boxShadow: '0 40px 80px -30px oklch(0.55 0.15 28 / 0.6)'
    }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'oklch(0.95 0.05 60 / 0.4)', filter: 'blur(60px)', right: -80, top: -80 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'oklch(0.60 0.18 28 / 0.5)', filter: 'blur(60px)', left: -60, bottom: -80 }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)', margin: 0, lineHeight: 1.05, color: 'var(--ink)' }}>{title}</h2>
            {sub && <p style={{ fontSize: 17, marginTop: 16, maxWidth: 440, color: 'var(--ink)' }}>{sub}</p>}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={onPrimary}>
              {primaryLabel} <Icon name="arrowRight" size={16} />
            </button>
            {secondaryLabel &&
          <button className="btn btn-ghost btn-lg" onClick={onSecondary} style={{ background: 'color-mix(in oklab, white 30%, transparent)', borderColor: 'color-mix(in oklab, var(--ink) 20%, transparent)', color: 'var(--ink)' }}>
                {secondaryLabel}
              </button>
          }
          </div>
        </div>
      </div>
    </div>
  </section>;


Object.assign(window, {
  ForTenantsPage, ForLandlordsPage, HowItWorksPage, PricingPage,
  AboutPage, ContactPage, HelpPage, LegalPage
});