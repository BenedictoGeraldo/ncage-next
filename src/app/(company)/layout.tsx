import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-25">{children}</main>
      <Footer />
    </>
  );
}
