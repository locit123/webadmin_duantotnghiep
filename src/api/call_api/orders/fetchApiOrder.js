import { toast } from "react-toastify";
import { apiOrder } from "../../AxiosInstall";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const getAllOrder = async (setListDataOrder) => {
  NProgress.start();
  try {
    const res = await apiOrder.getOrder();
    if (res && res.data && res.data.status === "success") {
      NProgress.done();
      setListDataOrder(res.data.data);
    } else {
      setListDataOrder([]);
    }
  } catch (error) {
    NProgress.done();
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(message || status);
  }
};

export { getAllOrder };
