<script setup>
</script>
<template>
  <div class="mbp">
    <div class="mbp_title">
      MAC
    </div>
    <img src="/mbp.png">
    <div style="z-index: 1;">M1 PRO</div>
  </div>
</template>
<style scoped>
.mbp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-weight: bold;
  padding: 0 2rem;
  font-size: 6rem;
  line-height: 1;
  display: flex;
  /* justify-content: space-around;
  flex-direction: column; */
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
}

.mbp .mbp_title {
  font-size: 9rem;
  display: flex;
}

.mbp img {
  position: absolute;
  top: 2rem;
  left: 0;
  right: -1rem;
  bottom: 0;
  margin: auto;
  width: 13rem;
  transform: rotate(30deg);
}
</style>