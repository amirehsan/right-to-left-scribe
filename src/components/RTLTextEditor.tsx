import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Languages,
  Copy,
  Download,
  Type
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RTLTextEditorProps {
  className?: string;
}

export const RTLTextEditor = ({ className = "" }: RTLTextEditorProps) => {
  const [isRTL, setIsRTL] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Count words and characters
  const updateCounts = () => {
    if (editorRef.current) {
      const content = editorRef.current.textContent || "";
      setCharCount(content.length);
      setWordCount(content.trim() === "" ? 0 : content.trim().split(/\s+/).length);
    }
  };

  // Handle text selection
  const updateSelection = () => {
    const selection = window.getSelection();
    setSelectedText(selection?.toString() || "");
  };

  // Apply formatting
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateSelection();
  };

  // Toggle RTL/LTR
  const toggleDirection = () => {
    setIsRTL(!isRTL);
    if (editorRef.current) {
      editorRef.current.style.direction = isRTL ? "ltr" : "rtl";
      editorRef.current.style.textAlign = isRTL ? "left" : "right";
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (editorRef.current) {
      const content = editorRef.current.textContent || "";
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully.",
      });
    }
  };

  // Export as text file
  const exportText = () => {
    if (editorRef.current) {
      const content = editorRef.current.textContent || "";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.txt';
      a.click();
      URL.revokeObjectURL(url);
      toast({
        title: "File exported",
        description: "Text has been exported as document.txt",
      });
    }
  };

  useEffect(() => {
    updateCounts();
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Toolbar */}
      <div className="bg-toolbar-bg border border-toolbar-border rounded-t-xl p-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Formatting Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('bold')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('italic')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('underline')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <Underline className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('justifyLeft')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('justifyCenter')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => applyFormat('justifyRight')}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Direction & Export Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={isRTL ? "default" : "outline"}
              size="sm"
              onClick={toggleDirection}
              className="h-8 gap-2 transition-all duration-200"
            >
              <Languages className="h-4 w-4" />
              {isRTL ? "RTL" : "LTR"}
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportText}
              className="h-8 px-2 hover:bg-accent transition-colors"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div 
        ref={editorRef}
        contentEditable
        className={`
          min-h-[500px] p-8 bg-editor-bg border-x border-b border-toolbar-border 
          rounded-b-xl focus:outline-none focus:ring-2 focus:ring-ring/20
          text-lg leading-relaxed resize-none overflow-auto
          transition-all duration-200
          ${isRTL ? 'text-right' : 'text-left'}
          ${wordCount === 0 ? 'text-muted-foreground' : 'text-foreground'}
        `}
        style={{ 
          direction: isRTL ? 'rtl' : 'ltr',
          fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'
        }}
        onInput={updateCounts}
        onMouseUp={updateSelection}
        onKeyUp={updateSelection}
        onFocus={(e) => {
          if (e.target.textContent === (isRTL ? "ابدأ الكتابة هنا..." : "Start writing here...")) {
            e.target.textContent = "";
            e.target.className = e.target.className.replace('text-muted-foreground', 'text-foreground');
          }
        }}
        onBlur={(e) => {
          if (e.target.textContent?.trim() === "") {
            e.target.textContent = isRTL ? "ابدأ الكتابة هنا..." : "Start writing here...";
            e.target.className = e.target.className.replace('text-foreground', 'text-muted-foreground');
          }
        }}
        suppressContentEditableWarning={true}
      >
        {isRTL ? "ابدأ الكتابة هنا..." : "Start writing here..."}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-b-xl border-x border-b border-toolbar-border text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="gap-1">
            <Type className="h-3 w-3" />
            {wordCount} words
          </Badge>
          <Badge variant="outline">
            {charCount} characters
          </Badge>
          {selectedText && (
            <Badge variant="secondary">
              {selectedText.length} selected
            </Badge>
          )}
        </div>
        
        <div className="text-xs">
          {isRTL ? "وضع الكتابة من اليمين إلى اليسار" : "Left-to-Right writing mode"}
        </div>
      </div>
    </div>
  );
};