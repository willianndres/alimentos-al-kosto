<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-1 text-gray-800">Adicionar producto</h1>
      <button class="btn btn-primary" @click.prevent="back">
        <i class="fas fa-arrow-left"></i> Atrás
      </button>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-header">
            <h6 class="m-0 font-weight-bold text-primary">Agregar</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6 form-group">
                <label for="">Nombre del producto</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="name"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Precio</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Precio"
                  v-model="price"
                />
              </div>
              <div class="col-lg-6 form-grou">
                <label for="">Precio anterior</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Precio anterior"
                  v-model="old_price"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Imagen</label>
                <input type="file" class="form-control" @change="uploadFile" />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Categorías</label>
                <Multiselect
                  v-model="categories"
                  :options="allCategories"
                  mode="tags"
                  :searchable="true"
                  :createTag="true"
                />
              </div>
              <div class="col-lg-12 form-group text-right">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="addProducts"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { inject, reactive, toRefs } from "vue";
import axios from "axios";
import router from "@/router";
import { endpoint } from "../../../backend/api";

export default {
  components: {
    Multiselect,
  },
  setup() {
    const $swal = inject("$swal");
    const state = reactive({
      name: "",
      price: "",
      old_price: "",
      image: "",
      categories: [],
      allCategories: [],
    });
    const cleanAllInputs = () => {
      state.name = "";
      state.price = "";
      state.old_price = "";
      state.image = "";
      state.categories = [];
    };
    const uploadFile = (event) => {
      state.image = event.target.files;
    };
    const getAllCatsAndSubCats = async () => {
      try {
        const getData = await axios({
          url: endpoint + "all-categories",
          method: "get",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (getData.status == 200) {
          const allCatAndSubCats = [];
          if (
            getData.data.all_categories.length > 0 &&
            typeof getData.data.all_categories !== "undefined"
          ) {
            for (const cat of getData.data.all_categories) {
              allCatAndSubCats.push({
                label: cat.name,
                value: cat._id,
              });
              for (const subcats of cat.sub_categories) {
                allCatAndSubCats.push({
                  label: cat.name + " (" + subcats.name + ")",
                  value: cat._id + "-" + subcats._id,
                });
              }
            }
          }
          state.allCategories = allCatAndSubCats;
        }
      } catch (error) {
        if (error.status == 403) {
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
    getAllCatsAndSubCats();
    const addProducts = async () => {
      let formData = new FormData();
      for (const i of Object.keys(state.image)) {
        formData.append("files", state.image[i]);
      }
      formData.append("name", state.name);
      formData.append("price", state.price);
      formData.append("old_price", state.old_price);
      formData.append("categories", state.categories);
      try {
        const sendData = await axios({
          url: endpoint + "products-add",
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: formData,
        });
        if (sendData.status == 200) {
          $swal({
            icon: "success",
            title: "Buen trabajo.",
            text: sendData.data.message,
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dashboard/products");
            }
          });
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
    const back = () => {
      cleanAllInputs();
      router.go(-1);
    };
    return {
      back,
      ...toRefs(state),
      addProducts,
      uploadFile,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>