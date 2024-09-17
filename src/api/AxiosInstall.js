import axios from "axios";

import { store } from "../store/store";
const baseUrl = `https://ngon-api.dangtai.id.vn/v1/`;
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.accessToken.getAccessToken.payload;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;

//*******************************USERS********************************* */
const api = {
  loginUser: (payload) => axiosInstance.post(`users/login-admin`, payload),
  getMe: () => axiosInstance.get(`users/me`),
  getUser: () => axiosInstance.get(`users`),
  createUser: (data) => axiosInstance.post(`users/register`, data),
  updateMe: (data) => axiosInstance.patch(`users/update-me`, data),
  deleteUser: (id) => axiosInstance.delete(`users/delete-user/${id}`),
  updatePassword: (currentPassword, newPassword) =>
    axiosInstance.patch(`users/update-password`, {
      currentPassword,
      newPassword,
    }),
  forgotPassword: (email) =>
    axiosInstance.post(`users/forgot-password`, { email }),
  resetPassword: (token, password) =>
    axiosInstance.patch(`users/reset-password/${token}`, { password }),
  historyUser: (id) =>
    axiosInstance.get(`payments/payments-history?userId=${id}`),
  verifyUser: (data) => axiosInstance.post(`users/verify`, data),
  sendVerifyUser: (email) =>
    axiosInstance.post(`users/resend-verification`, { email }),
  updateUser: (id, data) =>
    axiosInstance.patch(`users/update-user/${id}`, data),
  historyPromotions: () => axiosInstance.get(`statistics/promotion-statistics`),
};
//*******************************TABLES********************************* */

const apiTables = {
  getTable: () => axiosInstance.get("tables"),
  createTable: (tableNumber) => axiosInstance.post("tables", { tableNumber }),
  updateTable: (id, tableNumber) =>
    axiosInstance.patch(`tables/${id}`, { tableNumber }),
  deleteTable: (id) => axiosInstance.delete(`tables/${id}`),
  updateStatusTable: (id, status) =>
    axiosInstance.patch(`tables/update-status/${id}`, { status }),
  checkPeopleTable: (id) => axiosInstance.get(`tables/table-in-use/${id}`),
};
//*******************************CATEGORIES********************************* */

const apiCategories = {
  getCategories: () => axiosInstance.get(`categories`),
  createCategory: (name) => axiosInstance.post(`categories`, { name }),
  updateCategory: (id, name) =>
    axiosInstance.patch(`categories/${id}`, { name }),
  deleteCategory: (id) => axiosInstance.delete(`categories/${id}`),
};
//*******************************MENU ITEM********************************* */

const apiMenuItem = {
  getMenuItem: () => axiosInstance.get(`menu-items`),
  createMenuItem: (data) => axiosInstance.post(`menu-items`, data),
  deleteMenuItem: (id) => axiosInstance.delete(`menu-items/${id}`),
  putMenuItem: (id, data) => axiosInstance.patch(`menu-items/${id}`, data),
};
//*******************************Orders********************************* */
const apiOrder = {
  getOrder: () => axiosInstance.get(`payments/payments-history`),
  getConfirmOrder: (tableId) => axiosInstance.get(`tables/${tableId}/orders`),
  patchConfirmOrder: (tableId, itemId, type, quantity) =>
    axiosInstance.patch(
      `tables/${tableId}/orders/items/${itemId}?status=${type}&quantity=${quantity}`
    ),
};
//*******************************Promotions********************************* */
const apiPromotion = {
  getApiPromotion: () => axiosInstance.get(`promotions`),
  postApiPromotion: (data) => axiosInstance.post(`promotions`, data),
  deleteApiPromotion: (id) => axiosInstance.delete(`promotions/${id}`),
  updateApiPromotion: (id, data) =>
    axiosInstance.patch(`promotions/${id}`, data),
  updateStatusPromotion: (id) =>
    axiosInstance.patch(`promotions/update-status/${id}`),
  resetAllPromotion: () => axiosInstance.post(`promotions/reset-promotion`),
  postPromotionWithPoint: (data) =>
    axiosInstance.post(`promotions/create-promotion-with-points`, data),
  updateVersionPromotion: (id) =>
    axiosInstance.post(`promotions/reset-promotion-version/${id}`),
};
//*******************************Statistical********************************* */
const apiStatistical = {
  getApiPaymentStatistical: (type, startDate, endDate) => {
    if (startDate && endDate) {
      return axiosInstance.get(
        `statistics/revenue-by-payment-method?type=day&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      return axiosInstance.get(
        `statistics/revenue-by-payment-method?type=${type}`
      );
    }
  },
  getApiRevenueStatistical: (type, startDate, endDate) => {
    if (startDate && endDate) {
      return axiosInstance.get(
        `statistics/revenue-statistics?type=day&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      return axiosInstance.get(`statistics/revenue-statistics?type=${type}`);
    }
  },
  getApiTableStatistical: (type, startDate, endDate) => {
    if (startDate && endDate) {
      return axiosInstance.get(
        `statistics/revenue-by-table?type=day&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      return axiosInstance.get(`statistics/revenue-by-table?type=${type}`);
    }
  },

  getApiMenuItemStatistical: (type, startDate, endDate) => {
    if (startDate && endDate) {
      return axiosInstance.get(
        `statistics/menu-item-statistics?type=day&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      return axiosInstance.get(`statistics/menu-item-statistics?type=${type}`);
    }
  },
  getApiOrderStatistical: (type, startDate, endDate) => {
    if (startDate && endDate) {
      return axiosInstance.get(
        `statistics/order-statistics?type=day&startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      return axiosInstance.get(`statistics/order-statistics?type=${type}`);
    }
  },
  getApiDailyStatistical: () =>
    axiosInstance.get(`statistics/daily-statistics`),
  getApiCustomerStatistical: () =>
    axiosInstance.get(`statistics/valuable-customer`),
};

const apiNotifications = {
  getApiEvents: () => axiosInstance.get(`events`),
  postApiEvent: (data) => axiosInstance.post(`events`, data),
  deleteApiEvent: (id) => axiosInstance.delete(`events/${id}`),
  updateApiEvent: (id, data) => axiosInstance.patch(`events/${id}`, data),
};

const apiReviews = {
  getAllReviews: () => axiosInstance.get(`reviews`),
};
export {
  api,
  apiTables,
  apiCategories,
  apiMenuItem,
  apiOrder,
  apiPromotion,
  apiStatistical,
  apiNotifications,
  apiReviews,
};
