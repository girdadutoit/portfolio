/* global React, Icon, Avatar, Ring, PhImg, useNav, BackButton, APPLICANTS, Card, VerifiedChip */
const { useState: useCS } = React;

/* Side-by-side comparison — the landlord's power tool. */
const LandlordApplicantCompare = () => {
  const { go } = useNav();
  const [ids] = useCS(['ayo', 'priya', 'tolu']);
  const list = ids.map(id => APPLICANTS.find(a => a.id === id));

  const rows = [
    { label: 'Match to your home',  kind: 'ring',    get: a => a.match, color: 'coral' },
    { label: 'Care Score',          kind: 'bignum',  get: a => a.care, suffix: '/100' },
    { label: 'Move-in date',        kind: 'text',    get: a => a.moveIn },
    { label: 'Household',           kind: 'text',    get: a => a.coTenant ? `2 adults` : '1 adult' },
    { label: 'Pets',                kind: 'text',    get: a => a.pets },
    { label: 'Net income / mo',     kind: 'text',    get: a => `£${a.income.net.toLocaleString()}` },
    { label: 'Rent ratio',          kind: 'ratio',   get: a => ({ ratio: a.income.ratio, band: a.ratioBand }) },
    { label: 'Credit',              kind: 'text',    get: a => `${a.creditScore} · ${a.creditStatus}` },
    { label: 'Right to Rent',       kind: 'chip',    get: () => 'verified' },
    { label: 'Employment',          kind: 'chip',    get: () => 'verified' },
    { label: 'References',          kind: 'text',    get: a => a.id === 'ayo' ? '3 verified, all 5★' : a.id === 'priya' ? '2 verified, all 5★' : '3 verified, 4.6★ avg' },
    { label: 'Tenure stability',    kind: 'text',    get: a => a.id === 'ayo' ? '3 tenancies · 9 yrs' : a.id === 'priya' ? '2 tenancies · 5 yrs' : '2 tenancies · 7 yrs' },
    { label: 'Applied',             kind: 'text',    get: a => a.applied },
  ];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(252,250,246,0.9)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 36px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <BackButton variant="ghost" label="All applicants" fallback="/app/landlord/applicants"/>
          <span style={{ color: 'var(--line-2)' }}>/</span>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Compare applicants · 12 Harlow Mews</div>
          <div style={{ flex: 1 }}/>
          <button className="btn btn-ghost btn-sm"><Icon name="plus" size={13}/> Add another</button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 36px 80px' }}>
        <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>Decide on evidence</div>
        <div className="display" style={{ fontSize: 44, lineHeight: 1.05, marginTop: 6, letterSpacing: '-0.01em' }}>
          Three candidates. Side-by-side.
        </div>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 10, maxWidth: 680, lineHeight: 1.55 }}>
          The strongest signals in each row are highlighted. All data is verified at source.
        </p>

        {/* Grid: left column is labels, right columns are applicants */}
        <div style={{ marginTop: 36, background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px repeat(3, 1fr)', background: 'var(--cream-2)', borderBottom: '1px solid var(--line)' }}>
            <div style={{ padding: 24, fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>Applicant</div>
            {list.map((a, i) => (
              <div key={a.id} style={{ padding: 24, borderLeft: '1px solid var(--line)', position: 'relative' }}>
                {i === 0 && <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--coral-700)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>★ Top pick</div>}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                  <Avatar name={a.name} size={52} hue={a.hue}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.role.split(' · ')[0]}</div>
                  </div>
                </div>
                <button onClick={() => go('/app/landlord/applicant/' + a.id)} className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                  Open full profile
                </button>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((r, ri) => {
            // Find winning value(s) for highlighting
            const vals = list.map(r.get);
            let winnerIdx = -1;
            if (r.kind === 'ring' || r.kind === 'bignum') {
              const max = Math.max(...vals);
              winnerIdx = vals.indexOf(max);
            } else if (r.kind === 'ratio') {
              const min = Math.min(...vals.map(v => v.ratio));
              winnerIdx = vals.findIndex(v => v.ratio === min);
            }

            return (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: '220px repeat(3, 1fr)', borderBottom: ri < rows.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ padding: '18px 24px', fontSize: 13, color: 'var(--ink-2)', background: 'color-mix(in oklab, var(--cream-2) 50%, transparent)', display: 'flex', alignItems: 'center' }}>
                  {r.label}
                </div>
                {list.map((a, i) => {
                  const v = vals[i];
                  const winning = winnerIdx === i;
                  return (
                    <div key={a.id} style={{
                      padding: '18px 24px',
                      borderLeft: '1px solid var(--line)',
                      background: winning ? 'var(--coral-50)' : 'white',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      {r.kind === 'ring' && (
                        <>
                          <Ring value={v} size={44} color="coral" thickness={8}/>
                          <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', color: winning ? 'var(--coral-700)' : 'var(--ink)' }}>{v}%</div>
                        </>
                      )}
                      {r.kind === 'bignum' && (
                        <div style={{ fontSize: 26, fontFamily: 'var(--font-display)', color: winning ? 'var(--coral-700)' : 'var(--ink)' }}>{v}<span style={{ fontSize: 14, color: 'var(--ink-3)', marginLeft: 2 }}>{r.suffix}</span></div>
                      )}
                      {r.kind === 'text' && (
                        <div style={{ fontSize: 14, color: 'var(--ink)' }}>{v}</div>
                      )}
                      {r.kind === 'ratio' && (
                        <>
                          <div style={{ fontSize: 22, fontFamily: 'var(--font-display)', color: v.band === 'ok' ? 'var(--ok)' : 'oklch(0.55 0.15 50)' }}>{v.ratio}%</div>
                          <div style={{ flex: 1, height: 6, background: 'var(--cream-2)', borderRadius: 99, overflow: 'hidden', marginLeft: 8 }}>
                            <div style={{ width: `${v.ratio}%`, height: '100%', background: v.band === 'ok' ? 'var(--ok)' : 'oklch(0.60 0.14 50)' }}/>
                          </div>
                        </>
                      )}
                      {r.kind === 'chip' && <VerifiedChip/>}
                      {winning && <Icon name="sparkles" size={14} style={{ color: 'var(--coral-600)', marginLeft: 'auto' }}/>}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Decision row */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px repeat(3, 1fr)', borderTop: '2px solid var(--ink)' }}>
            <div style={{ padding: '20px 24px', fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, background: 'var(--cream-2)', display: 'flex', alignItems: 'center' }}>Action</div>
            {list.map((a, i) => (
              <div key={a.id} style={{ padding: 20, borderLeft: '1px solid var(--line)', background: i === 0 ? 'color-mix(in oklab, var(--coral-50) 60%, white)' : 'white' }}>
                <button onClick={() => go('/app/landlord/offer/' + a.id)} className={i === 0 ? 'btn btn-coral' : 'btn btn-ghost'} style={{ width: '100%', justifyContent: 'center' }}>
                  {i === 0 ? 'Offer tenancy' : 'Shortlist'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary narrative */}
        <div style={{ marginTop: 32, padding: 28, background: 'linear-gradient(135deg, var(--coral-50), white)', border: '1px solid var(--coral-200)', borderRadius: 'var(--r-lg)' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--coral-500)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <Icon name="sparkles" size={18}/>
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>GoodLet's take</div>
              <div className="display" style={{ fontSize: 24, marginTop: 4, lineHeight: 1.3 }}>Ayo & Sam are the strongest fit, on evidence.</div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 8, maxWidth: 720 }}>
                They win on Care Score, landlord references, and tenure stability. Priya wins on credit and affordability but has a shorter rental history. Tolu is strong on references but rent would be 57% of net income — above your 55% comfort line.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LandlordApplicantCompare });
