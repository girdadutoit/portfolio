/* global React, Icon */
// A11y panel — floating, non-intrusive, persistent via localStorage.
// Dispatches data-a11y-* attributes on <html>.

const { useState, useEffect } = React;

const A11Y_KEYS = {
  motion: 'goodlet-a11y-motion',     // 'reduced' | ''
  contrast: 'goodlet-a11y-contrast', // 'high' | ''
  size: 'goodlet-a11y-size',         // 'large' | 'xlarge' | ''
};

function applyA11y(k, v) {
  const attr = 'data-a11y-' + k;
  if (v) document.documentElement.setAttribute(attr, v);
  else document.documentElement.removeAttribute(attr);
  try { localStorage.setItem(A11Y_KEYS[k], v || ''); } catch (e) {}
}

// Apply on boot (before React mounts visually) ------------
(function bootA11y() {
  try {
    Object.keys(A11Y_KEYS).forEach(k => {
      const v = localStorage.getItem(A11Y_KEYS[k]);
      if (v) document.documentElement.setAttribute('data-a11y-' + k, v);
    });
  } catch (e) {}
})();

const A11yPanel = () => {
  const [open, setOpen] = useState(false);
  const [motion, setMotion] = useState(() => { try { return localStorage.getItem(A11Y_KEYS.motion) || ''; } catch { return ''; } });
  const [contrast, setContrast] = useState(() => { try { return localStorage.getItem(A11Y_KEYS.contrast) || ''; } catch { return ''; } });
  const [size, setSize] = useState(() => { try { return localStorage.getItem(A11Y_KEYS.size) || ''; } catch { return ''; } });

  useEffect(() => { applyA11y('motion', motion); }, [motion]);
  useEffect(() => { applyA11y('contrast', contrast); }, [contrast]);
  useEffect(() => { applyA11y('size', size); }, [size]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const anyOn = motion || contrast || size;

  return (
    <>
      {/* Launcher */}
      <button
        aria-label={open ? 'Close accessibility settings' : 'Open accessibility settings'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'fixed', bottom: 20, left: 20, zIndex: 9998,
          width: 48, height: 48, borderRadius: 99,
          background: anyOn ? 'var(--coral-500)' : 'white',
          color: anyOn ? 'white' : 'var(--ink)',
          border: '1px solid var(--line)',
          boxShadow: '0 10px 24px -6px oklch(0.3 0.05 30 / 0.22)',
          display: 'grid', placeItems: 'center',
          cursor: 'pointer',
        }}>
        <Icon name="shield" size={20}/>
        <span className="sr-only">Accessibility settings</span>
      </button>

      {/* Panel */}
      {open && (
        <div role="dialog" aria-label="Accessibility settings"
             style={{
               position: 'fixed', bottom: 80, left: 20, zIndex: 9999,
               width: 300, maxWidth: 'calc(100vw - 40px)',
               background: 'white',
               border: '1px solid var(--line)',
               borderRadius: 16,
               boxShadow: '0 24px 64px -12px oklch(0.3 0.08 30 / 0.32)',
               overflow: 'hidden',
             }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Accessibility</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Saved on this device</div>
            </div>
            <button aria-label="Close" onClick={() => setOpen(false)}
                    style={{ width: 32, height: 32, borderRadius: 8, display: 'grid', placeItems: 'center' }}>
              <Icon name="x" size={16}/>
            </button>
          </div>

          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Contrast */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8, padding: 0 }}>Contrast</legend>
              <div role="radiogroup" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[['', 'Default'], ['high', 'High']].map(([v, l]) => (
                  <button key={v} role="radio" aria-checked={contrast === v}
                          onClick={() => setContrast(v)}
                          style={{
                            padding: '10px 12px', borderRadius: 10,
                            border: '1.5px solid ' + (contrast === v ? 'var(--ink)' : 'var(--line)'),
                            background: contrast === v ? 'var(--ink)' : 'white',
                            color: contrast === v ? 'var(--cream)' : 'var(--ink)',
                            fontSize: 13, fontWeight: 500,
                          }}>{l}</button>
                ))}
              </div>
            </fieldset>

            {/* Text size */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8, padding: 0 }}>Text size</legend>
              <div role="radiogroup" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                {[['', 'A', 13], ['large', 'A', 15], ['xlarge', 'A', 17]].map(([v, l, fs], i) => (
                  <button key={v} role="radio" aria-checked={size === v} aria-label={['Default', 'Larger', 'Largest'][i]}
                          onClick={() => setSize(v)}
                          style={{
                            padding: '10px 12px', borderRadius: 10,
                            border: '1.5px solid ' + (size === v ? 'var(--ink)' : 'var(--line)'),
                            background: size === v ? 'var(--ink)' : 'white',
                            color: size === v ? 'var(--cream)' : 'var(--ink)',
                            fontSize: fs, fontWeight: 600,
                          }}>{l}</button>
                ))}
              </div>
            </fieldset>

            {/* Motion */}
            <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
              <legend style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 8, padding: 0 }}>Animations</legend>
              <label style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 12px', borderRadius: 10, border: '1.5px solid var(--line)',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 13 }}>Reduce motion</span>
                <span style={{
                  width: 34, height: 20, borderRadius: 99,
                  background: motion === 'reduced' ? 'var(--coral-500)' : 'var(--line-2)',
                  position: 'relative', transition: 'background .15s',
                }}>
                  <span style={{
                    position: 'absolute', top: 2, left: motion === 'reduced' ? 16 : 2,
                    width: 16, height: 16, borderRadius: 99, background: 'white',
                    transition: 'left .15s',
                  }}/>
                </span>
                <input type="checkbox" checked={motion === 'reduced'}
                       onChange={(e) => setMotion(e.target.checked ? 'reduced' : '')}
                       style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }}/>
              </label>
            </fieldset>

            {anyOn && (
              <button onClick={() => { setMotion(''); setContrast(''); setSize(''); }}
                      style={{ fontSize: 12, color: 'var(--coral-700)', fontWeight: 500, textAlign: 'center' }}>
                Reset all
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { A11yPanel });
