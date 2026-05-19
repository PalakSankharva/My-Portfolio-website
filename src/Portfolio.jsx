import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --white:   #ffffff;
  --bg:      #f0f6ff;
  --bg2:     #e8f2ff;
  --bg3:     #ddeeff;
  --sky:     #c8e4ff;
  --blue:    #5ba4e8;
  --blue2:   #3d86d4;
  --navy:    #1a4a7a;
  --slate:   #4a6b8a;
  --muted:   #7a9ab8;
  --light:   #b8d4ed;
  --border:  rgba(91,164,232,0.18);
  --border2: rgba(91,164,232,0.32);
  --glass:   rgba(255,255,255,0.65);
  --glass2:  rgba(255,255,255,0.88);
  --shadow:  0 4px 32px rgba(91,164,232,0.12);
  --shadow2: 0 12px 48px rgba(91,164,232,0.16);
  --grad:    linear-gradient(135deg,#5ba4e8,#a8d4f8);
}

html { scroll-behavior: smooth; }
body { font-family:'Plus Jakarta Sans',sans-serif; background:var(--bg); color:var(--navy); overflow-x:hidden; line-height:1.65; }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background:var(--bg2); }
::-webkit-scrollbar-thumb { background:var(--light); border-radius:10px; }
::selection { background:rgba(91,164,232,0.2); }

