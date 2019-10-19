<template>
<div class="loading">
  <div class="circle"></div>
  <div class="circle two"></div>
  <div class="circle three"></div>
</div>
</template>

<style lang="scss" scoped>
.loading {
  width: 32px;
  height: 32px;
  margin: 32px auto;
  display:block;
  position: relative;
}

.circle {
  width:100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  background-color: #72c9e0;
  animation-timing-function: linear !important;
  animation-fill-mode: forwards !important;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.circle.two {
  opacity: 0.7;
  animation-name: load1;

}

.circle.three {
  opacity: 0.3;
  animation-name: load2;
}

@keyframes load1 {
  0% {
    transform: translate3d(0, -8px, 0)}
  25% {
    transform: translate3d(8px, 0, 0)}
  50% {
    transform: translate3d(0, 8px, 0)}
  75% {
    transform: translate3d(-8px, 0, 0)}
  100% {
    transform: translate3d(0, -8px, 0)}
}

@keyframes load2 {
  0% {
    transform: translate3d(0, -16px, 0)}
  25% {
    transform: translate3d(16px, 0, 0)}
  50% {
    transform: translate3d(0, 16px, 0)}
  75% {
    transform: translate3d(-16px, 0, 0)}
  100% {
    transform: translate3d(0, -16px, 0)}
}

</style>
