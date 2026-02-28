import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import RobotCanvas from './RobotCanvas';
import IndiaMap from './IndiaMap';

// ─── ASSET PATHS ──────────────────────────────────────────────────────
const A = {
    heroBg: '/recolored_assets/XAhi5sRdv5P0hkgDG16c0oHiSKM.svg',
    aboutIllo: '/recolored_assets/AMBofPZgXzCC9qcwqwhGv9Vk.svg',
    howIllo: '/recolored_assets/BLiofAgGdcbOLwOqLSPAb4CwVT0.svg',
    itineraryIllo: '/recolored_assets/SlRyMONKTDYfLzw2nkHWqrkmtUs.svg',
    circuitGrid: '/recolored_assets/Ump2bqrU3xCQ9MzIMJM1y7HjJRw.svg',
    cardFrame: '/recolored_assets/pkMr7YSMVZivUwm4SOPqy6iaoWw.svg',
    cardFrameSm: '/recolored_assets/lVvbWy0NLHEZZRL2Rkm9g0GNjM.svg',
    cardFrameLg: '/recolored_assets/SlyMS1dIqBxNZywFD6SbfUkXB8.svg',
    deco1: '/recolored_assets/cgriJ1KcQEhO0axz2pL4ROarW1k.svg',
};

// ─── TRACKS ───────────────────────────────────────────────────────────
const TRACKS = [
    {
        id: 1, icon: '/health_icon.png',
        name: 'Intelligent Health & Learning', sdg: 'SDG 3: Health · SDG 4: Education',
        desc: 'Telemedicine, AI for mental health, disaster response, EdTech, Inclusive platforms, Teacher upskilling, Accessibility.',
        color: '#0099ff', shadow: 'rgba(0,153,255,0.35)',
        gradient: 'linear-gradient(135deg,rgba(0,153,255,0.1) 0%,transparent 60%)',
        tag: 'Health · EdTech',
    },
    {
        id: 2, icon: '/smart_city_icon.png',
        name: 'Resilient Cities & Energy', sdg: 'SDG 7: Clean Energy · SDG 11: Urban Life',
        desc: 'Renewable tech, Energy analytics, green power grids, Pollution, Sustainable cities, Circular waste management.',
        color: '#22d3a0', shadow: 'rgba(34,211,160,0.35)',
        gradient: 'linear-gradient(135deg,rgba(34,211,160,0.1) 0%,transparent 60%)',
        tag: 'Smart Cities · CleanTech',
    },
    {
        id: 3, icon: '/fintech_icon.png',
        name: 'Digital Infrastructure & Security', sdg: 'SDG 9: Innovation',
        desc: 'Blockchain for impact, Smart infrastructure, IoT for sustainability, Defence & National Security, Creative tech solutions.',
        color: '#a855f7', shadow: 'rgba(168,85,247,0.35)',
        gradient: 'linear-gradient(135deg,rgba(168,85,247,0.1) 0%,transparent 60%)',
        tag: 'Innovation · Security',
    },
    {
        id: 4, icon: '/climate_icon.png',
        name: 'Climate Action & Agritech', sdg: 'SDG 13: Climate',
        desc: 'Adaptation tools, Citizen climate action apps, Sustainable mobility.',
        color: '#4ade80', shadow: 'rgba(74,222,128,0.35)',
        gradient: 'linear-gradient(135deg,rgba(74,222,128,0.1) 0%,transparent 60%)',
        tag: 'Climate · AgriTech',
    },
];

const WHY_CARDS = [
    { icon: '🏆', title: '₹4,50,000 Cash Prizes', desc: 'Top 3 teams win significant cash rewards + ₹1.5L total incubation support.' },
    { icon: '🧑‍🏫', title: 'Expert Mentorship', desc: 'Get guided by domain experts and industry practitioners throughout the 72 hours.' },
    { icon: '🚀', title: 'TBI Incubation', desc: "Top 10 teams get incubation support and pitch sessions with the TBI Startup team." },
    { icon: '🌐', title: 'National Scale', desc: 'Join 5,000+ registrants from 25 states and 340+ institutions across India.' },
    { icon: '📜', title: 'Physical Certificates', desc: 'All offline finalists receive physical participation certificates and exclusive goodies.' },
    { icon: '🔧', title: 'Real-World Impact', desc: 'Solving actual problems aligned with UN SDGs for resilient and equitable futures.' },
];

