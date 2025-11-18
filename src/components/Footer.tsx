import { Image } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-hero p-2 rounded-lg shadow-elegant">
                <Image className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                ImageConvert
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Convert your images instantly with our free online image converter. 
              Fast, secure, and supports JPG, PNG, WEBP, and more formats.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Home
                </a>
              </li>
              <li>
                <a href="/features.html" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Features
                </a>
              </li>
              <li>
                <a href="/faq.html" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about.html" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  About
                </a>
              </li>
              <li>
                <a href="/contact.html" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ImageConvert. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
