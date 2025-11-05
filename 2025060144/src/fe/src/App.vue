<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <UApp>
        <Header />
        <UMain>
            <router-view />
        </UMain>
        <USeparator type="dashed" class="h-px" />
        <Footer />
    </UApp>

</template>
