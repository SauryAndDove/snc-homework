<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router';
    import { onMounted } from 'vue';
    import { useActivityStore } from '@/stores/activity';
    import type { Activity } from '@/type/Activity';
    
    const activityStore = useActivityStore();
    const activities = activityStore.activities;

    onMounted(() => {
        const nowTime = new Date()
        console.log('nowTime:', nowTime)
        activities.forEach((item: Activity) => {
            const activityDate = new Date(`${item.start_time}T00:00:00`)
            const isSameDay = activityDate.toDateString() === nowTime.toDateString()

            if (isSameDay) {
                item.statusText = '进行中'
            } else if (activityDate > nowTime) {
                item.statusText = '未开始'
            } else {
                item.statusText = '已结束'
            }
        })
    });
</script>

<template>
    <section class="activity-layout">
        <aside class="activity-sidebar">
            <div class="sidebar-header">
                <h2 class="sidebar-title">活动中心</h2>
                <p class="sidebar-subtitle">查看活动、了解须知、完成报名</p>
            </div>
            <nav class="sidebar-links">
                <RouterLink to="/activity/activity-list" class="activity-link">活动列表</RouterLink>
                <RouterLink to="/activity/before-register" class="activity-link">报名须知</RouterLink>
                <RouterLink to="/activity/register-detail" class="activity-link">我要报名</RouterLink>
                <RouterLink to="/activity/question" class="activity-link">常见问题</RouterLink>
                <RouterLink to="/activity/my-register" class="activity-link">我的报名</RouterLink>
            </nav>
        </aside>
        <div class="activity-detail">
            <div class="detail-surface">
                <RouterView />
            </div>
        </div>
    </section>
</template>

<style scoped>
.activity-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 32px;
    min-height: 70vh;
    padding: 24px 32px 48px;
    width: 100%;
}

.activity-sidebar {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e3e8ef;
    padding: 28px 20px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: sticky;
    top: 104px;
    align-self: flex-start;
    box-shadow: 0 20px 45px rgba(15, 82, 186, 0.12);
}

.sidebar-header {
    padding: 0 4px;
}

.sidebar-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #0f172a;
}

.sidebar-subtitle {
    margin: 6px 0 0;
    font-size: 14px;
    color: #6b7280;
}

.sidebar-links {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.activity-link {
    display: block;
    padding: 12px 18px;
    border-left: 3px solid transparent;
    border-radius: 14px;
    color: #1f2a37;
    text-decoration: none;
    font-weight: 500;
    transition: border 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.activity-link:hover,
.activity-link:focus-visible {
    border-color: #7cb4ff;
    background: #f0f6ff;
    color: #0f52ba;
}

:deep(.router-link-active.activity-link) {
    border-color: #1f8efa;
    background: #e7f2ff;
    color: #0f52ba;
    font-weight: 600;
    box-shadow: inset 0 0 0 1px rgba(31, 142, 250, 0.2);
}

.activity-detail {
    width: 100%;
}

.detail-surface {
    background: #fff;
    border-radius: 24px;
    padding: 36px;
    box-shadow: 0 20px 40px rgba(18, 83, 164, 0.08);
    min-height: 60vh;
    border: 1px solid #e4ecfa;
}

@media (max-width: 1080px) {
    .activity-layout {
        grid-template-columns: 220px 1fr;
        gap: 24px;
        padding: 16px;
    }
}

@media (max-width: 900px) {
    .activity-layout {
        grid-template-columns: 1fr;
    }

    .activity-sidebar {
        position: static;
        flex-direction: column;
    }

    .sidebar-links {
        flex-wrap: wrap;
        flex-direction: row;
    }

    .activity-link {
        flex: 1 1 calc(50% - 8px);
        border-radius: 999px;
        border-left: none;
        border: 1px solid transparent;
        text-align: center;
    }

    :deep(.router-link-active.activity-link) {
        border: 1px solid #1f8efa;
    }

    .detail-surface {
        padding: 24px;
    }
}
</style>
