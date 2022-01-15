<template>
  <div v-if="isAuthenticated">
    <h1>Crud</h1>
    <Cargando v-if="cargando" />
    <div v-else>
      <pre>
        <TodoForm/>
        <Todo v-for="todo in todos" :key=todo.id :todo="todo" />
      </pre>
      <p v-if="todos.length === 0">Sin Todos</p>
    </div>
  </div>
  <Error v-if="pintarError" />
</template>
<script>
import { useAuth } from "@vueuse/firebase";
import { useDB } from "../composables/useDb";
import Cargando from "../components/Loading";
import Error from "../components/Error";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import { computed, onMounted, ref, provide } from "vue";
export default {
  components: {
    Cargando,
    Error,
    TodoForm,
    Todo,
  },
  setup() {
    const { isAuthenticated } = useAuth();
    const { getTodos, cargando } = useDB();
    const todos = ref([]);
    const error = ref(null);
    const pintarError = computed(() => {
      return error.value ? true : false;
    });
    provide("error", error);
    provide("todos", todos);
    onMounted(async () => {
      todos.value = await getTodos();
      if (todos.value.res) {
        error.value = todos.value.error;
      }
    });

    return { isAuthenticated, todos, cargando, pintarError, error };
  },
};
</script>