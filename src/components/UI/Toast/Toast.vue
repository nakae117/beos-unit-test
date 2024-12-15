<script lang="ts">
import { ToastParams } from "@/Interfaces/toast-parms.interface";
import { defineComponent } from "vue";
import ToastContent from "@/components/UI/Toast/ToastContent.vue";

export default defineComponent({
  name: "ToastMixin",
  methods: {
    showToast({
      title,
      message,
      type,
      errors,
      duration,
      close,
    }: ToastParams): void {
      const toast = errors?.length
        ? this.$toast.error
        : {
            success: this.$toast.success,
            warning: this.$toast.warning,
            error: this.$toast.error,
          }[type] || this.$toast.error;

      const componentToast = {
        component: ToastContent,
        props: {
          title,
          message,
          errors,
        },
      };

      toast(componentToast, {
        position: "top-right",
        timeout: duration || 5000,
        closeOnClick: close ?? true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },
});
</script>
