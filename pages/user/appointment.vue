<template>
  <section class="h-screen overflow-y-auto dark:bg-gray-900">
    <Navigation />
    <main class="pb-16 px-6 overflow-y-auto  dark:bg-gray-900">
      
      <div class="container max-w-4xl mx-auto">
        <h2
          class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200"
        >
          Reserve um horário
        </h2>
        <!-- CTA -->
        <p class="mb-6 text-gray-600 dark:text-gray-100 ">Serviços no melhor estilo brasileiro, faça uma marcação. Nossos barbeiros estão animados para ver você!</p>
  
        <!-- General elements -->
       
        <form
          class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <label for="barber" class="block text-sm">
            <span class="text-gray-700 dark:text-gray-400">
              Barbeiro
            </span>
            <select
              id="barber"
              name="barber"
              class="block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-stone-400 focus:outline-none focus:shadow-outline-stone dark:focus:shadow-outline-gray"
            >
              <option
              v-for="(barber,index) in appointmentBarber"
              :key="index" 
              value="barber"
              >
                {{ barber }}
              </option>
              
            </select>
          </label>        
  
          <div class="mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">
              Serviços
            </span>
            <div class="mt-2 flex flex-row space-x-2">
              <div 
                v-for="(service, index) in appointmentService"
                :key="index"
                class="flex items-center">
                <input
                  type="checkbox"
                  :id= service                
                  class="text-stone-600 focus:border-stone-400 focus:outline-none focus:shadow-outline-stone dark:focus:shadow-outline-gray"
                  :name= service                
                />
                <label
                  :for= service
                  class=" text-gray-600 dark:text-gray-400"
                >
                  <span class="pl-2">{{ service }}</span>
                </label>              
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row md:space-x-6">
            <!-- <vue-date-picker v-model=""></vue-date-picker> -->
            <div class="mt-4 text-sm">
              <label for="data" class="text-gray-700 dark:text-gray-400 block">Data:</label>
              <input              
                type="date"
                id="data"
                name="data"
                class="w-fit px-3 py-2 border rounded"
              />
            </div>
      
            <div class="mt-4 text-sm">
              <label for="hora" class="text-gray-700 dark:text-gray-400 block">Hora:</label>
              <input
                
                type="time"
                id="hora"
                name="hora"
                class="w-fit px-3 py-2 border rounded"
              />
            </div>
            
          </div>    
                 
  
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Mensagem</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-stone-400 focus:outline-none focus:shadow-outline-stone dark:focus:shadow-outline-gray resize-none"
              rows="3"
              placeholder="Envie alguma observação"
            ></textarea>
          </label>
          <button type="submit" class="px-4 mt-4 text-sm font-medium leading-7 text-white transition-colors duration-150 bg-stone-600 border border-transparent rounded active:bg-stone-600 hover:bg-stone-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
            Agendar
          </button>
         
        </form>         
  
       
      </div>
    </main>

  </section>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

const appointmentBarber = ["Barbeiro1", "Barbeiro2", "Barbeiro3"]
const appointmentService = ["Corte", "Barba"]

// const selectedDate = ref(new Date());
// const pickerOptions = {
  // Opções do Vue Date Picker, se necessário
// };

</script>