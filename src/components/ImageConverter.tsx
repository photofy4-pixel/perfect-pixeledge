import { useState, useRef } from "react";
import { Upload, Download, RefreshCw, X, Lock, Unlock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
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
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = e.target?.result as string;
      
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
      const targetWidth = parseInt(width) || img.width;
      const targetHeight = parseInt(height) || img.height;
      
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to initialize converter");
        setIsConverting(false);
        return;
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

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
    setWidth("");
    setHeight("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspectRatio && originalWidth && originalHeight && value) {
      const newWidth = parseInt(value);
      const aspectRatio = originalHeight / originalWidth;
      setHeight(Math.round(newWidth * aspectRatio).toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspectRatio && originalWidth && originalHeight && value) {
      const newHeight = parseInt(value);
      const aspectRatio = originalWidth / originalHeight;
      setWidth(Math.round(newHeight * aspectRatio).toString());
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
            <div className="space-y-4">
              {/* Resize Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Resize Image</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                    className="h-8 px-2"
                  >
                    {maintainAspectRatio ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                    <span className="ml-1 text-xs">
                      {maintainAspectRatio ? "Locked" : "Unlocked"}
                    </span>
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Width (px)
                    </label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      placeholder="Width"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">
                      Height (px)
                    </label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      placeholder="Height"
                      min="1"
                    />
                  </div>
                </div>
                {originalWidth > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Original: {originalWidth} × {originalHeight}
                  </p>
                )}
              </div>

              {/* Format Selection */}
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
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
