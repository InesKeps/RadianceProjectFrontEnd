export interface Assurance {
  id: Number;
  type: string;
  matricule: string;
  adresse: string;
  patientId: Number;
}

export interface Antecedent {
  id: Number;
  nomAntecedent: string;     
  patientId: Number;  
}

export interface Allergie {
  id: Number;
  nomAllergie: string; 
  patientId: Number;     
}

export interface AntecedentDto {
  nomAntecedent: string;   
  patientId: Number;  
}

export interface AllergieDto {
  nomAllergie: string; 
  patientId: Number;      
}

export interface AssuranceDto {
  type: string;
  matricule: string;
  adresse: string; 
  patientId: Number;  
}

export interface AssuranceDtoUpdate {
  id: number;
  type: string;
  matricule: string;
  adresse: string;
}

export interface AntecedentDtoUpdate {
  id: number;
  nomAntecedent: string;   
}

export interface AllergieDtoUpdate {
  id: number;
  nomAllergie: string;   
}

export type Sexe = "M" | "F";

export interface Patient {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  dateNaissance: string;
  genre: Sexe;
  tel: string;
  profession: string;
  nationalite: string;
  userId: number;
}

export type PatientDetails = Patient & {
  antecedents: Antecedent[];
  allergies: Allergie[];
  assurance: Assurance | null;
};

export type PatientDetailsDto = {
  details:{
    nom: string;
    prenom: string;
    adresse: string;
    dateNaissance: string;
    genre: Sexe;
    tel: string;
    profession: string;
    nationalite: string;
    userId: number;
  };
  antecedents?: string[];
  allergies?: string[];
  assurance?: {
    type: string;
    matricule: string;
    adresse: string;
  } | null;
};


