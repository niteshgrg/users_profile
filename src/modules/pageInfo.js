const CHANGE_PAGE_NUMBER = "CHANGE_PAGE_NUMBER";
const CHANGE_TOTAL_PAGES = "CHANGE_TOTAL_PAGES";
const CHANGE_ITEMS_PER_PAGES = "CHANGE_ITEMS_PER_PAGES";

const initialState = {
  total: null,
  per_page: 2,
  current_page: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE_NUMBER:
      let { pageNumber } = action.payload;
      return {
        ...state,
        current_page: pageNumber
      };
    case CHANGE_TOTAL_PAGES:
      return {
        ...state,
        total: action.payload.total
      };
    case CHANGE_ITEMS_PER_PAGES:
      return {
        ...state,
        per_page: action.payload.numberItems
      };
    default:
      return state;
  }
};

export const changePageNumber = pageNumber => {
  return dispatch => {
    dispatch({
      type: CHANGE_PAGE_NUMBER,
      payload: {
        pageNumber
      }
    });
  };
};

export const changeTotalPages = total => {
  return dispatch => {
    dispatch({
      type: CHANGE_TOTAL_PAGES,
      payload: {
        total
      }
    });
  };
};

export const onChangeItemsPerPage = numberItems => {
  return dispatch => {
    dispatch({
      type: CHANGE_ITEMS_PER_PAGES,
      payload: {
        numberItems
      }
    });
  };
};
