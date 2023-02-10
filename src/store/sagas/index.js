import {takeEvery, put, fork, all} from "redux-saga/effects";
import {FETCH_FORM_SUCCESS, FETCH_FORM_ERROR, FETCH_FORM_DELETE_ITEM} from "../reducers/formReducer.js";
// убираем комментарии когда появляется куда отправлять данные
// import axios from "axios";

const sendForm = async(values) => {
    // await axios.post('url', {...values})
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
};

const deleteItemForm = async(values) => {
    // await axios.post('url', {...values})
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    })
};

export function* workerSagaForm(action) {
    try {
        // запускаем когда есть куда отправлять
        // yield call(sendForm, action.payload);
        yield put({
            type: FETCH_FORM_SUCCESS,
            payload: action.payload
        });

    } catch (e) {
        console.log('ошибка', e);
        yield put({
            type: FETCH_FORM_ERROR,
            payload: "Error: Произошла ошибка при отправке."
        });
    }
}

export function* workerSagaDeleteItem(action) {
    try {
        // запускаем когда есть куда отправлять
        // yield call(deleteItemForm, action.payload);
        yield put({
            type: FETCH_FORM_DELETE_ITEM,
            payload: action.payload
        });

    } catch (e) {
        console.log('ошибка', e);
        yield put({
            type: FETCH_FORM_ERROR,
            payload: "Error: Произошла ошибка при отправке."
        });
    }
}

export function* watchFormSaga() {
    yield takeEvery("FORM", workerSagaForm);
}
export function* watchDeleteItemSaga() {
    yield takeEvery("DELETE_ITEM", workerSagaDeleteItem);
}
export default function* rootSaga() {
    yield all([
        fork(watchFormSaga),
        fork(watchDeleteItemSaga)
    ])
}