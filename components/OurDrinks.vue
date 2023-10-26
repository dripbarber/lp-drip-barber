<template>
  <section
    id="our_drinks_section"
    class="w-full pb-5 md:pb-10 pt-4 md:pt-6 lg:pt-10 md:px-4 h-full relative overflow-hidden md:flex md:items-center md:justify-center"
  >
    <div>
      <h1
        class="text-4xl md:text-5xl text-white text-center font-semibold pb-10 md:pb-10 pt-2 lg:pt-16"
      >
        {{ $t("OurDrinksTitle1") }}
        <span class="text-amber-600"> {{ $t("OurDrinksTitle2") }} </span>
      </h1>
      <div
        id="our-drinks-container"
        class="flex items-center justify-center overflow-hidden md:px-6"
      >
        <div class="text-center font-poppins z-10 w-full">
          <div class="w-full md:flex hidden max-w-6xl mx-auto">
            <div class="w-1/2 mr-4">
              <NuxtImg
                format="webp"
                src="assets/our-drinks-item-1.png"
                class="w-full aspect-video"
                :alt="$t('orangeDrink')"
                loading="lazy"
                widht="540"
                height="574"
              />
              <div class="flex pt-6">
                <NuxtImg
                  format="webp"
                  src="assets/our-drinks-item-2.png"
                  class="w-1/2 aspect-w-1 aspect-h-1 mr-auto"
                  :alt="$t('orangeDrinkLeaf')"
                  loading="lazy"
                  widht="255"
                  height="274"
                />
                <NuxtImg
                  format="webp"
                  src="assets/our-drinks-item-3.png"
                  class="w-1/2 aspect-w-1 aspect-h-1 ml-4"
                  :alt="$t('whiteDrink')"
                  loading="lazy"
                  widht="255"
                  height="274"
                />
              </div>
            </div>

            <div class="w-1/2 ml-4">
              <div class="flex pb-6">
                <NuxtImg
                  format="webp"
                  src="assets/our-drinks-item-4.png"
                  class="w-1/2 aspect-w-1 aspect-h-1 mr-auto"
                  :alt="$t('redDrink')"
                  loading="lazy"
                  widht="255"
                  height="274"
                />
                <NuxtImg
                  format="webp"
                  src="assets/our-drinks-item-5.png"
                  class="w-1/2 aspect-w-1 aspect-h-1 ml-4"
                  :alt="$t('colorfulDrink')"
                  loading="lazy"
                  widht="255"
                  height="274"
                />
              </div>
              <NuxtImg
                format="webp"
                src="assets/our-drinks-item-6.png"
                class="w-full aspect-video"
                :alt="$t('redDrink')"
                loading="lazy"
                widht="540"
                height="574"
              />
            </div>
          </div>

          <div class="md:hidden px-6 sm:px-20">
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
                <div class="mx-auto">
                  <NuxtImg
                    format="webp"
                    src="assets/our-drinks-item-1.png"
                    class="w-full aspect-video object-cover object-center"
                    :alt="$t('orangeDrink')"
                    loading="lazy"
                    widht="540"
                    height="574"
                  />
                  <div class="flex pt-6">
                    <NuxtImg
                      format="webp"
                      src="assets/our-drinks-item-2.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 mr-auto object-cover object-center"
                      :alt="$t('orangeDrinkLeaf')"
                      loading="lazy"
                      widht="255"
                      height="274"
                    />
                    <NuxtImg
                      format="webp"
                      src="assets/our-drinks-item-3.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 ml-4 object-cover object-center"
                      :alt="$t('whiteDrink')"
                      loading="lazy"
                      widht="255"
                      height="274"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="w-full mx-auto">
                  <div class="flex pb-6">
                    <NuxtImg
                      format="webp"
                      src="assets/our-drinks-item-4.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 mr-auto object-cover object-center"
                      :alt="$t('redDrink')"
                      loading="lazy"
                      widht="255"
                      height="274"
                    />
                    <NuxtImg
                      format="webp"
                      src="assets/our-drinks-item-5.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 ml-4 object-cover object-center"
                      :alt="$t('colorfulDrink')"
                      loading="lazy"
                      widht="255"
                      height="274"
                    />
                  </div>
                  <NuxtImg
                    format="webp"
                    src="assets/our-drinks-item-6.png"
                    class="w-full aspect-video object-cover object-center"
                    :alt="$t('redDrink')"
                    loading="lazy"
                    widht="540"
                    height="574"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>