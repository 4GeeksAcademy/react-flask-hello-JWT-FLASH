import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    fetch(`${backendUrl}/private`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
        
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.msg) {
          setMessage(data.msg);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        
        navigate("/login");
      });
  }, [navigate]);

  return <div>{message}</div>;
};

export default Private;
