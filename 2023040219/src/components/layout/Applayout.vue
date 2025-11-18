<script setup lang="ts">
    import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<template>
    <div class="app-layout">
        <AppHeader />
        <main class="app-main">
            <slot />
        </main>
    </div>
</template>