
export interface RDV {
  id: number;
  date: string;
  statut: "PREVU" | "ANNULE" | "EFFECTUE";
  objet?: string | null;
  nom?: string | null;
  patientId?: number | null;
  userId: number;
}

export interface RDVDto {
  date: string;
  statut?: "PREVU" | "ANNULE" | "EFFECTUE"; 
  objet?: string | null;
  nom?: string | null;
  userId: number; 
}

export interface RDVUpdateDto {
  id: number;
  date?: string;
  statut?: "PREVU" | "ANNULE" | "EFFECTUE";
  objet?: string | null;
  nom?: string | null;
  userId?: number;
}
