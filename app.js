
const i18nTexts = {
  zh:{
    tagline:"豪华进口车 · 马来西亚",
    back:"返回",
    gallery:"车辆相册",
    highlights:"车辆亮点",
    km:"里数",
    location:"地点",
    recon:"重整车",
    dealer:"经销商",
    page:"页",
  },
  en:{
    tagline:"LUXURY IMPORT CAR · MALAYSIA",
    back:"Back",
    gallery:"Photo Gallery",
    highlights:"Highlights",
    km:"Mileage",
    location:"Location",
    recon:"Recon car",
    dealer:"Dealer",
    page:"Page",
  },
  ms:{
    tagline:"KERETA IMPORT MEWAH · MALAYSIA",
    back:"Kembali",
    gallery:"Galeri Foto",
    highlights:"Sorotan",
    km:"Jarak",
    location:"Lokasi",
    recon:"Kereta Recon",
    dealer:"Ejen",
    page:"Halaman",
  }
};

const PAGE_SIZE = 8;

let currentLang = localStorage.getItem("lang") || "zh";
function applyLang(lang){
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    const slot = i18nTexts[lang][key] || el.textContent;
    el.textContent = slot;
  });
  document.querySelectorAll(".lang-btn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}
document.addEventListener("click", (e)=>{
  const t = e.target.closest(".lang-btn");
  if(t){
    applyLang(t.dataset.lang);
    // also rerender grid if exists
    if(window.renderGrid){ renderGrid(window._cars, window._page||1); }
    if(document.getElementById("carTitle") && window._car){
      fillCar(window._car);
    }
  }
});

async function fetchCars(){
  const res = await fetch("data/cars.json?_="+Date.now());
  return res.json();
}

function currencyRM(n){ return "RM " + n.toLocaleString("en-MY"); }

function cardTemplate(car){
  return `
  <a class="card" href="car.html?id=${car.id}">
    <img src="${car.images[0]}" alt="${car.name}"/>
    <div class="card-body">
      <div class="price">${currencyRM(car.price)}</div>
      <div class="title">${car.name}</div>
      <div class="meta">${car.mileage} · ${car.location}</div>
    </div>
  </a>`;
}

function renderGrid(cars, page=1){
  window._cars = cars; window._page = page;
  const grid = document.getElementById("grid");
  if(!grid) return;
  const start = (page-1)*PAGE_SIZE;
  const slice = cars.slice(start, start+PAGE_SIZE);
  grid.innerHTML = slice.map(cardTemplate).join("");

  // pager
  const pager = document.getElementById("pager");
  const totalPages = Math.max(1, Math.ceil(cars.length / PAGE_SIZE));
  pager.innerHTML = "";
  const mk = (label, p, disabled=false, active=false)=>{
    const b = document.createElement("button");
    b.className = "page-btn" + (active?" active":"");
    b.textContent = label;
    if(disabled){ b.disabled = true; }
    b.addEventListener("click", ()=>renderGrid(cars, p));
    return b;
  };
  pager.appendChild(mk("«", 1, page===1));
  pager.appendChild(mk("‹", Math.max(1,page-1), page===1));
  // page numbers (compact)
  for(let p=1; p<=totalPages && p<=10; p++){
    pager.appendChild(mk(String(p), p, false, p===page));
  }
  pager.appendChild(mk("›", Math.min(totalPages,page+1), page===totalPages));
  pager.appendChild(mk("»", totalPages, page===totalPages));
}

async function boot(){
  applyLang(currentLang);
  if(document.getElementById("grid")){
    const cars = await fetchCars();
    renderGrid(cars, 1);
  }
}
boot();

// Detail page
async function loadCarDetail(id){
  applyLang(currentLang);
  const cars = await fetchCars();
  const car = cars.find(c => c.id===id) || cars[0];
  window._car = car;
  fillCar(car);
}
function fillCar(car){
  if(!car) return;
  const t = document.getElementById("carTitle");
  const p = document.getElementById("carPrice");
  const m = document.getElementById("carMeta");
  t.textContent = car.name;
  p.textContent = currencyRM(car.price);
  m.textContent = `${car.mileage} · ${car.location}`;
  const g = document.getElementById("gallery");
  g.innerHTML = car.images.slice(0,20).map(src=>`<img src="${src}" alt="car photo"/>`).join("");
  const h = document.getElementById("highlights");
  h.innerHTML = car.highlights.map(x=>`<li>${x}</li>`).join("");
}
