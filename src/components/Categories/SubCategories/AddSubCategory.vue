<template>
  <div class="container-fluid" id="container-wrapper">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-1 text-gray-800">Adicionar sub categorias</h1>
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
                <label for="">Nombre de la sub categoria</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                  v-model="name"
                />
              </div>
              <div class="col-lg-6 form-group">
                <label for="">Imagen</label>
                <input type="file" class="form-control" @change="uploadFile" />
              </div>
              <div class="col-lg-12 form-group">
                <label for="">Descripción</label>
                <textarea
                  name="description"
                  id="description"
                  class="form-control"
                  v-model="description"
                ></textarea>
              </div>
              <div class="col-lg-12 form-group text-right">
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="sendSubCategory"
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
import { inject, reactive, toRefs } from "vue";
import axios from "axios";
import router from "@/router";
import { useRoute } from "vue-router";
import { endpoint } from "../../../../backend/api";

export default {
  setup() {
    const $swal = inject("$swal");
    const route = useRoute();
    const state = reactive({
      name: "",
      description: "",
      fileImage: "",
    });

    const cleanAllInputs = () => {
      state.name = "";
      state.fileImage = "";
      state.description = "";
    };

    const back = () => {
      cleanAllInputs();
      router.go(-1);
    };

    const sendSubCategory = async () => {
      let formData = new FormData();
      for (const i of Object.keys(state.fileImage)) {
        formData.append("files", state.fileImage[i]);
      }
      formData.append("name", state.name);
      formData.append("description", state.description);
      formData.append("category_id", route.params.id);
      try {
        const sendData = await axios({
          url: endpoint + "sub-category-add",
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
              router.push(
                `/dashboard/categories/sub-categories/${route.params.id}`
              );
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

    const uploadFile = (event) => {
      state.fileImage = event.target.files;
    };

    return {
      back,
      sendSubCategory,
      uploadFile,
      ...toRefs(state),
    };
  },
};
</script>