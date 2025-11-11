
// Load car DB
let DB = { cars: [] };
fetch('data/cars.json').then(r=>r.json()).then(d=>{ DB=d; renderCars(DB.cars); fillMarquee(DB.cars); });

// Search
const q = document.getElementById('q');
document.getElementById('btnSearch').addEventListener('click', doSearch);
q.addEventListener('keydown', (e)=>{ if(e.key==='Enter') doSearch(); });
function doSearch(){
  const k = q.value.trim().toLowerCase();
  const list = DB.cars.filter(c=> (c.name||'').toLowerCase().includes(k) || (c.brand||'').toLowerCase().includes(k) || String(c.year||'').includes(k));
  renderCars(list);
}

// Grid
function renderCars(list){
  const grid = document.getElementById('carGrid');
  grid.innerHTML = '';
  list.forEach(c=>{
    const a = document.createElement('a');
    a.href = `car.html?id=${encodeURIComponent(c.id)}`;
    a.className = 'card';
    const thumb = (c.images && c.images[0]) || 'https://picsum.photos/600/400?blur=2';
    a.innerHTML = `
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

// Double marquee
function fillMarquee(list){
  const pills = (arr)=> arr.map(c=>`<span class="pillcar">${(c.brand||'')+' '+(c.model||'')} ${(c.year||'')} · ${(c.price||'')}</span>`).join('');
  const long = [...list, ...list, ...list];
  document.getElementById('marqueeTop').innerHTML = pills(long);
  const rev = [...long].reverse();
  document.getElementById('marqueeBottom').innerHTML = pills(rev);
}
