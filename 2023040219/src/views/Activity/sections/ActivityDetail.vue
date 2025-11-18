<script lang="ts" setup>
    import type { Activity } from '@/type/Activity'
    import { defineProps } from 'vue'
    const props = defineProps<{
        activity: Activity | null
    }>();

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
</script>

<template>
    <div v-if="activity" class="activity-detail">
        <div class="detail-header">
            <h2 class="detail-title">{{ activity.title }}</h2>
            <span class="status-badge" :class="`status-${activity.status}`">
                {{ activity.statusText }}
            </span>
        </div>

        <div class="detail-content">
            <div class="info-section">
                <div class="info-item">
                    <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div class="info-text">
                        <span class="info-label">活动时间</span>
                        <span class="info-value">{{ formatDateTime(activity.start_time) }}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div class="info-text">
                        <span class="info-label">活动地点</span>
                        <span class="info-value">{{ activity.location }}</span>
                    </div>
                </div>

                <div class="info-item">
                    <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <div class="info-text">
                        <span class="info-label">报名截止</span>
                        <span class="info-value">{{ formatDateTime(activity.signup_deadline) }}</span>
                    </div>
                </div>
            </div>

            <div class="description-section" v-if="activity.description">
                <h3 class="section-title">活动详情</h3>
                <div class="description-content">
                    {{ activity.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.activity-detail {
    padding: 24px;
    background: #ffffff;
    border-radius: 12px;
}

.detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f2f5;
}

.detail-title {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;
    line-height: 1.3;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
}

.status-badge.status-0 {
    background-color: #edf4ff;
    color: #1f6feb;
    border: 1px solid rgba(31, 111, 235, 0.2);
}

.status-badge.status-1 {
    background-color: #ecfdf3;
    color: #047857;
    border: 1px solid rgba(4, 120, 87, 0.2);
}

.status-badge.status-2 {
    background-color: #f7f7f9;
    color: #6b7280;
    border: 1px solid rgba(107, 114, 128, 0.2);
}

.status-badge.status-3 {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid rgba(220, 38, 38, 0.2);
}

.detail-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.info-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    background: #f9fafb;
    border-radius: 10px;
    transition: all 0.2s ease;
}

.info-item:hover {
    background: #f3f4f6;
    transform: translateX(4px);
}

.info-icon {
    width: 24px;
    height: 24px;
    color: #3b82f6;
    flex-shrink: 0;
    margin-top: 2px;
}

.info-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.info-label {
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-value {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
}

.description-section {
    padding-top: 8px;
}

.section-title {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-title::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    background: linear-gradient(to bottom, #3b82f6, #2563eb);
    border-radius: 2px;
}

.description-content {
    padding: 20px;
    background: #f9fafb;
    border-radius: 10px;
    border-left: 4px solid #3b82f6;
    font-size: 15px;
    line-height: 1.8;
    color: #374151;
    white-space: pre-wrap;
    word-wrap: break-word;
}

@media (max-width: 640px) {
    .activity-detail {
        padding: 16px;
    }

    .detail-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .detail-title {
        font-size: 22px;
    }

    .info-item {
        padding: 12px;
    }

    .info-value {
        font-size: 14px;
    }
}
</style>