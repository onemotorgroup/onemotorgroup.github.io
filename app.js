(function(){
  const wrap = document.getElementById('carCarousel');
  if(!wrap) return;
  let auto = setInterval(()=>{
    wrap.scrollBy({left:320, behavior:'smooth'});
    if (wrap.scrollLeft + wrap.clientWidth >= wrap.scrollWidth - 5){
      wrap.scrollTo({left:0, behavior:'smooth'});
    }
  }, 3200);
  wrap.addEventListener('touchstart',()=>clearInterval(auto), {passive:true});
  wrap.addEventListener('mouseenter',()=>clearInterval(auto));
})();