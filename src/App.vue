<script setup>
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import ArcadeCorner from './components/ArcadeCorner.vue';
import PageFooter from './components/PageFooter.vue';
import { usePageTurn } from './usePageTurn.js';

const route = useRoute();
const { start, stop } = usePageTurn();

watch(
  () => route.fullPath,
  async () => {
    document.title = route.meta.title ?? 'Nhlakanipho Luthuli — Software Developer';
    await nextTick();
    const arrival = sessionStorage.getItem('arrive');
    if (arrival) sessionStorage.removeItem('arrive');
    document.body.classList.remove('page-leaving');
    window.scrollTo(0, arrival === 'bottom' ? document.documentElement.scrollHeight : 0);
  },
  { immediate: true }
);

onMounted(start);
onBeforeUnmount(stop);
</script>

<template>
  <Sidebar />
  <main class="main-content">
    <RouterView />
    <ArcadeCorner />
    <PageFooter />
  </main>
</template>
