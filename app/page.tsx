"use client";
import { useState, useEffect } from "react";

// ─── Floating particle config ───────────────────────────────────────────────
const PARTICLES = [
  {
    id: 0,
    char: "★",
    left: "4%",
    delay: "0s",
    duration: "8.5s",
    color: "#FFD700",
    size: "22px",
  },
  {
    id: 1,
    char: "◆",
    left: "12%",
    delay: "1.4s",
    duration: "10.2s",
    color: "#67E3DF",
    size: "15px",
  },
  {
    id: 2,
    char: "●",
    left: "22%",
    delay: "3.1s",
    duration: "7.3s",
    color: "#C25226",
    size: "18px",
  },
  {
    id: 3,
    char: "▲",
    left: "31%",
    delay: "0.8s",
    duration: "9.0s",
    color: "#6185FF",
    size: "16px",
  },
  {
    id: 4,
    char: "★",
    left: "43%",
    delay: "5.0s",
    duration: "8.8s",
    color: "#B69D5C",
    size: "28px",
  },
  {
    id: 5,
    char: "◆",
    left: "55%",
    delay: "2.3s",
    duration: "11.1s",
    color: "#FFD700",
    size: "20px",
  },
  {
    id: 6,
    char: "●",
    left: "64%",
    delay: "4.5s",
    duration: "7.8s",
    color: "#E52222",
    size: "13px",
  },
  {
    id: 7,
    char: "▲",
    left: "73%",
    delay: "1.9s",
    duration: "9.5s",
    color: "#67E3DF",
    size: "24px",
  },
  {
    id: 8,
    char: "★",
    left: "82%",
    delay: "6.2s",
    duration: "8.0s",
    color: "#C25226",
    size: "17px",
  },
  {
    id: 9,
    char: "◆",
    left: "91%",
    delay: "3.7s",
    duration: "10.6s",
    color: "#E52222",
    size: "14px",
  },
  {
    id: 10,
    char: "●",
    left: "7%",
    delay: "7.0s",
    duration: "9.2s",
    color: "#6185FF",
    size: "19px",
  },
  {
    id: 11,
    char: "★",
    left: "48%",
    delay: "2.0s",
    duration: "7.6s",
    color: "#FFD700",
    size: "32px",
  },
  {
    id: 12,
    char: "▲",
    left: "37%",
    delay: "4.8s",
    duration: "8.3s",
    color: "#B69D5C",
    size: "21px",
  },
  {
    id: 13,
    char: "◆",
    left: "69%",
    delay: "0.3s",
    duration: "10.9s",
    color: "#67E3DF",
    size: "12px",
  },
  {
    id: 14,
    char: "●",
    left: "88%",
    delay: "5.5s",
    duration: "7.1s",
    color: "#E52222",
    size: "25px",
  },
];

// Static star positions for the game screen background
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${(i * 37 + 11) % 97}%`,
  y: `${(i * 53 + 7) % 95}%`,
  delay: `${(i * 0.3) % 4}s`,
  dur: `${2 + ((i * 0.2) % 3)}s`,
  size: `${2 + (i % 3)}px`,
}));

const FULL_TEXT = "LET THE\nGAMES BEGIN!";

type Screen = "menu" | "transition" | "game";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [menuExiting, setMenuExiting] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  // Play button handler
  const handlePlay = () => {
    if (btnPressed) return;
    setBtnPressed(true);
    setTimeout(() => {
      setMenuExiting(true);
      setTimeout(() => {
        setScreen("transition");
        setTimeout(() => {
          setScreen("game");
        }, 800);
      }, 300);
    }, 180);
  };

  // Typewriter on game screen
  useEffect(() => {
    if (screen !== "game") return;
    setDisplayText("");
    setShowCelebration(false);
    let i = 0;
    const chars = FULL_TEXT.split("");
    const id = setInterval(() => {
      setDisplayText(FULL_TEXT.slice(0, i + 1));
      i++;
      if (i >= chars.length) {
        clearInterval(id);
        setTimeout(() => setShowCelebration(true), 300);
      }
    }, 75);
    return () => clearInterval(id);
  }, [screen]);

  return (
    <main className="game-root scanlines">
      {/* ── Transition Overlay ─────────────────────────── */}
      {screen === "transition" && <div className="transition-overlay" />}

      {/* ── Menu Screen ─────────────────────────────────── */}
      {screen === "menu" && (
        <div className={`menu-screen${menuExiting ? " menu-exit" : ""}`}>
          {/* Floating particles */}
          <div className="particles-layer">
            {PARTICLES.map((p) => (
              <span
                key={p.id}
                className="particle"
                style={{
                  left: p.left,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  color: p.color,
                  fontSize: p.size,
                }}
              >
                {p.char}
              </span>
            ))}
          </div>

          {/* Top decoration */}
          <div className="top-decoration">
            {[
              ["◼", "#E52222"],
              ["▲", "#FFD700"],
              ["◼", "#6185FF"],
              ["◼", "#6185FF"],
              ["▲", "#FFD700"],
              ["◼", "#E52222"],
            ].map(([char, color], i) => (
              <span key={i} className="deco-item" style={{ color }}>
                {char}
              </span>
            ))}
          </div>

          {/* Centre content */}
          <div className="menu-container">
            <div className="title-wrapper">
              <div className="title-sub">~ CS CUBE PRESENTS ~</div>
              <h1 className="game-title">
                <span className="title-cs">CS</span>
                <span className="title-week">WEEK</span>
                <span className="title-year">2026</span>
              </h1>
              <div className="title-tagline">▶ PRESS START ◀</div>
            </div>

            <button
              className={`play-btn${btnPressed ? " pressed" : ""}`}
              onClick={handlePlay}
              disabled={btnPressed}
            >
              ▶&nbsp; PLAY
            </button>

            <div className="insert-coin">
              <span className="coin-icon">●</span>
              INSERT COIN
              <span className="coin-icon">●</span>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bottom-bar">
            <span className="score-display">HI-SCORE: 99999</span>
            <span className="score-display">© CS CLUB 2026</span>
          </div>
        </div>
      )}

      {/* ── Game Screen ──────────────────────────────────── */}
      {screen === "game" && (
        <div className="game-screen">
          {/* Static star field */}
          {STARS.map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
                animationDuration: s.dur,
              }}
            />
          ))}

          {/* Celebration burst particles */}
          {showCelebration &&
            PARTICLES.map((p) => (
              <span
                key={p.id}
                className="celebration-particle"
                style={{
                  left: p.left,
                  animationDelay: `${parseFloat(p.delay) * 0.25}s`,
                  animationDuration: `${1.4 + ((p.id * 0.18) % 0.8)}s`,
                  color: p.color,
                  fontSize: p.size,
                }}
              >
                {p.char}
              </span>
            ))}

          {/* Main message */}
          <div className="game-content">
            <div className="pixel-border-box">
              <p className={`lets-play${showCelebration ? " rainbow" : ""}`}>
                {displayText.split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
                {displayText.length < FULL_TEXT.length && (
                  <span className="cursor">_</span>
                )}
              </p>
            </div>

            {showCelebration && (
              <div className="celebration-row">
                {["★", "◆", "★", "◆", "★"].map((c, i) => (
                  <span key={i}>{c}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
