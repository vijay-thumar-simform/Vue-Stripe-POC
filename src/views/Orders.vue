<script setup lang="ts">
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { ref, computed, onMounted, watch } from 'vue';
import { store } from "../store/store.js";
import { CloseCircleOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue';
// import Testing from './Testing.vue';
const pubKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const secKey = import.meta.env.VITE_STRIPE_PRIVATE_KEY
const checkoutRef = ref<StripeCheckout | null>(null)
const storeData = store();
const products = ref<any>(storeData.products)
const orders = storeData.ordersList

const addedOrders = computed(() => {
  const images = orders && orders.map((order) => {
    const index = products?.value.findIndex((o: any) => o.default_price === order?.price)
    return { img: products?.value[index]?.images[0], priceAmount: Number(products?.value[index].metadata?.price), quantity: order?.quantity }
  })
  return images
})

const cropDescription = (str: string, length: number = 20) => {
  console.log({ str })
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }

}

watch(() => storeData.products, (newProduct, oldProduct) => {
  console.log('The count has changed from ' + oldProduct + ' to ' + newProduct)
  products.value = newProduct
})

const totalAmount = computed(() => {
  const images = orders && orders.map((order) => {
    const index = products?.value.findIndex((o: any) => o?.default_price === order?.price)
    return Number(products?.value[index]?.metadata?.price) * order?.quantity
  })
  return images.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
})

// const showing = ref(true)
interface IProduct {
  name: string;
  default_price: string
  img: string;
  price: string;
  priceAmount: number;
}

const submit = () => {
  // @ts-ignore
  checkoutRef.value.redirectToCheckout()
}

const addProduct = (product: IProduct) => {
  storeData.addOrder(product?.default_price)
}
const removeProduct = (product: IProduct) => {
  storeData.removeOrder(product?.default_price)
}
const minusProduct = (product: IProduct) => {
  storeData.minusOrder(product?.default_price)
}

const getAllProducts = () => {
  const apiKey = secKey;

  // Define the URL for the API endpoint
  const apiUrl = 'https://api.stripe.com/v1/products'; // all products
  // const apiUrl = 'https://api.stripe.com/v1/payment_intents'; // all payments

  // Define the data parameters as an object
  const data = {
    limit: 100
  };

  // Create a URLSearchParams object to encode the data as query parameters
  // const params = new URLSearchParams(data);

  // Create a request object with headers for basic authentication
  const headers = new Headers({
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  // Make the Fetch GET request
  fetch(`${apiUrl}?${data}`, {
    method: 'GET',
    headers: headers,
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response data here
      console.log('Response data:', data);
      storeData.setProducts(data.data)
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
}

onMounted(async function () {
  getAllProducts()
})
</script>

<!-- **************** starting of template section **************** -->
<template>
  <div v-if="products.length > 0">
    <section class="product-container">
      <div v-for="product in products" :key="product?.price" class="card-container">
        <!-- <Testing v-if="showing" @hideImage="showing = false" :order="product" /> -->
        <a-card hoverable>
          <template #cover style="width: 200px; height: 200px;">
            <img :src="product?.img ?? product?.images[0]" alt="Product image" class="product-image">
          </template>
          <a-tooltip placement="top" class="description">
            <template #title>
              <span>{{ product?.description }}</span>
            </template>
            <p>{{ cropDescription(product?.description, 25) }}</p>
          </a-tooltip>
          <a-card-meta :title="product?.name">
            <template #description>Price: {{ product?.metadata?.price }}$</template>
          </a-card-meta>
          <template #actions>
            <PlusCircleOutlined fill="green" @click="addProduct(product)" />
            <MinusCircleOutlined @click="minusProduct(product)" />
            <CloseCircleOutlined @click="removeProduct(product)" />
          </template>
        </a-card>
        <!-- {{ product }} -->
        <!-- <button @click="getAllPayment()">get all payment call</button> -->
      </div>
    </section>
  </div>
  <div v-else>No Product for now!</div>

  <section class="card">
    <main>
      <a-divider class="page-divider" dashed />
      <div v-if="storeData.ordersList.length <= 0" class="hint-note">Add a Product to Purchase</div>
      <div v-if="storeData.ordersList.length > 0">
        <stripe-checkout :ref="`checkoutRef`" mode="payment" :pk="pubKey" :line-items="storeData.ordersList"
          :success-url="'http://localhost:5173/'" :cancel-url="'http://localhost:5173/failPayment'" />
        <button @click="submit">Pay now! {{ totalAmount }}$</button>
      </div>
      <a-divider class="page-divider" dashed />
    </main>
    <div v-if="storeData?.ordersList?.length > 0">
      <div class="orderImageContainer">
        <div v-for="order of addedOrders">
          <img class="order-image" :src="order?.img" alt="orderImage">
          <p>priceAmount: {{ order?.priceAmount * order?.quantity }}</p>
          <p>Quantity: {{ order?.quantity }}</p>
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

.description {
  padding: 0 0 16px 0;
}
</style>
