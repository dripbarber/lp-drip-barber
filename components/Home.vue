<template>
  <section
    id="home_section"
    class="w-full h-[100vh] bg-cover bg-center relative"
  >
    <NuxtImg
      format="webp"
      src="/assets/home-background.jpg"
      alt="homeBackground"            
      class="absolute h-full w-full object-fill object-center z-[5]"
    />
    
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