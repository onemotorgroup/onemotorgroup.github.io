// Simple offline admin: uses localStorage as staging, exports JSON files
const ADMIN_EMAIL='admin@onemotorgroup.com';
const ADMIN_PWD='123456';
const db={cars:[], users:[]};

// Load existing from data files (for preview), then merge with local edits
fetch('data/cars.json').then(r=>r.json()).then(j=>{ db.cars=j.cars||[]; renderCars(); });
fetch('data/users.json').then(r=>r.json()).then(j=>{ db.users=j.users||[]; renderUsers(); }).catch(()=>{});

// Auth (offline demo)
let authed=false;
login.onclick=()=>{
  if(email.value.trim()===ADMIN_EMAIL && pwd.value===ADMIN_PWD){
    authed=true; logout.style.display='inline-block'; alert('登录成功');
  }else alert('账号或密码不正确');
};
logout.onclick=()=>{ authed=false; logout.style.display='none'; alert('已登出'); };

// Add car
addCar.onclick=()=>{
  if(!authed) return alert('请先登录');
  const id = (brand.value||'').toLowerCase()+'-'+(model.value||'').toLowerCase()+'-'+(year.value||'').trim();
  const imgs=(images.value||'').split('\n').map(s=>s.trim()).filter(Boolean).slice(0,30);
  const car={
    id, brand:brand.value, model:model.value, name:name.value, year:parseInt(year.value||''),
    mileage:mileage.value, color:color.value, price:price.value,
    highlights:highlights.value, value:value.value, story:story.value, images:imgs
  };
  if(!car.id || !car.name){ return alert('请至少填写 品牌/型号/年份 与 展示名称'); }
  db.cars = db.cars.filter(c=>c.id!==car.id).concat([car]);
  renderCars(); alert('已添加/更新车辆：'+car.id);
};

function renderCars(){
  const box=document.getElementById('carList'); if(!box) return;
  box.innerHTML='';
  db.cars.forEach(c=>{
    const div=document.createElement('div');
    div.className='card'; div.innerHTML=`<div class="p"><h3>${c.name}</h3><div class="y">${c.year||''} · ${c.brand||''} ${c.model||''}</div><div class="price">${c.price||''}</div></div>`;
    box.appendChild(div);
  });
}

// Users
addUser.onclick=()=>{
  if(!authed) return alert('请先登录');
  const id='OMG-'+new Date().getFullYear()+'-'+String(1000+Math.floor(Math.random()*9000));
  const user={ id, name:cname.value||'客户', car:ccar.value||'', status:cstatus.value||'处理中', note:cnote.value||'' };
  db.users.push(user); renderUsers(); alert('已生成客户ID：'+id+'\n请导出 users.json 后上传。');
};

function renderUsers(){
  const box=document.getElementById('userList'); if(!box) return;
  box.innerHTML='';
  db.users.forEach(u=>{
    const div=document.createElement('div');
    div.className='card'; div.innerHTML=`<div class="p"><h3>${u.name}</h3><div class="y">ID：${u.id}</div><div class="km">状态：${u.status}</div></div>`;
    box.appendChild(div);
  });
}

// Export buttons
function download(name, content){
  const blob=new Blob([content], {type:'application/json;charset=utf-8'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
}
exportCars.onclick=()=> download('cars.json', JSON.stringify({cars:db.cars}, null, 2));
exportUsers.onclick=()=> download('users.json', JSON.stringify({users:db.users}, null, 2));
