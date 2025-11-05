<script setup lang="ts">
import BaseTab from './BaseTab.vue';

const tabItems = [{ "label": "待填写", "slot": "todo", icon: "ic:baseline-pending-actions" }, { "label": "已填写", "slot": "done", icon: "ic:baseline-done" }]
</script>

<template>
    <div class="flex items-start justify-center p-6">
        <UTabs :items="tabItems" class="w-2/3">
            <template #todo>
                <BaseTab tabType="todo" />
            </template>
            <template #done>
                <BaseTab tabType="done" />
            </template>
        </UTabs>
    </div>
</template>