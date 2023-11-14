<template>
  <section
    id="home_section"
    class="w-full h-[100vh] bg-cover bg-center relative"
  >
    <NuxtImg
      format="webp"
      src="/assets/home-background.jpg"
      alt="homeBackground"            
      class="absolute h-full w-full object-cover object-center z-[5]"
    />
    <div
      id="home-container"
      class="flex flex-col items-center justify-center h-full z-10 relative pt-12"
    >
      <div class="text-white text-center">        
        <h1
          class="relative text-3xl mb-2 md:text-4xl lg:text-8xl"
        >
          Brasil em cada corte
      </h1>
        <h2 class="flex items-center justify-center px-8 mt-2 md:mt-6">
          <span class="block bg-white w-8 md:w-16 mx-1 h-0.5 md:mx-2"></span>
          <span class="text-base md:text-3xl lg:text-4xl">Horários: 09:00 às 20:00</span>
          <span class="block bg-white w-8 md:w-16 h-0.5 mx-1 md:mx-2"></span>
        </h2>
      </div>
      <BtnReservation class="bg-fourth-color hover:bg-sixth-color mt-5 md:mt-10" />
    </div>
  </section>
</template> 

<script setup lang="ts">
  
</script>

<style scoped>
.text-white::before {
  content: ''; /* Adiciona um conteúdo vazio ao pseudo-elemento */  
  position: absolute; /* Posiciona o pseudo-elemento de acordo com o contêiner pai */
  top: 0%; /* Ajusta a posição vertical para o centro do contêiner pai */
  left: 0; /* Ajusta a posição horizontal para o centro do contêiner pai */  
  width: 100%; /* Ajusta a largura do círculo */
  height: 100%; /* Ajusta a altura do círculo */
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo do círculo */
   /* Torna o elemento um círculo */
  z-index: -1; /* Coloca o pseudo-elemento atrás do texto */
}

</style>