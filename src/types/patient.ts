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


export type PatientDto = {
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

export type PatientDtoUpdate = {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  dateNaissance: string;
  genre: Sexe;
  tel: string;
  profession: string;
  nationalite: string;
}; 

export interface Assurance {
  id: number;
  type: string;
  matricule: string;
  adresse: string;
  patiendId: number;
}

export interface Antecedent {
  id: number;
  nomAntecedent: string;
  patiendId: number;
}

export interface Allergie {
  id: number;
  nomAllergie: string;
  patiendId: number;
}

export interface Consultation {
  id: number;
  motif: string;
  dateHeure: string;
  patiendId: number;
  userId: number;
}

export interface PatientDetails extends Patient {
  assurance: Assurance[];
  antecedent: Antecedent[];
  allergie: Allergie[];
  consultation: Consultation[];
}

