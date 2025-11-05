<script setup lang="ts">
import { computed } from 'vue';

import { useColorMode } from '@nuxt/ui/runtime/vue/stubs.js';

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

</script>

<template>
    <UFooter>
        <template #default>
            <div class="flex flex-col items-center justify-center gap-2">
                <ULink to="https://github.com/weinibuliu/FormSystem" target="_blank">
                    <UAvatar :src="isDark ? '/github-white.svg' : '/github.svg'" />
                </ULink>
                <span class="text-gray-500 text-sm">Powered by
                    <ULink to="https://vuejs.org" target="_blank">Vue.js</ULink> {{ ' ' }} & {{ ' ' }}
                    <ULink to="https://ui.nuxt.com" target="_blank">NuxtUI</ULink>
                </span>
            </div>
        </template>
    </UFooter>
</template>