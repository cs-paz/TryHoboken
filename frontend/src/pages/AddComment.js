import React from "react";
import axios from "axios";

const AddComment = (props) => {
  let id = props.id;
  let type = props.type;

  return (
    <form
      id="addCommentForm"
      onSubmit={(e) => {
        async function addComment() {
          let comment = {
            posterName: document.getElementById("commentName").value,
            commentBody: document.getElementById("commentBody").value,
          };
          try {
            await axios.post(`http://localhost:3001/${type}/comment/${id}`, {
              comment: comment,
            });
          } catch (e) {
            console.log(e);
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
        <input
          name="commentBody"
          id="commentBody"
          className="commentInput"
        ></input>
      </label>
      <input type="submit" value="Enter" id="commentSubmit"></input>
    </form>
  );
};

export default AddComment;
