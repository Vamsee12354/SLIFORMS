
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DocumentTemplate } from '@/types/document';
import { templates, getTemplatesByType, getTemplatesByCity } from '@/data/templates';

interface TemplateSelectorProps {
  onTemplateSelect: (template: DocumentTemplate) => void;
}

const TemplateSelector = ({ onTemplateSelect }: TemplateSelectorProps) => {
  const [selectedType, setSelectedType] = React.useState<string>('');
  const [selectedCity, setSelectedCity] = React.useState<string>('');
  const [filteredTemplates, setFilteredTemplates] = React.useState<DocumentTemplate[]>(templates);

  const documentTypes = Array.from(new Set(templates.map(t => t.type)));
  const cities = Array.from(new Set(templates.map(t => t.city).filter(Boolean)));

  React.useEffect(() => {
    let filtered = templates;
    
    if (selectedType) {
      filtered = filtered.filter(t => t.type === selectedType);
    }
    
    if (selectedCity) {
      filtered = filtered.filter(t => t.city === selectedCity);
    }
    
    setFilteredTemplates(filtered);
  }, [selectedType, selectedCity]);

  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Document Type</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {documentTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {formatType(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">City</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cities</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city || ''}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>
                {formatType(template.type)} • {template.city}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.metadata.description}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Version {template.metadata.version} • {template.fields.length} fields
              </p>
              <Button 
                onClick={() => onTemplateSelect(template)}
                className="w-full"
              >
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
