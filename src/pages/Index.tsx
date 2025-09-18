import { RTLTextEditor } from "@/components/RTLTextEditor";
import { EditorHeader } from "@/components/EditorHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorHeader />
      
      <main className="container mx-auto px-4 pb-12">
        <RTLTextEditor />
      </main>
      
      <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border/50">
        <p>Built with React, TypeScript, and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Index;
