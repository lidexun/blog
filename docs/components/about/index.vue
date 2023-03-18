<script setup>
import card from './card.vue'
import technical from './technical.vue'
import tags from './tags.vue'
import timeline from './timeline.vue'
import mbp from './mbp.vue'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
AOS.init({
  // once: true
  // easing: 'ease-in-out-back'
});
const my_project = reactive([
  { url: '/app/ruyue.png' },
  { url: '/app/aiqingren.png' },
  { url: '/app/duduteyun_w.png' },
  { url: '/app/youzi.png' },
  { url: '/app/maka.png' },
])
</script>
<template>
  <div class="about_me" data-aos="fade-up" data-aos-duration="300">
    <a-avatar class="avatar" :size="160" image-url="/avatar.jpg"></a-avatar>
  </div>
  <div class="about_page">
    <a-grid :cols="{
      // lg: 2,
      md: 2,
      sm: 1,
      xs: 1
    }" :colGap="16" :rowGap="16">
      <a-grid-item>
        <card :delay="150" class="hola_amigo" title="Hola Amigo" background="linear-gradient(45deg, #2196f3, #00bcd4)">
          <div class="hola_amigo_title">
            我叫 李德勋
          </div>
        </card>
      </a-grid-item>
      <a-grid-item>
        <card :delay="300" title="是一名">
          <tags></tags>
        </card>
      </a-grid-item>
      <a-grid-item :span="2">
        <card :delay="450" :style="{
          height: '12rem'
        }" :background="'linear-gradient(to right, #434343, #000000)'">
          <mbp></mbp>
        </card>
      </a-grid-item>
      <a-grid-item>
        <card :delay="750" title="技能">
          <technical></technical>
        </card>
      </a-grid-item>
      <a-grid-item>
        <card :delay="600" title="生涯时间轴">
          <timeline></timeline>
        </card>
      </a-grid-item>
      <a-grid-item>
        <card :delay="300" title="用友开发者大赛" :style="{
          height: '50vh'
        }" :background="'url(/yongyou.jpg) center/contain'" shadow>
        </card>
      </a-grid-item>
      <a-grid-item>
        <card :style="{
          height: '50vh'
        }" title="迷踪步" :background="'url(/mzb.jpg) center/contain'" shadow>
        </card>
      </a-grid-item>
      <!-- <a-grid-item :span="2">
        <card :delay="450" >
          <div class="project_name">
            <span>SOME PROJECT</span>
          </div>
        </card>
      </a-grid-item> -->
    </a-grid>
  </div>
  <div class="project">
    <div class="project_app">
    <div class="project_app_title" data-aos="fade-up" data-aos-duration="300">APP PROJECT</div>
    <div class="project_app_text" data-aos="fade-up" data-aos-duration="300" :data-aos-delay="150">
      基于Hybrid APP技术独立研发的应用
    </div>
    <a-button type="outline" shape="round" size="large" data-aos="fade-up" data-aos-duration="300"
      :data-aos-delay="300">已上架到各大安卓应用市场/苹果App Store</a-button>
    <div class="project_app_img">
      <template v-for="(item, index) in my_project">
        <img class="project_app_img_item" data-aos="project_app_img_item_on" :data-aos-delay="index * 150"
          :src="item.url" :data-aos-offset="300" :style="{
            'transform': 'translate3d(0px, 0px, ' + ((index + 2) * 350) + 'px)'
          }">
        </template>
      </div>
    </div>
    <!-- <div class="project_other">
      <div class="project_other_bg" data-aos-duration="1200" data-aos="project_other_bg_on" :data-aos-offset="300"></div>

    </div> -->
  </div>
</template>
<style scoped>
.about_page {
  max-width: 65rem;
  margin: 1rem auto;
  padding: 0 1rem;
}

.about_me {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(15vh);
  transition: 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
  opacity: 0;
}

.about_me .avatar {
  margin: 1rem 0;
}

.about_me .about_me_text {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding-bottom: 1.5rem;
}

.hola_amigo {
  display: flex;
  justify-content: center;
  animation: gradient 120s ease infinite;
}

.hola_amigo .hola_amigo_title {
  font-size: 2.5rem;
  font-weight: bold;
}

.project {
  display: flex;
  flex-direction: column;
  /* padding: 6rem 0; */
  /* background-color: #ffffff; */
  /* min-height: 750vh; */
  overflow-x: hidden;
  position: relative;
}

.project_app {
  text-align: center;
  margin: 10rem 0 ;
}

.project_app_title {
  font-size: 3.5rem;
  color: rgba(0, 0, 0, 0);
  -webkit-text-stroke-width: thin;
  -webkit-text-stroke-color: rgba(139, 92, 246, 1);
  margin-bottom: 1rem;
}

.project_app_text {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  color: #333;
  /* -webkit-text-stroke-width: thin; */
  /* -webkit-text-stroke-color: rgba(0,0,0,1); */
}

.project_app_img {
  margin-top: 7rem;
  height: 37rem;
  display: flex;
  justify-content: center;
  perspective: 100vw;
  perspective-origin: 50% -30%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.project_app_img_item {
  transition: 0.2s;
  margin: 0 0.8rem;
  width: 18rem;
  height: fit-content;
}

.project_app_img_item.project_app_img_item_on {
  transform: none !important;
}

[data-aos="project_app_img_item_on"].aos-animate {
  transform: none !important;
}
[data-aos="project_other_bg_on"].aos-animate {
  transform: none !important;
}



/* .project_app_img_item:hover{
  transform: translateY(-1rem) rotate(3deg) !important;
} */
.project_app_img_item:nth-child(even) {
  top: -2rem;
}
.project_other{
  /* background-color: #333; */
  min-height: 100vh;
  position: relative;
}
.project_other img{
  width: 18rem;
}
.project_other_title {
  text-align: center;
  font-weight: bold;
  font-size: 3.5rem;
  /* color: rgba(0, 0, 0, 1); */
  /* -webkit-text-stroke-width: thin; */
  /* -webkit-text-stroke-color: rgba(139, 92, 246, 1); */
  margin-bottom: 1rem;
  /* background: #5433FF; */
  /* fallback for old browsers */
  /* background: -webkit-linear-gradient(to right, #A5FECB, #20BDFF, #5433FF); */
  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to right, #A5FECB, #20BDFF, #5433FF); */
  /* -webkit-background-clip: text; */
    /* -webkit-text-fill-color: transparent; */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.project_other_bg{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  margin: 0 auto;
  background: url(/blog/other_bg.jpg) center/cover;
  transition: all 1.2s ease-in-out;
  width: 100vw;
  transform: scaleX(0.6);
}
.project_other_bg::after{
  background-color: rgba(0, 0, 0, 0.1);
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  /* backdrop-filter: blur(5px); */
}
.project_name{
  height: 100%;
  font-weight: bold;
  padding: 0 2rem;
  font-size: 5rem;
  line-height: 1;
  /* color: #fff; */
  display: flex;
  align-items: center;
  justify-content: center;
}
@keyframes gradient {
  0% {
    -webkit-filter: hue-rotate(0deg);
  }

  100% {
    -webkit-filter: hue-rotate(-360deg);
  }
}</style>
