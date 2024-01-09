import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentViewer from "../../components/comment/CommentViewer";
import { loadComments, unloadComments } from "../../modules/comments";
import { addComment } from "../../lib/api/comments";
import { useParams } from "react-router-dom";

const useCommentSubmission = (postId, dispatch) => {
  const user = useSelector((state) => state.user.user);

  const submitComment = async (newComment) => {
    try {
      const commentData = {
        body: newComment,
        user: {
          _id: user._id,
          username: user.username,
        },
        publishedDate: new Date(),
      };

      await addComment(postId, commentData);
      dispatch(loadComments(postId));
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error as needed
    }
  };

  return submitComment;
};

const CommentViewerContainer = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.user.user.username !== ""
  );
  const { comments, loading, error } = useSelector(({ post, loading }) => ({
    comments: post.post.comments,
    loading: loading["comments/LOAD_COMMENTS"],
    error: post.post.error,
  }));

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitComment = useCommentSubmission(postId, dispatch);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      submitComment(newComment);
      setNewComment("");
      setIsSubmitting(false);
    }
  }, [isSubmitting, newComment, submitComment]);

  useEffect(() => {
    dispatch(loadComments(postId));
    return () => {
      dispatch(unloadComments());
    };
  }, [dispatch, postId]);

  return (
    <CommentViewer
      comments={comments}
      loading={loading}
      error={error}
      isAuthenticated={isAuthenticated}
      newComment={newComment}
      onCommentChange={handleCommentChange}
      onCommentSubmit={handleCommentSubmit}
    />
  );
};

export default CommentViewerContainer;
