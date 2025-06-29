
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DocumentTemplate, FormData, TemplateField } from '@/types/document';
import { Calendar, CalendarCheck } from 'lucide-react';

interface DynamicFormProps {
  template: DocumentTemplate;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onGenerate: () => void;
  onBack: () => void;
}

const DynamicForm = ({ template, formData, onFormChange, onGenerate, onBack }: DynamicFormProps) => {
  const handleFieldChange = (fieldId: string, value: any) => {
    onFormChange({
      ...formData,
      [fieldId]: value
    });
  };

  const renderField = (field: TemplateField) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || 0)}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            rows={3}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case 'materials':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            rows={4}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="font-mono"
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );
    }
  };

  const validateForm = () => {
    return template.fields.every(field => {
      if (!field.required) return true;
      const value = formData[field.id];
      return value !== undefined && value !== null && value !== '';
    });
  };

  const requiredFields = template.fields.filter(f => f.required);
  const optionalFields = template.fields.filter(f => !f.required);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{template.name}</h2>
          <p className="text-muted-foreground">{template.metadata.description}</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to Templates
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Required Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Required Fields
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {requiredFields.map(field => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="text-sm font-medium">
                    {field.label} *
                  </Label>
                  {renderField(field)}
                  {field.validation?.message && (
                    <p className="text-xs text-muted-foreground">
                      {field.validation.message}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Optional Fields */}
          {optionalFields.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Optional Fields
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {optionalFields.map(field => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm font-medium">
                      {field.label}
                    </Label>
                    {renderField(field)}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Document Preview */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Document Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200 min-h-[300px]">
              <p className="text-sm text-muted-foreground text-center">
                Fill out the form to see a live preview of your document
              </p>
              {Object.keys(formData).length > 0 && (
                <div className="mt-4 text-xs">
                  <p className="font-semibold mb-2">Current Data:</p>
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-mono">{String(value).substring(0, 20)}...</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          onClick={onGenerate}
          disabled={!validateForm()}
          size="lg"
          className="px-8"
        >
          Generate Document
        </Button>
      </div>
    </div>
  );
};

export default DynamicForm;
