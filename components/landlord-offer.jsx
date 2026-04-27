/* global React, Icon, Avatar, Ring, PhImg, useNav, BackButton, APPLICANTS, getApplicant, Card, VerifiedChip */
const { useState: useOS, useMemo: useOM } = React;

/* ====================================================================
   Landlord Offer Flow — /app/landlord/offer/:id

   Philosophy: this is the warm, decisive moment. It should feel less
   like a form and more like extending a hand. Four steps, a clear
   summary rail on the right, and a celebration at the end.

   Steps
   1) Terms      — rent, term, start date, deposit type
   2) House      — rules + small things that matter to this landlord
   3) Review     — single-page letter preview + confirmation
   4) Sent       — celebratory state + what happens next timeline
   ==================================================================== */

const OFFER_STEPS = [
  { id: 'terms',  n: 1, label: 'Terms',  sub: 'Rent, term & deposit' },
  { id: 'house',  n: 2, label: 'House',  sub: 'Rules & clauses' },
  { id: 'review', n: 3, label: 'Review', sub: 'The letter' },
  { id: 'sent',   n: 4, label: 'Sent',   sub: 'Celebrate' },
];

const LandlordOfferFlow = () => {
  const { route, go } = useNav();
  const id = route.split('/').pop();
  const a = getApplicant(id);

  const [step, setStep]   = useOS(0);
  const [rent, setRent]   = useOS(2400);
  const [term, setTerm]   = useOS(12);
  const [start, setStart] = useOS('1 May 2026');
  const [deposit, setDeposit] = useOS('5wk');
  const [rules, setRules] = useOS({
    pets: true,
    smoking: false,
    guests: true,
    redecorate: true,
  });
  const [personalNote, setPersonalNote] = useOS(
    `Hi ${a.name.split(' ')[0]},\n\nSam and I would love to have you as our tenants. Your cover letter won us over — and the references confirmed everything.\n\nThe apple tree is at its best in May. Welcome home.\n\nPriya`
  );

  const stepData = OFFER_STEPS[step];

  const next = () => setStep(s => Math.min(OFFER_STEPS.length - 1, s + 1));
  const back = () => step === 0 ? go('/app/landlord/applicant/' + a.id) : setStep(s => s - 1);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* ── Top bar ─────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(252,250,246,0.92)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 36px', display: 'flex', alignItems: 'center', gap: 20 }}>
          {step === 0 ? (
            <BackButton variant="ghost" label={`${a.name.split(' ')[0]}'s profile`} fallback={'/app/landlord/applicant/' + a.id}/>
          ) : (
            <button onClick={() => setStep(s => s - 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Previous step
            </button>
          )}

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginLeft: 'auto' }}>
            {OFFER_STEPS.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  height: 4, width: i <= step ? 48 : 28,
                  borderRadius: 99,
                  background: i <= step ? 'var(--coral-500)' : 'var(--line)',
                  transition: 'all .3s ease',
                }}/>
                {i < OFFER_STEPS.length - 1 && <div style={{ width: 4 }}/>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Step {step + 1}/{OFFER_STEPS.length}</div>
        </div>
      </div>

      {/* ── Celebration takes over the whole page at sent ── */}
      {step === 3 ? (
        <OfferSent a={a} rent={rent} term={term} start={start} />
      ) : (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 36px 80px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
              Offer tenancy · {a.name}
            </div>
            <div className="display" style={{ fontSize: 46, lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 6 }}>
              {step === 0 && <>Let's make {a.name.split(' ')[0]}<br/>an offer.</>}
              {step === 1 && <>A few little things<br/>about your home.</>}
              {step === 2 && <>Here's what<br/>{a.name.split(' ')[0]} will see.</>}
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 12, maxWidth: 560, lineHeight: 1.55 }}>
              {step === 0 && `These terms become the basis of the tenancy agreement. You can still negotiate before signing — nothing is final until both parties accept.`}
              {step === 1 && `Mention the things you'd want a tenant to know from day one. These become clauses in the agreement.`}
              {step === 2 && `Review the offer letter. Add a personal note — ${a.name.split(' ')[0]} will see it exactly as written.`}
            </p>

            <div style={{ marginTop: 36 }}>
              {step === 0 && <StepTerms rent={rent} setRent={setRent} term={term} setTerm={setTerm} start={start} setStart={setStart} deposit={deposit} setDeposit={setDeposit} />}
              {step === 1 && <StepHouse rules={rules} setRules={setRules} />}
              {step === 2 && <StepReview a={a} rent={rent} term={term} start={start} deposit={deposit} rules={rules} personalNote={personalNote} setPersonalNote={setPersonalNote} />}
            </div>

            {/* Step nav */}
            <div style={{ display: 'flex', gap: 12, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <button onClick={back} className="btn btn-ghost">
                <Icon name="chevLeft" size={14}/> {step === 0 ? 'Cancel' : 'Back'}
              </button>
              <div style={{ flex: 1 }}/>
              {step < 2 && (
                <button onClick={next} className="btn btn-coral">
                  Continue <Icon name="chevRight" size={14}/>
                </button>
              )}
              {step === 2 && (
                <button onClick={next} className="btn btn-coral" style={{ fontSize: 15, padding: '0 22px', height: 48 }}>
                  <Icon name="envelope" size={15}/> Send offer to {a.name.split(' ')[0]}
                </button>
              )}
            </div>
          </div>

          {/* ── Sticky summary rail ───────────────────── */}
          <aside style={{ position: 'sticky', top: 70, alignSelf: 'flex-start' }}>
            <OfferSummary a={a} rent={rent} term={term} start={start} deposit={deposit} rules={rules} step={step} />
          </aside>
        </div>
      )}
    </div>
  );
};

// ─── Step 1 · Terms ────────────────────────────────────────
const StepTerms = ({ rent, setRent, term, setTerm, start, setStart, deposit, setDeposit }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

    {/* Rent */}
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Monthly rent</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Market rate in your area: £2,350–£2,450</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
        <div style={{ fontSize: 48, fontFamily: 'var(--font-display)', lineHeight: 1 }}>£{rent.toLocaleString()}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>per calendar month</div>
      </div>
      <input type="range" min="2000" max="2800" step="10" value={rent} onChange={e => setRent(+e.target.value)}
             style={{ width: '100%', marginTop: 20, accentColor: 'var(--coral-500)' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
        <span>£2,000</span><span>Asking £2,400</span><span>£2,800</span>
      </div>
      <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--coral-50)', borderRadius: 10, fontSize: 12, color: 'var(--coral-800)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Icon name="sparkles" size={13}/>
        <span>At £{rent.toLocaleString()}, rent is {((rent / 4850) * 100).toFixed(0)}% of Ayo's net income — within your comfort range.</span>
      </div>
    </Card>

    {/* Term & start */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Term</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          {[6, 12, 18, 24].map(t => (
            <button key={t} onClick={() => setTerm(t)}
              style={{
                flex: 1, minWidth: 60, padding: '12px 0',
                fontSize: 14, fontWeight: 500,
                borderRadius: 10,
                border: '1px solid ' + (term === t ? 'var(--coral-500)' : 'var(--line)'),
                background: term === t ? 'var(--coral-50)' : 'white',
                color: term === t ? 'var(--coral-800)' : 'var(--ink-2)',
              }}>
              {t} mo
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>Rolling break clause after month 6</div>
      </Card>

      <Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Start date</div>
        <div style={{ fontSize: 24, fontFamily: 'var(--font-display)', marginTop: 10 }}>{start}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {['1 May 2026', '15 May 2026', '1 Jun 2026'].map(d => (
            <button key={d} onClick={() => setStart(d)}
                    className="chip" style={{ fontSize: 11, background: start === d ? 'var(--coral-500)' : 'white', color: start === d ? 'white' : 'var(--ink-2)', border: start === d ? 'none' : '1px solid var(--line)' }}>
              {d.replace(' 2026', '')}
            </button>
          ))}
        </div>
      </Card>
    </div>

    {/* Deposit */}
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Deposit</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Protected in an authorised scheme</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { id: '5wk',    l: '5 weeks rent',  v: `£${Math.round(rent * 12 / 52 * 5).toLocaleString()}`, note: 'Standard, legally capped' },
          { id: 'zero',   l: 'Zero deposit',  v: '£0',                                 note: 'Insurance in lieu' },
          { id: 'custom', l: 'Custom',        v: '£2,000',                             note: 'Set your own' },
        ].map(o => (
          <button key={o.id} onClick={() => setDeposit(o.id)}
            style={{
              padding: 16, textAlign: 'left', borderRadius: 12,
              border: '1px solid ' + (deposit === o.id ? 'var(--coral-500)' : 'var(--line)'),
              background: deposit === o.id ? 'var(--coral-50)' : 'white',
              position: 'relative',
            }}>
            {deposit === o.id && <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: 99, background: 'var(--coral-500)', color: 'white', display: 'grid', placeItems: 'center' }}><Icon name="check" size={10} stroke={3}/></div>}
            <div style={{ fontSize: 13, fontWeight: 600 }}>{o.l}</div>
            <div style={{ fontSize: 20, fontFamily: 'var(--font-display)', marginTop: 4 }}>{o.v}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{o.note}</div>
          </button>
        ))}
      </div>
    </Card>
  </div>
);

// ─── Step 2 · House rules ──────────────────────────────────
const StepHouse = ({ rules, setRules }) => {
  const toggle = k => setRules(r => ({ ...r, [k]: !r[k] }));
  const items = [
    { k: 'pets',      i: 'heart',  l: 'Pets welcome',                 s: 'You allow one cat. Mochi is covered.' },
    { k: 'smoking',   i: 'flame',  l: 'Smoking allowed',              s: 'Tick on to allow indoors. Off = no smoking.' },
    { k: 'guests',    i: 'users',  l: 'Overnight guests fine',        s: 'Up to 14 nights per quarter, no registration.' },
    { k: 'redecorate',i: 'paint',  l: 'Redecorate with permission',   s: 'Repainting, shelving, pictures — you\'ll say yes.' },
  ];

  const extras = [
    { i: 'wrench', l: 'Boiler service', s: 'Annual gas safety check — I\'ll arrange, you cover.' },
    { i: 'leaf',   l: 'Garden & apple tree', s: 'Light maintenance included. I prune the apple tree each spring.' },
    { i: 'key',    l: 'One set of spare keys', s: 'With the neighbour next door (Mrs. Ali, lovely).' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 14 }}>House rules</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {items.map((it, i) => (
            <div key={it.k} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: rules[it.k] ? 'var(--coral-100)' : 'var(--cream-2)', color: rules[it.k] ? 'var(--coral-700)' : 'var(--ink-3)', display: 'grid', placeItems: 'center' }}>
                <Icon name={it.i} size={16}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{it.l}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{it.s}</div>
              </div>
              <button onClick={() => toggle(it.k)}
                style={{ width: 42, height: 24, borderRadius: 99, background: rules[it.k] ? 'var(--coral-500)' : 'var(--line-2)', position: 'relative', transition: 'background .2s' }}>
                <span style={{ position: 'absolute', top: 3, left: rules[it.k] ? 21 : 3, width: 18, height: 18, borderRadius: 99, background: 'white', transition: 'left .2s', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}/>
              </button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 14 }}>Little things that matter</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {extras.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--cream-2)', color: 'var(--ink-2)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={e.i} size={14}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{e.l}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{e.s}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}>
          <Icon name="plus" size={12}/> Add another
        </button>
      </Card>
    </div>
  );
};

