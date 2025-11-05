<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const errorInfos: Record<number, any> = {
    404: {
        statusCode: 404,
        statusMessage: "Page Not Found",
        message: '页面不存在 请检查地址输入是否正确'
    },
    503: {
        statusCode: 503,
        statusMessage: "Service Unavailable",
        message: '服务暂时不可用 请稍后重试'
    }
}

const route = useRoute()
const code = ref(404)

watch(() => route.params.code, (newCode) => {
    if (newCode) {
        code.value = parseInt(newCode as string);
    }
}, { immediate: true });
</script>

<template>
    <UError :error="errorInfos[code]" :clear="{
        label: '返回主页',
        color: 'neutral',
        size: 'xl',
        icon: 'ic:baseline-arrow-back',
        class: 'rounded-full',
        to: '/'
    }" />
</template>