import React from "react";

const CommentsSection = (props) => {
  const comments = props.comments;

  if (comments.length == 0) {
    return <h3>There are no comments yet!</h3>;
  } else {
    return (
      <ul className="commentsSection">
        {comments.map((comment) => {
          return (
            <li key={comment.commentBody} className="comment">
              {comment.posterName}: {comment.commentBody}
            </li>
          );
        })}
      </ul>
    );
  }
};

export default CommentsSection;
