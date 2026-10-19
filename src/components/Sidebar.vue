<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { asset } from '../assets.js';

const route = useRoute();
const isOpen = ref(false);
const menuToggle = ref(null);
const navigation = [
  { to: '/', icon: '⌂', title: 'Home', description: 'Start here', number: '01' },
  { to: '/projects.html', icon: '‹ ›', title: "Things I've built", description: 'Projects & case studies', number: '02' },
  { to: '/skills.html', icon: '♧', title: 'What I enjoy building with', description: 'Skills & tools', number: '03' },
  { to: '/about.html', icon: '♙', title: 'A little about me', description: 'My story & values', number: '04' },
  { to: '/certificates.html', icon: '✧', title: 'Certificates', description: 'Learning milestones', number: '05' },
  { to: '/contact.html', icon: '✉', title: 'Say hello', description: 'Get in touch', number: '06' }
];

function closeMenu() {
  isOpen.value = false;
}

function handleKeydown(event) {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu();
    menuToggle.value?.focus();
  }
}

onMounted(() => document.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <aside id="sidebar" class="sidebar" :class="{ open: isOpen }">
    <RouterLink class="brand" to="/" aria-label="Back to home" @click="closeMenu">
      <span class="brand-script">NL<span class="dot">.</span></span>
      <span class="brand-caption">SOFTWARE DEVELOPER</span>
    </RouterLink>
    <div class="side-rule"></div>
    <nav class="nav">
      <RouterLink
        v-for="item in navigation"
        :key="item.number"
        class="nav-link"
        :class="{ active: route.path === item.to || (item.to === '/' && route.path === '/index.html') }"
        :to="item.to"
        @click="closeMenu"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span><b>{{ item.title }}</b><small>{{ item.description }}</small></span>
        <span class="nav-tab" aria-hidden="true">{{ item.number }}</span>
      </RouterLink>
    </nav>
    <div class="availability"><span class="green-dot"></span><span>Available for new<br>opportunities</span></div>
    <div class="sidebar-bottom">
      <p>Let's build something<br>impactful.</p>
      <a href="mailto:Nhlakanipholuthuli2108@gmail.com" class="email-link">Nhlakanipholuthuli2108@gmail.com ↗</a>
      <div class="socials">
        <a href="https://github.com/Nhlakanipho2108" aria-label="GitHub">GH ↗</a>
        <a href="https://linkedin.com/in/nhlakanipho-luthuli-87b30a366" aria-label="LinkedIn">in ↗</a>
        <a :href="asset('Nhlakanipho Luthuli Cv (3).pdf')" aria-label="Resume" download>CV ↓</a>
      </div>
    </div>
    <button id="closeMenu" class="mobile-close" type="button" aria-label="Close menu" @click="closeMenu">×</button>
  </aside>
  <button
    ref="menuToggle"
    id="menuToggle"
    class="menu-toggle"
    type="button"
    aria-label="Open menu"
    :aria-expanded="String(isOpen)"
    @click="isOpen = true"
  >☰ <span>MENU</span></button>
</template>
