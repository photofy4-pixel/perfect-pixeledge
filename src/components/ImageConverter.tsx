import { useState, useRef } from "react";
import { Upload, Download, RefreshCw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

type ImageFormat = "image/png" | "image/jpeg" | "image/webp" | "image/gif" | "image/bmp" | "image/avif" | "image/tiff";

const formatOptions = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPG" },
  { value: "image/webp", label: "WEBP" },
  { value: "image/gif", label: "GIF" },
  { value: "image/bmp", label: "BMP" },
  { value: "image/avif", label: "AVIF" },
  { value: "image/tiff", label: "TIFF" },
];

const ImageConverter = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [sourceFormat, setSourceFormat] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/png");
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSourceImage(e.target?.result as string);
      setSourceFormat(file.type);
      setConvertedImage(null);
    };
    reader.readAsDataURL(file);
    toast.success("Image uploaded successfully");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleConvert = () => {
    if (!sourceImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsConverting(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to initialize converter");
        setIsConverting(false);
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedImage(url);
            toast.success("Image converted successfully!");
          } else {
            toast.error("Conversion failed");
          }
          setIsConverting(false);
        },
        targetFormat,
        0.95
      );
    };

    img.onerror = () => {
      toast.error("Failed to load image");
      setIsConverting(false);
    };

    img.src = sourceImage;
  };

  const handleDownload = () => {
    if (!convertedImage) return;

    const link = document.createElement("a");
    const extension = targetFormat.split("/")[1];
    link.href = convertedImage;
    link.download = `converted-image.${extension}`;
    link.click();
    toast.success("Image downloaded!");
  };

  const handleReset = () => {
    setSourceImage(null);
    setConvertedImage(null);
    setSourceFormat("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      {!sourceImage ? (
        <Card
          className={`p-12 border-2 border-dashed transition-smooth cursor-pointer hover:border-primary hover:bg-secondary/30 ${
            isDragging ? "border-primary bg-secondary/50" : "border-border"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="bg-gradient-hero p-4 rounded-full shadow-elegant">
              <Upload className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Drop your image here, or click to browse
              </h3>
              <p className="text-sm text-muted-foreground">
                Supports JPG, PNG, WEBP, GIF, and more
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Preview and Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-4 bg-gradient-card shadow-elegant">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Original Image</h3>
                <span className="text-xs text-muted-foreground uppercase">
                  {sourceFormat.split("/")[1]}
                </span>
              </div>
              <img
                src={sourceImage}
                alt="Source"
                className="w-full h-48 object-contain rounded-lg bg-muted"
              />
            </Card>

            {convertedImage && (
              <Card className="p-4 bg-gradient-card shadow-elegant">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Converted Image</h3>
                  <span className="text-xs text-muted-foreground uppercase">
                    {targetFormat.split("/")[1]}
                  </span>
                </div>
                <img
                  src={convertedImage}
                  alt="Converted"
                  className="w-full h-48 object-contain rounded-lg bg-muted"
                />
              </Card>
            )}
          </div>

          {/* Conversion Controls */}
          <Card className="p-6 shadow-elegant">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">
                  Convert to:
                </label>
                <Select
                  value={targetFormat}
                  onValueChange={(value) => setTargetFormat(value as ImageFormat)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                {!convertedImage ? (
                  <>
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleConvert}
                      disabled={isConverting}
                      className="flex-1 md:flex-initial"
                    >
                      {isConverting ? (
                        <>
                          <RefreshCw className="animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <RefreshCw />
                          Convert
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleReset}
                    >
                      <X />
                      Reset
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleDownload}
                      className="flex-1 md:flex-initial"
                    >
                      <Download />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleReset}
                    >
                      <RefreshCw />
                      New Image
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
