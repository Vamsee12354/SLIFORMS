
export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'contract' | 'performance_security' | 'other';
  city?: string;
  fields: TemplateField[];
  content: string;
  formatting: FormattingRules;
  metadata: {
    version: string;
    created: string;
    lastModified: string;
    description?: string;
  };
}

export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'textarea' | 'materials';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormattingRules {
  materials: 'list' | 'comma_separated' | 'table';
  dateFormat: string;
  numberFormat: string;
  customRules?: Record<string, any>;
}

export interface FormData {
  [fieldId: string]: any;
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  content: string;
  formData: FormData;
  generatedAt: string;
  status: 'draft' | 'final';
}
