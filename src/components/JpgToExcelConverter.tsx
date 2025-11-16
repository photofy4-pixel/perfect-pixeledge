import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Download, FileImage, Loader2, X, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";

const JpgToExcelConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      toast.error("Please select a valid image file (JPG, PNG, WEBP)");
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      toast.error("Image file is too large. Maximum size is 20MB");
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleConvert = async () => {
    if (!file || !preview) return;

    setIsConverting(true);
    
    try {
      // Call the edge function to extract data from the image
      const { data, error } = await supabase.functions.invoke('jpg-to-excel', {
        body: { imageData: preview }
      });

      if (error) {
        throw error;
      }

      if (!data || !data.sheets) {
        throw new Error("No data extracted from image");
      }

      setExtractedData(data);
      toast.success("Data extracted successfully! Click Download to save as Excel.");
    } catch (error: any) {
      console.error("Conversion error:", error);
      if (error.message?.includes("Rate limit")) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
      } else if (error.message?.includes("credits")) {
        toast.error("AI credits exhausted. Please add credits to continue.");
      } else {
        toast.error("Failed to extract data from image. Please try a clearer image with visible text or tables.");
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!extractedData || !file) return;

    try {
      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add each sheet
      extractedData.sheets.forEach((sheet: any) => {
        const worksheet = XLSX.utils.aoa_to_sheet(sheet.data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
      });

      // Generate and download the file
      const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
      const blob = new Blob([excelBuffer], { 
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      link.download = `${originalName}_extracted.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download Excel file");
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setExtractedData(null);
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Upload Section */}
        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <FileImage className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Upload Image with Data</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop an image containing tables, lists, or structured data
            </p>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFileSelect(selectedFile);
              }}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="default" className="cursor-pointer" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileImage className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Image Preview */}
            {preview && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Preview:</label>
                <div className="border border-border rounded-lg overflow-hidden bg-muted/30">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              </div>
            )}

            {/* Extracted Data Preview */}
            {extractedData && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Extracted Data:</label>
                <div className="border border-border rounded-lg p-4 bg-muted/30 max-h-64 overflow-auto">
                  <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>{extractedData.sheets.length} sheet(s) with data</span>
                  </div>
                  {extractedData.sheets.map((sheet: any, idx: number) => (
                    <div key={idx} className="mb-3">
                      <p className="font-medium text-sm mb-1">{sheet.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {sheet.data.length} rows × {sheet.data[0]?.length || 0} columns
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {!extractedData ? (
                <Button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="flex-1"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting Data...
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                      Extract Data
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
              )}
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>

            {/* Info */}
            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
              <p className="font-medium mb-1">Tips for best results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear, well-lit images</li>
                <li>Ensure text is readable and not blurry</li>
                <li>Tables should have visible borders or clear structure</li>
                <li>Avoid heavily stylized or handwritten text</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default JpgToExcelConverter;
