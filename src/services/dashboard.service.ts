"use server";

import { api } from "./api";

export interface DashboardStats {
  totalStudents: number;
  totalSubjects: number;
  pendingIssues: number;
  upcomingAssessments: number;
}

export interface RecentActivity {
  id: string;
  action: string;
  entity: string;
  createdAt: string;
  user: {
    fullName: string;
    profileImage?: string;
  };
}

export interface TodayClass {
  id: string;
  subjectName: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  classType: string;
  platform: string;
  roomNumber?: string;
  joinLink?: string;
}

export interface CRDashboard {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  todayClasses: TodayClass[];
}

export async function getCRDashboard(): Promise<CRDashboard | null> {
  const res = await api.get<CRDashboard>("/dashboards/cr");
  if (res.success) return res.data;
  return null;
}
