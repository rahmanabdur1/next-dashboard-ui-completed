"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
    supplierId: z.string().optional(),
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
    img: z.instanceof(File, { message: "Image is required!" }),
    paymentTerms: z.string().optional(),
    website: z.string().optional(),
    currency: z.string().optional(),
    alternativeContact: z.string().optional(),
    bankAccountDetails: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const SupplierForm = ({ data }: { data?: any }) => {
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
            <h1 className="text-xl font-semibold">Create or Update Supplier</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Supplier ID (Auto Generate)"
                    name="supplierId"
                    defaultValue={data?.supplierId}
                    register={register}
                    error={errors.supplierId}
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
                    label="Multi E-Mail Address"
                    name="multiEmail"
                    defaultValue={data?.multiEmail}
                    register={register}
                    error={errors.multiEmail?.[0]} // Only pass the first error, if available
                />
                <InputField
                    label="Multi Mobile Number"
                    name="multiMobile"
                    defaultValue={data?.multiMobile}
                    register={register}
                    error={errors.multiMobile?.[0]} // Only pass the first error, if available
                />
                <InputField
                    label="Multi Phone Number"
                    name="multiPhone"
                    defaultValue={data?.multiPhone}
                    register={register}
                    error={errors.multiPhone?.[0]} // Only pass the first error, if available
                />

                <InputField
                    label="Fax"
                    name="fax"
                    defaultValue={data?.fax}
                    register={register}
                    error={errors.fax}
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
                    label="Website"
                    name="website"
                    defaultValue={data?.website}
                    register={register}
                    error={errors.website}
                />
                <InputField
                    label="Currency"
                    name="currency"
                    defaultValue={data?.currency}
                    register={register}
                    error={errors.currency}
                />
                <InputField
                    label="Alternative Contact"
                    name="alternativeContact"
                    defaultValue={data?.alternativeContact}
                    register={register}
                    error={errors.alternativeContact}
                />
                <InputField
                    label="Bank Account Details"
                    name="bankAccountDetails"
                    defaultValue={data?.bankAccountDetails}
                    register={register}
                    error={errors.bankAccountDetails}
                />
            </div>
            <button className="bg-blue-400 text-white p-2 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default SupplierForm;
