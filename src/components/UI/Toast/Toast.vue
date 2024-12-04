<script>
import ToastContent from "./ToastContent.vue";

export default {
  name: "toast-component",

  methods: {
    showToast(title, message, type, errors, duration, close) {
      let toast = errors
        ? this.$toast.error
        : type === "success"
        ? this.$toast.success
        : type === "warning"
        ? this.$toast.warning
        : this.$toast.error;

      const componentToast = () => ({
        component: ToastContent,
        props: {
          title,
          message,
          errors,
        },
      });

      const closeOnC = close && typeof close === "boolean" ? closeOnC : true;
      const time = duration ? duration : 5000;

      toast(componentToast(), {
        position: "top-right",
        timeout: time,
        closeOnClick: closeOnC,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },
};
</script>

<style>
@import "../../../styles/UI/styleToast.scss";
</style>
