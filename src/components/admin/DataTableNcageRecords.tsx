"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import type {
  NcageRecord,
  StatusKodeNcage,
} from "@/src/data/fake-db/admin/NcageRecords";

const statusConfig: Record<
  StatusKodeNcage,
  { className: string; dot: string }
> = {
  Aktif: {
    className: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  "Tidak Aktif": { className: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
};

interface DataTableNcageRecordsProps {
  data: NcageRecord[];
}

export function DataTableNcageRecords({ data }: DataTableNcageRecordsProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<NcageRecord>[] = [
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              router.push(`/admin/ncage-records/${row.original.id}`)
            }
            title="Lihat Detail"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all shadow-sm shadow-sky-500/30"
          >
            <i className="ri-eye-line text-white text-[15px]" />
          </button>

          <button
            onClick={() => {
              if (row.original.sertifikat_url) {
                window.open(
                  row.original.sertifikat_url,
                  "_blank",
                  "noopener,noreferrer",
                );
              } else {
                alert(
                  `Sertifikat untuk ${row.original.kode_ncage} belum tersedia.`,
                );
              }
            }}
            title="Download Sertifikat"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shadow-sm ${
              row.original.sertifikat_url
                ? "bg-emerald-500 hover:bg-emerald-600 active:scale-95 shadow-emerald-500/30 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!row.original.sertifikat_url}
          >
            <i className="ri-download-2-line text-[15px]" />
          </button>
        </div>
      ),
      enableSorting: false,
    },

    {
      accessorKey: "kode_ncage",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kode NCAGE
          <i
            className={`text-[11px] ${
              column.getIsSorted() === "asc"
                ? "ri-arrow-up-s-line text-[#8B1E1E]"
                : column.getIsSorted() === "desc"
                  ? "ri-arrow-down-s-line text-[#8B1E1E]"
                  : "ri-arrow-up-down-line text-gray-400"
            }`}
          />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-bold tracking-wider font-mono text-[13px]">
          {row.getValue("kode_ncage")}
        </span>
      ),
    },

    {
      accessorKey: "nama_perusahaan",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Perusahaan
          <i
            className={`text-[11px] ${
              column.getIsSorted() === "asc"
                ? "ri-arrow-up-s-line text-[#8B1E1E]"
                : column.getIsSorted() === "desc"
                  ? "ri-arrow-down-s-line text-[#8B1E1E]"
                  : "ri-arrow-up-down-line text-gray-400"
            }`}
          />
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-gray-800">
          {row.getValue("nama_perusahaan")}
        </span>
      ),
    },

    {
      accessorKey: "status_kode",
      header: "Status Kode",
      cell: ({ row }) => {
        const status = row.getValue("status_kode") as StatusKodeNcage;
        const cfg = statusConfig[status];
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${cfg.className}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === "Aktif" ? "animate-pulse" : ""}`}
            />
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "tipe_entitas",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipe Entitas
          <i
            className={`text-[11px] ${
              column.getIsSorted() === "asc"
                ? "ri-arrow-up-s-line text-[#8B1E1E]"
                : column.getIsSorted() === "desc"
                  ? "ri-arrow-down-s-line text-[#8B1E1E]"
                  : "ri-arrow-up-down-line text-gray-400"
            }`}
          />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-gray-600 text-[13px]">
          {row.getValue("tipe_entitas")}
        </span>
      ),
    },
    {
      accessorKey: "tanggal_kadaluarsa",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tgl Kadaluarsa
          <i
            className={`text-[11px] ${
              column.getIsSorted() === "asc"
                ? "ri-arrow-up-s-line text-[#8B1E1E]"
                : column.getIsSorted() === "desc"
                  ? "ri-arrow-down-s-line text-[#8B1E1E]"
                  : "ri-arrow-up-down-line text-gray-400"
            }`}
          />
        </button>
      ),
      cell: ({ row }) => (
        <span className="text-gray-600 text-[13px]">
          {row.getValue("tanggal_kadaluarsa")}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  return (
    <div className="flex flex-col gap-5 mt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[15px]" />
          <input
            type="text"
            placeholder="Cari kode / perusahaan..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="
              w-full pl-9.5 pr-4 py-2.5 text-[13px] font-medium border border-gray-200/50 rounded-[10px]
              bg-white text-gray-700 placeholder:text-gray-400/80 placeholder:font-normal
              focus:outline-none focus:ring-4 focus:ring-[#8B1E1E]/5 focus:border-[#8B1E1E]/40
              transition-all
            "
          />
        </div>

        <select
          onChange={(e) =>
            table
              .getColumn("status_kode")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="
            px-4 py-2.5 text-[13px] font-medium border border-gray-200/50 rounded-[10px]
            bg-white text-gray-600 focus:outline-none
            focus:ring-4 focus:ring-[#8B1E1E]/5 focus:border-[#8B1E1E]/40
            transition-all cursor-pointer
          "
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </div>

      <div className="rounded-[15px] border border-gray-100/40 overflow-hidden bg-white shadow-sm shadow-gray-100/40">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50/80 hover:bg-gray-50/80 border-b border-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-[12px] text-gray-500 font-semibold uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3.5 text-[13px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-40 text-center text-gray-400 text-sm"
                >
                  <i className="ri-inbox-line text-3xl block mb-2 text-gray-300" />
                  Tidak ada data ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-[13px] text-gray-500">
        <span>
          Menampilkan{" "}
          <strong className="text-gray-700">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
          </strong>{" "}
          –{" "}
          <strong className="text-gray-700">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}
          </strong>{" "}
          dari{" "}
          <strong className="text-gray-700">
            {table.getFilteredRowModel().rows.length}
          </strong>{" "}
          data
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="ri-skip-left-line text-lg" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="ri-arrow-left-s-line text-lg" />
          </button>

          <span className="px-3 py-1 rounded-lg bg-[#8B1E1E] text-white text-[12px] font-bold">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="ri-arrow-right-s-line text-lg" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="ri-skip-right-line text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
