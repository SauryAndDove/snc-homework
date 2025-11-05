<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import { onMounted, ref } from 'vue'

const props = defineProps<{ formID: string }>()
const { formID } = props;
const value = ref(0);
var items = ref<TimelineItem[]>([]);

var loading = ref(true);
var fetchFailed = ref(false);

async function getTimelineItems() {
    await fetch(`http://localhost:8050/api/form/${formID}/timeline?user_id=USR1`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched timeline data:', data);
            value.value = data[0]
            items.value = data[1];
        })
        .catch(error => {
            items.value = [];
            useToast().add({
                title: "无法获取时间线数据",
                description: error.message,
                color: "error",
                icon: "ic:baseline-sync-problem",
                progress: false,
                close: false
            })
            fetchFailed.value = true;
        });

    loading.value = false;

}

onMounted(() => {
    getTimelineItems();
});
</script>

<template>
    <UTimeline v-if="!loading && !fetchFailed" v-model="value" :items="items" />
    <UEmpty v-if="!loading && fetchFailed" title="无法获取时间线数据" ,description="这可能是因为数据暂未更新。如问题长时间存在，请联系组织管理员。"
        ,icon="ic:baseline-error-outline" />
</template>