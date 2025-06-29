
import { DocumentTemplate, FormData, GeneratedDocument } from '@/types/document';

export class DocumentProcessor {
  static generateDocument(
    template: DocumentTemplate,
    formData: FormData
  ): GeneratedDocument {
    console.log('Generating document with template:', template.name);
    console.log('Form data:', formData);

    let processedContent = template.content;

    // Process each field
    template.fields.forEach(field => {
      const value = formData[field.id];
      const placeholder = `{{${field.name}}}`;

      if (value !== undefined && value !== null) {
        let processedValue = this.processFieldValue(field, value, template);
        processedContent = processedContent.replace(
          new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
          processedValue
        );
      } else {
        // Replace with empty string if no value
        processedContent = processedContent.replace(
          new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'),
          ''
        );
      }
    });

    // Add timestamp if needed
    processedContent = processedContent.replace(
      /{{timestamp}}/g,
      Date.now().toString()
    );

    const generatedDocument: GeneratedDocument = {
      id: `doc_${Date.now()}`,
      templateId: template.id,
      content: processedContent,
      formData,
      generatedAt: new Date().toISOString(),
      status: 'draft'
    };

    console.log('Generated document:', generatedDocument);
    return generatedDocument;
  }

  private static processFieldValue(
    field: any,
    value: any,
    template: DocumentTemplate
  ): string {
    switch (field.type) {
      case 'materials':
        return this.processMaterials(value, template.formatting.materials);
      
      case 'date':
        return this.processDate(value, template.formatting.dateFormat);
      
      case 'number':
        if (field.name.toLowerCase().includes('value') || 
            field.name.toLowerCase().includes('amount')) {
          return this.processNumber(value, template.formatting.numberFormat);
        }
        return value.toString();
      
      default:
        return String(value);
    }
  }

  private static processMaterials(materials: string, format: string): string {
    if (!materials) return '';

    const materialList = materials.split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    switch (format) {
      case 'list':
        return materialList.map(item => `• ${item}`).join('\n');
      
      case 'comma_separated':
        return materialList.join(', ');
      
      case 'table':
        // For future implementation
        return materialList.map((item, index) => 
          `${index + 1}. ${item}`
        ).join('\n');
      
      default:
        return materialList.join('\n');
    }
  }

  private static processDate(dateValue: string, format: string): string {
    if (!dateValue) return '';
    
    const date = new Date(dateValue);
    
    // Simple date formatting - in production, use a library like date-fns
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    switch (format) {
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      default:
        return `${month}/${day}/${year}`;
    }
  }

  private static processNumber(value: number, format: string): string {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
    
    return value.toLocaleString();
  }
}
