"use client";
import { useEffect, useState } from "react";

// Next CS Week: February 22, 2027
const NEXT_CS_WEEK = new Date("2027-02-22T00:00:00");

function getTimeLeft() {
  const diff = NEXT_CS_WEEK.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: `${(i * 37 + 11) % 97}%`,
  y: `${(i * 53 + 7) % 95}%`,
  delay: `${(i * 0.3) % 4}s`,
  dur: `${2 + ((i * 0.2) % 3)}s`,
  size: `${2 + (i % 3)}px`,
}));

const SHUTDOWN_TEXT = "CS WEEK 2026 SHUTTING DOWN...";

type Phase = "shutdown" | "fade" | "goodbye";

export default function Goodbye() {
  const [phase, setPhase] = useState<Phase>("shutdown");
  const [shutdownText, setShutdownText] = useState("");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  // Typewriter for shutdown message
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShutdownText(SHUTDOWN_TEXT.slice(0, i + 1));
      i++;
      if (i >= SHUTDOWN_TEXT.length) {
        clearInterval(id);
        // Hold for a moment then fade to goodbye
        setTimeout(() => setPhase("fade"), 1200);
        setTimeout(() => setPhase("goodbye"), 1900);
      }
    }, 60);
    return () => clearInterval(id);
  }, []);

  // Countdown ticker
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <main className="game-root scanlines">
      <div className="goodbye-screen">
        {/* Star field */}
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

        {/* ── Shutdown phase ─────────────────────────── */}
        {(phase === "shutdown" || phase === "fade") && (
          <div
            className={`shutdown-screen${phase === "fade" ? " shutdown-fade" : ""}`}
          >
            <p className="shutdown-text">
              {shutdownText}
              {shutdownText.length < SHUTDOWN_TEXT.length && (
                <span className="cursor">_</span>
              )}
            </p>
          </div>
        )}

        {/* ── Goodbye phase ──────────────────────────── */}
        {phase === "goodbye" && (
          <div className="goodbye-content">
            {/* Header */}
            <div className="goodbye-header">
              <div className="goodbye-deco">◆ ★ ◆</div>
              <h1 className="goodbye-title">TIL&apos; NEXT TIME</h1>
              <div className="goodbye-deco">◆ ★ ◆</div>
            </div>

            {/* Countdown box */}
            <div className="countdown-wrapper">
              <div className="countdown-label">NEXT CS WEEK IN</div>
              <div className="countdown-grid">
                <div className="countdown-unit">
                  <span className="countdown-value">{pad(timeLeft.days)}</span>
                  <span className="countdown-key">DAYS</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                  <span className="countdown-value">{pad(timeLeft.hours)}</span>
                  <span className="countdown-key">HRS</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                  <span className="countdown-value">
                    {pad(timeLeft.minutes)}
                  </span>
                  <span className="countdown-key">MIN</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                  <span className="countdown-value">
                    {pad(timeLeft.seconds)}
                  </span>
                  <span className="countdown-key">SEC</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="goodbye-footer">
              <span>© CS CUBE 2026</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
