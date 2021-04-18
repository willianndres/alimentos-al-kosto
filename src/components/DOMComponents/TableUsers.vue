<template>
  <div class="card">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">{{ nameTable }}</h6>
    </div>
    <div>
      <table class="table align-items-center table-flush">
        <thead class="thead-light">
          <tr>
            <th v-for="head in headers" :key="'a' + head">{{ head }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="da in data" :key="'ab' + da._id">
            <td>{{ da.name }}</td>
            <td>{{ da.lastname }}</td>
            <td>{{ da.email }}</td>
            <td>{{ da.address }}</td>
            <td>{{ da.rol == "0" ? "Administrador" : "Proveedor" }}</td>
            <td>
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
                >
                  <a class="dropdown-item" href="#">Modificar</a>
                  <a class="dropdown-item" href="#">Eliminar</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  props: {
    headers: Array,
    data: Array,
    nameTable: String,
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


