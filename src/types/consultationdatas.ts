export type Sexe = "M" | "F";

export type Role = "MEDECIN" | "ASSISTANT";

export interface Motif {
  id: number;
  nomMotif: string;
}

export interface MotifDto {
  nomMotif: string;
}

export interface Soin {
  id: number;
  nom: string;
  codification: string;
  tarif: number;
}

export interface SoinDto {
  nom: string;
  codification: string;
  tarif: number;
}

export interface Dent {
  id: number;
  numero: number;
  nom: string;
}

export interface DentDto {
  numero: number;
  nom: string;
}

export interface ConsultationMotif{
  id: number;
  consultationId: number;
  motif: {
    id: number;
    nomMotif: string;
  };
}

export interface ConsultationMotifDto{
  consultationId: number;
  motifId: number;
}

export interface ConsultationSoin{
  id: number;
  consultationId: number;
  soin: {
    id: number;
    nom: string;
    codification: string;
    tarif: number;
  };
  dent: {
    id: number;
    numero: number;
    nom: string;
  };
}

export interface ConsultationSoinDto{
  consultationId: number;
  soinId: number;
  dentId: number;
}

export interface DevisSoins{
  id: number;
  consultationId: number;
  soin: {
    id: number;
    nom: string;
    codification: string;
    tarif: number;
  };
  dent: {
    id: number;
    numero: number;
    nom: string;
  };
}

export interface DevisSoinsDto{
  consultationId: number;
  soinId: number;
  dentId: number;
}

export type ConsultationDetails = {
  id: number;
  dateHeure: string;
  nomPatient?: string;
  motif?: string;
  nomResponsable?: string;
};


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
}

export interface SoinConsultation {
  idSoin: number; 
  codification: string; 
  nomSoin: string; 
  tarif: number; 
  idDent: number; 
  numero: number; 
  nomDent: string; 
}

export interface SoinsConsultation {
  id: number;
  idSoin: number; 
  codification: string; 
  nomSoin: string; 
  tarif: number; 
  idDent: number; 
  numero: number; 
  nomDent: string; 
}

export interface ConsultationDto {
  dateHeure: string;
  patientId: number;
  userId: number;
}

export interface ConsultationDtoUpdate {
  id: number;
  dateHeure: string;
}

export interface Prescription {
  id: number; 
  nomMedicament: string;
  grammage: string;
  forme: string;
  posologie: string;
  duree : string;
  quantite : string;
  consultationId: number;
}

export interface PrescriptionDto {
  nomMedicament: string;
  grammage: string;
  forme: string;
  posologie: string;
  duree : string;
  quantite : string;
  consultationId: number;
}

export interface PrescriptionDtoUpdate {
  id: number;
  nomMedicament: string;
  grammage: string;
  forme: string;
  posologie: string;
  duree : string;
  quantite : string;
}