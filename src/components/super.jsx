import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, Navigate } from "react-router-dom";
import apis from "../utils/apis";
const Super = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getRouteAccess = async () => {
      try {
        const response = await fetch(apis().getAccess, {
          method: "POST",
          body: JSON.stringify({ token: localStorage.getItem("passToken") }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
        }

        if (result?.status) {
          setIsAuth(true);
        }
      } catch (error) {

        toast.error(error.message);
      }
    };

    getRouteAccess();
  }, []);


  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Super;