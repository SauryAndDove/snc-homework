<script setup lang="ts">
import { de } from '@nuxt/ui/runtime/locale/index.js';
import { title } from 'process';
import { computed } from 'vue'

const props = defineProps<{ emptyType: 'todo' | "done" | "formFetchFailed" }>()

const emptyPropsMap: Record<string, any> = {
    "todo": {
        title: "无待填写表单",
        description: "暂无待填写的表单。如您有任何疑问，可与组织管理员联系。",
        icon: "ic:baseline-file-copy",
    }, "done": {
        title: "无已填写表单",
        description: "暂无已填写的表单。如您有任何疑问，可与组织管理员联系。",
        icon: "ic:baseline-file-copy",
    }, "formFetchFailed": {
        title: "无法获取表单数据",
        description: "无法获取表单数据，请检查网络连接后重试。如问题仍然存在，请与组织管理员联系。",
        icon: "ic:baseline-error-outline"
    }
}

const emptyProps = computed(() => emptyPropsMap[props.emptyType])
</script>

<template>
    <UEmpty v-bind="emptyProps" />
</template>