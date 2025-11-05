import type { FormSubmitEvent } from "@nuxt/ui";
import { da } from "@nuxt/ui/runtime/locale/index.js";

export default async function onSubmit(event: FormSubmitEvent<any>) {
  await new Promise((resolve) => setTimeout(resolve, 800)); // 模拟网络请求延时

  const toast = useToast();
  const data = event.data;

  await fetch(
    `http://localhost:8050/api/form/${data.formID}/update?user_id=USR1`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      const status = response.status;
      if (status === 201) {
        toast.add({
          title: "提交成功",
          color: "success",
          icon: "system-uicons:check",
          progress: false,
          close: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else if (status === 403) {
        toast.add({
          title: "提交失败",
          description: "用户 ID 无效，请联系组织管理员",
          color: "error",
          icon: "ic:baseline-sync-problem",
          progress: false,
          close: false,
        });
      } else if (status === 422) {
        toast.add({
          title: "提交失败",
          description: "提交参数无效，请联系组织管理员",
          color: "error",
          icon: "ic:baseline-sync-problem",
          progress: false,
          close: false,
        });
      } else {
        toast.add({
          title: "未知错误",
          description: "请联系组织管理员",
          color: "error",
          icon: "ic:baseline-sync-problem",
          progress: false,
          close: false,
        });
      }
    })
    .catch((error) => {
      toast.add({
        title: "未知错误",
        description: error.message,
        color: "error",
        icon: "ic:baseline-sync-problem",
        progress: false,
        close: false,
      });
    });
}
