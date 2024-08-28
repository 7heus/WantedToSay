import { useNavigate } from "react-router-dom";
import notFoundPic from "../assets/404-error.jpg";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="">
        <img src={notFoundPic} alt="Not found Page" className="notFoundPic" />
    </div>
);
}