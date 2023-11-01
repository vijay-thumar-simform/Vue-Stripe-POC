<template>
    <context-holder />
    <div>
        <div>Your payment fail something went wrong!!</div>
        <button @click="() => { router.push('/payments') }">Payment Page</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage();
import { onMounted } from 'vue'

onMounted(() => {
    messageApi.error('Something wrong with payment please try again',2)
})
const router = useRouter()
</script>