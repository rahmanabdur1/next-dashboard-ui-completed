"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  customerId: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  department: z.string().optional(),
  industry: z.string().optional(),
  multiEmail: z.string().array().optional(),
  multiMobile: z.string().array().optional(),
  multiPhone: z.string().array().optional(),
  fax: z.string().optional(),
  country: z.string().min(1, { message: "Country is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  city: z.string().min(1, { message: "City is required!" }),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  taxNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  previousDue: z.string().optional(),
  customerType: z.enum(["Individual", "Business"]),
  sellType: z.enum(["Retailer", "Wholesaler", "Dealer"]),
  currency: z.string().optional(),
  img: z.instanceof(File, { message: "Image is required!" }),
  paymentTerms: z.string().optional(),
  alternativeContact: z.string().optional(),
  billingAddress: z.string().optional(),
  shippingAddress: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const CustomerForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create or Update Customer</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Customer ID (Auto Generate)"
          name="customerId"
          defaultValue={data?.customerId}
          register={register}
          error={errors.customerId}
        />
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />
        <InputField
          label="Company Name"
          name="companyName"
          defaultValue={data?.companyName}
          register={register}
          error={errors.companyName}
        />
        <InputField
          label="Designation"
          name="designation"
          defaultValue={data?.designation}
          register={register}
          error={errors.designation}
        />
        <InputField
          label="Department"
          name="department"
          defaultValue={data?.department}
          register={register}
          error={errors.department}
        />
        <InputField
          label="Industry"
          name="industry"
          defaultValue={data?.industry}
          register={register}
          error={errors.industry}
        />
        <InputField
          label="Country"
          name="country"
          defaultValue={data?.country}
          register={register}
          error={errors.country}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="City"
          name="city"
          defaultValue={data?.city}
          register={register}
          error={errors.city}
        />
        <InputField
          label="State"
          name="state"
          defaultValue={data?.state}
          register={register}
          error={errors.state}
        />
        <InputField
          label="ZIP Code"
          name="zipCode"
          defaultValue={data?.zipCode}
          register={register}
          error={errors.zipCode}
        />
        <InputField
          label="Tax Number"
          name="taxNumber"
          defaultValue={data?.taxNumber}
          register={register}
          error={errors.taxNumber}
        />
        <InputField
          label="GST Number"
          name="gstNumber"
          defaultValue={data?.gstNumber}
          register={register}
          error={errors.gstNumber}
        />
        <InputField
          label="Previous Due"
          name="previousDue"
          defaultValue={data?.previousDue}
          register={register}
          error={errors.previousDue}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Customer Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("customerType")}
            defaultValue={data?.customerType}
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          {errors.customerType?.message && (
            <p className="text-xs text-red-400">
              {errors.customerType.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sell Type</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sellType")}
            defaultValue={data?.sellType}
          >
            <option value="Retailer">Retailer</option>
            <option value="Wholesaler">Wholesaler</option>
            <option value="Dealer">Dealer</option>
          </select>
          {errors.sellType?.message && (
            <p className="text-xs text-red-400">
              {errors.sellType.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Currency"
          name="currency"
          defaultValue={data?.currency}
          register={register}
          error={errors.currency}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload an Image</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Payment Terms"
          name="paymentTerms"
          defaultValue={data?.paymentTerms}
          register={register}
          error={errors.paymentTerms}
        />

        <InputField
          label="Alternative Contact"
          name="alternativeContact"
          defaultValue={data?.alternativeContact}
          register={register}
          error={errors.alternativeContact}
        />

        <InputField
          label="Billing Address"
          name="billingAddress"
          defaultValue={data?.billingAddress}
          register={register}
          error={errors.billingAddress}
        />
        <InputField
          label="Shipping Address"
          name="shippingAddress"
          defaultValue={data?.shippingAddress}
          register={register}
          error={errors.shippingAddress}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
