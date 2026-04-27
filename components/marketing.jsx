/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav */
const { useState, useEffect, useMemo } = React;

// ===== Top nav (marketing) =====
const MarketingNav = () => {
  const { go, route } = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();window.addEventListener('scroll', on);return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {if (e.key === 'Escape') setMenuOpen(false);};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navLinks = [
  ['/for-tenants', 'For tenants'],
  ['/for-landlords', 'For landlords'],
  ['/how-it-works', 'How it works'],
  ['/pricing', 'Pricing']];


  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      padding: '16px 0',
      background: scrolled || menuOpen ? 'color-mix(in oklab, oklch(0.96 0.04 40) 75%, transparent)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(18px) saturate(1.4)' : 'none',
      borderBottom: scrolled || menuOpen ? '1px solid color-mix(in oklab, white 60%, transparent)' : '1px solid transparent',
      transition: 'all .25s'
    }}>
      <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Logo onClick={() => go('/')} />
        <nav data-nav-primary aria-label="Primary"
        style={{ display: 'flex', gap: 28, fontSize: 14, color: 'var(--ink-2)' }}>
          {navLinks.map(([href, label]) =>
          <a key={href} href={`#${href}`} onClick={(e) => {e.preventDefault();go(href);}}
          style={{ cursor: 'pointer', fontWeight: route === href ? 600 : 400, padding: '6px 2px' }}>
              {label}
            </a>
          )}
        </nav>
        <div data-nav-actions style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button data-nav-signin className="btn btn-ghost btn-sm" onClick={() => go('/signin')}>Sign in</button>
          <button className="btn btn-primary btn-sm" onClick={() => go('/signup')}>
            Get started <Icon name="arrowRight" size={14} />
          </button>
          <button data-nav-burger aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: 'none',
            width: 44, height: 44, borderRadius: 12,
            background: 'color-mix(in oklab, white 55%, transparent)',
            border: '1px solid var(--glass-border)',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Icon name={menuOpen ? 'x' : 'menu'} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen &&
      <div id="mobile-menu" style={{
        padding: '20px', marginTop: 12,
        borderTop: '1px solid var(--glass-border)'
      }}>
          <nav aria-label="Mobile" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map(([href, label]) =>
          <a key={href} href={`#${href}`} onClick={(e) => {e.preventDefault();go(href);setMenuOpen(false);}}
          style={{
            padding: '14px 16px', borderRadius: 12,
            fontSize: 16, fontWeight: route === href ? 600 : 500,
            color: 'var(--ink)',
            background: route === href ? 'color-mix(in oklab, var(--coral-100) 60%, transparent)' : 'transparent'
          }}>
                {label}
              </a>
          )}
            <div className="hr" style={{ margin: '12px 4px' }} />
            <button className="btn btn-ghost btn-lg btn-block" onClick={() => {go('/signin');setMenuOpen(false);}}>Sign in</button>
          </nav>
        </div>
      }
    </header>);

};

