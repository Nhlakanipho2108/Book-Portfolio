<script setup>
import { ref } from 'vue';
import { asset } from '../assets.js';

const certificates = [
  {
    seal: '✦', className: '', title: 'HTML and CSS for Beginners From Basic to Advance',
    provider: 'Udemy', date: 'April 11, 2025', image: 'udemy.jpg',
    alt: 'Udemy certificate for HTML and CSS for Beginners From Basic to Advance'
  },
  {
    seal: '✧', className: 'blue-seal', title: 'GenAI Course for Software Engineers',
    provider: 'WeThinkCode', date: 'April 3, 2026', image: 'wethinkcode.jpg',
    alt: 'WeThinkCode certificate for the GenAI Course for Software Engineers'
  },
  {
    seal: '✺', className: 'pink-seal', title: 'Generative AI: Prompt Engineering Basics',
    provider: 'IBM · Coursera', date: 'February 6, 2026', image: 'cousera 2.PNG',
    alt: 'IBM and Coursera certificate for Generative AI: Prompt Engineering Basics'
  }
];
const flipped = ref([]);
</script>

<template>
  <section class="section certificates-section" id="certificates">
    <div class="section-heading"><div><p class="eyebrow">PROOF OF PROGRESS</p><h2>Certificates &amp; milestones<span class="orange-dot">.</span></h2></div><p class="heading-note">Little reminders of<br>how far I've come ✦</p></div>
    <p class="cert-intro">Every certificate marks a new skill, a challenge completed, or a little more confidence earned. Tap a card to turn it over.</p>
    <div class="certificate-grid">
      <button v-for="(certificate, index) in certificates" :key="certificate.title" class="certificate-card" :class="{ flipped: flipped[index] }" :aria-pressed="String(Boolean(flipped[index]))" @click="flipped[index] = !flipped[index]">
        <span class="cert-tape"></span>
        <span class="cert-front"><span class="cert-seal" :class="certificate.className">{{ certificate.seal }}</span><small>COURSE COMPLETION</small><b>{{ certificate.title }}</b><span class="cert-provider">{{ certificate.provider }}</span><span class="cert-date">{{ certificate.date }}</span><span class="cert-turn">↻ flip card</span></span>
        <span class="cert-back"><img :src="asset(certificate.image)" :alt="certificate.alt" style="width:100%;max-height:210px;object-fit:contain"><span class="cert-turn">↻ flip back</span></span>
      </button>
    </div>
    <div class="page-number">05 / STILL GROWING</div>
  </section>
</template>
