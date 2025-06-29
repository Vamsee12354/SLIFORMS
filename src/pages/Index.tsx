
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TemplateSelector from '@/components/TemplateSelector';
import DynamicForm from '@/components/DynamicForm';
import DocumentPreview from '@/components/DocumentPreview';
import { DocumentTemplate, FormData, GeneratedDocument } from '@/types/document';
import { DocumentProcessor } from '@/utils/documentProcessor';
import { useToast } from '@/hooks/use-toast';

type AppState = 'template-selection' | 'form-filling' | 'document-preview';

const Index = () => {
  const [currentState, setCurrentState] = React.useState<AppState>('template-selection');
  const [selectedTemplate, setSelectedTemplate] = React.useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = React.useState<FormData>({});
  const [generatedDocument, setGeneratedDocument] = React.useState<GeneratedDocument | null>(null);
  const { toast } = useToast();

  const handleTemplateSelect = (template: DocumentTemplate) => {
    console.log('Template selected:', template.name);
    setSelectedTemplate(template);
    setFormData({});
    setCurrentState('form-filling');
  };

  const handleFormChange = (data: FormData) => {
    setFormData(data);
  };

  const handleGenerateDocument = () => {
    if (!selectedTemplate) return;

    try {
      const document = DocumentProcessor.generateDocument(selectedTemplate, formData);
      setGeneratedDocument(document);
      setCurrentState('document-preview');
      
      toast({
        title: "Document Generated",
        description: "Your document has been successfully generated and is ready for review.",
      });
    } catch (error) {
      console.error('Error generating document:', error);
      toast({
        title: "Generation Error",
        description: "There was an error generating your document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDocumentEdit = (content: string) => {
    if (generatedDocument) {
      setGeneratedDocument({
        ...generatedDocument,
        content,
        status: 'draft'
      });
      
      toast({
        title: "Document Updated",
        description: "Your changes have been saved.",
      });
    }
  };

  const handleExport = (format: 'pdf' | 'docx') => {
    // This would integrate with pdf-lib for PDF or docx for Word documents
    toast({
      title: "Export Started",
      description: `Exporting document as ${format.toUpperCase()}...`,
    });
    
    // For now, we'll simulate the export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Document exported as ${format.toUpperCase()} successfully.`,
      });
    }, 2000);
  };

  const handleBack = () => {
    switch (currentState) {
      case 'form-filling':
        setCurrentState('template-selection');
        setSelectedTemplate(null);
        setFormData({});
        break;
      case 'document-preview':
        setCurrentState('form-filling');
        setGeneratedDocument(null);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Document Generation System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Automate your legal document creation with smart templates, dynamic forms, and professional formatting
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${currentState === 'template-selection' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentState === 'template-selection' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Select Template</span>
            </div>
            
            <div className="w-8 h-px bg-gray-300"></div>
            
            <div className={`flex items-center ${currentState === 'form-filling' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentState === 'form-filling' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Fill Form</span>
            </div>
            
            <div className="w-8 h-px bg-gray-300"></div>
            
            <div className={`flex items-center ${currentState === 'document-preview' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentState === 'document-preview' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Review & Export</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {currentState === 'template-selection' && (
            <TemplateSelector onTemplateSelect={handleTemplateSelect} />
          )}

          {currentState === 'form-filling' && selectedTemplate && (
            <DynamicForm
              template={selectedTemplate}
              formData={formData}
              onFormChange={handleFormChange}
              onGenerate={handleGenerateDocument}
              onBack={handleBack}
            />
          )}

          {currentState === 'document-preview' && generatedDocument && (
            <DocumentPreview
              document={generatedDocument}
              onEdit={handleDocumentEdit}
              onExport={handleExport}
              onBack={handleBack}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t">
          <p className="text-muted-foreground">
            Document Generation System v1.0 - Built for scalable template management
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
