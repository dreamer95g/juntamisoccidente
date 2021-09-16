<template>
  <div class="flex flex-wrap w-full relative">
    <div class="absolute w-full" v-for="(color, index) in sliders" :key="color">
      <transition name="fade">
        <div v-if="currentSlide === index" :class="color" style="height: 350px">
          <img
            v-if="currentSlide === 0"
            class="h-full w-full object-cover"
            src="../assets/slider/matrimonios.jpg"
            alt="Dario"
          />
          <img
            v-if="currentSlide === 1"
            class="h-full w-full object-cover"
            src="../assets/slider/patrick.jpg"
            alt="Patrick"
          />
          <img
            v-if="currentSlide === 2"
            class="h-full w-full object-cover"
            src="../assets/slider/brasil.jpg"
            alt="Brasileros"
          />
          <img
            v-if="currentSlide === 3"
            class="h-full w-full object-cover"
            src="../assets/slider/dario.jpg"
            alt="Dario"
          />
        </div>
      </transition>
    </div>
    <div class="w-full" style="height: 340px">
      <div class="absolute bottom-0 w-full flex justify-center">
        <div
          v-for="(slider, index) in sliders"
          :key="slider"
          @click="makeActive(index)"
          :class="currentSlide === index ? 'bg-gray-700' : 'bg-gray-300'"
          class="w-4 h-4 mx-2 mb-2 rounded-full cursor-pointer shadow-md"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      currentSlide: 0,
      sliders: ["bg-gray-400", "bg-gray-300", "bg-gray-200", "bg-gray-100"],
      interval: "",
      isTitleShowing: true,
    };
  },
  methods: {
    makeActive(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide = this.currentSlide === 3 ? 0 : this.currentSlide + 1;
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
