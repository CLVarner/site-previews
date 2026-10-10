'use strict';
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.innerHTML = `${open ? 'Close menu' : 'Open menu'} <span aria-hidden="true">${open ? '×' : '☰'}</span>`;
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    setMenu(false); menu.focus();
  }
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
const topic = new URLSearchParams(location.search).get('topic');
const topicField = document.getElementById('topic');
if (topicField && [...topicField.options].some(option => option.value === topic)) topicField.value = topic;
function errorFor(input, message) {
  const output = document.getElementById(`${input.id}-error`);
  input.setAttribute('aria-invalid', String(Boolean(message)));
  if (output) { output.textContent = message; output.hidden = !message; }
}
for (const form of document.querySelectorAll('form[data-demo]')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const submit = form.querySelector('button[type=submit]');
    if (submit.disabled) return;
    if (form.dataset.demo === 'newsletter') {
      const input = form.elements.email;
      const consent = form.elements.consent;
      const error = document.getElementById('newsletter-error');
      const status = form.querySelector('[role=status]');
      let message = !input.validity.valid ? 'Enter an email address in the format name@example.com.' : !consent.checked ? 'Select the campaign email updates checkbox to preview signup.' : '';
      error.textContent = message; error.hidden = !message;
      input.setAttribute('aria-invalid', String(!input.validity.valid));
      consent.setAttribute('aria-invalid', String(input.validity.valid && !consent.checked));
      status.textContent = '';
      if (message) { (!input.validity.valid ? input : consent).focus(); return; }
      submit.disabled = true;
      status.textContent = 'Previewing your signup request…';
      setTimeout(() => {
        status.textContent = 'Signup preview complete. On the finished website, the campaign email service will confirm the actual subscription. No address was sent or subscribed here.';
        submit.disabled = false;
      }, 350);
    } else {
      const status = form.querySelector('[role=status]');
      const fields = [form.elements.name, form.elements.email, form.elements.topic];
      const messages = ['Enter your name.', 'Enter an email address in the format name@example.com.', 'Choose a topic for your message.'];
      let firstInvalid;
      fields.forEach((input, i) => {
        const invalid = !input.validity.valid || (input.name === 'name' && !input.value.trim());
        errorFor(input, invalid ? messages[i] : '');
        if (invalid && !firstInvalid) firstInvalid = input;
      });
      status.textContent = '';
      if (firstInvalid) { firstInvalid.focus(); return; }
      submit.disabled = true;
      status.textContent = 'Previewing your message…';
      setTimeout(() => {
        status.textContent = 'Inquiry preview complete. No message was sent and no pledge or donation was created.' + (form.elements.newsletter.checked ? ' Your separate email-updates choice was also previewed; no subscription was created.' : '');
        status.focus(); submit.disabled = false;
      }, 350);
    }
  });
}
