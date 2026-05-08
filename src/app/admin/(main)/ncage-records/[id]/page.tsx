import React from "react";
import { getNcageRecordById } from "./actions";
import { FormEditNcageRecord } from "@/src/components/admin/FormEditNcageRecord";
import { notFound } from "next/navigation";

export default async function EditNcageRecordPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const initialData = await getNcageRecordById(id);

  if (!initialData) {
    notFound();
  }

  return (
    <div className="p-8 pb-20">
      <FormEditNcageRecord id={id} initialData={initialData} />
    </div>
  );
}
