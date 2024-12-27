import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button, Alert } from "react-bootstrap";

interface AuthFormProps {
  onSubmit: SubmitHandler<{
    email: string;
    password: string;
    confirmPassword?: string;
  }>;
  title: string;
  buttonText: string;
  error: string | null;
  showConfirmPassword?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  title,
  buttonText,
  error,
  showConfirmPassword = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ email: string; password: string; confirmPassword?: string }>();

  const password = watch("password");

  return (
    <div className="SignupContainer">
      <div className="centeredContainer">
        <h1>{title}</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            className="mb-3 formGroupStyle"
            controlId="formGroupEmail"
          >
            <Form.Label>E-postadress</Form.Label>
            <Form.Control
              type="email"
              placeholder="Namn@exempel.com"
              {...register("email", {
                required: "Email är obligatoriskt.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ogiltig e-postadress.",
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 formGroupStyle"
            controlId="formGroupPassword"
          >
            <Form.Label>Lösenord</Form.Label>
            <Form.Control
              type="password"
              placeholder="Lösenord"
              {...register("password", {
                required: "Lösenord är obligatoriskt.",
                minLength: {
                  value: 6,
                  message: "Lösenordet måste vara minst 6 tecken långt.",
                },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {showConfirmPassword && (
            <Form.Group
              className="mb-3 formGroupStyle"
              controlId="formGroupConfirmPassword"
            >
              <Form.Label>Bekräfta lösenord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Bekräfta lösenord"
                {...register("confirmPassword", {
                  required: "Bekräfta lösenord är obligatoriskt.",
                  validate: (value) =>
                    value === password || "Lösenorden matchar inte.",
                })}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button type="submit">{buttonText}</Button>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
