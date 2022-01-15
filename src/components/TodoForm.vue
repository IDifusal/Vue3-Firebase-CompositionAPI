<template>
  <form @submit.prevent="procesarFormulario">
    <input
      v-model.trim="texto"
      type="text"
      placeholder="Enter para agregar todo"
      name="name"
      id=""
      class="form-control"
    />
  </form>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useDB } from "../composables/useDb";
import { inject } from "vue";
export default {
  setup() {
    const { agregarTodo } = useDB();
    const texto = ref("");
    const todos = inject("todos");
    const error = inject("error");
    const procesarFormulario = async () => {
      if (!texto.value) {
        console.log("texto vacio");
        return;
      }
      const todo = await agregarTodo(texto.value);
      if (todo.res) {
        error.value = todo.error;
        todo.value = "";
        return;
      }
      todos.value = [...todos.value, todo];
      texto.value = "";
    };
    return { texto, procesarFormulario };
  },
};
</script>