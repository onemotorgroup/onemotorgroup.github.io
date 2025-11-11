
(function(){
  // language
  let I18N = {zh:{},en:{},ms:{}};
  const byId = id=>document.getElementById(id);
  fetch('assets/js/i18n.json').then(r=>r.json()).then(d=>{ I18N=d; applyLang(getLang()); init(); });

  function getLang(){ const s=localStorage.getItem('lang'); if(s) return s; const n=(navigator.language||'en').toLowerCase(); if(n.startsWith('zh'))return'zh'; if(n.startsWith('ms')||n.startsWith('id'))return'ms'; return'en'; }
  function setLang(k){ localStorage.setItem('lang',k); applyLang(k); }
  function t(k){ const L=getLang(); return (I18N[L]&&I18N[L][k])||(I18N.en&&I18N.en[k])||k; }
  function applyLang(L){
    [['brand','brand'],['slogan','slogan'],['hero-title','brand'],['hero-sub','sub'],
     ['latest-section','latest_section'],['port-section','port_section'],
     ['about-title','about_title'],['about-p1','about_p1'],['about-p2','about_p2'],['footer','footer']]
    .forEach(([id,key])=>{ const el=byId(id); if(el) el.textContent=t(key); });
    const q=byId('q'); if(q) q.placeholder=t('search_placeholder');
    const back=byId('back'); if(back) back.textContent=t('back_home');
    const hlt=byId('hl-title'); if(hlt) hlt.textContent=t('detail_highlights');
    const sty=byId('story-title'); if(sty) sty.textContent=t('detail_story');
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('.langs button'); if(b){ document.querySelectorAll('.langs button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); setLang(b.dataset.lang); }
    const chip=e.target.closest('.chip'); if(chip){ document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active')); chip.classList.add('active'); filter.segment=chip.dataset.seg; renderGrid(); }
  });

  // data
  let CARS=[]; let filter={q:'',segment:'all'};

  function init(){
    const page=location.pathname.split('/').pop()||'index.html';
    fetch('data/cars.json').then(r=>r.json()).then(list=>{
      CARS=list;
      if(page==='index.html'){ buildHome(); }
      if(page==='car.html'){ buildDetail(); }
    });
    const q=byId('q'); if(q){ q.addEventListener('input',()=>{ filter.q=q.value.trim().toLowerCase(); renderGrid(); }); }
    // port photos
    const port=byId('port'); if(port){
      const PH=[
        "https://images.unsplash.com/photo-1529163228981-3e6342f8ee0d?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1569937707742-c2ae0e6d7960?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543652438-d4fbcbf53f3e?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521668576204-57ae97f1b41c?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1568191822252-0b00831bd992?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599819055801-3e1b2eb8ef1f?q=80&w=1600&auto=format&fit=crop"
      ];
      port.innerHTML=PH.map(src=>`<figure class="card"><img src="${src}" alt="Port Klang"></figure>`).join('');
    }
  }

  function buildHome(){
    const carEl=byId('carousel');
    const first=CARS.slice(0,6);
    carEl.innerHTML=first.map(c=>card(c)).join('');
    let timer=setInterval(()=>{
      carEl.scrollBy({left:320,behavior:'smooth'});
      if(carEl.scrollLeft+carEl.clientWidth>=carEl.scrollWidth-5) carEl.scrollTo({left:0,behavior:'smooth'});
    },3000);
    carEl.addEventListener('touchstart',()=>clearInterval(timer),{passive:true});
    carEl.addEventListener('mouseenter',()=>clearInterval(timer));
    renderGrid();
  }
  function renderGrid(){
    const wrap=byId('grid'); if(!wrap) return;
    const seg=filter.segment; const q=filter.q;
    const res=CARS.filter(c=>{
      const inSeg=(seg==='all')||(c.segment&&c.segment.toLowerCase()===seg.toLowerCase());
      const hay=(c.name.zh+' '+c.name.en+' '+(c.price||'')+' '+(c.specs?.year||'')).toLowerCase();
      return inSeg && (q===''||hay.includes(q));
    });
    wrap.innerHTML=res.map(c=>card(c)).join('');
  }
  function card(c){
    const img=(c.photos&&c.photos[0])||'';
    const title=(c.name&&c.name.zh)||'未命名';
    const meta=(c.color?.zh||'')+' · '+(c.mileage?.zh||'');
    const price=c.price||'';
    return `<a class="car" href="car.html?id=${encodeURIComponent(c.id)}">
      <img src="${img}" alt="${title}">
      <div class="pad">
        <div class="tag">${c.segment||''}</div>
        <div class="title">${title}</div>
        <div class="meta">${meta}</div>
        <div class="line"></div>
        <div class="meta">${price}</div>
      </div>
    </a>`;
  }

  function buildDetail(){
    const id=new URLSearchParams(location.search).get('id');
    const c=CARS.find(x=>x.id===id);
    if(!c){ const nm=byId('name'); if(nm) nm.textContent='未找到车辆'; return; }
    document.title=c.name.zh+' · 车辆详情';
    const kv=byId('kv'); if(kv) kv.src=(c.photos&&c.photos[0])||'';
    byId('name').textContent=c.name.zh;
    byId('badge').textContent=c.segment||'';
    byId('meta').textContent=(c.color.zh||'')+' · '+(c.mileage.zh||'')+' · '+(c.price||'');
    const sWrap=byId('specs'); const sp=c.specs||{};
    sWrap.innerHTML=Object.keys(sp).map(k=>`<div class="spec"><div class="tag">${k}</div><div class="title">${sp[k]}</div></div>`).join('');
    const hl=byId('hl'); hl.innerHTML=(c.highlights||[]).map(h=>`<li>${h.zh||''}</li>`).join('');
    byId('story').textContent=(c.story&&c.story.zh)||'';
  }
})();