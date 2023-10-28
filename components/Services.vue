<template>
  <section
    id="services_section"
    class="w-full bg-gray-950 pt-4 md:pt-0 relative overflow-hidden z-[5]"
  >    
    <div
      id="testimonial-container"
      class="flex items-center justify-between h-full z-5 relative"
    >
      <div class="columns-3 md:flex hidden mt-24">
        <div
          class=" card relative group text-center text-white flex flex-col items-center justify-center h-auto grayscale hover:grayscale-0 overflow-hidden hover:scale-110 transition duration-500 cursor-pointer max-w-[1800px]"
          v-for="(img, index) in imgCard"
          :key="index"
        >
          <NuxtImg
            format="webp"
            :src=img.src
            alt="corte de cabelo"
            class=""
            fit="fill"
            height="700"
            width="1100"            
            loading="lazy"
          />       
          <div class="absolute group inset-0 flex flex-col items-center justify-center">
            <h2 class="font-bold text-5xl z-10" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); ">{{ img.name }}</h2>
            <h2 class="opacity-0 group-hover:opacity-100 duration-300 transition-opacity font-bold text-2xl z-10 mt-4" style="text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);">VEJA MAIS</h2>
          </div>         
        </div>        
      </div>

      <div class="md:hidden w-full mt-10 pt-6">
        <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false,
          }"
        >
          <SwiperSlide 
            v-for="(img, index) in imgCard"
            :key="index"
            >
            <div
              class="card text-center text-white mr-4 w-full flex flex-col items-center h-auto grayscale hover:grayscale-0 overflow-hidden hover:scale-110 transition duration-500"              
            >             
              <NuxtImg
              format="webp"
              :src=img.src
              alt="corte de cabelo"
              class=""
              fit="cover"
              height="700"
              width="1100"            
              loading="lazy"
              />       
              <div class="absolute group inset-0  flex flex-col items-center justify-center">
                <h2 class="font-bold text-3xl z-10" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); ">{{ img.name }}</h2>
                <h2 class="opacity-0 group-hover:opacity-100 duration-300 transition-opacity font-bold text-xl z-10 mt-4" style="text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);">VEJA MAIS</h2>
              </div>                            
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
interface imgCard {
  name: string;
  link: string;
  src: string;
}

const imgCard: imgCard[] = [
  { name: "CORTE", link: "#", src: "assets/services-haircut.png" },
  { name: "BARBA", link: "#", src: "assets/services-shave.jpg" },
  { name: "CORTE & BARBA", link: "#", src: "assets/services-shave-haircut.jpg" },
  
];


</script>

<style scoped>


.perfil {
  margin-top: -94px;
}
</style>