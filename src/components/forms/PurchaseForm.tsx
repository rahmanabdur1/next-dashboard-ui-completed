"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  purchaseId: z.string().optional(),
  supplierName: z.string().min(1, { message: "Supplier name is required!" }),
  purchaseDate: z.string().min(1, { message: "Purchase date is required!" }),
  productSearch: z.string().optional(),
  products: z
    .array(
      z.object({
        productName: z.string().min(1, { message: "Product name is required!" }),
        quantity: z.number().min(1, { message: "Quantity must be at least 1!" }),
        purchasePrice: z
          .number()
          .min(0, { message: "Purchase price cannot be negative!" })
          .optional(),
        lastSalesPrice: z
          .number()
          .min(0, { message: "Last sales price cannot be negative!" }),
        askSalesPrice: z
          .number()
          .min(0.01, { message: "Ask sales price must be greater than 0!" }),
        quantityUnit: z.string().min(1, { message: "Quantity unit is required!" }),
      })
    )
    .nonempty({ message: "At least one product must be added!" }),
});

type Inputs = z.infer<typeof schema>;

const PurchaseForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      products: data?.products || [{ productName: "", quantity: 1, quantityUnit: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create Purchase Form</h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Purchase ID"
          name="purchaseId"
          defaultValue={data?.purchaseId}
          register={register}
          error={errors.purchaseId}
        />
        <InputField
          label="Supplier Name"
          name="supplierName"
          defaultValue={data?.supplierName}
          register={register}
          error={errors.supplierName}
        />
        <InputField
          label="Purchase Date"
          name="purchaseDate"
          type="date"
          defaultValue={data?.purchaseDate}
          register={register}
          error={errors.purchaseDate}
        />
        <InputField
          label="Product Search"
          name="productSearch"
          defaultValue={data?.productSearch}
          register={register}
          error={errors.productSearch}
        />
      </div>

      <h2 className="text-lg font-semibold">Products</h2>
      <div className="flex flex-col gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-wrap gap-4 border-b pb-4">
            <InputField
              label="Product Name"
              name={`products.${index}.productName`}
              defaultValue={field.productName}
              register={register}
              error={errors.products?.[index]?.productName}
            />
            <InputField
              label="Quantity"
              name={`products.${index}.quantity`}
              type="number"
              defaultValue={field.quantity}
              register={register}
              error={errors.products?.[index]?.quantity}
            />
            <InputField
              label="Purchase Price (Admin Only)"
              name={`products.${index}.purchasePrice`}
              type="number"
              defaultValue={field.purchasePrice}
              register={register}
              error={errors.products?.[index]?.purchasePrice}
            />
            <InputField
              label="Last Sales Price"
              name={`products.${index}.lastSalesPrice`}
              type="number"
              defaultValue={field.lastSalesPrice}
              register={register}
              error={errors.products?.[index]?.lastSalesPrice}
            />
            <InputField
              label="Ask Sales Price (Unit Price)"
              name={`products.${index}.askSalesPrice`}
              type="number"
              defaultValue={field.askSalesPrice}
              register={register}
              error={errors.products?.[index]?.askSalesPrice}
            />
            <InputField
              label="Quantity Unit"
              name={`products.${index}.quantityUnit`}
              defaultValue={field.quantityUnit}
              register={register}
              error={errors.products?.[index]?.quantityUnit}
            />
            <button
              type="button"
              className="text-red-500"
              onClick={() => remove(index)}
            >
              Remove Product
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded-md"
          onClick={() =>
            append({
              productName: "",
              quantity: 1,
              purchasePrice: 0,
              lastSalesPrice: 0,
              askSalesPrice: 0.01,
              quantityUnit: "",
            })
          }
        >
          Add Product
        </button>
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default PurchaseForm;
