import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form, Button, Card, Container } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { VendorFormValues } from "@/types/vendors";

interface VendorFormProps {
  initialValues?: VendorFormValues;
  onSubmit: SubmitHandler<VendorFormValues>;
  title: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

const VendorForm: React.FC<VendorFormProps> = ({
  initialValues,
  onSubmit,
  title,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VendorFormValues>({
    defaultValues: initialValues,
  });

  const categoriesOptions: CategoryOption[] = [
    { value: "Vin", label: "Vin" },
    { value: "Öl", label: "Öl" },
    { value: "Cider", label: "Cider" },
    { value: "Snapps", label: "Snapps" },
  ];

  return (
    <Container className="VendorForm">
      <h1 className="mb-4 text-center">{title}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-4 shadow-sm p-3">
          <Card.Body>
            <h2 className="mb-3">Grundläggande information</h2>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Namn</Form.Label>
              <Form.Control
                type="text"
                placeholder="Företagsnamn"
                {...register("name", { required: "Namn är obligatoriskt" })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Beskrivning</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Beskriv vad din gårdsförsäljning erbjuder"
                {...register("description", {
                  required: "Beskrivning är obligatorisk",
                })}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formProfileImage" className="mb-3">
              <Form.Label>Profilbild</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                {...register("profileImageFile")}
              />
            </Form.Group>

            <Form.Group controlId="formCategories" className="mb-3">
              <Form.Label>Kategorier</Form.Label>
              <Controller
                name="categories"
                control={control}
                rules={{ required: "Minst en kategori krävs" }}
                render={({ field }) => (
                  <CreatableSelect
                    isMulti
                    options={categoriesOptions}
                    classNamePrefix="react-select"
                    placeholder="Välj eller skriv en kategori"
                    onChange={(selectedOptions) => {
                      const values = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      field.onChange(values);
                    }}
                    onBlur={field.onBlur}
                    value={
                      field.value
                        ? field.value.map((value: string) => ({
                            value,
                            label: value,
                          }))
                        : []
                    }
                  />
                )}
              />
              {errors.categories && (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {errors.categories.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="formOpenTimes" className="mb-3">
              <Form.Label>Öppettider</Form.Label>
              <Form.Control
                type="text"
                placeholder="10-16, Lördag-söndag"
                {...register("open_times")}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm p-3">
          <Card.Body>
            <h2 className="mb-3">Kontaktinformation</h2>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Adress</Form.Label>
              <Form.Control
                type="text"
                placeholder="Företagsadress"
                {...register("address", {
                  required: "Adress är obligatoriskt",
                })}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Telefonnummer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefonnummer"
                {...register("phone")}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email är obligatoriskt" })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm p-3">
          <Card.Body>
            <h2 className="mb-3">Digitala Kanaler</h2>
            <Form.Group controlId="formWebsite" className="mb-3">
              <Form.Label>Hemsida</Form.Label>
              <Form.Control
                type="url"
                placeholder="Hemsida"
                {...register("website")}
              />
            </Form.Group>

            <Form.Group controlId="formInstagram" className="mb-3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://instagram.com/dittföretag"
                {...register("instagram")}
              />
            </Form.Group>

            <Form.Group controlId="formFacebook" className="mb-3">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://facebook.com/dittföretag"
                {...register("facebook")}
              />
            </Form.Group>

            <Form.Group controlId="formTikTok" className="mb-3">
              <Form.Label>TikTok</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://tiktok.com/@dittföretag"
                {...register("tiktok")}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Button
          type="submit"
          className="mt-3 mb-3 btn-primary w-auto d-block mx-auto px-4 py-2"
        >
          Spara
        </Button>
      </Form>
    </Container>
  );
};

export default VendorForm;
