import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Zap, FileImage, Globe, Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Conversion",
      description:
        "Convert images in seconds with our optimized processing engine. All conversions happen locally in your browser for maximum speed.",
    },
    {
      icon: Shield,
      title: "100% Secure & Private",
      description:
        "Your images never leave your device. All processing happens in your browser, ensuring complete privacy and security.",
    },
    {
      icon: FileImage,
      title: "Multiple Format Support",
      description:
        "Support for JPG, PNG, WEBP, GIF, BMP, TIFF and more. Convert between any format seamlessly with high quality output.",
    },
    {
      icon: Globe,
      title: "No Registration Required",
      description:
        "Start converting immediately - no account creation, no email verification, no hassle. Just upload and convert.",
    },
    {
      icon: Lock,
      title: "Completely Free",
      description:
        "Unlimited conversions at no cost. No hidden fees, no premium tiers, no watermarks. Everything is free forever.",
    },
    {
      icon: Sparkles,
      title: "High Quality Output",
      description:
        "Maintain image quality with our advanced conversion algorithms. Get professional results every time.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Features | Powerful File Conversion Tools</title>
        <meta name="description" content="Discover powerful features: instant conversion, multiple format support, browser-based processing, no file size limits, and 100% privacy protection." />
        <link rel="canonical" href="https://yourdomain.com/features.html" />
      </Helmet>
      <Navigation />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Everything you need to convert images quickly, securely, and efficiently
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card shadow-elegant hover:shadow-hover transition-smooth"
                >
                  <div className="bg-gradient-hero p-3 rounded-lg w-fit mb-4 shadow-elegant">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>

            <div className="mt-16 bg-gradient-card rounded-2xl p-8 md:p-12 shadow-elegant">
              <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">For Professionals</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Maintain image quality for client deliverables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Fast batch conversions for productivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Secure processing for confidential images</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">For Everyone</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Simple and intuitive interface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>No technical knowledge required</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Works on any device with a browser</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
