/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav, BackButton */
const { useState, useMemo, useEffect, useRef } = React;

/* ============================================================
   Tenant Application Journey — ApplyFlow
   Entry (listing | invite | match) → steps → submit → tracker.
   Desktop renders inside /app/tenant/apply/...
   Mobile variant is rendered below in an iPhone frame on /apply-mobile
   ============================================================ */

// ===== Demo property (shared fixture) =====
const DEMO_PROPERTY = {
  id: 'harlow-mews',
  title: '12 Harlow Mews',
  area: 'Hackney, E8 · London',
  price: 2400,
  deposit: 2769,
  available: '1 May',
  term: '12 months, rolling',
  beds: 2, baths: 1, sqft: 780,
  furnished: 'Unfurnished',
  landlord: 'Priya M.',
  landlordVerified: true,
  landlordDecisionMedian: '3 days',
  applicants: 12,
  shortlisted: 3,
  heroHue: 30,
  gallery: [
    { label: 'Living · morning light', hue: 30 },
    { label: 'Kitchen', hue: 45 },
    { label: 'Primary bedroom', hue: 20 },
    { label: 'Garden', hue: 140 },
  ],
  highlights: [
    'South-facing living room, original floors',
    'Shared garden, bikes welcome',
    'Council tax band C, EPC rating B',
    '8 min walk to Hackney Central Overground',
  ],
};

const TENANT = {
  name: 'Ayo Bankole',
  initials: 'AB',
  careScore: 82,
  hue: 30,
  verified: true,
  references: [
    { who: 'R. Khan', role: 'Current landlord', status: 'attached', since: '2024', rating: 5 },
    { who: 'Oakhouse Lettings', role: 'Previous landlord', status: 'attached', since: '2021–24', rating: 5 },
    { who: 'Jude O. (Employer)', role: 'Line manager · Monzo', status: 'attached', since: '2022', rating: null },
  ],
  docs: [
    { kind: 'Share Code (Right to Rent)', status: 'verified', detail: 'Valid until Aug 2028' },
    { kind: 'Payslips (last 3 months)', status: 'verified', detail: 'Auto-linked via Monzo' },
    { kind: 'Photo ID', status: 'verified', detail: 'UK passport' },
  ],
  income: { monthlyNet: 4850, source: 'Linked accounts · Monzo, HSBC' },
  whyYouFit: [
    'Your 3-year tenancy in Leeds mirrors the landlord\'s preference for longer stays.',
    'Deposit fully returned at your last two homes.',
    'Non-smoker, one friendly cat — matches the listing\'s pet policy.',
    'Budget sits at 49% of your verified net income.',
  ],
};

// ====================================================================
// Shared bits
// ====================================================================
const Progress = ({ step, total }) => {
  const pct = Math.min(100, ((step + 1) / total) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--cream-2)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--coral-400), var(--coral-600))', transition: 'width .4s ease' }}/>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
        Step {step + 1} / {total}
      </div>
    </div>
  );
};

const StepHead = ({ eyebrow, title, sub }) => (
  <div style={{ marginBottom: 28 }}>
    {eyebrow && <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>{eyebrow}</div>}
    <div className="display" style={{ fontSize: 40, marginTop: 6, lineHeight: 1.05 }}>{title}</div>
    {sub && <div style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 10, maxWidth: 640, lineHeight: 1.55 }}>{sub}</div>}
  </div>
);

const Row = ({ children, style = {} }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, ...style }}>{children}</div>
);

const Check = ({ on }) => (
  <span style={{
    width: 20, height: 20, borderRadius: 6,
    border: on ? 'none' : '1.5px solid var(--line-2)',
    background: on ? 'var(--ink)' : 'white',
    display: 'grid', placeItems: 'center', color: 'white', flexShrink: 0,
  }}>
    {on && <Icon name="check" size={12} stroke={3}/>}
  </span>
);

const Pill = ({ children, tone = 'ok' }) => {
  const map = {
    ok:    { bg: 'oklch(0.94 0.05 155)', fg: 'oklch(0.30 0.12 155)', dot: 'var(--ok)' },
    coral: { bg: 'var(--coral-100)', fg: 'var(--coral-800)', dot: 'var(--coral-600)' },
    warn:  { bg: 'oklch(0.96 0.05 75)',  fg: 'oklch(0.38 0.12 75)',  dot: 'var(--warn)' },
    ink:   { bg: 'var(--ink)', fg: 'var(--cream)', dot: 'var(--cream)' },
  }[tone];
  return (
    <span className="chip" style={{ background: map.bg, color: map.fg, border: 'none', fontWeight: 500 }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: map.dot }}/>
      {children}
    </span>
  );
};

// ====================================================================
// ENTRY SCREENS — 3 variations that all converge on beginFlow()
// ====================================================================

// --- Entry: LISTING DETAIL ---
const EntryListing = ({ onApply, onNew }) => {
  const p = DEMO_PROPERTY;
  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px 36px 60px' }}>
      {/* Back + Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
        <BackButton label="Search" fallback="/app/tenant/search"/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-3)' }}>
          <span>Hackney, E8</span>
          <Icon name="chevRight" size={12}/>
          <span style={{ color: 'var(--ink)' }}>{p.title}</span>
        </div>
      </div>

      {/* Hero gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, height: 420, marginBottom: 28 }}>
        <PhImg h="100%" hue={p.heroHue} label={p.gallery[0].label} style={{ gridRow: '1 / 3' }}/>
        <PhImg h="100%" hue={p.gallery[1].hue} label={p.gallery[1].label}/>
        <PhImg h="100%" hue={p.gallery[2].hue} label={p.gallery[2].label}/>
        <PhImg h="100%" hue={p.gallery[1].hue} label="Kitchen detail" style={{ gridColumn: '2 / 4' }}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'start' }}>
        {/* Left: details */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
            <Pill tone="coral">Newly listed</Pill>
            <Pill tone="ok">Verified landlord</Pill>
            <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>· {p.applicants} applications so far</span>
          </div>
          <div className="display" style={{ fontSize: 52, lineHeight: 1 }}>{p.title}</div>
          <div style={{ fontSize: 17, color: 'var(--ink-2)', marginTop: 8 }}>{p.area}</div>

          <div style={{ display: 'flex', gap: 24, marginTop: 22, paddingBottom: 22, borderBottom: '1px solid var(--line)' }}>
            <div><div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rent</div><div className="display" style={{ fontSize: 30, marginTop: 4 }}>£{p.price.toLocaleString()}<span style={{ fontSize: 14, color: 'var(--ink-3)', fontFamily: 'var(--font-ui)' }}> / mo</span></div></div>
            <div style={{ width: 1, background: 'var(--line)' }}/>
            <div><div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bedrooms</div><div className="display" style={{ fontSize: 30, marginTop: 4 }}>{p.beds}</div></div>
            <div style={{ width: 1, background: 'var(--line)' }}/>
            <div><div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Available</div><div className="display" style={{ fontSize: 30, marginTop: 4 }}>{p.available}</div></div>
            <div style={{ width: 1, background: 'var(--line)' }}/>
            <div><div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Term</div><div style={{ fontSize: 15, marginTop: 10, color: 'var(--ink)' }}>{p.term}</div></div>
          </div>

          <h3 className="display" style={{ fontSize: 24, margin: '28px 0 14px' }}>About this home</h3>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 640 }}>
            A quiet, south-facing flat on a cobbled mews. Two proper double bedrooms, a working kitchen with a gas hob, and a shared garden with a well-tended apple tree. The current tenants are leaving for a move abroad and have kept it beautifully.
          </p>
          <ul style={{ marginTop: 14, listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {p.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 15, color: 'var(--ink-2)' }}>
                <Icon name="check" size={14} style={{ color: 'var(--coral-600)', marginTop: 4 }}/>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: sticky apply card */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div className="solid-card" style={{ padding: 22, border: '1px solid var(--coral-200)' }}>
            {/* Match score */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
              <Ring value={94} size={82} color="coral" thickness={11} label="Match"/>
              <div>
                <div style={{ fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>You're a strong fit</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.5 }}>
                  Based on your Care Score, budget, pet policy, and preferred tenancy length.
                </div>
              </div>
            </div>

            <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TENANT.whyYouFit.slice(0, 3).map((w, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
                  <Icon name="sparkles" size={13} style={{ color: 'var(--coral-600)', marginTop: 3 }}/>
                  {w}
                </li>
              ))}
            </ul>

            <button className="btn btn-coral btn-lg btn-block" style={{ marginTop: 18 }} onClick={onApply}>
              Apply to this home <Icon name="arrowRight" size={16}/>
            </button>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 10 }}>
              Takes about 3 minutes · References auto-attached
            </div>

            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--ink-3)' }}>Typical decision</span>
              <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{p.landlordDecisionMedian}</span>
            </div>
          </div>

          {/* First-timer fork */}
          <button onClick={onNew} style={{
            width: '100%', marginTop: 12, padding: '14px 16px',
            borderRadius: 'var(--r-md)',
            background: 'white', border: '1px dashed var(--line-2)',
            display: 'flex', gap: 12, alignItems: 'center', textAlign: 'left',
          }}>
            <Icon name="user" size={16} style={{ color: 'var(--ink-3)' }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500 }}>New to GoodLet?</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>We'll build your profile as you apply.</div>
            </div>
            <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }}/>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Entry: LANDLORD INVITE ---
