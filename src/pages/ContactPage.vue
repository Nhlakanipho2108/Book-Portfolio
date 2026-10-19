<script setup>
import { ref } from 'vue';

const form = ref({ name: '', email: '', subject: '', message: '' });
const status = ref('');
const statusIsError = ref(false);
const isSending = ref(false);
const contactEmail = 'Nhlakanipholuthuli2108@gmail.com';

async function sendMessage() {
  isSending.value = true;
  statusIsError.value = false;
  status.value = 'Sending…';

  try {
    const response = await fetch('https://formspree.io/f/xdeajdkz', {
      method: 'POST',
      body: new FormData(document.querySelector('#contactForm')),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Request failed');
    form.value = { name: '', email: '', subject: '', message: '' };
    status.value = "Message sent — thank you! I'll reply soon.";
  } catch {
    statusIsError.value = true;
    status.value = `Couldn't send your message. Please email me at ${contactEmail}.`;
  } finally {
    isSending.value = false;
  }
}
</script>

<template>
  <section class="section contact-section" id="contact">
    <div class="section-heading"><div><p class="eyebrow">LET'S TALK</p><h2>Say hello<span class="orange-dot">.</span></h2></div><p class="heading-note">Got an idea, a role or<br>just a question? ✉</p></div>
    <div class="contact-layout">
      <form id="contactForm" class="contact-form paper-note" action="https://formspree.io/f/xdeajdkz" method="POST" @submit.prevent="sendMessage">
        <label>Your name<input v-model="form.name" type="text" name="name" required autocomplete="name"></label>
        <label>Your email<input v-model="form.email" type="email" name="email" required autocomplete="email"></label>
        <label>Subject<input v-model="form.subject" type="text" name="subject" placeholder="What's this about?"></label>
        <label>Message<textarea v-model="form.message" name="message" rows="6" required></textarea></label>
        <button class="button button-dark" type="submit" :disabled="isSending">Send message <span>↗</span></button>
        <p class="form-status" :class="{ 'form-status-error': statusIsError }" role="status">{{ status }}</p>
      </form>
      <aside class="contact-details">
        <h3>Or reach me directly</h3>
        <ul>
          <li><small>EMAIL</small><a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></li>
          <li><small>GITHUB</small><a href="https://github.com/Nhlakanipho2108">https://github.com/Nhlakanipho2108</a></li>
          <li><small>LINKEDIN</small><a href="https://linkedin.com/in/nhlakanipho-luthuli-87b30a366">linkedin.com/in/nhlakanipho-luthuli-87b30a366</a></li>
          <li><small>BASED IN</small><span>South Africa · open to remote</span></li>
        </ul>
        <p class="contact-note">Usually reply within a day or two ☕</p>
      </aside>
    </div>
    <div class="page-number">06 / SAY HELLO</div>
  </section>
</template>
