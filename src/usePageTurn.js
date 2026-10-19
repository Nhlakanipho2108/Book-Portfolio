import { useRouter } from 'vue-router';

const pages = [
  '/index.html',
  '/projects.html',
  '/skills.html',
  '/about.html',
  '/certificates.html',
  '/contact.html'
];

export function usePageTurn() {
  const router = useRouter();
  let navigating = false;
  let lastScrollMove = 0;
  let pushed = 0;
  let pushTimer;
  let touchY = null;

  const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const atTop = () => window.scrollY <= 0;

  function goTo(path, arrival) {
    if (navigating || !path) return;
    navigating = true;
    sessionStorage.setItem('arrive', arrival);
    document.body.classList.add('page-leaving');
    setTimeout(() => {
      router.push(path);
      navigating = false;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280);
  }

  function nudge(direction, amount) {
    if (navigating) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => { pushed = 0; }, 400);
    if (Date.now() - lastScrollMove < 250) {
      pushed = 0;
      return;
    }

    const currentPath = router.currentRoute.value.path;
    const index = pages.indexOf(currentPath === '/' ? '/index.html' : currentPath);
    const nextPage = pages[index + 1];
    const previousPage = pages[index - 1];
    if (direction > 0 && atBottom() && nextPage) pushed += amount;
    else if (direction < 0 && atTop() && previousPage) pushed += amount;
    else {
      pushed = 0;
      return;
    }

    if (pushed >= 160) {
      goTo(direction > 0 ? nextPage : previousPage, direction > 0 ? 'top' : 'bottom');
    }
  }

  function onScroll() {
    lastScrollMove = Date.now();
    pushed = 0;
  }

  function onWheel(event) {
    if (event.target instanceof Element && event.target.closest('textarea')) return;
    nudge(Math.sign(event.deltaY), Math.abs(event.deltaY));
  }

  function onTouchStart(event) {
    touchY = event.touches[0]?.clientY ?? null;
  }

  function onTouchEnd(event) {
    if (touchY === null) return;
    const delta = touchY - (event.changedTouches[0]?.clientY ?? touchY);
    touchY = null;
    if (Math.abs(delta) < 70 || Date.now() - lastScrollMove < 250) return;

    const currentPath = router.currentRoute.value.path;
    const index = pages.indexOf(currentPath === '/' ? '/index.html' : currentPath);
    if (delta > 0 && atBottom()) goTo(pages[index + 1], 'top');
    else if (delta < 0 && atTop()) goTo(pages[index - 1], 'bottom');
  }

  function onKeydown(event) {
    if (event.target instanceof Element && event.target.closest('input, textarea')) return;
    if (['ArrowDown', 'PageDown', 'End'].includes(event.key) && atBottom()) nudge(1, 160);
    if (['ArrowUp', 'PageUp', 'Home'].includes(event.key) && atTop()) nudge(-1, 160);
  }

  function start() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeydown);
  }

  function stop() {
    clearTimeout(pushTimer);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('keydown', onKeydown);
  }

  return { start, stop };
}
