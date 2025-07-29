export interface GetTenantCodeResponse {
  id: number;
  tenant: string;
  imageLocation: string;
  url: string;
}

export interface ContactFormBody {
  name: string;
  surname: string;
  cuil: string;
  email: string;
  phone: string;
  reason: string;
  comment?: string;
}

