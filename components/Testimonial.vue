<template>
  <section
    id="testimonial_section"
    class="w-full md:min-h-[550px] pb-5 md:pb-10 pt-4 md:pt-6 relative overflow-hidden z-[5]"
  >
    <NuxtImg
      format="webp"
      src="/assets/testimonial-background3.png"
      alt="DRIP BR logo"
      sizes="sm:300px md:1440px lg:2048px"
      class="absolute h-full w-full object-cover object-bottom z-0 grayscale"
    />
    <div
      id="testimonial-container"
      class="flex items-center justify-center h-full p-6 max-w-7xl mx-auto z-5 relative"
    >
      <div class="columns-3 md:flex hidden mt-20">
        <div
          class="w-1/3 p-[35px] card text-center flex flex-col items-center mr-4 h-auto"
          v-for="(card, index) in testimonialCards"
          :key="index"
        >
          <div>
            <NuxtImg
              format="webp"
              class="perfil"
              width="120px"
              height="120px"
              :src=card.src
              :alt=card.alt
            />
          </div>
          <h4 class="font-bold text-xl"> {{card.userName}} </h4>
          <div class="flex mb-4">
            <NuxtImg
              v-for="n in 5"
              :key="n"
              format="webp"
              width="20px"
              height="20px"
              src="assets/star.svg"
              alt="estrela de classificação"
            />
          </div>
          <p class="italic lg:text-xl"> {{card.testimonial}} </p>
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
          <SwiperSlide
            v-for="(card, index) in testimonialCards"
            :key="index"
          >
            <div
              class="card p-5 mt-20 text-center mr-4 w-full flex flex-col items-center"
            >
              <div>
                <NuxtImg
                  format="webp"
                  class="perfil"
                  width="120px"
                  height="120px"
                  :src= card.src
                  :alt= card.alt
                />
              </div>
              <h4 class="font-bold text-xl"> {{ card.userName }} </h4>
              <div class="flex mb-4 mx-auto">
                <NuxtImg
                  v-for="n in 5"
                  :key="n"
                  format="webp"
                  width="20px"
                  height="20px"
                  src="assets/star.svg"
                  alt="estrela de classificação"
                />
              </div>
              <p class="italic text-base"> {{ card.testimonial }} </p>
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
  interface testimonialCards {
    src: string,
    alt: string,
    userName: string,
    testimonial: string,
  }

  const testimonialCards: testimonialCards[] = [
    {src: "assets/testimonial-1.png", alt:"icone em forma de circulo com imagem de usuario", userName: "Fernando Souza", testimonial: "Olá, gostaria de expressar a minha imensa satisfação com a barbearia em Vila Nova de Gaia, Portugal! Além disso, os cortes na régua são de altíssima qualidade. É um prazer vir aqui, e eu definitivamente recomendaria esta barbearia a todos que procuram um ótimo atendimento e um corte impecável!" },
    {src: "assets/testimonial-2.png", alt:"icone em forma de circulo com imagem de usuario", userName: "João Silva", testimonial: "Estou simplesmente encantado com essa barbearia! O ambiente é tão aconchegante e descontraído, e a equipe é sempre tão simpática e alegre. E não posso deixar de mencionar os cortes de cabelo - são sempre feitos com perfeição! Mal posso esperar para minha próxima visita." },
    {src: "assets/testimonial-3.png", alt:"icone em forma de circulo com imagem de usuario", userName: "Carlos Ferreira", testimonial: "Esta barbearia é simplesmente fenomenal! A equipe é incrivelmente acolhedora e amigável, e o cafézinho que eles oferecem tem um toque maravilhoso. Não posso elogiar o suficiente a qualidade do atendimento e dos serviços prestados. Esta barbearia é um verdadeiro tesouro em Vila Nova de Gaia!" },
  ]
</script>

<style scoped>
.card {
  background: rgba(217, 217, 217, 0.70);
  border-radius: 20px;
}

.perfil {
  margin-top: -94px;
}
</style>