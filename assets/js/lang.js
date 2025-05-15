async function loadLang(lang = 'en') {
  const res = await fetch(`../lang/${lang}.json`);
  const dict = await res.json();
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.getAttribute('data-text');
    if (dict[key]) el.innerText = dict[key];
  });
}