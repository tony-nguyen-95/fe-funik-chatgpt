import { type IStudentContact } from './student-contact.model';

export interface IHannahStudent {
  hannahStudentId: string;
  studentId: string;
  name: string;
  funixEmail: string;
  funixId: string;
  certificate: string;
  endCertificateDate: null;
  subjectLessionLearning: string;
  supportStartDate: string;
  status: number;
  progress: number;
  contacts: IStudentContact[];
}
