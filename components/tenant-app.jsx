/* global React, Icon, Avatar, Ring, PhImg, Logo, useNav */
const { useState, useEffect, useMemo } = React;

// ===== App sidebar =====
const AppSidebar = ({ role = 'tenant' }) => {
  const { go, route } = useNav();
  const tenantNav = [
    { id: 'overview', icon: 'home', label: 'Overview', to: '/app/tenant' },
    { id: 'profile', icon: 'user', label: 'My profile', to: '/app/tenant/profile' },
    { id: 'homestory', icon: 'image', label: 'Home Story', to: '/app/tenant/home-story' },
    { id: 'search', icon: 'search', label: 'Search homes', to: '/app/tenant/search' },
    { id: 'apps', icon: 'bookmark', label: 'Applications', to: '/app/tenant/applications' },
    { id: 'msg', icon: 'message', label: 'Messages', to: '/app/tenant/messages' },
  ];
  const landlordNav = [
    { id: 'overview', icon: 'home', label: 'Overview', to: '/app/landlord' },
    { id: 'listings', icon: 'building', label: 'Listings', to: '/app/landlord/listings' },
    { id: 'applicants', icon: 'users', label: 'Applicants', to: '/app/landlord/applicants' },
    { id: 'scout', icon: 'search', label: 'Scout tenants', to: '/app/landlord/scout' },
    { id: 'msg', icon: 'message', label: 'Messages', to: '/app/landlord/messages' },
  ];
  const nav = role === 'tenant' ? tenantNav : landlordNav;

  return (
    <aside data-app-sidebar aria-label={role === 'tenant' ? 'Tenant navigation' : 'Landlord navigation'} style={{
      width: 240, flexShrink: 0,
      padding: '24px 18px',
      borderRight: '1px solid var(--line)',
      background: 'color-mix(in oklab, white 70%, transparent)',
      backdropFilter: 'blur(20px)',
      display: 'flex', flexDirection: 'column', gap: 4,
      position: 'sticky', top: 0, height: '100vh',
    }}>
      <div style={{ padding: '4px 8px 20px' }}>
        <Logo onClick={() => go('/')} size={20}/>
      </div>

      <nav data-sidebar-nav aria-label="Primary" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {nav.map(n => (
        <button key={n.id} onClick={() => go(n.to)}
                aria-current={route === n.to ? 'page' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10, textAlign: 'left',
                  fontSize: 14, fontWeight: 500,
                  color: route === n.to ? 'var(--ink)' : 'var(--ink-2)',
                  background: route === n.to ? 'var(--coral-100)' : 'transparent',
                  transition: 'background .15s',
                  whiteSpace: 'nowrap',
                }}>
          <Icon name={n.icon} size={16}/>
          {n.label}
        </button>
      ))}
      </nav>

      <div data-sidebar-footer style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'flex-end' }}>
      <div style={{ padding: 12, borderRadius: 14, background: 'var(--coral-100)', border: '1px solid var(--coral-200)' }}>
        <div style={{ fontSize: 12, color: 'var(--coral-800)', fontWeight: 500 }}>Your profile is</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: 'oklch(0.68 0.14 155)', boxShadow: '0 0 0 4px oklch(0.68 0.14 155 / 0.25)' }}/>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Live to landlords</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--coral-800)', marginTop: 8 }}>
          3 landlords viewed today
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', marginTop: 6 }}>
        <Avatar name="Ayo Bankole" size={30} hue={30}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Ayo Bankole</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Tenant Pro</div>
        </div>
        <Icon name="settings" size={14} style={{ color: 'var(--ink-3)' }}/>
      </div>
      </div>
    </aside>
  );
};

// ===== App top bar =====
const AppTopbar = ({ title, children }) => (
  <div style={{
    padding: '20px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1px solid var(--line)', background: 'color-mix(in oklab, white 65%, transparent)',
    backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div>
      <div className="display" style={{ fontSize: 32 }}>{title}</div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {children}
      <div style={{ width: 38, height: 38, borderRadius: 12, border: '1px solid var(--line)', background: 'white', display: 'grid', placeItems: 'center', position: 'relative' }}>
        <Icon name="bell" size={16}/>
        <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 99, background: 'var(--coral-500)', boxShadow: '0 0 0 2px white' }}/>
      </div>
    </div>
  </div>
);

