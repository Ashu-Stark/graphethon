import React, { useState } from 'react';
import { INDIA_PATHS, STATES_XY } from '../data/mapData';

function getColor(p, max, isHost) {
    if (isHost) return '#ddf51a';
    const r = p / max;
    if (r > 0.7) return '#2B4FD8';
    if (r > 0.45) return '#22d3a0';
    if (r > 0.25) return '#a855f7';
    return '#818cf8';
}

function getRadius(p, max) {
    return 6 + (p / max) * 15;
}

/* ── Component ─────────────────────────────────────────────────────── */
export default function IndiaMap() {
    const [tooltip, setTooltip] = useState(null);
    const maxP = Math.max(...STATES_XY.map(s => s.participants));
    const totalP = STATES_XY.reduce((sum, s) => sum + s.participants, 0);
    const sorted = [...STATES_XY].sort((a, b) => b.participants - a.participants);

    return (
        <section id="map" className="state-map">
            <div className="section-inner">

                {/* Header */}
                <div className="map-header">
                    <div className="section-tag">Participation Heatmap</div>
                    <h2 className="section-title">
                        Where India's <span className="yellow">Innovators</span> Come From
                    </h2>
                    <p className="section-desc">
                        {STATES_XY.length} states represented — {totalP}+ participants converging at
                        Graphic Era University, Dehradun.
                    </p>
                </div>

                {/* Summary stats */}
                <div className="map-stats-row">
                    <div className="map-stat-box blue">
                        <div className="map-stat-num">{totalP}+</div>
                        <div className="map-stat-label">Participants</div>
                    </div>
                    <div className="map-stat-box green">
                        <div className="map-stat-num">{STATES_XY.length}</div>
                        <div className="map-stat-label">States</div>
                    </div>
                    <div className="map-stat-box yellow">
                        <div className="map-stat-num" style={{ fontSize: 20 }}>Dehradun</div>
                        <div className="map-stat-label">Host City ★</div>
                    </div>
                </div>

                {/* Map + rankings */}
                <div className="map-body">

                    {/* SVG India map */}
                    <div className="map-svg-wrap" style={{ position: 'relative' }}>
                        <svg viewBox="0 0 611.86 695.70" style={{ width: '100%', display: 'block' }}>
                            <defs>
                                <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="host-glow" x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter id="outline-glow" x="-5%" y="-5%" width="110%" height="110%">
                                    <feGaussianBlur stdDeviation="1" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <radialGradient id="indiaBg" cx="50%" cy="50%" r="55%">
                                    <stop offset="0%" stopColor="rgba(0,153,255,0.14)" />
                                    <stop offset="100%" stopColor="rgba(5,13,26,0)" />
                                </radialGradient>
                            </defs>

                            {/* Background glow */}
                            <ellipse cx="305" cy="347" rx="280" ry="320" fill="url(#indiaBg)" />

                            {/* India outline — filled + glowing stroke */}
                            <g filter="url(#outline-glow)">
                                {INDIA_PATHS.map((pathData, idx) => (
                                    <path
                                        key={`g-${idx}`}
                                        d={pathData.d}
                                        fill="rgba(0,140,255,0.08)"
                                        stroke="rgba(0,180,255,0.65)"
                                        strokeWidth="1.8"
                                        strokeLinejoin="round"
                                    />
                                ))}
                            </g>

                            {/* Second pass — brighter thin inner line */}
                            <g>
                                {INDIA_PATHS.map((pathData, idx) => (
                                    <path
                                        key={`inner-${idx}`}
                                        d={pathData.d}
                                        fill="none"
                                        stroke="rgba(100,220,255,0.45)"
                                        strokeWidth="0.8"
                                        strokeLinejoin="round"
                                    />
                                ))}
                            </g>

                            {/* State dots */}
                            {STATES_XY.map((s, i) => {
                                const r = getRadius(s.participants, maxP);
                                const col = getColor(s.participants, maxP, s.isHost);
                                const cx = parseFloat(s.x);
                                const cy = parseFloat(s.y);
                                return (
                                    <g key={i}>
                                        <g
                                            filter={s.isHost ? 'url(#host-glow)' : 'url(#dot-glow)'}
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={e => setTooltip({ ...s, mx: e.clientX, my: e.clientY })}
                                            onMouseLeave={() => setTooltip(null)}
                                        >
                                            {s.isHost && (
                                                <>
                                                    <circle cx={cx} cy={cy} r={r + 10} fill="none"
                                                        stroke="#ddf51a" strokeWidth="1.2" opacity="0.7">
                                                        <animate attributeName="r" from={r + 5} to={r + 22} dur="2s" repeatCount="indefinite" />
                                                        <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
                                                    </circle>
                                                    <circle cx={cx} cy={cy} r={r + 5} fill="none"
                                                        stroke="#ddf51a" strokeWidth="0.9" opacity="0.5" />
                                                </>
                                            )}
                                            <circle
                                                cx={cx} cy={cy} r={r}
                                                fill={col} fillOpacity="0.95"
                                                stroke={col} strokeWidth="1.5"
                                            />
                                        </g>
                                        <text
                                            x={cx + (s.dx ? s.dx : 0)}
                                            y={cy + r + 13 + (s.dy ? s.dy : 0)}
                                            textAnchor="middle"
                                            fontSize={s.isHost ? '12' : '10'}
                                            fill={s.isHost ? '#ddf51a' : '#fff'}
                                            fontFamily="Figtree, sans-serif"
                                            fontWeight="800"
                                            style={{
                                                pointerEvents: 'none',
                                                textShadow: '0px 1px 3px rgba(0,0,0,0.8)'
                                            }}
                                        >
                                            {s.name}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Host city pin marker */}
                            {(() => {
                                const host = STATES_XY.find(s => s.isHost);
                                if (!host) return null;
                                const cx = parseFloat(host.x);
                                const cy = parseFloat(host.y);
                                return (
                                    <line
                                        x1={cx} y1={cy - getRadius(host.participants, maxP) - 22}
                                        x2={cx} y2={cy - getRadius(host.participants, maxP) - 6}
                                        stroke="#ddf51a" strokeWidth="1.5" opacity="0.8"
                                    />
                                );
                            })()}
                        </svg>

                        {/* Tooltip */}
                        {tooltip && (
                            <div style={{
                                position: 'fixed',
                                top: tooltip.my - 12,
                                left: tooltip.mx + 16,
                                background: 'rgba(6,14,30,0.96)',
                                border: `1px solid ${tooltip.isHost ? '#ddf51a' : 'rgba(0,180,255,0.55)'}`,
                                borderRadius: 10,
                                padding: '10px 16px',
                                pointerEvents: 'none',
                                zIndex: 9999,
                                backdropFilter: 'blur(12px)',
                                minWidth: 148,
                            }}>
                                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--blue)', marginBottom: 4 }}>
                                    {tooltip.name}{tooltip.isHost ? ' ★' : ''}
                                </div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: tooltip.isHost ? '#ddf51a' : '#00ccff' }}>
                                    {tooltip.participants}
                                </div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                                    {tooltip.isHost ? 'Host State · Dehradun' : 'participants'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rankings sidebar */}
                    <div className="map-rankings">
                        <div className="map-rankings-title">State Rankings</div>
                        <div className="map-rankings-list">
                            {sorted.slice(0, 12).map((s, i) => (
                                <div key={i} className="map-rank-row">
                                    <span className="rank-num">{i + 1}</span>
                                    <span className="rank-name" style={{
                                        color: s.isHost ? '#ddf51a' : '#2B4FD8'
                                    }}>
                                        {s.name}{s.isHost ? ' ★' : ''}
                                    </span>
                                    <div className="rank-bar-wrap">
                                        <div
                                            className="rank-bar-fill"
                                            style={{
                                                width: `${(s.participants / maxP) * 100}%`,
                                                background: s.isHost
                                                    ? 'linear-gradient(90deg,#ddf51a,#b8cc00)'
                                                    : 'linear-gradient(90deg,#2B4FD8,#22d3a0)',
                                            }}
                                        />
                                    </div>
                                    <span className="rank-count" style={{
                                        color: s.isHost ? '#ddf51a' : '#2B4FD8'
                                    }}>
                                        {s.participants}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="map-legend">
                            <div className="map-legend-title">Legend</div>
                            {[
                                { col: '#ddf51a', label: 'Host State (Uttarakhand)' },
                                { col: '#2B4FD8', label: 'High participation (70%+)' },
                                { col: '#22d3a0', label: 'Medium participation (45–70%)' },
                                { col: '#a855f7', label: 'Growing (25–45%)' },
                                { col: '#818cf8', label: 'Emerging (<25%)' },
                            ].map((item, i) => (
                                <div key={i} className="map-legend-row">
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.col, flexShrink: 0 }} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

