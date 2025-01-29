import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './../assets/css/btnCreateCharla.css';

const CreateBtnCharla = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname !== "/charlas" && location.pathname !== "/profile") {
    return null;
  }  

  return (
    <button
      className="faq-button group flex justify-center items-center relative p-4 rounded-md bg-[#7289da] text-white hover:bg-[#5a6e8c] transition-all duration-500"
      onClick={() => navigate("/createcharla")} 
    >
      <i className="fa-solid fa-plus icon--white"></i>
      <span className="tooltip">Crear charla</span>
    </button>
  );
};

export default CreateBtnCharla;
