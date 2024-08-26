import { toast } from "react-toastify";
import { apiStatistical } from "../../AxiosInstall";
import { typeActionTableStatistical } from "../../../store/statisticals/tableActions";
const getPayment = async (
  type,
  startDate,
  endDate,
  setListPayment,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiPaymentStatistical(
      type,
      startDate,
      endDate
    );

    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      setListPayment(res.data.data);
    }
  } catch (error) {
    setIsLoading(false);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const getRevenue = async (
  type,
  startDate,
  endDate,
  setListRevenue,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiRevenueStatistical(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setListRevenue(res.data.data);
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
const getTable = async (type, startDate, endDate, dispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    dispatch(typeActionTableStatistical.fetchRequestTableStatistical());
    const res = await apiStatistical.getApiTableStatistical(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data && res.data.status === "success") {
      dispatch(
        typeActionTableStatistical.fetchSuccessTableStatistical(res.data.data)
      );
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const getMenuitemBestSelling = async (
  type,
  startDate,
  endDate,
  setListMenuitem,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiMenuItemStatisticalBestSelling(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setListMenuitem(res.data.data);
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const getMenuItem = async (
  type,
  startDate,
  endDate,
  setListDataMenuItem,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiMenuItemStatistical(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setListDataMenuItem(res.data.data);
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const getOrder = async (
  type,
  startDate,
  endDate,
  setListDataOrder,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiOrderStatistical(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      setListDataOrder(res.data.data);
    }
  } catch (error) {
    setIsLoading(false);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
const getAverage = async (
  type,
  startDate,
  endDate,
  setListDataAverage,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiAverageStatistical(
      type,
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      setListDataAverage(res.data.data);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
export {
  getPayment,
  getRevenue,
  getTable,
  getMenuitemBestSelling,
  getMenuItem,
  getOrder,
  getAverage,
};
