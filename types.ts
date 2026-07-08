export type CaseType = "project" | "routine";

export type OverallStatus = "normal" | "attention" | "critical" | "completed";

export type Trend = "improving" | "stable" | "worsening";

export type Importance = "high" | "medium" | "low";

export type NextReportTo =
  | "none"
  | "section_meeting"
  | "division_management_meeting"
  | "executive_meeting";

export type SupportNeeded =
  | "none"
  | "staffing"
  | "customer_negotiation"
  | "executive_decision"
  | "budget"
  | "other";

export type Case = {
  id: string;
  caseCode: string;
  caseName: string;
  caseType: CaseType;
  department: string;
  owner: string;
  manager: string;
  status: OverallStatus;
  trend: Trend;
  importance: Importance;
  nextReportTo: NextReportTo;
  latestComment: string;
  supportNeeded: SupportNeeded;
  attentionSignalCount: number;
  lastUpdatedAt: string;
};

export type StatusLevel = "normal" | "attention" | "critical";

export type ProjectCaseDetail = {
  caseId: string;
  customerName: string;
  startDate: string;
  plannedEndDate: string;
  currentPhase: string;
  contractAmount: number;
  forecastCost: number;
  forecastGrossProfit: number;
  profitabilityStatus: StatusLevel;
  scheduleStatus: StatusLevel;
  qualityStatus: StatusLevel;
  staffingStatus: StatusLevel;
  customerStatus: StatusLevel;
  changeRequestCount: number;
  openIssueCount: number;
  milestoneStatus: string;
};

export type RoutineCaseDetail = {
  caseId: string;
  deadline: string;
  submitTo: string;
  processTemplate: string;
  currentStep: string;
  progressRate: number;
  overdueTaskCount: number;
  pendingApprovalCount: number;
  requestedDepartmentCount: number;
  notSubmittedDepartmentCount: number;
  deadlineStatus: StatusLevel;
  processStatus: StatusLevel;
  approvalStatus: StatusLevel;
  responseStatus: StatusLevel;
  qualityStatus: StatusLevel;
};

export type SignalSource =
  | "manual"
  | "attendance"
  | "seat"
  | "meeting"
  | "document"
  | "worklog"
  | "system";

export type SignalCategory =
  | "profitability"
  | "schedule"
  | "quality"
  | "staffing"
  | "customer"
  | "organization"
  | "deadline"
  | "approval"
  | "hybrid_work"
  | "estimate"
  | "other";

export type Severity = "low" | "medium" | "high";

export type Frequency = "once" | "sometimes" | "repeated";

export type SignalStatus =
  | "new"
  | "watching"
  | "attention"
  | "converted_to_case"
  | "closed";

export type Signal = {
  id: string;
  signalCode: string;
  title: string;
  description: string;
  department: string;
  source: SignalSource;
  category: SignalCategory;
  severity: Severity;
  frequency: Frequency;
  relatedCaseId?: string;
  isAttentionSignal: boolean;
  attentionReason?: string;
  riskScore: number;
  status: SignalStatus;
  createdAt: string;
};

export type CaseStatusHistory = {
  id: string;
  caseId: string;
  reportedDate: string;
  overallStatus: OverallStatus;
  trend: Trend;
  comment: string;
  supportNeeded: SupportNeeded;
  profitabilityStatus?: StatusLevel;
  scheduleStatus?: StatusLevel;
  qualityStatus?: StatusLevel;
  staffingStatus?: StatusLevel;
  customerStatus?: StatusLevel;
  deadlineStatus?: StatusLevel;
  processStatus?: StatusLevel;
  approvalStatus?: StatusLevel;
  responseStatus?: StatusLevel;
  createdBy: string;
};