// Timeline from user data
const ITINERARY = {
    'Hackathon Day 1': {
        date: 'April 2, 2026',
        events: [
            { time: '09:00 AM', icon: '�', title: 'Registration & Check-in', desc: 'Participants arrive, complete registrations, grab badges, and get settled.' },
            { time: '10:00 AM', icon: '🎬', title: 'Inauguration & Theme Reveal', desc: 'Opening ceremony and reveal of problem statements and SDG focus.' },
            { time: '12:00 PM', icon: '�', title: 'Hacking Begins', desc: 'Teams start building their graph-powered solutions with mentor support.' },
        ],
    },
    'Hackathon Day 2': {
        date: 'April 3, 2026',
        events: [
            { time: '11:00 AM', icon: '�', title: 'Midway Checkpoint', desc: 'Optional deep-dive workshops and progress alignment with SDG goals.' },
            { time: '09:00 PM', icon: '☕', title: 'Late Night Sprint', desc: 'Final building stretch with music, caffeine, and energy activities.' },
        ],
    },
    'Hackathon Day 3': {
        date: 'April 5, 2026',
        events: [
            { time: '10:00 AM', icon: '🚀', title: 'Project Demos & Judging', desc: 'Teams present prototypes to the jury, showcasing tech and impact.' },
            { time: '04:00 PM', icon: '🏆', title: 'Closing & Awards', desc: 'Winners announced, celebrations, photos, and final networking.' },
        ],
    },
};

// ─── COUNTDOWN HOOK ───────────────────────────────────────────────────
function useCountdown(targetDate) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
    useEffect(() => {
        const update = () => {
            const diff = new Date(targetDate) - new Date();
            if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 }); return; }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins: Math.floor((diff % 3600000) / 60000),
                secs: Math.floor((diff % 60000) / 1000),
            });
        };
        update();
        const t = setInterval(update, 1000);
        return () => clearInterval(t);
    }, [targetDate]);
    return timeLeft;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────
function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <a href="#hero" className="nav-logo">
                    <img src="/tbi_official_logo_v2.png" alt="Graph-e-Thon" />
                    <span className="nav-logo-text">GRAPH-E-THON</span>
                </a>
                <div className="nav-menu">
                    <a href="#about">About</a>
                    <a href="#tracks">Tracks</a>
                    <a href="#why">Prizes</a>
                    <a href="#how">How It Works</a>
                    <a href="#itinerary">Itinerary</a>
                    <a href="#map">Participation</a>
                </div>
                <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="nav-cta">
                    Register on Unstop →
                </a>
            </div>
        </nav>
    );
}

