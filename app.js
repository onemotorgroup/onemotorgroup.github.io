// app.js — 下拉每次再出8格 + 可翻页到100页（根目录结构）
const DATA_URL  = "cars.json";
const PAGE_SIZE = 8;             // 每页 8 辆
let cars = [];
let currentPage = 1;
let totalPages = 1;

const $  = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>[...r.querySelectorAll(s)];

function cardHTML(car){
  return `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <div class="car-info">
        <h3>${car.name}</h3>
        <p class="price">${car.price}</p>
      </div>
    </div>
  `;
}

// 渲染从第1页一直到 page 的所有车（便于“下拉加载更多”逐页追加）
function renderUpTo(page){
  currentPage = Math.min(page, totalPages);
  const upto = currentPage * PAGE_SIZE;
  const list = cars.slice(0, upto);
  $("#carGrid").innerHTML = list.map(cardHTML).join("");
  renderPager();
}

// 只追加下一页（给下拉滚动触发使用）
function appendNextPage(){
  if(currentPage >= totalPages) return;
  currentPage++;
  const start = (currentPage-1)*PAGE_SIZE;
  const slice = cars.slice(start, start+PAGE_SIZE);
  const frag = document.createElement("div");
  frag.innerHTML = slice.map(cardHTML).join("");
  $$("#carGrid")[0].append(...frag.childNodes);
  renderPager();
}

// 构建分页（最多显示关键页码 + 100页上限跳转）
function renderPager(){
  const pager = $("#pager");
  const tp = Math.min(totalPages, 100);
  const cp = Math.min(currentPage, tp);

  const btn = (label, page, disabled=false, active=false)=>`
    <button class="pg-btn ${active?'active':''}" data-page="${page}" ${disabled?'disabled':''}>${label}</button>
  `;

  // 动态页码窗口
  let pages = [];
  const windowSize = 5; // 当前页左右各2个
  const start = Math.max(1, cp - 2);
  const end   = Math.min(tp, cp + 2);

  pages.push(1);
  if(start > 2) pages.push('...');
  for(let p=start; p<=end; p++){
    if(p!==1 && p!==tp) pages.push(p);
  }
  if(end < tp-1) pages.push('...');
  if(tp>1) pages.push(tp);

  let html = '';
  html += btn('«', 1, cp===1);
  html += btn('‹', Math.max(1, cp-1), cp===1);
  pages.forEach(p=>{
    if(p==='...') html += `<span class="pg-ellipsis">…</span>`;
    else html += btn(p, p, false, cp===p);
  });
  html += btn('›', Math.min(tp, cp+1), cp===tp);
  html += btn('»', tp, cp===tp);
  html += `<span class="pg-info">Page ${cp} / ${tp}${totalPages>100?' (showing 100 max)':''}</span>`;

  pager.innerHTML = html;

  pager.onclick = (e)=>{
    const b = e.target.closest("button.pg-btn");
    if(!b) return;
    const target = Number(b.dataset.page);
    renderUpTo(target);
    window.scrollTo({top:0, behavior:'smooth'});
  };
}

// 监听滚动：快到底部时自动再加载 8 格
function bindInfiniteScroll(){
  window.addEventListener('scroll', ()=>{
    const nearBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight - 200);
    if(nearBottom) appendNextPage();
  }, {passive:true});
}

async function boot(){
  try{
    const res = await fetch(DATA_URL, {cache:'no-store'});
    cars = await res.json();
  }catch(e){
    console.error('加载 cars.json 失败', e);
    $("#carGrid").innerHTML = `<p>⚠️ 暂无车辆数据（请确认 cars.json）</p>`;
    return;
  }

  totalPages = Math.ceil(cars.length / PAGE_SIZE);
  renderUpTo(1);        // 先显示第1页（8格）
  bindInfiniteScroll(); // 下拉再出8格
}

document.addEventListener('DOMContentLoaded', boot);
