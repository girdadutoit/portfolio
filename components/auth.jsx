/* global React, Icon, Logo, NavCtx, PhImg */
const { useState, useEffect, useContext } = React;

// ===== Split-screen auth layout =====
const AuthLayout = ({ mode, children }) => {
  const { go } = useContext(NavCtx);
  const isSignin = mode === 'signin';

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.05fr' }}>
      {/* LEFT — form */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '32px 48px', background: 'var(--cream)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo onClick={() => go('/')}/>
          <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>
            {isSignin ? (
              <>New to GoodLet? <a onClick={() => go('/signup')} style={{ cursor: 'pointer', color: 'var(--coral-700)', fontWeight: 600 }}>Create an account</a></>
            ) : (
              <>Already have an account? <a onClick={() => go('/signin')} style={{ cursor: 'pointer', color: 'var(--coral-700)', fontWeight: 600 }}>Sign in</a></>
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
          <div style={{ width: '100%', maxWidth: 440 }}>
            {children}
          </div>
        </div>

        <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', gap: 18 }}>
          <span>© 2026 GoodLet</span>
          <a style={{ cursor: 'pointer' }}>Privacy</a>
          <a style={{ cursor: 'pointer' }}>Terms</a>
          <a style={{ cursor: 'pointer' }}>Help</a>
        </div>
      </div>

      {/* RIGHT — marketing panel */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, oklch(0.94 0.06 30), oklch(0.92 0.08 50) 60%, oklch(0.88 0.10 20))',
        display: 'flex', flexDirection: 'column',
        padding: 48, gap: 40,
      }}>
        <div className="blob" style={{ width: 500, height: 500, background: 'oklch(0.80 0.14 var(--ah,28))', top: -100, right: -120, opacity: 0.6 }}/>
        <div className="blob" style={{ width: 360, height: 360, background: 'oklch(0.85 0.10 55)', bottom: -80, left: -80, opacity: 0.7 }}/>

        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                        background: 'color-mix(in oklab, white 50%, transparent)', border: '1px solid var(--glass-border)',
                        borderRadius: 999, fontSize: 12, color: 'var(--ink-2)', backdropFilter: 'blur(12px)', fontWeight: 500, alignSelf: 'flex-start' }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--coral-500)' }}/>
            {isSignin ? 'Welcome back' : 'Join 40,000+ renters & landlords'}
          </div>

          <h2 className="display" style={{ fontSize: 'clamp(36px, 3.8vw, 52px)', lineHeight: 1.1, margin: '24px 0 20px', color: 'var(--ink)', maxWidth: 520 }}>
            {isSignin ? 'Good to see you again.' : 'Rent on merit, not mystery.'}
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: 0, maxWidth: 440, lineHeight: 1.55 }}>
            {isSignin ? 'Pick up where you left off — your Home Story, applications, and messages are waiting.' : 'Verified references, a Care Score you earn, and matching on what actually matters.'}
          </p>
        </div>

        {/* Floating preview card */}
        <div className="glass-strong" style={{ position: 'relative', zIndex: 1, padding: 22, maxWidth: 420, alignSelf: 'flex-end', width: '100%' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
              <PhImg label="" h={48} hue={30}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>12 Harlow Mews · Hackney</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Landlord matched you with 94% compatibility</div>
            </div>
            <div className="display" style={{ fontSize: 32, color: 'var(--coral-700)' }}>94</div>
          </div>
          <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: 'color-mix(in oklab, white 70%, transparent)', fontSize: 12, color: 'var(--ink-2)' }}>
            <strong>R. Khan</strong> · “Thanks for the application — Home Story is really impressive.”
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Sign-in page =====
const SignInPage = () => {
  const { go } = useContext(NavCtx);
  const [role, setRole] = useState('tenant');
  const [showPw, setShowPw] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    go(role === 'tenant' ? '/app/tenant' : '/app/landlord');
  };

  return (
    <AuthLayout mode="signin">
      <div className="display" style={{ fontSize: 44, lineHeight: 1.05 }}>Sign in.</div>
      <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>
        Welcome back to GoodLet.
      </div>

      {/* Social */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 28 }}>
        <button className="btn btn-social" style={{ height: 48 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9c-.3 1.4-1.1 2.5-2.3 3.3v2.7h3.7c2.1-2 3.2-4.9 3.2-8z"/><path fill="#34A853" d="M12 23c3 0 5.6-1 7.4-2.7l-3.7-2.7c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2v2.8C3.8 20.6 7.6 23 12 23z"/><path fill="#FBBC05" d="M5.8 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7H2c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.8-2.8z"/><path fill="#EA4335" d="M12 5.5c1.6 0 3.1.6 4.2 1.6l3.2-3.2C17.6 2.1 15 1 12 1 7.6 1 3.8 3.4 2 7l3.8 2.8C6.7 7.2 9.1 5.5 12 5.5z"/></svg>
          Google
        </button>
        <button className="btn btn-social" style={{ height: 48 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.58c0-3.11 2.54-4.6 2.66-4.68-1.45-2.12-3.71-2.4-4.52-2.44-1.93-.2-3.76 1.13-4.74 1.13-.99 0-2.49-1.1-4.09-1.07-2.1.03-4.05 1.22-5.13 3.1-2.19 3.8-.56 9.4 1.57 12.49 1.04 1.51 2.27 3.21 3.87 3.15 1.56-.06 2.15-1.01 4.04-1.01s2.42 1.01 4.08.98c1.69-.03 2.76-1.54 3.79-3.06 1.19-1.75 1.68-3.45 1.71-3.54-.04-.02-3.28-1.26-3.32-4.95zM14 3.8c.86-1.04 1.44-2.48 1.28-3.92-1.24.05-2.74.83-3.62 1.86-.79.92-1.49 2.38-1.3 3.79 1.38.11 2.79-.7 3.64-1.73z"/></svg>
          Apple
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>or email</span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
      </div>

      {/* Role segmented */}
      <div className="seg" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 16 }}>
        <button className={role === 'tenant' ? 'on' : ''} onClick={() => setRole('tenant')}>Tenant</button>
        <button className={role === 'landlord' ? 'on' : ''} onClick={() => setRole('landlord')}>Landlord / Agent</button>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label>Email</label>
          <input className="input" type="email" defaultValue="ayo@bankole.co" placeholder="you@email.com" autoFocus/>
        </div>
        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Password</label>
            <a style={{ fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, cursor: 'pointer' }}>Forgot?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <input className="input" type={showPw ? 'text' : 'password'} defaultValue="••••••••" style={{ width: '100%', paddingRight: 44 }}/>
            <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: 8, top: 8, width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', color: 'var(--ink-3)' }}>
              <Icon name="eye" size={15}/>
            </button>
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer', marginTop: 4 }}>
          <input type="checkbox" defaultChecked style={{ accentColor: 'var(--coral-700)' }}/>
          Keep me signed in on this device
        </label>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
          Sign in <Icon name="arrowRight" size={16}/>
        </button>
      </form>

      <div style={{ marginTop: 22, padding: 14, background: 'var(--coral-50)', borderRadius: 14, fontSize: 12, color: 'var(--ink-2)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="shield" size={14} style={{ color: 'var(--coral-700)', marginTop: 2 }}/>
        <span>Protected by 2-factor authentication. We never sell your data or share it with third-party marketers.</span>
      </div>
    </AuthLayout>
  );
};

// ===== Sign-up page =====
const SignUpPage = () => {
  const { go } = useContext(NavCtx);
  const [role, setRole] = useState('tenant');
  const [step, setStep] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', password: '',
    budget: '£2,000 – £2,500', bedrooms: '2', areas: 'Hackney, Clapton',
    rent: '£2,400', propBeds: '2', propArea: 'Hackney, E8',
  });

  const up = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const pwStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    return s;
  };

  const steps = ['Role', 'Account', role === 'tenant' ? 'What you want' : 'Your property', 'Done'];
  const canContinue = () => {
    if (step === 1) return form.fullName.trim() && form.email.includes('@') && form.password.length >= 8;
    return true;
  };

  return (
    <AuthLayout mode="signup">
      {/* progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1 }}>
            <div style={{ height: 4, borderRadius: 99, background: i <= step ? 'var(--coral-700)' : 'var(--line)', transition: 'background .2s' }}/>
            <div style={{ fontSize: 11, marginTop: 6, color: i === step ? 'var(--ink)' : 'var(--ink-3)', fontWeight: i === step ? 600 : 400 }}>
              {s}
            </div>
          </div>
        ))}
      </div>

      {step === 0 && <>
        <div className="display" style={{ fontSize: 44, lineHeight: 1.05 }}>Create your account.</div>
        <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>
          Tell us how you'll use GoodLet. You can switch or do both later.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 }}>
          {[
            { k: 'tenant', t: 'I’m a tenant', d: 'Build a profile, get matched, apply.', icon: 'home' },
            { k: 'landlord', t: 'I’m a landlord', d: 'List properties, scout tenants, vet.', icon: 'key' },
          ].map(o => (
            <button key={o.k} onClick={() => setRole(o.k)}
                    style={{
                      padding: 22, textAlign: 'left', borderRadius: 18,
                      background: role === o.k ? 'var(--ink)' : 'white',
                      color: role === o.k ? 'var(--cream)' : 'var(--ink)',
                      border: '1px solid ' + (role === o.k ? 'transparent' : 'var(--line)'),
                      boxShadow: role === o.k ? '0 10px 30px -10px oklch(0.22 0.02 30 / 0.4)' : 'var(--sh-sm)',
                      transition: 'all .15s',
                    }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: role === o.k ? 'oklch(1 0 0 / 0.12)' : 'var(--coral-100)',
                            color: role === o.k ? 'var(--cream)' : 'var(--coral-700)',
                            display: 'grid', placeItems: 'center' }}>
                <Icon name={o.icon} size={18}/>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginTop: 14 }}>{o.t}</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>{o.d}</div>
            </button>
          ))}
        </div>

        <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 22 }} onClick={() => setStep(1)}>
          Continue <Icon name="arrowRight" size={16}/>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0 14px' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
          <span style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <button className="btn btn-social" style={{ height: 46 }}>
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9c-.3 1.4-1.1 2.5-2.3 3.3v2.7h3.7c2.1-2 3.2-4.9 3.2-8z"/><path fill="#34A853" d="M12 23c3 0 5.6-1 7.4-2.7l-3.7-2.7c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2v2.8C3.8 20.6 7.6 23 12 23z"/><path fill="#FBBC05" d="M5.8 14.2c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7H2c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.8-2.8z"/><path fill="#EA4335" d="M12 5.5c1.6 0 3.1.6 4.2 1.6l3.2-3.2C17.6 2.1 15 1 12 1 7.6 1 3.8 3.4 2 7l3.8 2.8C6.7 7.2 9.1 5.5 12 5.5z"/></svg>
            Continue with Google
          </button>
          <button className="btn btn-social" style={{ height: 46 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.58c0-3.11 2.54-4.6 2.66-4.68-1.45-2.12-3.71-2.4-4.52-2.44-1.93-.2-3.76 1.13-4.74 1.13-.99 0-2.49-1.1-4.09-1.07-2.1.03-4.05 1.22-5.13 3.1-2.19 3.8-.56 9.4 1.57 12.49 1.04 1.51 2.27 3.21 3.87 3.15 1.56-.06 2.15-1.01 4.04-1.01s2.42 1.01 4.08.98c1.69-.03 2.76-1.54 3.79-3.06 1.19-1.75 1.68-3.45 1.71-3.54-.04-.02-3.28-1.26-3.32-4.95zM14 3.8c.86-1.04 1.44-2.48 1.28-3.92-1.24.05-2.74.83-3.62 1.86-.79.92-1.49 2.38-1.3 3.79 1.38.11 2.79-.7 3.64-1.73z"/></svg>
            Continue with Apple
          </button>
        </div>
      </>}

      {step === 1 && <>
        <div className="display" style={{ fontSize: 40, lineHeight: 1.05 }}>Your details.</div>
        <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>We'll never share these.</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          <div className="field">
            <label>Full name</label>
            <input className="input" value={form.fullName} onChange={e => up('fullName', e.target.value)} placeholder="Ayo Bankole" autoFocus/>
          </div>
          <div className="field">
            <label>Email address</label>
            <input className="input" type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@email.com"/>
          </div>
          <div className="field">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={showPw ? 'text' : 'password'} value={form.password}
                     onChange={e => up('password', e.target.value)} placeholder="At least 8 characters" style={{ width: '100%', paddingRight: 44 }}/>
              <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position: 'absolute', right: 8, top: 8, width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', color: 'var(--ink-3)' }}>
                <Icon name="eye" size={15}/>
              </button>
            </div>
            {/* strength */}
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 99,
                  background: i < pwStrength() ? (pwStrength() >= 3 ? 'oklch(0.58 0.15 155)' : pwStrength() === 2 ? 'oklch(0.75 0.14 70)' : 'var(--coral-500)') : 'var(--line)',
                  transition: 'background .2s',
                }}/>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>
              {['Use 8+ characters', 'Add a capital letter', 'Add a number', 'Add a symbol for extra strength', 'Strong password ✓'][pwStrength()]}
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--ink-2)', marginTop: 4, cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: 'var(--coral-700)', marginTop: 3 }}/>
            <span>I agree to the <a style={{ color: 'var(--coral-700)', fontWeight: 500, cursor: 'pointer' }}>Terms</a> and <a style={{ color: 'var(--coral-700)', fontWeight: 500, cursor: 'pointer' }}>Privacy Policy</a>. I understand GoodLet never shares my profile with third parties.</span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button className="btn btn-ghost btn-lg" style={{ justifyContent: 'center', flex: '0 0 100px' }} onClick={() => setStep(0)}>
            <Icon name="chevLeft" size={14}/> Back
          </button>
          <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center', opacity: canContinue() ? 1 : 0.5, pointerEvents: canContinue() ? 'auto' : 'none' }} onClick={() => setStep(2)}>
            Continue <Icon name="arrowRight" size={16}/>
          </button>
        </div>
      </>}

      {step === 2 && <>
        <div className="display" style={{ fontSize: 40, lineHeight: 1.05 }}>
          {role === 'tenant' ? 'What are you after?' : 'Your first listing.'}
        </div>
        <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 8 }}>
          {role === 'tenant' ? 'We use this to match you to homes — edit anytime.' : 'Add a property now, or skip and do it later.'}
        </div>

        {role === 'tenant' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Monthly budget</label>
              <input className="input" value={form.budget} onChange={e => up('budget', e.target.value)}/>
            </div>
            <div className="field">
              <label>Bedrooms</label>
              <input className="input" value={form.bedrooms} onChange={e => up('bedrooms', e.target.value)}/>
            </div>
            <div className="field">
              <label>Move-in</label>
              <input className="input" defaultValue="Before 1 Jun"/>
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Areas</label>
              <input className="input" value={form.areas} onChange={e => up('areas', e.target.value)}/>
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Pets</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                {['None','Cat','Dog','Other'].map(p => (
                  <button key={p} style={{
                    padding: '10px 16px', borderRadius: 12,
                    background: p === 'Cat' ? 'var(--ink)' : 'white',
                    color: p === 'Cat' ? 'var(--cream)' : 'var(--ink-2)',
                    border: '1px solid ' + (p === 'Cat' ? 'transparent' : 'var(--line)'),
                    fontSize: 13, fontWeight: 500,
                  }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Property address</label>
              <input className="input" value={form.propArea} onChange={e => up('propArea', e.target.value)} placeholder="12 Harlow Mews, Hackney"/>
            </div>
            <div className="field">
              <label>Monthly rent</label>
              <input className="input" value={form.rent} onChange={e => up('rent', e.target.value)}/>
            </div>
            <div className="field">
              <label>Bedrooms</label>
              <input className="input" value={form.propBeds} onChange={e => up('propBeds', e.target.value)}/>
            </div>
            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label>Available from</label>
              <input className="input" defaultValue="1 June 2026"/>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button className="btn btn-ghost btn-lg" style={{ justifyContent: 'center', flex: '0 0 100px' }} onClick={() => setStep(1)}>
            <Icon name="chevLeft" size={14}/> Back
          </button>
          {role === 'landlord' && (
            <button className="btn btn-ghost btn-lg" style={{ justifyContent: 'center' }} onClick={() => setStep(3)}>
              Skip
            </button>
          )}
          <button className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(3)}>
            Continue <Icon name="arrowRight" size={16}/>
          </button>
        </div>
      </>}

      {step === 3 && <>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 84, height: 84, margin: '0 auto', borderRadius: 99,
                        background: 'linear-gradient(135deg, oklch(0.88 0.14 155), oklch(0.72 0.14 155))',
                        display: 'grid', placeItems: 'center', color: 'white',
                        boxShadow: '0 20px 40px -15px oklch(0.58 0.14 155 / 0.5)' }}>
            <Icon name="check" size={44} stroke={2.5}/>
          </div>
          <div className="display" style={{ fontSize: 44, marginTop: 24, lineHeight: 1.05 }}>You're in.</div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 10 }}>
            {role === 'tenant'
              ? 'Next, build your Home Story — photos of places you’ve cared for are your biggest edge.'
              : 'Next, add property details and start reviewing verified applicants.'}
          </div>

          <div className="solid-card" style={{ padding: 18, marginTop: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 10 }}>Next steps</div>
            {(role === 'tenant'
              ? ['Add your first Home Story entry', 'Invite a landlord for a reference', 'Go live to be discovered']
              : ['Complete your property listing', 'Scout live tenants in your area', 'Set shortlisting criteria']
            ).map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)', fontSize: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: 99, border: '1.5px solid var(--line-2)', display: 'grid', placeItems: 'center', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{i+1}</div>
                {s}
              </div>
            ))}
          </div>

          <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 22 }}
                  onClick={() => go(role === 'tenant' ? '/app/tenant' : '/app/landlord')}>
            Go to dashboard <Icon name="arrowRight" size={16}/>
          </button>
        </div>
      </>}
    </AuthLayout>
  );
};

Object.assign(window, { SignInPage, SignUpPage });
