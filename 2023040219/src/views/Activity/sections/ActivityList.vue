<template>
    <div class="activity-table-wrapper">
        <el-table :data="activities" border stripe style="width: 100%">
            <el-table-column fixed prop="start_time" label="活动开始时间" width="160">
                <template #default="{ row }">
                    {{ formatDateTime(row.start_time) }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="活动名称" width="180" />
            <el-table-column prop="statusText" label="状态" width="140">
                <template #default="{ row }">
                    <span class="status-pill" :class="`status-${row.statusText}`">
                        {{ row.statusText }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="location" label="活动地点" width="140" />
            <el-table-column prop="signup_deadline" label="报名截止时间" width="180">
                <template #default="{ row }">
                    {{ formatDateTime(row.signup_deadline) }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="150">
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="handleClick(row)">详情</el-button>
                    <el-button link plain type="primary" size="small" @click="handleRegister(row.status)">报名</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="活动详情" width="600px">
            <ActivityDetail :activity="selectedActivity" />
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { useActivityStore } from '@/stores/activity'
    import { storeToRefs } from 'pinia'
    import { useRouter } from 'vue-router'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { Action } from 'element-plus'
    import type { Activity } from '@/type/Activity'
    import { onMounted, ref } from 'vue'
    import ActivityDetail from './ActivityDetail.vue'

    const router = useRouter()

    const dialogVisible = ref(false);
    const selectedActivity = ref<Activity | null>(null);
    const handleClick = (row: Activity) => {
        console.log('click')
        selectedActivity.value = row;
        dialogVisible.value = true;
    }

    const handleRegister = (status: number) => {
        if (status !== 0) {
            ElMessageBox.alert('该活动在当前时间段不可报名', '提示', {
                confirmButtonText: '确定',
                // callback: (action: Action) => {
                //     ElMessage({
                //         type: 'info',
                //         message: `action: ${action}`,
                //     })
                // },
            })
            return
        }
        router.push('/activity/register-detail')
    }

    const activityStore = useActivityStore()
    const { activities } = storeToRefs(activityStore)

    const formatDateTime = (dateTime: string) => {
        if (!dateTime) return '-';
        const date = new Date(dateTime);
        return date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    onMounted(async () => {
        await activityStore.fetchActivities();
    })

</script>

<style scoped>
.activity-table-wrapper {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    overflow-x: auto;
    border-radius: 20px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 18px 40px rgba(20, 65, 134, 0.08);
    background-color: #fff;
}

:deep(.el-table) {
    min-width: 680px;
}

:deep(.el-table__header-wrapper th) {
    background-color: #f4f6fb;
    color: #1f2a37;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 1px solid #e5e7eb;
}

:deep(.el-table__row) {
    transition: background-color 0.2s ease;
}

:deep(.el-table__row:hover) {
    background-color: #f0f7ff;
}

:deep(.el-table__body-wrapper td) {
    font-size: 14px;
    color: #374151;
}

:deep(.el-button.is-link) {
    padding: 0 4px;
}

.status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 72px;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    text-align: center;
}

.status-未开始 {
    background-color: #edf4ff;
    color: #1f6feb;
    border: 1px solid rgba(31, 111, 235, 0.2);
}

.status-进行中 {
    background-color: #ecfdf3;
    color: #047857;
    border: 1px solid rgba(4, 120, 87, 0.2);
}

.status-已结束 {
    background-color: #f7f7f9;
    color: #6b7280;
    border: 1px solid rgba(107, 114, 128, 0.2);
}
</style>
