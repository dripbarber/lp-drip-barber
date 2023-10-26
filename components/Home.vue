<template>
  <section
    id="home_section"
    class="w-full h-[100vh] bg-cover bg-center relative overflow-hidden"
  >
    <NuxtImg
      format="webp"
      src="/assets/home-background.png"
      :alt="$t('homeBackground')"            
      class="absolute w-full h-full object-cover object-center z-[5]"
    />
    <div
      id="home-container"
      class="flex flex-col items-center justify-center h-full z-10 relative"
    >
      <div class="text-white text-center font-poppins">
        <p class="text-3xl md:text-5xl font-normal title shadow-orange">
          JAMBU
        </p>
        <p
          class="text-6xl mb-2 md:text-8xl font-semibold subtitle shadow-orange"
        >
          RESTO BAR
        </p>
        <p class="flex items-center justify-center px-8">
          <span class="block bg-white w-10 md:w-16 mx-1 h-0.5 md:mx-2"></span>
          <span class="text-sm md:text-lg">Music, Food, Tapas and Drinks</span>
          <span class="block bg-white w-10 md:w-16 h-0.5 mx-1 md:mx-2"></span>
        </p>
      </div>
      <div class="md:hidden mt-8 text-white">
        <NuxtLink
          target="_blank"
          to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
          class="uppercase transition duration-100 delay-75 font-semibold px-8 py-3 bg-amber-600 hover:bg-amber-700 rounded-[120px] text-sm"
          >{{ $t("reservation") }}</NuxtLink
        >
      </div>
    </div>
  </section>
</template> 

<style scoped>
.shadow-orange {
  text-shadow: 0px 0px 12px #e27e01;
}

.title {
  font-weight: 400;
}

.subtitle {
  font-weight: 500;
}
</style>