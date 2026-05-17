/* global React, Icon, Avatar, Ring, PhImg, useNav, AppSidebar, AppTopbar, PropertyCard */
const { useState, useEffect, useMemo } = React;

// ===== Landlord overview =====
const LandlordOverview = () => {
  const { go } = useNav();
  return (
    <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Stats */}
      <div data-stats-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { label: 'Active listings', v: '3', delta: '+1', icon: 'building' },
          { label: 'Applicants', v: '24', delta: '+6 today', icon: 'users' },
          { label: 'Avg. Care Score', v: '84', delta: 'high', icon: 'spark' },
          { label: 'Vacancy days', v: '12', delta: '−4 vs. avg', icon: 'clock' },
        ].map((s, i) => (
          <div key={i} data-stat-card className="solid-card" style={{ padding: 22 }}>
            <div data-stat-head style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
                <Icon name={s.icon} size={16}/>
              </div>
              <span className="chip chip-ok">{s.delta}</span>
            </div>
            <div className="display" style={{ fontSize: 44, marginTop: 14 }}>{s.v}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Featured applicant */}
      <div data-featured-grid style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div data-top-match className="solid-card" style={{ padding: 28 }}>
          <div data-top-match-head style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20, gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Top match today</div>
              <div className="display" style={{ fontSize: 28, marginTop: 4 }}>Ayo & Sam want your place.</div>
            </div>
            <span className="chip chip-verified"><Icon name="check" size={12}/> Verified</span>
          </div>
          <div data-top-match-body style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
            <Avatar name="Ayo Bankole" size={80} hue={30}/>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Ayo & Sam Bankole</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Applying to · 12 Harlow Mews</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                <span className="chip chip-coral">3 yr tenant</span>
                <span className="chip chip-coral">1 cat</span>
                <span className="chip chip-coral">Painted, gardened</span>
                <span className="chip chip-ok">Care Score 92</span>
              </div>
            </div>
            <div data-top-match-ring><Ring value={94} size={120} label="match" color="coral"/></div>
          </div>
          <div data-top-match-actions style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button className="btn btn-coral" onClick={() => go('/app/landlord/offer/ayo')}>Offer tenancy</button>
            <button className="btn btn-ghost">Message</button>
            <button className="btn btn-ghost" onClick={() => go('/app/landlord/applicant/ayo')}>View full profile <Icon name="arrowRight" size={14}/></button>
          </div>
        </div>

        <div className="solid-card" style={{ padding: 24 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 14 }}>Activity</div>
          {[
            { t: 'Priya S. applied to 12 Harlow Mews', when: '10m', icon: 'bookmark' },
            { t: 'R. Khan left a reference', when: '1h', icon: 'star' },
            { t: 'Viewing booked · Sat 11am', when: '2h', icon: 'calendar' },
            { t: 'T. Okafor messaged you', when: '4h', icon: 'message' },
            { t: '6 new in-market tenants in Hackney', when: 'today', icon: 'users' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)' }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--cream-2)', display: 'grid', placeItems: 'center', color: 'var(--ink-2)' }}>
                <Icon name={a.icon} size={13}/>
              </div>
              <div style={{ flex: 1, fontSize: 13 }}>{a.t}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{a.when}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My listings */}
      <div>
        <div data-section-head style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, gap: 12 }}>
          <div className="display" style={{ fontSize: 28 }}>Your listings</div>
          <button className="btn btn-primary btn-sm" onClick={() => go('/app/landlord/listings')}>
            <Icon name="plus" size={14}/> New listing
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { title: '12 Harlow Mews', area: 'Hackney, E8', price: '£2,400', beds: 2, baths: 1, sqft: 780, apps: 9, hue: 30 },
            { title: 'Flat 3, Ashby Rd', area: 'Clapton, E5', price: '£2,150', beds: 2, baths: 1, sqft: 720, apps: 7, hue: 50 },
            { title: '8 Willowbrook Ct', area: 'Brixton, SW2', price: '£1,950', beds: 1, baths: 1, sqft: 520, apps: 8, hue: 10 },
          ].map((p, i) => (
            <div key={i} className="solid-card" style={{ padding: 14 }}>
              <div style={{ position: 'relative' }}>
                <PhImg label={p.title} h={160} hue={p.hue}/>
                <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 99, background: 'oklch(0.22 0.02 30 / 0.75)', color: 'white', fontSize: 11, backdropFilter: 'blur(8px)' }}>
                  Live
                </div>
              </div>
              <div style={{ padding: '14px 6px 6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{p.area}</div>
                  </div>
                  <div className="display" style={{ fontSize: 20 }}>{p.price}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 12, color: 'var(--ink-2)' }}>
                  <span>{p.beds} bed · {p.baths} bath · {p.sqft} ft²</span>
                  <span className="chip chip-coral" style={{ height: 22, fontSize: 11 }}>{p.apps} applicants</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== Applicants grid =====
