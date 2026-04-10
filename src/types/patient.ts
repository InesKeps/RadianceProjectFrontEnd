export type Sexe = "M" | "F";

export type Role = "MEDECIN" | "ASSISTANT";

export interface Patient {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  dateNaissance: string;
  genre: Sexe;
  tel: string;
  profession?: string;
  societe?: string;
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
  profession?: string;
  societe?: string;
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
  profession?: string;
  societe?: string;
  nationalite: string;
}; 

export interface Assurance {
  id: number;
  type: string;
  matricule: string;
  adresse: string;
  tel: string;
  isActive: boolean;
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
  dateHeure: string;
  patient: {
    id: number;
    nom: string;
    prenom: string;
    adresse: string;
    dateNaissance: string;
    genre: Sexe;
    tel: string;
    profession?: string;
    societe?: String;
    nationalite: string;
    userId: number;
  };

  user: {
    id: number;
    nom: string;
    sexe: Sexe;
    tel: string;
    adresse: string;
    password: string;
    role: Role;
  };

  motifs?: {
    Motif: {
      id: number;
      nomMotif: string;
    };
  }[];

  soins?: {
    soin: {
      id: number;
      nom: string;
      codification: string;
      tarif: number;
    };
    dent: {
      id: number;
      numero: number;
      nom?: string;
    };
  }[];

  devis?: {
    soin: {
      id: number;
      nom: string;
      codification: string;
      tarif: number;
    };
    dent: {
      id: number;
      numero: number;
      nom?: string;
    };
  }[];
}

export interface PatientDetails extends Patient {
  assurance: Assurance[];
  antecedent: Antecedent[];
  allergie: Allergie[];
  consultation: Consultation[];
}

