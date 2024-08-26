//-----------------SCROLL-------------------
export const getScrollState = (state) => state.scroll.showScroll;
//-----------------HEADER-------------------
export const getHeaderState = (state) => state.header.showHeader;
//-----------------LOCATION-----------------
export const getLocationState = (state) => state.location.showLocation;
//-----------------THEME-----------------
export const getThemeState = (state) => state.theme.showTheme;
//-----------------SLIDER-----------------
export const getSliderState = (state) => state.slider.showSlider;
//-----------------LIGHT-BOX-----------------
export const getLightBoxState = (state) => state.lightBox.showLightBox;
//*************************************TABLES*********************************************************/
export const getTableState = (state) => state.table;
export const getCreateTableState = (state) => state.createTable;
export const getUpdateTableState = (state) => state.updateTable;
export const getStatusState = (state) => state.statusTable.status;
export const getDeleteTableState = (state) => state.deleteTable;
//*************************************VALUE FORM TABLES *********************************************************/
export const getValueTableState = (state) => state.valueTable.tableNumber;
export const getSetTableState = (state) => state.valueTable.status;

//*************************************VALUE FORM CATEGORY *********************************************************/
export const getNameState = (state) => state.valueCategories.name;
//*************************************CATEGORIES*********************************************************/
export const getCategoriesState = (state) => state.categories;
export const getCreateCategoryState = (state) => state.createCategory;
export const getUpdateCategoryState = (state) => state.updateCategory;
export const getDeleteCategoryState = (state) => state.deleteCategory;
export const getStatusCategoryState = (state) =>
  state.statusCategory.dataStatus;

//*************************************USERS*********************************************************/
export const getLoginState = (state) => state.login;
export const getMeState = (state) => state.getMe;
export const updateMeState = (state) => state.updateMe;
export const getAllUsersState = (state) => state.allUser;
export const getCreateUserState = (state) => state.createUser;
export const getAccessTokenState = (state) =>
  state.accessToken.getAccessToken.payload;
export const getSetStatusUsersState = (state) => state.statusUsers.statusUsers;
export const getUpdatePasswordState = (state) => state.updatePassword;
export const dataForgotPasswordState = (state) => state.forgotPassword;
export const resetPasswordState = (state) => state.resetPassword;
export const createUserState = (state) => state.createUser;
//value
export const valueFormFullNameState = (state) =>
  state.valueUsers.fullNameUpdateMe;
export const valueFormAvatarState = (state) => state.valueUsers.avatarUpdateMe;
export const fullNameState = (state) => state.valueUsers.fullName;
export const emailState = (state) => state.valueUsers.email;
export const passwordState = (state) => state.valueUsers.password;
export const roleState = (state) => state.valueUsers.role;
export const checkboxState = (state) => state.valueUsers.checkbox;

//*************************************MENU ITEM*********************************************************/
export const getAllMenuItemState = (state) => state.menuItem;
export const getStatusMenuItemState = (state) =>
  state.statusMenuItem.statusItemSlice;
export const getCreateMenuItemState = (state) => state.createMenuItem;
export const getDeleteMenuItemState = (state) => state.deleteMenuItem;
export const getUpdateMenuItemState = (state) => state.updateMenuItem;
export const menuOptionState = (state) => state.menuOption.options.payload;
//value
export const getValueNameState = (state) => state.valueMenu.getName;
export const getValueEngNameState = (state) => state.valueMenu.getEngName;
export const getValueDescriptionState = (state) =>
  state.valueMenu.getDescription;
export const getValuePriceState = (state) => state.valueMenu.getPrice;
export const getValueImageState = (state) => state.valueMenu.getImage;
export const getValueCategoryIdState = (state) => state.valueMenu.getCategoryId;
export const getValueOptionsState = (state) => state.valueMenu.getOptions;

//*************************************ORDERS*********************************************************/

export const orderByTableIdState = (state) => state.orderByTableId;
/****************************************STATISTICAL***************************************** */
export const statisticalArrListTableState = (state) =>
  state.statisticalTable.arrListTable;
export const statisticalLoadingTableState = (state) =>
  state.statisticalTable.isLoading;
export const dataPaymentState = (state) => state.dataStatistical.dataPayment;
export const dailyState = (state) => state.dailyStatistical.dataDaily;
/****************************************NOTIFICATION***************************************** */

export const titleState = (state) => state.notificationValues.title;
export const contentState = (state) => state.notificationValues.content;
export const summaryState = (state) => state.notificationValues.summary;
export const imagesState = (state) => state.notificationValues.images;
