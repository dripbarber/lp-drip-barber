<template>
  <Head>
    <!-- GENERAL TAGS -->
    <Title>Jambu Resto Bar</Title>
    <Meta name="author" content="Raydan by Daniel Soares" />
    <Meta name="author" content="Raydan by Isaac Francelino" />
    <Meta
      name="keywords"
      content="porto, restaurantes no Porto, Trendy restaurante, restaurante top, Restaurantes restauração, jambu, jambu restaurante, Comer bem, Guia de restaurantes, jantar no porto, almoçar no porto, turismo do porto, viajar no porto, esplanada, restaurante de esplanada, area interior, acarajé, comida baiana em porto, melhor acarajé"
    />
    <Meta
      name="description"
      content="Saboroso encontro de culturas culinárias no coração do
          Porto! No nosso restaurante, cada prato é uma viagem sensorial única,
          onde ingredientes tradicionais e inspirações contemporâneas se fundem
          em harmonia. Se você busca uma experiência gastronômica autêntica e
          apaixonante, aqui é o seu destino."
    />
    <Meta name="viewport" content="width=device-width, initial-scale=1" />
    <Meta name="copyright" content="Raydan 2023" />
    <Meta name="robots" content="index, follow" />

    <!-- TWITTER TAGS -->
    <Meta name="twitter:title" content="Jambu - Resto Bar" />
    <Meta
      name="twitter:description"
      content="No nosso restaurante, cada prato é uma viagem sensorial única,
          onde ingredientes tradicionais e inspirações contemporâneas se fundem
          em harmonia."
    />
    <Meta name="twitter:image" content="/preview.png" />
    <Meta name="twitter:card" content="summary" />

    <!-- FACEBOOK TAGS -->
    <Meta name="og:title" content="Jambu - Resto Bar" />
    <Meta
      name="og:description"
      content="No nosso restaurante, cada prato é uma viagem sensorial única,
          onde ingredientes tradicionais e inspirações contemporâneas se fundem
          em harmonia."
    />
    <Meta name="og:image" content="/preview.png" />
    <Meta name="og:url" content="https://lp-jambu-bar.vercel.app/" />
    <Meta name="og:type”" content="website" />
    <Meta name="og:site_name" content="Jambu - Resto Bar" />
  </Head>
  <div class="relative bg-slate-200">
    <!-- <NuxtImg
      format="webp"
      src="/assets/menu-background.jpg"
      :alt="$t('homeBackground')"
      width="1439"
      height="1444"
      class="fixed w-full h-full object-cover object-center z-[3]"
    /> -->
    <Header />
    <Home />
    <Reservation />
    <Services />    
    <About />    
    <Testimonial />
    <OurDrinks />
    <OurPlace />
    <HowToFind />
    <Place />
    <Footer />

  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "pt",
  },
  meta: [{ charset: "utf-8" }],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Kalam:wght@400;700&family=Open+Sans&family=Roboto:wght@100;300;400;500;700;900&family=Smythe&display=swap');



html {
  scroll-behavior: smooth;
  font-family: "Kalam", sans-serif;
}

p {
  font-family: "Roboto", sans-serif;
}

::-webkit-scrollbar-track {
  background-color: #151515;
}
::-webkit-scrollbar {
  width: 3px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}
</style>
