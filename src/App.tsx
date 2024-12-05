import "./assets/app.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";
import VendorCreationPage from "./pages/VendorCreationPage";
import VendorPage from "./pages/VendorPage";
import LoginPage from "./pages/LoginPage";
import GooglemapPage from "./pages/GooglemapPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import { APIProvider } from "@vis.gl/react-google-maps";
import RouteProtecter from "./components/routeProtecter";

const GooglemapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <APIProvider apiKey={GooglemapsKey}>
      <div id="App">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/registrering" element={<SignUpPage />} />
          <Route path="/inloggning" element={<LoginPage />} />
          <Route path="/googlemap" element={<GooglemapPage />} />
          <Route path="/vendor/:id" element={<VendorPage />} />
          <Route element={<RouteProtecter />}>
            <Route path="/vendorcreation" element={<VendorCreationPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </div>
    </APIProvider>
  );
}

export default App;