// ===== HERO =====
const Hero = () => {
  const { go } = useNav();
  const [role, setRole] = useState('tenant');

  const copy = {
    tenant: {
      eyebrow: 'For renters',
      title: 'Show landlords the\ntenant you already are.',
      sub: 'Build a verified renting profile with references, photos of the homes you’ve cared for, and the improvements you’ve made. Then go live — the right landlords find you.',
      cta: 'Build my tenant profile'
    },
    landlord: {
      eyebrow: 'For landlords & agents',
      title: 'Pick tenants on\nsubstance, not guesswork.',
      sub: 'See who really looks after a home. Verified references, property-condition reports, and a compatibility score that matches the tenants you actually want.',
      cta: 'Post a property'
    }
  }[role];

  return (
    <section style={{ position: 'relative', padding: '40px 0 80px' }}>
      <div className="container-wide" data-hero-grid style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
        {/* Left */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px',
            background: 'color-mix(in oklab, white 50%, transparent)', border: '1px solid var(--glass-border)',
            borderRadius: 999, fontSize: 13, color: 'var(--ink-2)', backdropFilter: 'blur(12px)', marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--coral-500)', boxShadow: '0 0 0 4px oklch(0.75 0.14 30 / 0.3)' }} />
            {copy.eyebrow} · UK rental market
          </div>

          <h1 className="display anim-up" style={{ fontSize: 'clamp(52px, 7vw, 92px)', margin: 0, color: 'var(--ink)', whiteSpace: 'pre-line' }}>
            {copy.title}
          </h1>

          <p style={{ marginTop: 24, fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 560 }}>
            {copy.sub}
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-coral btn-lg" onClick={() => go(role === 'tenant' ? '/app/tenant' : '/app/landlord')}>
              {copy.cta} <Icon name="arrowRight" size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => go('/how-it-works')}>
              See how it works
            </button>
          </div>

          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div className="seg">
              <button className={role === 'tenant' ? 'on' : ''} onClick={() => setRole('tenant')}>I'm a tenant</button>
              <button className={role === 'landlord' ? 'on' : ''} onClick={() => setRole('landlord')}>I'm a landlord</button>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="shield" size={14} /> Free to join · no credit card
            </div>
          </div>
        </div>

        {/* Right — glass composition */}
        <HeroComposition role={role} />
      </div>
    </section>);

};

