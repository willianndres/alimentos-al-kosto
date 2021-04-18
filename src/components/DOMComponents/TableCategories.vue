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
            <td>{{ da.description }}</td>
            <td>
              <img
                width="100"
                height="100"
                :src="cleanEndpoint + da.imagen"
                alt=""
              />
            </td>
            <td>
              <Dropdown
                :itemName="['Sub categorias', 'Modificar', 'Eliminar']"
                :itemRoute="[
                  '/dashboard/categories/sub-categories/' + da._id,
                  '/dashboard/categories/edit-category/' + da._id,
                  '/dashboard/categories/delete-category/' + da._id,
                ]"
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
import { cleanEndpoint } from "../../../backend/api";
import Dropdown from "./Dropdown";
export default {
  props: {
    headers: Array,
    data: Array,
    nameTable: String,
  },
  setup() {
    return {
      cleanEndpoint,
      Dropdown,
    };
  },
};
</script>


