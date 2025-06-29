
import { DocumentTemplate } from '@/types/document';

export const templates: DocumentTemplate[] = [
  {
    id: 'contract-nyc-1',
    name: 'NYC Construction Contract',
    type: 'contract',
    city: 'New York',
    fields: [
      {
        id: 'projectName',
        name: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
        placeholder: 'Enter project name'
      },
      {
        id: 'contractorName',
        name: 'contractorName',
        label: 'Contractor Name',
        type: 'text',
        required: true,
        placeholder: 'Enter contractor name'
      },
      {
        id: 'contractorAddress',
        name: 'contractorAddress',
        label: 'Contractor Address',
        type: 'textarea',
        required: true,
        placeholder: 'Enter contractor address'
      },
      {
        id: 'clientName',
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
        placeholder: 'Enter client name'
      },
      {
        id: 'contractValue',
        name: 'contractValue',
        label: 'Contract Value',
        type: 'number',
        required: true,
        placeholder: 'Enter contract value'
      },
      {
        id: 'startDate',
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true
      },
      {
        id: 'completionDate',
        name: 'completionDate',
        label: 'Completion Date',
        type: 'date',
        required: true
      },
      {
        id: 'materials',
        name: 'materials',
        label: 'Materials List',
        type: 'materials',
        required: true,
        placeholder: 'Enter materials (one per line)'
      }
    ],
    content: `CONSTRUCTION CONTRACT

Project: {{projectName}}
Contractor: {{contractorName}}
Address: {{contractorAddress}}
Client: {{clientName}}
Contract Value: ${{contractValue}}

Project Timeline:
Start Date: {{startDate}}
Completion Date: {{completionDate}}

MATERIALS AND SPECIFICATIONS:
{{materials}}

This contract is governed by the laws of New York City and State of New York.

Contractor Signature: ___________________ Date: ___________
Client Signature: ______________________ Date: ___________`,
    formatting: {
      materials: 'list',
      dateFormat: 'MM/dd/yyyy',
      numberFormat: 'currency'
    },
    metadata: {
      version: '1.0',
      created: '2024-01-01',
      lastModified: '2024-01-01',
      description: 'Standard construction contract template for NYC projects'
    }
  },
  {
    id: 'performance-security-nyc-1',
    name: 'NYC Performance Security Bond',
    type: 'performance_security',
    city: 'New York',
    fields: [
      {
        id: 'projectName',
        name: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
        placeholder: 'Enter project name'
      },
      {
        id: 'contractorName',
        name: 'contractorName',
        label: 'Contractor Name',
        type: 'text',
        required: true,
        placeholder: 'Enter contractor name'
      },
      {
        id: 'bondAmount',
        name: 'bondAmount',
        label: 'Bond Amount',
        type: 'number',
        required: true,
        placeholder: 'Enter bond amount'
      },
      {
        id: 'effectiveDate',
        name: 'effectiveDate',
        label: 'Effective Date',
        type: 'date',
        required: true
      },
      {
        id: 'expirationDate',
        name: 'expirationDate',
        label: 'Expiration Date',
        type: 'date',
        required: true
      },
      {
        id: 'materials',
        name: 'materials',
        label: 'Covered Materials',
        type: 'materials',
        required: true,
        placeholder: 'Enter materials to be covered'
      },
      {
        id: 'suretyCo',
        name: 'suretyCo',
        label: 'Surety Company',
        type: 'text',
        required: true,
        placeholder: 'Enter surety company name'
      }
    ],
    content: `PERFORMANCE SECURITY BOND

Bond No: PSB-{{timestamp}}
Project: {{projectName}}
Principal: {{contractorName}}
Surety: {{suretyCo}}
Bond Amount: ${{bondAmount}}

Effective Period: {{effectiveDate}} to {{expirationDate}}

This performance bond secures the faithful performance of the contract for the supply and installation of the following materials: {{materials}}.

The surety guarantees completion of the work according to the contract terms and conditions as approved by the City of New York.

Surety Company: {{suretyCo}}
Signature: ___________________ Date: ___________

Principal: {{contractorName}}
Signature: ___________________ Date: ___________`,
    formatting: {
      materials: 'comma_separated',
      dateFormat: 'MM/dd/yyyy',
      numberFormat: 'currency'
    },
    metadata: {
      version: '1.0',
      created: '2024-01-01',
      lastModified: '2024-01-01',
      description: 'Performance security bond template for NYC projects'
    }
  },
  {
    id: 'contract-la-1',
    name: 'LA Construction Contract',
    type: 'contract',
    city: 'Los Angeles',
    fields: [
      {
        id: 'projectName',
        name: 'projectName',
        label: 'Project Name',
        type: 'text',
        required: true,
        placeholder: 'Enter project name'
      },
      {
        id: 'contractorName',
        name: 'contractorName',
        label: 'Contractor Name',
        type: 'text',
        required: true,
        placeholder: 'Enter contractor name'
      },
      {
        id: 'licenseNumber',
        name: 'licenseNumber',
        label: 'CA License Number',
        type: 'text',
        required: true,
        placeholder: 'Enter CA contractor license number'
      },
      {
        id: 'clientName',
        name: 'clientName',
        label: 'Client Name',
        type: 'text',
        required: true,
        placeholder: 'Enter client name'
      },
      {
        id: 'contractValue',
        name: 'contractValue',
        label: 'Contract Value',
        type: 'number',
        required: true,
        placeholder: 'Enter contract value'
      },
      {
        id: 'startDate',
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true
      },
      {
        id: 'materials',
        name: 'materials',
        label: 'Materials List',
        type: 'materials',
        required: true,
        placeholder: 'Enter materials (one per line)'
      }
    ],
    content: `CONSTRUCTION AGREEMENT - CITY OF LOS ANGELES

Project: {{projectName}}
Contractor: {{contractorName}}
CA License #: {{licenseNumber}}
Client: {{clientName}}
Contract Amount: ${{contractValue}}
Start Date: {{startDate}}

MATERIALS AND WORK SCOPE:
{{materials}}

This agreement complies with California State Law and Los Angeles Municipal Code.

Contractor: _________________ Date: _______
Client: _____________________ Date: _______`,
    formatting: {
      materials: 'list',
      dateFormat: 'MM/dd/yyyy',
      numberFormat: 'currency'
    },
    metadata: {
      version: '1.0',
      created: '2024-01-01',
      lastModified: '2024-01-01',
      description: 'Construction contract template for Los Angeles projects'
    }
  }
];

export const getTemplatesByType = (type: string) => {
  return templates.filter(template => template.type === type);
};

export const getTemplatesByCity = (city: string) => {
  return templates.filter(template => template.city === city);
};

export const getTemplateById = (id: string) => {
  return templates.find(template => template.id === id);
};
