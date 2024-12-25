import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import gf from "../assets/imgs/gf.png";
import { Dispatch, SetStateAction } from "react";

interface VendorNavbarProps {
  profileImageUrl: string;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
}

const VendorNavbar: React.FC<VendorNavbarProps> = ({
  profileImageUrl,
  setShowEditModal,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/inloggning");
  };
  return (
    <Container className="py-3">
      <Navbar className="VendorNavbar">
        <Container className="VendorNav">
          <div className="navbar-left">
            <Navbar.Brand href="#home">
              <img src={gf} alt="Logo" width={120} height={120} />
            </Navbar.Brand>
          </div>

          <Nav.Item className="edit-button">
            <Button
              variant="outline-primary"
              onClick={() => setShowEditModal(true)}
            >
              Redigera profil
            </Button>
          </Nav.Item>

          <div className="navbar-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown
                  title={
                    <img
                      src={profileImageUrl || ""}
                      alt=""
                      style={{
                        width: "54px",
                        height: "54px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                    />
                  }
                  id="dropdown"
                >
                  <NavDropdown.Item onClick={() => setShowEditModal(true)}>
                    Edit
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutUser}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </Container>
  );
};

export default VendorNavbar;