// ===== Hero composition — two glass cards, echoing the reference image =====
const HeroComposition = ({ role }) => {
  const tenant =
  <>
      {/* Card 1 — Profile card */}
      <div className="glass anim-up" style={{
      padding: 22, borderRadius: 28,
      gridColumn: '1', gridRow: '1 / span 2',
      alignSelf: 'start',
      display: 'flex', flexDirection: 'column', gap: 16, height: "458px", width: "310px"
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tenant profile</div>
            <div className="display" style={{ fontSize: 24, marginTop: 6 }}>Ayo &<br />Maya</div>
          </div>
          <div style={{
          width: 34, height: 34, borderRadius: 12,
          background: 'color-mix(in oklab, white 60%, transparent)',
          border: '1px solid var(--glass-border)',
          display: 'grid', placeItems: 'center'
        }}><Icon name="arrowUpRight" size={14} /></div>
        </div>

        <PhImg label="home you cared for" h={140} hue={30} />

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className="chip chip-verified"><Icon name="check" size={12} /> Verified refs</span>
          <span className="chip chip-coral">3 yrs renting</span>
          <span className="chip">Pet: cat</span>
        </div>

        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 14, fontSize: 13, color: 'var(--ink-2)' }}>
          <span className="display" style={{ fontSize: 40, color: 'var(--coral-700)' }}>92</span>
          <span style={{ fontSize: 13, marginLeft: 8, color: 'var(--ink-3)' }}>/100 Care Score</span>
        </div>
      </div>

      {/* Card 2 — Ring / compatibility */}
      <div className="glass anim-up" style={{
      padding: 22, borderRadius: 28,
      gridColumn: '2', gridRow: '1',
      alignSelf: 'start',
      display: 'flex', flexDirection: 'column', gap: 10,
      animationDelay: '.1s', height: "290px"
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }}>Match with<br />12 Harlow Mews</div>
          <Icon name="arrowUpRight" size={16} style={{ color: 'var(--ink-3)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0', width: "252px", height: "6px" }}>
          <Ring value={94} size={200} label="compatibility" color="coral" />
        </div>
      </div>

      {/* Card 3 — Reviews */}
      <div className="glass anim-up" style={{
      padding: 18, borderRadius: 24,
      gridColumn: '2', gridRow: '2',
      alignSelf: 'start',
      animationDelay: '.2s'
    }}>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          Landlord endorsement
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Avatar name="RK" size={32} hue={250} />
          <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
            “Left the flat cleaner than they found it. Painted the kitchen — <em>with permission</em> — and it looked brilliant.”
            <div style={{ marginTop: 6, fontSize: 11, color: 'var(--ink-3)' }}>— R. Khan · Landlord · Leeds</div>
          </div>
        </div>
      </div>
    </>;


  const landlord =
  <>
      {/* Applicants stack */}
      <div className="glass anim-up" style={{
      padding: 20, borderRadius: 28,
      gridColumn: '1 / span 2', gridRow: '1',
      display: 'flex', flexDirection: 'column', gap: 14
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Applicants</div>
            <div className="display" style={{ fontSize: 24, marginTop: 4 }}>2-bed, Hackney</div>
          </div>
          <span className="chip chip-coral">7 shortlisted</span>
        </div>
        {[
      { n: 'Ayo & Maya', score: 94, tag: '3 yrs · pet', hue: 30 },
      { n: 'Priya S.', score: 88, tag: '2 yrs · no pet', hue: 330 },
      { n: 'T. Okafor', score: 82, tag: '4 yrs · family', hue: 200 }].
      map((a, i) =>
      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0',
        borderTop: i === 0 ? 'none' : '1px solid var(--glass-border)' }}>
            <Avatar name={a.n} size={36} hue={a.hue} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{a.n}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{a.tag}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="display" style={{ fontSize: 24, color: 'var(--coral-700)' }}>{a.score}</div>
              <Icon name="chevRight" size={14} style={{ color: 'var(--ink-3)' }} />
            </div>
          </div>
      )}
      </div>

      {/* Ring */}
      <div className="glass anim-up" style={{
      padding: 22, borderRadius: 28,
      gridColumn: '1', gridRow: '2',
      animationDelay: '.1s',
      display: 'flex', flexDirection: 'column', gap: 10
    }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Top match</div>
        <Ring value={94} size={110} label="compatibility" color="coral" />
      </div>

      {/* Property */}
      <div className="glass anim-up" style={{
      padding: 18, borderRadius: 28,
      gridColumn: '2', gridRow: '2',
      animationDelay: '.2s'
    }}>
        <PhImg label="12 Harlow Mews" h={120} hue={25} />
        <div style={{ marginTop: 10, fontSize: 13, fontWeight: 500 }}>12 Harlow Mews</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>£2,400 pcm · 2 bed</div>
      </div>
    </>;


  return (
    <div data-hero-collage style={{
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto auto',
      alignContent: 'start',
      columnGap: 20,
      rowGap: 8
    }}>
      {role === 'tenant' ? tenant : landlord}
    </div>);

};

// ===== Social proof row =====
const LogoRow = () =>
<div style={{ padding: '40px 0 60px' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 22 }}>
        Trusted by landlords & tenants across the UK
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', opacity: 0.6 }}>
        {['Savills', 'Foxtons', 'Knight Frank', 'Dexters', 'Purplebricks', 'OpenRent'].map((n) =>
      <div key={n} className="display" style={{ fontSize: 22, color: 'var(--ink-3)' }}>{n}</div>
      )}
      </div>
    </div>
  </div>;


// ===== How it works =====
const HowItWorks = () => {
  const steps = [
  { n: '01', title: 'Build your profile', body: 'Photos of homes you’ve cared for, improvements you’ve made, lease preferences, and verified IDs.', icon: 'user' },
  { n: '02', title: 'Collect verified evidence', body: 'Invite previous landlords by email. They rate you on cleanliness, communication, and care — privately, then published.', icon: 'shield' },
  { n: '03', title: 'Go live when you’re searching', body: 'Flip one switch. Landlords with matching properties find you. You apply with a single tap.', icon: 'spark' },
  { n: '04', title: 'Match on substance', body: 'Each applicant shows a compatibility score against your lease, pet, lifestyle and communication preferences.', icon: 'heart' }];

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container-wide">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'end', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
              How it works
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', margin: '10px 0 0' }}>
              Four steps to a better<br />rental match.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 520, margin: 0, justifySelf: 'end' }}>
            We don’t just verify credit scores. We help tenants prove they’re the sort of person
            who paints the hallway when it chips — and help landlords find them.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {steps.map((s, i) =>
          <div key={s.n} className="glass-strong" style={{ padding: 26, borderRadius: 24, minHeight: 260, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.n}</div>
                <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'var(--coral-100)', color: 'var(--coral-700)',
                display: 'grid', placeItems: 'center'
              }}><Icon name={s.icon} size={18} /></div>
              </div>
              <div className="display" style={{ fontSize: 26, lineHeight: 1.05, marginBottom: 10 }}>{s.title}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{s.body}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// ===== Feature bento =====
const FeatureBento = () => {
  return (
    <section style={{ padding: '80px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
      <div className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            Features
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', margin: '10px 0 0' }}>
            Everything a rental decision needs.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridAutoRows: '220px', gap: 20 }}>
          {/* Big: Home Story */}
          <div className="solid-card" style={{ gridColumn: 'span 3', gridRow: 'span 2', padding: 28, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ zIndex: 1 }}>
              <span className="chip chip-coral" style={{ marginBottom: 14 }}>Signature feature</span>
              <div className="display" style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 10 }}>
                Home Story timeline.
              </div>
              <div style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 380 }}>
                A chronological portfolio of every place you’ve rented — before/after photos,
                improvements, reviews. Proof of care, not promises.
              </div>
            </div>
            <div style={{ flex: 1, position: 'relative', marginTop: 20 }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10
              }}>
                <PhImg label="2019 · Shoreditch" h="100%" hue={30} />
                <PhImg label="2021 · Leeds" h="100%" hue={50} />
                <PhImg label="2024 · Hackney" h="100%" hue={20} />
              </div>
            </div>
          </div>

          {/* Reputation score */}
          <div className="solid-card" style={{ gridColumn: 'span 3', gridRow: 'span 1', padding: 24, display: 'flex', gap: 24, alignItems: 'center' }}>
            <Ring value={92} size={100} label="care score" color="coral" />
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Care Score</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                A weighted, dynamic score built from verified references, lease adherence,
                maintenance reporting, and community signal.
              </div>
            </div>
          </div>

          {/* Go live */}
          <div style={{ gridColumn: 'span 2', background: 'var(--ink)', color: 'var(--cream)', borderRadius: 'var(--r-lg)', padding: 24, boxShadow: 'var(--sh-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'oklch(0.78 0.02 30)' }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: 'oklch(0.78 0.15 150)', boxShadow: '0 0 0 4px oklch(0.78 0.15 150 / 0.3)' }} />
              Live mode
            </div>
            <div className="display" style={{ fontSize: 28, marginTop: 12 }}>Go live<br />when you’re searching.</div>
            <div style={{ fontSize: 13, color: 'oklch(0.78 0.02 30)', marginTop: 10 }}>
              One switch. Landlords see your profile surface in their scouting feed.
            </div>
          </div>

          {/* Verified refs */}
          {/* Verified references */}
          <div className="solid-card" style={{ gridColumn: 'span 2', padding: 24, alignSelf: 'start' }}>
            <Icon name="shield" size={22} style={{ color: 'var(--coral-600)' }} />
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 12 }}>Verified references</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6 }}>
              We verify landlord identity before a reference is published — so trust is earned, not typed.
            </div>
          </div>

          {/* Compatibility */}
          <div className="solid-card" style={{ gridColumn: 'span 2', padding: 24, alignSelf: 'start' }}>
            <Icon name="sparkles" size={22} style={{ color: 'var(--coral-600)' }} />
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 12 }}>Compatibility score</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 6 }}>
              Matches tenants to landlords on lifestyle, lease length, pets, communication style — not just credit.
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// ===== Testimonial =====
const Testimonial = () =>
<section style={{ padding: '100px 0' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <Icon name="sparkles" size={28} style={{ color: 'var(--coral-600)', margin: '0 auto' }} />
      <div className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.15, margin: '24px auto 0', maxWidth: 900 }}>
        “For the first time I could actually <em>show</em> a landlord the flat I painted and cared for.
        We got the place without a guarantor.”
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
        <Avatar name="Ayo Bankole" size={44} hue={30} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontWeight: 600 }}>Ayo Bankole</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Tenant · Hackney, London</div>
        </div>
      </div>
    </div>
  </section>;


