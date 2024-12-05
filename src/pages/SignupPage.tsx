import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthForm from "@/components/AuthForm";

const Signuppage = () => {
  const { signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "#FAF9F6";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signup({ email, password });
      navigate("/vendorcreation");
    } catch (err: any) {
      setError("Registrering misslyckades. Försök igen.");
    }
  };

  return (
    <AuthForm
      onSubmit={handleSignup}
      title="Skapa ditt konto"
      buttonText="Registrera"
      error={error}
      showConfirmPassword={true}
    />
  );
};

export default Signuppage;
