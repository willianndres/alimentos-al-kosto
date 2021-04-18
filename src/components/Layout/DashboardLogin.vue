<template>
  <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <TopNav />
        <slot />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import TopNav from "./TopNav";

export default {
  components: {
    Sidebar,
    Footer,
    TopNav,
  },
  setup() {},
};
</script>