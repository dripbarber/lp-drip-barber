<template>
  <section id="footer_section" class="w-full relative bg-primary-color text-white">
    <div
      id="footer-container"
      class="h-full py-20 md:py-28 max-w-7xl md:flex md:flex-row-reverse mx-auto justify-between"
    >
      <div class="px-6 py-4 md:w-1/2 w-full mx-auto md:mb-1 mb-10 z-[5]">
        <iframe
          id="iframe-google-maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3005.564881839044!2d-8.6112359!3d41.122193!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24654e2e820497%3A0x139159b796f5489e!2zRHJpcCBCUiBCYXJiZWFyaWHwn4en8J-HtyDwn5KI!5e0!3m2!1spt-BR!2sbr!4v1698618915741!5m2!1spt-BR!2sbr"
          class="w-full h-auto"
          style="border: 0"
          allow="fullscreen"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="googleMaps"
        ></iframe>
      </div>
      <div class="px-6 flex flex-col justify-between md:text-left text-center z-[5]">
        <div>
          <div class="flex mb-6">
            <Logo class="md:mx-0 mx-auto" />
          </div>
          <div class="flex mb-8 md:pl-3 justify-center md:justify-normal gap-3">             
            <NuxtLink  
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank" 
              class="md:ml-0 fa-2xl" 
              arial-label="whatsapp link">
              <font-awesome-icon :icon="['fab', link.icon]" />  
            </NuxtLink>            
          </div>
          <div class="mb-8 md:pl-3">
            <p> 
              <span class="font-semibold mb-6 block"> 
                HORÁRIOS DE FUNCIONAMENTO<br> 
              </span>
                Segunda à Sábado<br> 
                09:00 às 20:00
            </p>                      
          </div>
          <div class="p-2 w-1/2 mx-auto md:mx-0">
            <NuxtLink to="https://www.livroreclamacoes.pt/Inicio/" target="_blank" aria-label="Livro de reclamações"
              ><NuxtImg format="webp" src="assets/complaint-book.png" alt="Livro de Reclamações" loading="lazy"
               class="md:mx-0 mx-auto w-48 h-full"
            /></NuxtLink>
          </div>
        </div>
        <div class="mt-8 md:text-left text-center">
          <p>© 2023 Drip BR. All Right Reserved. Developed by Raydan</p>
        </div>
      </div>
    </div>
  </section>
</template> 

<script setup lang="ts">
const socialLinks = [
  {
    name: 'Whatsapp',
    url: 'https://wa.me/351930692647',
    icon: 'whatsapp'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/dripbrbarbearia/',
    icon: 'instagram'
  },
]
</script>

<style scoped>
#iframe-google-maps {
  min-height: 450px;
}

@media (max-width: 600px) {
#iframe-google-maps {
  min-height: 350px;
}
}
</style>