const EntryInvite = ({ onApply }) => {
  const p = DEMO_PROPERTY;
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 36px 60px' }}>
      <div style={{ marginBottom: 18 }}>
        <BackButton label="Inbox" fallback="/app/tenant/inbox"/>
      </div>
      <div className="solid-card" style={{
        padding: 40,
        background: `linear-gradient(135deg, var(--coral-50), white)`,
        border: '1px solid var(--coral-200)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <Avatar name={p.landlord} size={44} hue={140}/>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Invitation from</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{p.landlord} <span style={{ fontSize: 12, color: 'var(--ok)', fontWeight: 400, marginLeft: 4 }}>✓ Verified</span></div>
          </div>
        </div>

        <div className="display" style={{ fontSize: 48, lineHeight: 1.05 }}>
          You're invited to apply for {p.title}.
        </div>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 16 }}>
          Priya saw your Home Story and thought you'd be a great fit for the mews. She's opened the application to you — no queue.
        </p>

        {/* Personal note */}
        <div style={{ marginTop: 24, padding: 20, background: 'white', borderRadius: 'var(--r-md)', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>A note from Priya</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ink)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
            "Loved how you looked after Rivington St. The mews has an apple tree you'd get on with. Pop the kettle on and fill this in when you can."
          </div>
        </div>

        {/* Property snapshot */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
          <PhImg h={90} hue={p.heroHue} label=""/>
          <div style={{ gridColumn: '2 / 5', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 6 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{p.area}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8 }}>
              £{p.price.toLocaleString()}/mo · {p.beds} bed · Available {p.available}
            </div>
          </div>
        </div>

        <button className="btn btn-coral btn-lg btn-block" style={{ marginTop: 28 }} onClick={onApply}>
          Start my application <Icon name="arrowRight" size={16}/>
        </button>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', marginTop: 10 }}>
          Most fields are pre-filled from your profile.
        </div>
      </div>
    </div>
  );
};

// --- Entry: AI MATCH NOTIFICATION ---
const EntryMatch = ({ onApply, onSkip }) => {
  const p = DEMO_PROPERTY;
  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '24px 36px 60px' }}>
      <div style={{ marginBottom: 18 }}>
        <BackButton label="Matches" fallback="/app/tenant/matches"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--coral-700)', fontWeight: 500, marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        <Icon name="sparkles" size={14}/>
        New match · 2 mins ago
      </div>

      <div className="display" style={{ fontSize: 56, lineHeight: 1.03, maxWidth: 780 }}>
        This one feels made<br/>for you, {TENANT.name.split(' ')[0]}.
      </div>
      <p style={{ fontSize: 17, color: 'var(--ink-2)', marginTop: 14, maxWidth: 600, lineHeight: 1.6 }}>
        A new listing just went live in Hackney. Your Care Score, budget, and pet policy all match. Apply early and you'll be in front of the landlord before the queue forms.
      </p>

      <div className="solid-card" style={{ marginTop: 28, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Left: property */}
          <div style={{ padding: 24 }}>
            <PhImg h={220} hue={p.heroHue} label={p.gallery[0].label}/>
            <div style={{ marginTop: 16 }}>
              <div className="display" style={{ fontSize: 28 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>{p.area}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 10 }}>
                £{p.price.toLocaleString()}/mo · {p.beds} bed, {p.baths} bath · Available {p.available}
              </div>
            </div>
          </div>
          {/* Right: why */}
          <div style={{ padding: 24, background: 'var(--coral-50)', borderLeft: '1px solid var(--coral-200)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Ring value={94} size={72} color="coral" thickness={10} label="Match"/>
              <div>
                <div style={{ fontSize: 13, color: 'var(--coral-800)', fontWeight: 500 }}>Why we think so</div>
                <div style={{ fontSize: 12, color: 'var(--coral-700)', marginTop: 2 }}>Top 3% of matches this month</div>
              </div>
            </div>
            <ul style={{ marginTop: 18, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TENANT.whyYouFit.map((w, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>
                  <Icon name="check" size={13} style={{ color: 'var(--coral-600)', marginTop: 3 }}/>
                  {w}
                </li>
              ))}
            </ul>
            <div style={{ flex: 1 }}/>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--coral-700)' }}>
              Only 2 other tenants have seen this match.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, padding: 20, borderTop: '1px solid var(--line)', background: 'white' }}>
          <button className="btn btn-ghost" onClick={onSkip}>Not for me</button>
          <div style={{ flex: 1 }}/>
          <button className="btn btn-ghost" onClick={onApply}>
            See full listing
          </button>
          <button className="btn btn-coral" onClick={onApply}>
            Apply now <Icon name="arrowRight" size={14}/>
          </button>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// FLOW SHELL — focused header with exit + progress
// ====================================================================

const FlowHeader = ({ step, total, onExit, saved = true }) => (
  <div style={{
    position: 'sticky', top: 0, zIndex: 10,
    background: 'color-mix(in oklab, var(--cream) 92%, transparent)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--line)',
    padding: '14px 36px',
    display: 'grid', gridTemplateColumns: '220px 1fr 220px', alignItems: 'center', gap: 24,
  }}>
    <button onClick={onExit} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
      <Icon name="chevLeft" size={14}/> Save & exit
    </button>
    <Progress step={step} total={total}/>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--ink-3)' }}>
      {saved && <><Icon name="check" size={12} style={{ color: 'var(--ok)' }}/> Draft saved</>}
    </div>
  </div>
);