const LandlordApplicants = () => {
  const { go } = useNav();
  const applicants = [
    { id: 'ayo',   n: 'Ayo & Sam Bankole', score: 94, care: 92, tags: ['3 yr · pet', 'Verified', 'Painted'], hue: 30, ref: 'Priya Desai · Clapton' },
    { id: 'priya', n: 'Priya S.', score: 88, care: 86, tags: ['2 yr', 'Verified', 'Gardener'], hue: 330, ref: 'Oakhouse Lettings' },
    { id: 'tolu',  n: 'T. Okafor', score: 82, care: 80, tags: ['4 yr · family', 'Verified'], hue: 200, ref: 'M. Thorpe' },
    { id: 'james', n: 'James & Lena', score: 79, care: 76, tags: ['First-time', 'Guarantor'], hue: 260, ref: 'Employer ref' },
    { id: 'moh',   n: 'M. Hossain', score: 75, care: 74, tags: ['Relocating', 'Verified'], hue: 170, ref: 'University ref' },
    { id: 'sara',  n: 'Sara A.', score: 72, care: 70, tags: ['2 yr', 'No pet'], hue: 80, ref: 'M. Lee' },
  ];

  return (
    <div style={{ padding: '24px 36px' }}>
      <div className="tabs" style={{ marginBottom: 18 }}>
        <button className="on">All (24)</button>
        <button>Shortlist (3)</button>
        <button>Messaged</button>
        <button>Declined</button>
      </div>

      <div className="solid-card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', flex: 1, minWidth: 200 }}>
          <Icon name="search" size={16} style={{ color: 'var(--ink-3)' }}/>
          <input placeholder="Filter by name, tag, score…" style={{ border: 'none', outline: 'none', fontSize: 15, width: '100%' }}/>
        </div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>12 Harlow Mews <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>Care Score 75+ <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>Verified only <Icon name="chevDown" size={12}/></div>
        <button className="btn btn-ghost btn-sm">Sort: Match <Icon name="chevDown" size={12}/></button>
        <button className="btn btn-coral btn-sm" onClick={() => go('/app/landlord/compare')}>
          <Icon name="users" size={13}/> Compare top 3
        </button>
      </div>

      <div className="grid-applicants">
        {applicants.map((a, i) => <ApplicantCard key={i} a={a}/>)}
      </div>
    </div>
  );
};

const ApplicantCard = ({ a }) => {
  const { go } = useNav();
  const open = () => a.id && go('/app/landlord/applicant/' + a.id);
  return (
  <div className="solid-card" onClick={open} style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, cursor: a.id ? 'pointer' : 'default', transition: 'transform .12s, box-shadow .12s' }}
       onMouseEnter={e => { if (a.id) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px -12px oklch(0.5 0.1 30 / 0.25)'; } }}
       onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <Avatar name={a.n} size={52} hue={a.hue}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.n}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Ref: {a.ref}</div>
      </div>
      <Ring value={a.score} size={56} color="coral" thickness={10}/>
    </div>
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {a.tags.map(t => <span key={t} className="chip chip-coral" style={{ height: 22, fontSize: 10 }}>{t}</span>)}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 12, background: 'var(--cream-2)', marginTop: 'auto' }}>
      <div>
        <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>Care Score</div>
        <div className="display" style={{ fontSize: 24, color: 'var(--coral-700)' }}>{a.care}</div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--ink-3)', textAlign: 'right' }}>
        Top 15%<br/>in Hackney
      </div>
    </div>
    <div data-applicant-actions style={{ display: 'flex', gap: 8, alignItems: 'stretch' }} onClick={e => e.stopPropagation()}>
      <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Shortlist</button>
      <button className="btn btn-ghost btn-sm" aria-label="Message" style={{ flex: '0 0 40px', padding: 0 }}><Icon name="message" size={13}/></button>
      <button className="btn btn-ghost btn-sm" aria-label="View profile" onClick={open} style={{ flex: '0 0 40px', padding: 0 }}><Icon name="eye" size={13}/></button>
    </div>
  </div>
  );
};

