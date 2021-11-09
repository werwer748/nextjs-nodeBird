import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() { //saga 기본꼴
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}