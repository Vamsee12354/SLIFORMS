
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GeneratedDocument } from '@/types/document';
import { Download, Edit } from 'lucide-react';

interface DocumentPreviewProps {
  document: GeneratedDocument;
  onEdit: (content: string) => void;
  onExport: (format: 'pdf' | 'docx') => void;
  onBack: () => void;
}

const DocumentPreview = ({ document, onEdit, onExport, onBack }: DocumentPreviewProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedContent, setEditedContent] = React.useState(document.content);

  const handleSaveEdit = () => {
    onEdit(editedContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(document.content);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Preview</h2>
          <p className="text-muted-foreground">
            Generated on {new Date(document.generatedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Content</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit}>Save Changes</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {document.content}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                onClick={() => onExport('pdf')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => onExport('docx')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export as DOCX
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Export functionality will be implemented with pdf-lib and docx libraries
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentPreview;
