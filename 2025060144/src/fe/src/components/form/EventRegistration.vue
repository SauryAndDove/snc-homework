<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { SelectItem } from '@nuxt/ui'

import { object, string } from 'yup'

import onSubmit from './onSubmit';

const sexItems = ref<SelectItem[]>([{ id: "male", label: "男" }, { id: "female", label: "女" }])

const props = defineProps<{ unSubmitted: boolean, data: Record<string, any> }>()
const { data } = props;
const state = reactive(data);

const schema = object({
    name: string().required('姓名为必填项').max(50, '输入过长(<=50字)'),
    studentID: string().required('学号为必填项').matches(/^\d{10}$/, '学号必须为10位数字'),
    content: string().required('报名内容为必填项').max(500, '报名内容过长(<=500字)'),
    remark: string().max(500, '报名内容过长(<=500字)'),
})
</script>

<template>
    <div class="flex items-start justify-center p-6">
        <UCard class="w-full max-w-3xl">
            <template #header>
                <h2 class="text-2xl font-bold text-center">活动报名表单</h2>
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
                    </div>
                </div>

                <USeparator class="my-4" />
                <UFormField label="报名内容" name="content" required>
                    <UInput v-model="state.content" placeholder="请输入报名内容" />
                </UFormField>

                <USeparator class="my-4" />
                <UFormField label="备注" name="remark">
                    <UInput v-model="state.remark" class="w-2/3" />
                </UFormField>

                <div v-if="unSubmitted" class="flex justify-center pt-4">
                    <UButton type="submit" size="lg" class="px-12" loading-auto>
                        提交表单
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </div>
</template>