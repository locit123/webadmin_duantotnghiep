import { FormatDay, Regex } from "../../../utils/FormDay";
import { apiPromotion } from "../../AxiosInstall";
import { toast } from "react-toastify";
const getPromotion = async (setListDataPromotion, setIsLoadingPromotion) => {
  try {
    setIsLoadingPromotion(true);
    const res = await apiPromotion.getApiPromotion();
    if (res && res.data && res.data.status === "success") {
      setIsLoadingPromotion(false);
      setListDataPromotion(res.data);
    } else {
      setListDataPromotion([]);
    }
  } catch (error) {
    setIsLoadingPromotion(false);
  }
};

const postPromotion = async (
  discount,
  discountType,
  maxUsage,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate,
  setListDataPromotion,
  setDiscountType,
  setIsLoading,
  setDiscount,
  setMaxUsage,
  setStartDate,
  setEndDate,
  setEventKey,
  setMinOrderValue,
  setMaxDiscount,
  setIsLoadingPromotion
) => {
  try {
    const data = {
      discount,
      discountType,
      maxUsage,
      minOrderValue,
      maxDiscount,
      startDate,
      endDate,
    };
    setIsLoading(true);
    const res = await apiPromotion.postApiPromotion(data);
    if (res && res?.data && res?.data?.status === "success") {
      toast.success(res?.data?.status);
      setDiscountType("");
      setDiscount("");
      setMaxUsage("");
      setStartDate("");
      setEndDate("");
      setEventKey("form khuyến mãi");
      setMinOrderValue("");
      setMaxDiscount("");
      setIsLoading(false);
      await getPromotion(setListDataPromotion, setIsLoadingPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};

const deletePromotion = async (
  id,
  setListDataPromotion,
  handleClose,
  setIsLoading,
  setIsLoadingPromotion
) => {
  try {
    setIsLoading(true);
    const res = await apiPromotion.deleteApiPromotion(id);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      handleClose();
      setIsLoading(false);
      await getPromotion(setListDataPromotion, setIsLoadingPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};
const updatePromotions = async (
  id,
  maxUsage,
  startDate,
  endDate,
  setListDataPromotion,
  setStatusPromotion,
  setDiscountType,
  setIsLoading,
  setIsLoadingPromotion
) => {
  try {
    const data = {
      maxUsage,
      startDate,
      endDate,
    };
    setIsLoading(true);
    const res = await apiPromotion.updateApiPromotion(id, data);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      setStatusPromotion(["create"]);
      setDiscountType("");
      setIsLoading(false);
      await getPromotion(setListDataPromotion, setIsLoadingPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};

const patchStatusPromotion = async (
  id,
  setListDataPromotion,
  setIsLoadingPromotion,
  setIsSelected
) => {
  try {
    const res = await apiPromotion.updateStatusPromotion(id);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      setIsSelected("");
      await getPromotion(setListDataPromotion, setIsLoadingPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    let newMess = mess?.match(Regex());
    toast.error(
      mess
        ? `Khuyến mãi đã hết hạn vào ${FormatDay(
            newMess[0]
          )}.Vui lòng cập nhật ngày kết thúc`
        : mess || status
    );
  }
};

const postResetAllPromotion = async (setListDataPromotion) => {
  try {
    const res = await apiPromotion.resetAllPromotion();
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.message);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};

const createPromotionWithPoint = async (
  discount,
  discountType,
  valuePoint,
  minOrderValue,
  maxDiscount,
  setListDataPromotion,
  setDiscount,
  setDiscountType,
  setMaxDiscount,
  setMinOrderValue,
  setEventKey,
  setIsLoading,
  setValuePoint
) => {
  try {
    const data = {
      discount,
      discountType,
      requiredPoints: valuePoint,
      minOrderValue,
      maxDiscount,
    };
    const res = await apiPromotion.postPromotionWithPoint(data);

    setIsLoading(true);

    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      setDiscountType("");
      setDiscount("");
      setEventKey("form khuyến mãi");
      setMinOrderValue("");
      setMaxDiscount("");
      setIsLoading(false);
      setValuePoint("");
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    setIsLoading(false);
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};
export {
  getPromotion,
  postPromotion,
  deletePromotion,
  updatePromotions,
  patchStatusPromotion,
  postResetAllPromotion,
  createPromotionWithPoint,
};
