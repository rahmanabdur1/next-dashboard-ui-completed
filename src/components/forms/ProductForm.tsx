"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  productId: z.string().optional(),
  productName: z.string().min(1, { message: "Product name is required!" }),
  productImage: z.instanceof(File, { message: "Product image is required!" }).optional(),
  category: z.string().min(1, { message: "Category is required!" }),
  model: z.string().optional(),
  brand: z.string().optional(),
  origin: z.string().optional(),
  longDescription: z.string().optional(),
  shortDescription: z.string().optional(),
  quantityOfMeasure: z.string().min(1, { message: "Quantity of measure is required!" }),
  purchasePrice: z.number().min(0, { message: "Purchase price cannot be negative!" }).optional(),
  lastSalesPrice: z.number().min(0, { message: "Last sales price cannot be negative!" }),
  askSalesPrice: z.number().min(0.01, { message: "Ask sales price must be greater than 0!" }),
  barcode: z.string().optional(),
  warrantyPeriod: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ProductForm = ({ data }: { data?: any }) => {
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
      <h1 className="text-xl font-semibold">Create Product Form</h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Product ID/SKU"
          name="productId"
          defaultValue={data?.productId}
          register={register}
          error={errors.productId}
        />
        <InputField
          label="Product Name/Title"
          name="productName"
          defaultValue={data?.productName}
          register={register}
          error={errors.productName}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="productImage"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload Product Image</span>
          </label>
          <input type="file" id="productImage" {...register("productImage")} className="hidden" />
          {errors.productImage?.message && (
            <p className="text-xs text-red-400">{errors.productImage.message.toString()}</p>
          )}
        </div>
        <InputField
          label="Category"
          name="category"
          defaultValue={data?.category}
          register={register}
          error={errors.category}
        />
        <InputField
          label="Model"
          name="model"
          defaultValue={data?.model}
          register={register}
          error={errors.model}
        />
        <InputField
          label="Brand"
          name="brand"
          defaultValue={data?.brand}
          register={register}
          error={errors.brand}
        />
        <InputField
          label="Origin"
          name="origin"
          defaultValue={data?.origin}
          register={register}
          error={errors.origin}
        />
        <InputField
          label="Long Description"
          name="longDescription"
          defaultValue={data?.longDescription}
          register={register}
          error={errors.longDescription}
        />
        <InputField
          label="Short Description"
          name="shortDescription"
          defaultValue={data?.shortDescription}
          register={register}
          error={errors.shortDescription}
        />
        <InputField
          label="Quantity of Measure"
          name="quantityOfMeasure"
          defaultValue={data?.quantityOfMeasure}
          register={register}
          error={errors.quantityOfMeasure}
        />
        <InputField
          label="Purchase Price (Admin Only)"
          name="purchasePrice"
          type="number"
          defaultValue={data?.purchasePrice}
          register={register}
          error={errors.purchasePrice}
        />
        <InputField
          label="Last Sales Price"
          name="lastSalesPrice"
          type="number"
          defaultValue={data?.lastSalesPrice}
          register={register}
          error={errors.lastSalesPrice}
        />
        <InputField
          label="Ask Sales Price (Unit Price)"
          name="askSalesPrice"
          type="number"
          defaultValue={data?.askSalesPrice}
          register={register}
          error={errors.askSalesPrice}
        />
        <InputField
          label="Barcode / UPC"
          name="barcode"
          defaultValue={data?.barcode}
          register={register}
          error={errors.barcode}
        />
        <InputField
          label="Warranty Period"
          name="warrantyPeriod"
          defaultValue={data?.warrantyPeriod}
          register={register}
          error={errors.warrantyPeriod}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default ProductForm;
