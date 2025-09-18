import { PenTool, Sparkles } from "lucide-react";

export const EditorHeader = () => {
  return (
    <header className="text-center py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <PenTool className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          RTL Text Editor
        </h1>
        <Sparkles className="h-6 w-6 text-primary animate-pulse" />
      </div>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        A clean, minimal text editor with full RTL (Right-to-Left) language support. 
        Perfect for Arabic, Hebrew, Persian, and other RTL languages.
      </p>
      
      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span>RTL/LTR Support</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent-foreground rounded-full"></div>
          <span>Rich Formatting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
          <span>Export Ready</span>
        </div>
      </div>
    </header>
  );
};