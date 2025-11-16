import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, FileSpreadsheet, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

type ExcelFormat = "xlsx" | "xls" | "csv" | "txt" | "html" | "ods";

const formatOptions: { value: ExcelFormat; label: string }[] = [
  { value: "xlsx", label: "XLSX (Excel 2007+)" },
  { value: "xls", label: "XLS (Excel 97-2004)" },
  { value: "csv", label: "CSV (Comma Separated)" },
  { value: "txt", label: "TXT (Tab Delimited)" },
  { value: "html", label: "HTML Table" },
  { value: "ods", label: "ODS (OpenDocument)" },
];

const ExcelConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [targetFormat, setTargetFormat] = useState<ExcelFormat>("xlsx");
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.match(/\.(xlsx?|csv|txt|ods)$/i)) {
      toast.error("Please select a valid Excel or CSV file");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const wb = XLSX.read(data, { type: "binary" });
        setWorkbook(wb);
        toast.success("File loaded successfully!");
      } catch (error) {
        toast.error("Failed to read file");
        console.error(error);
      }
    };
    
    reader.readAsBinaryString(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleConvert = () => {
    if (!workbook || !file) return;

    setIsConverting(true);
    
    try {
      let output: string | ArrayBuffer;
      let mimeType: string;
      let extension: string;

      switch (targetFormat) {
        case "xlsx":
          output = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
          mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          extension = "xlsx";
          break;
        case "xls":
          output = XLSX.write(workbook, { type: "buffer", bookType: "xls" });
          mimeType = "application/vnd.ms-excel";
          extension = "xls";
          break;
        case "csv":
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          output = XLSX.utils.sheet_to_csv(sheet);
          mimeType = "text/csv";
          extension = "csv";
          break;
        case "txt":
          const txtSheet = workbook.Sheets[workbook.SheetNames[0]];
          output = XLSX.utils.sheet_to_txt(txtSheet);
          mimeType = "text/plain";
          extension = "txt";
          break;
        case "html":
          const htmlSheet = workbook.Sheets[workbook.SheetNames[0]];
          output = XLSX.utils.sheet_to_html(htmlSheet);
          mimeType = "text/html";
          extension = "html";
          break;
        case "ods":
          output = XLSX.write(workbook, { type: "buffer", bookType: "ods" });
          mimeType = "application/vnd.oasis.opendocument.spreadsheet";
          extension = "ods";
          break;
        default:
          throw new Error("Unsupported format");
      }

      const blob = new Blob(
        [output],
        { type: mimeType }
      );
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const originalName = file.name.replace(/\.[^/.]+$/, "");
      link.download = `${originalName}_converted.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`File converted to ${targetFormat.toUpperCase()} successfully!`);
    } catch (error) {
      toast.error("Conversion failed. Please try again.");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setWorkbook(null);
    setTargetFormat("xlsx");
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
            <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Upload Excel or CSV File</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv,.txt,.ods"
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
                  Choose File
                </span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                    {workbook && ` • ${workbook.SheetNames.length} sheet(s)`}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Convert to:</label>
              <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as ExcelFormat)}>
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

            {/* Sheet Names Preview */}
            {workbook && workbook.SheetNames.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Sheets in file:</label>
                <div className="flex flex-wrap gap-2">
                  {workbook.SheetNames.map((name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleConvert}
                disabled={isConverting}
                className="flex-1"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Convert & Download
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ExcelConverter;
