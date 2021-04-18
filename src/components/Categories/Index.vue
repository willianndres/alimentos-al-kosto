<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Categorias</h1>
      <router-link class="btn btn-primary" to="/dashboard/categories/add">
        Adicionar elemento
      </router-link>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Table
          :headers="['Nombre', 'Descripción', 'Imagen', 'Acciones']"
          :data="allCategories"
          nameTable="Lista de categorias"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../DOMComponents/TableCategories";
import { reactive, computed, inject } from "vue";
import { endpoint } from "../../../backend/api";
import axios from "axios";
import router from "@/router";
export default {
  components: {
    Table,
  },
  setup() {
    const state = reactive({
      allCategories: [],
    });
    const $swal = inject("$swal");
    const allCategories = computed(() => state.allCategories);

    const getallCategories = async () => {
      try {
        const getData = await axios({
          url: endpoint + "all-categories",
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(getData.data);
        if (getData.status == 200) {
          state.allCategories = getData.data.all_categories;
        }
      } catch (error) {

        if (error.request.status == 403) {
          localStorage.removeItem("token");
          router.push("/403");
        } else {
          $swal({
            icon: "error",
            title: "Parece que algo ha ido mal.",
            text: "Por favor notifica del error.",
          });
        }
      }
    };
    getallCategories();

    return {
      allCategories,
    };
  },
};
</script>