import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

const Box = ({ username }) => {
  const [user, setUser] = useState(null);
  const [gap, setGap] = useState(0);
  const sessKey = 'currentFollowers'+username;

  const fetchDetails = () => {
    fetch(`http://localhost:3001/instagram/${username}`)
      .then((res) => res.json())
      .then((userRsp) => {
        const currentFollowers = sessionStorage.getItem(sessKey);
        const gap = currentFollowers ? Number(userRsp.followers_count) - currentFollowers : 0;
        setGap(gap);
        setUser(userRsp);
        sessionStorage.setItem(sessKey, userRsp.followers_count);
      });
  };

  useEffect(() => {
    fetchDetails();
    sessionStorage.removeItem(sessKey);
    
    const intv = setInterval(fetchDetails, 20000);
    return () => {
      clearInterval(intv);
    };
  }, []);

  if (!user) {
    return <Spinner></Spinner>
  }

  return (
    <div className="box">
      <center>
        <img src={user?.username_picture_url} className="rounded-circle"/>
        <h3 className="title">{user?.username}</h3>
        <p>@{username}</p>
        <p className="mb-0 mt-3">Followers: </p>
        <p className="followers-num mt-0">
          {new Intl.NumberFormat('en-US').format(user?.followers_count)}
          {gap && 
            <span className={gap > 0 ? 'gap text-success' : 'gap text-danger'}>
              {gap}
            </span>
          }
        </p>
      </center>
    </div>
  );
};

export default Box;