/* AMBIENT */
.ambient { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
.ab { position:absolute; border-radius:50%; filter:blur(90px); opacity:.45; animation:blobDrift 14s ease-in-out infinite; }
.ab1 { width:600px; height:600px; background:#c2dfff; top:-15%; left:-10%; }
.ab2 { width:500px; height:500px; background:#d6eeff; top:30%; right:-12%; animation-delay:-5s; }
.ab3 { width:350px; height:350px; background:#e8f6ff; bottom:10%; left:35%; animation-delay:-9s; }
@keyframes blobDrift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(24px,-18px) scale(1.04)} 66%{transform:translate(-18px,22px) scale(.97)} }

/* NAV */
.nav { position:fixed; top:0; left:0; right:0; z-index:900; padding:1rem 2.5rem; display:flex; align-items:center; justify-content:space-between; transition:all .45s ease; }
.nav.scrolled { background:rgba(240,246,255,.82); backdrop-filter:blur(18px) saturate(160%); border-bottom:1px solid var(--border); box-shadow:0 2px 24px rgba(91,164,232,.08); }
.nav-logo { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; color:var(--navy); cursor:pointer; display:flex; align-items:center; gap:.35rem; }
.nav-logo-dot { width:7px; height:7px; border-radius:50%; background:var(--blue); margin-top:2px; }
.nav-links { display:flex; gap:2.2rem; list-style:none; }
.nav-links a { color:var(--slate); font-size:.85rem; font-weight:500; text-decoration:none; letter-spacing:.03em; position:relative; transition:color .25s; }
.nav-links a::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:1.5px; background:var(--blue); border-radius:2px; transition:width .3s; }
.nav-links a:hover { color:var(--blue2); }
.nav-links a:hover::after { width:100%; }
.nav-cta { padding:.5rem 1.25rem; border-radius:100px; font-size:.82rem; font-weight:600; border:1.5px solid var(--blue); color:var(--blue2); background:transparent; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; transition:all .3s; }
.nav-cta:hover { background:var(--blue); color:#fff; box-shadow:0 4px 16px rgba(91,164,232,.3); }
.nav-menu-btn { display:none; background:none; border:none; cursor:pointer; color:var(--navy); font-size:1.4rem; }
.nav-mobile { position:fixed; top:0; right:-100%; width:270px; height:100vh; background:rgba(240,248,255,.97); backdrop-filter:blur(20px); border-left:1px solid var(--border); display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2.5rem; transition:right .4s ease; z-index:890; list-style:none; }
.nav-mobile.open { right:0; }
.nav-mobile a { color:var(--navy); text-decoration:none; font-size:1rem; font-weight:500; }
.nav-overlay { display:none; position:fixed; inset:0; background:rgba(26,74,122,.12); z-index:889; }
.nav-overlay.open { display:block; }

/* HERO */
.hero { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:7rem 2.5rem 5rem; position:relative; z-index:1; }
.hero-inner { max-width:1140px; width:100%; display:grid; grid-template-columns:1.05fr 1fr; gap:5rem; align-items:center; }
.hero-eyebrow { display:inline-flex; align-items:center; gap:.6rem; background:rgba(91,164,232,.1); border:1px solid rgba(91,164,232,.22); padding:.35rem 1rem .35rem .6rem; border-radius:100px; font-size:.78rem; font-weight:600; color:var(--blue2); letter-spacing:.06em; margin-bottom:1.75rem; animation:riseUp .8s ease both; }
.hero-eyebrow-pip { width:22px; height:22px; border-radius:50%; background:var(--blue); display:flex; align-items:center; justify-content:center; font-size:.65rem; color:#fff; }
.hero-name { font-family:'Playfair Display',serif; font-size:clamp(3rem,4vw,5rem); font-weight:500; line-height:1.04; color:var(--navy); margin-bottom:.4rem; animation:riseUp .8s .1s ease both; }
.hero-name em { font-style:italic; color:var(--blue); }
.hero-subtitle { font-size:1rem; color:var(--slate); margin-bottom:.6rem; font-weight:400; animation:riseUp .8s .18s ease both; }
.hero-typed { font-size:1.1rem; font-weight:500; color:var(--blue2); min-height:1.8rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:.3rem; animation:riseUp .8s .24s ease both; }
.cursor { display:inline-block; width:2px; height:1.1em; background:var(--blue); border-radius:2px; animation:blink 1s infinite; vertical-align:middle; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.hero-bio { color:var(--slate); font-size:.93rem; line-height:1.85; max-width:490px; margin-bottom:2.2rem; font-weight:300; animation:riseUp .8s .3s ease both; }
.hero-actions { display:flex; gap:1rem; flex-wrap:wrap; animation:riseUp .8s .38s ease both; }
.btn-fill { padding:.8rem 2rem; border-radius:100px; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:.88rem; font-weight:600; background:var(--blue); color:#fff; box-shadow:0 6px 24px rgba(91,164,232,.35); transition:all .3s; }
.btn-fill:hover { background:var(--blue2); transform:translateY(-2px); box-shadow:0 10px 32px rgba(91,164,232,.4); }
.btn-ghost { padding:.8rem 2rem; border-radius:100px; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:.88rem; font-weight:600; background:var(--glass); border:1.5px solid var(--border2); color:var(--navy); backdrop-filter:blur(8px); transition:all .3s; }
.btn-ghost:hover { border-color:var(--blue); color:var(--blue2); transform:translateY(-2px); box-shadow:var(--shadow); }
.hero-nums { display:flex; gap:2.5rem; margin-top:2.8rem; animation:riseUp .8s .46s ease both; }
.hero-num-val { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:var(--navy); }
.hero-num-label { font-size:.72rem; color:var(--muted); letter-spacing:.06em; margin-top:2px; font-weight:500; }

/* hero visual */
.hero-visual { display:flex; justify-content:center; align-items:center; animation:riseUp 1s .2s ease both; }
.hero-card-wrap { position:relative; }
.hero-card { width:320px; height:380px; border-radius:28px; background:var(--glass2); border:1px solid var(--border2); backdrop-filter:blur(20px) saturate(160%); box-shadow:var(--shadow2); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; position:relative; overflow:hidden; }
.hero-card::before { content:''; position:absolute; inset:0; background:linear-gradient(160deg,rgba(200,228,255,.5) 0%,rgba(255,255,255,.15) 60%); pointer-events:none; }
.hero-card-avatar { width:110px; height:110px; border-radius:50%; background:linear-gradient(135deg,var(--sky),#a8d8ff); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:2.8rem; font-weight:700; color:var(--navy); border:3px solid rgba(255,255,255,.8); box-shadow:0 6px 24px rgba(91,164,232,.25); }
.hero-card-name { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700; color:var(--navy); }
.hero-card-role { font-size:.8rem; color:var(--slate); }
.hero-card-chips { display:flex; gap:.4rem; flex-wrap:wrap; justify-content:center; padding:0 1.5rem; }
.hero-chip { padding:.25rem .7rem; border-radius:100px; font-size:.72rem; font-weight:500; background:rgba(91,164,232,.1); color:var(--blue2); border:1px solid rgba(91,164,232,.2); }
.hero-float { position:absolute; padding:.6rem 1rem; border-radius:12px; font-size:.78rem; font-weight:500; background:var(--glass2); border:1px solid var(--border); color:var(--navy); backdrop-filter:blur(10px); box-shadow:var(--shadow); animation:gFloat 4s ease-in-out infinite; white-space:nowrap; }
.hf1 { top:-16px; right:-28px; }
.hf2 { bottom:-16px; left:-26px; animation-delay:-2s; }
@keyframes gFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
.hero-orbit { position:absolute; inset:-40px; border-radius:50%; border:1px dashed rgba(91,164,232,.22); animation:spin 28s linear infinite; pointer-events:none; }
.orbit-dot { position:absolute; width:8px; height:8px; border-radius:50%; background:var(--blue); border:2px solid #fff; box-shadow:0 0 8px rgba(91,164,232,.4); }
.od1{top:0;left:50%;transform:translate(-50%,-50%)} .od2{bottom:0;left:50%;transform:translate(-50%,50%)} .od3{left:0;top:50%;transform:translate(-50%,-50%)} .od4{right:0;top:50%;transform:translate(50%,-50%)}
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes riseUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }

/* SECTIONS */
.section { padding:6.5rem 2.5rem; position:relative; z-index:1; }
.section-inner { max-width:1100px; margin:0 auto; }
.section-tag { display:inline-block; font-size:.72rem; font-weight:600; letter-spacing:.14em; color:var(--blue); background:rgba(91,164,232,.1); border:1px solid rgba(91,164,232,.2); padding:.28rem .9rem; border-radius:100px; margin-bottom:.75rem; }
.section-title { font-family:'Playfair Display',serif; font-size:clamp(1.9rem,3.5vw,2.75rem); font-weight:700; line-height:1.12; color:var(--navy); margin-bottom:.8rem; }
.section-title em { font-style:italic; color:var(--blue); }
.section-sub { color:var(--slate); font-size:.92rem; line-height:1.85; max-width:520px; font-weight:300; align-items:center;  }
.section-header { margin-bottom:3.5rem; }
.divider { height:1px; background:linear-gradient(90deg,transparent,rgba(91,164,232,.15),transparent); }
.reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease,transform .65s ease; }
.reveal.visible { opacity:1; transform:none; }
.rd1{transition-delay:.05s} .rd2{transition-delay:.12s} .rd3{transition-delay:.19s} .rd4{transition-delay:.26s}

/* ABOUT */
.about-grid { display:grid; grid-template-columns:1fr 1.15fr; gap:4.5rem; align-items:center; }
.about-pic-card { background:linear-gradient(145deg,rgba(200,228,255,.6),rgba(240,248,255,.8)); border:1px solid var(--border2); border-radius:24px; padding:2.5rem; text-align:center; margin-bottom:1.25rem; box-shadow:var(--shadow); }
.about-pic-avatar { width:90px; height:90px; border-radius:50%; margin:0 auto 1rem; background:linear-gradient(135deg,#b8d4f0,#deeeff); display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:var(--navy); border:2.5px solid rgba(255,255,255,.9); }
.about-pic-name { font-family:'Playfair Display',serif; font-size:1.25rem; font-weight:700; color:var(--navy); margin-bottom:.2rem; }
.about-pic-role { font-size:.82rem; color:var(--slate); margin-bottom:1rem; }
.about-pic-chips { display:flex; flex-wrap:wrap; gap:.4rem; justify-content:center; }
.apc { padding:.22rem .65rem; border-radius:100px; font-size:.72rem; font-weight:500; background:rgba(91,164,232,.1); color:var(--blue2); border:1px solid rgba(91,164,232,.18); }
.about-right { display:flex; flex-direction:column; gap:1rem; }
.about-item { padding:1.2rem 1.4rem; border-radius:16px; display:flex; align-items:flex-start; gap:1rem; background:var(--glass2); border:1px solid var(--border); transition:all .3s; }
.about-item:hover { border-color:rgba(91,164,232,.28); background:#fff; box-shadow:var(--shadow); transform:translateX(4px); }
.ai-icon { width:38px; height:38px; border-radius:10px; flex-shrink:0; font-size:1rem; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(91,164,232,.12),rgba(168,216,248,.2)); }
.ai-title { font-weight:600; font-size:.9rem; color:var(--navy); margin-bottom:.18rem; }
.ai-text { font-size:.83rem; color:var(--slate); line-height:1.65; font-weight:300; }

/* SKILLS */
.skills-wrap { display:grid; grid-template-columns:1fr 1fr; gap:3rem; }
.skills-tech { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
.skill-card { padding:1.4rem 1rem; border-radius:16px; text-align:center; background:var(--glass2); border:1px solid var(--border); cursor:default; transition:all .35s; box-shadow:0 2px 12px rgba(91,164,232,.06); }
.skill-card:hover { border-color:rgba(91,164,232,.3); transform:translateY(-5px); box-shadow:var(--shadow2); background:#fff; }
.skill-icon { font-size:1.85rem; margin-bottom:.6rem; }
.skill-name { font-size:.8rem; font-weight:600; color:var(--navy); margin-bottom:.6rem; }
.skill-bar { height:4px; border-radius:4px; background:var(--bg3); overflow:hidden; }
.skill-fill { height:100%; border-radius:4px; background:linear-gradient(90deg,var(--blue),#a8d4f8); transform:scaleX(0); transform-origin:left; transition:transform 1.1s cubic-bezier(.4,0,.2,1); }
.skill-fill.on { transform:scaleX(1); }
.skill-pct { font-size:.68rem; color:var(--muted); margin-top:.3rem; font-weight:500; }
.skills-soft-title { font-family:'Playfair Display',serif; font-size:1.1rem; font-weight:700; color:var(--navy); margin-bottom:.85rem; }
.soft-item { padding:.9rem 1.2rem; border-radius:14px; display:flex; align-items:center; gap:.9rem; background:var(--glass2); border:1px solid var(--border); transition:all .3s; margin-bottom:.85rem; }
.soft-item:hover { border-color:rgba(91,164,232,.28); background:#fff; transform:translateX(4px); }
.soft-icon2 { width:34px; height:34px; border-radius:9px; flex-shrink:0; font-size:.95rem; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(91,164,232,.1),rgba(168,216,248,.18)); }
.soft-name2 { font-size:.87rem; font-weight:500; color:var(--navy); }

/* PROJECTS */
.projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:1.5rem; }
.project-card { border-radius:20px; overflow:hidden; background:var(--glass2); border:1px solid var(--border); transition:all .4s; box-shadow:0 2px 16px rgba(91,164,232,.07); }
.project-card:hover { transform:translateY(-6px); border-color:rgba(91,164,232,.28); box-shadow:0 20px 56px rgba(91,164,232,.16); }
.project-thumb { height:170px; display:flex; align-items:center; justify-content:center; font-size:3.5rem; transition:transform .4s; }
.project-card:hover .project-thumb { transform:scale(1.06); }
.project-body { padding:1.5rem; }
.project-tags { display:flex; flex-wrap:wrap; gap:.35rem; margin-bottom:.7rem; }
.ptag { padding:.18rem .55rem; border-radius:100px; font-size:.7rem; font-weight:500; background:rgba(91,164,232,.08); color:var(--blue2); border:1px solid rgba(91,164,232,.18); }
.project-title { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:700; color:var(--navy); margin-bottom:.45rem; }
.project-desc { font-size:.83rem; color:var(--slate); line-height:1.72; margin-bottom:1.2rem; font-weight:300; }
.project-btns { display:flex; gap:.7rem; }
.pbtn { padding:.48rem 1rem; border-radius:100px; font-size:.78rem; font-weight:600; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; text-decoration:none; transition:all .3s; display:inline-flex; align-items:center; gap:.35rem; }
.pbtn-gh { background:rgba(91,164,232,.07); color:var(--slate); border:1px solid var(--border2); }
.pbtn-gh:hover { background:rgba(91,164,232,.12); color:var(--blue2); }
.pbtn-live { background:var(--blue); color:#fff; border:none; box-shadow:0 4px 14px rgba(91,164,232,.3); }
.pbtn-live:hover { background:var(--blue2); transform:translateY(-1px); }

/* CERTIFICATES */
.certs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:1.25rem; }
.cert-card { padding:1.75rem; border-radius:18px; position:relative; overflow:hidden; background:var(--glass2); border:1px solid var(--border); transition:all .35s; box-shadow:0 2px 12px rgba(91,164,232,.06); }
.cert-card:hover { border-color:rgba(91,164,232,.3); transform:translateY(-5px); box-shadow:var(--shadow2); background:#fff; }
.cert-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--grad); opacity:0; transition:opacity .3s; border-radius:18px 18px 0 0; }
.cert-card:hover::before { opacity:1; }
.cert-icon { font-size:2rem; margin-bottom:.85rem; }
.cert-title { font-weight:600; font-size:.9rem; color:var(--navy); margin-bottom:.25rem; }
.cert-issuer { font-size:.78rem; color:var(--muted); margin-bottom:.8rem; }
.cert-chip { display:inline-flex; align-items:center; gap:.3rem; padding:.2rem .6rem; border-radius:100px; font-size:.7rem; font-weight:500; background:rgba(91,164,232,.09); color:var(--blue); border:1px solid rgba(91,164,232,.2); }

/* TIMELINE */
.timeline { position:relative; padding-left:2rem; }
.timeline::before { content:''; position:absolute; left:9px; top:0; bottom:0; width:1.5px; background:linear-gradient(to bottom,var(--blue),rgba(91,164,232,.1)); border-radius:2px; }
.tl-item { position:relative; padding:0 0 1.75rem 2rem; }
.tl-dot { position:absolute; left:-1.95rem; top:.4rem; width:13px; height:13px; border-radius:50%; background:var(--blue); border:2.5px solid var(--bg); box-shadow:0 0 8px rgba(91,164,232,.35); }
.tl-card { padding:1.25rem 1.5rem; border-radius:14px; background:var(--glass2); border:1px solid var(--border); transition:all .3s; }
.tl-card:hover { border-color:rgba(91,164,232,.26); background:#fff; box-shadow:var(--shadow); }
.tl-date { font-size:.72rem; font-weight:600; letter-spacing:.08em; color:var(--blue); margin-bottom:.35rem; }
.tl-title { font-weight:600; font-size:.9rem; color:var(--navy); margin-bottom:.3rem; }
.tl-desc { font-size:.82rem; color:var(--slate); line-height:1.65; font-weight:300; }
.tl-type { display:inline-flex; align-items:center; padding:.18rem .6rem; border-radius:100px; font-size:.7rem; font-weight:500; margin-top:.6rem; background:rgba(91,164,232,.08); color:var(--blue); border:1px solid rgba(91,164,232,.18); }

/* ACHIEVEMENTS */
.ach-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:1.25rem; }
.ach-card { padding:1.75rem; border-radius:18px; background:var(--glass2); border:1px solid var(--border); transition:all .35s; box-shadow:0 2px 12px rgba(91,164,232,.06); }
.ach-card:hover { border-color:rgba(91,164,232,.28); transform:translateY(-4px); box-shadow:var(--shadow2); background:#fff; }
.ach-icon { width:46px; height:46px; border-radius:13px; margin-bottom:1rem; font-size:1.35rem; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(91,164,232,.12),rgba(168,216,248,.2)); }
.ach-title { font-weight:600; font-size:.9rem; color:var(--navy); margin-bottom:.35rem; }
.ach-desc { font-size:.82rem; color:var(--slate); line-height:1.68; font-weight:300; }

/* RESUME */
.resume-card { max-width:680px; margin:0 auto; padding:3rem 3rem 2.5rem; border-radius:24px; background:linear-gradient(145deg,rgba(200,228,255,.5),rgba(240,250,255,.8)); border:1px solid rgba(91,164,232,.22); text-align:center; position:relative; overflow:hidden; box-shadow:var(--shadow2); }
.resume-card::before { content:''; position:absolute; top:-80px; right:-80px; width:250px; height:250px; border-radius:50%; background:radial-gradient(circle,rgba(91,164,232,.12),transparent 70%); }
.resume-icon { font-size:3.5rem; margin-bottom:.75rem; }
.resume-title { font-family:'Playfair Display',serif; font-size:1.75rem; font-weight:700; color:var(--navy); margin-bottom:.4rem; }
.resume-sub { color:var(--slate); font-size:.88rem; line-height:1.8; margin-bottom:2rem; font-weight:300; }
.resume-hls { display:flex; justify-content:center; gap:3rem; margin-bottom:2.2rem; flex-wrap:wrap; }
.resume-hl-num { font-family:'Playfair Display',serif; font-size:1.7rem; font-weight:700; color:var(--blue2); }
.resume-hl-label { font-size:.72rem; color:var(--muted); letter-spacing:.05em; font-weight:500; }

/* CONTACT */
.contact-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:3rem; }
.contact-info-card { padding:1.1rem 1.3rem; border-radius:14px; display:flex; align-items:center; gap:.9rem; background:var(--glass2); border:1px solid var(--border); transition:all .3s; margin-bottom:1rem; }
.contact-info-card:hover { border-color:rgba(91,164,232,.28); background:#fff; box-shadow:var(--shadow); }
.cic-icon { width:40px; height:40px; border-radius:10px; flex-shrink:0; font-size:1rem; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(91,164,232,.12),rgba(168,216,248,.2)); }
.cic-label { font-size:.7rem; font-weight:600; letter-spacing:.07em; color:var(--muted); margin-bottom:.12rem; }
.cic-val { font-size:.88rem; font-weight:500; color:var(--navy); }
.socials { display:flex; gap:.65rem; }
.social-a { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:.85rem; font-weight:700; cursor:pointer; text-decoration:none; background:var(--glass2); border:1px solid var(--border); color:var(--slate); transition:all .3s; }
.social-a:hover { border-color:var(--blue); color:var(--blue2); background:rgba(91,164,232,.08); transform:translateY(-3px); box-shadow:0 6px 18px rgba(91,164,232,.2); }
.contact-form { display:flex; flex-direction:column; gap:1rem; }
.form-group { display:flex; flex-direction:column; gap:.35rem; }
.form-label { font-size:.75rem; font-weight:600; color:var(--slate); letter-spacing:.06em; }
.form-input,.form-textarea { padding:.82rem 1.1rem; border-radius:12px; font-family:'Plus Jakarta Sans',sans-serif; font-size:.88rem; color:var(--navy); outline:none; resize:none; background:var(--glass2); border:1.5px solid var(--border); transition:all .3s; }
.form-input:focus,.form-textarea:focus { border-color:rgba(91,164,232,.45); background:#fff; box-shadow:0 0 0 3px rgba(91,164,232,.09); }
.form-input::placeholder,.form-textarea::placeholder { color:var(--light); }
.form-textarea { min-height:120px; }
.form-btn { padding:.85rem 2rem; border-radius:100px; border:none; cursor:pointer; font-family:'Plus Jakarta Sans',sans-serif; font-size:.88rem; font-weight:600; background:var(--blue); color:#fff; box-shadow:0 6px 22px rgba(91,164,232,.32); transition:all .3s; }
.form-btn:hover { background:var(--blue2); transform:translateY(-2px); box-shadow:0 10px 28px rgba(91,164,232,.38); }
.form-success { padding:1rem 1.5rem; border-radius:12px; font-size:.88rem; text-align:center; background:rgba(72,196,128,.1); border:1px solid rgba(72,196,128,.22); color:#2a8a5c; font-weight:500; }

/* FOOTER */
.footer { padding:2.5rem; border-top:1px solid var(--border); text-align:center; background:rgba(240,248,255,.6); backdrop-filter:blur(8px); position:relative; z-index:1; }
.footer-logo { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:700; color:var(--navy); margin-bottom:.5rem; }
.footer-text { font-size:.82rem; color:var(--muted); }

/* SCROLL TOP */
.scroll-top { position:fixed; bottom:2rem; right:2rem; width:44px; height:44px; border-radius:50%; background:var(--blue); border:none; cursor:pointer; color:#fff; font-size:1rem; display:flex; align-items:center; justify-content:center; z-index:800; opacity:0; pointer-events:none; transition:all .35s; box-shadow:0 6px 20px rgba(91,164,232,.35); }
.scroll-top.on { opacity:1; pointer-events:all; }
.scroll-top:hover { background:var(--blue2); transform:translateY(-3px); }

/* LOADER */
.loader { position:fixed; inset:0; background:var(--bg); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:9999; transition:opacity .6s ease; }
.loader.fade { opacity:0; pointer-events:none; }
.loader-logo { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:var(--navy); margin-bottom:1.5rem; }
.loader-bar { width:180px; height:3px; border-radius:3px; background:var(--sky); overflow:hidden; }
.loader-fill { height:100%; border-radius:3px; background:var(--blue); animation:loadBar 1.7s ease forwards; }
@keyframes loadBar { from{width:0} to{width:100%} }

/* RESPONSIVE */
@media (max-width:960px) {
  .hero-inner { grid-template-columns:1fr; text-align:center; gap:3rem; }
  .hero-bio { margin:0 auto 2rem; }
  .hero-actions { justify-content:center; }
  .hero-nums { justify-content:center; }
  .hero-visual { order:-1; }
  .hero-card { width:270px; height:330px; }
  .about-grid { grid-template-columns:1fr; gap:2.5rem; }
  .skills-wrap { grid-template-columns:1fr; gap:2rem; }
  .contact-grid { grid-template-columns:1fr; }
  .nav-links,.nav-cta { display:none; }
  .nav-menu-btn { display:flex; }
}
@media (max-width:640px) {
  .section { padding:4.5rem 1.25rem; }
  .skills-tech { grid-template-columns:repeat(2,1fr); }
  .projects-grid { grid-template-columns:1fr; }
  .hero-card { width:240px; height:300px; }
  .nav { padding:1rem 1.25rem; }
  .resume-card { padding:2rem 1.5rem; }
  .resume-hls { gap:1.5rem; }
}
`;

const SKILLS = [
  {name:"React JS",icon:"⚛️",pct:75},{name:"JavaScript",icon:"📜",pct:80},
  {name:"HTML",icon:"🌐",pct:90},{name:"CSS",icon:"🎨",pct:85},
  {name:"Flutter",icon:"📱",pct:40},{name:"Dart",icon:"🎯",pct:40},
  {name:"Firebase",icon:"🔥",pct:40},{name:"Python",icon:"🐍",pct:40},
  {name:"Git",icon:"🌿",pct:50},{name:"Cloud",icon:"☁️",pct:45},
  
];
const SOFT=[{icon:"🤝",name:"Teamwork & Collaboration"},{icon:"💬",name:"Communication"},{icon:"🧩",name:"Problem Solving"},{icon:"⚡",name:"Quick Learning"},{icon:"🏏",name:"Leadership"}];
const PROJECTS=[
  {title:"E-Commerce Website",desc:"Responsive React e-commerce platform with product listing, cart functionality, and seamless checkout experience.",tags:["React JS","CSS","JavaScript"],emoji:"🛒",bg:"linear-gradient(145deg,#deeeff,#f0f8ff)",github: "https://github.com/PalakSankharva/ecommerce-react"},
  {title:"Appointment Booking App",desc:"Flutter & Firebase mobile app with local storage, real-time syncing, and intuitive appointment scheduling.",tags:["Flutter","Firebase","Dart"],emoji:"📅",bg:"linear-gradient(145deg,#e8f0ff,#f5f0ff)",github: "https://github.com/PalakSankharva/Appointment-booking-app"},
  {title:"Food Delivery App",desc:"Responsive food delivery web application built using React JS with interactive UI, menu browsing, cart functionality, and smooth user experience.",tags:["React JS","JavaScript","CSS"],emoji:"☁️",bg:"linear-gradient(145deg,#e0f5ff,#f0faff)",github: "https://github.com/PalakSankharva/food-delivery-app"},
  {title:"Weather App",desc:"Weather forecasting application developed using HTML, CSS, and Weather API to display real-time temperature, humidity, and weather conditions.",tags:["HTML","CSS"],emoji:"🚦",bg:"linear-gradient(145deg,#fffadd,#fff8ee)",github: "https://github.com/PalakSankharva/weatherApp"},
];
const CERTS=[
  {icon:"🌐",title:"Odoo x MSU Hackathon’25",issuer:"Odoo",pdf:"/certificates/odoo.pdf"},
  {icon:"📱",title:"Computer Network and internet Protocols Exam Certificate",issuer:"NPTEL",pdf:"/certificates/cn.pdf"},
  {icon:"📱",title:"Theory of Computation Exam Certificate",issuer:"NPTEL",pdf:"/certificates/toc.pdf"},
  {icon:"☁️",title:"Cloud Computing Exam Certificate - Silver+ELite",issuer:"NPTEL",pdf:"/certificates/cloud.pdf"},
  {icon:"☁️",title:"AWS Academy Graduate - Cloud Developing",issuer:"AWS Academy",pdf:"/certificates/cloud-aws.pdf"},
  {icon:"💼",title:"Internship Certificate",issuer:"Internship Studio",pdf:"/certificates/internship1.pdf"},
];
const TIMELINE=[
  {date:"2024",title:"SIH - Smart India Hackathon - 2024",desc:"24-hour national hackathon developing an innovative smart city management solution - Selected in round 1 (in top 50 teams).",type:"Hackathon"},
  {date:"2025",title:"SIH - Smart India Hackathon - 2025",desc:"24-hour national hackathon developing an innovative smart city management solution - Selected in round 1 (in top 50 teams).",type:"Hackathon"},
  {date:"2026",title:"Cloud Computing Workshop",desc:"Hands-on AWS, GCP and Azure fundamentals with practical deployment exercises.",type:"Workshop"},
  {date:"2023",title:"CHARUSAT Tech Fest",desc:"Project exhibition showcasing Smart Traffic Control system to industry professionals.",type:"Exhibition"},
  {date:"2023",title:"Coding Competition",desc:"Inter-college coding challenge solving algorithmic problems under time constraints.",type:"Competition"},
  {date:"2023",title:"Flutter Development Seminar",desc:"Cross-platform development best practices and Firebase integration techniques.",type:"Seminar"},
];
const ACHIEVEMENTS=[
  {icon:"🎓",title:"Academic Excellence",desc:(
    <>
      B.Tech-2027 - CHARUSAT - 7.83 CGPA (till 6th sem) <br />
      HSC-2023 - S.K.V. Rajkot - 79% <br />
      SSC-2021 - S.K.V. Rajkot - 92.67%
      
    </>
  )},
  
  {icon:"💼",title:"Internship Experience",desc:"Completed technical internship gaining real-world software development experience."},
  {icon:"🏆",title:"Hackathon Participant",desc:"Represented college at national hackathons developing innovative tech solutions."},
 
  {icon:"🌟",title:"Tech Community",desc:"Active contributor in college tech events, workshops, and knowledge sessions."},
  {
  icon:"💻",
  title:"LeetCode Profile",
  desc:(
    <>
      Solving Data Structures & Algorithms problems regularly on LeetCode.
      <br /><br />
      <a
        href="https://leetcode.com/u/palaksankharva/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color:"var(--blue2)",
          textDecoration:"none",
          fontWeight:"600"
        }}
      >
        🔗 View My LeetCode Profile
      </a>
    </>
  )
}
];
const ABOUT_ITEMS=[
  {icon:"💡",title:"Passionate Developer",text:"I love building elegant, user-centric applications that solve real-world problems with clean code."},
  {icon:"☁️",title:"Cloud & Web Technologies",text:"Deeply interested in cloud computing, scalable architecture, and the modern web ecosystem."},
  {icon:"🤝",title:"Team Player",text:"Strong believer in collaboration — great software is always built by great teams working in sync."},
  {icon:"⚡",title:"Quick Learner",text:"I pick up new technologies fast and love staying on the cutting edge of the field."},
  {icon:"🏏",title:"Cricket Enthusiast",text:"When not coding, I'm on the cricket field — teamwork matters just as much there!"},
];
const TYPING=["React & Flutter Developer","Full Stack Enthusiast","Cloud Explorer","Problem Solver","Cricket Fan 🏏"];
const NAV=["About","Skills","Projects","Certificates","Participation","Achievements","Resume","Contact"];

function useTyping(phrases){
  const [txt,setTxt]=useState("");const [pi,setPi]=useState(0);const [ci,setCi]=useState(0);const [del,setDel]=useState(false);
  useEffect(()=>{
    const ph=phrases[pi],spd=del?38:72;
    const t=setTimeout(()=>{
      if(!del){if(ci<ph.length){setTxt(ph.slice(0,ci+1));setCi(c=>c+1);}else setTimeout(()=>setDel(true),1600);}
      else{if(ci>0){setTxt(ph.slice(0,ci-1));setCi(c=>c-1);}else{setDel(false);setPi(p=>(p+1)%phrases.length);}}
    },spd);
    return()=>clearTimeout(t);
  },[ci,del,pi,phrases]);
  return txt;
}

function useReveal(){
  useEffect(()=>{
    const els=document.querySelectorAll(".reveal");
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}}),{threshold:.08});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

export default function Portfolio(){
  const [loaded,setLoaded]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [showTop,setShowTop]=useState(false);
  const [menu,setMenu]=useState(false);
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [sent,setSent]=useState(false);
  const [skillsOn,setSkillsOn]=useState(false);
  const skillRef=useRef(null);
  const typed=useTyping(TYPING);
  useReveal();

  useEffect(()=>{const t=setTimeout(()=>setLoaded(true),1800);return()=>clearTimeout(t);},[]);
  useEffect(()=>{
    const fn=()=>{setScrolled(window.scrollY>50);setShowTop(window.scrollY>400);};
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);
  useEffect(()=>{
    if(!skillRef.current)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setSkillsOn(true);obs.disconnect();}},{threshold:.15});
    obs.observe(skillRef.current);return()=>obs.disconnect();
  },[loaded]);

  const go=(id)=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});};
  const handleSubmit=(e)=>{e.preventDefault();if(form.name&&form.email&&form.message){setSent(true);setForm({name:"",email:"",message:""});}};

  return(<>
    <style>{css}</style>

    {/* LOADER */}
    <div className={`loader ${loaded?"fade":""}`}>
      <div className="loader-logo">Palak<span style={{color:"var(--blue)"}}>.</span></div>
      <div className="loader-bar"><div className="loader-fill"/></div>
    </div>

    {/* AMBIENT BG */}
    <div className="ambient"><div className="ab ab1"/><div className="ab ab2"/><div className="ab ab3"/></div>

    {/* SCROLL TOP */}
    <button className={`scroll-top ${showTop?"on":""}`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>

    {/* NAV */}
    <nav className={`nav ${scrolled?"scrolled":""}`}>
      <div className="nav-logo" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
        Palak<span style={{color:"var(--blue)"}}>.</span><div className="nav-logo-dot"/>
      </div>
      <ul className="nav-links">
        {NAV.map(l=><li key={l}><a href="#" onClick={e=>{e.preventDefault();go(l.toLowerCase());}}>{l}</a></li>)}
      </ul>
      <button className="nav-cta" onClick={()=>go("contact")}>Say Hello ✨</button>
      <button className="nav-menu-btn" onClick={()=>setMenu(true)}>☰</button>
    </nav>
    <div className={`nav-overlay ${menu?"open":""}`} onClick={()=>setMenu(false)}/>
    <ul className={`nav-mobile ${menu?"open":""}`}>
      {NAV.map(l=><li key={l}><a href="#" onClick={e=>{e.preventDefault();go(l.toLowerCase());}}>{l}</a></li>)}
    </ul>

    {/* HERO */}
    <section className="hero" id="home">
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow"><div className="hero-eyebrow-pip">🎓</div>B.Tech IT · DEPSTAR, CHARUSAT</div>
          <h3 className="hero-name">Hi, I'm<br/><em>Palak Sankharva</em></h3>
          <p className="hero-subtitle">Aspiring Software Developer from Gujarat, India</p>
          <div className="hero-typed">{typed}<span className="cursor"/></div>
          <p className="hero-bio">Passionate about building scalable web and mobile applications. Exploring the intersection of cloud computing, React, and Flutter to craft meaningful digital experiences.</p>
          <div className="hero-actions">
            <button className="btn-fill" onClick={()=>go("projects")}>View Projects ↗</button>
            <button className="btn-ghost" onClick={()=>go("resume")}>Download Resume ↓</button>
            <button className="btn-ghost" onClick={()=>go("contact")}>Contact Me</button>
          </div>
          <div className="hero-nums">
            {[["4+","Projects"],["11+","Tech Skills"],["5+","Certificates"]].map(([n,l])=>(
              <div key={l}><div className="hero-num-val">{n}</div><div className="hero-num-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-wrap">
            <div className="hero-orbit">
              <div className="orbit-dot od1"/><div className="orbit-dot od2"/>
              <div className="orbit-dot od3"/><div className="orbit-dot od4"/>
            </div>
            <div className="hero-card">
              <div className="hero-card-avatar">PS</div>
              <div className="hero-card-name">Palak Sankharva</div>
              <div className="hero-card-role">B.Tech Information Technology</div>
              <div className="hero-card-chips">
                {["React","Flutter","Cloud","c++","Java"].map(c=><span key={c} className="hero-chip">{c}</span>)}
              </div>
            </div>
            <div className="hero-float hf1">⚛️ React Developer</div>
            <div className="hero-float hf2">📱 Flutter & Firebase</div>
          </div>
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* ABOUT */}
    <section className="section" id="about">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">WHO I AM</div>
          <h2 className="section-title">About <em>Me</em></h2>
          <p className="section-sub">A passionate developer who turns ideas into elegant digital products, one line of code at a time.</p>
        </div>
        <div className="about-grid">
          <div className="reveal">
            <div className="about-pic-card">
              <div className="about-pic-avatar">PS</div>
              <div className="about-pic-name">Palak Sankharva</div>
              <div className="about-pic-role">B.Tech IT Student · Software Developer</div>
              <div className="about-pic-chips">
                {["React","Flutter","Java","OPPs"].map(c=><span key={c} className="apc">{c}</span>)}
              </div>
            </div>
          </div>
          <div className="about-right">
            {ABOUT_ITEMS.map((it,i)=>(
              <div key={it.title} className={`about-item reveal rd${Math.min(i+1,4)}`}>
                <div className="ai-icon">{it.icon}</div>
                <div><div className="ai-title">{it.title}</div><div className="ai-text">{it.text}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* SKILLS */}
    <section className="section" id="skills" ref={skillRef}>
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">WHAT I KNOW</div>
          <h2 className="section-title">My <em>Skills</em></h2>
          <p className="section-sub">Technical depth and soft skills honed through projects, internships, and constant learning.</p>
        </div>
        <div className="skills-wrap">
          <div>
            <div className="skills-tech">
              {SKILLS.map((s,i)=>(
                <div key={s.name} className={`skill-card reveal rd${Math.min((i%4)+1,4)}`}>
                  <div className="skill-icon">{s.icon}</div>
                  <div className="skill-name">{s.name}</div>
                  <div className="skill-bar">
                    <div className={`skill-fill ${skillsOn?"on":""}`} style={{transform:skillsOn?`scaleX(${s.pct/100})`:"scaleX(0)"}}/>
                  </div>
                  <div className="skill-pct">{s.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="skills-soft-title reveal">Soft Skills</div>
            {SOFT.map((s,i)=>(
              <div key={s.name} className={`soft-item reveal rd${i+1}`}>
                <div className="soft-icon2">{s.icon}</div>
                <div className="soft-name2">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* PROJECTS */}
    <section className="section" id="projects">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">WHAT I'VE BUILT</div>
          <h2 className="section-title">My <em>Projects</em></h2>
          <p className="section-sub">A curated selection spanning web, mobile, cloud, and machine learning.</p>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p,i)=>(
            <div key={p.title} className={`project-card reveal rd${Math.min(i+1,4)}`}>
              <div className="project-thumb" style={{background:p.bg}}>{p.emoji}</div>
              <div className="project-body">
                <div className="project-tags">{p.tags.map(t=><span key={t} className="ptag">{t}</span>)}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-btns">
                  <div className="project-btns">
  <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    className="pbtn pbtn-gh"
  >
    ⬡ GitHub
  </a>

  <a
    href={p.live}
    target="_blank"
    rel="noopener noreferrer"
    className="pbtn pbtn-live"
  >
    ↗ Live
  </a>
</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* CERTIFICATES */}
    <section className="section" id="certificates">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">CREDENTIALS</div>
          <h2 className="section-title">My <em>Certificates</em></h2>
          <p className="section-sub">Certifications earned through dedicated learning across multiple platforms.</p>
        </div>
        <div className="certs-grid">
  {CERTS.map((c,i)=>(
    <div key={c.title} className={`cert-card reveal rd${Math.min((i%3)+1,4)}`}>
      <div className="cert-icon">{c.icon}</div>

      <div className="cert-title">
        {c.title}
      </div>

      <div className="cert-issuer">
        {c.issuer}
      </div>

      <div className="cert-chip">
        ✓ Verified
      </div>

      {/* NEW CERTIFICATE PDF BUTTON */}
      <div style={{marginTop:"1rem"}}>
        <a
          href={c.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="pbtn pbtn-live"
        >
          📄 View Certificate
        </a>
      </div>

    </div>
  ))}
</div>
      </div>
    </section>

    <div className="divider"/>

    {/* PARTICIPATION */}
    <section className="section" id="participation">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">EVENTS & ACTIVITIES</div>
          <h2 className="section-title">My <em>Participation</em></h2>
          <p className="section-sub">Active involvement in hackathons, workshops, seminars, and competitions.</p>
        </div>
        <div className="timeline reveal">
          {TIMELINE.map((item,i)=>(
            <div key={item.title} className={`tl-item reveal rd${Math.min(i+1,4)}`}>
              <div className="tl-dot"/>
              <div className="tl-card">
                <div className="tl-date">{item.date}</div>
                <div className="tl-title">{item.title}</div>
                <div className="tl-desc">{item.desc}</div>
                <div className="tl-type">{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* ACHIEVEMENTS */}
    <section className="section" id="achievements">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">MILESTONES</div>
          <h2 className="section-title">My <em>Achievements</em></h2>
          <p className="section-sub">Key accomplishments across academics, technical projects, and community involvement.</p>
        </div>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a,i)=>(
            <div key={a.title} className={`ach-card reveal rd${Math.min((i%3)+1,4)}`}>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-title">{a.title}</div>
              <div className="ach-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* RESUME */}
    <section className="section" id="resume">
      <div className="section-inner">
        <div className="section-header reveal" style={{textAlign:"center"}}>
          <div className="section-tag">MY RESUME</div>
          <h2 className="section-title">Download My <em>Resume</em></h2>
        </div>
        <div className="resume-card reveal">
          <div className="resume-icon">📄</div>
          <div className="resume-title">Palak Sankharva</div>
          <div className="resume-sub">B.Tech Information Technology · DEPSTAR, CHARUSAT<br/>React & Flutter Developer · Software Development Enthusiast</div>
          <div className="resume-hls">
            {[["4+","Projects"],["11+","Skills"],["5+","Certs"],["5+","Events"]].map(([n,l])=>(
              <div key={l}><div className="resume-hl-num">{n}</div><div className="resume-hl-label">{l}</div></div>
            ))}
          </div>
          <a 
  href="/resume/palak-resume.pdf"
  download
  className="btn-fill"
  style={{textDecoration:"none", display:"inline-block"}}>
  ↓ Download Resume (PDF)
</a>
        </div>
      </div>
    </section>

    <div className="divider"/>

    {/* CONTACT */}
    <section className="section" id="contact">
      <div className="section-inner">
        <div className="section-header reveal">
          <div className="section-tag">GET IN TOUCH</div>
          <h2 className="section-title">Contact <em>Me</em></h2>
          <p className="section-sub">Open to new opportunities, collaborations, and interesting conversations.</p>
        </div>
        <div className="contact-grid">
          <div className="reveal">
            {[
  ["📧","EMAIL","sankharvapalak76@gmail.com"],
  ["📞","PHONE","+91 9316920058"],
  ["📍","LOCATION","Gujarat, India"],
  ["🎓","COLLEGE","DEPSTAR, CHARUSAT"]
]].map(([icon,label,val])=>(
              <div key={label} className="contact-info-card">
                <div className="cic-icon">{icon}</div>
                <div><div className="cic-label">{label}</div><div className="cic-val">{val}</div></div>
              </div>
            ))}
            <div style={{marginTop:".5rem"}}>
              <div style={{fontSize:".75rem",color:"var(--muted)",fontWeight:600,letterSpacing:".07em",marginBottom:".65rem"}}>CONNECT</div>
              <div className="socials">
                {[
  ["GH","GitHub","https://github.com/PalakSankharva"],
  ["in","LinkedIn","https://www.linkedin.com/in/palak-sankharva-0b67a831b/"]
  
].map(([l,t,link])=>(
  <a
    key={t}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="social-a"
    title={t}
  >
    {l}
  </a>
))}
              </div>
            </div>
          </div>
          <div className="reveal rd2">
            {sent?(
              <div className="form-success">✅ Message sent! I'll get back to you soon.</div>
            ):(
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">YOUR NAME</label>
                  <input className="form-input" type="text" placeholder="Your full name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL ADDRESS</label>
                  <input className="form-input" type="email" placeholder="hello@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required/>
                </div>
                <div className="form-group">
                  <label className="form-label">MESSAGE</label>
                  <textarea className="form-textarea" placeholder="Tell me about your project or idea..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required/>
                </div>
                <button type="submit" className="form-btn">Send Message ↗</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* FOOTER */}
    <footer className="footer">
      <div className="footer-logo">Palak Sankharva</div>
      <p className="footer-text">Designed & Developed with <span style={{color:"#e8708a"}}>♥</span> by <strong style={{color:"var(--navy)"}}>Palak Sankharva</strong></p>
      <p className="footer-text" style={{marginTop:".3rem"}}>© {new Date().getFullYear()} · B.Tech IT, DEPSTAR CHARUSAT · All rights reserved.</p>
    </footer>
  </>);
}
