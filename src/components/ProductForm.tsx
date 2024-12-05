// ProductForm.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

export interface ProductFormValues {
  name: string;
  price: number;
  description: string;
  productImageFile: FileList;
}

interface ProductFormProps {
  onSubmit: SubmitHandler<ProductFormValues>;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="productName">
        <Form.Label>Produktnamn</Form.Label>
        <Form.Control
          type="text"
          placeholder="Produktnamn"
          {...register("name", { required: "Produktnamn är obligatoriskt" })}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="productPrice">
        <Form.Label>Pris</Form.Label>
        <Form.Control
          type="number"
          placeholder="Pris"
          {...register("price", {
            required: "Pris är obligatoriskt",
            valueAsNumber: true,
          })}
          isInvalid={!!errors.price}
        />
        <Form.Control.Feedback type="invalid">
          {errors.price?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="productDescription">
        <Form.Label>Beskrivning</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Beskrivning"
          {...register("description", {
            required: "Beskrivning är obligatorisk",
          })}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="productImageFile">
        <Form.Label>Produktbild</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          {...register("productImageFile", {
            required: "Produktbild är obligatorisk",
          })}
        />
        {errors.productImageFile && (
          <Form.Control.Feedback type="invalid">
            {errors.productImageFile.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button type="submit">Lägg till produkt</Button>
    </Form>
  );
};

export default ProductForm;
