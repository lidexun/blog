<script setup>
const tags = reactive([
  {
    text: '前端开发',
    bg: 'linear-gradient(to right, #00b4db, #0083b0)'
  },
  {
    text: '设计',
    bg: 'linear-gradient(to right, #0cebeb, #20e3b2, #29ffc6)'
  },
  {
    text: '职业玩家(自称)',
    bg: 'linear-gradient(to right, #7f00ff, #e100ff)'
  },
  {
    text: '歌手',
    bg: 'linear-gradient(to top, #cb356b, #ffffff)'
  },
  {
    text: '行为艺术家',
    bg: 'linear-gradient(to top, #ef3b36, #ffffff)'
  }
])
</script>
<template>
  <div class="tags">
    <div class="tags_box">
      <div class="tags_y">
        <span class="tags_text" v-for="(item, index) in tags" v-text="item.text" :style="{
          backgroundImage: item.bg
        }"></span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tags {
  font-size: 2rem;
  font-weight: bold;
}
.tags .tags_text {
  margin-right: 0.5rem;
  line-height: 3rem;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>