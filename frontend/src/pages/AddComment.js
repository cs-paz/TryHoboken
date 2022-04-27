import React, { useState } from "react";
import axios from "axios";

const AddComment = (props) => {
  let id = props.id;
  let type = props.type;
  const [error, setError] = useState("");

  return (
    <div>
      <h3>{error}</h3>
      <form
        id="addCommentForm"
        onSubmit={(e) => {
          async function addComment() {
            let comment = {
              posterName: document.getElementById("commentName").value,
              commentBody: document.getElementById("commentBody").value,
            };
            if (!comment.posterName || !comment.commentBody) {
              setError("Must enter a name and a comment");
              e.preventDefault();
              return;
            }
            try {
              await axios.post(`http://localhost:3001/${type}/comment/${id}`, {
                comment: comment,
              });
              return comment;
            } catch (e) {
              console.log(e);
              return;
            }
          }
          addComment();
          document.getElementById("commentName").value = "";
          document.getElementById("commentBody").value = "";
        }}
        className="commentForm"
      >
        <label>
          Enter your name
          <input
            name="commentName"
            id="commentName"
            className="commentInput"
          ></input>
        </label>
        <label>
          Enter your comment here
          <textarea
            name="commentBody"
            id="commentBody"
            className="commentInput"
          ></textarea>
        </label>
        <input type="submit" value="Enter" id="commentSubmit"></input>
      </form>
    </div>
  );
};

export default AddComment;
