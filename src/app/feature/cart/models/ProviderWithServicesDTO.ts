import { AppProvider } from "../../product/models/provider";

export type ProviderWithServicesDTO ={
    providerId: number;
    firstName: string ;  
    lastName: string ;   
    email: string ;      
    city: string ;       
    services: AppProvider[];
  }