export interface Product {
  id: number;
  IdType: number;
  IdUser: number; 
  Professor: string;
  Price: number; 
  Title: string;
  Description: string;
  DescriptionProgram: string;
  Duration: string;
  DurationWeek: string;
  Category: string;
  KnowledgeLevel: string;
  Favorite: boolean;
  Comprado: boolean;
  Videos: any[]; 
  file: any[]; 
}
