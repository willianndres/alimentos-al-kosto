<template>
  <div class="dropdown mb-3" :class="{ show: isOpen }">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click.prevent="isOpen = !isOpen"
    >
      Acciones
    </button>
    <div
      class="dropdown-menu"
      :class="{ show: isOpen }"
      aria-labelledby="dropdownMenuButton"
      v-if="itemRoute.length > 0"
    >
      <router-link
        class="dropdown-item"
        v-for="[index, name] of itemName.entries()"
        :key="name"
        :to="itemRoute[index]"
        >{{ name }}</router-link
      >
    </div>
    <div
      class="dropdown-menu"
      :class="{ show: isOpen }"
      aria-labelledby="dropdownMenuButton"
      v-else
    ></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    itemName: Array,
    itemRoute: Array,
  },
  setup() {
    const state = reactive({
      isOpen: false,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>