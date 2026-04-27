/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav, IOSDevice, DEMO_PROPERTY, TENANT */
const { useState: useS, useEffect: useE } = React;

/* Mobile version of the Apply flow — same 7-step backbone, stacked for phone. */

// ===== Mini components reused in mobile =====
const MProgress = ({ step, total }) => {
  const pct = ((step + 1) / total) * 100;
  return (
    <div style={{ padding: '62px 20px 10px', background: 'white', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>Step {step + 1} of {total}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Draft saved</div>
      </div>
      <div style={{ height: 4, borderRadius: 99, background: 'var(--cream-2)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--coral-500)', transition: 'width .4s' }}/>
      </div>
    </div>
  );
};

const MHead = ({ title, sub }) => (
  <div style={{ padding: '20px 20px 4px' }}>
    <div className="display" style={{ fontSize: 30, lineHeight: 1.05, letterSpacing: '-0.01em' }}>{title}</div>
    {sub && <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>{sub}</div>}
  </div>
);

const MCard = ({ children, style = {} }) => (
  <div style={{
    margin: '14px 20px 0', padding: 16,
    background: 'white', border: '1px solid var(--line)',
    borderRadius: 16,
    ...style,
  }}>{children}</div>
);

const MFooter = ({ primary, onPrimary, back, onBack }) => (
  <div style={{
    padding: '14px 20px 14px',
    background: 'white', borderTop: '1px solid var(--line)',
    display: 'flex', gap: 10,
  }}>
    {back && (
      <button className="btn btn-ghost" onClick={onBack} style={{ flex: '0 0 92px', justifyContent: 'center' }}>
        <Icon name="chevLeft" size={14}/>
      </button>
    )}
    <button className="btn btn-coral" onClick={onPrimary} style={{ flex: 1, justifyContent: 'center', height: 48 }}>
      {primary} <Icon name="arrowRight" size={14}/>
    </button>
  </div>
);

// ===== Mobile entry (listing) =====
const MListing = ({ onApply }) => {
  const p = DEMO_PROPERTY;
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100%' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 260 }}>
        <PhImg h={260} hue={p.heroHue} label={p.gallery[0].label} style={{ border: 'none', borderRadius: 0 }}/>
        <div style={{ position: 'absolute', top: 64, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center' }}>
            <Icon name="chevLeft" size={14}/>
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 99, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center' }}>
            <Icon name="heart" size={14}/>
          </button>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 12, padding: '5px 10px', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: 99, fontSize: 12, backdropFilter: 'blur(6px)' }}>
          1 / 12
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <span className="chip" style={{ background: 'var(--coral-100)', color: 'var(--coral-800)', border: 'none' }}>Newly listed</span>
          <span className="chip" style={{ background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', border: 'none' }}>Verified landlord</span>
        </div>
        <div className="display" style={{ fontSize: 32, lineHeight: 1.05 }}>{p.title}</div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{p.area}</div>

        <div style={{ display: 'flex', gap: 16, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rent</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>£{p.price.toLocaleString()}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bedrooms</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{p.beds}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Available</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{p.available}</div>
          </div>
        </div>

        {/* Match */}
        <div style={{ marginTop: 18, padding: 14, background: 'linear-gradient(135deg, var(--coral-50), white)', border: '1px solid var(--coral-200)', borderRadius: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
          <Ring value={94} size={56} color="coral" thickness={8}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: 'var(--coral-800)', fontWeight: 600 }}>94% match</div>
            <div style={{ fontSize: 12, color: 'var(--coral-700)', marginTop: 2, lineHeight: 1.4 }}>Strong fit on budget, pet policy, and tenancy length.</div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 18 }}>
          A quiet, south-facing flat on a cobbled mews. Two proper double bedrooms and a shared garden with a well-tended apple tree.
        </p>
      </div>

      {/* Sticky apply */}
      <div style={{
        position: 'sticky', bottom: 0, padding: '12px 16px 18px',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(14px)',
        borderTop: '1px solid var(--line)',
      }}>
        <button className="btn btn-coral" onClick={onApply} style={{ width: '100%', height: 50, justifyContent: 'center', fontSize: 16 }}>
          Apply to this home <Icon name="arrowRight" size={15}/>
        </button>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'center', marginTop: 8 }}>
          About 3 minutes · References auto-attached
        </div>
      </div>
    </div>
  );
};

// ===== Mobile steps =====
const MStep1 = () => {
  const p = DEMO_PROPERTY;
  return (
    <>
      <MHead title="Double-check the home." sub="Make sure everything matches what you want."/>
      <MCard style={{ padding: 0, overflow: 'hidden' }}>
        <PhImg h={140} hue={p.heroHue} label={p.gallery[0].label} style={{ borderRadius: 0, border: 'none' }}/>
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{p.title}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{p.area}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            <div><div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Rent</div><div style={{ fontSize: 14, fontWeight: 600 }}>£{p.price}/mo</div></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Deposit</div><div style={{ fontSize: 14, fontWeight: 600 }}>£{p.deposit}</div></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Term</div><div style={{ fontSize: 14, fontWeight: 600 }}>12 mo rolling</div></div>
            <div><div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Available</div><div style={{ fontSize: 14, fontWeight: 600 }}>{p.available}</div></div>
          </div>
        </div>
      </MCard>
      <MCard>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Your preferences</div>
        <div className="field"><label>Move-in date</label><input className="input" type="date" defaultValue="2026-05-01"/></div>
        <div className="field" style={{ marginTop: 10 }}><label>How long?</label>
          <select className="select"><option>12 months, rolling</option><option>24 months fixed</option></select>
        </div>
      </MCard>
    </>
  );
};

const MStep2 = () => (
  <>
    <MHead title="Who's moving in?" sub="Tell us about everyone who'll live here."/>
    <MCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: 'var(--coral-50)', borderRadius: 10, marginBottom: 12 }}>
        <Avatar name={TENANT.name} size={36} hue={TENANT.hue}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{TENANT.name}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>You · Lead tenant · Verified</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: '1px solid var(--line)', borderRadius: 10 }}>
        <Avatar name="Sam Okoye" size={36} hue={180}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Sam Okoye</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Partner</div>
        </div>
        <Icon name="chevRight" size={14} style={{ color: 'var(--ink-3)' }}/>
      </div>
      <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: 10, justifyContent: 'center' }}>
        <Icon name="plus" size={12}/> Add another
      </button>
    </MCard>
    <MCard>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Pets</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['None', '1 cat', '1 dog', 'Multiple'].map((o, i) => (
          <button key={o} className="chip" style={{
            height: 36, padding: '0 14px', fontSize: 13,
            background: i === 1 ? 'var(--ink)' : 'white',
            color: i === 1 ? 'var(--cream)' : 'var(--ink-2)',
            borderColor: i === 1 ? 'var(--ink)' : 'var(--line)',
          }}>{o}</button>
        ))}
      </div>
    </MCard>
  </>
);

