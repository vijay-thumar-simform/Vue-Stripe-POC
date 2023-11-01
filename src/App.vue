<script setup lang="ts">
// import Orders from './components/Orders.vue'
import 'https://js.stripe.com/v3/'

// var elements = stripe.elements({
//   clientSecret: 'CLIENT_SECRET',
// });

</script>
<!-- <script type="application/javascript" src="https://js.stripe.com/v3/"></script> -->

<template>
  <div class="navigation-container">
    <router-link to="/orders">Orders</router-link>
    <router-link to="/payments">Payments</router-link>
  </div>
  <!-- <Orders /> -->
  <RouterView />
</template>

<style scoped>
.navigation-container{
  background-color: rgba(0, 0, 0, 0.148);
  width: 100%;
  padding: 20px 0;
  margin-bottom: 12px;
}
a{
  text-decoration: none;
  padding: 18px;
}
a:active, a:visited{
  color: palevioletred;
}
</style>
