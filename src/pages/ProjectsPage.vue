<script setup>
import { ref } from 'vue';
import { asset } from '../assets.js';

const projects = [
  {
    number: '1', color: 'green-card', image: 'safeher-project.png',
    alt: 'SafeHer personal safety platform preview', title: 'SafeHer',
    summary: 'A personal safety platform bringing protection, emergency assistance, and trusted support together in one place.',
    tags: ['Personal Safety', 'Emergency Support', 'Web App'],
    challenge: 'Make safety resources and trusted support easy to access when they are needed.',
    project: 'A safety hub with personal support and emergency assistance features.',
    link: 'https://safeher-e-commerce.onrender.com/'
  },
  {
    number: '2', color: 'cyan-card', image: 'moderntech-hr-project.png',
    alt: 'ModernTech HR portal and employee self-service preview', title: 'ModernTech HR System',
    summary: 'An HR portal with employee self-service for profile, salary, start date, leave, and payroll information.',
    tags: ['HR Portal', 'Employee Self-Service', 'Dashboard'],
    challenge: 'Give employees and HR a clear place to access essential workplace information.',
    project: 'A demo HR login and employee dashboard experience.',
    link: 'https://khanyamfunda.github.io/Hr-Project-final-repo/'
  },
  {
    number: '3', color: 'pink-card', image: 'scraping-analytics-global-map.png',
    alt: 'Scraping analytics platform global map preview', title: 'Scraping Analytics',
    summary: 'A scraping analytics platform with a global map of EWN News, News24, and SABC News sources.',
    tags: ['Web Scraping', 'Analytics', 'Interactive Map'],
    challenge: 'Show where monitored news sources operate and make their status easy to explore.',
    project: 'An analytics dashboard with a global map and source status indicators.',
    link: 'https://team-alpha-1.onrender.com/'
  }
];
const expanded = ref([]);

function toggleProject(index) {
  expanded.value[index] = !expanded.value[index];
}

</script>

<template>
  <section class="section projects-section" id="projects">
    <div class="section-heading"><div><p class="eyebrow">SELECTED WORK · 2024—2026</p><h2>Things I've built<span class="orange-dot">.</span></h2></div><p class="heading-note">A few ideas turned into<br>real, working things ↙</p></div>
    <div class="project-grid">
      <article
        v-for="(item, index) in projects"
        :key="item.title"
        class="project-card paper-card"
        :class="[item.color, { 'is-open': expanded[index] }]"
        tabindex="0"
        role="button"
        :aria-expanded="String(Boolean(expanded[index]))"
        @click="toggleProject(index)"
        @keydown.enter.prevent="toggleProject(index)"
        @keydown.space.prevent="toggleProject(index)"
      >
        <span class="scribble-number">{{ item.number }}</span><span class="paperclip">⌇</span>
        <div class="project-preview"><img :src="asset(item.image)" :alt="item.alt"></div>
        <h3>{{ item.title }}</h3><p class="project-summary">{{ item.summary }}</p>
        <div class="tags"><span v-for="tag in item.tags" :key="tag">{{ tag }}</span></div>
        <div class="card-reveal"><strong>THE CHALLENGE</strong><p>{{ item.challenge }}</p><strong>THE PROJECT</strong><p>{{ item.project }}</p><a :href="item.link" class="project-link" @click.stop>View project ↗</a></div>
        <span class="click-hint">Hover or click to unfold ↗</span>
      </article>
    </div>
    <p class="margin-note">made with curiosity <span>♡</span></p>
    <div class="page-number">02 / THE WORK</div>
  </section>
</template>
