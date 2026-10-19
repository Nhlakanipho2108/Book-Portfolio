<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <footer class="footer">
    <span>© {{ new Date().getFullYear() }} <span data-edit="name">Nhlakanipho Luthuli</span></span>
    <span>Built with ☕ and lots of curiosity.</span>
    <a :href="route.meta.anchor ?? '#home'">Back to top ↑</a>
  </footer>
</template>
