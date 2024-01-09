import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";

const FlexContainer = styled.div`
  display: flex;
  gap: 8px; /* Adjust the gap as needed */
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;

const CommentViewer = ({
  comments,
  loading,
  error,
  isAuthenticated,
  newComment,
  onCommentChange,
  onCommentSubmit,
}) => {
  return (
    <div>
      <h2>Comments</h2>
      {loading ? (
        <div>Loading comments...</div>
      ) : error ? (
        <div>Error loading comments: {error}</div>
      ) : (
        <div>
          {comments && comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>
                  <strong>{comment.user.username}:</strong> {comment.body}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}

          {isAuthenticated && (
            <FlexContainer>
              <StyledInput
                value={newComment}
                onChange={onCommentChange}
                placeholder="Type your comment..."
              />
              <Button onClick={onCommentSubmit}>Upload Comment</Button>
            </FlexContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentViewer;
