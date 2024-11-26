"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  products: z
    .array(
      z.object({
        productName: z.string().min(1, { message: "Product name is required!" }),
        stock: z.number().min(0, { message: "Stock cannot be negative!" }),
        unitPrice: z
          .number()
          .min(0, { message: "Unit price cannot be negative!" }),
        quantity: z.number().min(1, { message: "Quantity must be at least 1!" }),
        discount: z.number().min(0, { message: "Discount cannot be negative!" }),
        tax: z.number().min(0, { message: "Tax cannot be negative!" }),
        totalAmount: z.number().min(0, { message: "Total amount cannot be negative!" }),
      })
    )
    .nonempty({ message: "At least one product must be added!" }),
  subtotal: z.number().min(0, { message: "Subtotal cannot be negative!" }),
  totalDiscount: z.number().min(0, { message: "Total discount cannot be negative!" }),
  totalTax: z.number().min(0, { message: "Total tax cannot be negative!" }),
  totalGrand: z.number().min(0, { message: "Grand total cannot be negative!" }),
  customerNotes: z.string().optional(),
  taxType: z.enum(["Include", "Exclude"]),
  discountType: z.enum(["Fixed", "Percentage"]),
  taxRate: z.number().min(0, { message: "Tax rate cannot be negative!" }),
  discountRate: z.number().min(0, { message: "Discount rate cannot be negative!" }),
});

type Inputs = z.infer<typeof schema>;

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      products: [{ productName: "", stock: 0, unitPrice: 0, quantity: 1, discount: 0, tax: 0, totalAmount: 0 }],
      subtotal: 0,
      totalDiscount: 0,
      totalTax: 0,
      totalGrand: 0,
      taxType: "Include",
      discountType: "Percentage",
      taxRate: 0,
      discountRate: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create Question Form</h1>
      
      {/* Products List */}
      <div className="flex flex-col flex-wrap gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-wrap gap-4 border-b pb-4">
            <div className="w-full flex gap-4">
              <div className="flex flex-col flex-grow">
                <InputField
                  label="Product Name"
                  name={`products.${index}.productName`}
                  defaultValue={field.productName}
                  register={register}
                  error={errors.products?.[index]?.productName}
                />
                <InputField
                  label="Stock"
                  name={`products.${index}.stock`}
                  type="number"
                  defaultValue={field.stock}
                  register={register}
                  error={errors.products?.[index]?.stock}
                />
                <InputField
                  label="Unit Price"
                  name={`products.${index}.unitPrice`}
                  type="number"
                  defaultValue={field.unitPrice}
                  register={register}
                  error={errors.products?.[index]?.unitPrice}
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
                  label="Discount"
                  name={`products.${index}.discount`}
                  type="number"
                  defaultValue={field.discount}
                  register={register}
                  error={errors.products?.[index]?.discount}
                />
                <InputField
                  label="TAX"
                  name={`products.${index}.tax`}
                  type="number"
                  defaultValue={field.tax}
                  register={register}
                  error={errors.products?.[index]?.tax}
                />
                <InputField
                  label="Total Amount"
                  name={`products.${index}.totalAmount`}
                  type="number"
                  defaultValue={field.totalAmount}
                  register={register}
                  error={errors.products?.[index]?.totalAmount}
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => remove(index)}
                >
                  Remove Product
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded-md"
          onClick={() =>
            append({
              productName: "",
              stock: 0,
              unitPrice: 0,
              quantity: 1,
              discount: 0,
              tax: 0,
              totalAmount: 0,
            })
          }
        >
          Add Product
        </button>
      </div>

      {/* Order Summary */}
      <div className="mt-4 flex  flex-wrap gap-6">
        <InputField
          label="Subtotal"
          name="subtotal"
          type="number"
          register={register}
          error={errors.subtotal}
        />
        <InputField
          label="Total Discount"
          name="totalDiscount"
          type="number"
          register={register}
          error={errors.totalDiscount}
        />
        <InputField
          label="Total TAX"
          name="totalTax"
          type="number"
          register={register}
          error={errors.totalTax}
        />
        <InputField
          label="Total Grand"
          name="totalGrand"
          type="number"
          register={register}
          error={errors.totalGrand}
        />
      </div>

      {/* Tax and Discount Information */}
    
        <div className="flex flex-wrap mt-4 gap-4">
          <InputField
            label="Tax Type"
            name="taxType"
            as="select"
            options={["Include", "Exclude"]}
            register={register}
            error={errors.taxType}
          />
          <InputField
            label="Tax Rate"
            name="taxRate"
            type="number"
            register={register}
            error={errors.taxRate}
          />
        </div>

        <div className="flex gap-4">
          <InputField
            label="Discount Type"
            name="discountType"
            as="select"
            options={["Fixed", "Percentage"]}
            register={register}
            error={errors.discountType}
          />
          <InputField
            label="Discount Rate"
            name="discountRate"
            type="number"
            register={register}
            error={errors.discountRate}
          />
        </div>
 

      {/* Customer Notes */}
      <InputField
        label="Customer Notes"
        name="customerNotes"
        as="textarea"
        register={register}
        error={errors.customerNotes}
      />

      <button className="bg-blue-400 text-white p-2 rounded-md">Submit Order</button>
    </form>
  );
};

export default QuestionForm;
