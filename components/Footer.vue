<template>
  <section id="footer_section" class="w-full relative">
    <div
      id="footer-container"
      class="h-full py-10 md:py-20 max-w-7xl md:flex md:flex-row-reverse mx-auto justify-between"
    >
      <div class="px-6 md:w-1/2 w-full mx-auto md:mb-1 mb-10 z-[5]">
        <iframe
          id="iframe-google-maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12017.77884929511!2d-8.6046952!3d41.1466465!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24653b30148869%3A0x22f7c9b79ae460ab!2sJambu%20Resto!5e0!3m2!1spt-BR!2spt!4v1694269251824!5m2!1spt-BR!2spt"
          class="w-full h-auto"
          style="border: 0"
          allow="fullscreen"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="googleMaps"
        ></iframe>
      </div>
      <div class="text-white font-poppins px-6 flex flex-col justify-between md:text-left text-center z-[5]">
        <div>
          <div class="flex mb-6">
            <Logo class="md:mx-0 mx-auto" />
          </div>
          <div class="flex mb-8"> 
            <NuxtLink to="https://wa.me/351910444333" target="_blank" class="mr-6 md:ml-0 ml-auto" arial-label="whatsapp link">
              <NuxtImg format="webp" loading="lazy" src="assets/whatsapp.png" alt="Whatsapp" />
            </NuxtLink>
            <NuxtLink to="https://www.instagram.com/jamburestobar.pt/" target="_blank" class="md:mr-0 mr-auto" aria-label="Jamburestobar Instagram" >
              <NuxtImg format="webp" loading="lazy" src="assets/instagram.png" alt="Instagram" />
            </NuxtLink>
          </div>
          <div class="mb-8">
            <p class="font-semibold mb-3"> {{ $t('FooterTitle') }} </p>
            <div class="md:flex inline">
              <div class="md:mr-10">
                <p> {{ $t('FooterDaysOfWeek1') }} </p>
                <p> {{ $t('FooterTime1') }} </p>
              </div>
              <div class="md:mt-0 mt-2">
                <p> {{ $t('FooterDaysOfWeek2') }} </p>
                <p> {{ $t('FooterTime2') }} </p>
              </div>
            </div>
          </div>
          <div>
            <NuxtLink to="https://www.livroreclamacoes.pt/Inicio/" target="_blank" aria-label="Livro de reclamações"
              ><NuxtImg format="webp" :src="  $t('FooterComplainBook')  " alt="Livro de Reclamações" loading="lazy"
               class="md:mx-0 mx-auto w-48 h-full"
            /></NuxtLink>
          </div>
        </div>
        <div class="relative mt-8 md:text-left text-center">
          <p>© 2023 Jambu. All Right Reserved. Developed by Raydan</p>
        </div>
      </div>
    </div>
  </section>
</template> 

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