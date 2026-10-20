// 1. 휴대폰 메뉴 열고 닫기
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuBtn.classList.toggle('is-open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// 메뉴 항목을 누르면 메뉴 닫기
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuBtn.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', false);
  });
});

// 2. 스크롤하면 헤더 그림자 + 맨 위로 버튼 표시
const header = document.getElementById('header');
const fab = document.getElementById('fab');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
  fab.classList.toggle('is-visible', window.scrollY > 600);
});

// 3. 지금 보고 있는 섹션의 메뉴 강조
const sections = document.querySelectorAll('main section[id]');
const navLinks = nav.querySelectorAll('a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach((section) => navObserver.observe(section));

// 4. 섹션이 화면에 들어오면 부드럽게 나타나기
const revealTargets = document.querySelectorAll('.section__title, .info-grid, .team, .card, .step, .stat, .news__item');
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-shown');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));

// 5. 숫자 카운트 애니메이션 (0 → 목표 숫자)
function countUp(el) {
  const target = parseFloat(el.dataset.target);
  const decimal = parseInt(el.dataset.decimal || '0', 10);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = decimal
      ? value.toFixed(decimal)
      : Math.round(value).toLocaleString('ko-KR');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));
