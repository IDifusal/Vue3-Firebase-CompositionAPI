<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar brand" to="/"> Firestore</router-link>
      <p class="text-white">{{ userName }}</p>
      <div>
        <div
          v-if="!isAuthenticated"
          @click="signIn"
          class="button btn btn-dark"
        >
          Acceder
        </div>
        <div v-else>
          <router-link to="/crud" class="btn btn-primary mx-1"
            >CRUD</router-link
          >
          <router-link to="/perfil" class="btn btn-primary mx-1"
            >Perfil</router-link
          >
          <div @click="signOut" class="button btn btn-danger mx-1">Salir</div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useUser } from "../composables/useUser";
import { useAuth } from "@vueuse/firebase";
import { computed } from "@vue/reactivity";
export default {
  setup() {
    const { signIn, signOut } = useUser();
    const userName = computed(() => {
      return isAuthenticated.value ? user.value.displayName : "signOut";
    });
    const { user, isAuthenticated } = useAuth();
    return { signIn, signOut, user, isAuthenticated, userName };
  },
};
</script>