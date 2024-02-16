import { useState } from "react";
export default function Home() {
  let [name, setName] = useState();
  let [no, setNo] = useState();
  let [date, setDate] = useState();
  let [msg, setMsg] = useState();
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="phone"
          placeholder="phone no"
          onChange={(event) => {
            setNo(event.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="date"
          placeholder="date"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="msg"
          onChange={(event) => {
            setMsg(event.target.value);
          }}
        ></input>
      </form>
    </div>
  );
}