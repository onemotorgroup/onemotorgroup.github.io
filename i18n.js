(function(){
  const dict = {
    zh:{heroTitle:"ONE MOTOR GROUP · 进口车专家 · 值得信赖",heroDesc:"日本 / 澳洲 / 英国 直进口；高配、低里数、近新车。",heroTag:"黑金主题 · 官方展示",heroNote:"手机/电脑自适应 · 三语自动切换",ctaWa:"🟢 WhatsApp 咨询",carsTitle:"精选现车 · 可扩展至 100 台",carsSub:"左右滑动 / 自动滚动 · 可随时增减车辆",portTitle:"巴生港口马头 · 实景照片",portSub:"车辆已安全抵达巴生港口马头（示例图，无文字水印）",portNote:"顾客付款下单后，我们协助注册资料 → 安排运输送达全国。",aboutTag:"关于我们",aboutTitle:"ONE MOTOR GROUP · 进口车专家",aboutDesc:"直进口渠道 · 严选高配与低里数 · 巴生港口交付 · 只收银行转账和信用卡。",contactTag:"联系",contactTitle:"📞 快速联系与看车",footer:"进口车，我们只做精品 · Only the Best Imports · Kereta Import Berkualiti Tinggi",
      "c1-title":"2023 Toyota Alphard 2.5 Z","c1-meta":"珍珠白 · RM100,000 · 8,000+","c1-blurb":"商务家用两相宜 · 高级乘坐",
      "c2-title":"2022 Toyota Vellfire 2.5 ZG","c2-meta":"黑色 · RM96,800 · 12,000+","c2-blurb":"双天窗 · 静谧舒适 · 尊享后排",
      "c3-title":"2023 Lexus RX350 2.4 (A)","c3-meta":"黑色 · RM99,000 · 8,000+","c3-blurb":"豪华动感 · 性能与舒适平衡",
      "c4-title":"2020 Toyota Hiace Panel Van 2.5 (M)","c4-meta":"白色 · RM44,800","c4-blurb":"商用/露营改装皆可 · 柴油耐用",
      "c5-title":"2019 Toyota Vios 1.5 G (A)","c5-meta":"锖色 · RM29,000 · 45k+","c5-blurb":"耐用省油 · 城市代步优选",
      "c6-title":"2020 Honda Civic 1.5 TC (A)","c6-meta":"白色 · RM35,800 · 45k+","c6-blurb":"VTEC Turbo · 性能与省油兼顾",
      p1:"车辆已安全抵达巴生港口马头",p2:"车辆已安全抵达巴生港口马头",p3:"车辆已安全抵达巴生港口马头",p4:"车辆已安全抵达巴生港口马头",p5:"车辆已安全抵达巴生港口马头",p6:"车辆已安全抵达巴生港口马头"
    },
    en:{heroTitle:"ONE MOTOR GROUP · Trusted Import Car Experts",heroDesc:"Direct imports from Japan / Australia / UK. High‑spec, low mileage, like‑new.",heroTag:"Black‑Gold Theme · Official Display",heroNote:"Responsive · Auto Tri‑Language",ctaWa:"🟢 WhatsApp",carsTitle:"Featured Stock · Scalable to 100 Cars",carsSub:"Swipe horizontally / Auto scroll · Add or remove anytime",portTitle:"Port Klang Jetty · Real Scenes",portSub:"Vehicles safely arrived at Port Klang Jetty (sample photos, no text overlay)",portNote:"After payment, we assist with registration → arrange transport nationwide.",aboutTag:"About",aboutTitle:"ONE MOTOR GROUP · Import Specialists",aboutDesc:"Direct import channels · Curated high‑spec, low mileage · Port Klang delivery · Bank transfer & credit card only.",contactTag:"Contact",contactTitle:"📞 Quick Contact & Viewing",footer:"Only the Best Imports · 进口车，我们只做精品 · Kereta Import Berkualiti Tinggi",
      "c1-title":"2023 Toyota Alphard 2.5 Z","c1-meta":"Pearl White · RM100,000 · 8,000+","c1-blurb":"Business & family ready · Premium comfort",
      "c2-title":"2022 Toyota Vellfire 2.5 ZG","c2-meta":"Black · RM96,800 · 12,000+","c2-blurb":"Dual sunroof · Quiet & plush · VIP rear",
      "c3-title":"2023 Lexus RX350 2.4 (A)","c3-meta":"Black · RM99,000 · 8,000+","c3-blurb":"Luxury dynamics · Comfort balanced",
      "c4-title":"2020 Toyota Hiace Panel Van 2.5 (M)","c4-meta":"White · RM44,800","c4-blurb":"Commercial or camper‑ready · Durable diesel",
      "c5-title":"2019 Toyota Vios 1.5 G (A)","c5-meta":"Bronze · RM29,000 · 45k+","c5-blurb":"Reliable & fuel‑saving · City choice",
      "c6-title":"2020 Honda Civic 1.5 TC (A)","c6-meta":"White · RM35,800 · 45k+","c6-blurb":"VTEC Turbo · Power & efficiency",
      p1:"Vehicles safely arrived at Port Klang Jetty",p2:"Vehicles safely arrived at Port Klang Jetty",p3:"Vehicles safely arrived at Port Klang Jetty",p4:"Vehicles safely arrived at Port Klang Jetty",p5:"Vehicles safely arrived at Port Klang Jetty",p6:"Vehicles safely arrived at Port Klang Jetty"
    },
    ms:{heroTitle:"ONE MOTOR GROUP · Pakar Kereta Import Dipercayai",heroDesc:"Import terus dari Jepun / Australia / UK. Spec tinggi, jarak rendah, seperti baharu.",heroTag:"Tema Hitam‑Emas · Paparan Rasmi",heroNote:"Responsif · Auto Tiga Bahasa",ctaWa:"🟢 WhatsApp",carsTitle:"Stok Pilihan · Skala hingga 100 Kereta",carsSub:"Leret secara mendatar / Auto tatal · Tambah atau buang bila‑bila masa",portTitle:"Jeti Pelabuhan Klang · Suasana Sebenar",portSub:"Kenderaan tiba dengan selamat di Jeti Pelabuhan Klang (foto contoh, tiada teks)",portNote:"Selepas pembayaran, kami bantu pendaftaran → atur pengangkutan ke seluruh negara.",aboutTag:"Tentang",aboutTitle:"ONE MOTOR GROUP · Pakar Import",aboutDesc:"Saluran import terus · Spec tinggi, jarak rendah terpilih · Serahan Pelabuhan Klang · Terima pindahan bank & kad kredit.",contactTag:"Hubungi",contactTitle:"📞 Hubungi & Lihat Kereta",footer:"Kereta Import Berkualiti Tinggi · Only the Best Imports · 进口车，我们只做精品",
      "c1-title":"2023 Toyota Alphard 2.5 Z","c1-meta":"Putih Mutiara · RM100,000 · 8,000+","c1-blurb":"Sesuai bisnes & keluarga · Selesa mewah",
      "c2-title":"2022 Toyota Vellfire 2.5 ZG","c2-meta":"Hitam · RM96,800 · 12,000+","c2-blurb":"Bumbung suria berkembar · Senyap & mewah · Tempat duduk VIP",
      "c3-title":"2023 Lexus RX350 2.4 (A)","c3-meta":"Hitam · RM99,000 · 8,000+","c3-blurb":"Mewah & mantap · Seimbang keselesaan",
      "c4-title":"2020 Toyota Hiace Panel Van 2.5 (M)","c4-meta":"Putih · RM44,800","c4-blurb":"Komersial atau camper · Diesel tahan lasak",
      "c5-title":"2019 Toyota Vios 1.5 G (A)","c5-meta":"Gangsa · RM29,000 · 45k+","c5-blurb":"Jimatan minyak · Pilihan bandar",
      "c6-title":"2020 Honda Civic 1.5 TC (A)","c6-meta":"Putih · RM35,800 · 45k+","c6-blurb":"VTEC Turbo · Kuasa & jimat",
      p1:"Kenderaan selamat tiba di Jeti Pelabuhan Klang",p2:"Kenderaan selamat tiba di Jeti Pelabuhan Klang",p3:"Kenderaan selamat tiba di Jeti Pelabuhan Klang",p4:"Kenderaan selamat tiba di Jeti Pelabuhan Klang",p5:"Kenderaan selamat tiba di Jeti Pelabuhan Klang",p6:"Kenderaan selamat tiba di Jeti Pelabuhan Klang"
    }
  };
  function currentLang(){
    const forced = localStorage.getItem('lang');
    if (forced && dict[forced]) return forced;
    const n = navigator.language || 'en';
    if (n.startsWith('zh')) return 'zh';
    if (n.startsWith('ms') || n.startsWith('id')) return 'ms';
    return 'en';
  }
  function set(id, key, d){ const el=document.getElementById(id); if(el) el.textContent=d[key]; }
  function apply(lang){
    const d = dict[lang] || dict.en;
    set('hero-title','heroTitle',d); set('hero-desc','heroDesc',d);
    set('hero-tag','heroTag',d); set('hero-note','heroNote',d);
    const cta=document.getElementById('cta-wa'); if(cta) cta.textContent=d.ctaWa;
    set('cars-title','carsTitle',d); set('cars-sub','carsSub',d);
    set('port-title','portTitle',d); set('port-sub','portSub',d); set('port-note','portNote',d);
    set('about-tag','aboutTag',d); set('about-title','aboutTitle',d); set('about-desc','aboutDesc',d);
    set('contact-tag','contactTag',d); set('contact-title','contactTitle',d); set('footer','footer',d);
    document.querySelectorAll('[data-k]').forEach(el=>{ const k=el.getAttribute('data-k'); if(d[k]) el.textContent=d[k]; });
    ['p1','p2','p3','p4','p5','p6'].forEach(k=>{ const el=document.querySelector(`.gallery [data-k="${k}"]`); if(el && d[k]) el.textContent=d[k]; });
  }
  const init = currentLang(); apply(init);
  document.querySelectorAll('.langs button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const code = btn.dataset.lang==='auto' ? currentLang() : btn.dataset.lang;
      localStorage.setItem('lang', btn.dataset.lang==='auto' ? '' : code);
      document.querySelectorAll('.langs button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); apply(code);
    });
  });
})();