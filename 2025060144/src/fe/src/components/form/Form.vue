<script setup lang="ts">
import { watch, computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

import EventRegistrationForm from "./EventRegistration.vue"
import BaseInformation from './BaseInformation.vue';
import ReviewTimeline from './ReviewTimeline.vue';

const formMap: Record<string, any> = {
    '0001': EventRegistrationForm,
    '0002': BaseInformation
}

const state = reactive({
    formID: "",
    formProps: {} as Record<string, any>,
})

const route = useRoute();
const currentForm = computed(() => { return formMap[state.formID] || null })
var loading = ref(true);
var fetchFailed = ref(false);


async function getFormProps() {
    await fetch(`http://localhost:8050/api/form/${state.formID}?user_id=USR1`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched form data:', data);
            state.formProps = data;
        })
        .catch(error => {
            fetchFailed.value = true;
            state.formProps = {};
            useToast().add({
                title: "获取表单数据失败，请重试",
                description: error.message,
                color: "error",
                icon: "ic:baseline-sync-problem",
                progress: false
            })
        });

    loading.value = false;
}


watch(() => route.params.form_id, async (newID) => {
    if (newID) {
        state.formID = newID as string;
        await getFormProps();
    }
}, { immediate: true });
</script>

<template>

    <div class="flex items-center justify-center p-6 min-h-[400px]">
        <UProgress v-if="loading && !fetchFailed" class="w-1/3" />
        <div v-if="!loading && !fetchFailed" class="flex items-center justify-center">
            <component :is="currentForm" v-if="currentForm" v-bind="state.formProps" />
            <ReviewTimeline :formID="state.formID" v-if="!state.formProps.unSubmitted" />
        </div>
        <Empty v-if="!loading && fetchFailed" emptyType="formFetchFailed" />
    </div>

</template>