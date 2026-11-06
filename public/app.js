document.querySelectorAll('[data-store]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.alert('임대리 앱은 출시 준비 중입니다.');
  });
});

document.querySelectorAll('.site-footer .social-links a').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.alert('SNS 채널은 준비 중입니다.');
  });
});

// 카카오 채널 URL. 채널 주소가 변경되면 여기에서 수정하세요.
// 미설정 상태에서는 외부 샘플 채널로 연결하지 않고 준비 중 안내를 표시합니다.
const KAKAO_URL = 'https://pf.kakao.com/_WxcNmX';
const kakaoButton = document.getElementById('kakao-button');
const contactDialog = document.getElementById('contact-dialog');
kakaoButton.addEventListener('click', () => {
  if (KAKAO_URL) window.open(KAKAO_URL, '_blank', 'noopener,noreferrer');
  else contactDialog.showModal();
});
contactDialog.querySelector('.dialog-close').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', event => {
  const box = contactDialog.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) contactDialog.close();
});

// 배너는 기본 수동 재생. ▶ 버튼으로만 자동 재생을 시작합니다.
// 키보드 포커스/마우스 호버/탭 비활성화/화면 밖에서는 일시 정지합니다.
const hero = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('[data-slide]')];
const toggle = document.querySelector('.slide-toggle');
const count = document.querySelector('.slide-count');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;
let autoplay = false;
let hovered = false;
let focused = false;
let inView = true;
let timer;
function showSlide(index) {
  active = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.hidden = i !== active;
    slide.inert = i !== active;
    slide.classList.toggle('is-active', i === active);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === active);
    dot.setAttribute('aria-current', String(i === active));
  });
  count.innerHTML = `0${active + 1} <span>/ 0${slides.length}</span>`;
}
function syncTimer() {
  clearInterval(timer);
  if (autoplay && !hovered && !focused && !document.hidden && inView && !reduceMotion.matches) {
    timer = setInterval(() => showSlide(active + 1), 6500);
  }
}
dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slide)); syncTimer(); }));
toggle.addEventListener('click', () => {
  autoplay = !autoplay;
  toggle.setAttribute('aria-pressed', String(autoplay));
  toggle.setAttribute('aria-label', autoplay ? '배너 자동 재생 정지' : '배너 자동 재생 시작');
  toggle.textContent = autoplay ? '\uC790\uB3D9 \uC7AC\uC0DD \uC815\uC9C0' : '\uC790\uB3D9 \uC7AC\uC0DD';
  syncTimer();
});
hero.addEventListener('mouseenter', () => { hovered = true; syncTimer(); });
hero.addEventListener('mouseleave', () => { hovered = false; syncTimer(); });
hero.addEventListener('focusin', () => { focused = true; syncTimer(); });
hero.addEventListener('focusout', () => { requestAnimationFrame(() => { focused = hero.contains(document.activeElement); syncTimer(); }); });
document.addEventListener('visibilitychange', syncTimer);
reduceMotion.addEventListener('change', syncTimer);
new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncTimer(); }).observe(hero);

// Reveal below-banner content once; the company footer is outside main.
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const selector = 'h2, h3, p, ul, a, article, details, .card-scene, .app-stage, .tax-number, .benefit-strip > div, .feature-rows > div, .download-art';
  const candidates = [...document.querySelectorAll('main section:not(.hero)')]
    .flatMap(section => [...section.querySelectorAll(selector)]);
  const candidateSet = new Set(candidates);
  const targets = candidates.filter(element => {
    for (let parent = element.parentElement; parent && parent.tagName !== 'SECTION'; parent = parent.parentElement) {
      if (candidateSet.has(parent)) return false;
    }
    return true;
  });
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(element => {
    element.classList.add('scroll-fade');
    revealObserver.observe(element);
  });
  reduceMotion.addEventListener('change', event => {
    if (!event.matches) return;
    targets.forEach(element => element.classList.add('is-visible'));
    revealObserver.disconnect();
  });
}
