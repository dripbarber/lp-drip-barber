<template>
  <section
    id="about_section"
    class="w-full md:h-full pb-5 md:pb-10 pt-8 md:pt-10 lg:pt-14 relative overflow-hidden"
  >
    <div
      id="about-container"
      class="md:flex items-center text-top justify-center h-full overflow-hidden pt-12 md:pt-16 md:pb-6 px-6 z-[5]"
    >
      <div
        class="text-left md:w-1/2 p-4 md:pt-0 md:-mt-32 md:px-6 xl:px-20"
      >
        <h3 
          class="text-yellow-600 md:text-2xl text-2xl mb-1 md:mb-6 font-semibold md:mb-2">
          BEM VINDO
        </h3>
        <h1 class="md:text-6xl text-4xl mb-6 font-semibold md:mb-10">
          Barbearia DRIP BR
        </h1>
        <p class="lg:text-xl text-base mb-2 lg:mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, minima amet fugit eius facilis temporibus. Quae eos aliquam incidunt corrupti, sit maiores vero ea adipisci hic, minus deleniti est eligendi.
        </p>
        <p class="lg:text-xl text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis vero, harum blanditiis dicta, voluptates soluta eligendi excepturi voluptas eum accusantium quam laborum et dolor ipsam rerum quibusdam error similique delectus.
        </p>
      </div>
      <div
        class="md:w-1/2 xl:columns-3 columns-2 w-5/6 mx-auto gap-2 my-4 z-[5]"
      >
        <div class="bg-no-repeat bg-top" 
        v-for="(img, index) in aboutImgs"
        :key="index">
          <NuxtImg          
          format="webp"
          :src=img.src
          :alt=img.description
          class="pt-4 mx-auto"          
          fit="cover"
          width="289"
          height="389"          
          loading="lazy"
        />
        </div>
        
       
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
  interface aboutImgs{
    description: string,
    src: string,
  }

  const aboutImgs: aboutImgs[] =[
    {description: "image1", src: "assets/about-item-1.jpg"},
    {description: "image2", src: "assets/about-item-2.jpg"},
    {description: "image3", src: "assets/about-item-3.jpg"},
    {description: "image4", src: "assets/about-item-4.jpg"},
    {description: "image5", src: "assets/about-item-5.jpg"},
    {description: "image6", src: "assets/about-item-6.jpg"},
  ]
</script>