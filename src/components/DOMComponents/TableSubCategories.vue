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
        <tbody v-if="data.length > 0">
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
                :itemName="['Modificar', 'Eliminar']"
                :itemRoute="[
                  '/dashboard/categories/sub-categories/edit-sub-categories/' +
                    da._id,
                  '/dashboard/categories/sub-categories/delete-sub-categories/' +
                    da._id,
                ]"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <h6 class="pl-2 pt-3 text-bold">
              No tienes ninguna sub categoría asociada.
            </h6>
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


