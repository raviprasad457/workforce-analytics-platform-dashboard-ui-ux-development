export type EmployeeStatus = 'Active' | 'On Leave' | 'Late' | 'Remote' | 'Probation' | 'Inactive';
export type WorkMode = 'Onsite' | 'Remote' | 'Hybrid';

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  location: string;
  status: EmployeeStatus;
  workMode: WorkMode;
  experience: string;
  joinDate: string;
  attendanceRate: number; // percentage, e.g. 96
  checkInTime: string; // e.g. "08:45 AM"
  phone: string;
  skills: string[];
}

export interface KPICardData {
  id: string;
  title: string;
  value: string;
  rawNumber: number;
  change: string;
  changeValue: number;
  isPositive: boolean;
  period: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  sparkline: number[];
  metricType: 'workforce' | 'attendance' | 'hours' | 'leave' | 'retention';
}

export interface AttendanceTrendPoint {
  date: string;
  day: string;
  present: number;
  late: number;
  absent: number;
  remote: number;
  attendanceRate: number;
}

export interface DepartmentMetric {
  department: string;
  headcount: number;
  present: number;
  remote: number;
  onLeave: number;
  attendanceRate: number;
  color: string;
}

export interface WorkforceDistributionItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
  fill?: string;
}

export type ActivityActionType =
  | 'check-in'
  | 'late'
  | 'leave'
  | 'promotion'
  | 'training'
  | 'onboarding';

export interface ActivityItem {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  action: string;
  actionType: ActivityActionType;
  timestamp: string;
  timeAgo: string;
  location: string;
}

export interface FilterState {
  datePreset: 'today' | '7days' | '30days' | '90days' | 'custom';
  startDate: string;
  endDate: string;
  department: string;
  location: string;
  status: string;
  workMode: string;
  search: string;
}

export type AppSimulationState = 'normal' | 'loading' | 'error' | 'empty';
