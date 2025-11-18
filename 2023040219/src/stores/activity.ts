import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import type { Activity } from "@/type/Activity";
import axios from "axios";

export const useActivityStore = defineStore("activity", () => {
    const activities = reactive(<Activity[]>([]));
    const loading = ref(false);

    const fetchActivities = async () => {
        loading.value = true;
        try {
            const response = await axios.get('/api/events');
            activities.splice(0, activities.length, ...response.data);
        } catch (error) {
            console.error('获取活动列表失败:', error);
        } finally {
            loading.value = false;
        }
    }

    const getActivityNameList = () => {
        return activities.map(({ id, title }: Activity) => ({ id, title }));
    }

    const getActivityStatusById = (id: number): number | undefined => {
        const activity = activities.find((activity: Activity) => activity.id === id);
        return activity ? activity.status : undefined;
    }

    const getActivityById = (id: number): Activity | undefined => {
        return activities.find((activity: Activity) => activity.id === id);
    }

    return {
        activities,
        loading,
        fetchActivities
    }
})