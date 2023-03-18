<script setup>
const list = reactive([
  {
    label: '2017年',
    title: '初出茅庐',
    text: 'Hybrid APP',
    icon: {
      name: '#js',
      bg: '#f7cb4f',
      brightness: true
    }
  },
  {
    label: '2020年',
    title: '已有小成',
    text: 'Vue/APP',
    icon: {
      name: '#vue',
    }

  },
  {
    label: '2021~现在',
    title: '全栈',
    text: 'Node(SSR)',
    icon: {
      name: '#nuxt',
    }
  },
])
</script>
<template>
  <div class="timeline_circle"></div>
  <a-timeline class="timeline" direction="horizontal" mode="left" labelPosition="relative">
    <a-timeline-item v-for="(item, index) in list" :label="item.label">
      <a-row>
        <div class="timeline_icon_box" :style="{
          backgroundColor: item.icon.bg
        }">
          <svg class="iconpark_icon" :class="{
            brightness: item.icon.brightness
          }">
            <use :href="item.icon.name"></use>
          </svg>
        </div>
        <div :style="{ marginBottom: '0.5rem' }">
          {{ item.title }}
          <div :style="{ fontSize: '0.5rem', color: '#4E5969' }">
            {{ item.text }}
          </div>
        </div>
      </a-row>
    </a-timeline-item>
  </a-timeline>
</template>
<style scoped>
.timeline {
  padding-left: 0.5rem;
  align-items: center;
  height: 100%;
}

.timeline .timeline_icon_box {
  box-shadow: 0 1px 0.5rem -3px rgb(0 0 0 / 15%);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  margin: 0 0.3rem;
}

.timeline_icon_box .iconpark_icon {
  width: 1.5rem;
  height: 1.5rem;
}
.timeline_circle{
  position: absolute;
  top: -2rem;
  right: -2rem;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background: linear-gradient(-30deg, #2196f3 1%, #9c27b0 100%);
  backdrop-filter: blur(8rem);
}
</style>