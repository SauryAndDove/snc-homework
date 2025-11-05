<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import Tabs from './tabs/Tabs.vue';

const loading = ref(true)

const router = useRouter();
onMounted(async () => {
    await fetch('http://localhost:8050/').then(response => {
        if (response.status !== 200) {
            throw new Error()
        }
        loading.value = false;
    }).catch(
        () => { router.replace("/error/503"); }
    )
})
</script>

<template>
    <div v-if="loading" class="flex items-center justify-center p-6 min-h-screen">
        <UProgress class="w-1/3" />
    </div>
    <Tabs v-else />

</template>