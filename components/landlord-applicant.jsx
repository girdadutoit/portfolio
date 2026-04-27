/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav, BackButton, IOSDevice, DEMO_PROPERTY, TENANT */
const { useState: useLS, useEffect: useLE, useMemo: useLM } = React;

/* ============================================================
   Landlord applicant journeys
   1. ApplicantProfile   — /app/landlord/applicant/:id  (deep view)
   2. ApplicantCompare   — /app/landlord/applicants/compare  (novel)
   3. OfferFlow          — /app/landlord/offer/:id  (warm acceptance)

   Shared fixture: APPLICANTS — three candidates, all real people with
   full evidence. Ayo Bankole is THE one the landlord is considering.
   Everything uses the existing Icon/Avatar/Ring/PhImg primitives and
   the app's design tokens.
   ============================================================ */

// ─── Shared fixtures ────────────────────────────────────────
const APPLICANTS = [
  {
    id: 'ayo',
    name: 'Ayo Bankole',
    initials: 'AB',
    age: 32,
    hue: 30,
    role: 'Staff Product Designer · Monzo Bank',
    moveIn: '1 May 2026',
    coTenant: { name: 'Sam Okoye', role: 'Partner · Ops at Ocado', hue: 180 },
    pets: '1 cat (Mochi, 4yr, indoor)',
    smoker: false,
    location: 'Currently in Dalston, E8',
    applied: 'Tue at 14:22',
    match: 94, care: 92,
    income: { gross: 82000, net: 4850, ratio: 49 },
    ratioBand: 'ok',
    rtrStatus: 'verified',
    idStatus: 'verified',
    creditStatus: 'good', creditScore: 932,
    employmentStatus: 'verified',
    fitReasons: [
      { i: 'check',   t: 'Cat-friendly match', s: 'You allow one cat; they have one. Mochi is indoor and 4 years old.' },
      { i: 'pound',   t: 'Within your rent ratio',       s: 'Rent is 49% of Ayo\'s net income — inside your 55% ceiling.' },
      { i: 'calendar',t: 'Lines up with your vacancy',   s: 'Move-in 1 May. Your current tenants leave 28 April.' },
      { i: 'shield',  t: 'Three verified references',    s: 'Every past landlord rated 5★. Last tenancy ended on a handshake.' },
      { i: 'spark',   t: 'Cares for homes',              s: 'Previous landlords describe repainting, gardening and a returned deposit in full.' },
    ],
    careBreakdown: [
      { k: 'Landlord references', w: 40, s: 96 },
      { k: 'Tenure stability',    w: 25, s: 88 },
      { k: 'Lease adherence',     w: 20, s: 94 },
      { k: 'Community signal',    w: 15, s: 84 },
    ],
    homeStory: [
      { title: '46 Clapton Road', years: '2022–present', hue: 30, note: 'Repainted living room, restored the bath.' },
      { title: 'Flat 2, 10 Mare St', years: '2019–2022', hue: 60, note: 'Built shelving for the alcoves. Left deposit in full.' },
      { title: 'The Grove, Hackney', years: '2017–2019', hue: 15, note: 'First flat post-uni. Replaced the boiler filter every year.' },
    ],
    references: [
      { who: 'Priya Desai', role: 'Landlord · 46 Clapton Rd', years: '2022–2026', stars: 5, quote: '"Returned the flat in better condition than I rented it. Painted the living room without even asking — it was lovely. I\'d rent to Ayo again without hesitation."', verified: true, hue: 330 },
      { who: 'M. Hossain',  role: 'Landlord · 10 Mare St',    years: '2019–2022', stars: 5, quote: '"Paid rent early every month for three years. When the boiler broke mid-winter, they went and bought the part and refitted it themselves. Refunded on receipt."', verified: true, hue: 170 },
      { who: 'Oakhouse Lettings', role: 'Agent · The Grove', years: '2017–2019', stars: 5, quote: '"Model tenant. Communicated well, respected the property. Mentored other tenants in the building on upkeep."', verified: true, hue: 50 },
    ],
    timeline: [
      { year: '2026', event: 'Applied to 12 Harlow Mews', kind: 'current' },
      { year: '2022–Now', event: '46 Clapton Road (landlord: Priya)', kind: 'tenancy' },
      { year: '2019–2022', event: '10 Mare Street (landlord: M. Hossain)', kind: 'tenancy' },
      { year: '2017–2019', event: 'The Grove, Hackney (Oakhouse Lettings)', kind: 'tenancy' },
      { year: '2017', event: 'Graduated — UAL, Design', kind: 'milestone' },
    ],
    cover: `Hi Priya,\n\nThank you for considering me for 12 Harlow Mews. I'm drawn to the south-facing living room and the apple tree — both sold me on it.\n\nI've rented in London for nearly a decade and kept every flat in better nick than I found it. I'm a non-smoker, work hybrid at Monzo, and have one very quiet indoor cat called Mochi. My partner Sam (Ops at Ocado) would be moving in with me.\n\nWe're looking for something long-term — we're done moving every two years — and would love to make this our home for the foreseeable. Happy to come for a viewing whenever suits.\n\nWarmly,\nAyo`,
  },
  {
    id: 'priya',
    name: 'Priya S.',
    initials: 'PS',
    age: 29, hue: 330,
    role: 'Senior Lawyer · Linklaters',
    moveIn: '15 May 2026',
    coTenant: null,
    pets: 'None',
    smoker: false,
    location: 'Currently in Brockley, SE4',
    applied: 'Mon at 09:10',
    match: 88, care: 86,
    income: { gross: 94000, net: 5600, ratio: 43 },
    ratioBand: 'ok',
    rtrStatus: 'verified', idStatus: 'verified', creditStatus: 'excellent', creditScore: 961,
    employmentStatus: 'verified',
    fitReasons: [],
    careBreakdown: [{ k: 'Landlord references', w: 40, s: 90 }, { k: 'Tenure stability', w: 25, s: 78 }, { k: 'Lease adherence', w: 20, s: 92 }, { k: 'Community signal', w: 15, s: 80 }],
    homeStory: [], references: [], timeline: [], cover: '',
  },
  {
    id: 'tolu',
    name: 'T. Okafor',
    initials: 'TO',
    age: 38, hue: 200,
    role: 'Deputy Head Teacher · Cavendish School',
    moveIn: '10 Jun 2026',
    coTenant: { name: 'Ade Okafor', role: 'Partner · Nurse, NHS', hue: 40 },
    pets: 'None',
    smoker: false,
    location: 'Currently in Leyton, E10',
    applied: 'Fri at 17:45',
    match: 82, care: 80,
    income: { gross: 72000, net: 4200, ratio: 57 },
    ratioBand: 'tight',
    rtrStatus: 'verified', idStatus: 'verified', creditStatus: 'good', creditScore: 880,
    employmentStatus: 'verified',
    fitReasons: [],
    careBreakdown: [{ k: 'Landlord references', w: 40, s: 84 }, { k: 'Tenure stability', w: 25, s: 92 }, { k: 'Lease adherence', w: 20, s: 74 }, { k: 'Community signal', w: 15, s: 72 }],
    homeStory: [], references: [], timeline: [], cover: '',
  },
];

