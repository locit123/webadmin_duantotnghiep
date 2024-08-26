import { apiNotifications } from "../../AxiosInstall";
import { toast } from "react-toastify";
const getEvent = async (setListDataEvent, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await apiNotifications.getApiEvents();
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      setListDataEvent(res.data.data);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const postEvent = async (
  title,
  summary,
  content,
  images,
  handleClose,
  setListDataEvent,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    if (images && images.length > 0 && Array.isArray(images)) {
      images.forEach((image) => {
        formData.append(`images`, image);
      });
    }
    const res = await apiNotifications.postApiEvent(formData);
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);

      toast.success(res.data.status);
      handleClose();
      await getEvent(setListDataEvent, setIsLoading);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};

const deleteEvent = async (
  eventId,
  handleClose,
  setListDataEvent,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiNotifications.deleteApiEvent(eventId);
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      toast.success(res.data.message);
      handleClose();
      await getEvent(setListDataEvent, setIsLoading);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
const updateEvent = async (
  id,
  title,
  content,
  summary,
  deleteImages,
  images,
  handleClose,
  setListDataEvent,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("summary", summary);
    deleteImages.forEach((item) => {
      formData.append("deleteImages[]", item);
    });
    images.forEach((nI) => {
      formData.append("images", nI);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1], "check form data");
    }
    const res = await apiNotifications.updateApiEvent(id, formData);
    if (res && res.data && res.data.status === "success") {
      setIsLoading(false);
      toast.success(res.data.status);
      handleClose();
      await getEvent(setListDataEvent, setIsLoading);
    }
  } catch (error) {
    setIsLoading(false);

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
export { getEvent, postEvent, deleteEvent, updateEvent };
