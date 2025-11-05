<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import Empty from '../Empty.vue';

const props = defineProps<{
    tabType: "todo" | "done"
}>()
const { tabType } = props

const formListData: Ref<Record<string, any>[]> = ref([])

function checkFormStatus(data: Record<string, any>) {
    const todo: boolean = !data.formData || Object.keys(data.formData).length === 0;

    if (tabType === "todo") {
        return todo;
    } else {
        return !todo;
    }
}

function checkFormList() {
    var formList = []

    for (const data of formListData.value) {
        if (checkFormStatus(data)) {
            formList.push(data)
        }
    }

    return formList;
}

onMounted(async () => {
    await fetch('http://localhost:8050/api/forms?user_id=USR1').then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        formListData.value = data;
    })
})

</script>

<template>
    <UPageList v-if="checkFormList().length > 0" divide>
        <UPageCard v-for="data in checkFormList()" :key="data.formID">
            <template #body>
                <ULink :to="`form/${data.formId}`">
                    <div>
                        <span>{{ data.title }}</span>
                        <span style="color: grey;"> ({{ data.formId }})</span>
                    </div>
                    <span class="text-gray-500 text-sm">{{ data.startDate }}-{{ data.endDate }}</span>
                </ULink>
            </template>
        </UPageCard>
    </UPageList>
    <Empty v-else :emptyType="tabType" />
</template>