import { all, fork, put, delay, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from "../reducers/user"

function logInAPI(data) {
    return axios.post('/api/login', data);
}

function* logIn(action) {
    try {
        console.log('saga login');
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function logOutAPI() {
    return axios.post('/api/logout');
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}


function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}
function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}