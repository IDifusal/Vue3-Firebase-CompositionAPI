<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Ocurrió un error:</strong> {{ error }}
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="error = null"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  setup() {
    const error = inject("error");
    return { error };
  },
};
</script>