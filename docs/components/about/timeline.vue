<script setup>
// const list = reactive([
//   {
//     label: '2017年',
//     title: '初出茅庐',
//     text: 'Hybrid APP',
//     icon: {
//       name: '#js',
//       bg: '#f7cb4f',
//       brightness: true
//     }
//   },
//   {
//     label: '2020年',
//     title: '已有小成',
//     text: 'Vue/APP',
//     icon: {
//       name: '#vue',
//     }

//   },
//   {
//     label: '2021~现在',
//     title: '全栈',
//     text: 'Node(SSR)',
//     icon: {
//       name: '#nuxt',
//     }
//   },
// ])
const timelinelist = reactive([
  {
    label: 'H5混合APP工程师',
    title: 'Fore End(Hybrid APP)',
    color: 'f7cb4f',
  },
  {
    label: 'APP前端负责人(自由职业)',
    title: 'Fore End(APP Principal)',
    color: '41b883',
  },
  {
    label: '前端工程师(Node/全栈)',
    title: 'Fore End(Node SSR)',
    color: '00dc82',
  }
])
</script>
<template>
  <div class="timeline_circle"></div>
  <div class="flex flex-col h-full pt-5 pb-5 justify-between">
    <div>
      <div class="text-sm text-true-gray-400 flex align-center mb-2" v-for="item in timelinelist">
        <div class="aspect-square h-4 rounded-full mr-2" :class="['bg-hex-' + item.color]"></div>
        {{ item.title }}</div>
    </div>
    <div class="-mr-6 -ml-6">
      <div class="w-full relative h-1.5 bg-gray flex z-1 px-8">
        <div class="timeline_progress h5  rounded-full bg-hex-f7cb4f w-4/6"></div>
        <div class="timeline_progress on absolute h5 rounded-full bg-hex-41b883 w-4/8 left-4/12 px-8"></div>
        <div class="timeline_progress h5  rounded-full bg-hex-00dc82 w-4/12"></div>
      </div>
      <div class="px-8 flex justify-between c-gray">
        <div class="timeline_after mt-1 h-10 w-1 bg-true-gray-300 relative" data-year="2017"></div>
        <div class="timeline_after mt-1 h-10 w-1 bg-true-gray-300 relative" data-year="2020"></div>
        <div class="timeline_after mt-1 h-10 w-1 bg-true-gray-300 relative" data-year="2021"></div>
        <div class="timeline_after mt-1 h-10 w-1 bg-true-gray-300 relative" data-year="2022"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.timeline_after::after {
  content: attr(data-year);
  position: absolute;
  bottom: -50%;
  /* left: -50%; */
  transform: translateX(-40%);
}
.timeline_progress{
  transform: translateY(-30%);
}
.timeline_progress.on{
  transform: translateY(-150%);
}

.timeline_circle {
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