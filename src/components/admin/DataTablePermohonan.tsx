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
  Permohonan,
  StatusPermohonan,
} from "@/src/data/fake-db/admin/DataPermohonan";

const statusConfig: Record<
  StatusPermohonan,
  { label: string; className: string }
> = {
  "Menunggu Verifikasi": {
    label: "Menunggu Verifikasi",
    className: "bg-gray-100 text-gray-600",
  },
  "Sedang Diverifikasi": {
    label: "Sedang Diverifikasi",
    className: "bg-amber-100 text-amber-700",
  },
  Disetujui: {
    label: "Disetujui",
    className: "bg-emerald-100 text-emerald-700",
  },
  Revisi: {
    label: "Revisi",
    className: "bg-orange-100 text-orange-700",
  },
  Ditolak: {
    label: "Ditolak",
    className: "bg-red-100 text-red-600",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

interface DataTablePermohonanProps {
  data: Permohonan[];
}

export function DataTablePermohonan({ data }: DataTablePermohonanProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<Permohonan>[] = [
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (
        <button
          onClick={() =>
            router.push(`/admin/data-permohonan/${row.original.id}`)
          }
          title="Lihat Detail"
          className="
            w-8 h-8 rounded-lg flex items-center justify-center
            bg-sky-500 hover:bg-sky-600 active:scale-95
            transition-all shadow-sm shadow-sky-500/30
          "
        >
          <i className="ri-eye-line text-white text-[15px]" />
        </button>
      ),
      enableSorting: false,
    },

    {
      accessorKey: "nama_pemohon",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Pemohon
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
          {row.getValue("nama_pemohon")}
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
        <span className="text-gray-600">{row.getValue("nama_perusahaan")}</span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as StatusPermohonan;
        const config = statusConfig[status];
        return (
          <span
            className={`
              inline-flex items-center px-2.5 py-1 rounded-full
              text-[11px] font-semibold whitespace-nowrap
              ${config.className}
            `}
          >
            {config.label}
          </span>
        );
      },
    },

    {
      accessorKey: "tanggal_pengajuan",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1.5 font-semibold hover:text-[#8B1E1E] transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Pengajuan
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
        <span className="text-gray-500 text-[13px]">
          {formatDate(row.getValue("tanggal_pengajuan"))}
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[15px]" />
          <input
            type="text"
            placeholder="Cari pemohon / perusahaan..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg
              bg-white text-gray-700 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#8B1E1E]/10 focus:border-[#8B1E1E]
              transition-all
            "
          />
        </div>

        <select
          onChange={(e) =>
            table
              .getColumn("status")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="
            px-3 py-2 text-sm border border-gray-200 rounded-lg
            bg-white text-gray-600 focus:outline-none
            focus:ring-2 focus:ring-[#8B1E1E]/10 focus:border-[#8B1E1E]
            transition-all cursor-pointer
          "
        >
          <option value="">Semua Status</option>
          {Object.keys(statusConfig).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
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
