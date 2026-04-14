import { useEffect, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #F8F7F4;
    --ink: #0F0E0C;
    --accent: #2D6A4F;
    --accent-light: #D8EDE3;
    --muted: #9A9690;
    --line: rgba(15,14,12,.1);
  }

  body {
    background: var(--bg);
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 2rem;
  }

  .page { width: 100%; max-width: 520px; margin: 0 auto; }

  .card {
    background: #fff;
    border: 1px solid var(--line);
    overflow: hidden;
    animation: rise .9s cubic-bezier(.22,1,.36,1) both;
  }

  .card-top { padding: 3rem 3rem 2.5rem; border-bottom: 1px solid var(--line); position: relative; }

  .tag {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .65rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.75rem; font-weight: 500;
  }
  .tag::before { content: ''; width: 20px; height: 1px; background: var(--accent); }

  .invite-label { font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); margin-bottom: .5rem; }

  .name { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem,7vw,3.2rem); font-weight: 400; line-height: 1.1; color: var(--ink); }
  .name em { font-style: italic; color: var(--accent); }

  .degree { font-size: .8rem; color: var(--muted); letter-spacing: .04em; margin-top: .75rem; line-height: 1.7; }
  .deco-line { position: absolute; top: 0; right: 3rem; width: 1px; height: 100%; background: var(--line); }

  .countdown-row { display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid var(--line); }
  .cd-block { padding: 1.25rem .5rem; text-align: center; border-right: 1px solid var(--line); }
  .cd-block:last-child { border-right: none; }
  .cd-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 400; color: var(--ink); line-height: 1; }
  .cd-lbl { font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: .3rem; }

  .card-mid { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--line); }
  .info-block { padding: 1.75rem 2rem; border-right: 1px solid var(--line); }
  .info-block:last-child { border-right: none; }
  .info-label { font-size: .62rem; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-bottom: .5rem; font-weight: 500; }
  .info-val { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--ink); line-height: 1.3; }
  .info-sub { font-size: .72rem; color: var(--muted); margin-top: .25rem; line-height: 1.5; }

  .card-venue { padding: 1.75rem 2rem; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
  .venue-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--ink); }
  .venue-addr { font-size: .72rem; color: var(--muted); margin-top: .2rem; line-height: 1.5; }
  .map-btn {
    font-size: .65rem; letter-spacing: .12em; text-transform: uppercase;
    color: var(--accent); border: 1px solid var(--accent);
    padding: .5rem 1rem; cursor: pointer; background: none;
    transition: all .2s; white-space: nowrap; font-family: 'Outfit', sans-serif;
  }
  .map-btn:hover { background: var(--accent); color: #fff; }

  .card-msg { padding: 2rem; border-bottom: 1px solid var(--line); background: var(--accent-light); }
  .msg-text { font-family: 'Playfair Display', serif; font-size: 1rem; font-style: italic; color: var(--accent); line-height: 1.75; text-align: center; }
  .msg-from { font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--accent); text-align: center; margin-top: .75rem; opacity: .7; }

  .card-rsvp { padding: 2rem; }
  .rsvp-title { font-size: .65rem; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; text-align: center; }
  .rsvp-btns { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
  .btn-hadir {
    background: var(--ink); color: #fff; padding: .85rem;
    font-family: 'Outfit', sans-serif; font-size: .72rem;
    letter-spacing: .12em; text-transform: uppercase;
    border: none; cursor: pointer; transition: background .2s, transform .15s; font-weight: 500;
  }
  .btn-hadir:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-berhalangan {
    background: none; color: var(--ink); padding: .85rem;
    font-family: 'Outfit', sans-serif; font-size: .72rem;
    letter-spacing: .12em; text-transform: uppercase;
    border: 1px solid var(--line); cursor: pointer; transition: all .2s;
  }
  .btn-berhalangan:hover { border-color: var(--ink); }

  .card-footer { padding: 1.25rem 2rem; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; }
  .footer-note { font-size: .65rem; color: var(--muted); letter-spacing: .04em; }
  .footer-mark { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--accent); }

  .toast {
    position: fixed; bottom: 2rem; left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--ink); color: #fff;
    padding: .75rem 1.5rem; font-size: .72rem;
    letter-spacing: .1em; text-transform: uppercase;
    opacity: 0; transition: all .3s; pointer-events: none; z-index: 99;
    font-family: 'Outfit', sans-serif;
  }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

  @keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
`;

const TARGET_DATE = new Date("2026-06-14T09:00:00");

function useCountdown(target) {
  const calc = () => {
    const diff = target - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
      done: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function App() {
  const { d, h, m, s, done } = useCountdown(TARGET_DATE);
  const [toast, setToast] = useState({ msg: "", show: false });

  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = styles;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  };

  const openMaps = () => {
    showToast("Membuka maps!");
    window.open("https://maps.app.goo.gl/v2pa5RepFbbUjNV56", "_blank");
  };

  return (
    <>
      <div className="page">
        <div className="card">
          {/* Header */}
          <div className="card-top">
            <div className="deco-line" />
            <div className="tag">Undangan Wisuda</div>
            <div className="invite-label">Dengan bangga mempersembahkan</div>
            <div className="name">
              <em>Patrecya Chindy</em>
            </div>
            <div className="degree">
              Sarjana Ilmu Komputer
              <br />
              STMIK Profesional Makassar · 2026
            </div>
          </div>

          {/* Countdown */}
          {!done && (
            <div className="countdown-row">
              {[
                ["cd-d", d, "Hari"],
                ["cd-h", h, "Jam"],
                ["cd-m", m, "Menit"],
                ["cd-s", s, "Detik"],
              ].map(([id, val, lbl]) => (
                <div key={id} className="cd-block">
                  <div className="cd-num">{pad(val)}</div>
                  <div className="cd-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          )}

          {/* Date & Time */}
          <div className="card-mid">
            <div className="info-block">
              <div className="info-label">Tanggal</div>
              <div className="info-val">
                Sabtu,
                <br />
                14 Juni 2026
              </div>
            </div>
            <div className="info-block">
              <div className="info-label">Waktu</div>
              <div className="info-val">09.00 WIB</div>
              <div className="info-sub">
                Harap tiba 30 menit
                <br />
                sebelum acara dimulai
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="card-venue">
            <div className="venue-left">
              <div className="info-label">Lokasi</div>
              <div className="venue-name">STMIK Profesional Makassar</div>
              <div className="venue-addr">
                Jl. A.P Pettarani
                <br />
                Makassar
              </div>
            </div>
            <button className="map-btn" onClick={openMaps}>
              Lihat Peta
            </button>
          </div>

          {/* Message */}
          <div className="card-msg">
            <div className="msg-text">
              "Ini bukan akhir dari perjalanan,
              <br />
              melainkan awal dari babak baru
              <br />
              yang lebih indah."
            </div>
            <div className="msg-from">— Keluarga & Sahabat Chindy</div>
          </div>

          {/* RSVP */}
          <div className="card-rsvp">
            <div className="rsvp-title">Konfirmasi Kehadiran</div>
            <div className="rsvp-btns">
              <button
                className="btn-hadir"
                onClick={() =>
                  showToast("Terima kasih! Kami menantikan kehadiranmu.")
                }
              >
                Saya Hadir
              </button>
              <button
                className="btn-berhalangan"
                onClick={() => showToast("Terima kasih atas responnya.")}
              >
                Berhalangan
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer">
            <div className="footer-note">Dress code: Formal · 2026</div>
            <div className="footer-mark">C.</div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>
    </>
  );
}
