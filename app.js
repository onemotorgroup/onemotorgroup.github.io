// ONE MOTOR GROUP — homepage loader (GitHub Pages friendly)

// ====== 配置 ======
const PAGE_SIZE = 8;                      // 每页 8 辆
const DATA_URL  = "/data/cars.json";      // 车辆数据
const GRID_HTML = `
  <section class="car-grid" id="carGrid"></section>
  <div id="pager" style="margin:18px 0;"></div>
`;

// ====== 工具 ======
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

function rm(n){ return String(n).startsWith("RM") ? n : "RM " + n; }

function cardTemplate(car){
  return `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>${rm(car.price)} · ${car.mileage || ""} · ${car.country || ""}</p>
      <a href="${car.link || "/car.html"}">查看详情</a>
    </div>
  `;
}

function renderPager(total, page, onGo){
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pager = $("#pager");
  if(!pager) return;
  const btn = (label, p, disabled=false, active=false) =>
    `<button style="margin:0 4px;padding:6px 10px;border:1px solid #d4af37;background:${active?"#d4af37":"transparent"};color:${active?"#000":"#d4af37"};border-radius:6px;${disabled?"opacity:.35;cursor:not-allowed;":""}" data-page="${p}" ${disabled?"disabled":""}>${label}</button>`;
  let html = "";
  html += btn("«", 1, page===1);
  html += btn("‹", Math.max(1, page-1), page===1);
  for(let p=1; p<=totalPages && p<=10; p++){
    html += btn(p, p, false, p===page);
  }
  html += btn("›", Math.min(totalPages, page+1), page===totalPages);
  html += btn("»", totalPages, page===totalPages);
  pager.innerHTML = html;
  pager.onclick = (e)=>{
    const b = e.target.closest("button[data-page]");
    if(!b) return;
    onGo(Number(b.dataset.page));
  };
}

function renderGrid(cars, page=1){
  const grid = $("#carGrid");
  if(!grid) return;
  const start = (page-1)*PAGE_SIZE;
  const slice = cars.slice(start, start+PAGE_SIZE);
  grid.innerHTML = slice.map(cardTemplate).join("");
  renderPager(cars.length, page, (p)=>renderGrid(cars, p));
}

// ====== 语言切换（简单记忆） ======
let currentLang = localStorage.getItem("lang") || "zh";
const i18n = {
  zh: { tagline:"LUXURY IMPORT CAR · MALAYSIA", btn:"查看详情" },
  en: { tagline:"LUXURY IMPORT CAR · MALAYSIA", btn:"View Details" },
  ms: { tagline:"KERETA IMPORT MEWAH · MALAYSIA", btn:"Lihat Butiran" }
};
function applyLang(lang){
  currentLang = lang;
  localStorage.setItem("lang", lang);
  const t = i18n[lang] || i18n.zh;
  const brandSub = document.querySelector(".brand .sub");
  if(brandSub) brandSub.textContent = t.tagline;
  // 更新按钮文案
  $$(".car-card a").forEach(a=>a.textContent = t.btn);
}
function bindLang(){
  const nav = document.querySelector(".language");
  if(!nav) return;
  nav.addEventListener("click",(e)=>{
    const btn = e.target.closest("button");
    if(!btn) return;
    const lang = (btn.textContent||"zh").toLowerCase().includes("en") ? "en"
              : (btn.textContent||"").toLowerCase().includes("bm") ? "ms"
              : "zh";
    applyLang(lang);
  });
}

// ====== 启动：把首页内容替换为车格 ======
async function boot(){
  bindLang();

  // 如果首页 main 里还只有一段文字，替换为车格容器
  const main = document.querySelector(".content");
  if(main && !$("#carGrid")){
    main.innerHTML = GRID_HTML;
  }

  // 读取数据
  let cars = [];
  try{
    const res = await fetch(DATA_URL, {cache:"no-store"});
    cars = await res.json();
  }catch(err){
    console.error("加载 /data/cars.json 失败", err);
  }

  // 渲染
  if(cars.length){
    renderGrid(cars, 1);
    applyLang(currentLang); // 应用语言文案
  }else{
    const grid = $("#carGrid");
    if(grid) grid.innerHTML = `<p style="color:#bbb">暂无车辆数据（请检查 /data/cars.json 是否已上传）</p>`;
  }
}

document.addEventListener("DOMContentLoaded", boot);
