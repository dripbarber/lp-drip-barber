<template>
  <section
    id="our_place_section"
    class="w-full pb-5 md:pb-10 pt-4 md:pt-6 md:px-4 h-full lg:min-h-screen relative overflow-hidden md:flex md:items-center md:justify-center"
  >
    <div>
      <h1
        class="text-4xl md:text-5xl text-white text-center font-semibold pt-2 pb-6 md:pb-10 lg:pt-16"
      >
        {{ $t("OurPlaceTitle1") }}
        <span class="text-amber-600"> {{ $t("OurPlaceTitle2") }} </span>
      </h1>
      <div
        id="our-place-container"
        class="flex items-center justify-center sm:max-h-[67vh] overflow-hidden md:p-6"
      >
        <div class="text-center font-poppins z-10 w-full">
          <div class="md:hidden px-6">
            <Swiper
              :modules="[SwiperAutoplay, SwiperNavigation]"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{
                delay: 4000,
                disableOnInteraction: true,
              }"
            >
              <SwiperSlide>
                <NuxtImg
                  format="webp"
                  src="assets/our-place-item-1.png"
                  class="mx-auto"
                  :alt="$t('restaurantBar')"
                  loading="lazy"
                  width="374"
                  height="538"
                />
              </SwiperSlide>
              <SwiperSlide>
                <NuxtImg
                  format="webp"
                  src="assets/our-place-item-2.png"
                  class="mx-auto"
                  :alt="$t('restaurantTables')"
                  loading="lazy"
                  width="374"
                  height="538"
                />
              </SwiperSlide>
              <SwiperSlide>
                <NuxtImg
                  format="webp"
                  src="assets/our-place-item-3.png"
                  class="mx-auto"
                  :alt="$t('restaurantBar2')"
                  loading="lazy"
                  width="374"
                  height="538"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div
            class="w-full md:flex md:justify-evenly max-w-6xl mx-auto hidden md:px-8"
          >
            <NuxtImg
              format="webp"
              src="assets/our-place-item-1.png"
              class="w-1/3 aspect-w-1 aspect-h-2"
              :alt="$t('restaurantBar')"
              loading="lazy"
              width="374"
              height="538"
            />
            <NuxtImg
              format="webp"
              src="assets/our-place-item-2.png"
              class="w-1/3 aspect-w-1 aspect-h-2 mx-8"
              :alt="$t('restaurantTables')"
              loading="lazy"
              width="374"
              height="538"
            />
            <NuxtImg
              format="webp"
              src="assets/our-place-item-3.png"
              class="w-1/3 aspect-w-1 aspect-h-2"
              :alt="$t('restaurantBar2')"
              width="374"
              height="538"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template> 

<style scoped>
.background-bottom {
  bottom: 0;
  left: 0;
}

.background-top {
  top: 0;
  right: 0;
}
</style>