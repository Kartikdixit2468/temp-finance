export interface ReservationFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  policyStatus?: string;
  subscribeNewsletter?: boolean;
}

export interface BenefitItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

export interface ProblemQuestion {
  id: string;
  iconName: string;
  question: string;
}

export interface TimelineStep {
  step: number;
  iconName: string;
  question: string;
}

export interface HostStat {
  id: string;
  iconName: string;
  title: string;
  subtitle: string;
}

export interface AudienceCard {
  id: string;
  stepNumber: string;
  iconName: string;
  title: string;
  description: string;
}
