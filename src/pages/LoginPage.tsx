import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
import { LoginAndSignupType } from "../types/users";
import { auth } from "@/services/firebase";

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF9F6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleLogin: SubmitHandler<LoginAndSignupType> = async ({
    email,
    password,
  }: LoginAndSignupType) => {
    try {
      await login({ email, password });
      const userId = auth.currentUser?.uid;
      if (userId) {
        navigate("/mypage");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <AuthForm
      onSubmit={handleLogin}
      title="Gårdsförsäljning"
      buttonText="Logga in"
      error={error}
    />
  );
};

export default LoginPage;
