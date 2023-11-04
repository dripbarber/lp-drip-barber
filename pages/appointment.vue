<template>
  <Navigation />
  <main class="h-full pb-16 overflow-y-auto dark:bg-gray-900">
    <div class="container px-6 mx-auto grid max-w-4xl">
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
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-stone-400 focus:outline-none focus:shadow-outline-stone dark:focus:shadow-outline-gray max-w-xs"
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
                <span class="ml-2">{{ service }}</span>
              </label>              
            </div>
          </div>
        </div>
        <div class="flex space-x-6">
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

      <!-- Validation inputs -->
      <h4
        class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"
      >
        Validation
      </h4>
      <div
        class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <!-- Invalid input -->
        <label class="block text-sm">
          <span class="text-gray-700 dark:text-gray-400">
            Invalid input
          </span>
          <input
            class="block w-full mt-1 text-sm border-red-600 dark:text-gray-300 dark:bg-gray-700 focus:border-red-400 focus:outline-none focus:shadow-outline-red form-input"
            placeholder="Jane Doe"
          />
          <span class="text-xs text-red-600 dark:text-red-400">
            Your password is too short.
          </span>
        </label>

        <!-- Valid input -->
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">
            Valid input
          </span>
          <input
            class="block w-full mt-1 text-sm border-green-600 dark:text-gray-300 dark:bg-gray-700 focus:border-green-400 focus:outline-none focus:shadow-outline-green form-input"
            placeholder="Jane Doe"
          />
          <span class="text-xs text-green-600 dark:text-green-400">
            Your password is strong.
          </span>
        </label>

        <!-- Helper text -->
        <label class="block mt-4 text-sm">
          <span class="text-gray-700 dark:text-gray-400">
            Helper text
          </span>
          <input
            class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            placeholder="Jane Doe"
          />
          <span class="text-xs text-gray-600 dark:text-gray-400">
            Your password must be at least 6 characters long.
          </span>
        </label>
      </div>

     

     
    </div>
  </main>
</template>

<script setup lang="ts">
const appointmentBarber = ["Barbeiro1", "Barbeiro2", "Barbeiro3"]
const appointmentService = ["Corte", "Barba"]

</script>