// ─── Step 3 · Review (letter preview + personal note) ───────
const StepReview = ({ a, rent, term, start, deposit, rules, personalNote, setPersonalNote }) => {
  const depositAmt = deposit === 'zero' ? '£0 (insurance)' : deposit === '5wk' ? `£${Math.round(rent * 12 / 52 * 5).toLocaleString()} (5 weeks)` : '£2,000';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Personal note */}
      <Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, marginBottom: 10 }}>Your personal note</div>
        <textarea value={personalNote} onChange={e => setPersonalNote(e.target.value)}
                  style={{ width: '100%', minHeight: 120, resize: 'vertical', fontFamily: 'var(--font-display)', fontSize: 16, lineHeight: 1.55, padding: 14, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--cream-2)', color: 'var(--ink)' }}/>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>Written by you, not templated. {a.name.split(' ')[0]} will see this at the top of the offer.</div>
      </Card>

      {/* Letter preview */}
      <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 28px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--cream-2)', fontSize: 12, color: 'var(--ink-3)' }}>
          <Icon name="envelope" size={14}/>
          <span>Preview — offer letter {a.name.split(' ')[0]} will receive</span>
        </div>
        <div style={{ padding: '36px 44px', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tenancy offer</div>
          <div style={{ fontSize: 32, lineHeight: 1.15, marginTop: 8, letterSpacing: '-0.01em' }}>
            {a.name}, we'd like to offer you<br/>12 Harlow Mews, Hackney.
          </div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 18, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{personalNote}</div>
          <div style={{ height: 1, background: 'var(--line)', margin: '28px 0' }}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, fontFamily: 'var(--font-sans, sans-serif)' }}>
            {[
              { l: 'Rent',        v: `£${rent.toLocaleString()} per month` },
              { l: 'Term',        v: `${term} months rolling` },
              { l: 'Start',       v: start },
              { l: 'Deposit',     v: depositAmt },
              { l: 'Pets',        v: rules.pets ? 'One cat welcome' : 'Not included' },
              { l: 'Redecorate',  v: rules.redecorate ? 'Yes, with prior ok' : 'Not permitted' },
            ].map((r, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.l}</div>
                <div style={{ fontSize: 15, marginTop: 3, color: 'var(--ink)' }}>{r.v}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--line)', margin: '28px 0' }}/>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-sans, sans-serif)', lineHeight: 1.6 }}>
            This offer is issued via GoodLet. On acceptance, the full AST will be prepared automatically using your verified identity, Right to Rent, and employment checks — no re-entry needed.
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginTop: 28 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', fontStyle: 'italic' }}>Priya Desai</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>Landlord · 12 Harlow Mews</div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>GL-OFFER-AYO-26-0428</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Summary rail (steps 0-2) ──────────────────────────────
const OfferSummary = ({ a, rent, term, start, deposit, rules, step }) => {
  const depositAmt = deposit === 'zero' ? '£0' : deposit === '5wk' ? `£${Math.round(rent * 12 / 52 * 5).toLocaleString()}` : '£2,000';
  const rows = [
    { l: 'Applicant',    v: a.name,                  visible: true },
    { l: 'Property',     v: '12 Harlow Mews',        visible: true },
    { l: 'Rent',         v: `£${rent.toLocaleString()}/mo`, visible: step >= 0 },
    { l: 'Term',         v: `${term} months`,        visible: step >= 0 },
    { l: 'Start',        v: start,                   visible: step >= 0 },
    { l: 'Deposit',      v: depositAmt,              visible: step >= 0 },
    { l: 'Pets',         v: rules.pets ? '1 cat ok' : 'None', visible: step >= 1 },
    { l: 'Smoking',      v: rules.smoking ? 'Allowed' : 'No', visible: step >= 1 },
  ];

  return (
    <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
      {/* Property hero */}
      <div style={{ position: 'relative' }}>
        <PhImg h={120} hue={30} label="12 Harlow Mews" style={{ border: 'none', borderRadius: 0 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, oklch(0.25 0.05 30 / 0.6), transparent 60%)' }}/>
        <div style={{ position: 'absolute', bottom: 12, left: 16, color: 'white' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.9 }}>Offer summary</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>12 Harlow Mews</div>
        </div>
      </div>

      {/* Applicant chip */}
      <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--line)' }}>
        <Avatar name={a.name} size={42} hue={a.hue}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Match {a.match} · Care {a.care}</div>
        </div>
        <VerifiedChip label=""/>
      </div>

      {/* Terms list */}
      <div style={{ padding: '8px 0' }}>
        {rows.filter(r => r.visible).map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', fontSize: 13 }}>
            <div style={{ color: 'var(--ink-3)' }}>{r.l}</div>
            <div style={{ color: 'var(--ink)', fontWeight: 500 }}>{r.v}</div>
          </div>
        ))}
      </div>

      {/* Total annual value */}
      <div style={{ padding: 16, background: 'var(--coral-50)', borderTop: '1px solid var(--line)' }}>
        <div style={{ fontSize: 11, color: 'var(--coral-700)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Annual rental value</div>
        <div className="display" style={{ fontSize: 26, color: 'var(--coral-800)', marginTop: 2 }}>£{(rent * 12).toLocaleString()}</div>
      </div>
    </div>
  );
};

