<template>
  <section
    id="reservation_section"
    class="flex items-center w-full pb-5 md:pb-10 pt-4 md:pt-6  relative overflow-hidden z-10"
  >
    <NuxtImg
      format="webp"
      src="/assets/reservation-background.png"
      alt="Prato com queijo derretido e batata"
      height="1444"
      class="absolute h-full w-full object-cover object-center z-0"
    />
    <div
      id="reservation-container"
      class="flex flex-col md:flex-row items-center justify-center md:justify-evenly overflow-hidden p-8 md:p-16 z-10 mx-auto relative lg:w-full"
    >
      <div
        class="text-white text-center md:text-left font-poppins z-10 max-w-3xl"
      >
        <h1
          class="text-amber-600 text-2xl sm:text-3xl lg:text-5xl mb-2 font-semibold"
        >
          {{ $t("reservationH1") }}
        </h1>
        <p class="text-base sm:text-lg lg:text-xl">
          {{ $t("reservationParagraph") }}
        </p>
      </div>
      <div class="mt-6 md:mt-0">
        <NuxtLink
          to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
          target="_blank"
          class="block whitespace-nowrap text-sm md:text-lg lg:text-xl ml-auto mr-auto uppercase hover:bg-amber-500 text-slate-900 font-semibold transition duration-100 delay-75 px-7 lg:px-10 py-3 lg:py-4 bg-amber-600 rounded-[120px]"
        >
          {{ $t("reservationButton") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template> 
