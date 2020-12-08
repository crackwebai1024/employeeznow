
import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_USER_DATA_REQUEST: undefined,

  GET_EMPLOYER_DATA: undefined,
  GET_EMPLOYER_SUCCESS: undefined,
  GET_EMPLOYER_FAILURE: undefined,

  UPDATE_EMPLOYER_ACCOUNT: undefined,

  SAVE_FILTER_REQUEST: undefined,
  SAVE_FILTER_SUCCESS: undefined,
  SAVE_FILTER_FAILURE: undefined,

  GET_FILTER_LIST_REQUEST: undefined,
  GET_FILTER_LIST_SUCCESS: undefined,
  GET_FILTER_LIST_FAILURE: undefined,

  SEARCH_EMPLOYEE: undefined,
  SEARCH_EMPLOYEE_SUCCESS: undefined,

  INITIAL_LOADING: undefined,

  GET_SEARCH_RESULT: undefined,
  GET_SEARCH_RESULT_SUCCESS: undefined,

  SET_RETURN: undefined,
  REMOVE_FILTER: undefined,
  REMOVE_FILTER_SUCCESS: undefined,
  REMOVE_FILTER_FAILURE: undefined,

  ASK_INTEREST_REQUEST: undefined,
  ASK_INTEREST_SUCCESS: undefined,
  ASK_INTEREST_FAILURE: undefined,

  ASK_INTEREST_STATUS_HIDDEN: undefined,

  SET_FORM_VALUES: undefined,

  GET_SEARCH_EMPLOYEE: undefined,
  GET_SEARCH_EMPLOYEE_SUCCESS: undefined,
  GET_SEARCH_EMPLOYEE_FAILURE: undefined,

  PURCHASE_REQUEST: undefined,
  PURCHASE_SUCCESS: undefined,
  PURCHASE_FAILURE: undefined,
  PURCHASE_LIMITED: undefined,

  PAY_REQUEST: undefined,
  PAY_SUCCESS: undefined,
  PAY_FAILUED: undefined,

  INIT_LIMIT: undefined,
  INIT_CART_SUCCESS: undefined,

  ADD_TO_CART_REQUEST: undefined,
  ADD_TO_CART_SUCCESS: undefined,
  ADD_TO_CART_FAILURE: undefined,

  LOAD_CART_LIST: undefined,
  LOAD_CART_LIST_SUCCESS: undefined,

  UPDATE_CART_ITEMS: undefined,
  PAY_EVENT: undefined,
  GET_EVENT: undefined,

  CHARGE_REQUEST: undefined,
  CHARGE_SUCCESS: undefined,
  CHARGE_FAILURE: undefined,

  REMOVE_CART: undefined,
  REMOVE_CART_SUCCESS: undefined
});

const reducer = handleActions(
  new Map([
    [actions.getEmployerData, handlers.getEmployerData],
    [actions.getEmployerSuccess, handlers.getEmployerSuccess],
    [actions.getEmployerFailure, handlers.getEmployerFailure],

    [actions.updateEmployerAccount, handlers.updateEmployerAccount],
    
    [actions.saveFilterRequest, handlers.saveFilterRequest],
    [actions.saveFilterSuccess, handlers.saveFilterSuccess],
    [actions.saveFilterFailure, handlers.saveFilterFailure],

    [actions.getFilterListRequest, handlers.getFilterListRequest],
    [actions.getFilterListSuccess, handlers.getFilterListSuccess],
    [actions.getFilterListFailure, handlers.getFilterListFailure],

    [actions.searchEmployee, handlers.searchEmployee],
    [actions.searchEmployeeSuccess, handlers.searchEmployeeSuccess],
    
    [actions.initialLoading, handlers.initialLoading],
    
    [actions.getSearchResult, handlers.getSearchResult],
    [actions.getSearchResultSuccess, handlers.getSearchResultSuccess],

    [actions.setReturn, handlers.setReturn],

    [actions.removeFilter, handlers.removeFilter],
    [actions.removeFilterSuccess, handlers.removeFilterSuccess],
    [actions.removeFilterFailure, handlers.removeFilterFailure],

    [actions.askInterestRequest, handlers.askInterestRequest],
    [actions.askInterestSuccess, handlers.askInterestSuccess],
    [actions.askInterestFailure, handlers.askInterestFailure],
    [actions.askInterestStatusHidden, handlers.askInterestStatusHidden],
    // payment form values
    [actions.setFormValues, handlers.setFormValues],

    [actions.getSearchEmployee, handlers.getSearchEmployee],
    [actions.getSearchEmployeeSuccess, handlers.getSearchEmployeeSuccess],
    [actions.getSearchEmployeeFailure, handlers.getSearchEmployeeFailure],

    [actions.purchaseRequest, handlers.purchaseRequest],
    [actions.purchaseSuccess, handlers.purchaseSuccess],
    [actions.purchaseFailure, handlers.purchaseFailure],
    [actions.purchaseLimited, handlers.purchaseLimited],

    [actions.payRequest, handlers.payRequest],
    [actions.paySuccess, handlers.paySuccess],
    [actions.payFailure, handlers.payFailure],

    [actions.initLimit, handlers.initLimit],
    [actions.initCartSuccess, handlers.initCartSuccess],

    [actions.addToCartRequest, handlers.addToCartRequest],
    [actions.addToCartSuccess, handlers.addToCartSuccess],
    [actions.addToCartFailure, handlers.addToCartFailure],

    [actions.loadCartList, handlers.loadCartList],
    [actions.loadCartListSuccess, handlers.loadCartListSuccess],

    [actions.updateCartItems, handlers.updateCartItems],

    [actions.getEvent, handlers.getEvent],

    [actions.chargeRequest, handlers.chargeRequest],
    [actions.chargeSuccess, handlers.chargeSuccess],
    [actions.chargeFailure, handlers.chargeFailure],
    
    [actions.removeCart, handlers.removeCart],
    [actions.removeCartSuccess, handlers.removeCartSuccess],
    
  ]),
  initialState,
);

export default reducer;
