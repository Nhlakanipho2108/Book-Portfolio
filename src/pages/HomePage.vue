<script setup>
import { asset } from '../assets.js';
</script>

<template>
  <section class="hero section" id="home">
    <div class="hero-copy">
      <p class="hello"><span>Hello!!</span></p>
      <h1>I'm <span data-edit="name">Nhlakanipho Luthuli</span><i class="pink-dot">.</i></h1>
      <div class="hand-line"></div>
      <p class="hero-intro">I enjoy building software that solves real-life problems, from thoughtful mobile apps to reliable backend systems.</p>
      <p class="blue-scribble">Code. Solve. Build. Repeat.</p>
      <div class="hero-actions">
        <RouterLink class="button button-dark" to="/projects.html">View my work <span>↘</span></RouterLink>
        <RouterLink class="text-link" to="/contact.html">Say hello →</RouterLink>
        <a class="text-link" :href="asset('Nhlakanipho Luthuli Cv (3).pdf')" download>Download CV ↓</a>
      </div>
    </div>
    <div class="hero-decor">
      <div class="sticky-note"><h3>To do:</h3><p><s>Learn</s></p><p><s>Build</s></p><p>Graduate</p><p>Get a job</p><p>Drink coffee</p><span class="tape"></span></div>
      <figure class="polaroid"><span class="tape"></span><img :src="asset('linked2.jpg')" alt="Portrait of Nhlakanipho Luthuli"><figcaption>that's me :)</figcaption></figure>
      <div class="train-note"><p>Favourite transport:</p><strong>trains</strong><div class="train-doodle" aria-hidden="true"></div></div>
      <span class="tiny-star">✳</span>
    </div>
    <div class="page-number">01 / HELLO WORLD</div>
  </section>
</template>