// ====================================================================
// STEP 1 · Review the listing
// ====================================================================
const StepReview = ({ data, update }) => {
  const p = DEMO_PROPERTY;
  return (
    <>
      <StepHead eyebrow="Step 1 of 7" title="Let's double-check the home." sub="Make sure the rent, move-in date, and term match what you want. You can adjust the start date here if you need to."/>

      <div className="solid-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 0 }}>
          <PhImg h={240} hue={p.heroHue} label={p.gallery[0].label} style={{ borderRadius: 0, border: 'none' }}/>
          <div style={{ padding: 24 }}>
            <div className="display" style={{ fontSize: 26 }}>{p.title}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>{p.area}</div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Rent</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>£{p.price.toLocaleString()} / month</div></div>
              <div><div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Deposit</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>£{p.deposit.toLocaleString()}</div></div>
              <div><div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Term</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{p.term}</div></div>
              <div><div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Available from</div><div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>{p.available}</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="solid-card" style={{ padding: 24, marginTop: 18 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Your preferences for this tenancy</div>
        <Row>
          <div className="field">
            <label>Preferred move-in</label>
            <input className="input" type="date" value={data.moveIn} onChange={e => update('moveIn', e.target.value)}/>
          </div>
          <div className="field">
            <label>How long do you want to stay?</label>
            <select className="select" value={data.termWanted} onChange={e => update('termWanted', e.target.value)}>
              <option>12 months, rolling (default)</option>
              <option>12 months, fixed</option>
              <option>24 months, fixed</option>
              <option>Longer — happy to discuss</option>
            </select>
          </div>
        </Row>
        <div style={{ marginTop: 14 }}>
          <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
            <span onClick={() => update('viewedOrHappy', !data.viewedOrHappy)}><Check on={data.viewedOrHappy}/></span>
            <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55 }}>
              I've viewed the home or I'm happy to proceed based on the listing. <span style={{ color: 'var(--ink-3)' }}>Viewings can still be arranged after applying.</span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

// ====================================================================
// STEP 2 · Household
// ====================================================================
const StepHousehold = ({ data, update }) => {
  const addPerson = () => update('people', [...data.people, { name: '', relation: 'Partner', age: '' }]);
  const updatePerson = (i, k, v) => {
    const next = data.people.slice(); next[i] = { ...next[i], [k]: v }; update('people', next);
  };
  const removePerson = (i) => update('people', data.people.filter((_, j) => j !== i));

  return (
    <>
      <StepHead eyebrow="Step 2 of 7" title="Who's moving in?" sub="Tell us about everyone who'll live here. Landlords expect a full picture — it speeds up reference checks."/>

      <div className="solid-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: 'var(--coral-50)', borderRadius: 'var(--r-sm)', marginBottom: 18 }}>
          <Avatar name={TENANT.name} size={40} hue={TENANT.hue}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{TENANT.name} <span style={{ fontSize: 12, color: 'var(--ok)', fontWeight: 400, marginLeft: 4 }}>· You · Lead tenant</span></div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>32 · Full-time · Non-smoker</div>
          </div>
          <Pill tone="ok">Verified</Pill>
        </div>

        {data.people.map((p, i) => (
          <div key={i} style={{ marginBottom: 14, padding: 18, border: '1px solid var(--line)', borderRadius: 'var(--r-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500 }}>Co-tenant {i + 1}</div>
              <button onClick={() => removePerson(i)} style={{ fontSize: 12, color: 'var(--ink-3)' }}>Remove</button>
            </div>
            <Row>
              <div className="field"><label>Full name</label><input className="input" value={p.name} onChange={e => updatePerson(i, 'name', e.target.value)}/></div>
              <div className="field"><label>Relationship to you</label>
                <select className="select" value={p.relation} onChange={e => updatePerson(i, 'relation', e.target.value)}>
                  <option>Partner</option><option>Spouse</option><option>Friend / flatmate</option><option>Child</option><option>Parent</option><option>Sibling</option>
                </select>
              </div>
            </Row>
            <div style={{ marginTop: 12 }}>
              <button style={{ fontSize: 13, color: 'var(--coral-700)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="message" size={13}/> Invite them to verify via email
              </button>
            </div>
          </div>
        ))}

        <button onClick={addPerson} className="btn btn-ghost" style={{ width: '100%' }}>
          <Icon name="plus" size={14}/> Add another person
        </button>

        <div className="hr" style={{ margin: '26px 0' }}/>

        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Pets & smoking</div>
        <Row>
          <div className="field">
            <label>Any pets?</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['None', '1 cat', '1 dog', 'Multiple'].map(o => (
                <button key={o} onClick={() => update('pets', o)} className={'chip'} style={{
                  height: 40, padding: '0 14px', fontSize: 13,
                  background: data.pets === o ? 'var(--ink)' : 'white',
                  color: data.pets === o ? 'var(--cream)' : 'var(--ink-2)',
                  borderColor: data.pets === o ? 'var(--ink)' : 'var(--line)',
                }}>{o}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Smoking</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Non-smoker', 'Outside only', 'Yes'].map(o => (
                <button key={o} onClick={() => update('smoking', o)} className="chip" style={{
                  height: 40, padding: '0 14px', fontSize: 13,
                  background: data.smoking === o ? 'var(--ink)' : 'white',
                  color: data.smoking === o ? 'var(--cream)' : 'var(--ink-2)',
                  borderColor: data.smoking === o ? 'var(--ink)' : 'var(--line)',
                }}>{o}</button>
              ))}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

// ====================================================================
// STEP 3 · Affordability
// ====================================================================
const StepAffordability = ({ data, update }) => {
  const p = DEMO_PROPERTY;
  const incomeRatio = Math.round((p.price / TENANT.income.monthlyNet) * 100);
  return (
    <>
      <StepHead eyebrow="Step 3 of 7" title="The numbers side of things." sub="We've pulled this from your verified profile. You can tweak anything or add supporting context."/>

      {/* Summary card with auto-filled chip */}
      <div className="solid-card" style={{ padding: 24, background: 'linear-gradient(135deg, var(--coral-50), white)', border: '1px solid var(--coral-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <Icon name="sparkles" size={14} style={{ color: 'var(--coral-600)' }}/>
          <span style={{ fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Auto-filled from your linked accounts</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Net monthly</div>
            <div className="display" style={{ fontSize: 34, marginTop: 4 }}>£{TENANT.income.monthlyNet.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Avg over 3 months</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rent-to-income</div>
            <div className="display" style={{ fontSize: 34, marginTop: 4, color: incomeRatio < 40 ? 'var(--ok)' : incomeRatio < 50 ? 'var(--warn)' : 'var(--err)' }}>{incomeRatio}%</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Healthy · below 50%</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Affordability</div>
            <div className="display" style={{ fontSize: 34, marginTop: 4 }}>A</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Passes landlord threshold (2.5×)</div>
          </div>
        </div>
      </div>

      {/* Employment */}
      <div className="solid-card" style={{ padding: 24, marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Employment</div>
          <Pill tone="ok">Verified by Monzo</Pill>
        </div>
        <Row>
          <div className="field"><label>Employer</label><input className="input" value={data.employer} onChange={e => update('employer', e.target.value)}/></div>
          <div className="field"><label>Role</label><input className="input" value={data.role} onChange={e => update('role', e.target.value)}/></div>
          <div className="field"><label>Employment type</label>
            <select className="select" value={data.empType} onChange={e => update('empType', e.target.value)}>
              <option>Full-time, permanent</option><option>Part-time</option><option>Contract</option><option>Self-employed</option><option>Student</option>
            </select>
          </div>
          <div className="field"><label>Started</label><input className="input" value={data.empStarted} onChange={e => update('empStarted', e.target.value)}/></div>
        </Row>

        <div className="hr" style={{ margin: '20px 0' }}/>

        <div className="field">
          <label>Anything else a landlord should know? <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>Optional</span></label>
          <textarea className="textarea" rows={3} placeholder="e.g. I'm paid quarterly bonuses, or a guarantor is available if helpful."
            value={data.notes} onChange={e => update('notes', e.target.value)}/>
        </div>
      </div>

      {/* Guarantor */}
      <div className="solid-card" style={{ padding: 18, marginTop: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
        <Icon name="shield" size={20} style={{ color: 'var(--ink-3)' }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>A guarantor isn't required — but you can add one</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Useful for new earners, students, or anyone with a short UK credit history.</div>
        </div>
        <button className="btn btn-ghost btn-sm">Add guarantor</button>
      </div>
    </>
  );
};

// ====================================================================
// STEP 4 · References
// ====================================================================
const StepReferences = ({ data, update }) => (
  <>
    <StepHead eyebrow="Step 4 of 7" title="Your references are already attached." sub="We pulled these straight from your Home Story. You can request a fresh one or attach a new character reference."/>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TENANT.references.map((r, i) => (
        <div key={i} className="solid-card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
          <Avatar name={r.who} size={44} hue={(i + 1) * 80}/>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{r.who}</span>
              {r.rating && (
                <span style={{ fontSize: 12, color: 'var(--coral-700)' }}>
                  {'★'.repeat(r.rating)}<span style={{ color: 'var(--ink-4)' }}>{'★'.repeat(5 - r.rating)}</span>
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{r.role} · {r.since}</div>
          </div>
          <Pill tone="ok">Verified · attached</Pill>
          <button className="btn btn-ghost btn-sm">Preview</button>
        </div>
      ))}

      {/* Add character reference */}
      <div className="solid-card" style={{ padding: 20, border: '1px dashed var(--line-2)', boxShadow: 'none', background: 'color-mix(in oklab, white 70%, transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <Icon name="sparkles" size={14} style={{ color: 'var(--coral-600)' }}/>
          <div style={{ fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Optional · adds warmth</div>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Add a character reference</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>A neighbour, long-time friend, or colleague. We'll send a request with friendly, specific prompts.</div>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10 }}>
          <input className="input" placeholder="Their name" value={data.charName} onChange={e => update('charName', e.target.value)}/>
          <input className="input" placeholder="Email" value={data.charEmail} onChange={e => update('charEmail', e.target.value)}/>
          <button className="btn btn-coral">Send request</button>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic' }}>
          Preview: "Hi — Ayo's applying for a home through GoodLet and would love your vouch. Three quick questions, takes two minutes. No spam."
        </div>
      </div>
    </div>

    {/* Reassurance */}
    <div style={{ marginTop: 18, padding: 16, background: 'var(--coral-50)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Icon name="check" size={16} style={{ color: 'var(--ok)' }}/>
      <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
        <strong>All set.</strong> Your existing references will be shared with the landlord on submit — nothing more to do.
      </div>
    </div>
  </>
);

// ====================================================================
// STEP 5 · Right-to-Rent / ID
// ====================================================================
const StepRTR = ({ data, update }) => (
  <>
    <StepHead eyebrow="Step 5 of 7" title="Identity & right to rent." sub="A legal requirement in England. We've already verified you — just confirm it's up to date."/>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {TENANT.docs.map((d, i) => (
        <div key={i} className="solid-card" style={{ padding: 18, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)' }}>
            <Icon name={d.kind.includes('Payslips') ? 'pound' : d.kind.includes('Photo') ? 'user' : 'shield'} size={18}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{d.kind}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{d.detail}</div>
          </div>
          <Pill tone="ok">Verified</Pill>
          <button className="btn btn-ghost btn-sm">View</button>
        </div>
      ))}
    </div>

    <div className="solid-card" style={{ padding: 20, marginTop: 18 }}>
      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
        <span onClick={() => update('rtrConfirm', !data.rtrConfirm)}><Check on={data.rtrConfirm}/></span>
        <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          I confirm I have the right to rent in the UK and everything above is current and accurate.
        </span>
      </label>
    </div>

    <div style={{ marginTop: 18, padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 12, alignItems: 'center' }}>
      <Icon name="lock" size={18} style={{ color: 'var(--ink-3)' }}/>
      <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>
        Documents are encrypted and only shared with the landlord once you submit. They're never used for advertising.
      </div>
    </div>
  </>
);

// ====================================================================
// STEP 6 · Cover letter (AI-drafted)
// ====================================================================
const StepCover = ({ data, update }) => {
  const regen = () => {
    update('cover', `Hi Priya,\n\nThank you for considering my application. I've been looking for a home with character and quiet corners, and 12 Harlow Mews has both — the south-facing living room and the apple tree sold me before I finished the listing.\n\nI've rented in London for the last three years and kept both flats in better nick than I found them. I'm a non-smoker, work hybrid at Monzo, and have one very calm cat who's good with gardens. My references and Home Story speak for themselves.\n\nI'd love the chance to look after the mews. Happy to view whenever suits, and to talk through anything you'd like.\n\nBest,\nAyo`);
  };
  useEffect(() => { if (!data.cover) regen(); }, []); // eslint-disable-line

  return (
    <>
      <StepHead eyebrow="Step 6 of 7" title="A note to the landlord." sub="We've drafted something based on your Home Story and the listing. Keep it, edit it, or rewrite it — landlords love a personal touch."/>

      <div className="solid-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* AI toolbar */}
        <div style={{ padding: '12px 18px', background: 'var(--coral-50)', borderBottom: '1px solid var(--coral-200)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Icon name="sparkles" size={14} style={{ color: 'var(--coral-600)' }}/>
          <span style={{ fontSize: 12, color: 'var(--coral-800)', fontWeight: 500 }}>AI draft</span>
          <span style={{ flex: 1 }}/>
          <button onClick={regen} className="btn btn-ghost btn-sm">Regenerate</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Warmer', 'Shorter', 'More formal'].map(t => (
              <button key={t} className="chip" style={{ height: 30, padding: '0 12px', fontSize: 12 }}>{t}</button>
            ))}
          </div>
        </div>

        <textarea
          value={data.cover || ''}
          onChange={e => update('cover', e.target.value)}
          style={{
            width: '100%', minHeight: 340, border: 'none', outline: 'none',
            padding: 24, fontSize: 16, lineHeight: 1.65,
            fontFamily: 'var(--font-ui)', color: 'var(--ink)',
            background: 'white', resize: 'vertical',
          }}
        />

        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
          <span>{(data.cover || '').length} characters · aim for 150–400 words</span>
          <span>Priya · {DEMO_PROPERTY.title}</span>
        </div>
      </div>

      <div style={{ marginTop: 18, padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--ink-3)' }}>
        <strong style={{ color: 'var(--ink-2)' }}>Tip:</strong> mention something specific from the listing — it signals you've read it, and it's the single strongest predictor of getting a viewing.
      </div>
    </>
  );
};

// ====================================================================
// STEP 7 · Review & submit
// ====================================================================
const StepSubmit = ({ data, onSubmit, submitting }) => {
  const p = DEMO_PROPERTY;
  const items = [
    { icon: 'home',    label: 'Property', value: `${p.title} · £${p.price.toLocaleString()}/mo` },
    { icon: 'calendar',label: 'Move-in', value: `${data.moveIn || p.available} · ${data.termWanted}` },
    { icon: 'users',   label: 'Household', value: `1 lead + ${data.people.length} co-tenant${data.people.length === 1 ? '' : 's'} · ${data.pets}` },
    { icon: 'pound',   label: 'Affordability', value: `£${TENANT.income.monthlyNet.toLocaleString()}/mo net · ${Math.round((p.price / TENANT.income.monthlyNet) * 100)}% ratio` },
    { icon: 'shield',  label: 'References', value: `${TENANT.references.length} attached, all verified` },
    { icon: 'key',     label: 'Right to rent', value: 'Verified · Share Code valid' },
    { icon: 'message', label: 'Cover letter', value: `${(data.cover || '').length} characters · AI-drafted, edited by you` },
  ];
  return (
    <>
      <StepHead eyebrow="Step 7 of 7" title="One last look before you send." sub="Here's exactly what the landlord will receive. You can go back to any step — nothing's locked in until you press submit."/>

      <div className="solid-card" style={{ padding: 0, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)' }}>
              <Icon name={it.icon} size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{it.label}</div>
              <div style={{ fontSize: 15, marginTop: 2 }}>{it.value}</div>
            </div>
            <button style={{ fontSize: 13, color: 'var(--coral-700)', fontWeight: 500 }}>Edit</button>
          </div>
        ))}
      </div>

      {/* Competitive context */}
      <div style={{ marginTop: 18, padding: 18, background: 'white', border: '1px solid var(--coral-200)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 14, alignItems: 'center' }}>
        <Ring value={94} size={60} color="coral" thickness={9}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>You'll be the 4th application — and the strongest so far</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>Your Care Score puts you in the top 5%. Priya typically decides within {p.landlordDecisionMedian}.</div>
        </div>
      </div>

      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 18, cursor: 'pointer' }}>
        <Check on={true}/>
        <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>
          I understand my application will be shared with Priya M. only, and GoodLet will hold my documents securely under our <a style={{ color: 'var(--coral-700)', textDecoration: 'underline' }}>Privacy Policy</a>.
        </span>
      </label>

      <button className="btn btn-coral btn-lg btn-block" style={{ marginTop: 22, height: 60, fontSize: 17 }}
              onClick={onSubmit} disabled={submitting}>
        {submitting ? 'Sending…' : <>Send application to Priya <Icon name="arrowRight" size={18}/></>}
      </button>
    </>
  );
};

// ====================================================================
// CONFIRMATION — Application submitted
// ====================================================================
const Confirmation = ({ onTrack, onHome }) => {
  const { go } = useNav();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(() => setStage(3), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const related = [
    { id: 'ashby-3',     title: 'Flat 3, Ashby Rd',   area: 'Clapton, E5',      price: '£2,150', beds: 2, baths: 1, sqft: 720, score: 91, hue: 50, tag: 'Similar size & area' },
    { id: 'willowbrook', title: '8 Willowbrook Ct',   area: 'Hackney, E8',      price: '£2,300', beds: 2, baths: 1, sqft: 700, score: 89, hue: 10, tag: 'Next street over' },
    { id: 'morton',      title: '4B Morton Terrace',  area: 'Walthamstow, E17', price: '£1,850', beds: 2, baths: 1, sqft: 680, score: 84, hue: 170, tag: 'Within your budget' },
  ];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* ── Top hero band ──────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(180deg, oklch(0.97 0.03 30), var(--cream))', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '72px 36px 56px', textAlign: 'center' }}>

          {/* Animated tick + confetti dots */}
          <div style={{ position: 'relative', width: 88, height: 88, margin: '0 auto' }}>
            {[
              { t: -6,  l: -18, h: 30,  d: 100 }, { t: -10, l: 94, h: 50,  d: 200 },
              { t: 88,  l: -8,  h: 180, d: 300 }, { t: 86,  l: 92, h: 200, d: 350 },
              { t: 48,  l: 110, h: 70,  d: 250 }, { t: 42,  l: -26, h: 120, d: 400 },
            ].map((d, i) => (
              <div key={i} style={{
                position: 'absolute', top: d.t, left: d.l,
                width: 8, height: 8, borderRadius: 99,
                background: `oklch(0.78 0.15 ${d.h})`,
                opacity: stage >= 1 ? 1 : 0,
                transform: stage >= 1 ? 'scale(1)' : 'scale(0)',
                transition: `opacity .3s ${d.d}ms, transform .5s ${d.d}ms cubic-bezier(.34,1.56,.64,1)`,
              }}/>
            ))}
            <div style={{
              width: 88, height: 88, borderRadius: 99,
              background: 'linear-gradient(135deg, var(--coral-400), var(--coral-600))',
              display: 'grid', placeItems: 'center', color: 'white',
              transform: stage >= 1 ? 'scale(1)' : 'scale(0.3)',
              opacity: stage >= 1 ? 1 : 0,
              transition: 'transform .6s cubic-bezier(.34,1.56,.64,1), opacity .3s',
              boxShadow: '0 20px 48px -12px oklch(0.60 0.18 26 / 0.5)',
            }}>
              <Icon name="check" size={42} stroke={3}/>
            </div>
          </div>

          <div style={{
            fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, marginTop: 28,
            opacity: stage >= 2 ? 1 : 0, transition: 'opacity .4s',
          }}>
            Application submitted
          </div>
          <div className="display" style={{
            fontSize: 56, marginTop: 8, lineHeight: 1.02, letterSpacing: '-0.02em',
            opacity: stage >= 2 ? 1 : 0, transform: stage >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity .5s, transform .5s',
          }}>
            Sent. Now the kettle bit.
          </div>
          <p style={{
            fontSize: 18, color: 'var(--ink-2)', marginTop: 16, lineHeight: 1.55, maxWidth: 580, margin: '16px auto 0',
            opacity: stage >= 3 ? 1 : 0, transition: 'opacity .4s',
          }}>
            Priya has your application. She typically replies within <strong style={{ color: 'var(--ink)' }}>3 days</strong>.
            We'll ping you the moment she reads it.
          </p>

          {/* Primary summary card */}
          <div className="solid-card" style={{
            marginTop: 36, padding: 20, display: 'flex', alignItems: 'center', gap: 18, textAlign: 'left', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto',
            opacity: stage >= 3 ? 1 : 0, transform: stage >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity .5s .1s, transform .5s .1s',
          }}>
            <PhImg h={80} hue={DEMO_PROPERTY.heroHue} label="" style={{ width: 120, flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>Application</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginTop: 2 }}>{DEMO_PROPERTY.title}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{DEMO_PROPERTY.area} · {DEMO_PROPERTY.price}/mo</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <span className="chip chip-coral" style={{ height: 22, fontSize: 11 }}>#GL-8821</span>
                <span className="chip" style={{ height: 22, fontSize: 11, background: 'var(--cream-2)' }}>Submitted just now</span>
                <span className="chip chip-ok" style={{ height: 22, fontSize: 11 }}>4th of {DEMO_PROPERTY.applicants}</span>
              </div>
            </div>
          </div>

          {/* Primary actions */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28, flexWrap: 'wrap',
            opacity: stage >= 3 ? 1 : 0, transition: 'opacity .5s .2s',
          }}>
            <button className="btn btn-coral btn-lg" onClick={onTrack}>Track this application <Icon name="arrowRight" size={16}/></button>
            <button className="btn btn-ghost btn-lg" onClick={onHome}>Back to dashboard</button>
          </div>
        </div>
      </div>

      {/* ── What happens next timeline ─────────────────────────── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 36px 0' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>What happens next</div>
        <div className="display" style={{ fontSize: 32, marginTop: 4, letterSpacing: '-0.01em' }}>A clear, honest path.</div>

        <div className="solid-card" style={{ marginTop: 22, padding: 0, overflow: 'hidden' }}>
          {[
            { i: 'envelope', t: 'Priya receives your application',    s: 'Delivered securely with your verified profile attached',  when: 'Right now',          state: 'done' },
            { i: 'eye',      t: 'She reads it',                       s: 'Average time to first read: 14 hours',                     when: 'Usually within a day', state: 'active' },
            { i: 'bookmark', t: 'Shortlisted or thanked for applying',s: 'Either way, you hear back — we chase if it goes silent',  when: 'Within 3 days',      state: 'pending' },
            { i: 'calendar', t: 'Viewing booked (if shortlisted)',    s: 'Pick a slot that works — in person or live video',          when: 'Within 5 days',      state: 'pending' },
            { i: 'key',      t: 'Offer of tenancy',                   s: 'Terms, deposit, and AST — all through GoodLet',           when: 'Post-viewing',       state: 'pending' },
          ].map((t, i, arr) => (
            <div key={i} style={{ padding: '18px 24px', display: 'flex', gap: 18, alignItems: 'center', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: t.state === 'done' ? 'var(--coral-500)' : t.state === 'active' ? 'var(--coral-100)' : 'var(--cream-2)',
                color:      t.state === 'done' ? 'white' : t.state === 'active' ? 'var(--coral-700)' : 'var(--ink-3)',
                display: 'grid', placeItems: 'center',
                boxShadow: t.state === 'active' ? '0 0 0 5px var(--coral-50)' : 'none',
              }}>
                <Icon name={t.state === 'done' ? 'check' : t.i} size={16} stroke={t.state === 'done' ? 3 : 1.75}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: t.state === 'pending' ? 'var(--ink-3)' : 'var(--ink)' }}>{t.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{t.s}</div>
              </div>
              <div style={{ fontSize: 11, color: t.state === 'active' ? 'var(--coral-700)' : 'var(--ink-3)', fontWeight: t.state === 'active' ? 600 : 400, fontFamily: 'var(--font-mono)', flexShrink: 0, textAlign: 'right' }}>{t.when}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── While you wait · related homes ─────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 36px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Keep options open</div>
            <div className="display" style={{ fontSize: 34, marginTop: 4, letterSpacing: '-0.01em' }}>Three more places you'll love.</div>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 6, maxWidth: 560 }}>
              Applying to two or three in parallel is normal — and it doesn't hurt your standing with Priya. We matched these to your Care Score and search.
            </p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go('/app/tenant/search')}>See all matches <Icon name="arrowRight" size={13}/></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {related.map(p => <RelatedPropertyCard key={p.id} p={p}/>)}
        </div>
      </div>

      {/* ── While you wait · todos ────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 36px 80px' }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>While you wait</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { i: 'camera', t: 'Add a photo to your Home Story',  s: 'That balcony planter would look great.',   cta: 'Open Home Story',   to: '/app/tenant/story' },
            { i: 'users',  t: 'Invite your co-tenant',           s: 'Sam can verify while you wait.',            cta: 'Send invite',        to: '/app/tenant' },
            { i: 'shield', t: 'Top up your Care Score',          s: 'One more reference bumps you to 94.',       cta: 'Request reference',  to: '/app/tenant/story' },
          ].map((x, i) => (
            <button key={i} onClick={() => go(x.to)} className="solid-card" style={{ textAlign: 'left', padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream-2)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)', flexShrink: 0 }}><Icon name={x.i} size={16}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{x.t}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{x.s}</div>
                <div style={{ fontSize: 12, color: 'var(--coral-700)', marginTop: 10, fontWeight: 500, display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                  {x.cta} <Icon name="arrowRight" size={11}/>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Related property card for the Confirmation — keeps momentum
const RelatedPropertyCard = ({ p }) => {
  const { go } = useNav();
  const [hover, setHover] = useState(false);
  return (
    <div className="solid-card"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         onClick={() => go(`/apply/listing/${p.id}`)}
         style={{ padding: 14, cursor: 'pointer',
                  transition: 'transform .15s, box-shadow .15s',
                  transform: hover ? 'translateY(-3px)' : 'none',
                  boxShadow: hover ? '0 18px 40px -16px oklch(0.5 0.1 30 / 0.28)' : undefined }}>
      <div style={{ position: 'relative' }}>
        <PhImg label={p.title} h={160} hue={p.hue}/>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '5px 10px', borderRadius: 99,
          background: 'oklch(0.97 0.02 30 / 0.95)',
          backdropFilter: 'blur(8px)',
          fontSize: 11, color: 'var(--coral-800)', fontWeight: 500,
        }}>{p.tag}</div>
        <div style={{
          position: 'absolute', top: 12, right: 12,
          padding: '5px 10px', borderRadius: 99,
          background: 'oklch(0.97 0.02 30 / 0.95)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, fontWeight: 600,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: 'var(--coral-500)' }}/>
          {p.score}% match
        </div>
      </div>
      <div style={{ padding: '14px 6px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{p.area}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div className="display" style={{ fontSize: 20 }}>{p.price}</div>
            <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>per month</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 12, fontSize: 12, color: 'var(--ink-2)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="bed" size={12}/> {p.beds}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="bath" size={12}/> {p.baths}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="ruler" size={12}/> {p.sqft} ft²</span>
        </div>
        <div style={{
          marginTop: 12, padding: '9px 12px', borderRadius: 10,
          background: hover ? 'var(--coral-500)' : 'var(--cream-2)',
          color: hover ? 'white' : 'var(--ink-2)',
          fontSize: 12, fontWeight: 500,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background .2s, color .2s',
        }}>
          <span>One-tap apply</span>
          <Icon name="arrowRight" size={12}/>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// TRACKER
// ====================================================================
const Tracker = ({ onBack }) => {
  const p = DEMO_PROPERTY;
  const stages = [
    { key: 'sent', label: 'Sent', sub: 'Today · 14:22', icon: 'check', done: true },
    { key: 'seen', label: 'Opened by landlord', sub: '18 mins later', icon: 'eye', done: true },
    { key: 'reading', label: 'Under review', sub: 'Priya is reading your Home Story', icon: 'clock', done: true, current: true },
    { key: 'short', label: 'Shortlist decision', sub: 'Expected by Thu', icon: 'star', done: false },
    { key: 'decision', label: 'Offer or close', sub: '—', icon: 'key', done: false },
  ];

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '28px 36px 60px' }}>
      <div style={{ marginBottom: 20 }}>
        <BackButton label="Your applications" fallback="/app/tenant/applications"/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'center', marginBottom: 28 }}>
        <div>
          <Pill tone="coral">In review</Pill>
          <div className="display" style={{ fontSize: 40, marginTop: 10, lineHeight: 1.05 }}>{p.title}</div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 6 }}>{p.area} · Application #GL-8821</div>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <PhImg h={120} hue={p.heroHue} label="" style={{ width: 200 }}/>
        </div>
      </div>

      {/* Timeline */}
      <div className="solid-card" style={{ padding: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Progress</div>
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          <div style={{ position: 'absolute', left: 12, top: 8, bottom: 8, width: 2, background: 'var(--line)' }}/>
          <div style={{ position: 'absolute', left: 12, top: 8, height: '50%', width: 2, background: 'linear-gradient(180deg, var(--coral-500), var(--coral-300))' }}/>

          {stages.map((s, i) => (
            <div key={s.key} style={{ position: 'relative', paddingBottom: i < stages.length - 1 ? 22 : 0 }}>
              <div style={{
                position: 'absolute', left: -32, top: -2,
                width: 26, height: 26, borderRadius: 99,
                background: s.done ? 'var(--coral-500)' : 'white',
                border: s.done ? 'none' : '2px solid var(--line-2)',
                display: 'grid', placeItems: 'center',
                color: s.done ? 'white' : 'var(--ink-3)',
                boxSizing: 'border-box',
                boxShadow: s.current ? '0 0 0 6px var(--coral-100)' : 'none',
              }}>
                <Icon name={s.done ? 'check' : s.icon} size={12} stroke={3}/>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: s.done ? 'var(--ink)' : 'var(--ink-3)' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2 }}>{s.sub}</div>
              {s.current && (
                <div style={{ marginTop: 10, padding: 14, background: 'var(--coral-50)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 12, alignItems: 'center', border: '1px solid var(--coral-200)' }}>
                  <Icon name="sparkles" size={14} style={{ color: 'var(--coral-600)' }}/>
                  <div style={{ fontSize: 13, color: 'var(--coral-800)' }}>
                    <strong>Estimated decision: 2–3 days.</strong> Priya's 30 recent applications closed in a median of 3 days.
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conversation + actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginTop: 14 }}>
        <div className="solid-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Messages with Priya</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ alignSelf: 'flex-start', maxWidth: '80%', padding: '10px 14px', background: 'var(--cream-2)', borderRadius: '14px 14px 14px 4px', fontSize: 14 }}>
              Thanks Ayo — lovely Home Story. I'll have a proper look tonight. Any chance you're around for a viewing Saturday morning?
            </div>
            <div style={{ alignSelf: 'flex-start', fontSize: 11, color: 'var(--ink-3)' }}>Priya · 16 min ago</div>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <input className="input" style={{ flex: 1 }} placeholder="Reply to Priya…"/>
            <button className="btn btn-coral">Send</button>
          </div>
        </div>
        <div className="solid-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Your application</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}><Icon name="eye" size={14}/> View as landlord sees it</button>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}><Icon name="upload" size={14}/> Attach a supplement</button>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}><Icon name="calendar" size={14}/> Propose a viewing</button>
            <div className="hr" style={{ margin: '6px 0' }}/>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start', color: 'var(--err)' }}><Icon name="x" size={14}/> Withdraw application</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// FIRST-TIMER INLINE PROFILE FORK
// Shown when user clicks "New to GoodLet" on listing entry.
// 3 quick steps then drops into the normal flow.
// ====================================================================
const NewbieFork = ({ onDone }) => {
  const [s, setS] = useState(0);
  const [d, setD] = useState({ name: '', phone: '', currentAddress: '', currentLandlord: '', currentLandlordEmail: '', years: '3' });
  const total = 3;

  const titles = [
    ['Quick basics', "We'll build your profile as you apply — start with the essentials."],
    ["Where you're renting now", "Your current (or most recent) home."],
    ["We'll reach out to verify", "We'll email your current landlord for a reference. Nothing goes public until you approve it."],
  ];

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 36px 60px' }}>
      <div style={{ marginBottom: 16 }}>
        <BackButton label="Back" fallback="/apply"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        <Icon name="sparkles" size={13}/> New here · quick setup
      </div>

      <Progress step={s} total={total}/>
      <div style={{ marginTop: 24 }}>
        <StepHead title={titles[s][0]} sub={titles[s][1]}/>
      </div>

      <div className="solid-card" style={{ padding: 24 }}>
        {s === 0 && (
          <Row>
            <div className="field"><label>Full name</label><input className="input" value={d.name} onChange={e => setD({ ...d, name: e.target.value })} placeholder="Jane Smith"/></div>
            <div className="field"><label>Mobile</label><input className="input" value={d.phone} onChange={e => setD({ ...d, phone: e.target.value })} placeholder="07…"/></div>
          </Row>
        )}
        {s === 1 && (
          <>
            <div className="field"><label>Current address</label><input className="input" value={d.currentAddress} onChange={e => setD({ ...d, currentAddress: e.target.value })} placeholder="Start typing a postcode"/></div>
            <div className="field" style={{ marginTop: 14 }}><label>Years there</label>
              <select className="select" value={d.years} onChange={e => setD({ ...d, years: e.target.value })}>
                <option>Under 1</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
              </select>
            </div>
          </>
        )}
        {s === 2 && (
          <>
            <Row>
              <div className="field"><label>Landlord's name</label><input className="input" value={d.currentLandlord} onChange={e => setD({ ...d, currentLandlord: e.target.value })}/></div>
              <div className="field"><label>Landlord's email</label><input className="input" value={d.currentLandlordEmail} onChange={e => setD({ ...d, currentLandlordEmail: e.target.value })} placeholder="hello@…"/></div>
            </Row>
            <div style={{ marginTop: 16, padding: 14, background: 'var(--coral-50)', borderRadius: 'var(--r-sm)', border: '1px solid var(--coral-200)', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              <strong>What we'll ask:</strong> how you cared for the place, whether the deposit was returned, and whether they'd rent to you again. Three questions, two minutes.
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {s > 0 && <button className="btn btn-ghost btn-lg" onClick={() => setS(s - 1)}>Back</button>}
        <div style={{ flex: 1 }}/>
        {s < total - 1 ? (
          <button className="btn btn-coral btn-lg" onClick={() => setS(s + 1)}>Continue <Icon name="arrowRight" size={16}/></button>
        ) : (
          <button className="btn btn-coral btn-lg" onClick={onDone}>Start the application <Icon name="arrowRight" size={16}/></button>
        )}
      </div>
    </div>
  );
};

// ====================================================================
// ROOT: ApplyFlow — routes the whole journey
// ====================================================================
const ApplyFlow = () => {
  const { route, go } = useNav();
  // Parse route like /apply/listing/harlow-mews or /apply/flow or /apply/done etc
  const parts = route.split('/').filter(Boolean); // ['apply', 'listing', 'harlow-mews']
  const phase = parts[1] || 'listing';

  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    moveIn: '2026-05-01', termWanted: '12 months, rolling (default)', viewedOrHappy: true,
    people: [{ name: 'Sam Okoye', relation: 'Partner', age: '31' }],
    pets: '1 cat', smoking: 'Non-smoker',
    employer: 'Monzo Bank', role: 'Staff Product Designer', empType: 'Full-time, permanent', empStarted: 'Mar 2022',
    notes: '', charName: '', charEmail: '',
    rtrConfirm: true, cover: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const totalSteps = 7;

  const steps = [
    <StepReview data={data} update={update}/>,
    <StepHousehold data={data} update={update}/>,
    <StepAffordability data={data} update={update}/>,
    <StepReferences data={data} update={update}/>,
    <StepRTR data={data} update={update}/>,
    <StepCover data={data} update={update}/>,
    <StepSubmit data={data} submitting={submitting}
                onSubmit={() => { setSubmitting(true); setTimeout(() => go('/apply/done'), 900); }}/>,
  ];

  // ---- Entry phases ----
  if (phase === 'listing') {
    return <EntryListing onApply={() => go('/apply/flow')} onNew={() => go('/apply/new')}/>;
  }
  if (phase === 'invite') {
    return <EntryInvite onApply={() => go('/apply/flow')}/>;
  }
  if (phase === 'match') {
    return <EntryMatch onApply={() => go('/apply/flow')} onSkip={() => go('/app/tenant')}/>;
  }
  if (phase === 'new') {
    return <NewbieFork onDone={() => go('/apply/flow')}/>;
  }

  // ---- Done / tracker ----
  if (phase === 'done') {
    return <Confirmation onTrack={() => go('/apply/tracker')} onHome={() => go('/app/tenant')}/>;
  }
  if (phase === 'tracker') {
    return <Tracker onBack={() => go('/app/tenant/applications')}/>;
  }

  // ---- Flow steps ----
  return (
    <>
      <FlowHeader step={step} total={totalSteps} onExit={() => go('/app/tenant')}/>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 36px 120px' }}>
        {steps[step]}

        {/* Step nav */}
        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
          {step > 0 && (
            <button className="btn btn-ghost btn-lg" onClick={() => setStep(step - 1)}>
              <Icon name="chevLeft" size={14}/> Back
            </button>
          )}
          <div style={{ flex: 1 }}/>
          {step < totalSteps - 1 && (
            <button className="btn btn-coral btn-lg" onClick={() => setStep(step + 1)}>
              Continue <Icon name="arrowRight" size={16}/>
            </button>
          )}
        </div>

        {/* Encouragement ribbon */}
        {step > 0 && step < totalSteps - 1 && (
          <div style={{ marginTop: 36, padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-sm)', display: 'flex', gap: 12, alignItems: 'center' }}>
            <Ring value={TENANT.careScore} size={52} color="coral" thickness={8}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>You're the 4th of {DEMO_PROPERTY.applicants} so far</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Your Care Score of {TENANT.careScore} puts you in the top 5% of applicants this month.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// Mount Apply entry index: a page that shows all 3 entry variants side-by-side for demo/navigation
const ApplyIndex = () => {
  const { go } = useNav();
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '24px 36px 80px' }}>
      <div style={{ marginBottom: 22 }}>
        <BackButton label="Dashboard" fallback="/app/tenant"/>
      </div>
      <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Demo · apply journey</div>
      <div className="display" style={{ fontSize: 48, marginTop: 8 }}>Three ways in. One good application.</div>
      <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 10, maxWidth: 640 }}>
        Pick an entry point to walk through the full tenant application journey. All three converge on the same seven steps, a warm submit, and a live tracker.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 32 }}>
        {[
          { k: 'listing', t: 'From a listing', s: 'Tenant is browsing and clicks Apply on a property page.', i: 'search' },
          { k: 'invite',  t: 'Landlord invite', s: 'A verified landlord has personally invited the tenant.', i: 'message' },
          { k: 'match',   t: 'AI match alert', s: 'GoodLet spots a 94% match and pings the tenant.', i: 'sparkles' },
        ].map(x => (
          <button key={x.k} className="solid-card" onClick={() => go(`/apply/${x.k}`)}
                  style={{ padding: 22, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)' }}><Icon name={x.i} size={18}/></div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 14 }}>{x.t}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>{x.s}</div>
            <div style={{ fontSize: 13, color: 'var(--coral-700)', marginTop: 14, fontWeight: 500, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              Start here <Icon name="arrowRight" size={13}/>
            </div>
          </button>
        ))}
      </div>

      <div className="hr" style={{ margin: '40px 0' }}/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <button className="solid-card" onClick={() => go('/apply/tracker')} style={{ padding: 18, textAlign: 'left', display: 'flex', gap: 14, alignItems: 'center' }}>
          <Icon name="clock" size={20} style={{ color: 'var(--ink-3)' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>See the tracker</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Post-submit view with live status.</div>
          </div>
          <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }}/>
        </button>
        <button className="solid-card" onClick={() => go('/apply-mobile')} style={{ padding: 18, textAlign: 'left', display: 'flex', gap: 14, alignItems: 'center' }}>
          <Icon name="user" size={20} style={{ color: 'var(--ink-3)' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>On a phone</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Same flow, iPhone framed.</div>
          </div>
          <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }}/>
        </button>
      </div>
    </div>
  );
};

// ====================================================================
// Exports
// ====================================================================
Object.assign(window, { ApplyFlow, ApplyIndex, DEMO_PROPERTY, TENANT });
