<template>
  <section
    id="gallery_section"
    class="w-full pb-8 md:pb-12 lg:pb-16 pt-10 md:pt-16 lg:pt-24 md:px-4 h-full relative overflow-hidden md:flex md:items-center md:justify-center"
  >
    <div class="container hidden md:flex mx-auto px-5 lg:px-44">
      <div class="-m-1 flex flex-wrap md:-m-2">
        <div
          v-for="(gallery, index) in imgGallery"
          :key="index"
          class="flex w-1/2 flex-wrap"
        >
          <div
            v-for="img in gallery"
            :key="img.src"
            :class="img.class"
            class="p-1 md:p-2"
          >
            <NuxtImg
              format="webp"
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center"
              :src="img.src"
              loading="lazy"
            />
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
        <SwiperSlide v-for="(gallery, index) in imgMobileGallery" :key="index">
          <div class="w-full items-center px-4">
            <NuxtImg
              format="webp"
              :src="gallery.src"
              class="object-cover object-center rounded-lg"
              alt="gallery"
              loading="lazy"
              :class="gallery.class"
              :width="gallery.width"
              :height="gallery.height"
            />
            <div class="flex pt-3 overflow-hidden">
              <NuxtImg
                v-for="item in gallery.children"
                :key="item.src"
                format="webp"
                :src="item.src"
                class="object-cover object-center rounded-lg"
                alt="imagem da galeria de fotos"
                loading="lazy"
                :class="item.class"
                :width="item.width"
                :height="item.height"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>


<script setup lang="ts">
const imgGallery = [
  [
    {
      src: "assets/gallery-item-2.jpg",
      class: "w-1/2",
    },
    {
      src: "assets/gallery-item-3.jpg",
      class: "w-1/2",
    },
    {
      src: "assets/gallery-item-1.jpg",
      class: "w-full",
    },
  ],
  [
    {
      src: "assets/gallery-item-6.jpg",
      class: "w-full",
    },
    {
      src: "assets/gallery-item-5.jpg",
      class: "w-1/2",
    },
    {
      src: "assets/gallery-item-4.jpg",
      class: "w-1/2",
    },
  ],
];

const imgMobileGallery = [
  {
      src: "assets/gallery-item-1.jpg",
      class: "w-full",
      width: "540",
      height: "474",
      children: [
        {
          src: "assets/gallery-item-2-2.jpg",
          class: "w-1/2 pr-1",
          width: "255",
          height: "374",
        },
        {
          src: "assets/gallery-item-3-2.jpg",
          class: "w-1/2 pl-1",
          width: "255",
          height: "374",
        },
      ],
    },
   {
      src: "assets/gallery-item-6.jpg",
      class: "w-full",
      width: "540",
      height: "474",
      children: [
        {
          src: "assets/gallery-item-4-2.jpg",
          class: "w-1/2 pr-1",
          width: "255",
          height: "374",
        },
        {
          src: "assets/gallery-item-5-2.jpg",
          class: "w-1/2 pl-1",
          width: "255",
          height: "374",
        },
      ],
    },
];
</script>