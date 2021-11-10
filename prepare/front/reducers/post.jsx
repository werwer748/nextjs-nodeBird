export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '홍홍홍',
        },
        content: '첫 번쨰 게시글 #헤시태그 #익스프레스',
        Images: [
            { src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726' },
            { src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg' },
            { src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg' },
        ],
        Comments: [{
            User: {
                nickname: 'zugo',
            },
            content: '오오 기깔나네요!'
        }, {
            User: {
                nickname: 'rugo',
            },
            content: '좋아요!!!'
        }]
    }],
    imagePaths: [],
    postAdded: false,
};

const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = (data) = {
    type: ADD_POST_REQUEST,
    data
};

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: '휴고',
    },
    images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
};

export default reducer;