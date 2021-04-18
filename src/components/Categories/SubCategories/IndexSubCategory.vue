<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="row">
      <div class="col-lg-6">
        <h1 class="h3 mb-0 text-gray-800">
          Sub categorias <strong>({{ categoryObject.name }})</strong>
        </h1>
      </div>
      <div class="col-lg-6 pb-2">
        <router-link
          class="btn btn-primary float-right ml-2"
          :to="`/dashboard/categories/sub-categories/${categoryObject._id}/add`"
        >
          Adicionar elemento
        </router-link>
        <button class="btn btn-primary float-right" @click.prevent="back">
          <i class="fas fa-arrow-left"></i> Atrás
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Table
          :headers="['Nombre', 'Descripción', 'Imagen', 'Acciones']"
          :data="allSubCategories"
          nameTable="Lista de sub categorías"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../../DOMComponents/TableSubCategories";
import axios from "axios";
import { useRoute } from "vue-router";
import router from "@/router";
import { endpoint } from "../../../../backend/api";
import { inject, reactive, toRefs } from "vue";
export default {
  components: {
    Table,
  },
  setup() {
    const state = reactive({
      allSubCategories: [],
      categoryObject: {},
    });
    const $swal = inject("$swal");
    const route = useRoute();
    const getAllSubCategory = async () => {
      try {
        const getData = await axios({
          url: endpoint + "get-all-sub-category/" + route.params.id,
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (getData.status == 200) {
          state.allSubCategories = getData.data.all_sub_categories;
          state.categoryObject = getData.data.category_object;
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
    getAllSubCategory();
    const back = () => {
      router.go(-1);
    };
    return {
      ...toRefs(state),
      back,
    };
  },
};
</script>