const MStep3 = () => {
  const p = DEMO_PROPERTY;
  const ratio = Math.round((p.price / TENANT.income.monthlyNet) * 100);
  return (
    <>
      <MHead title="The numbers." sub="Pulled from your verified profile."/>
      <MCard style={{ background: 'linear-gradient(135deg, var(--coral-50), white)', border: '1px solid var(--coral-200)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Icon name="sparkles" size={12} style={{ color: 'var(--coral-600)' }}/>
          <span style={{ fontSize: 11, color: 'var(--coral-700)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Auto-filled</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Net monthly</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4 }}>£{TENANT.income.monthlyNet}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Rent ratio</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--ok)' }}>{ratio}%</div>
          </div>
        </div>
      </MCard>
      <MCard>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>Employment</span>
          <span className="chip" style={{ background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', border: 'none', height: 22, fontSize: 11 }}>Verified</span>
        </div>
        <div className="field"><label>Employer</label><input className="input" defaultValue="Monzo Bank"/></div>
        <div className="field" style={{ marginTop: 10 }}><label>Role</label><input className="input" defaultValue="Staff Product Designer"/></div>
      </MCard>
    </>
  );
};

const MStep4 = () => (
  <>
    <MHead title="References are attached." sub="Verified, ready to go."/>
    {TENANT.references.map((r, i) => (
      <MCard key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar name={r.who} size={36} hue={(i + 1) * 80}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{r.who}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.role}</div>
        </div>
        <span className="chip" style={{ background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', border: 'none', height: 22, fontSize: 11 }}>✓</span>
      </MCard>
    ))}
    <MCard style={{ border: '1px dashed var(--line-2)', background: 'color-mix(in oklab, white 70%, transparent)' }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>Add a character reference</div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Neighbour, friend, colleague. We'll send the request for you.</div>
      <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>
        <Icon name="plus" size={12}/> Add reference
      </button>
    </MCard>
  </>
);

const MStep5 = () => (
  <>
    <MHead title="ID & right to rent." sub="All verified — just confirm."/>
    {TENANT.docs.map((d, i) => (
      <MCard key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)' }}>
          <Icon name={d.kind.includes('Payslips') ? 'pound' : d.kind.includes('Photo') ? 'user' : 'shield'} size={16}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{d.kind}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{d.detail}</div>
        </div>
        <span className="chip" style={{ background: 'oklch(0.94 0.05 155)', color: 'oklch(0.30 0.12 155)', border: 'none', height: 22, fontSize: 11 }}>✓</span>
      </MCard>
    ))}
    <MCard style={{ background: 'var(--cream-2)', borderColor: 'var(--line)' }}>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', gap: 10 }}>
        <Icon name="lock" size={14} style={{ flexShrink: 0, marginTop: 2 }}/>
        Documents are encrypted and only shared with the landlord on submit.
      </div>
    </MCard>
  </>
);

const MStep6 = ({ cover, setCover }) => {
  useE(() => {
    if (!cover) setCover(`Hi Priya,\n\nThank you for considering me for 12 Harlow Mews. I'm drawn to the south-facing living room and the apple tree — both sold me on it.\n\nI've rented in London for three years and kept both flats in better nick than I found them. I'm a non-smoker, work hybrid at Monzo, and have one calm cat.\n\nWould love a viewing whenever suits.\n\nBest,\nAyo`);
  }, []); // eslint-disable-line
  return (
    <>
      <MHead title="A note to Priya." sub="We've drafted something. Edit, or rewrite."/>
      <div style={{ margin: '14px 20px 0' }}>
        <div style={{ background: 'var(--coral-50)', border: '1px solid var(--coral-200)', borderRadius: '14px 14px 0 0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="sparkles" size={12} style={{ color: 'var(--coral-600)' }}/>
          <span style={{ fontSize: 11, color: 'var(--coral-800)', fontWeight: 500 }}>AI draft</span>
          <span style={{ flex: 1 }}/>
          <button className="chip" style={{ height: 24, fontSize: 11 }}>Warmer</button>
          <button className="chip" style={{ height: 24, fontSize: 11 }}>Shorter</button>
        </div>
        <textarea
          value={cover || ''} onChange={e => setCover(e.target.value)}
          style={{
            width: '100%', minHeight: 240,
            border: '1px solid var(--coral-200)', borderTop: 'none',
            borderRadius: '0 0 14px 14px', padding: 14,
            fontSize: 14, lineHeight: 1.55, fontFamily: 'var(--font-ui)',
            outline: 'none', resize: 'none',
          }}
        />
      </div>
    </>
  );
};

const MStep7 = () => {
  const p = DEMO_PROPERTY;
  const items = [
    { i: 'home',    l: 'Property',       v: `${p.title} · £${p.price}/mo` },
    { i: 'calendar', l: 'Move-in',       v: `1 May · 12 mo rolling` },
    { i: 'users',   l: 'Household',      v: `1 + 1 co-tenant · 1 cat` },
    { i: 'pound',   l: 'Affordability',  v: `£4,850/mo · 49% ratio` },
    { i: 'shield',  l: 'References',     v: `3 verified, attached` },
    { i: 'key',     l: 'Right to rent',  v: `Verified` },
    { i: 'message', l: 'Cover letter',   v: `AI-drafted, edited` },
  ];
  return (
    <>
      <MHead title="One last look." sub="What the landlord will see."/>
      <MCard style={{ padding: 0, overflow: 'hidden' }}>
        {items.map((x, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderBottom: i < items.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)' }}>
              <Icon name={x.i} size={13}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase' }}>{x.l}</div>
              <div style={{ fontSize: 13, marginTop: 1 }}>{x.v}</div>
            </div>
          </div>
        ))}
      </MCard>
      <MCard style={{ background: 'linear-gradient(135deg, var(--coral-50), white)', border: '1px solid var(--coral-200)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Ring value={94} size={44} color="coral" thickness={7}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>4th of 12 · strongest so far</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Priya decides in a median of 3 days.</div>
        </div>
      </MCard>
    </>
  );
};

// ===== Mobile confirmation =====
const MDone = ({ onTrack }) => {
  const [ok, setOk] = useS(false);
  useE(() => { setTimeout(() => setOk(true), 200); }, []);
  return (
    <div style={{ padding: '110px 20px 40px', textAlign: 'center', background: 'var(--cream)', minHeight: '100%' }}>
      <div style={{
        width: 64, height: 64, borderRadius: 99, margin: '0 auto',
        background: 'var(--coral-500)', display: 'grid', placeItems: 'center', color: 'white',
        transform: ok ? 'scale(1)' : 'scale(0.4)', transition: 'transform .5s cubic-bezier(.34,1.56,.64,1)',
        boxShadow: '0 12px 28px -8px oklch(0.60 0.18 26 / 0.5)',
      }}>
        <Icon name="check" size={30} stroke={3}/>
      </div>
      <div className="display" style={{ fontSize: 34, marginTop: 22, lineHeight: 1.05 }}>
        Sent. Now the<br/>kettle bit.
      </div>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.6 }}>
        Priya has your application. She typically replies in <strong>3 days</strong>. We'll ping you.
      </p>
      <div style={{ margin: '24px 0', padding: 14, background: 'white', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
        <PhImg h={52} hue={DEMO_PROPERTY.heroHue} label="" style={{ width: 68, flexShrink: 0 }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{DEMO_PROPERTY.title}</div>
          <div style={{ fontSize: 11, color: 'var(--coral-700)', marginTop: 4 }}>#GL-8821 · just now</div>
        </div>
      </div>
      <button className="btn btn-coral" onClick={onTrack} style={{ width: '100%', height: 48, justifyContent: 'center' }}>
        Track application <Icon name="arrowRight" size={14}/>
      </button>
    </div>
  );
};

// ===== Mobile tracker =====
const MTracker = () => {
  const p = DEMO_PROPERTY;
  const stages = [
    { l: 'Sent', s: 'Today · 14:22', done: true, i: 'check' },
    { l: 'Opened by landlord', s: '18 mins later', done: true, i: 'eye' },
    { l: 'Under review', s: 'Priya is reading', done: true, current: true, i: 'clock' },
    { l: 'Shortlist decision', s: 'Expected Thu', done: false, i: 'star' },
    { l: 'Offer or close', s: '—', done: false, i: 'key' },
  ];
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100%' }}>
      <div style={{ padding: '62px 20px 14px', background: 'white', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="chevLeft" size={16}/>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Application</div>
      </div>
      <div style={{ padding: 20 }}>
        <span className="chip" style={{ background: 'var(--coral-100)', color: 'var(--coral-800)', border: 'none' }}>In review</span>
        <div className="display" style={{ fontSize: 28, marginTop: 10, lineHeight: 1.05 }}>{p.title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{p.area} · #GL-8821</div>

        <div style={{ marginTop: 22, padding: 18, background: 'white', border: '1px solid var(--line)', borderRadius: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Progress</div>
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div style={{ position: 'absolute', left: 10, top: 6, bottom: 6, width: 2, background: 'var(--line)' }}/>
            <div style={{ position: 'absolute', left: 10, top: 6, height: '50%', width: 2, background: 'var(--coral-500)' }}/>
            {stages.map((s, i) => (
              <div key={i} style={{ position: 'relative', paddingBottom: i < stages.length - 1 ? 16 : 0 }}>
                <div style={{
                  position: 'absolute', left: -28, top: -1,
                  width: 22, height: 22, borderRadius: 99,
                  background: s.done ? 'var(--coral-500)' : 'white',
                  border: s.done ? 'none' : '2px solid var(--line-2)',
                  display: 'grid', placeItems: 'center', color: s.done ? 'white' : 'var(--ink-3)',
                  boxSizing: 'border-box',
                  boxShadow: s.current ? '0 0 0 5px var(--coral-100)' : 'none',
                }}>
                  <Icon name={s.done ? 'check' : s.i} size={10} stroke={3}/>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: s.done ? 'var(--ink)' : 'var(--ink-3)' }}>{s.l}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{s.s}</div>
                {s.current && (
                  <div style={{ marginTop: 10, padding: 10, background: 'var(--coral-50)', borderRadius: 10, border: '1px solid var(--coral-200)', fontSize: 12, color: 'var(--coral-800)' }}>
                    <strong>ETA: 2–3 days.</strong> Priya's median is 3.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14, padding: 16, background: 'white', border: '1px solid var(--line)', borderRadius: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Priya</div>
          <div style={{ padding: '10px 12px', background: 'var(--cream-2)', borderRadius: '12px 12px 12px 4px', fontSize: 13, lineHeight: 1.5 }}>
            Thanks Ayo — lovely Home Story. Any chance you're around for a viewing Saturday morning?
          </div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4 }}>16 min ago</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <input className="input" placeholder="Reply…" style={{ flex: 1, height: 38, fontSize: 13 }}/>
            <button className="btn btn-coral btn-sm">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Container =====
const ApplyFlowMobile = () => {
  const [phase, setPhase] = useS('listing'); // listing | flow | done | tracker
  const [step, setStep] = useS(0);
  const [cover, setCover] = useS('');
  const total = 7;

  let content;
  if (phase === 'listing') {
    content = <MListing onApply={() => setPhase('flow')}/>;
  } else if (phase === 'done') {
    content = <MDone onTrack={() => setPhase('tracker')}/>;
  } else if (phase === 'tracker') {
    content = <MTracker/>;
  } else {
    const steps = [<MStep1/>, <MStep2/>, <MStep3/>, <MStep4/>, <MStep5/>, <MStep6 cover={cover} setCover={setCover}/>, <MStep7/>];
    const primaries = ['Continue', 'Continue', 'Continue', 'Continue', 'Confirm', 'Looks good', 'Send application'];
    content = (
      <div style={{ background: 'var(--cream)', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <MProgress step={step} total={total}/>
        <div style={{ flex: 1, overflow: 'auto', paddingBottom: 12 }}>{steps[step]}</div>
        <MFooter
          primary={primaries[step]}
          back={step > 0}
          onBack={() => setStep(step - 1)}
          onPrimary={() => {
            if (step < total - 1) setStep(step + 1);
            else setPhase('done');
          }}
        />
      </div>
    );
  }

  return content;
};

// Page renderer with iPhone frame
const ApplyMobilePage = () => {
  const { go } = useNav();
  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <button onClick={() => go('/apply')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
          <Icon name="chevLeft" size={14}/> All entries
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Apply journey · mobile</div>
            <div className="display" style={{ fontSize: 48, marginTop: 10, lineHeight: 1.05 }}>
              Same seven steps, in your pocket.
            </div>
            <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.6 }}>
              The mobile flow keeps every piece of the desktop application — match score, AI cover letter, the submit celebration, the live tracker — just restacked for a phone. Tap Apply on the listing and walk the whole way through.
            </p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { i: 'search', t: 'Start on the listing', s: 'Sticky Apply CTA over a hero image.' },
                { i: 'sparkles', t: 'AI draft + chip tweaks', s: 'Warmer · Shorter · More formal.' },
                { i: 'check', t: 'Soft celebration on send', s: 'Single-tap hop into the tracker.' },
                { i: 'clock', t: 'Live tracker', s: 'ETA based on landlord decision history.' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--coral-100)', display: 'grid', placeItems: 'center', color: 'var(--coral-700)', flexShrink: 0 }}>
                    <Icon name={x.i} size={14}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{x.t}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <IOSDevice width={390} height={840}>
              <ApplyFlowMobile/>
            </IOSDevice>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ApplyMobilePage, ApplyFlowMobile });
