import IUS_scan from "./us_scan";

export interface IPatient {
  id: number;
  patient_name: string;
  age: number;
  height: number;
  weight: number;
  bc_history: boolean;
  US_scans: IUS_scan[];
}
