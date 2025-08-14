'use strict';
(() => {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.header__nav');
  if (!btn || !nav) return;

  const mq = matchMedia('(min-width: 785px)');

  const setOpen = (open) => {
    btn.classList.toggle('is-active', open);
    nav.classList.toggle('is-active', open);
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('no-scroll', open);
  };

  // クリックで開閉
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!btn.classList.contains('is-active'));
  });

  // リンククリックで閉じる
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) { setOpen(false); return; }
    // 暗転部クリック（nav本体をクリックしたとき）で閉じる
    if (e.target === nav) setOpen(false);
  });

  // 外側クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!btn.classList.contains('is-active')) return;
    if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });

  // ESCで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // PC幅に戻ったら状態リセット
  mq.addEventListener('change', (ev) => {
    if (ev.matches) setOpen(false);
  });
})();