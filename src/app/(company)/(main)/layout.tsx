import Navbar from "../../../components/company/Navbar";
import Footer from "../../../components/company/Footer";
import PageTransition from "../../../components/company/PageTransition";

export default function CompanyMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-[65px]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
