<script setup>
import { reactive } from 'vue'
let icons = [
  {
    name: '#js',
    bg: '#f7cb4f',
    brightness: true
  },
  {
    name: '#h5',
    bg: '#e44d26',
    brightness: true
  },
  {
    name: '#c3',
    bg: '#1572b6',
    brightness: true
  },
  {
    name: '#ts',
    bg: '#007acc',
  },
  {
    name: '#git',
    bg: '#f34f29',
    brightness: true
  },
  {
    name: '#gitlab',
  },
  {
    name: '#vue',
    brightness: false
  },
  {
    name: '#nuxt',
    brightness: false
  },
  {
    name: '#ex',
  },
  {
    name: '#node',
  },
  {
    name: '#vite',
  },
  {
    name: '#webpack',
  },
  {
    name: '#element',
  },
  {
    name: '#apicloud',
    bg: '#9BC200'
  },
  {
    name: '#react',
  },
  {
    name: '#arco',
  },
  {
    name: '#mongodb',
    bg: '#001e2b',
  },
  {
    name: '#docker',
    bg: '#086DD7',
    brightness: true
  },
  {
    name: '#unocss',
  },
  {
    name: '#github',
    bg: '#191717',
    brightness: true
  },
  {
    name: '#jquery',
    bg: '#0868ac',
    brightness: true
  },
  {
    name: '#uni',
    bg: '#2b9939',
    brightness: true
  },
]
function randSort(arr) {
  let newArr = [];
  while (arr.length != 0) {
    let index = Math.floor(Math.random() * arr.length);
    newArr.push(arr[index]);
    arr.splice(index, 1);
  }
  return newArr
}
function fn(arr = [], n = 2) {
  let size = arr.length;
  let lineNum = size % 2 === 0 ? size / 2 : Math.floor((size / 2) + 1);
  let res = [];
  for (let i = 0; i < lineNum; i++) {
    let temp = arr.slice(i * n, i * n + n);
    res.push(temp);
  }
  return res
}
const icon_group = reactive(fn(randSort(icons), 2))
</script>
<template>
  <div class="icon_wrapper">
    <template v-for="it in [0, 2]">
      <div class="icon_group" v-for="(item, index) in icon_group" :key="'icon_group' + index">
        <template v-for="(item1, index) in item">
          <div class="icon_group_item" :style="{
            backgroundColor: item1.bg
          }">
            <svg class="iconpark_icon" :class="{
              brightness: item1.brightness
            }">
              <use :href="item1.name"></use>
            </svg>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
.icon_wrapper {
  display: flex;
  animation: rowup 180s linear infinite;
  margin: 1rem 0;
}

.icon_group_item {
  width: 7rem;
  height: 7rem;
  box-shadow: 0 2px 16px -3px rgba(0, 0, 0, .15);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon_group_item .iconpark_icon {
  width: 4rem;
  height: 4rem;
}

.icon_group_item .iconpark_icon.brightness {
  filter: brightness(100);
}

.icon_group_item:first-child {
  margin-bottom: 1rem;
  transform: translate(-50%);
}

.icon_group {
  margin-left: 1rem;
  user-select: none;
}

@keyframes rowup {
  from {
    transform: translateX(0%);
  }

  to {
    transform: translateX(calc(-8rem * 9));
  }
}
</style>