// ===== Tenant Overview =====
const TenantOverview = () => {
  const { go } = useNav();
  const [isLive, setIsLive] = useState(true);

  const completeness = [
    { k: 'Basic info', d: 100 },
    { k: 'Home Story (3 homes)', d: 85 },
    { k: 'Verified references (2 of 3)', d: 67 },
    { k: 'Lease preferences', d: 100 },
    { k: 'ID & right to rent', d: 100 },
  ];
  const overall = Math.round(completeness.reduce((s, c) => s + c.d, 0) / completeness.length);

  return (
    <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Go Live banner */}
      <div style={{
        padding: 24, borderRadius: 24,
        background: isLive
          ? 'linear-gradient(135deg, oklch(0.24 0.02 30) 0%, oklch(0.18 0.04 30) 100%)'
          : 'white',
        color: isLive ? 'var(--cream)' : 'var(--ink)',
        border: isLive ? 'none' : '1px solid var(--line)',
        boxShadow: 'var(--sh-md)',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {isLive && <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'oklch(0.72 0.16 30 / 0.35)', filter: 'blur(60px)', right: -50, top: -80 }}/>}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: isLive ? 'oklch(0.78 0.15 150)' : 'var(--ink-4)', boxShadow: isLive ? '0 0 0 4px oklch(0.78 0.15 150 / 0.35)' : 'none' }}/>
            {isLive ? 'You are live' : 'You are offline'}
          </div>
          <div className="display" style={{ fontSize: 32, marginTop: 10, lineHeight: 1.1 }}>
            {isLive ? 'Landlords can find you.' : 'Flip the switch when you’re searching.'}
          </div>
          <div style={{ marginTop: 8, fontSize: 14, opacity: 0.8 }}>
            {isLive ? '12 profile views · 3 shortlists · 1 viewing request this week' : 'Your profile is saved but hidden from landlord scouting.'}
          </div>
        </div>
        <button onClick={() => setIsLive(!isLive)}
                style={{
                  width: 68, height: 38, borderRadius: 99, position: 'relative',
                  background: isLive ? 'oklch(0.78 0.15 150)' : 'oklch(0.5 0.02 30)',
                  transition: 'background .2s',
                }}>
          <span style={{
            position: 'absolute', top: 4, left: isLive ? 34 : 4, width: 30, height: 30, borderRadius: 99,
            background: 'white', transition: 'left .2s', boxShadow: '0 2px 6px oklch(0 0 0 / 0.2)',
          }}/>
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 20 }}>
        {/* Care Score card */}
        <div className="solid-card" style={{ padding: 28, display: 'flex', alignItems: 'center', gap: 28 }}>
          <Ring value={92} size={150} label="care score" color="coral" thickness={10}/>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>Your Care Score</div>
            <div className="display" style={{ fontSize: 26, marginTop: 8, lineHeight: 1.15 }}>Top 8% of tenants in London.</div>
            <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-2)' }}>
              Built from 2 verified references, 3 years of rental history, and 4 documented improvements.
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}>
              See breakdown <Icon name="arrowRight" size={14}/>
            </button>
          </div>
        </div>

        {/* Completeness */}
        <div className="solid-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>Profile strength</div>
            <span className="chip chip-coral">{overall}%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {completeness.map(c => (
              <div key={c.k}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: 'var(--ink-2)' }}>{c.k}</span>
                  <span style={{ color: c.d === 100 ? 'oklch(0.55 0.14 155)' : 'var(--ink-3)', fontWeight: 500 }}>
                    {c.d === 100 ? '✓' : `${c.d}%`}
                  </span>
                </div>
                <div style={{ height: 4, borderRadius: 99, background: 'var(--line)', overflow: 'hidden' }}>
                  <div style={{ width: `${c.d}%`, height: '100%', background: c.d === 100 ? 'oklch(0.68 0.14 155)' : 'var(--coral-500)', transition: 'width .4s' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="solid-card" style={{ padding: 24 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 16 }}>This week</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <StatRow icon="eye" label="Profile views" value="12" delta="+4"/>
            <StatRow icon="bookmark" label="Shortlists" value="3" delta="+1"/>
            <StatRow icon="message" label="Messages" value="2" delta="new"/>
            <StatRow icon="calendar" label="Viewing requests" value="1" delta="new"/>
          </div>
        </div>
      </div>

      {/* Recommended properties */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
          <div>
            <div className="display" style={{ fontSize: 28 }}>Homes that match you</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>Based on your lease, pet, budget and neighbourhood preferences.</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => go('/app/tenant/search')}>
            View all <Icon name="arrowRight" size={14}/>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { id: 1, title: '12 Harlow Mews', area: 'Hackney, E8', price: '£2,400', beds: 2, baths: 1, sqft: 780, score: 94, hue: 30 },
            { id: 2, title: 'Flat 3, Ashby Rd', area: 'Clapton, E5', price: '£2,150', beds: 2, baths: 1, sqft: 720, score: 88, hue: 50 },
            { id: 3, title: '4B Morton Terrace', area: 'Walthamstow, E17', price: '£1,850', beds: 2, baths: 1, sqft: 680, score: 81, hue: 10 },
          ].map(p => <PropertyCard key={p.id} p={p}/>)}
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ icon, label, value, delta }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--coral-100)', color: 'var(--coral-700)', display: 'grid', placeItems: 'center' }}>
      <Icon name={icon} size={15}/>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 500 }}>{value}</div>
    </div>
    <span className="chip chip-ok">{delta}</span>
  </div>
);

