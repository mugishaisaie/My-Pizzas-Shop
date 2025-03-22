import React from "react";
import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((store)=>store.user.username)

  if(!username) return null;
  return <div className="text-sm font-bold hidden md:block">🤵 {username}</div>;
}

export default UserName;
