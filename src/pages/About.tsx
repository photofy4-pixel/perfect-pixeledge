import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Target, Heart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About Us | Our Mission for Privacy-First File Conversion</title>
        <meta name="description" content="Learn about our mission to provide secure, privacy-focused file conversion tools. No uploads, no tracking, just pure browser-based conversion." />
        <link rel="canonical" href="https://yourdomain.com/about.html" />
      </Helmet>
      <Navigation />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-hero bg-clip-text text-transparent">
              About ImageConvert
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Our mission is to make image conversion simple, fast, and accessible for everyone
            </p>

            <div className="prose prose-gray max-w-none mb-12">
              <Card className="p-8 shadow-elegant bg-gradient-card">
                <p className="text-lg text-muted-foreground mb-4">
                  ImageConvert was created with a simple philosophy: powerful tools should be 
                  accessible to everyone, without compromise. We believe that converting images 
                  shouldn't require expensive software, technical expertise, or sacrificing your privacy.
                </p>
                <p className="text-lg text-muted-foreground">
                  By leveraging modern web technologies, we've built a tool that runs entirely in 
                  your browser - meaning your images never leave your device, conversions are 
                  lightning-fast, and you don't need to install anything or create an account.
                </p>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-6 text-center shadow-elegant hover:shadow-hover transition-smooth">
                <div className="bg-gradient-hero p-3 rounded-lg w-fit mx-auto mb-4 shadow-elegant">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide the best free image conversion tool that respects your privacy and time
                </p>
              </Card>

              <Card className="p-6 text-center shadow-elegant hover:shadow-hover transition-smooth">
                <div className="bg-gradient-hero p-3 rounded-lg w-fit mx-auto mb-4 shadow-elegant">
                  <Heart className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <p className="text-muted-foreground">
                  Privacy first, user-friendly design, and commitment to remaining completely free
                </p>
              </Card>

              <Card className="p-6 text-center shadow-elegant hover:shadow-hover transition-smooth">
                <div className="bg-gradient-hero p-3 rounded-lg w-fit mx-auto mb-4 shadow-elegant">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Users</h3>
                <p className="text-muted-foreground">
                  Trusted by thousands of professionals and individuals worldwide every day
                </p>
              </Card>
            </div>

            <Card className="p-8 shadow-elegant bg-gradient-card">
              <h2 className="text-2xl font-bold mb-4">Why We Built This</h2>
              <p className="text-muted-foreground mb-4">
                We noticed that most online image converters either required uploading your images 
                to unknown servers (raising privacy concerns), had complex interfaces, charged fees, 
                or added watermarks to your images. We knew there had to be a better way.
              </p>
              <p className="text-muted-foreground mb-4">
                With advances in browser technology, we realized we could build a tool that processes 
                images entirely on your device. This means maximum privacy, instant results, and no 
                server costs to pass on to users. The result is ImageConvert: a free, fast, and 
                privacy-focused image conversion tool.
              </p>
              <p className="text-muted-foreground">
                We're constantly working to improve ImageConvert by adding new features, supporting 
                more formats, and optimizing performance. Your feedback helps us build a better tool 
                for everyone.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
