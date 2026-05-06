import { DataTablePermohonan } from "@/src/components/admin/DataTablePermohonan";
import { fakePermohonanData } from "@/src/data/fake-db/admin/DataPermohonan";

export default function DataPermohonanPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Data Permohonan NCAGE
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola dan verifikasi permohonan NCAGE yang masuk dari perusahaan.
        </p>
      </div>

      <DataTablePermohonan data={fakePermohonanData} />
    </div>
  );
}
