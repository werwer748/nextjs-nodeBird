import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
    EllipsisOutlined,
    HeartOutlined,
    MessageOutlined,
    RetweetOutlined,
    HeartTwoTone,
} from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";
import { REMOVE_POST_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommendFormOpened] = useState(false);

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
        setCommendFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, []);

    const id = useSelector((state) => state.user.me?.id);
    const { removePostLoading } = useSelector((state) => state.post);

    return (
        <div style={{ marginBottom: 15 }}>
            <Card
                cover={post.Images && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    (
                        liked ? (
                            <HeartTwoTone
                                twoToneColor="#eb2f96"
                                key="heart"
                                onClick={onToggleLike}
                            />
                        )
                            :
                            <HeartOutlined key="heart" onClick={onToggleLike} />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover
                        key="more"
                        content={(
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                    </>
                                ) :
                                    <Button>신고</Button>
                                }
                            </Button.Group>
                        )}
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra={id && <FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayou="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.any,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),

    }).isRequired,
};

export default PostCard;