// ─── Step 4 · Sent (celebration) ───────────────────────────
const OfferSent = ({ a, rent, term, start }) => {
  const { go } = useNav();
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 36px 80px', textAlign: 'center' }}>
      {/* Confetti dots */}
      <div style={{ position: 'relative', height: 140, marginBottom: 8 }}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{
            width: 120, height: 120, borderRadius: 99,
            background: 'linear-gradient(135deg, var(--coral-400), var(--coral-600))',
            display: 'grid', placeItems: 'center', color: 'white',
            boxShadow: '0 20px 40px -10px oklch(0.55 0.17 30 / 0.4)',
          }}>
            <Icon name="envelope" size={56} stroke={1.5}/>
          </div>
        </div>
        {/* dots */}
        {[
          { t: 10, l: '18%', h: 30 }, { t: 28, l: '82%', h: 50 }, { t: 60, l: '8%', h: 180 },
          { t: 85, l: '90%', h: 200 }, { t: 0, l: '50%', h: 70 }, { t: 105, l: '30%', h: 120 },
          { t: 115, l: '72%', h: 20 },
        ].map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: d.t, left: d.l, width: 10, height: 10, borderRadius: 99, background: `oklch(0.78 0.15 ${d.h})` }}/>
        ))}
      </div>

      <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Offer sent</div>
      <div className="display" style={{ fontSize: 54, lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 10 }}>
        On its way to {a.name.split(' ')[0]}.
      </div>
      <p style={{ fontSize: 17, color: 'var(--ink-2)', maxWidth: 560, margin: '16px auto 0', lineHeight: 1.55 }}>
        You'll get a notification when {a.name.split(' ')[0]} responds. Most offers are accepted within 24 hours — GoodLet keeps everything moving.
      </p>

      {/* What happens next timeline */}
      <div style={{ marginTop: 48, textAlign: 'left', background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 28px', borderBottom: '1px solid var(--line)', fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
          What happens next
        </div>
        {[
          { i: 'envelope', l: `${a.name.split(' ')[0]} receives the offer`, s: 'Right now · by push + email', state: 'done' },
          { i: 'check',    l: 'They accept or counter',                     s: 'Usually within 12–24 hours',   state: 'active' },
          { i: 'doc',      l: 'AST generated & e-signed',                   s: 'Auto-filled with verified details — both parties sign',        state: 'pending' },
          { i: 'pound',    l: 'Deposit protected',                          s: 'GoodLet lodges with DPS, certificate issued to both of you', state: 'pending' },
          { i: 'key',      l: `Keys to ${a.name.split(' ')[0]} on ${start}`,s: 'We send a digital check-in guide the night before', state: 'pending' },
        ].map((t, i, arr) => (
          <div key={i} style={{ padding: '18px 28px', display: 'flex', gap: 16, borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: t.state === 'done' ? 'var(--coral-500)' : t.state === 'active' ? 'var(--coral-100)' : 'var(--cream-2)',
              color: t.state === 'done' ? 'white' : t.state === 'active' ? 'var(--coral-700)' : 'var(--ink-3)',
              display: 'grid', placeItems: 'center',
              boxShadow: t.state === 'active' ? '0 0 0 4px var(--coral-50)' : 'none',
            }}>
              <Icon name={t.state === 'done' ? 'check' : t.i} size={15} stroke={t.state === 'done' ? 3 : 1.75}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.state === 'pending' ? 'var(--ink-3)' : 'var(--ink)' }}>{t.l}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{t.s}</div>
            </div>
            {t.state === 'active' && <div style={{ fontSize: 11, color: 'var(--coral-700)', fontWeight: 500, alignSelf: 'center' }}>In progress</div>}
          </div>
        ))}
      </div>

      {/* Summary line */}
      <div style={{ marginTop: 30, padding: '16px 20px', background: 'white', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left' }}>
        <Avatar name={a.name} size={44} hue={a.hue}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{a.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>£{rent.toLocaleString()}/mo · {term} months · from {start}</div>
        </div>
        <span className="chip chip-coral">Awaiting response</span>
      </div>

      {/* Next actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 30, justifyContent: 'center' }}>
        <button onClick={() => go('/app/landlord')} className="btn btn-coral">
          Back to dashboard
        </button>
        <button onClick={() => go('/app/landlord/applicants')} className="btn btn-ghost">
          See other applicants
        </button>
        <button className="btn btn-ghost">
          <Icon name="message" size={14}/> Message {a.name.split(' ')[0]}
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { LandlordOfferFlow });
