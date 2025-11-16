import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExcelConverter from "@/components/ExcelConverter";

const ExcelConverterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Excel Format Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert Excel files between XLSX, XLS, CSV, TXT, HTML, and ODS formats. 
            Simple, fast, and secure conversion in your browser.
          </p>
        </div>
      </section>

      {/* Converter Tool */}
      <section className="container mx-auto px-4 py-12 md:py-16 flex-1">
        <ExcelConverter />
      </section>

      <Footer />
    </div>
  );
};

export default ExcelConverterPage;
