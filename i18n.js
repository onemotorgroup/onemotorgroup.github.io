const I18N={
 zh:{slogan:"进口车专家 · 值得信赖",subtitle_ms:"PAKAR KERETA IMPORT · BOLEH DIPERCAYAI",
     footer_note:"进口车展示平台（不含下单按钮）",
     ticker:["原装进口","高规格配置","真实车价","文件齐全","免费送车上门","专业代办注册","低里数","真实照片与资料"],
     port:[
       "车辆已抵达巴生港口码头，付款确认后我们协助文件并安排免费送到府上。",
       "进口流程透明：运单、报关、税费、检验资料完整清晰。",
       "专业团队落港、检查、固定与运输，保障车况安全。",
       "顾客确认后，我们进行资料核验与快速注册。",
       "交付前整备细节与清洁，确保到手即用。",
       "本地范围免费送车到家，同时说明文件与售后。"
     ]},
 en:{slogan:"Import Car Specialists · Trusted",subtitle_ms:"PAKAR KERETA IMPORT · BOLEH DIPERCAYAI",
     footer_note:"Display-only showroom (no ordering button)",
     ticker:["Direct import","High-spec trims","Transparent pricing","Full paperwork",
             "Free doorstep delivery","Registration assistance","Low mileage","Real photos & data"],
     port:[
       "Units have arrived at Port Klang; after payment we process papers and deliver free.",
       "Transparent import: bill of lading, customs, taxes, inspections documented.",
       "Professional team for unloading, checks, securing and transport.",
       "After customer confirmation we verify documents and register quickly.",
       "Detailing before handover; ready to drive.",
       "Free local delivery with document briefing & after-sales."
     ]},
 ms:{slogan:"Pakar Kereta Import · Boleh Dipercayai",subtitle_ms:"PAKAR KERETA IMPORT · BOLEH DIPERCAYAI",
     footer_note:"Paparan sahaja (tiada butang tempahan)",
     ticker:["Import terus","Spec tinggi","Harga telus","Dokumen lengkap","Penghantaran percuma",
             "Bantuan pendaftaran","Mileage rendah","Foto & data sebenar"],
     port:[
       "Kenderaan telah tiba di Port Klang; selepas bayaran kami urus dokumen dan hantar percuma.",
       "Import telus: bil muatan, kastam, cukai, pemeriksaan—semua direkod.",
       "Pasukan profesional urus turunkan, semak, ikat dan angkut.",
       "Selepas pengesahan, kami semak dokumen dan daftar segera.",
       "Penyediaan sebelum serahan; sedia dipandu.",
       "Penghantaran tempatan percuma bersama penerangan dokumen & selepas jualan."
     ]}
};
function detectLang(){const saved=localStorage.getItem("lang");if(saved)return saved;const n=(navigator.language||"zh").toLowerCase();if(n.startsWith("zh"))return"zh";if(n.startsWith("ms")||n.startsWith("id"))return"ms";return"en";}
let LANG=detectLang();
function applyLang(){
 const d=I18N[LANG]||I18N.en;
 const $=s=>document.querySelector(s); const set=(s,k)=>{const el=$(s); if(el) el.textContent=d[k]||"";}
 set("#slogan","slogan"); set("#subtitle_ms","subtitle_ms");
 const foot=document.querySelector("[data-i18n='footer_note']"); if(foot) foot.textContent=d["footer_note"];
 const t=document.getElementById("advTicker"); if(t){ t.innerHTML=""; const arr=d.ticker.concat(d.ticker); arr.forEach(x=>{ const span=document.createElement("span"); span.textContent=x; t.appendChild(span); });}
 document.querySelectorAll(".port .txt").forEach((p,i)=>{ const list=d.port||[]; p.textContent=list[i%list.length]||p.textContent; });
}
function switchLang(l){ LANG=l; localStorage.setItem("lang",l); applyLang(); }
document.addEventListener("DOMContentLoaded",()=>{
 document.querySelectorAll("[data-lang]").forEach(btn=>btn.addEventListener("click",()=>switchLang(btn.dataset.lang)));
 applyLang();
});
