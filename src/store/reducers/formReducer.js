export const FETCH_FORM_SUCCESS = "FETCH_FORM_SUCCESS";
export const FETCH_FORM_ERROR = "FETCH_FORM_ERROR";
export const FETCH_FORM_DELETE_ITEM = "FETCH_FORM_DELETE_ITEM";

const initialState = {
    loading: false,
    error: null,
    list: [
        { id: 1, number: 1, date: 1675969668691, summ: '200', card: '1234 4567 7891 2345' },
        { id: 2, number: 2, date: 1675969668691, summ: '300', card: '9876 5432 5412 8529' },
        { id: 3, number: 3, date: 1675969668691, summ: '400', card: '7531 1597 4567 7598' },
    ]
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FORM_SUCCESS:
            return {loading: false, error: null, list: [...state.list, action.payload]};
        case FETCH_FORM_DELETE_ITEM:
            return {loading: false, error: null, list: [...action.payload]};
        case FETCH_FORM_ERROR:
            return {loading: false, error: action.payload, list: [...state.list]};
        default:
            return state;
    }
};