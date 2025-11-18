<template>
    <div class="register-form-card">
        <div class="form-header">
            <h3>活动报名表</h3>
            <p>请填写以下信息完成报名，我们会在开始前发送提醒。</p>
        </div>
        <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto">
            <el-form-item label="活动名称" prop="activityName">
                <el-select v-model="form.activityId" placeholder="please select activity name">
                    <el-option v-for="item in activities" :key="item.id" :label="item.title" :value="item.id"
                        :disabled="item.status !== 0" />
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="学号" prop="stuID">
                <el-input v-model="form.stuID" />
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model="form.college" />
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input v-model="form.phoneNumber" />
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remarks" type="textarea" />
            </el-form-item>
            <el-form-item class="form-actions">
                <div class="actions-wrapper">
                    <el-button type="primary" @click="submitForm" :loading="isSubmitting">提交</el-button>
                    <el-button type="warning" plain @click="resetForm">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from "vue";
    import type { Activity } from "@/type/Activity";
    import { useActivityStore } from "@/stores/activity";
    import { useFormStore } from "@/stores/form";
    import { storeToRefs } from "pinia";
    import type { FormInstance, FormRules } from "element-plus";
    import type { Form } from "@/type/Form";
    import { ElMessage } from "element-plus";
    import axios from "axios";

    const activityStore = useActivityStore();
    const { activities, loading } = storeToRefs(activityStore);
    const { fetchActivities } = activityStore;

    const formStore = useFormStore();
    const { form } = storeToRefs(formStore);
    // const { resetForm } = formStore;

    const ruleFormRef = ref<FormInstance | null>(null);
    
    const rules = ref<FormRules<Form>>({
        activityId: [
            {
                required: true,
                message: "请选择活动名称",
                trigger: "change",
            },
        ],
        name: [
            {
                required: true, message: "请输入姓名", trigger: "blur"
            }
        ],
        stuID: [
            {
                required: true, message: "请输入学号", trigger: "blur"
            }
        ],
        college: [
            {
                required: true, message: "请输入学院", trigger: "blur"
            }
        ],
        phoneNumber: [
            {
                required: true, message: "请输入手机号", trigger: "blur"
            },
            {
                pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号", trigger: "blur"
            },
        ],
    });

    const isSubmitting = ref(false);

    const submitForm = async () => {
        const isValid = await ruleFormRef.value?.validate();
        if (!isValid) return;

        try {
            isSubmitting.value = true;

            if (!form.value.activityId) {
                ElMessage.error('请选择有效的活动');
                return;
            }
            
            await axios.post(`/api/events/${form.value.activityId}/registrations`, {
                student_name: form.value.name,
                student_id: form.value.stuID,
                college: form.value.college,
                phone: form.value.phoneNumber,
                remarks: form.value.remarks,
            });

            ElMessage.success('报名成功！');
            resetForm();
        } catch (error) {
            ElMessage.error('报名失败，请重试');
        } finally {
            isSubmitting.value = false;
        }
    }

    const resetForm = () => {
        ruleFormRef.value?.resetFields();
        // formStore.resetForm();
    }

    onMounted(async () => {
        await activityStore.fetchActivities();
    })

</script>

<style scoped>
.register-form-card {
    max-width: 640px;
    margin: 0 auto;
    padding: 32px 36px;
    border-radius: 24px;
    background: #ffffff;
    box-shadow: 0 24px 55px rgba(22, 82, 154, 0.12);
    border: 1px solid #e5edff;
}

.form-header {
    margin-bottom: 24px;
}

.form-header h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #0f172a;
}

.form-header p {
    margin: 8px 0 0;
    color: #6b7280;
    font-size: 14px;
}

.form-actions {
    margin-top: 16px;
}

.actions-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

@media (max-width: 640px) {
    .register-form-card {
        padding: 24px 20px;
    }

    .actions-wrapper {
        flex-direction: column-reverse;
    }

    .actions-wrapper .el-button {
        width: 100%;
    }
}
</style>
