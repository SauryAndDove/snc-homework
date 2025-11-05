<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { SelectItem } from '@nuxt/ui'

import { object, string } from 'yup'

import onSubmit from './onSubmit';

const sexItems = ref<SelectItem[]>([{ id: "male", label: "男" }, { id: "female", label: "女" }])
const classItems = ref<SelectItem[]>([{ id: "FSA2505", label: "法商A2505" }, { id: "FSA2506", label: "法商A2506" }, { id: "FSA2507", label: "法商A2507" }])
const props = defineProps<{ unSubmitted: boolean, data: Record<string, any> }>()
const { data } = props;
const state = reactive(data);

const schema = object({
    name: string().required('姓名为必填项').max(50, '输入过长(<=50字)'),
    studentID: string().required('学号为必填项').matches(/^\d{10}$/, '学号必须为10位数字'),
})
</script>

<template>
    <div class="flex items-start justify-center p-6">
        <UCard class="w-full max-w-3xl">
            <template #header>
                <h2 class="text-2xl font-bold text-center">基本信息表单</h2>
            </template>
            <UForm :schema="schema" :state="state" @submit="onSubmit" :loading-auto="true" :disabled="!unSubmitted"
                class="space-y-6">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <UFormField label="姓名" name="name" required>
                            <UInput v-model="state.name" placeholder="请输入姓名" />
                        </UFormField>
                        <UFormField label="学号" name="studentID" required>
                            <UInput v-model="state.studentID" placeholder="请输入学号" />
                        </UFormField>
                        <UFormField label="性别" name="sex" required>
                            <USelect v-model="state.sex" value-key="id" :items="sexItems" />
                        </UFormField>
                        <UFormField label="行政班级" name="class_" required>
                            <USelect v-model="state.class_" value-key="id" :items="classItems" placeholder="法商AXXXX" />
                        </UFormField>
                    </div>
                </div>

                <div v-if="unSubmitted" class="flex justify-center pt-4">
                    <UButton type="submit" size="lg" class="px-12" loading-auto>
                        提交表单
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </div>
</template>