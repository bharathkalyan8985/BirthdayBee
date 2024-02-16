import { useState } from "react";
export default function Feed() {
  let [comment, setComment] = useState();
  return (
    <div>
      <input
        type="text"
        placeholder="comment here"
        onChange={(event) => {
          setComment(event.target.value);
        }}
      ></input>
    </div>
  );
}