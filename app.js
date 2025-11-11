// Load cars and render
let DB={cars:[]};
fetch('data/cars.json').then(r=>r.json()).then(d=>{DB=d; renderCars(DB.cars); fillMarquees(DB.cars);});

// search
const q=document.getElementById('q');
document.getElementById('btnSearch').onclick=()=>doSearch();
if(q){ q.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch();}); }
function doSearch(){
  const k=(q.value||'').trim().toLowerCase();
  const list=(DB.cars||[]).filter(c=>(c.name||'').toLowerCase().includes(k)||(c.brand||'').toLowerCase().includes(k)||String(c.year||'').includes(k));
  renderCars(list);
}

// grid
function renderCars(list){
  const grid=document.getElementById('carGrid'); if(!grid) return;
  grid.innerHTML='';
  (list||[]).forEach(c=>{
    const a=document.createElement('a');
    a.href=`car.html?id=${encodeURIComponent(c.id)}`; a.className='card';
    const thumb=(c.images&&c.images[0])||'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1600&auto=format&fit=crop';
    a.innerHTML=`
      <img src="${thumb}" alt="${c.name}" loading="lazy">
      <div class="p">
        <h3>${c.name||''}</h3>
        <div class="y">${c.year||''}</div>
        <div class="price">${c.price||''}</div>
        <div class="km">${c.mileage||''}</div>
      </div>`;
    grid.appendChild(a);
  });
}

// marquees top/bottom
function pill(c){return `<span class="pillcar"><b>${(c.brand||'')+' '+(c.model||'')}</b> ${c.year||''} · ${c.price||''}</span>`;}
function fillMarquees(list){
  const long=[...(list||[]),...(list||[]),...(list||[])];
  const top=document.getElementById('marqueeTop'); const bot=document.getElementById('marqueeBottom');
  if(top) top.innerHTML = long.map(pill).join('');
  if(bot) bot.innerHTML = [...long].reverse().map(pill).join('');
}
