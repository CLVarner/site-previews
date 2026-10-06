const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() { navigation.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a,button').forEach(control => control.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); } });
let opener;
document.querySelectorAll('[data-dialog]').forEach(control => control.addEventListener('click', () => {
  opener = control; const dialog = document.getElementById(control.dataset.dialog);
  const status = dialog.querySelector('[data-status]'); if (status) status.textContent = 'Choose an illustrative gift amount to explore the design. No donation has been made.';
  dialog.showModal(); dialog.querySelector('[data-close]').focus();
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button,a[href],input,textarea,select')].filter(control => !control.disabled);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
});
document.querySelectorAll('[data-amount]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-amount]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
  document.querySelector('[data-status]').textContent = button.dataset.amount + ' selected for this design preview. No donation has been made.';
}));
document.querySelector('[data-continue]').addEventListener('click', () => {
  document.querySelector('[data-status]').textContent = 'The giving journey would continue here. This is a design demonstration; no donation has been made and no payment information has been collected.';
});
