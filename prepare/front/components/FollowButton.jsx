import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { me, followLoading, unfollowloading } = useSelector((state) => state.user);
    const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            });
        }
    }, [isFollowing]);
    return (
        <Button loading={followLoading || unfollowloading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우' }
        </Button>
    );
};

FollowButton.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.any,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
};

export default FollowButton;