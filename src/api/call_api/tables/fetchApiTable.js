import { toast } from "react-toastify";
import { typeActionGetTables } from "../../../store/tables/getTables/actions";
import { apiTables } from "../../AxiosInstall";
import { typeActionCreateTables } from "../../../store/tables/createTable/actions";
import { typeActionUpdateTables } from "../../../store/tables/updateTable/actions";
import { typeActionDeleteTables } from "../../../store/tables/deleteTable/actions";
import { typeActionSetStatus } from "../../../store/tables/setStatus/actions";
import { valueFormTable } from "../../../store/valueForm/tables/actions";
import { typeActionUpdateStatusTables } from "../../../store/tables/updateStatusTable/actions";
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});
/******************************GET ALL TABLE***************************** */
const getAllTable = async (dispatch) => {
  NProgress.start();

  dispatch(typeActionGetTables.fetchGetTableRequest());
  try {
    const res = await apiTables.getTable();
    if (res?.data?.success || res?.data?.data) {
      NProgress.done();

      dispatch(typeActionGetTables.fetchGetTableSuccess(res?.data));
    }
  } catch (error) {
    NProgress.done();

    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionGetTables.fetchGetTableFailed(error));
    toast.error(status || message);
  }
};
/******************************POST TABLE***************************** */

const postTable = async (dispatch, tableName) => {
  dispatch(typeActionCreateTables.fetchCreateTableRequest());

  try {
    const res = await apiTables.createTable(tableName);
    if (res?.data?.status) {
      dispatch(typeActionCreateTables.fetchCreateTableSuccess(res?.data));
      toast.success(res?.data?.status);
      dispatch(valueFormTable.setTableNumber(""));
      await getAllTable(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionCreateTables.fetchCreateTableFailed(error));
    toast.error(status || message);
  }
};
/******************************PUT TABLE***************************** */

const putTable = async (dispatch, id, tableNumber) => {
  dispatch(typeActionUpdateTables.fetchUpdateTableRequest());
  try {
    const res = await apiTables.updateTable(id, tableNumber);
    if (res?.data?.status) {
      dispatch(typeActionUpdateTables.fetchUpdateTableSuccess(res?.data));
      toast.success(res?.data?.status);
      dispatch(valueFormTable.setTableNumber(""));
      dispatch(typeActionSetStatus.setStatusTable(["create"]));
      await getAllTable(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;

    dispatch(typeActionUpdateTables.fetchUpdateTableFailed(error));
    toast.error(status || message);
  }
};
/******************************DESTROY TABLE***************************** */

const destroyTable = async (dispatch, id, setShow) => {
  dispatch(typeActionDeleteTables.fetchDeleteTableRequest());

  try {
    const res = await apiTables.deleteTable(id);
    if (res?.data?.status) {
      dispatch(typeActionDeleteTables.fetchDeleteTableSuccess(res?.data));
      toast.success(res?.data?.status);
      setShow(false);
      dispatch(valueFormTable.setTableNumber(""));
      await getAllTable(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionDeleteTables.fetchDeleteTableFailed(error));
    toast.error(message || status);
  }
};
/******************************UPDATE STATUS TABLE***************************** */
const patchStatusTable = async (dispatch, id, status) => {
  dispatch(typeActionUpdateStatusTables.fetchUpdateStatusTableRequest());
  try {
    const res = await apiTables.updateStatusTable(id, status);
    if (res?.data?.status) {
      dispatch(
        typeActionUpdateStatusTables.fetchUpdateStatusTableSuccess(res?.data)
      );
      toast.success(res?.data?.status);
      await getAllTable(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdateStatusTables.fetchUpdateStatusTableFailed(error));
    toast.error(status || message);
  }
};
export { getAllTable, postTable, putTable, destroyTable, patchStatusTable };
