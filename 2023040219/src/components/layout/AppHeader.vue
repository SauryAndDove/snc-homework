<script setup lang="ts">
    import { computed } from 'vue';
    import { RouterLink, RouterView, useRoute } from 'vue-router';

    const route = useRoute();
    const isActivityRoute = computed(() => route.path.startsWith('/activity'));
</script>

<template>
    <header class="app-header">
        <div class="navigate">
            <div class="logo">
                <span>Registration System 4 SNC</span>
            </div>
            <nav class="nav-links">
                <RouterLink to="/" class="nav-link">首页</RouterLink>
                <RouterLink to="/news" class="nav-link">新闻</RouterLink>
                <RouterLink to="/activity" class="nav-link">活动</RouterLink>
                <RouterLink to="/about" class="nav-link">关于</RouterLink>
                <RouterLink to="/login" class="nav-link">登录</RouterLink>
            </nav>
        </div>
    </header>
    <div :class="['view', { 'view--full': isActivityRoute }]">
        <RouterView />
    </div>    
</template>

<style scoped>
.app-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(90deg, #0f52ba, #1f8efa);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
}

.navigate {
    width: 100%;
    margin: 0;
    padding: 0 16px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    color: #fff;
}

.logo {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin-left: 48px;
}

.nav-links {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-right: 48px;
}

.nav-link {
    color: rgba(255, 255, 255, 0.88);
    text-decoration: none;
    font-weight: 500;
    padding: 10px 16px;
    border-radius: 999px;
    transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover,
.nav-link:focus-visible {
    background: rgba(255, 255, 255, 0.18);
    color: #fff;
    transform: translateY(-1px);
}

:deep(.router-link-active.nav-link) {
    background: rgba(255, 255, 255, 0.35);
    color: #fff;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.view {
    max-width: 1200px;
    margin: 24px auto;
    padding: 0 24px;
}

.view--full {
    max-width: none;
    width: 100%;
    margin: 24px 0;
    padding: 0;
}

@media (max-width: 768px) {
    .navigate {
        flex-direction: column;
        height: auto;
        padding: 16px;
        gap: 16px;
    }

    .nav-links {
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
