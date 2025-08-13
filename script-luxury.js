// Assetcore Engineering — Luxury Interactions
// Features: sticky nav, smooth scroll, modal for projects, parallax, AOS fallback, form UX

(function(){
  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  // NAVIGATION
  const navbar = qs('.navbar');
  const hamburger = qs('.hamburger');
  const menu = qs('.nav-menu');
  const links = qsa('.nav-link');

  function onScroll(){
    const st = window.scrollY || window.pageYOffset;
    if (st > 10) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    // basic parallax
    qsa('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      el.style.transform = `translateY(${st * speed}px)`;
    });
  }

  function smoothTo(id){
    const el = qs(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function initNav(){
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (hamburger){
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu?.classList.toggle('active');
        document.body.style.overflow = menu?.classList.contains('active') ? 'hidden' : '';
      });
    }

    links.forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href?.startsWith('#')){
          e.preventDefault();
          smoothTo(href);
          hamburger?.classList.remove('active');
          menu?.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // AOS fallback
  function initRevealFallback(){
    if (window.AOS) return; // AOS handles animations
    const els = qsa('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en => {
        if (en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(el => io.observe(el));
  }

  // PROJECT MODAL
  function initProjectModal(){
    const modal = qs('#project-modal');
    if (!modal) return;
    const backdrop = qs('#project-modal .modal-backdrop');
    const closeBtn = qs('#project-modal .modal-close');
    const modalImg = qs('#project-modal .modal-img');
    const modalTitle = qs('#project-modal .modal-title');
    const modalText = qs('#project-modal .modal-text');

    function open(data){
      modalImg.src = data.img || '';
      modalTitle.textContent = data.title || '';
      modalText.textContent = data.desc || '';
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close(){ modal.classList.remove('active'); document.body.style.overflow = ''; }

    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });

    qsa('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img')?.src;
        const title = card.dataset.title || card.querySelector('.project-title')?.textContent;
        const desc = card.dataset.desc || card.querySelector('.project-desc')?.textContent || 'Structural Design & Supervision';
        open({ img, title, desc });
      });
      card.tabIndex = 0;
      card.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); card.click(); }});
    });
  }

  // CONTACT FORM UX
  function initForm(){
    const form = qs('#contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; const label = btn.textContent; btn.textContent = 'Sending…';
      await new Promise(r => setTimeout(r, 1200));
      btn.textContent = label; btn.disabled = false; form.reset();
      alert('Thank you. We will get back to you within 24 hours.');
    });
  }

  // INIT
  document.addEventListener('DOMContentLoaded', ()=>{
    initNav();
    initRevealFallback();
    initProjectModal();
    initForm();
    if (window.AOS){ AOS.init({ duration: 800, easing: 'ease-out', once: true }); }
  });
})();