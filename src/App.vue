<template>
  <Loading v-if="loading" />
  <div v-else>
    <NavBar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import Loading from "@/components/Loading";
import { firebase } from "@/firebase";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    NavBar,
    Loading,
  },
  setup() {
    const loading = ref(false);
    onMounted(async () => {
      loading.value = true;
      await firebase.getCurrentUser();
      loading.value = false;
    });
    return { loading };
  },
};
</script>

