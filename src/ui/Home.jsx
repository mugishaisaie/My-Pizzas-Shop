import React from "react";
import "../index.css";
import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
    {username === '' ?(<CreateUser />) :(
      <Button to="/menu" type='primary'> Hey <span className="font-bold text-slate-950">🤵{username}</span> Continue Ordering</Button>
    ) }
    </div>
  );
}

export default Home;