// ===== Pricing =====
const Pricing = () => {
  const tiers = [
  {
    name: 'Tenant', price: 'Free', sub: 'Forever',
    features: ['Profile & Home Story', 'Go live when searching', 'Up to 3 verified references', 'Apply to any property'],
    cta: 'Create profile', primary: false, accent: false
  },
  {
    name: 'Tenant Pro', price: '£4', sub: 'per month',
    features: ['Everything in Tenant', 'Unlimited references', 'Care Score insights', 'Priority in landlord scouting', 'Public shareable profile'],
    cta: 'Try Pro free', primary: true, accent: true
  },
  {
    name: 'Landlord', price: '£12', sub: 'per property / month',
    features: ['List properties', 'Verified applicant scoring', 'Scout tenants in-market', 'Tenant endorsements', 'Condition reports'],
    cta: 'List a property', primary: false, accent: false
  }];

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
            Pricing
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', margin: '10px 0 0' }}>
            Simple, fair, and free for most tenants.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {tiers.map((t) =>
          <div key={t.name}
          style={{
            padding: 28,
            borderRadius: 24,
            background: t.accent ? 'var(--ink)' : 'white',
            color: t.accent ? 'var(--cream)' : 'var(--ink)',
            border: t.accent ? 'none' : '1px solid var(--line)',
            boxShadow: t.accent ? '0 30px 60px -20px oklch(0.3 0.05 30 / 0.3)' : 'var(--sh-md)',
            position: 'relative',
            display: 'flex', flexDirection: 'column'
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
                    <Icon name="check" size={14} style={{ color: t.accent ? 'var(--coral-400)' : 'var(--coral-600)' }} />
                    {f}
                  </li>
              )}
              </ul>
              <button className={`btn btn-lg ${t.accent ? 'btn-coral' : 'btn-primary'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 28 }}>
                {t.cta}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// ===== FAQ =====
const FAQ = () => {
  const [open, setOpen] = useState(0);
  const items = [
  { q: 'How are references verified?', a: 'Landlords are verified by HMRC/Companies House for commercial landlords and photo-ID for private landlords. References are attributed to a verified identity, not an anonymous email.' },
  { q: 'What is a Care Score?', a: 'A 0–100 score weighted from verified references, lease adherence, maintenance reporting, improvements, and tenure length. It updates with every new endorsement.' },
  { q: 'Who sees my profile when I go live?', a: 'Only landlords with matching properties in your search criteria. You control which fields are public versus request-only.' },
  { q: 'Is GoodLet available outside the UK?', a: 'We’re UK-only for now. Ireland and the Netherlands are next on the roadmap.' },
  { q: 'How do you prevent discrimination?', a: 'Protected characteristics are never visible to landlords. Matching is on lifestyle and care signals, not demographics. We audit for bias quarterly.' }];

  return (
    <section style={{ padding: '80px 0', background: 'color-mix(in oklab, white 50%, transparent)' }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 56px)', margin: 0 }}>Questions, answered.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((it, i) =>
          <div key={i} className="solid-card" style={{ padding: 0, overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)}
            style={{ width: '100%', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 17, fontWeight: 500, textAlign: 'left' }}>
                {it.q}
                <Icon name="chevDown" size={18} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </button>
              {open === i &&
            <div style={{ padding: '0 24px 22px', color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.6 }}>
                  {it.a}
                </div>
            }
            </div>
          )}
        </div>
      </div>
    </section>);

};

// ===== CTA band =====
const CTABand = () => {
  const { go } = useNav();
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{
          padding: '60px 48px', borderRadius: 36,
          background: 'linear-gradient(135deg, oklch(0.72 0.16 28) 0%, oklch(0.80 0.12 50) 100%)',
          color: 'var(--ink)', position: 'relative', overflow: 'hidden',
          boxShadow: '0 40px 80px -30px oklch(0.55 0.15 28 / 0.6)'
        }}>
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: 'oklch(0.95 0.05 60 / 0.4)', filter: 'blur(60px)',
            right: -80, top: -80
          }} />
          <div style={{
            position: 'absolute', width: 300, height: 300, borderRadius: '50%',
            background: 'oklch(0.60 0.18 28 / 0.5)', filter: 'blur(60px)',
            left: -60, bottom: -80
          }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', margin: 0, lineHeight: 1.05, color: 'var(--ink)' }}>
                Ready to be chosen<br />on merit?
              </h2>
              <p style={{ fontSize: 17, marginTop: 18, maxWidth: 440, color: 'var(--ink)' }}>
                Build your tenant profile in under five minutes. It's free, and it stays free.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => go('/app/tenant')}>
                I'm a tenant <Icon name="arrowRight" size={16} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => go('/app/landlord')} style={{ background: 'color-mix(in oklab, white 30%, transparent)', borderColor: 'color-mix(in oklab, var(--ink) 20%, transparent)', color: 'var(--ink)' }}>
                I'm a landlord
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// ===== Footer =====
const Footer = () => {
  const { go } = useNav();
  return (
    <footer style={{ padding: '60px 0 40px', borderTop: '1px solid var(--line)', background: 'color-mix(in oklab, white 60%, transparent)' }}>
      <div className="container-wide" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <Logo onClick={() => go('/')} />
          <div style={{ marginTop: 16, fontSize: 14, color: 'var(--ink-3)', maxWidth: 280 }}>
            Fairer rental decisions, built on verified evidence of care.
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            {['globe', 'message', 'user'].map((n) =>
            <div key={n} style={{ width: 32, height: 32, borderRadius: 10, border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--ink-3)' }}>
                <Icon name={n} size={14} />
              </div>
            )}
          </div>
        </div>
        {[
        { t: 'Product', l: [['For tenants', '/for-tenants'], ['For landlords', '/for-landlords'], ['Pricing', '/pricing'], ['How it works', '/how-it-works']] },
        { t: 'Company', l: [['About', '/about'], ['Contact', '/contact'], ['Careers', '/about']] },
        { t: 'Resources', l: [['Help centre', '/help'], ['Tenant guide', '/help'], ['Landlord guide', '/help']] },
        { t: 'Legal', l: [['Privacy & Terms', '/privacy'], ['Cookies', '/privacy'], ['Fair housing', '/about']] }].
        map((c) =>
        <div key={c.t}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>{c.t}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.l.map(([label, href]) => <a key={label} onClick={() => go(href)} style={{ fontSize: 14, color: 'var(--ink-2)', cursor: 'pointer' }}>{label}</a>)}
            </div>
          </div>
        )}
      </div>
      <div className="container-wide" style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--ink-3)' }}>
        <div>© 2026 GoodLet Ltd · Registered in England & Wales</div>
        <div>Made with care in London</div>
      </div>
    </footer>);

};

// ===== Marketing page composer =====
const MarketingPage = () =>
<>
    <div className="amb-bg" />
    <MarketingNav />
    <Hero />
    <LogoRow />
    <HowItWorks />
    <FeatureBento />
    <Testimonial />
    <Pricing />
    <FAQ />
    <CTABand />
    <Footer />
  </>;


Object.assign(window, { MarketingPage, MarketingNav, Footer });