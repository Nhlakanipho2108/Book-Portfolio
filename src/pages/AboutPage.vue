<script setup>
import { asset } from '../assets.js';
</script>

<template>
  <section class="section about-section" id="about">
    <div class="about-left"><p class="eyebrow">THE PERSON BEHIND THE PIXELS</p><h2>A little<br>about me<span class="orange-dot">.</span></h2><div class="portrait-placeholder"><img :src="asset('linked2.jpg')" alt="Portrait of Nhlakanipho Luthuli"></div><p class="photo-caption">probably debugging<br>with a cup of coffee ☕</p></div>
    <div class="about-copy"><p class="about-lead">Hey, I'm <span data-edit="name">Nhlakanipho Luthuli</span> — a developer who likes figuring out how things work.</p><p>I'm a Software Development graduate who loves solving problems, building products, and learning new technologies. I enjoy turning ideas into real-world solutions that make a difference.</p><p>I'm particularly interested in mobile app development, understanding how applications work under the hood, networking, and building secure software.</p><div class="values"><span>✳ Problem solver</span><span>♡ Lifelong learner</span><span>↗ Thoughtful builder</span></div><blockquote>“It doesn't have to be perfect.<br>It has to be a start.”</blockquote><RouterLink class="button button-outline" to="/contact.html">Let's talk <span>↗</span></RouterLink></div>
    <div class="page-number">04 / THE HUMAN</div>
  </section>
</template>
