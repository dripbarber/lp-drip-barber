<template>
  <section
    id="about_section"
    class="w-full md:h-full pb-5 md:pb-10 pt-4 md:pt-6 lg:pt-10 relative overflow-hidden"
  >
    <div
      id="about-container"
      class="md:flex items-center justify-center h-full overflow-hidden lg:pt-16 lg:pb-6 px-6 z-[5]"
    >
      <div
        class="text-white text-center font-poppins md:w-1/2 p-4 md:p-6 xl:p-20"
      >
        <h1 class="md:text-5xl text-4xl mb-6 font-semibold md:mb-10">
          {{ $t("aboutTitle1") }} <span class="text-amber-600">&</span>
          {{ $t("aboutTitle2") }}
        </h1>
        <p class="lg:text-lg text-base mb-2">
          {{ $t("aboutParagraph1") }}
        </p>
        <p class="lg:text-lg text-base">
          {{ $t("aboutParagraph2") }}
        </p>
      </div>
      <div
        class="md:w-1/2 xl:columns-3 columns-2 w-5/6 mx-auto gap-2 my-4 z-[5]"
      >
        <NuxtImg
          format="webp"
          src="assets/about-item-1.png"
          :alt="$t('redDrink')"
          class="mx-auto w-60 h-auto"
          
          loading="lazy"
        />
        <NuxtImg
          format="webp"
          src="assets/about-item-2.png"
          :alt="$t('shrimpDish')"
          class="mt-4 mx-auto"
          width="239"
          height="269"
          loading="lazy"
        />
        <NuxtImg
          format="webp"
          src="assets/about-item-3.png"
          :alt="$t('whiteDrink')"
          class="mx-auto"
          width="239"
          height="269"
          loading="lazy"
        />
        <NuxtImg
          format="webp"
          src="assets/about-item-4.png"
          :alt="$t('jambuHall')"
          class="mt-4 mx-auto"
          width="239"
          height="269"
          loading="lazy"
        />
        <NuxtImg
          format="webp"
          src="assets/about-item-5.png"
          :alt="$t('blueDrink')"
          class="xl:block hidden"
          width="239"
          height="269"
          loading="lazy"
        />
        <NuxtImg
          format="webp"
          src="assets/about-item-6.png"
          :alt="$t('chickenBalls')"
          class="mt-4 xl:block hidden"
          width="239"
          height="269"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template> 
