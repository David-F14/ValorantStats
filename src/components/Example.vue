<!-- <script setup>
import { ref } from 'vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const count = ref(0)

function increment() {
  count.value++
}

</script> -->
<script>
export default({
  props:{
      msg: {
      type: String,
      required: true
    }
  },

  data(){
    return {
      count: 0
    }
  }
})
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ msg }}</h1>
        Reactive button <button @click="count++"> {{ count }}</button>
        <h3>
            You’ve successfully created a project with
            <a href="https://vitejs.dev/" target="_blank" rel="noopener"
                >Vite</a
            >
            +
            <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a
            >.
        </h3>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings button {
  background-color: grey;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
