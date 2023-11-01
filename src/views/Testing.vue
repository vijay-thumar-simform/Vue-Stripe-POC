<template>
    <img @click="onClickHide" :src="props.order.img" alt="" srcset="">
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps(['order'])
const emit = defineEmits(['hideImage'])

const onClickHide = () => {
    emit('hideImage')
}
onMounted(() => {
    console.log('given props to this component Testing', props.order)
})
</script>