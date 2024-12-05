import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logopic from "../assets/imgs/logo.png";

interface VendorNavbarProps {
  profileImageUrl: string;
}

const VendorNavbar: React.FC<VendorNavbarProps> = ({ profileImageUrl }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/inloggning");
  };
  return (
    <Navbar className="VendorNavbar">
    <Container className="VendorNav">
      <div className="navbar-left">
        <Navbar.Brand href="#home">
          <img src={logopic} alt="Logo" width={250} height={70} />
        </Navbar.Brand>
      </div>
      <div className="navbar-right">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavDropdown
              title={
                <img
                  src={profileImageUrl || "/path/to/default/image.png"}
                  alt="Profile"
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
              <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>

  );
};

export default VendorNavbar;