// ===== Scout tenants (signature feature) =====
const LandlordScout = () => {
  const tenants = [
    { n: 'Ayo & Maya Bankole', score: 92, budget: '£2,000–2,500', areas: 'Hackney, Clapton', tags: ['2 bed', 'Cat', '12mo+'], hue: 30 },
    { n: 'Priya S.', score: 86, budget: '£1,800–2,200', areas: 'Dalston, Clapton', tags: ['1–2 bed', 'No pet', '12mo+'], hue: 330 },
    { n: 'T. Okafor family', score: 80, budget: '£2,400–2,900', areas: 'Walthamstow, Leyton', tags: ['3 bed', 'Family', '24mo+'], hue: 200 },
    { n: 'James & Lena', score: 76, budget: '£1,600–2,000', areas: 'Peckham, Camberwell', tags: ['1 bed', 'Couple', '6–12mo'], hue: 260 },
  ];
  return (
    <div style={{ padding: '24px 36px' }}>
      <div data-scout-hero className="solid-card" style={{ padding: 24, marginBottom: 20, display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center',
                                            background: 'linear-gradient(135deg, oklch(0.94 0.06 30), oklch(0.96 0.04 50))' }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Signature feature</div>
          <div className="display" style={{ fontSize: 32, marginTop: 6 }}>Scout live tenants.</div>
          <div style={{ fontSize: 14, color: 'var(--ink-2)', maxWidth: 640, marginTop: 6 }}>
            Tenants with live profiles who match your property criteria. No listing required — reach out directly.
          </div>
        </div>
        <button className="btn btn-coral">
          <Icon name="sparkles" size={14}/> Run AI match
        </button>
      </div>

      <div className="solid-card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', flex: 1, minWidth: 200 }}>
          <Icon name="search" size={16} style={{ color: 'var(--ink-3)' }}/>
          <input placeholder="Find tenants matching your criteria…" style={{ border: 'none', outline: 'none', fontSize: 15, width: '100%' }}/>
        </div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>Hackney / Clapton <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>Budget £2k+ <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>2 bed <Icon name="chevDown" size={12}/></div>
        <div className="chip chip-ok" style={{ height: 34, padding: '0 14px' }}>Live only</div>
      </div>

      <div className="solid-card" data-scout-table style={{ padding: '4px 0' }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Tenant</th>
              <th>Budget</th>
              <th>Areas</th>
              <th>Looking for</th>
              <th>Care Score</th>
              <th style={{ textAlign: 'right', paddingRight: 20 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t, i) => (
              <tr key={i} className="clickable">
                <td style={{ paddingLeft: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={t.n} size={40} hue={t.hue}/>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {t.n}
                        <span style={{ width: 7, height: 7, borderRadius: 99, background: 'oklch(0.68 0.14 155)', boxShadow: '0 0 0 3px oklch(0.68 0.14 155 / 0.25)' }}/>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Live · searching</div>
                    </div>
                  </div>
                </td>
                <td>{t.budget}</td>
                <td>{t.areas}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {t.tags.map(tg => <span key={tg} className="chip" style={{ height: 22, fontSize: 11 }}>{tg}</span>)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="display" style={{ fontSize: 24, color: 'var(--coral-700)' }}>{t.score}</div>
                    <div style={{ width: 60, height: 4, borderRadius: 99, background: 'var(--line)', overflow: 'hidden' }}>
                      <div style={{ width: `${t.score}%`, height: '100%', background: 'var(--coral-500)' }}/>
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right', paddingRight: 20 }}>
                  <button className="btn btn-coral btn-sm">Invite to apply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked scout cards */}
      <div data-scout-mobile style={{ display: 'none', flexDirection: 'column', gap: 12 }}>
        {tenants.map((t, i) => (
          <div key={i} className="solid-card" style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name={t.n} size={42} hue={t.hue}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t.n}
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: 'oklch(0.68 0.14 155)', boxShadow: '0 0 0 3px oklch(0.68 0.14 155 / 0.25)', flexShrink: 0 }}/>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Live · searching</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Care</div>
                <div className="display" style={{ fontSize: 20, color: 'var(--coral-700)', lineHeight: 1 }}>{t.score}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '8px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Budget</div>
                <div style={{ fontSize: 12, marginTop: 2 }}>{t.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Areas</div>
                <div style={{ fontSize: 12, marginTop: 2 }}>{t.areas}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {t.tags.map(tg => <span key={tg} className="chip" style={{ height: 22, fontSize: 11 }}>{tg}</span>)}
            </div>
            <button className="btn btn-coral btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Invite to apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== Listings page =====
const LandlordListings = () => {
  const listings = [
    { title: '12 Harlow Mews', area: 'Hackney, E8', price: '£2,400', beds: 2, baths: 1, sqft: 780, status: 'Live', apps: 9, views: 284, hue: 30 },
    { title: 'Flat 3, Ashby Rd', area: 'Clapton, E5', price: '£2,150', beds: 2, baths: 1, sqft: 720, status: 'Live', apps: 7, views: 196, hue: 50 },
    { title: '8 Willowbrook Ct', area: 'Brixton, SW2', price: '£1,950', beds: 1, baths: 1, sqft: 520, status: 'Live', apps: 8, views: 211, hue: 10 },
    { title: '22 Cumberland Rd', area: 'Walthamstow, E17', price: '£1,850', beds: 2, baths: 1, sqft: 650, status: 'Draft', apps: 0, views: 0, hue: 100 },
  ];
  return (
    <div style={{ padding: '24px 36px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
        <button className="btn btn-coral"><Icon name="plus" size={14}/> New listing</button>
      </div>
      <div className="solid-card" data-listings-table style={{ padding: '4px 0' }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Property</th>
              <th>Rent</th>
              <th>Status</th>
              <th>Applicants</th>
              <th>Views</th>
              <th>Conversion</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l, i) => (
              <tr key={i} className="clickable">
                <td style={{ paddingLeft: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 10, overflow: 'hidden' }}>
                      <PhImg label="" h={50} hue={l.hue}/>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{l.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{l.area} · {l.beds} bed · {l.sqft} ft²</div>
                    </div>
                  </div>
                </td>
                <td><span className="display" style={{ fontSize: 20 }}>{l.price}</span></td>
                <td>
                  <span className={`chip ${l.status === 'Live' ? 'chip-ok' : ''}`}>
                    {l.status === 'Live' && <span style={{ width: 6, height: 6, borderRadius: 99, background: 'oklch(0.68 0.14 155)' }}/>}
                    {l.status}
                  </span>
                </td>
                <td>{l.apps}</td>
                <td>{l.views}</td>
                <td>{l.views > 0 ? `${Math.round(l.apps/l.views*100)}%` : '—'}</td>
                <td><Icon name="chevRight" size={14} style={{ color: 'var(--ink-3)' }}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked listing cards */}
      <div data-listings-mobile style={{ display: 'none', flexDirection: 'column', gap: 12 }}>
        {listings.map((l, i) => (
          <button key={i} className="solid-card" style={{ padding: 14, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 54, height: 54, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <PhImg label="" h={54} hue={l.hue}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{l.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{l.area} · {l.beds} bed · {l.sqft} ft²</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="display" style={{ fontSize: 18 }}>{l.price}</div>
                <span className={`chip ${l.status === 'Live' ? 'chip-ok' : ''}`} style={{ height: 22, fontSize: 11, marginTop: 4 }}>
                  {l.status === 'Live' && <span style={{ width: 5, height: 5, borderRadius: 99, background: 'oklch(0.68 0.14 155)' }}/>}
                  {l.status}
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 0 0', borderTop: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Applicants</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{l.apps}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Views</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{l.views}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Conversion</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{l.views > 0 ? `${Math.round(l.apps/l.views*100)}%` : '—'}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ===== Landlord page switcher =====
const LandlordApp = () => {
  const { route } = useNav();

  // Full-screen deep routes — bypass sidebar+topbar chrome
  if (route.startsWith('/app/landlord/applicant/')) return <LandlordApplicantProfile/>;
  if (route.startsWith('/app/landlord/compare'))    return <LandlordApplicantCompare/>;
  if (route.startsWith('/app/landlord/offer/'))     return <LandlordOfferFlow/>;

  const sub = route.replace('/app/landlord', '').replace(/^\//, '') || 'overview';
  const titles = {
    overview: 'Hello, Rahim',
    listings: 'Your listings',
    applicants: 'Applicants',
    scout: 'Scout tenants',
    messages: 'Messages',
  };
  const pages = {
    overview: <LandlordOverview/>,
    listings: <LandlordListings/>,
    applicants: <LandlordApplicants/>,
    scout: <LandlordScout/>,
    messages: <LandlordMessagesPlaceholder/>,
  };
  return (
    <div data-app-layout style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="quiet-bg"/>
      <AppSidebar role="landlord"/>
      <main style={{ flex: 1, minWidth: 0 }}>
        <AppTopbar title={titles[sub] || 'Dashboard'}>
          <button className="btn btn-primary btn-sm" data-app-topbar-cta>
            <Icon name="plus" size={14}/> New listing
          </button>
        </AppTopbar>
        {pages[sub] || <LandlordOverview/>}
      </main>
    </div>
  );
};

const LandlordMessagesPlaceholder = () => (
  <div style={{ padding: '32px 36px' }}>
    <div className="solid-card" style={{ padding: 60, textAlign: 'center' }}>
      <Icon name="message" size={40} style={{ color: 'var(--coral-500)', margin: '0 auto' }}/>
      <div className="display" style={{ fontSize: 28, marginTop: 16 }}>Conversations with applicants</div>
      <div style={{ color: 'var(--ink-2)', marginTop: 8 }}>When applicants message you, they'll show up here.</div>
    </div>
  </div>
);

Object.assign(window, { LandlordApp });
