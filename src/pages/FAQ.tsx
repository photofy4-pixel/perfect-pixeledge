import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is my image data safe?",
      answer:
        "Absolutely! All image conversions happen directly in your browser using client-side processing. Your images are never uploaded to our servers, ensuring complete privacy and security. Once you close the page, all data is removed from your browser's memory.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support all common image formats including JPG/JPEG, PNG, WEBP, GIF, BMP, and TIFF. You can convert from any of these formats to PNG, JPG, WEBP, or GIF. We're constantly working on adding support for more formats.",
    },
    {
      question: "Is there a file size limit?",
      answer:
        "While there's no strict file size limit, very large images (over 20MB) may take longer to process depending on your device's capabilities. For the best experience, we recommend images under 10MB, which covers the vast majority of use cases.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Currently, you can convert one image at a time. However, the conversion process is so fast that you can quickly process multiple images in succession. We're working on adding batch conversion functionality in a future update.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No! One of the best features of ImageConvert is that you can start using it immediately without any registration, email verification, or account creation. Just visit the site and start converting.",
    },
    {
      question: "Is this service really free?",
      answer:
        "Yes, ImageConvert is completely free with no hidden costs, premium tiers, or limitations on the number of conversions. We believe in providing a valuable service that's accessible to everyone.",
    },
    {
      question: "Will the image quality be affected?",
      answer:
        "We use high-quality conversion algorithms to maintain your image quality. When converting to lossy formats like JPG, we use a quality setting of 95% to ensure excellent results. PNG conversions are lossless, preserving every pixel of your original image.",
    },
    {
      question: "Can I use this on mobile devices?",
      answer:
        "Yes! ImageConvert works perfectly on mobile devices, tablets, and desktops. Our responsive design ensures a great experience regardless of your device. All you need is a modern web browser.",
    },
    {
      question: "Do I need to install any software?",
      answer:
        "No installation required! ImageConvert is a web-based tool that runs entirely in your browser. This means it works on Windows, Mac, Linux, iOS, Android, and any other platform with a modern web browser.",
    },
    {
      question: "What happens to my images after conversion?",
      answer:
        "Since all processing happens in your browser, your images exist only on your device during the conversion process. Once you close the page or navigate away, the data is automatically cleared from your browser's memory. We never store, access, or have any record of your images.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Find answers to common questions about ImageConvert
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 shadow-elegant hover:shadow-hover transition-smooth bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 p-6 bg-gradient-card rounded-lg shadow-elegant text-center">
              <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Feel free to reach out to us.
              </p>
              <a
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contact Us →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
