import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;