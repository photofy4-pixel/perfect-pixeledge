import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Upload, Settings, Download, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>How It Works | Simple Steps to Convert Your Files</title>
        <meta name="description" content="Learn how to use our file converter. Simple 3-step process: upload your file, select output format, and download. 100% secure and private." />
        <link rel="canonical" href="https://yourdomain.com/how-it-works.html" />
      </Helmet>
      <Navigation />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-hero bg-clip-text text-transparent">
              How It Works
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-16">
              Converting your images is simple and takes just a few seconds
            </p>

            <div className="space-y-12">
              <Card className="p-8 shadow-elegant hover:shadow-hover transition-smooth">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-gradient-hero p-4 rounded-lg shadow-elegant shrink-0">
                    <Upload className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Step 1: Upload Your Image</h2>
                    <p className="text-muted-foreground mb-4">
                      Start by uploading your image file. You can either drag and drop your file directly 
                      onto the upload area, or click the upload button to browse and select a file from 
                      your device.
                    </p>
                    <p className="text-muted-foreground">
                      We support all common image formats including JPG, PNG, WEBP, GIF, BMP, and TIFF. 
                      The file size limit is generous enough for most use cases, and you'll get immediate 
                      feedback if there are any issues with your file.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-elegant hover:shadow-hover transition-smooth">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-gradient-hero p-4 rounded-lg shadow-elegant shrink-0">
                    <Settings className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Step 2: Choose Output Format</h2>
                    <p className="text-muted-foreground mb-4">
                      Once your image is uploaded, you'll see a preview of it. Now simply select your 
                      desired output format from the dropdown menu. You can convert to PNG, JPG, WEBP, 
                      or GIF formats.
                    </p>
                    <p className="text-muted-foreground">
                      Each format has its own advantages: PNG for lossless compression and transparency, 
                      JPG for smaller file sizes with photos, WEBP for modern web optimization, and GIF 
                      for simple animations.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-elegant hover:shadow-hover transition-smooth">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-gradient-hero p-4 rounded-lg shadow-elegant shrink-0">
                    <Download className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Step 3: Download Result</h2>
                    <p className="text-muted-foreground mb-4">
                      Click the "Convert" button and wait just a moment while we process your image. 
                      The conversion happens instantly in your browser using advanced canvas technology.
                    </p>
                    <p className="text-muted-foreground">
                      Once converted, you'll see a preview of your new image. Simply click the "Download" 
                      button to save the converted file to your device. You can then convert another image 
                      or close the page - no cleanup required!
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-card shadow-elegant">
                <div className="flex gap-4 items-start">
                  <div className="bg-gradient-hero p-3 rounded-lg shadow-elegant shrink-0">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Privacy & Security</h2>
                    <p className="text-muted-foreground">
                      All image conversions happen directly in your browser. Your files are never 
                      uploaded to our servers, ensuring complete privacy and security. This also means 
                      conversions are lightning-fast since there's no network transfer involved!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
