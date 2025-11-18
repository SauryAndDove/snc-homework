import { defineStore } from "pinia";
import type { Form } from "@/type/Form";
import { reactive } from "vue";

const defaultForm: Form = {
    activityId: '',
    activityName: '',
    name: '',
    stuID: '',
    college: '',
    phoneNumber: '',
    remarks: '',
}

export const useFormStore = defineStore("form", () => {
    const form = reactive({
        activityId: '',
        activityName: '',
        name: '',
        stuID: '',
        college: '',
        phoneNumber: '',
        remarks: '',
    }) as Form

    const resetForm = () => {
        form.activityId = ''
        form.activityName = ''
        form.name = ''
        form.stuID = ''
        form.college = ''
        form.phoneNumber = ''
        form.remarks = ''
        console.log('form reset')
    }

    return {
        form,
        resetForm
    }
})