export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '홍홍홍',
        },
        content: '첫 번쨰 게시글 #헤시태그 #익스프레스',
        Images: [
            { src: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fimage.kmib.co.kr%2Fonline_image%2F2021%2F0526%2F2021052520410312872_1621942863_0924193126.jpg&imgrefurl=http%3A%2F%2Fnews.kmib.co.kr%2Farticle%2Fview.asp%3Farcid%3D0924193126%26code%3D13200000%26sid1%3Dcul&tbnid=Nx6enJvyrAOfcM&vet=12ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygDegUIARC0AQ..i&docid=_pchHg5ohQlV6M&w=640&h=358&q=%EC%9D%B4%ED%84%B0%EB%84%90%EC%8A%A4&ved=2ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygDegUIARC0AQ' },
            { src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.etnews.com%2Fnews%2Farticle%2F2021%2F10%2F28%2Fcms_temp_article_28174127114272.jpg&imgrefurl=https%3A%2F%2Fm.etnews.com%2F20211028000320%3Fobj%3DTzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%253D%253D&tbnid=oIZm3Zff6_W7cM&vet=12ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygFegUIARC4AQ..i&docid=kvEyA4bPX2Z4WM&w=1000&h=750&itg=1&q=%EC%9D%B4%ED%84%B0%EB%84%90%EC%8A%A4&ved=2ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygFegUIARC4AQ' },
            { src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.chosun.com%2Fresizer%2FX_5bVDqLyuVtVISR9ARFETJKgmo%3D%2F428x534%2Fsmart%2Fcloudfront-ap-northeast-1.images.arcpublishing.com%2Fchosun%2FFPLICCA3S2GXFL7F3A7K64MDPY.jpg&imgrefurl=https%3A%2F%2Fwww.chosun.com%2Fentertainments%2Fentertain_photo%2F2021%2F08%2F19%2FWKQ5MJNJRC56CNLWPEWP7E2ABE%2F&tbnid=xgEIUSLFjnhj7M&vet=12ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygGegUIARC6AQ..i&docid=CE7HxdMayXjU6M&w=428&h=534&q=%EC%9D%B4%ED%84%B0%EB%84%90%EC%8A%A4&ved=2ahUKEwjA6OnSsYj0AhXOCd4KHeDLCzEQMygGegUIARC6AQ' },
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

const ADD_POST = 'ADD_POST';
export const addPist = {
    type: ADD_POST,
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
        case ADD_POST:
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