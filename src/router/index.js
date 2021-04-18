import { createRouter, createWebHistory } from "vue-router";

const validateToken = (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Login") {
    return next("/403");
  }
  return next();
};
const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    redirect: "",
    component: () => import("@/views/Dashboard"),
    beforeEnter: [validateToken],
    children: [
      {
        path: "",
        component: () => import("@/components/Dashboard/Index"),
      },
      {
        path: "categories",
        name: "Categories",
        redirect: "",
        component: () => import("@/views/Categories"),
        children: [
          {
            path: "",
            component: () => import("@/components/Categories/Index"),
          },
          {
            path: "add",
            name: "AddCategories",
            component: () => import("@/components/Categories/Add"),
          },
          {
            path: "sub-categories/:id",
            name: "SubCategories",
            redirect: "",
            component: () =>
              import("@/components/Categories/SubCategories/Index"),
            children: [
              {
                path: "",
                name: "SubCategories",
                component: () =>
                  import(
                    "@/components/Categories/SubCategories/IndexSubCategory"
                  ),
              },
              {
                path: "add",
                name: "AddSubCategory",
                component: () =>
                  import(
                    "@/components/Categories/SubCategories/AddSubCategory"
                  ),
              },
            ],
          },
          {
            path: "edit-category/:id",
            name: "EditCategory",
            component: () => import("@/components/Categories/EditCategory"),
          },
          {
            path: "delete-category/:id",
            name: "DeleteCategory",
            component: () => import("@/components/Categories/DeleteCategory"),
          },
        ],
      },
      {
        path: "products",
        name: "Products",
        redirect: "",
        component: () => import("@/views/Products"),
        beforeEnter: [validateToken],
        children: [
          {
            path: "",
            component: () => import("@/components/Products/Index"),
          },
          {
            path: "add",
            name: "AddProducts",
            component: () => import("@/components/Products/Add"),
          },
        ],
      },

      {
        path: "users",
        name: "Users",
        redirect: "",
        component: () => import("@/views/Users"),
        beforeEnter: [validateToken],
        children: [{
          path: "",
          component: () => import("@/components/Users/Index"),
        }, {
          path: "add",
          name: "AddUser",
          component: () => import("@/components/Users/Add"),
        }],
      },
    ],
  },

  {
    path: "/401",
    name: "401",
    component: () => import("@/views/Errors/401"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/Errors/403"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Errors/404"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  linkActiveClass: "active",
});

export default router;
