<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const toast = useToast();
onMounted(async () => {
    await fetch('http://localhost:8050/api/reset').then(response => {
        if (response.status == 200) {
            toast.add({ title: "数据库重置成功", color: "success", close: false, progress: false, icon: "ic:outline-terminal" })
        }
        else {
            toast.add({ title: "数据库重置失败", color: "error", close: false, progress: false, icon: "ic:outline-terminal" })
        }
    }).catch(error => {
        toast.add({ title: "数据库重置失败", description: error.message, color: "error", close: false, progress: false, icon: "ic:outline-terminal" })
    });

    router.replace('/');
})
</script>

<template>
    <div></div>
</template>