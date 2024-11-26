"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  expenseId: z.string().optional(),
  expenseDate: z.string().min(1, { message: "Expense date is required!" }),
  expenseFor: z.string().min(1, { message: "Expense for is required!" }),
  expenseAmount: z
    .number()
    .min(0.01, { message: "Expense amount must be greater than 0!" }),
  expenseBy: z.string().min(1, { message: "Expense by is required!" }),
  expenseCategory: z
    .string()
    .min(1, { message: "Expense category is required!" }),
  expenseReferenceNo: z.string().optional(),
  expenseNote: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

const ExpenseForm = ({ data }: { data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create Expense Form</h1>
      <div className="flex flex-wrap gap-4">
        <InputField
          label="Expense ID"
          name="expenseId"
          defaultValue={data?.expenseId}
          register={register}
          error={errors.expenseId}
        />
        <InputField
          label="Expense Date"
          name="expenseDate"
          type="date"
          defaultValue={data?.expenseDate}
          register={register}
          error={errors.expenseDate}
        />
        <InputField
          label="Expense For"
          name="expenseFor"
          defaultValue={data?.expenseFor}
          register={register}
          error={errors.expenseFor}
        />
        <InputField
          label="Expense Amount"
          name="expenseAmount"
          type="number"
          
          defaultValue={data?.expenseAmount}
          register={register}
          error={errors.expenseAmount}
        />
        <InputField
          label="Expense By"
          name="expenseBy"
          defaultValue={data?.expenseBy}
          register={register}
          error={errors.expenseBy}
        />
        <InputField
          label="Expense Category"
          name="expenseCategory"
          defaultValue={data?.expenseCategory}
          register={register}
          error={errors.expenseCategory}
        />
        <InputField
          label="Expense Reference No."
          name="expenseReferenceNo"
          defaultValue={data?.expenseReferenceNo}
          register={register}
          error={errors.expenseReferenceNo}
        />
        <InputField
          label="Expense Note"
          name="expenseNote"
          type="textarea"
          defaultValue={data?.expenseNote}
          register={register}
          error={errors.expenseNote}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default ExpenseForm;
