export type Sexe = "M" | "F";

export type Role = "MEDECIN" | "ASSISTANT";

export interface User {
  id: number;
  nom: string;
  sexe: Sexe;
  tel: string;
  adresse: string;
  password: string;
  role: Role;          
}

export interface AuthInfo {
  userToLogin: User;
  token: string;
  refreshToken: string;
}


export type UserDto = {
  nom: string;
  tel: string;
  adresse: string;
  role: Role; 
  sexe: Sexe;
  password: string;
}; 

export type UserDtoUpdate = {
  id: number;
  nom: string;
  tel: string;
  adresse: string;
  role: Role; 
  sexe: Sexe;
  password: string;
}; 

export type LoginDto = {
  tel: string;
  password: string;
};