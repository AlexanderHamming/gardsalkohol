import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import Container from "react-bootstrap/Container";
import TablePic from "../assets/imgs/oya.png";

const CreateVendorLoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mypage");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container className="py-3 CreateVendorLoading">
      <div>
        <h1>Din sida skapas...</h1>
      </div>

      <div>
        <LoadingSpinner />
      </div>

      <div>
        <img src={TablePic} alt="Table with spirits" className="TablePic" />
      </div>
    </Container>
  );
};

export default CreateVendorLoadingPage;