// ─── HERO ─────────────────────────────────────────────────────────────
function Hero() {
    const { days, hours, mins, secs } = useCountdown('2026-04-02T09:00:00');

    return (
        <section id="hero">
            <div className="hero-section">
                <div className="hero-glow" />

                {/* Left: Text */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Organiser logos strip */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
                        <a href="https://geu.ac.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src="/geu-logo-1.jpg" alt="Graphic Era" style={{ height: 36 }} />
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--blue)', letterSpacing: '0.02em' }}>Graphic Era</div>
                                <div style={{ fontSize: 10, color: 'var(--blue)', letterSpacing: '0.04em' }}>Transforming dreams into reality</div>
                            </div>
                        </a>
                        <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.2)' }} />
                        <a href="https://tbi.geu.ac.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <img src="/tbi_official_logo_v2.png" alt="TBI" style={{ height: 36 }} />
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Technology</div>
                                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Business Incubator</div>
                            </div>
                        </a>
                    </div>

                    <div className="hero-badge">
                        <span />
                        India's Longest &amp; Most Impactful Hackathon
                    </div>

                    <h1 className="hero-title">GRAPH-E-<br />THON 3.0</h1>

                    <p className="hero-subtitle">Build. Innovate. <span style={{ color: 'var(--yellow)' }}>Impact.</span></p>
                    <p className="hero-date">April 2–5, 2026 · Graphic Era University, Dehradun</p>

                    <p className="hero-desc">
                        An AI Friendly SDG-focused 72-hour national-level hackathon at Graphic Era University, Dehradun — organised by the Technology Business Incubator (TBI).
                    </p>

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36 }}>
                        <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                            🚀 Register on Unstop
                        </a>
                        <a href="#tracks" className="btn-secondary">View Tracks →</a>
                    </div>

                    {/* Countdown */}
                    <div className="hero-countdown">
                        {[
                            { val: String(days).padStart(2, '0'), label: 'Days' },
                            { val: String(hours).padStart(2, '0'), label: 'Hours' },
                            { val: String(mins).padStart(2, '0'), label: 'Minutes' },
                            { val: String(secs).padStart(2, '0'), label: 'Seconds' },
                        ].map(({ val, label }) => (
                            <div className="countdown-item" key={label}>
                                <span className="countdown-num">{val}</span>
                                <span className="countdown-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginTop: 28, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                        {[
                            { val: '72h', label: 'Duration' },
                            { val: '5000+', label: 'Registrations' },
                            { val: '₹4.5L', label: 'Prize Pool' },
                            { val: '343+', label: 'Institutions' },
                        ].map(({ val, label }) => (
                            <div key={label}>
                                <div className="hero-stat-val">{val}</div>
                                <div className="hero-stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Hologram robot */}
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div className="hologram-wrap">
                        <RobotCanvas />
                        <div className="hologram-ring" />
                        <div className="hologram-base" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── ABOUT ────────────────────────────────────────────────────────────
function About() {
    return (
        <section id="about" className="about" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="section-inner about-grid" style={{ position: 'relative', zIndex: 1 }}>
                <div className="about-visual">
                    <div className="about-visual-card" style={{ position: 'relative', overflow: 'hidden', padding: 0, borderRadius: 'var(--radius)' }}>
                        <video
                            src="/FGPTHON3.O.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: '100%', height: '100%', objectFit: 'cover', display: 'block'
                            }}
                        />
                    </div>
                    <div className="about-stats-grid">
                        {[
                            { val: '5,000+', label: 'Registrations' },
                            { val: '343+', label: 'Institutions' },
                            { val: '25', label: 'States' },
                            { val: '100+', label: 'Prototypes' },
                        ].map(s => (
                            <div className="about-stat-card" key={s.label}>
                                <div className="about-stat-val">{s.val}</div>
                                <div className="about-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="section-tag">About Graph-e-Thon 3.0</div>
                    <h2 className="section-title">
                        Where Innovation Meets<br /><span className="yellow">Real-World Impact</span>
                    </h2>
                    <p className="section-desc" style={{ marginBottom: 20 }}>
                        Technology Business Incubator Graphic Era University, in collaboration with Graphic Era (Deemed to be University) and Graphic Era Hill University, Dehradun, presents Graph-E-Thon 3.0. This is an AI Friendly SDG-focused national-level hackathon.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 1.5fr', gap: 32, marginTop: 20 }}>
                        <div>
                            <h4 style={{ color: 'var(--blue)', marginBottom: 12, fontSize: 16 }}>Event Details</h4>
                            <ul style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)' }}>
                                <li><strong>Theme:</strong> Building a Resilient, Equitable Future</li>
                                <li><strong>Format:</strong> 72-hour national-level innovation hackathon</li>
                                <li><strong>Venue:</strong> CSIT block, GEU, Dehradun</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--blue)', marginBottom: 12, fontSize: 16 }}>Guidelines & Eligibility</h4>
                            <ul style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--text-muted)' }}>
                                <li><strong>Registration:</strong> Free of Cost</li>
                                <li><strong>Team Size:</strong> 2 to 4 members per team</li>
                                <li><strong>Eligibility:</strong> Open to all college students (Inter-college allowed)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="about-list" style={{ marginTop: 32 }}>
                        {[
                            { icon: '🎓', title: 'TBI & Academic Backing', desc: 'Organised by TBI at Graphic Era University with support from leading research labs.' },
                            { icon: '🏭', title: 'Incubation Opportunities', desc: 'Top teams get TBI incubation, pitch sessions, and post-hackathon startup support.' },
                        ].map(item => (
                            <div className="about-item" key={item.title}>
                                <div className="about-icon">{item.icon}</div>
                                <div>
                                    <div className="about-item-title">{item.title}</div>
                                    <div className="about-item-desc">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── TRACKS ───────────────────────────────────────────────────────────
function Tracks() {
    return (
        <section id="tracks" className="tracks" style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={A.circuitGrid} aria-hidden="true" style={{
                position: 'absolute', left: -40, top: '30%', height: 400,
                opacity: 0.05, pointerEvents: 'none', zIndex: 0,
            }} />
            <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
                <div className="tracks-header">
                    <div className="section-tag">Hackathon Tracks</div>
                    <h2 className="section-title">Choose Your <span className="yellow">Domain</span></h2>
                    <p className="section-desc">
                        Five focused tracks and a Special Open Innovation track, each aligned with UN SDGs.
                    </p>
                </div>
                <div className="tracks-grid">
                    {TRACKS.map(track => (
                        <div
                            key={track.id}
                            className="track-card"
                            style={{
                                '--track-color': track.color,
                                '--track-shadow': track.shadow,
                                '--track-gradient': track.gradient,
                            }}
                        >
                            <img src={A.cardFrame} aria-hidden="true" style={{
                                position: 'absolute', right: -20, bottom: -20, width: 140,
                                opacity: 0.15, pointerEvents: 'none', zIndex: 0,
                            }} />
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div className="track-number">Track {track.id}</div>
                                <div className="track-icon-wrap" style={{ background: `${track.color}15` }}>
                                    <img src={track.icon} alt={track.name} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                                </div>
                                <div className="track-tag" style={{ color: track.color, background: `${track.color}12` }}>{track.tag}</div>
                                <div className="track-name">{track.name}</div>
                                <div className="track-sdg">{track.sdg}</div>
                                <div className="track-desc">{track.desc}</div>
                            </div>
                        </div>
                    ))}

                    {/* Special track */}
                    <div className="track-card track-card-special">
                        <img src={A.cardFrameLg} aria-hidden="true" style={{
                            position: 'absolute', right: -20, top: -20, height: '120%',
                            opacity: 0.08, pointerEvents: 'none', zIndex: 0,
                        }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'inline-flex', gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(221,245,26,0.1)', borderRadius: 100, padding: '4px 12px', marginBottom: 12 }}>
                                Special Track
                            </div>
                            <div style={{ width: 64, height: 64, background: 'rgba(221,245,26,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 14 }}>⚡</div>
                            <div className="track-name">Open Innovation Track</div>
                            <div className="track-sdg">SDG Theme: Any</div>
                            <div className="track-desc">
                                Got an idea that doesn't fit the other tracks but solves a real problem?
                                This open track welcomes cross-domain innovations in AI, AR/VR, robotics,
                                social impact, or anything else that could change the world.
                            </div>
                        </div>
                        <div className="track-special-img">
                            <img src={A.circuitGrid} aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 64 }}>⚡</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── WHY PARTICIPATE ──────────────────────────────────────────────────
function Why() {
    return (
        <section id="why" className="why">
            <div className="section-inner">
                <div className="why-header">
                    <div className="section-tag">Why Participate</div>
                    <h2 className="section-title">More Than a <span className="yellow">Hackathon</span></h2>
                    <p className="section-desc">
                        Graph-e-Thon is a launchpad. Walk away with skills, connections, awards, and a product-ready prototype.
                    </p>
                </div>
                <div className="why-grid">
                    {WHY_CARDS.map(card => (
                        <div className="why-card" key={card.title}>
                            <div className="why-icon">{card.icon}</div>
                            <div className="why-title">{card.title}</div>
                            <div className="why-desc">{card.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Prizes */}
                <div style={{ marginTop: 64, textAlign: 'center' }}>
                    <div className="section-tag" style={{ justifyContent: 'center' }}>Prize Pool</div>
                    <h3 className="section-title" style={{ marginBottom: 8 }}>
                        Win Big, <span className="yellow">Build Bigger</span>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: 15 }}>
                        Rewards for top performers across all tracks
                    </p>
                    <div className="prize-band">
                        {[
                            { medal: '🥇', place: '1st Place', amount: '₹2,00,000', note: 'Cash + ₹50k Incubation', cls: 'gold' },
                            { medal: '🥈', place: '2nd Place', amount: '₹1,50,000', note: 'Cash + ₹50k Incubation', cls: 'silver' },
                            { medal: '🥉', place: '3rd Place', amount: '₹1,00,000', note: 'Cash + ₹50k Incubation', cls: 'bronze' },
                            { medal: '⭐', place: 'Rank 4-10', amount: 'Incubation', note: '₹50,000 Support', cls: '' },
                            { medal: '🎁', place: 'Rank 1-100', amount: 'Goodies', note: 'Merchandise & Kits', cls: '' },
                        ].map(p => (
                            <div className={`prize-item ${p.cls}`} key={p.place}>
                                <div className="prize-medal">{p.medal}</div>
                                <div className="prize-place">{p.place}</div>
                                <div className="prize-amount">{p.amount}</div>
                                <div className="prize-note">{p.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────
function HowItWorks() {
    const steps = [
        { emoji: '📝', title: 'Register Your Team', desc: 'Form a team of 2–4. Register on Unstop, choose your track, and submit your initial idea brief.' },
        { emoji: '⚡', title: 'Hack for 72 Hours', desc: 'Show up at Graphic Era University on April 2. Attend workshops, connect with mentors, and build your MVP.' },
        { emoji: '🏆', title: 'Present & Win', desc: 'Demo your solution to a panel of industry judges on Day 3. Top teams win prizes, TBI incubation, and national recognition.' },
    ];
    return (
        <section id="how" className="how">
            <div className="section-inner">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginBottom: 56 }}>
                    <div>
                        <div className="section-tag">How It Works</div>
                        <h2 className="section-title">Start in Three <span className="yellow">Simple Steps</span></h2>
                        <p className="section-desc">Everything you need to join Graph-e-Thon 3.0 at Graphic Era University.</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={A.howIllo}
                            alt="How To Participate"
                            style={{
                                width: '100%', maxWidth: 360, objectFit: 'contain',
                                animation: 'float 6s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
                <div className="how-steps">
                    {steps.map(s => (
                        <div className="how-step" key={s.title}>
                            <div className="step-num">{s.emoji}</div>
                            <div className="step-title">{s.title}</div>
                            <div className="step-desc">{s.desc}</div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 52 }}>
                    <a href="https://unstop.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex' }}>
                        🚀 Register on Unstop
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── ITINERARY ────────────────────────────────────────────────────────
function Itinerary() {
    const days = Object.keys(ITINERARY);
    const { days: cDays, hours: cHrs, mins: cMins, secs: cSecs } = useCountdown('2026-04-02T09:00:00');

    return (
        <section id="itinerary" className="itinerary" style={{ position: 'relative', overflow: 'hidden' }}>
            <img src={A.deco1} aria-hidden="true" style={{
                position: 'absolute', right: -60, bottom: 60, width: 180,
                opacity: 0.05, pointerEvents: 'none', zIndex: 0,
            }} />
            <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'flex-start', marginBottom: 44 }}>
                    <div>
                        <div className="section-tag">Event Itinerary</div>
                        <h2 className="section-title">72-Hour <span className="yellow">Schedule</span></h2>
                        <p className="section-desc">Three packed days of hacking, workshops, and mentoring.<br />April 2–5, 2026 · Graphic Era University, Dehradun.</p>
                    </div>

                    <div style={{
                        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                        padding: '24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        minWidth: 260, backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-dim)', marginBottom: 16 }}>
                            Countdown starts at 2 April
                        </div>
                        <div style={{ display: 'flex', gap: 20 }}>
                            {[{ v: cDays, l: 'Days' }, { v: cHrs, l: 'Hrs' }, { v: cMins, l: 'Min' }, { v: cSecs, l: 'Sec' }].map((t, i) => (
                                <React.Fragment key={t.l}>
                                    <div style={{ textAlign: 'center', minWidth: 40 }}>
                                        <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--yellow-dark)', lineHeight: 1 }}>
                                            {String(t.v).padStart(2, '0')}
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
                                            {t.l}
                                        </div>
                                    </div>
                                    {i < 3 && <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--border-dim)', lineHeight: 1, marginTop: 2 }}>:</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="itinerary-grid">
                    {days.map(day => (
                        <div className="day-column" key={day}>
                            <div className="day-column-header">
                                <div className="day-label">{day}</div>
                                <div className="day-date">{ITINERARY[day].date}</div>
                            </div>
                            <div className="timeline">
                                {ITINERARY[day].events.map(item => (
                                    <div className="timeline-item" key={item.title}>
                                        <div className="timeline-dot">{item.icon}</div>
                                        <div>
                                            <div className="timeline-time">{item.time}</div>
                                            <div className="timeline-title">{item.title}</div>
                                            <div className="timeline-desc">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── REGISTRATION MARQUEE ──────────────────────────────────────────────
function RegistrationMarquee() {
    const text = "🚀 REGISTRATION IS LIVE · GRAPH-E-THON 3.0 · APRIL 2–5, 2026 · WIN PRIZES WORTH ₹4.5L · REGISTER ON UNSTOP → ";
    return (
        <div className="registration-marquee">
            <div className="marquee-content">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    );
}

// ─── FOOTER ───────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="footer">
            {/* Yellow band — matches poster bottom */}
            <div style={{
                background: 'var(--yellow)', color: '#000',
                textAlign: 'center', padding: '18px 24px',
                fontWeight: 800, fontSize: 16, letterSpacing: '0.04em',
            }}>
                🚀 Graph-e-Thon 3.0 · April 2–5, 2026 · Graphic Era University, Dehradun &nbsp;
                <a href="https://unstop.com" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#000', textDecoration: 'underline', fontWeight: 900 }}>
                    Register on Unstop →
                </a>
            </div>

            <div className="footer-inner">
                <div className="footer-top">
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <img src="/tbi_official_logo_v2.png" alt="Logo" style={{ height: 48 }} />
                            <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '0.08em' }}>GRAPH-E-THON</span>
                        </div>
                        <p className="footer-brand-desc">
                            India's Longest &amp; Most Impactful Hackathon.<br />
                            Organised by TBI, Graphic Era University, Dehradun.
                        </p>
                        <div className="social-links" style={{ marginTop: 18 }}>
                            <a href="https://www.instagram.com/tbigeu" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">📸</a>
                            <a href="https://x.com/tbigeu" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">🐦</a>
                            <a href="https://www.linkedin.com/company/technologybusinessincubator/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">💼</a>
                            <a href="https://www.youtube.com/@TBIGEU" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">▶️</a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <a href="#about">About</a>
                        <a href="#tracks">Tracks</a>
                        <a href="#why">Prizes</a>
                        <a href="#how">How It Works</a>
                        <a href="#itinerary">Itinerary</a>
                        <a href="#map">Participation Map</a>
                    </div>
                    <div className="footer-col">
                        <h4>Tracks</h4>
                        <a href="#tracks">Intelligent Health &amp; Learning</a>
                        <a href="#tracks">Resilient Cities &amp; Energy</a>
                        <a href="#tracks">Digital Infrastructure &amp; Security</a>
                        <a href="#tracks">Climate Action &amp; Agritech</a>
                        <a href="#tracks">Open Innovation</a>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <a href="mailto:events.tbi@geu.ac.in">events.tbi@geu.ac.in</a>
                        <a href="https://www.graphethon.com" target="_blank" rel="noopener noreferrer">graphethon.com</a>
                        <a href="https://unstop.com" target="_blank" rel="noopener noreferrer">Register on Unstop</a>
                        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-dim)' }}>
                            📍 Graphic Era University<br />
                            Dehradun, Uttarakhand
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-copy">© 2026 Graph-e-Thon 3.0 · All Rights Reserved · TBI, Graphic Era University</div>
                    <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Built with ❤️ by the Graph-e-Thon Team</div>
                </div>
            </div>
        </footer>
    );
}

// ─── EVALUATION CRITERIA ──────────────────────────────────────────────
function EvaluationCriteria() {
    const criteria = [
        { title: 'Problem Clarity & Relevance', score: 25, desc: 'Clarity of the problem identified and its relevance to the chosen track/SDGs.' },
        { title: 'Impact Potential', score: 20, desc: 'Potential significance and breadth of the proposed solution\'s impact.' },
        { title: 'Solution Clarity', score: 20, desc: 'How well the solution is defined and explained in the submission.' },
        { title: 'Proof of Work', score: 15, desc: 'Current progress, prototype quality, or existing research/codebase.' },
        { title: 'Feasibility', score: 10, desc: 'Technical and practical feasibility of implementing the solution.' },
        { title: 'Team Capability', score: 10, desc: 'Evaluation of the team\'s skills and ability to execute the project.' },
    ];

    return (
        <section id="evaluation" className="evaluation">
            <div className="section-inner">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div className="section-tag" style={{ justifyContent: 'center' }}>Evaluation</div>
                    <h2 className="section-title">Round 1 <span className="yellow">Criteria</span></h2>
                    <p className="section-desc">Submissions are evaluated out of 100 marks by our expert panel.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {criteria.map(c => (
                        <div key={c.title} style={{
                            background: 'var(--card)', border: '1px solid var(--border)', padding: 24, borderRadius: 'var(--radius)',
                            display: 'flex', gap: 20, alignItems: 'flex-start'
                        }}>
                            <div style={{
                                fontSize: 24, fontWeight: 900, color: 'var(--blue)', background: 'rgba(43,79,216,0.1)',
                                width: 54, height: 54, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {c.score}
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4, letterSpacing: -0.1 }}>{c.title}</div>
                                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── APP ──────────────────────────────────────────────────────────────
export default function App() {
    return (
        <>
            <Navbar />
            <RegistrationMarquee />
            <main>
                <Hero />
                <IndiaMap />
                <About />
                <Tracks />
                <Why />
                <HowItWorks />
                <EvaluationCriteria />
                <Itinerary />
            </main>
            <Footer />
        </>
    );
}