const PropertyCard = ({ p, onClick }) => {
  const { go } = useNav();
  const handleClick = onClick || (() => go(`/apply/listing/${p.id || 'harlow-mews'}`));
  const [hover, setHover] = useState(false);
  return (
  <div className="solid-card"
       onClick={handleClick}
       onMouseEnter={() => setHover(true)}
       onMouseLeave={() => setHover(false)}
       style={{ padding: 14, cursor: 'pointer', transition: 'transform .15s, box-shadow .15s',
                transform: hover ? 'translateY(-3px)' : 'none',
                boxShadow: hover ? '0 18px 40px -16px oklch(0.5 0.1 30 / 0.28)' : undefined }}>
    <div style={{ position: 'relative' }}>
      <PhImg label={p.title} h={180} hue={p.hue}/>
      <div style={{
        position: 'absolute', top: 12, right: 12,
        padding: '6px 10px', borderRadius: 99,
        background: 'color-mix(in oklab, white 75%, transparent)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 12, fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--coral-500)' }}/>
        {p.score}% match
      </div>
      {/* Hover Apply CTA */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: 12,
        background: 'linear-gradient(to top, oklch(0.25 0.05 30 / 0.85), transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        opacity: hover ? 1 : 0, transition: 'opacity .2s',
        pointerEvents: hover ? 'auto' : 'none',
      }}>
        <div style={{ color: 'white', fontSize: 12, opacity: 0.95 }}>One-tap apply with your verified profile</div>
        <button onClick={e => { e.stopPropagation(); handleClick(); }}
                className="btn btn-coral btn-sm" style={{ flexShrink: 0 }}>
          Apply <Icon name="arrowRight" size={12}/>
        </button>
      </div>
    </div>
    <div style={{ padding: '14px 6px 6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{p.title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{p.area}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="display" style={{ fontSize: 22 }}>{p.price}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>per month</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 12, color: 'var(--ink-2)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="bed" size={13}/> {p.beds}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="bath" size={13}/> {p.baths}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="ruler" size={13}/> {p.sqft} ft²</span>
      </div>
    </div>
  </div>
  );
};

// ===== Home Story — signature feature =====
const HomeStory = () => {
  const stories = [
    {
      year: '2024 – now',
      address: 'Flat 2, 88 Rivington St',
      area: 'Shoreditch, London',
      landlord: 'R. Khan',
      rating: 5,
      summary: 'Freshly painted the hallway (with permission), built planter boxes for the balcony, kept the original parquet shining.',
      tags: ['Painted', 'Garden', 'Repairs reported on time'],
      improvements: [
        { label: 'Hallway · before', hue: 30 },
        { label: 'Hallway · after', hue: 30 },
        { label: 'Balcony planter', hue: 50 },
      ],
      verified: true,
      hue: 30,
    },
    {
      year: '2021 – 2024',
      address: '14 Chapel Lane',
      area: 'Leeds',
      landlord: 'Oakhouse Lettings',
      rating: 5,
      summary: 'Three-year tenancy, no missed rent, deep-cleaned on exit. Landlord waived the final inventory check.',
      tags: ['3-year tenancy', 'Deposit returned in full', 'Re-let without void'],
      improvements: [
        { label: 'Kitchen refresh', hue: 50 },
        { label: 'Living · as left', hue: 40 },
      ],
      verified: true,
      hue: 45,
    },
    {
      year: '2019 – 2021',
      address: 'Room 3, 10 Hawthorn Rd',
      area: 'Leeds',
      landlord: 'Priya Mehta',
      rating: 4,
      summary: 'First tenancy. Learned the ropes. Painted my room and returned it to magnolia on exit.',
      tags: ['First tenancy', 'Painted & restored'],
      improvements: [
        { label: 'Room · 2020', hue: 20 },
      ],
      verified: true,
      hue: 20,
    },
  ];

  return (
    <div style={{ padding: '32px 36px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 13, color: 'var(--coral-700)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500 }}>Signature feature</div>
          <div className="display" style={{ fontSize: 40, marginTop: 6 }}>Your Home Story.</div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 6, maxWidth: 560 }}>
            A chronological portfolio of every home you’ve cared for. Landlords see real evidence, not a CV.
          </div>
        </div>
        <button className="btn btn-coral">
          <Icon name="plus" size={14}/> Add a home
        </button>
      </div>

      <div style={{ position: 'relative', paddingLeft: 36 }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: 14, top: 10, bottom: 10, width: 2, background: 'linear-gradient(180deg, var(--coral-400), var(--peach-300))' }}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {stories.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -36, top: 30,
                width: 30, height: 30, borderRadius: 99,
                background: 'white', border: '2px solid var(--coral-500)',
                display: 'grid', placeItems: 'center', color: 'var(--coral-600)',
                boxShadow: 'var(--sh-sm)',
                boxSizing: 'border-box',
              }}>
                <Icon name="home" size={13}/>
              </div>

              <div className="solid-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)' }}>{s.year}</div>
                    <div className="display" style={{ fontSize: 28, marginTop: 6, lineHeight: 1.1 }}>{s.address}</div>
                    <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>{s.area}</div>
                  </div>
                  {s.verified && <span className="chip chip-verified"><Icon name="check" size={12}/> Verified</span>}
                </div>

                <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 14, maxWidth: 720 }}>
                  {s.summary}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                  {s.tags.map(t => <span key={t} className="chip chip-coral">{t}</span>)}
                </div>

                {/* Improvements strip */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(s.improvements.length, 2)}, 1fr)`, gap: 12, marginTop: 20 }}>
                  {s.improvements.map((im, j) => <PhImg key={j} label={im.label} h={140} hue={im.hue}/>)}
                </div>

                {/* Endorsement */}
                <div style={{ marginTop: 20, padding: 16, background: 'var(--coral-50)', borderRadius: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Avatar name={s.landlord} size={38} hue={s.hue + 100}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{s.landlord}</span>
                      <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>· Landlord</span>
                      <span style={{ fontSize: 12, color: 'var(--coral-700)' }}>
                        {'★'.repeat(s.rating)}<span style={{ color: 'var(--ink-4)' }}>{'★'.repeat(5 - s.rating)}</span>
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.5 }}>
                      “Left the flat spotless. I’d rent to them again in a heartbeat.”
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add more */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: -36, top: 22,
              width: 30, height: 30, borderRadius: 99,
              background: 'white', border: '2px dashed var(--line-2)',
              display: 'grid', placeItems: 'center', color: 'var(--ink-3)',
              boxSizing: 'border-box',
            }}><Icon name="plus" size={13}/></div>
            <button className="solid-card" style={{
              width: '100%', padding: 24, textAlign: 'left',
              background: 'color-mix(in oklab, white 60%, transparent)',
              border: '2px dashed var(--line-2)', boxShadow: 'none',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500 }}>Add an older home</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>We’ll help you request a reference from the landlord.</div>
              </div>
              <Icon name="arrowRight" size={18} style={{ color: 'var(--ink-3)' }}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Tenant search =====
const TenantSearch = () => {
  const props = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    title: ['12 Harlow Mews', 'Flat 3, Ashby Rd', '4B Morton Terrace', 'Studio · Dalston Sq',
            '22 Lavender Hill', 'The Old Dairy, Unit 4', '8 Willowbrook Ct', '19 Saint Marks Cl',
            'Top Floor, 77 Queen St'][i],
    area: ['Hackney, E8', 'Clapton, E5', 'Walthamstow, E17', 'Dalston, E8',
           'Peckham, SE15', 'Bermondsey, SE1', 'Brixton, SW2', 'Camberwell, SE5', 'Kennington, SE11'][i],
    price: ['£2,400', '£2,150', '£1,850', '£1,750', '£2,050', '£2,300', '£1,950', '£1,800', '£2,150'][i],
    beds: [2, 2, 2, 1, 2, 2, 1, 2, 2][i],
    baths: 1,
    sqft: [780, 720, 680, 450, 710, 790, 520, 690, 740][i],
    score: [94, 88, 81, 76, 72, 91, 68, 84, 79][i],
    hue: (i * 40) % 360,
  }));

  return (
    <div style={{ padding: '24px 36px' }}>
      {/* Filter bar */}
      <div className="solid-card" style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', flex: 1, minWidth: 200 }}>
          <Icon name="search" size={16} style={{ color: 'var(--ink-3)' }}/>
          <input placeholder="Hackney, E8" style={{ border: 'none', outline: 'none', fontSize: 15, width: '100%' }}/>
        </div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>£1.5k – £2.5k pcm <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>2 beds <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>Pets: cat <Icon name="chevDown" size={12}/></div>
        <div className="chip" style={{ height: 34, padding: '0 14px' }}>12-mo lease <Icon name="chevDown" size={12}/></div>
        <button className="btn btn-ghost btn-sm"><Icon name="filter" size={14}/> More filters</button>
        <button className="btn btn-coral btn-sm">Save search</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {props.map(p => <PropertyCard key={p.id} p={p}/>)}
      </div>
    </div>
  );
};

// ===== Tenant Applications =====
const TenantApplications = () => {
  const apps = [
    { prop: '12 Harlow Mews', area: 'Hackney', status: 'Shortlisted', step: 3, when: '2 days ago', score: 94 },
    { prop: 'Flat 3, Ashby Rd', area: 'Clapton', status: 'In review', step: 2, when: '5 days ago', score: 88 },
    { prop: '4B Morton Terrace', area: 'Walthamstow', status: 'Viewing booked', step: 3, when: '1 week ago', score: 81 },
    { prop: 'Studio · Dalston', area: 'Dalston', status: 'Not selected', step: 4, when: '2 weeks ago', score: 76 },
  ];
  const statusColor = {
    'Shortlisted': 'chip-coral',
    'In review': 'chip',
    'Viewing booked': 'chip-blue',
    'Not selected': 'chip',
  };

  return (
    <div style={{ padding: '32px 36px' }}>
      <div className="tabs" style={{ marginBottom: 24 }}>
        <button className="on">Active (3)</button>
        <button>Past (5)</button>
        <button>Saved (12)</button>
      </div>

      <div className="solid-card" style={{ padding: '4px 8px' }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ paddingLeft: 16 }}>Property</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Compatibility</th>
              <th>Applied</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a, i) => (
              <tr key={i} className="clickable">
                <td style={{ paddingLeft: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10,
                                  background: `linear-gradient(135deg, oklch(0.82 0.10 ${i*40}), oklch(0.88 0.08 ${i*40+30}))` }}/>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{a.prop}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{a.area}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`chip ${statusColor[a.status]}`}>{a.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[0,1,2,3].map(s => (
                      <div key={s} style={{ width: 36, height: 6, borderRadius: 99,
                                            background: s < a.step ? 'var(--coral-500)' : 'var(--line)' }}/>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>
                    {['Applied','Reviewed','Shortlisted','Decision'][a.step-1]}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div className="display" style={{ fontSize: 20, color: 'var(--coral-700)' }}>{a.score}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>/100</div>
                  </div>
                </td>
                <td style={{ color: 'var(--ink-3)' }}>{a.when}</td>
                <td><Icon name="chevRight" size={14} style={{ color: 'var(--ink-3)' }}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ===== Tenant Profile Editor =====
const TenantProfile = () => {
  return (
    <div style={{ padding: '32px 36px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Who you are */}
        <div className="solid-card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <div className="display" style={{ fontSize: 24 }}>About you</div>
            <span className="chip chip-ok">Verified ID</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field"><label>Full name</label><input className="input" defaultValue="Ayo Bankole"/></div>
            <div className="field"><label>Preferred pronouns</label><input className="input" defaultValue="they/them"/></div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>One-liner for landlords</label>
              <input className="input" defaultValue="Quiet, houseplant-obsessed, paint walls only with permission."/>
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Longer intro</label>
              <textarea className="textarea" rows={4} defaultValue="We're a couple who love restoring old places — carefully. We've rented three flats, always leaving them better than we found. We work in healthcare and design, so we're home at normal hours and reply to maintenance needs the same day."/>
            </div>
          </div>
        </div>

        {/* What you're after */}
        <div className="solid-card" style={{ padding: 28 }}>
          <div className="display" style={{ fontSize: 24, marginBottom: 18 }}>What you’re after</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <div className="field"><label>Monthly budget</label><input className="input" defaultValue="£2,000 – £2,500"/></div>
            <div className="field"><label>Minimum lease</label><input className="input" defaultValue="12 months"/></div>
            <div className="field"><label>Move-in</label><input className="input" defaultValue="Before 1 Jun"/></div>
            <div className="field"><label>Bedrooms</label><input className="input" defaultValue="2"/></div>
            <div className="field"><label>Pets</label><input className="input" defaultValue="1 cat (Miso)"/></div>
            <div className="field"><label>Household</label><input className="input" defaultValue="Couple, no children"/></div>
            <div className="field" style={{ gridColumn: 'span 3' }}>
              <label>Preferred areas</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                {['Hackney','Clapton','Dalston','Walthamstow','Leyton'].map(a =>
                  <span key={a} className="chip chip-coral">{a} <Icon name="x" size={11}/></span>
                )}
                <button className="chip" style={{ cursor: 'pointer' }}>+ add area</button>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle fit */}
        <div className="solid-card" style={{ padding: 28 }}>
          <div className="display" style={{ fontSize: 24, marginBottom: 18 }}>Lifestyle fit</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { k: 'Noise level at home', v: 2, labels: ['silent','moderate','lively'] },
              { k: 'Guests & hosting', v: 1, labels: ['rarely','occasional','often'] },
              { k: 'Home care rhythm', v: 2, labels: ['tidy as I go','weekly clean','deep clean monthly'] },
              { k: 'Communication with landlord', v: 2, labels: ['only when needed','monthly check-in','frequent'] },
            ].map((row, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                  <span>{row.k}</span>
                  <span style={{ color: 'var(--coral-700)', fontWeight: 500 }}>{row.labels[row.v]}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {row.labels.map((l, j) => (
                    <div key={l} aria-pressed={j === row.v} style={{
                      flex: 1, height: 34, borderRadius: 10,
                      background: j === row.v ? 'var(--coral-500)' : 'var(--cream-2)',
                      color: j === row.v ? 'var(--ink)' : 'var(--ink-2)',
                      border: '1px solid ' + (j === row.v ? 'transparent' : 'var(--line)'),
                      display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600,
                      cursor: 'pointer',
                    }}>{l}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right rail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 100 }}>
        <div className="solid-card" style={{ padding: 22, textAlign: 'center' }}>
          <Avatar name="Ayo Bankole" size={72} hue={30} style={{ margin: '0 auto' }}/>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>Ayo Bankole</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>Tenant · London</div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }}>
            <Icon name="camera" size={13}/> Change photo
          </button>
        </div>
        <div className="solid-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>Shareable profile</div>
          <div className="mono" style={{ fontSize: 12, padding: 10, background: 'var(--cream-2)', borderRadius: 8, color: 'var(--ink-2)', wordBreak: 'break-all' }}>
            goodlet.uk/@ayo-bankole
          </div>
          <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
            Copy link <Icon name="arrowUpRight" size={13}/>
          </button>
        </div>
        <div className="solid-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 12 }}>Verifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Photo ID', true], ['Right to rent', true], ['Income / employment', true],
              ['Previous landlord (2 of 3)', 'partial'], ['Guarantor', false],
            ].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--ink-2)' }}>{k}</span>
                {v === true && <Icon name="check" size={16} style={{ color: 'oklch(0.55 0.14 155)' }}/>}
                {v === 'partial' && <span className="chip chip-coral" style={{ height: 22, fontSize: 11 }}>In progress</span>}
                {v === false && <button className="chip" style={{ height: 22, fontSize: 11, cursor: 'pointer' }}>Add</button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Tenant page switcher =====
const TenantApp = () => {
  const { route } = useNav();
  const sub = route.replace('/app/tenant', '').replace(/^\//, '') || 'overview';
  const titles = {
    overview: 'Welcome back, Ayo',
    profile: 'Your profile',
    'home-story': 'Home Story',
    search: 'Find a home',
    applications: 'Applications',
    messages: 'Messages',
  };
  const pages = {
    overview: <TenantOverview/>,
    profile: <TenantProfile/>,
    'home-story': <HomeStory/>,
    search: <TenantSearch/>,
    applications: <TenantApplications/>,
    messages: <MessagesPlaceholder/>,
  };
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="quiet-bg"/>
      <AppSidebar role="tenant"/>
      <main style={{ flex: 1, minWidth: 0 }}>
        <AppTopbar title={titles[sub] || 'Dashboard'}>
          {sub === 'search' && (
            <div className="seg">
              <button className="on"><Icon name="grid" size={13}/></button>
              <button><Icon name="map" size={13}/></button>
            </div>
          )}
          <button className="btn btn-coral btn-sm">
            <Icon name="spark" size={14}/> Boost profile
          </button>
        </AppTopbar>
        {pages[sub] || <TenantOverview/>}
      </main>
    </div>
  );
};

const MessagesPlaceholder = () => (
  <div style={{ padding: '32px 36px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 0, height: 'calc(100vh - 100px)' }}>
    <div className="solid-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: 16, borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--cream-2)', borderRadius: 10 }}>
          <Icon name="search" size={14}/>
          <input placeholder="Search conversations" style={{ border: 'none', outline: 'none', background: 'none', fontSize: 14, width: '100%' }}/>
        </div>
      </div>
      {[
        { n: 'R. Khan · 12 Harlow Mews', p: 'Thanks — the viewing is confirmed for Sa…', t: '2m', unread: true, hue: 250 },
        { n: 'Oakhouse Lettings', p: 'We\'d love to invite you to a second viewing.', t: '1h', unread: true, hue: 30 },
        { n: 'Priya M. (ex-landlord)', p: 'Reference submitted ✓', t: 'yesterday', unread: false, hue: 330 },
      ].map((c, i) => (
        <div key={i} style={{ padding: 14, borderBottom: '1px solid var(--line)', display: 'flex', gap: 12, cursor: 'pointer', background: i === 0 ? 'var(--coral-50)' : 'transparent' }}>
          <Avatar name={c.n} size={40} hue={c.hue}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.n}</span>
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.t}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.p}</div>
          </div>
          {c.unread && <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--coral-500)', alignSelf: 'center' }}/>}
        </div>
      ))}
    </div>
    <div className="solid-card" style={{ marginLeft: 20, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: 20, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Avatar name="R. Khan" size={42} hue={250}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>R. Khan</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Landlord · 12 Harlow Mews</div>
        </div>
        <button className="btn btn-ghost btn-sm">View property</button>
      </div>
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto', background: 'var(--cream)' }}>
        {[
          { me: false, t: 'Hi Ayo — thanks for applying! Your Home Story is really impressive.' },
          { me: true, t: 'Thank you! Happy to answer any questions.' },
          { me: false, t: 'Would Saturday 11am work for a viewing?' },
          { me: true, t: 'Perfect — see you then.' },
          { me: false, t: 'Great. Confirmed on your calendar. The concierge will let you in.' },
        ].map((m, i) => (
          <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
            <div style={{
              padding: '10px 14px', borderRadius: 16,
              background: m.me ? 'var(--coral-500)' : 'white',
              color: m.me ? 'var(--ink)' : 'var(--ink)',
              fontSize: 14, lineHeight: 1.5,
              border: m.me ? 'none' : '1px solid var(--line)',
              borderBottomRightRadius: m.me ? 4 : 16,
              borderBottomLeftRadius: m.me ? 16 : 4,
            }}>{m.t}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: 16, borderTop: '1px solid var(--line)', display: 'flex', gap: 10 }}>
        <input className="input" style={{ flex: 1 }} placeholder="Message R. Khan"/>
        <button className="btn btn-coral">Send</button>
      </div>
    </div>
  </div>
);

Object.assign(window, { TenantApp, AppSidebar, AppTopbar, PropertyCard });
