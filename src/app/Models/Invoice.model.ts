export interface InvoiceResponse {
  hasItems: boolean;
  items:    Invoice[];
  total:    number;
  page:     number;
  pages:    number;
}

export interface Invoice {
  id:            number;
  invoiceNumber: string;
  decription:    string;
  invoiceDate:   Date;
  total:         number;
}


export interface InvoiceCreate {
  decription:   string;
  invoiceDate:  Date;
  invoiceLines: InvoiceLine[];
}

export interface InvoiceLine {
  id:          number;
  quality:     number;
  description: string;
  price:       number;
}
