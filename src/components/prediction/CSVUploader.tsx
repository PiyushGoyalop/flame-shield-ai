
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileUp, Check, AlertCircle } from "lucide-react";
import { parseCSV } from "@/utils/dataLoader";
import { useToast } from "@/hooks/use-toast";

type CSVUploaderProps = {
  onDataUploaded: (data: any[], type: "wildfires" | "co2") => void;
};

export function CSVUploader({ onDataUploaded }: CSVUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    wildfires?: string;
    co2?: string;
  }>({});
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: "wildfires" | "co2") => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        throw new Error("No data found in CSV file");
      }
      
      onDataUploaded(parsedData, type);
      setUploadedFiles(prev => ({ ...prev, [type]: file.name }));
      
      toast({
        title: "CSV File Uploaded",
        description: `Successfully loaded ${parsedData.length} records from ${file.name}`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error parsing CSV:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to parse CSV file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2 mt-4 p-3 border rounded-md bg-gray-50">
      <h3 className="text-sm font-medium mb-2">Upload Custom Dataset (CSV)</h3>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`text-xs ${uploadedFiles.wildfires ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
            onClick={() => document.getElementById('wildfires-upload')?.click()}
            disabled={isUploading}
          >
            {uploadedFiles.wildfires ? (
              <Check className="h-3.5 w-3.5 mr-1" />
            ) : (
              <FileUp className="h-3.5 w-3.5 mr-1" />
            )}
            {uploadedFiles.wildfires ? 'Wildfire Data Loaded' : 'Upload Wildfire Data'}
          </Button>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {uploadedFiles.wildfires || 'No file chosen'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={`text-xs ${uploadedFiles.co2 ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
            onClick={() => document.getElementById('co2-upload')?.click()}
            disabled={isUploading}
          >
            {uploadedFiles.co2 ? (
              <Check className="h-3.5 w-3.5 mr-1" />
            ) : (
              <FileUp className="h-3.5 w-3.5 mr-1" />
            )}
            {uploadedFiles.co2 ? 'CO2 Data Loaded' : 'Upload CO2 Data'}
          </Button>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {uploadedFiles.co2 || 'No file chosen'}
          </span>
        </div>
      </div>
      
      <input
        id="wildfires-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "wildfires")}
      />
      <input
        id="co2-upload"
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => handleFileUpload(e, "co2")}
      />
      
      <p className="text-xs text-muted-foreground mt-2 italic">
        Your data will be processed locally and not sent to any server
      </p>
    </div>
  );
}
