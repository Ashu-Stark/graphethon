import React from 'react';

/**
 * Robot3D — SVG-based robot matching the reference image exactly.
 * White spherical head, dark screen with blue frame, two white eyes,
 * horizontal mouth line, large right ear with concentric rings,
 * blue collar, egg-shaped white body, blue chest panel, stubby arms.
 */
export default function Robot3D({ size = 320 }) {
    const s = size / 320; // scale factor

    return (
        <div
            className="robot3d-wrap"
            style={{ width: size, height: size * 1.2, animation: 'robot-float 4s ease-in-out infinite', filter: 'drop-shadow(0 24px 60px rgba(30,80,220,0.55))' }}
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 320 384"
                width={size}
                height={size * 1.2}
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    {/* Head white sphere gradient */}
                    <radialGradient id="rg-head" cx="38%" cy="28%" r="62%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="55%" stopColor="#dce6ff" />
                        <stop offset="100%" stopColor="#a8b8e0" />
                    </radialGradient>

                    {/* Body gradient */}
                    <radialGradient id="rg-body" cx="35%" cy="22%" r="70%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="55%" stopColor="#d8e4ff" />
                        <stop offset="100%" stopColor="#a8b8e0" />
                    </radialGradient>

                    {/* Arm gradient */}
                    <radialGradient id="rg-arm" cx="35%" cy="25%" r="65%">
                        <stop offset="0%" stopColor="#f0f4ff" />
                        <stop offset="60%" stopColor="#d0daef" />
                        <stop offset="100%" stopColor="#a8b4d4" />
                    </radialGradient>

                    {/* Screen dark gradient */}
                    <radialGradient id="rg-screen" cx="50%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#161a40" />
                        <stop offset="100%" stopColor="#03050f" />
                    </radialGradient>

                    {/* Eye glow */}
                    <radialGradient id="rg-eye" cx="38%" cy="35%" r="55%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="80%" stopColor="#d8e8ff" />
                        <stop offset="100%" stopColor="#aac0ff" />
                    </radialGradient>

                    {/* Ear gradient */}
                    <radialGradient id="rg-ear" cx="35%" cy="28%" r="62%">
                        <stop offset="0%" stopColor="#f0f4ff" />
                        <stop offset="60%" stopColor="#d4dcf8" />
                        <stop offset="100%" stopColor="#b0bce0" />
                    </radialGradient>

                    {/* Ear lens / camera */}
                    <radialGradient id="rg-lens" cx="35%" cy="30%" r="55%">
                        <stop offset="0%" stopColor="#7090ee" />
                        <stop offset="50%" stopColor="#3a5acc" />
                        <stop offset="100%" stopColor="#1a2888" />
                    </radialGradient>

                    {/* Collar / neck blue gradient */}
                    <linearGradient id="rg-collar" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#5b78f8" />
                        <stop offset="100%" stopColor="#2a44cc" />
                    </linearGradient>

                    {/* Chest panel */}
                    <radialGradient id="rg-chest" cx="40%" cy="28%" r="60%">
                        <stop offset="0%" stopColor="#a8c8ff" />
                        <stop offset="55%" stopColor="#5878ee" />
                        <stop offset="100%" stopColor="#2a44cc" />
                    </radialGradient>

                    {/* Antenna ball */}
                    <radialGradient id="rg-antball" cx="35%" cy="28%" r="58%">
                        <stop offset="0%" stopColor="#a0b8ff" />
                        <stop offset="55%" stopColor="#3a5acc" />
                        <stop offset="100%" stopColor="#1a2888" />
                    </radialGradient>

                    {/* Drop shadows */}
                    <filter id="f-head" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="4" dy="8" stdDeviation="8" floodColor="#2040a0" floodOpacity="0.35" />
                    </filter>
                    <filter id="f-body" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="4" dy="10" stdDeviation="10" floodColor="#2040a0" floodOpacity="0.35" />
                    </filter>
                    <filter id="f-screen" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3060ff" floodOpacity="0.6" />
                    </filter>
                    <filter id="f-eye" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#80c0ff" floodOpacity="0.9" />
                    </filter>
                    <filter id="f-collar" x="-20%" y="-30%" width="140%" height="160%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#2040cc" floodOpacity="0.6" />
                    </filter>
                </defs>

                {/* ─── ANTENNA STICK ─── */}
                <line x1="160" y1="28" x2="160" y2="72"
                    stroke="#c8d4f8" strokeWidth="5" strokeLinecap="round" />

                {/* ANTENNA BALL */}
                <circle cx="160" cy="24" r="11" fill="url(#rg-antball)"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(80,120,255,0.9))' }} />
                {/* antenna ball highlight */}
                <circle cx="155" cy="19" r="4" fill="rgba(200,220,255,0.55)" />

                {/* ─── HEAD ─── */}
                {/* Main head sphere */}
                <ellipse cx="160" cy="138" rx="95" ry="90" fill="url(#rg-head)" filter="url(#f-head)" />

                {/* Head highlight (top-left sheen) */}
                <ellipse cx="128" cy="98" rx="38" ry="28" fill="rgba(255,255,255,0.52)"
                    transform="rotate(-20 128 98)" />

                {/* ─── EAR / CAMERA (right side) ─── */}
                <circle cx="250" cy="130" r="35" fill="url(#rg-ear)"
                    style={{ filter: 'drop-shadow(2px 4px 6px rgba(40,60,160,0.25))' }} />
                {/* Ear inner ring 1 */}
                <circle cx="250" cy="130" r="25" fill="none" stroke="#c8d4ee" strokeWidth="1.5" />
                {/* Ear inner ring 2 */}
                <circle cx="250" cy="130" r="17" fill="none" stroke="#b0c0e0" strokeWidth="1.5" />
                {/* Ear lens */}
                <circle cx="250" cy="130" r="13" fill="url(#rg-lens)"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(60,100,255,0.7))' }} />
                {/* Lens highlight */}
                <circle cx="245" cy="125" r="4" fill="rgba(180,210,255,0.55)" />
                {/* Ear highlight */}
                <ellipse cx="240" cy="118" rx="10" ry="7" fill="rgba(255,255,255,0.4)" transform="rotate(-20 240 118)" />

                {/* ─── LEFT SIDE ATTACHMENT (small rectangle on head left) ─── */}
                <rect x="65" y="118" width="12" height="24" rx="6"
                    fill="url(#rg-ear)"
                    style={{ filter: 'drop-shadow(1px 2px 4px rgba(40,60,160,0.2))' }} />

                {/* ─── SCREEN (inside head) ─── */}
                <rect x="98" y="96" width="114" height="98" rx="18" fill="url(#rg-screen)" filter="url(#f-screen)" />
                {/* Screen blue outer border */}
                <rect x="98" y="96" width="114" height="98" rx="18"
                    fill="none" stroke="#4a66ee" strokeWidth="5"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(70,110,255,0.8))' }} />
                {/* Screen inner glow rim */}
                <rect x="100" y="98" width="110" height="94" rx="16"
                    fill="none" stroke="rgba(80,120,255,0.25)" strokeWidth="3" />

                {/* Eyes */}
                <circle cx="130" cy="133" r="13" fill="url(#rg-eye)" filter="url(#f-eye)">
                    <animate attributeName="ry" values="13;13;13;13;2;13;13" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="174" cy="133" r="13" fill="url(#rg-eye)" filter="url(#f-eye)">
                    <animate attributeName="ry" values="13;13;13;13;2;13;13" dur="5s" repeatCount="indefinite" />
                </circle>
                {/* Eye highlights */}
                <circle cx="125" cy="128" r="4" fill="rgba(255,255,255,0.75)" />
                <circle cx="169" cy="128" r="4" fill="rgba(255,255,255,0.75)" />

                {/* Mouth line */}
                <line x1="140" y1="171" x2="178" y2="171"
                    stroke="rgba(160,190,255,0.75)" strokeWidth="4" strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(120,160,255,0.6))' }} />

                {/* ─── COLLAR ─── */}
                {/* Outer collar shape */}
                <path d="M 108 218 Q 160 238 212 218 Q 208 245 160 248 Q 112 245 108 218 Z"
                    fill="url(#rg-collar)" filter="url(#f-collar)" />
                {/* Collar highlight */}
                <path d="M 118 222 Q 160 236 202 222"
                    fill="none" stroke="rgba(200,220,255,0.35)" strokeWidth="2" />

                {/* ─── BODY ─── */}
                {/* Left arm (behind body) */}
                <ellipse cx="82" cy="292" rx="26" ry="36" fill="url(#rg-arm)"
                    style={{ filter: 'drop-shadow(2px 6px 8px rgba(40,60,160,0.25))' }} />
                <ellipse cx="75" cy="278" rx="10" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(-15 75 278)" />

                {/* Right arm (behind body) */}
                <ellipse cx="238" cy="292" rx="26" ry="36" fill="url(#rg-arm)"
                    style={{ filter: 'drop-shadow(2px 6px 8px rgba(40,60,160,0.25))' }} />
                <ellipse cx="245" cy="278" rx="10" ry="7" fill="rgba(255,255,255,0.45)" transform="rotate(15 245 278)" />

                {/* Main body — egg / teardrop shape */}
                <ellipse cx="160" cy="302" rx="82" ry="78" fill="url(#rg-body)" filter="url(#f-body)" />
                {/* Body highlight */}
                <ellipse cx="132" cy="262" rx="36" ry="25" fill="rgba(255,255,255,0.48)" transform="rotate(-18 132 262)" />

                {/* ─── CHEST PANEL ─── */}
                <rect x="128" y="282" width="64" height="56" rx="16" fill="url(#rg-chest)"
                    style={{ filter: 'drop-shadow(0 4px 12px rgba(50,100,240,0.5))' }} />
                {/* Chest highlight */}
                <ellipse cx="148" cy="292" rx="18" ry="10" fill="rgba(200,230,255,0.45)" transform="rotate(-10 148 292)" />
            </svg>
        </div>
    );
}
