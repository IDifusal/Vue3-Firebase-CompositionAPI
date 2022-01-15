<template>
  <div class="card shadow-sm mb-2">
    <div class="card-body">
      <p class="m-0" :class="{ 'text-decoration-line-through': todo.estado }">
        {{ todo.texto }}
      </p>
      <div class="mt-2">
        <button class="btn btn-warning me-1" @click="modificar(todo)">
          Modificar
        </button>
        <button
          class="btn btn-danger mx-1"
          :disabled="bloquear"
          @click="eliminar(todo.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, ref } from "@vue/runtime-core";
import { useDB } from "../composables/useDb";
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { eliminarTodo, modificarTodo } = useDB();
    const error = inject("error");
    const todos = inject("todos");
    const bloquear = ref(false);
    const modificar = async (todo) => {
      const respuesta = await modificarTodo(todo);
      if (respuesta.res) {
        error.value = respuesta.error;
        return;
      }
      todos.value = todos.value.map((item) => {
        item.id === todo.id ? { ...item, estado: !todo.estado } : item;
      });
    };
    const eliminar = async (id) => {
      bloquear.value = true;
      const respuesta = await eliminarTodo(id);
      if (respuesta.res) {
        error.value = respuesta.error;
        return;
      }
      todos.value = todos.value.filter((item) => item.id !== id);
      bloquear.value = false;
    };
    return { eliminar, bloquear, modificar };
  },
};
</script>