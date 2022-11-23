export interface CompanyResponse {
  hasItems: boolean;
  items:    Company[];
  total:    number;
  page:     number;
  pages:    number;
}


export interface Company {
  id:   number;
  name: string;
}

export interface CompanyCreate {
  name: string;
}
