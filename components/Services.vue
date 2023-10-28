<template>
  <section
    id="services_section"
    class="w-full pb-5 md:pb-0 pt-4 md:pt-0 relative overflow-hidden z-[5]"
  >
    
    <div
      id="testimonial-container"
      class="flex items-center justify-between h-full z-5 relative"
    >
      <div class="columns-3 md:flex hidden mt-20">
        <div
          class=" card relative group text-center text-white flex flex-col items-center justify-center h-auto grayscale hover:grayscale-0 overflow-hidden hover:scale-110 transition duration-500 cursor-pointer max-w-[1800px]"
          v-for="n in 3"
          :key="n"
        >
          <NuxtImg
            format="webp"
            src="assets/cortes.png"
            alt="corte de cabelo"
            class="transition-transform transform scale-100 hover:scale-120"
            fit="fill"
            height="1600"
            width="1800"            
            loading="lazy"
          />       
          <div class="absolute group inset-0 flex flex-col items-center justify-center">
            <h2 class="font-bold text-xl z-10">Cortes</h2>
            <h2 class=" opacity-0 group-hover:opacity-100 duration-300 transition-opacity font-bold text-xl z-10">Veja mais</h2>
          </div>         
          
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
          <SwiperSlide>
            <div
              class="card p-5 mt-20 text-center mr-4 w-full flex flex-col items-center"
            >
              <div>
                
                <NuxtImg
                  format="webp"
                  class="perfil"
                  width="120px"
                  height="120px"
                  src="assets/testimonial-01.png"
                  :alt="$t('roundedUserIcon')"
                />
              </div>
              <p class="font-bold text-xl">Ni Marques</p>
              <div class="flex mb-4 mx-auto" >
                <NuxtImg
                  v-for="n in 5"
                  :key="n"
                  format="webp"
                  width="20px"
                  height="20px"
                  src="assets/star.svg"
                  :alt="$t('ratingStar')"
                />
              </div>
              <p class="italic">
                Espetacular! Sabe aquele lugar que você queria encontrar, comer
                com vontade, lugar agradável, bonito, com ótimos drinks?! Pois
                lá eu achei. Fiquei surpreso! O lugar é novo e superou minhas
                expectativas. Recomendo, vou voltar e levar mais gente com
                certeza!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              class="card p-5 mt-20 text-center flex flex-col items-center h-auto"
            >
              <div>
                <NuxtImg
                  format="webp"
                  class="perfil"
                  width="120px"
                  height="120px"
                  src="assets/testimonial-02.png"
                  :alt="$t('roundedUserIcon')"
                />
              </div>
              <p class="font-bold text-xl">Valter F</p>
              <div class="flex mb-4">
                <NuxtImg
                  v-for="n in 5"
                  :key="n"
                  format="webp"
                  width="20px"
                  height="20px"
                  src="assets/star.svg"
                  :alt="$t('ratingStar')"
                />
              </div>
              <p class="italic">
                Excelente atendimento, decoração de bom gosto, boa música e
                ambiente aconchegante. Quanto aos pratos: melhor acarajé e abará
                que já experimentei no Porto, além dos acompanhamentos que
                estavam todos deliciosos, especialmente o camarão. Saí de lá já
                pensando em voltar.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              class="card p-5 mt-20 text-center flex flex-col items-center h-auto"
            >
              <div>
                <NuxtImg
                  format="webp"
                  class="perfil"
                  width="120px"
                  height="120px"
                  src="assets/testimonial-03.png"
                  :alt="$t('roundedUserIcon')"
                />
              </div>
              <p class="font-bold text-xl">Rui P</p>
              <div class="flex mb-4">
                <NuxtImg
                  v-for="n in 5"
                  :key="n"
                  format="webp"
                  width="20px"
                  height="20px"
                  src="assets/star.svg"
                  :alt="$t('ratingStar')"
                />
              </div>
              <p class="italic">
                Lugar excelente, cheio de boa gente e um ambiente espetacular… a
                comida foi simplesmente espetacular e diferente … Recomendo 100%
                a experiencia do Jambu !
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template> 

<style scoped>


.perfil {
  margin-top: -94px;
}
</style>