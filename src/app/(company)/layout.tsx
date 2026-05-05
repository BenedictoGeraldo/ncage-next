import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageTransition from "../../components/PageTransition";

export default function CompanyLayout({
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
