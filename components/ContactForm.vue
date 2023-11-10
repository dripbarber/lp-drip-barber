<template>
  <form id="contact-form" class="relative" @submit.prevent="submitForm">
    <div id="contact-form-transition" class="absolute -top-20"></div>
    <div class="max-w-7xl mx-auto p-10">
      <h3 class="font-black text-3xl text-center">MARCAÇÃO</h3>

      <div class="mx-auto w-1/2 text-2xl">
        <div class="mb-2">
          <label for="loja">LOJA:</label>
          <select class="w-full" v-model="state.selectedStore" id="loja">
            <option value="Drip 1">R. de Soares dos Reis 44</option>
            <option value="Drip 2">R. do Marquês de Sá da Bandeira 332</option>
          </select>
        </div>

        <div class="mb-2">
          <label for="servico">SERVIÇO:</label>
          <input
            v-model="state.service"
            class="w-full"
            type="text"
            id="servico"
            placeholder="Corte e Sobrancelha"
          />
        </div>

        <div class="mb-2">
          <label for="barbeiro">BARBEIRO:</label>
          <input
            v-model="state.barber"
            class="w-full"
            type="text"
            id="barbeiro"
            placeholder="João Silva"
          />
        </div>

        <div class="mb-2">
          <label for="dataHora">DATA E HORA:</label>
          <input
            class="w-full"
            v-model="state.dateTime"
            type="datetime-local"
            id="dataHora"
          />
        </div>

        <div class="mb-2">
          <label for="nome">NOME:</label>
          <input class="w-full" v-model="state.name" type="text" id="nome" />
        </div>

        <div class="mb-2">
          <label for="telefone">TELEFONE:</label>
          <input
            class="w-full"
            v-model="state.phone"
            type="tel"
            id="telefone"
            placeholder="+351"
          />
        </div>

        <div>
          <label for="email">EMAIL:</label>
          <input class="w-full" v-model="state.email" type="email" id="email" placeholder="example@dripbr.com" />
        </div>
        <br />

        <button
          class="w-full py-3 bg-primary-color rounded-md text-button-cta font-bold"
          type="submit"
        >
          Enviar
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const state = ref({
  selectedStore: "Drip 1",
  service: "",
  barber: "",
  dateTime: "",
  name: "",
  phone: "",
  email: "",
});
</script>