<template>
  <section
    id="gallery_section"
    class="w-full pb-8 md:pb-12 lg:pb-16 pt-10 md:pt-16 lg:pt-24 md:px-4 h-full relative overflow-hidden md:flex md:items-center md:justify-center"
  >
    <div>
      
      <div
        id="our-drinks-container"
        class="flex items-center justify-center overflow-hidden md:px-6"
      >
        <div class="text-center z-10 w-full">
          <div class="w-full md:flex hidden max-w-6xl mx-auto">
            <div class="w-1/2 mr-4">
              <NuxtImg
                format="webp"
                src="assets/gallery-item-1.png"
                class="w-full aspect-square"
                alt="imagem da galeria de fotos"
                fit="inside"
                loading="lazy"
                width="540"
                height="574"
              />
              <div class="flex pt-6 overflow-hidden">
                <NuxtImg
                  format="webp"
                  src="assets/gallery-item-2.png"
                  class="w-1/2 aspect-w-1 mr-auto"
                  alt="imagem da galeria de fotos"                  
                  loading="lazy"
                  width="255"
                  height="274"
                />
                <NuxtImg
                  format="webp"
                  src="assets/gallery-item-3.png"
                  class="w-1/2 aspect-w-1  ml-4"
                  alt="imagem da galeria de fotos"
                  loading="lazy"
                  width="255"
                  height="274"
                />
              </div>
            </div>

            <div class="w-1/2 ml-4">
              <div class="flex pb-6 overflow-hidden">
                <NuxtImg
                  format="webp"
                  src="assets/gallery-item-4.png"
                  class="w-1/2 aspect-w-1 mr-auto"
                  alt="imagem da galeria de fotos"
                  loading="lazy"
                  width="255"
                  height="274"
                />
                <NuxtImg
                  format="webp"
                  src="assets/gallery-item-5.png"
                  class="w-1/2 aspect-w-1 ml-4"
                  alt="imagem da galeria de fotos"
                  loading="lazy"
                  width="255"
                  height="274"
                />
              </div>
              <NuxtImg
                format="webp"
                src="assets/gallery-item-6.png"
                class="w-full aspect-square object-bottom"
                alt="imagem da galeria de fotos"
                loading="lazy"
                width="540"
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
                <div class="mx-auto px-4">
                  <NuxtImg
                    format="webp"
                    src="assets/gallery-item-1.png"
                    class="w-full aspect-video object-cover object-center"
                    alt="imagem da galeria de fotos"
                    loading="lazy"
                    width="540"
                    height="574"
                  />
                  <div class="flex pt-6 overflow-hidden">
                    <NuxtImg
                      format="webp"
                      src="assets/gallery-item-2.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 mr-auto object-cover object-center"
                      alt="imagem da galeria de fotos"
                      loading="lazy"
                      width="255"
                      height="274"
                    />
                    <NuxtImg
                      format="webp"
                      src="assets/gallery-item-3.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 ml-4 object-cover object-center"
                      alt="imagem da galeria de fotos"
                      loading="lazy"
                      width="255"
                      height="274"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="w-full items-center mx-auto px-4">
                  <div class="flex pb-6 overflow-hidden">
                    <NuxtImg
                      format="webp"
                      src="assets/gallery-item-4.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 mr-auto object-cover object-center"
                      alt="imagem da galeria de fotos"
                      loading="lazy"
                      width="255"
                      height="274"
                    />
                    <NuxtImg
                      format="webp"
                      src="assets/gallery-item-5.png"
                      class="w-1/2 aspect-w-1 aspect-h-1 ml-4 object-cover object-center"
                      alt="imagem da galeria de fotos"
                      loading="lazy"
                      width="255"
                      height="274"
                    />
                  </div>
                  <NuxtImg
                    format="webp"
                    src="assets/gallery-item-6.png"
                    class="w-full aspect-video object-cover object-center"
                    alt="imagem da galeria de fotos"
                    loading="lazy"
                    width="540"
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