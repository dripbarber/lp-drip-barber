<template>
  <section
    id="testimonial_section"
    class="w-full md:min-h-[550px] pb-5 md:pb-10 pt-4 md:pt-6 relative overflow-hidden z-[5]"
  >
    <NuxtImg
      format="webp"
      src="/assets/testimonial-background.jpg"
      alt="DRIP BR logo"
      sizes="sm:300px md:1440px lg:2048px"
      class="absolute h-full w-full object-cover object-top z-0 grayscale"
    />
    <div
      id="testimonial-container"
      class="flex items-center justify-center h-full p-6 max-w-7xl mx-auto z-5 relative"
    >
      <div class="columns-3 md:flex hidden mt-20">
        <div
          class="w-1/3 p-4 card text-center flex flex-col items-center mr-4 h-auto"
          v-for="(card, index) in testimonialCards"
          :key="index"
        >
          <video class="aspect-w-1" controls>
            <source :src="card.src" type="video/mp4" />
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div class="md:hidden w-11/12 mx-auto mt-8">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: true,
          }"
        >
          <SwiperSlide v-for="(card, index) in testimonialCards" :key="index">
            <div
              class="card p-5 mt-4 md:mt-20 text-center mr-4 w-full flex flex-col items-center"
            >
              <video class="aspect-w-1" controls>
                <source :src="card.src" type="video/mp4" />
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
interface testimonialCards {
  src: string;
}

const testimonialCards: testimonialCards[] = [
  {
    src: "/assets/video-01.mp4",
  },
  {
    src: "/assets/video-02.mp4",
  },
  {
    src: "/assets/video-03.mp4",
  },
];
</script>

<style scoped>
.card {
  background: rgba(217, 217, 217, 0.95);
  border-radius: 20px;
}

.perfil {
  margin-top: -94px;
}
</style>