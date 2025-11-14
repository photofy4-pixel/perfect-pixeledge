import { Link } from "react-router-dom";
import { Shield, Zap, FileImage, CheckCircle, ArrowRight, Image, Sparkles, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle border-b border-border">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
              <Sparkles className="h-4 w-4" />
              <span>Free Forever • No Sign Up Required</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Convert Images in Seconds
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Professional image format converter supporting JPG, PNG, WEBP, GIF, BMP, AVIF, and TIFF. 
              Resize, optimize, and convert with advanced quality controls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/image-converter">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6 shadow-elegant hover:shadow-hover group">
                  Start Converting
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">7+</div>
                <div className="text-sm text-muted-foreground">Formats Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Browser-Based</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Free Conversions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tool Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Image Converter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between all major image formats with advanced options for resizing and quality control
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-gradient-hero p-4 rounded-xl w-fit mb-6 shadow-elegant">
                <Image className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Image Format Converter</h3>
              <p className="text-muted-foreground mb-6">
                Convert between JPG, PNG, WEBP, GIF, BMP, AVIF, and TIFF formats. 
                Resize dimensions, adjust quality, and maintain aspect ratios with ease.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Resize images while converting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Quality control for JPG and WEBP</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Maintain or unlock aspect ratio</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Instant preview and download</span>
                </li>
              </ul>
              <Link to="/image-converter">
                <Button variant="hero" className="w-full md:w-auto">
                  Try Image Converter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-4">
                <div className="bg-gradient-hero p-6 rounded-full w-fit mx-auto shadow-elegant">
                  <Download className="h-12 w-12 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Drag & drop your image to start converting
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ImageConvert?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most trusted online image converter with advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth group">
              <div className="bg-gradient-hero p-4 rounded-xl w-fit mb-6 shadow-elegant group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Convert images in seconds with our optimized processing engine. No server uploads, 
                no waiting queues - everything happens instantly in your browser.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth group">
              <div className="bg-gradient-hero p-4 rounded-xl w-fit mb-6 shadow-elegant group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Private & Secure</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your images never leave your device. All conversions happen locally in your browser, 
                ensuring complete privacy and security for your files.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth group">
              <div className="bg-gradient-hero p-4 rounded-xl w-fit mb-6 shadow-elegant group-hover:scale-110 transition-transform">
                <FileImage className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Formats</h3>
              <p className="text-muted-foreground leading-relaxed">
                Support for all major formats including JPG, PNG, WEBP, GIF, BMP, AVIF, and TIFF. 
                Convert between any format combination seamlessly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect For Every Use Case
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're a designer, developer, or casual user, our tool adapts to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 bg-card hover:bg-accent/5 transition-smooth">
            <h3 className="font-semibold mb-2">Web Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Convert to WEBP or AVIF for faster website loading times and better SEO
            </p>
          </Card>
          
          <Card className="p-6 bg-card hover:bg-accent/5 transition-smooth">
            <h3 className="font-semibold mb-2">Social Media</h3>
            <p className="text-sm text-muted-foreground">
              Resize and convert images to meet platform requirements instantly
            </p>
          </Card>
          
          <Card className="p-6 bg-card hover:bg-accent/5 transition-smooth">
            <h3 className="font-semibold mb-2">Print Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Convert to high-quality formats like TIFF for professional printing
            </p>
          </Card>
          
          <Card className="p-6 bg-card hover:bg-accent/5 transition-smooth">
            <h3 className="font-semibold mb-2">File Compression</h3>
            <p className="text-sm text-muted-foreground">
              Reduce file sizes with quality control for JPG and WEBP formats
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-subtle py-16 md:py-20 border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Convert Your Images?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who trust ImageConvert for their image conversion needs. 
              Start converting now - no account required, completely free.
            </p>
            <Link to="/image-converter">
              <Button variant="hero" size="lg" className="text-lg px-10 py-6 shadow-elegant hover:shadow-hover">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">
          Free Online Image Converter - Fast & Secure
        </h2>
        <div className="prose prose-gray max-w-none text-muted-foreground space-y-4 leading-relaxed">
          <p>
            ImageConvert is a powerful, free online image converter that allows you to transform your images 
            between various formats instantly. Whether you need to convert JPG to PNG, PNG to WEBP, or any 
            other format combination, our tool handles it all with ease. With support for 7+ image formats 
            including BMP, AVIF, and TIFF, you have complete flexibility for any project.
          </p>
          <p>
            Our image converter runs entirely in your browser, ensuring your privacy and security. Your images 
            never leave your device, and we don&apos;t store any of your files on our servers. This makes ImageConvert 
            the perfect choice for converting sensitive or confidential images, giving you peace of mind that 
            your data remains private.
          </p>
          <p>
            Advanced features include image resizing with aspect ratio locking, quality control for compressed 
            formats like JPG and WEBP, and instant preview before downloading. Whether you&apos;re optimizing images 
            for your website, preparing files for print, or simply changing formats for compatibility, our tool 
            maintains high quality while providing fast conversion speeds. Perfect for designers, developers, 
            photographers, and anyone who works with images regularly.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
