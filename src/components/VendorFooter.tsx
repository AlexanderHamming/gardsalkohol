import { Container, Row, Col } from "react-bootstrap";
import tiktokimg from "../assets/imgs/tiktok.png";
import facebookimg from "../assets/imgs/facebook.png";
import instagramimg from "../assets/imgs/instagram.png";

interface VendorFooterProps {
  Email?: string;
  phonenumber?: string;
  adress?: string;
  facebooklink?: string;
  instagramlink?: string;
  tiktoklink?: string;
  websitelink?: string;
  opentimes?: string;
}

const VendorFooter: React.FC<VendorFooterProps> = ({
  Email,
  phonenumber,
  adress,
  facebooklink,
  instagramlink,
  tiktoklink,
  websitelink,
  opentimes,
}) => {
  return (
    <footer className="VendorFooter py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Kontakt</h5>
            {Email && <p>Email: {Email}</p>}
            {phonenumber && <p>Telefon: {phonenumber}</p>}
          </Col>
          <Col md={4}>
            <h5>Följ oss</h5>
            <ul className="sociala-media-links">
              {instagramlink && (
                <li>
                  <a
                    href={instagramlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light"
                  >
                    <img src={instagramimg} alt="Instagram link" />
                  </a>
                </li>
              )}
              {facebooklink && (
                <li>
                  <a
                    href={facebooklink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light"
                  >
                    <img src={facebookimg} alt="Facebook link" />
                  </a>
                </li>
              )}
              {tiktoklink && (
                <li>
                  <a
                    href={tiktoklink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light"
                  >
                    <img src={tiktokimg} alt="Tiktok link" />
                  </a>
                </li>
              )}
            </ul>
            {websitelink && (
              <p>
                <a
                  href={websitelink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light"
                >
                  Besök vår hemsida för mer information!
                </a>
              </p>
            )}
          </Col>

          <Col md={4}>
            <h5>Besök oss</h5>
            {opentimes && <p>Öppettider: {opentimes}</p>}
            {adress && <p>Adress: {adress}</p>}
          </Col>
        </Row>
        <div className="text-center mt-3">
          <small>
            &copy; {new Date().getFullYear()} Gårdsförsäljning. All rights
            reserved.
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default VendorFooter;
