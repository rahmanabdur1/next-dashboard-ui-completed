"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  productName: z.string().min(1, { message: "Product name is required!" }),
  stock: z.number().min(0, { message: "Stock cannot be negative!" }),
  unitPrice: z.number().min(0.01, { message: "Unit price must be greater than 0!" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1!" }),
  discount: z.number().optional(),
  tax: z.number().optional(),
  totalAmount: z.number().min(0, { message: "Total amount must be non-negative!" }),
});

type Inputs = z.infer<typeof schema>;

const SaleForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create Sale Form</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Product Name"
          name="productName"
          defaultValue={data?.productName}
          register={register}
          error={errors.productName}
        />
        <InputField
          label="Stock"
          name="stock"
          type="number"
          defaultValue={data?.stock}
          register={register}
          error={errors.stock}
        />
        <InputField
          label="Unit Price"
          name="unitPrice"
          type="number"
          defaultValue={data?.unitPrice}
          register={register}
          error={errors.unitPrice}
        />
        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          defaultValue={data?.quantity}
          register={register}
          error={errors.quantity}
        />
        <InputField
          label="Discount (%)"
          name="discount"
          type="number"
          defaultValue={data?.discount}
          register={register}
          error={errors.discount}
        />
        <InputField
          label="Tax/VAT (%)"
          name="tax"
          type="number"
          defaultValue={data?.tax}
          register={register}
          error={errors.tax}
        />
        <InputField
          label="Total Amount"
          name="totalAmount"
          type="number"
          defaultValue={data?.totalAmount}
          register={register}
          error={errors.totalAmount}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default SaleForm;
