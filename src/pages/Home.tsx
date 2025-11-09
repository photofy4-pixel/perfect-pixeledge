import { Link } from "react-router-dom";
import { Shield, Zap, FileImage, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageConverter from "@/components/ImageConverter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Convert Your Images Instantly
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Free & fast online image converter. Transform JPG, PNG, WEBP, GIF, and more formats in seconds. 
            No signup required, completely secure.
          </p>
        </div>

        {/* Converter Tool */}
        <ImageConverter />
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose ImageConvert?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth">
              <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-4 shadow-elegant">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Convert images in seconds with our optimized processing engine. No waiting, no delays.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth">
              <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-4 shadow-elegant">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-muted-foreground">
                All conversions happen in your browser. Your files never leave your device.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth">
              <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-4 shadow-elegant">
                <FileImage className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
              <p className="text-muted-foreground">
                Support for JPG, PNG, WEBP, GIF, and more. Convert between any format seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simple 3-Step Process
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-gradient-hero text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-elegant">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to select your image file
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-hero text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-elegant">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Choose Format</h3>
            <p className="text-sm text-muted-foreground">
              Select your desired output format from the dropdown
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-hero text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-elegant">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Download Result</h3>
            <p className="text-sm text-muted-foreground">
              Get your converted image instantly, ready to use
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            Free Online Image Converter - Fast & Secure
          </h2>
          <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
            <p>
              ImageConvert is a powerful, free online image converter that allows you to transform your images 
              between various formats instantly. Whether you need to convert JPG to PNG, PNG to WEBP, or any 
              other format combination, our tool handles it all with ease.
            </p>
            <p>
              Our image converter runs entirely in your browser, ensuring your privacy and security. Your images 
              never leave your device, and we don't store any of your files. This makes ImageConvert the perfect 
              choice for converting sensitive or confidential images.
            </p>
            <p>
              With support for popular formats like JPG, PNG, WEBP, and GIF, you can convert images for any 
              purpose - whether you're optimizing images for your website, preparing files for print, or simply 
              changing formats for compatibility. Our tool maintains high quality while providing fast conversion 
              speeds, making it ideal for both professionals and casual users.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
