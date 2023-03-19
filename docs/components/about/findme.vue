<script setup>
const icons = reactive([
  {
    name: '#github',
    bg: '#191717',
    brightness: true,
    url: 'https://github.com/lidexun'
  },
  {
    name: '#uni',
    bg: '#2b9939',
    brightness: true,
    url: 'https://ext.dcloud.net.cn/plugin?id=9026'

  },
  {
    name: '#jquery',
    bg: '#0868ac',
    brightness: true,
    url: 'https://www.jq22.com/mem260259'
  },
  {
    name: '#apicloud',
    bg: '#9BC200',
    url: 'https://www.apicloud.com/mod-H5/avm?id=lidexun'
  },
])
</script>
<template>
  <div class="flex justify-around h-full items-center justify-center">
    <div class="font-semibold text-left whitespace-nowrap text-5xl">
      Find me on 👉
    </div>
    <div class="flex">
      <template v-for="(item, index) in icons">
        <a :href="item.url" target="_blank" class="iconpark_icon_box w-18 h-18 rounded-full flex items-center justify-center ml-9" :style="{
          backgroundColor: item.bg,
          boxShadow: '0 0 20px -3px ' + item.bg
        }">
          <svg class="iconpark_icon w-8 h-8" :class="{
            brightness: item.brightness
          }">
            <use :href="item.name"></use>
          </svg>
        </a>
      </template>
    </div>
  </div>
</template>
<style scoped>
.iconpark_icon_box:nth-child(odd) {
  /* top: -2rem; */
  transform: translateY(1rem);
}
.iconpark_icon_box:nth-child(even) {
  /* top: -2rem; */
  transform: translateY(-1rem);
}

</style>