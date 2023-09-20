<script setup lang="ts">
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { ref, computed } from 'vue';
import { store } from "../store/store.js";
import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
const pubKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const checkoutRef = ref<StripeCheckout | null>(null)
const storeData = store();
const products = storeData.products
const orders = storeData.ordersList

const addedOrders = computed(() => {
  const images = orders && orders.map((order) => {
    const index = products.findIndex((o) => o.price === order.price)
    return { img: products[index].img, priceAmount: products[index].priceAmount, quantity: order.quantity }
  })
  return images
})

const totalAmount = computed(() => {
  const images = orders && orders.map((order) => {
    const index = products.findIndex((o) => o.price === order.price)
    return products[index].priceAmount * order.quantity
  })
  return images.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
})

interface IProduct {
  name: string;
  img: string;
  price: string;
  priceAmount: number;
}

const submit = () => {
  // @ts-ignore
  checkoutRef.value.redirectToCheckout()
}

const addProduct = (product: IProduct) => {
  storeData.addOrder(product.price)
}
const removeProduct = (product: IProduct) => {
  storeData.removeOrder(product.price)
}
const minusProduct = (product: IProduct) => {
  storeData.minusOrder(product.price)
}
</script>

<!-- **************** starting of template section **************** -->
<template>
  <section class="product-container">
    <div v-for="product in products" :key="product.price" class="card-container">
      <a-card hoverable>
        <template #cover style="width: 200px; height: 200px;">
          <img :src="product.img" alt="Product image" class="product-image">
        </template>
        <a-card-meta :title="product.name">
          <template #description>priceAmount: {{ product.priceAmount }}</template>
        </a-card-meta>
        <template #actions>
          <PlusCircleOutlined fill="green" @click="addProduct(product)" />
          <MinusCircleOutlined @click="minusProduct(product)" />
          <CloseCircleOutlined @click="removeProduct(product)" />
        </template>
      </a-card>
    </div>
  </section>

  <section class="card">
    <main>
      <a-divider class="page-divider" dashed />
      <div v-if="storeData.ordersList.length <= 0" class="hint-note">Add a Product to Purchase</div>
      <div v-if="storeData.ordersList.length > 0">
        <stripe-checkout :ref="`checkoutRef`" mode="payment" :pk="pubKey" :line-items="storeData.ordersList"
          :success-url="'http://localhost:5173/'" :cancel-url="'http://localhost:5173/'" />
        <button @click="submit">Pay now! {{ totalAmount }}$</button>
      </div>
      <a-divider class="page-divider" dashed />
    </main>
    <div v-if="storeData.ordersList.length > 0">
      <div class="orderImageContainer">
        <div v-for="order of addedOrders">
          <img class="order-image" :src="order.img" alt="orderImage">
          <p>priceAmount: {{ order.priceAmount * order.quantity }}</p>
          <p>Quantity: {{ order.quantity }}</p>
        </div>
      </div>
    </div>
    <div v-else class="cart-section">
      No items inside cart
    </div>
  </section>
</template> 
<!-- **************** ending of template section **************** -->

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.read-the-docs {
  color: #888;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 50px;
  gap: 14px;
}

.product {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 360px;
  max-width: 400px;
}

.orderImageContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: auto auto;
  width: fit-content;
}

.order-image {
  height: 150px;
  width: 150px;
  overflow: hidden;
  object-fit: cover;
}

.card-container {
  width: 240px;
  border: none;
}

.card-container div {
  border: none;
}

.card-container .product-image {
  height: 200px;
  object-fit: cover;
  object-position: center;
}

.page-divider {
  margin: 20px 0;
  height: 2px;
  border-color: #7cb305
}

.cart-section {
  height: 204px;
}

.hint-note {
  height: 34px;
}
</style>
