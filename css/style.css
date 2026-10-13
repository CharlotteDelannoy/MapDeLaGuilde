:root {
  --bg:#17191c; --panel:#23272d; --border:#414750;
  --text:#f2eee5; --muted:#b7bdc5; --gold:#d8b879;
}
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--text); font-family:Arial,sans-serif; }
header { padding:14px 18px; background:#202329; border-bottom:1px solid var(--border); }
h1 { margin:0 0 5px; color:var(--gold); font-size:23px; }
header p { margin:0; color:#c0c4cb; font-size:13px; }
.layout { display:grid; grid-template-columns:245px minmax(0,1fr) 285px; min-height:calc(100vh - 70px); }
aside { padding:14px; background:var(--panel); min-width:0; }
.left { border-right:1px solid var(--border); }
.right { border-left:1px solid var(--border); }
h2 { font-size:15px; color:var(--gold); margin:0 0 10px; }
h3 { font-size:14px; margin:0 0 7px; }
.section { margin-bottom:20px; }
.layers { display:grid; gap:10px; }
.layer { display:flex; align-items:center; gap:8px; cursor:pointer; font-size:13px; }
.layer input { accent-color:var(--gold); }
.dot { width:11px; height:11px; flex:0 0 11px; border-radius:50%; }
.panel { padding:11px; margin:10px 0; background:#2c3138; border:1px solid var(--border); border-radius:8px; overflow-wrap:anywhere; font-size:12px; line-height:1.5; }
button, select, input[type="search"] { font:inherit; }
button { padding:8px 10px; border:1px solid #646b74; border-radius:5px; background:#414852; color:white; cursor:pointer; }
button:hover { background:#555e69; }
button:disabled { opacity:.5; cursor:not-allowed; }
input[type="search"], select { width:100%; padding:9px; border:1px solid #555d67; border-radius:6px; background:#171a1e; color:var(--text); }
#map { height:calc(100vh - 70px); min-height:480px; background:#111315; }
#status { white-space:pre-line; }
.small { color:var(--muted); font-size:11px; }
.person-list { display:grid; gap:6px; margin-top:9px; }
.person-item { display:block; width:100%; text-align:left; background:#2c3138; border:1px solid #424953; padding:9px; }
.person-item strong { display:block; color:#f2eee5; margin-bottom:3px; }
.person-item span { display:block; color:#b7bdc5; font-size:11px; }
.empty { color:var(--muted); font-size:12px; line-height:1.5; }
.popup-title { font-weight:bold; font-size:17px; margin-bottom:6px; }
.popup-meta { color:#626870; font-size:12px; margin-bottom:8px; }
.popup-description { white-space:pre-wrap; margin:8px 0; }
.popup-image { display:block; max-width:220px; max-height:160px; margin-top:10px; object-fit:contain; }
.popup-actions { margin-top:10px; }
.full-width { width:100%; }
.top-gap { margin-top:8px; }
.overlay { position:fixed; inset:0; z-index:2000; display:none; align-items:center; justify-content:center; padding:3vh 3vw; background:rgba(0,0,0,.72); }
.overlay.open { display:flex; }
.overlay-window { width:min(1500px,96vw); height:94vh; background:#202329; border:1px solid #82714e; border-radius:10px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 18px 70px #000b; }
.overlay-header { display:flex; align-items:center; gap:12px; padding:10px 14px; border-bottom:1px solid var(--border); }
.overlay-header h2 { margin:0; flex:1; }
#regionalMap { flex:1; min-height:0; background:#111315; }
.overlay-help { padding:6px 12px; font-size:11px; color:var(--muted); background:#202329; }
.modal { position:fixed; inset:0; z-index:3000; display:none; align-items:center; justify-content:center; padding:20px; background:#0009; }
.modal.open { display:flex; }
.modal-card { width:min(560px,95vw); max-height:85vh; overflow:auto; background:#23272d; border:1px solid #82714e; border-radius:10px; padding:18px; }
.modal-top { display:flex; align-items:start; gap:12px; }
.modal-top h2 { flex:1; font-size:19px; }
.modal-body { white-space:pre-wrap; line-height:1.55; font-size:14px; }
a { color:#2875b9; }
@media (max-width:1000px) {
  .layout { grid-template-columns:220px minmax(0,1fr); }
  .right { grid-column:1 / -1; border-left:0; border-top:1px solid var(--border); }
  #peopleList { grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
  #map { height:70vh; }
}
@media (max-width:650px) {
  .layout { grid-template-columns:1fr; }
  .left { border-right:0; border-bottom:1px solid var(--border); }
  #map { height:65vh; min-height:380px; }
  .overlay { padding:1vh 1vw; }
  .overlay-window { width:99vw; height:98vh; }
}
