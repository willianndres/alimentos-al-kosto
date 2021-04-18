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
            <td>{{ da.price }}</td>
            <td>{{ da.old_price }}</td>
            <td>
              <img
                width="100"
                height="100"
                :src="cleanEndpoint + da.imagen"
                alt=""
              />
            </td>
            <td>{{ da.categoria }}</td>
            <td>
              <Dropdown
                :itemName="['Grupo y variantes', 'Modificar', 'Eliminar']"
                :itemRoute="[]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown";
import { reactive, toRefs } from "vue";
import { cleanEndpoint } from "../../../backend/api";
export default {
  components: {
    Dropdown
  },
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
      cleanEndpoint,
    };
  },
};
</script>


