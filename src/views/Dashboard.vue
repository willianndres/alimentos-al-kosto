<template>
  <DashboardLogin>
    <router-view></router-view>
  </DashboardLogin>
</template>
<script>
import DashboardLogin from "../components/Layout/DashboardLogin";
export default {
  components: {
    DashboardLogin,
  },
  setup() {},
};
</script>