const getApplicant = (id) => APPLICANTS.find(a => a.id === id) || APPLICANTS[0];

// ─── Small helpers ──────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, sub, anchor }) => (
  <div id={anchor} style={{ marginBottom: 18, scrollMarginTop: 90 }}>
    {eyebrow && <div style={{ fontSize: 11, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 6 }}>{eyebrow}</div>}
    <div className="display" style={{ fontSize: 26, lineHeight: 1.1 }}>{title}</div>
    {sub && <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 6, maxWidth: 620 }}>{sub}</div>}
  </div>
);

const VerifiedChip = ({ label = 'Verified' }) => (
  <span className="chip" style={{ background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', border: 'none', height: 24, fontSize: 11, gap: 4 }}>
    <Icon name="check" size={10} stroke={3}/> {label}
  </span>
);

const Card = ({ children, style = {} }) => (
  <div style={{ padding: 24, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', ...style }}>{children}</div>
);

const StarRow = ({ n = 5 }) => (
  <div style={{ display: 'flex', gap: 2 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill={i < n ? 'oklch(0.75 0.15 70)' : 'var(--line)'}>
        <path d="M10 1l2.6 6.2 6.7.6-5.1 4.5 1.5 6.5L10 15.5 4.3 18.8l1.5-6.5L0.7 7.8l6.7-.6z"/>
      </svg>
    ))}
  </div>
);

// ====================================================================
// 1. LANDLORD APPLICANT PROFILE
// ====================================================================
const LandlordApplicantProfile = () => {
  const { route, go } = useNav();
  const id = route.split('/').pop();
  const a = getApplicant(id);
  const [activeSection, setActiveSection] = useLS('fit');
  const [shortlisted, setShortlisted] = useLS(false);

  const sections = [
    { id: 'fit',       label: 'Why they fit',      i: 'sparkles' },
    { id: 'identity',  label: 'Identity & checks', i: 'shield' },
    { id: 'care',      label: 'Care Score',        i: 'spark' },
    { id: 'home',      label: 'Home Story',        i: 'home' },
    { id: 'refs',      label: 'References',        i: 'users' },
    { id: 'afford',    label: 'Affordability',     i: 'pound' },
    { id: 'household', label: 'Household',         i: 'user' },
    { id: 'timeline',  label: 'Timeline',          i: 'clock' },
    { id: 'cover',     label: 'Cover letter',      i: 'message' },
  ];

  // Scroll-spy
  useLE(() => {
    const onScroll = () => {
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top < 200 && r.bottom > 200) { setActiveSection(s.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []); // eslint-disable-line

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Top breadcrumb */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(252,250,246,0.88)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 36px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <BackButton variant="ghost" label="All applicants" fallback="/app/landlord/applicants"/>
          <span style={{ color: 'var(--line-2)' }}>/</span>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>12 Harlow Mews · 9 applicants</div>
          <div style={{ flex: 1 }}/>
          <button className="btn btn-ghost btn-sm" onClick={() => go('/app/landlord/compare')}>
            <Icon name="users" size={13}/> Compare applicants
          </button>
          <button className="btn btn-ghost btn-sm"><Icon name="chevLeft" size={13}/> Prev</button>
          <button className="btn btn-ghost btn-sm">Next <Icon name="chevRight" size={13}/></button>
        </div>
      </div>

      {/* Hero + sidebar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px 60px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 28 }}>

        {/* ──────────────── Main column ──────────────── */}
        <div style={{ minWidth: 0 }}>
          {/* Hero card */}
          <div style={{ padding: 24, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 280, height: 280, background: `radial-gradient(circle at top right, oklch(0.95 0.04 ${a.hue}), transparent 70%)`, pointerEvents: 'none' }}/>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 20, position: 'relative' }}>
              <Avatar name={a.name} size={84} hue={a.hue}/>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <VerifiedChip/>
                  <span className="chip" style={{ background: 'var(--coral-100)', color: 'var(--coral-800)', border: 'none', height: 22, fontSize: 10, padding: '0 8px' }}>Top match · today</span>
                </div>
                <div className="display" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
                  {a.name}{a.coTenant && <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}> & {a.coTenant.name.split(' ')[0]}</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>{a.age} · {a.role}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{a.location} · Applied {a.applied}</div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                  <span className="chip chip-coral" style={{ height: 24, fontSize: 11 }}>Move-in {a.moveIn}</span>
                  <span className="chip chip-coral" style={{ height: 24, fontSize: 11 }}>12 mo rolling</span>
                  <span className="chip chip-coral" style={{ height: 24, fontSize: 11 }}>{a.pets}</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Ring value={a.match} size={104} label="match" color="coral" thickness={14}/>
              </div>
            </div>
          </div>

          {/* Section: FIT */}
          <SectionHeader anchor="fit" eyebrow="Why they fit your home" title={<>Strong match on every<br/>criterion that matters to you.</>} sub={`GoodLet compared your listing rules, your tenant preferences and ${a.name.split(' ')[0]}'s verified profile.`}/>
          <Card style={{ marginBottom: 40, padding: 0, overflow: 'hidden' }}>
            {a.fitReasons.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 20, borderBottom: i < a.fitReasons.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={f.i} size={17} stroke={2.2}/>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.55 }}>{f.s}</div>
                </div>
              </div>
            ))}
          </Card>

          {/* Section: IDENTITY */}
          <SectionHeader anchor="identity" eyebrow="Identity & statutory checks" title="Everything verified by GoodLet." sub="All checks passed. Full evidence on file, ready to share with your agent if you instruct one."/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
            {[
              { i: 'user',   l: 'Photo ID',            v: 'UK Passport · Liveness match', status: 'verified', sub: 'Onfido · 3 Mar 2026' },
              { i: 'key',    l: 'Right to Rent',       v: 'British citizen · no expiry',  status: 'verified', sub: 'Share Code attached' },
              { i: 'briefcase', l: 'Employment',       v: a.role, status: 'verified', sub: 'Monzo HR · signed letter' },
              { i: 'pound',  l: 'Income',              v: `£${a.income.net.toLocaleString()} net / mo`,  status: 'verified', sub: '3 months of payslips + Open Banking' },
              { i: 'shield', l: 'Credit',              v: `${a.creditScore} · ${a.creditStatus}`, status: 'verified', sub: 'Equifax · no CCJs, no late payments' },
              { i: 'home',   l: 'Address history',     v: '3 addresses, 9 years', status: 'verified', sub: 'No gaps' },
            ].map((c, i) => (
              <div key={i} style={{ padding: 18, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', display: 'flex', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name={c.i} size={16}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{c.l}</div>
                    <VerifiedChip/>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{c.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section: CARE SCORE */}
          <SectionHeader anchor="care" eyebrow="Care Score breakdown" title={<>{a.care} out of 100.<br/>Top 5% in Hackney.</>} sub="The score is weighted across four signals. Each one is backed by verified evidence, not self-reported."/>
          <Card style={{ marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Ring value={a.care} size={160} color="coral" thickness={22}/>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 12 }}>vs 71 median in Hackney</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {a.careBreakdown.map((c, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ fontSize: 13 }}>
                        {c.k} <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>· {c.w}% weight</span>
                      </div>
                      <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--coral-700)' }}>{c.s}</div>
                    </div>
                    <div style={{ height: 8, background: 'var(--cream-2)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${c.s}%`, height: '100%', background: 'linear-gradient(90deg, var(--coral-400), var(--coral-600))', borderRadius: 99 }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section: HOME STORY */}
          <SectionHeader anchor="home" eyebrow="Home Story" title="Three homes, kept well." sub="Photographs and notes from every home they've rented. Uploaded by the tenant, endorsed by past landlords."/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
            {a.homeStory.map((h, i) => (
              <div key={i} style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                <PhImg h={150} hue={h.hue} label={h.title} style={{ border: 'none', borderRadius: 0 }}/>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{h.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{h.years}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{h.note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Section: REFERENCES */}
          <SectionHeader anchor="refs" eyebrow="References from past landlords" title={`${a.references.length} verified landlords. Every one five stars.`} sub="Each reference was sent privately, signed by a verified landlord, and only published with the tenant's permission."/>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
            {a.references.map((r, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Avatar name={r.who} size={48} hue={r.hue}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{r.who}</div>
                      <VerifiedChip/>
                      <div style={{ flex: 1 }}/>
                      <StarRow n={r.stars}/>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{r.role} · {r.years}</div>
                    <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.6, fontStyle: 'italic' }}>{r.quote}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Section: AFFORDABILITY */}
          <SectionHeader anchor="afford" eyebrow="Affordability" title="Rent is 49% of net income." sub="Open Banking data over the last 3 months. Tenant consented to a one-time read."/>
          <Card style={{ marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net monthly income</div>
                <div className="display" style={{ fontSize: 36, marginTop: 6 }}>£{a.income.net.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Verified · Open Banking</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Your rent</div>
                <div className="display" style={{ fontSize: 36, marginTop: 6 }}>£2,400</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>12 Harlow Mews</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ratio</div>
                <div className="display" style={{ fontSize: 36, marginTop: 6, color: a.ratioBand === 'ok' ? 'var(--ok)' : 'oklch(0.60 0.14 50)' }}>{a.income.ratio}%</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Inside your 55% ceiling</div>
              </div>
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 10 }}>3-month inflow, £'000s</div>
              <div style={{ display: 'flex', gap: 10, height: 70, alignItems: 'flex-end' }}>
                {[4.8, 4.9, 4.85, 4.82, 4.88, 4.85, 4.9, 4.86, 4.85, 4.88, 4.82, 4.9].map((v, i) => (
                  <div key={i} style={{ flex: 1, height: `${(v / 5) * 100}%`, background: i === 11 ? 'var(--coral-500)' : 'var(--coral-200)', borderRadius: 4 }}/>
                ))}
              </div>
            </div>
          </Card>

          {/* Section: HOUSEHOLD */}
          <SectionHeader anchor="household" eyebrow="Household" title="Who's actually moving in." sub=""/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 40 }}>
            <Card style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Avatar name={a.name} size={52} hue={a.hue}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Lead tenant · {a.age} · {a.role.split(' · ')[0]}</div>
                <div style={{ marginTop: 6 }}><VerifiedChip/></div>
              </div>
            </Card>
            {a.coTenant && (
              <Card style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <Avatar name={a.coTenant.name} size={52} hue={a.coTenant.hue}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{a.coTenant.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{a.coTenant.role}</div>
                  <div style={{ marginTop: 6 }}><VerifiedChip/></div>
                </div>
              </Card>
            )}
            <Card>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Pets</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{a.pets}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Within your property rules.</div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Smoking</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4, color: 'var(--ok)' }}>Non-smoker</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Household-wide.</div>
            </Card>
          </div>

          {/* Section: TIMELINE */}
          <SectionHeader anchor="timeline" eyebrow="Tenancy timeline" title="Nine years, zero gaps." sub=""/>
          <Card style={{ marginBottom: 40 }}>
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 2, background: 'var(--line)' }}/>
              {a.timeline.map((t, i) => (
                <div key={i} style={{ position: 'relative', paddingBottom: i < a.timeline.length - 1 ? 22 : 0 }}>
                  <div style={{
                    position: 'absolute', left: -28, top: 0, width: 22, height: 22, borderRadius: 99,
                    background: t.kind === 'current' ? 'var(--coral-500)' : 'white',
                    border: t.kind === 'current' ? 'none' : '2px solid var(--line-2)',
                    display: 'grid', placeItems: 'center',
                    color: t.kind === 'current' ? 'white' : 'var(--ink-3)',
                    boxShadow: t.kind === 'current' ? '0 0 0 5px var(--coral-100)' : 'none',
                  }}>
                    <Icon name={t.kind === 'milestone' ? 'star' : t.kind === 'current' ? 'sparkles' : 'home'} size={10} stroke={3}/>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.year}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{t.event}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section: COVER LETTER */}
          <SectionHeader anchor="cover" eyebrow="Cover letter" title={`A note from ${a.name.split(' ')[0]}.`} sub=""/>
          <Card style={{ marginBottom: 40, padding: 0 }}>
            <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--ink-3)' }}>
              <Avatar name={a.name} size={24} hue={a.hue}/>
              <span>{a.name}</span>
              <span>·</span>
              <span>Written by hand, not AI-generated</span>
            </div>
            <div style={{ padding: 24, fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-display)' }}>
              {a.cover}
            </div>
          </Card>
        </div>

        {/* ──────────────── Sticky sidebar ──────────────── */}
        <aside style={{ position: 'sticky', top: 70, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Action rail */}
          <div style={{ padding: 20, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 14 }}>Your decision</div>
            <button
              onClick={() => go('/app/landlord/offer/' + a.id)}
              className="btn btn-coral"
              style={{ width: '100%', height: 52, justifyContent: 'center', fontSize: 15, marginBottom: 10 }}>
              <Icon name="key" size={16}/> Offer tenancy
            </button>
            <button
              onClick={() => setShortlisted(!shortlisted)}
              className="btn btn-primary"
              style={{ width: '100%', height: 44, justifyContent: 'center', marginBottom: 8, background: shortlisted ? 'var(--ok)' : undefined }}>
              <Icon name={shortlisted ? 'check' : 'bookmark'} size={14}/> {shortlisted ? 'Shortlisted' : 'Add to shortlist'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}><Icon name="calendar" size={13}/> Book viewing</button>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}><Icon name="message" size={13}/> Message</button>
            </div>
            <button style={{ width: '100%', textAlign: 'center', padding: '12px 0 2px', fontSize: 12, color: 'var(--ink-3)', marginTop: 8 }}>
              Decline with reason →
            </button>
          </div>

          {/* Jump-to */}
          <div style={{ padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, padding: '4px 8px 10px' }}>Jump to</div>
            {sections.map(s => (
              <button key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 10px', borderRadius: 8, marginBottom: 2,
                  fontSize: 13,
                  color: activeSection === s.id ? 'var(--coral-800)' : 'var(--ink-2)',
                  background: activeSection === s.id ? 'var(--coral-50)' : 'transparent',
                  fontWeight: activeSection === s.id ? 600 : 400,
                }}>
                <Icon name={s.i} size={13} style={{ color: activeSection === s.id ? 'var(--coral-600)' : 'var(--ink-3)' }}/>
                {s.label}
              </button>
            ))}
          </div>

          {/* Context: other applicants */}
          <div style={{ padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: 10 }}>Other candidates</div>
            {APPLICANTS.filter(x => x.id !== a.id).map((x, i) => (
              <button key={x.id} onClick={() => go('/app/landlord/applicant/' + x.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', borderBottom: i === 0 ? '1px solid var(--line)' : 'none', textAlign: 'left' }}>
                <Avatar name={x.name} size={32} hue={x.hue}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{x.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Match {x.match} · Care {x.care}</div>
                </div>
                <Icon name="chevRight" size={12} style={{ color: 'var(--ink-3)' }}/>
              </button>
            ))}
            <button onClick={() => go('/app/landlord/compare')} style={{ marginTop: 10, width: '100%', padding: 10, border: '1px dashed var(--line-2)', borderRadius: 10, fontSize: 12, color: 'var(--coral-700)', fontWeight: 500 }}>
              Compare all side-by-side →
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

Object.assign(window, { LandlordApplicantProfile, APPLICANTS, getApplicant, VerifiedChip, StarRow, Card, SectionHeader });
