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
              class="block mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray"              
            >
              <option value="" disabled>
                Escolha um barbeiro
              </option>
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
                  class="text-sky-600 focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray"
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
          <div 
            class="mt-4 text-sm flex flex-col md:flex-row md:space-x-5 items-center"            
          >
            <client-only>              
              <VDatePicker
                v-model="date" 
                mode="date" 
                is-required 
                :masks="masks" 
                :attributes="attrs" 
                class="v-calendar mb-4"
                :is-dark="isDark"
                @click="handleCalendarClick"
                
              />
              
              <div 
                class="max-h-56 md:max-h-72 w-fit overflow-scroll overflow-x-hidden px-2 flex flex-col items-center md:items-start"
                v-if="calendarClicked">
                <label
                  v-for="(time, index) in appointmentTimes"
                  :key="index"
                  class="flex items-center py-1"
                >
                  <input
                    type="radio"
                    v-model="selectedTime"
                    :value="time"
                    class="sr-only"
                  />
                  <span 
                    class="px-6 py-2 text-sm font-medium hover:text-white transition-colors duration-150 border border-sky-600 hover:border-transparent rounded active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray dark:text-white dark:border-white hover:cursor-pointer"                    
                  >
                    {{ time }}
                  </span>
                </label>
              </div>
            </client-only>
           
            
          </div>    
                 
  
          <label class="block mt-4 text-sm">
            <span class="text-gray-700 dark:text-gray-400">Mensagem</span>
            <textarea
              class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-sky-400 focus:outline-none focus:shadow-outline-sky dark:focus:shadow-outline-gray resize-none"
              rows="3"
              placeholder="Envie alguma observação"
            ></textarea>
          </label>
          <button type="submit" class="px-4 mt-4 text-sm font-medium leading-7 text-white transition-colors duration-150 bg-sky-600 border border-transparent rounded active:bg-sky-600 hover:bg-sky-700 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
            Agendar
          </button>
         
        </form>         
  
       
      </div>
    </main>

  </section>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useThemeStore } from "@/stores/themeStores";
import { required } from "@/composable/rules";
import { useForm } from "vee-validate";

const barber = ref('');
const appointmentBarber = ["Barbeiro1", "Barbeiro2", "Barbeiro3"]
const appointmentService = ["Corte", "Barba"]

const date = ref(new Date())
const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid'
    },
    dates: new Date()
  }
])
const masks = ref({
  modelValue: 'DD-MM-YYYY'
})
const rules = ref({
  hours: 10,
  minutes: 30,
})
const appointmentTimes = [
  '10:00',
  '10:30',
  '11:00',
  '20:00',
  '21:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  '19:00',
  
];
const selectedTime = ref(appointmentTimes[0]);

const calendarClicked = ref(false);
const handleCalendarClick = () => {
    calendarClicked.value = true;
  }; 


const themeStores = useThemeStore()
const isDark = computed( () => {
  return themeStores.getTheme === 'dark'
})  

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    barber: [required],
    
  },
});

const form = ref({
  barber: defineInputBinds("barber"),
  
});


</script>

<style>
::-webkit-scrollbar-track {
  background-color: #fffefe;
}
::-webkit-scrollbar {
  width: 2px;
  background: #f4f4f4;
}
::-webkit-scrollbar-thumb {
  background: #6497b1;
}
</style>