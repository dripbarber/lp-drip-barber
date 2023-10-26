<template>
  <section
    id="menu_section"
    class="relative w-full flex flex-col justify-center p-6 pt-16 sm:pt-8 md:pb-10 md:pt-20 lg:pt-10"
  >
    <h1
      class="text-amber-600 text-4xl md:text-5xl text-center font-semibold pt-2 pb-6 md:pb-10 lg:pt-20 z-10"
    >
      {{ $t("menuTitle") }}
    </h1>
    <div
      id="menu-container"
      class="w-full max-w-7xl lg:self-center sm:flex flex-row md:flex-col lg:flex-row justify-evenly lg:justify-center lg:px-auto pt-4 sm:pt-0 lg:pt-10 md:pb-4 lg:pb-10 z-10"
    >
      <div class="flex-col w-full max-w-xl lg:max-w-3xl hidden md:flex lg:flex-1 lg:mr-20 lg:ml-auto mx-auto">
        <NuxtImg
          format="webp"
          src="assets/menu-image-01.png"
          loading="lazy"
          class="h-52 sm:h-2/6 lg:h-80 object-cover w-auto lg:w-full pb-2"
          :alt="$t('greenDish')"
        />
        <div class="flex justify-evenly gap-2 sm:h-3/5 lg:h-80">
          <div class="flex flex-col w-full md:w-auto lg:w-full h-2/6 sm:h-full ">
            <NuxtImg
              format="webp"
              src="assets/menu-image-02.png"
              loading="lazy"
              class="object-center object-cover w-auto lg:w-full h-28 sm:h-2/4 pb-1"
              :alt="$t('breadDish')"
            />
            <NuxtImg
              src="assets/menu-image-03.png"
              loading="lazy"
              class="object-bottom object-cover w-auto lg:w-full h-28 sm:h-2/4 pt-1"
              :alt="$t('hamgurguerDish')"
            />
          </div>
          <NuxtImg
            format="webp"
            src="assets/menu-image-04.png"
            loading="lazy"
            class="h-56 sm:h-full w-1/2 w-auto lg:w-full object-center object-cover"
            :alt="$t('shrimpDish2')"
          />
        </div>
      </div>
      <div class="lg:flex-1 md:pl-10 lg:pl-0 pb-6 md:py-0 mx-auto md:mt-8 lg:mt-2">
        <div
          class="md:max-w-lg lg:max-w-2xl w-4/5 sm:w-fit lg:h-fill m-auto md:mr-6 lg:mr-0 flex flex-col sm:justify-evenly sm:pt-0 sm:grid sm:grid-cols-2 md:block lg:flex lg:flex-col" 
        >
          <div
            class="mt-10 md:mt-6 lg:mt-0 lg:flex-auto relative md:h-1/4 lg:h-fill md:pl-24 md:pl-16 lg:pl-32 pt-2 p-4 sm:p-6 md:pr-6 lg:pr-8 bg-slate-900 rounded-tr-md rounded-bl-md rounded-3xl md:rounded-br-3xl"
          >
            <NuxtImg
              format="webp"
              src="assets/menu-item-01.png"
              loading="lazy"
              :alt="$t('ribCroquetes')"
              class="w-1/2 md:absolute md:top-0 md:left-0 md:w-1/5 md:-ml-4 md:-mt-4 mx-auto md:mx-0 -mt-8"
            />
            <h2
              class="text-xl text-amber-600 pb-1 text-center md:text-left font-semibold"
            >
              {{ $t("menuItemTitle1") }}
            </h2>
            <p class="text-base text-white hidden sm:block">
              {{ $t("menuItemDescription1") }}
            </p>
          </div>
          <div
            class="mt-10 md:mt-6 lg:mt-4 lg:flex-auto relative md:h-1/4 lg:h-fill md:pl-24 md:pl-16 lg:pl-32 pt-2 p-4 sm:p-6 mb:pb-4 md:pr-6 lg:pr-8 bg-slate-900 rounded-tr-md rounded-bl-md rounded-3xl md:rounded-br-3xl"
          >
            <NuxtImg
              format="webp"
              src="assets/menu-item-02.png"
              loading="lazy"
              :alt="$t('jambuMix')"
              class="w-1/2 md:absolute md:top-0 md:left-0 md:w-1/5 md:-ml-4 md:-mt-4 mx-auto md:mx-0 -mt-8"
            />
            <h2
              class="text-xl text-amber-600 pb-1 text-center md:text-left font-semibold"
            >
              {{ $t("menuItemTitle2") }}
            </h2>
            <p class="text-base text-white hidden sm:block">
              {{ $t("menuItemDescription2") }}
            </p>
          </div>
          <div
            class="mt-10 md:mt-6 lg:mt-4 lg:flex-auto relative md:h-1/4 lg:h-fill md:pl-24 md:pl-16 lg:pl-32 pt-2 p-4 sm:p-6 mb:pb-4 md:pr-6 lg:pr-8 bg-slate-900 rounded-tr-md rounded-bl-md rounded-3xl md:rounded-br-3xl"
          >
            <NuxtImg
              format="webp"
              src="assets/menu-item-03.png"
              loading="lazy"
              :alt="$t('acarajePlatter')"
              class="w-1/2 md:absolute md:top-0 md:left-0 md:w-1/5 md:-ml-4 md:-mt-4 mx-auto md:mx-0 -mt-8"
            />
            <h2
              class="text-xl text-amber-600 pb-1 text-center md:text-left font-semibold"
            >
              {{ $t("menuItemTitle3") }}
            </h2>
            <p class="text-base text-white hidden sm:block">
              {{ $t("menuItemDescription3") }}
            </p>
          </div>
          <div
            class="mt-10 md:mt-6 lg:mt-4 lg:flex-auto relative md:h-1/4 lg:h-fill md:pl-24 md:pl-16 lg:pl-32 pt-2 p-4 sm:p-6 mb:pb-4 md:pr-6 lg:pr-8 bg-slate-900 rounded-tr-md rounded-bl-md rounded-3xl md:rounded-br-3xl"
          >
            <NuxtImg
              format="webp"
              src="assets/menu-item-04.png"
              loading="lazy"
              :alt="$t('northeasternDish')"
              class="w-1/2 md:absolute md:top-0 md:left-0 md:w-1/5 md:-ml-4 md:-mt-4 mx-auto md:mx-0 -mt-8"
            />
            <h2
              class="text-xl text-amber-600 pb-1 text-center md:text-left font-semibold"
            >
              {{ $t("menuItemTitle4") }}
            </h2>
            <p class="text-base text-white hidden sm:block">
              {{ $t("menuItemDescription4") }}
            </p>
          </div>
        </div>
        <div class="flex ">
          <NuxtLink
            to="https://www.thefork.pt/restaurante/jambu-rest-bar-r805263#booking="
            target="_blank"
            class="text-sm md:text-lg lg:text-xl uppercase hover:bg-amber-500 text-slate-900 font-semibold transition duration-100 delay-75 px-7 lg:px-10 py-3 lg:py-4 bg-amber-600 rounded-[120px] mt-6 lg:mt-8 mx-auto self-center"
          >
            {{ $t("MenuButton") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>