<script setup>
defineProps({
  subtitle:{
    type: String,
    default: ''
  },
  title:{
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  shadow: {
    type: Boolean,
    default: false
  },
  aosClass: {
    type: String,
    default: 'fade-up'
  },
  duration: {
    type: Number,
    default: 600
  },
  delay: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <div class="card_content" :data-aos="aosClass" :data-aos-duration="duration" :data-aos-delay="delay"  :style="{
    background: background,
    color: background ? '#fff': color,
    boxShadow: shadow ? 'inset 0 0 20rem rgb(0 0 0 / 100%)' : ''
  }">
    <div class="subtitle" v-if="subtitle" v-html="subtitle"></div>
    <div class="title" v-if="title" v-html="title"></div>
    <slot></slot>
  </div>
</template>
<style scoped>
.card_content {
  border-radius: 1rem;
  /* min-height: 13rem; */
  max-height: 24rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: var(--vp-c-white);
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 16px -3px rgb(0 0 0 / 15%);
}

.card_content .subtitle {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  color: inherit;
}

.card_content .title {
  line-height: 1;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: inherit;
}
</style>
