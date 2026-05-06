import AdminSidebar from "@/src/components/admin/Sidebar";

export default function AdminMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <AdminSidebar />
      <main className="flex-1 ml-[300px] min-h-screen">{children}</main>
    </div>
  );
}
