import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import ProjectsPage from './pages/ProjectsPage.vue';
import SkillsPage from './pages/SkillsPage.vue';
import AboutPage from './pages/AboutPage.vue';
import CertificatesPage from './pages/CertificatesPage.vue';
import ContactPage from './pages/ContactPage.vue';
import '../style.css';

const routes = [
  { path: '/', component: HomePage, meta: { title: 'Nhlakanipho Luthuli — Software Developer', anchor: '#home' } },
  { path: '/index.html', component: HomePage, meta: { title: 'Nhlakanipho Luthuli — Software Developer', anchor: '#home' } },
  { path: '/projects.html', component: ProjectsPage, meta: { title: 'Projects — Nhlakanipho Luthuli', anchor: '#projects' } },
  { path: '/skills.html', component: SkillsPage, meta: { title: 'Skills — Nhlakanipho Luthuli', anchor: '#skills' } },
  { path: '/about.html', component: AboutPage, meta: { title: 'About — Nhlakanipho Luthuli', anchor: '#about' } },
  { path: '/certificates.html', component: CertificatesPage, meta: { title: 'Certificates — Nhlakanipho Luthuli', anchor: '#certificates' } },
  { path: '/contact.html', component: ContactPage, meta: { title: 'Contact — Nhlakanipho Luthuli', anchor: '#contact' } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(new URL(import.meta.env.BASE_URL, window.location.href).pathname),
  routes
});

createApp(App).use(router).mount('#app');
