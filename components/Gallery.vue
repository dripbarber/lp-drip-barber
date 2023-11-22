<template>
  <section
    id="gallery_section"
    class="w-full pb-8 md:pb-12 lg:pb-16 pt-10 md:pt-16 lg:pt-24 md:px-4 h-full relative overflow-hidden md:flex md:items-center md:justify-center"
    >
    <div class="container hidden md:flex mx-auto px-5 lg:px-44">
      <div class="-m-1 flex flex-wrap md:-m-2">
        <div class="flex w-1/2 flex-wrap">
          <div class="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-2.png" />
          </div>
          <div class="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-3.png" />
          </div>
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-1.png" />
          </div>
        </div>
        <div class="flex w-1/2 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-6.png" />
          </div>
          <div class="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-5.png" />
          </div>
          <div class="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              src="assets/gallery-item-4.png" />
          </div>
        </div>
      </div>
    </div>   
   
    <!--Mobile slides-->
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
    
  
  
  </section>
</template>

<script setup lang="ts">

</script>