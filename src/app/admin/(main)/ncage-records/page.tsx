import { DataTableNcageRecords } from "@/src/components/admin/DataTableNcageRecords";
import { fakeNcageRecordsData } from "@/src/data/fake-db/admin/NcageRecords";

export default function NcageRecordsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          NCAGE Records
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Rekap seluruh kode NCAGE yang telah diterbitkan beserta statusnya.
        </p>
      </div>

      <DataTableNcageRecords data={fakeNcageRecordsData} />
    </div>
  );
}
