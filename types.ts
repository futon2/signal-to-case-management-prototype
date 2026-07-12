export type RequestStatus =
  | "received"
  | "checking"
  | "waiting_estimate_request"
  | "estimating"
  | "waiting_budget"
  | "likely_order"
  | "on_hold"
  | "closed";

export type RequestBackground =
  | "aging"
  | "law_change"
  | "policy_change"
  | "improvement"
  | "trouble"
  | "other";

export type RoughSize = "small" | "medium" | "large" | "very_large";

export type BudgetPlan = "yes" | "considering" | "unknown" | "no";

export type RequestItem = {
  id: string;
  requestCode: string;
  title: string;
  requesterCompany: string;
  background: RequestBackground;
  targetSystem: string;
  department: string;
  desiredTiming: string;
  roughSize: RoughSize;
  budgetPlan: BudgetPlan;
  status: RequestStatus;
  summary: string;
  expectedSkill: string;
  nextAction: string;
  attentionSignalCount: number;
  lastUpdatedAt: string;
};

export type RequestHistory = {
  id: string;
  requestId: string;
  date: string;
  title: string;
  memo: string;
  createdBy: string;
};

export type EstimateType =
  | "rough"
  | "conceptual"
  | "revised_conceptual"
  | "formal"
  | "quarterly"
  | "additional";

export type EstimateStatus =
  | "draft"
  | "review"
  | "submitted"
  | "feedback"
  | "confirmed"
  | "rejected"
  | "on_hold";

export type RiskLevel = "low" | "medium" | "high";

export type ExplanationQuality = "weak" | "normal" | "strong";

export type Estimate = {
  id: string;
  estimateCode: string;
  requestId: string;
  projectId?: string;
  title: string;
  version: number;
  estimateType: EstimateType;
  amount: number;
  personMonths: number;
  assumptions: string;
  exclusions: string;
  riskLevel: RiskLevel;
  status: EstimateStatus;
  dueDate: string;
  submittedDate?: string;
  explanationQuality: ExplanationQuality;
  feedbackCount: number;
  createdBy: string;
};

export type EstimateHistory = {
  id: string;
  estimateId: string;
  date: string;
  title: string;
  memo: string;
  createdBy: string;
};

export type StatusLevel = "normal" | "attention" | "critical";

export type OverallStatus = "normal" | "attention" | "critical" | "completed";

export type Trend = "improving" | "stable" | "worsening";

export type SupportNeeded =
  | "none"
  | "staffing"
  | "customer_negotiation"
  | "executive_decision"
  | "budget"
  | "other";

export type ReportTo = "none" | "department" | "division" | "executive";

export type ProjectPlanType =
  | "milestone"
  | "meeting"
  | "estimate"
  | "release"
  | "customer"
  | "audit"
  | "other";

export type ProjectPlanStatus = "planned" | "at_risk" | "delayed" | "done";

export type Project = {
  id: string;
  projectCode: string;
  title: string;
  requestId?: string;
  requesterCompany: string;
  department: string;
  owner: string;
  pm: string;
  amount: number;
  startDate: string;
  plannedEndDate: string;
  currentPhase: string;
  overallStatus: OverallStatus;
  trend: Trend;
  scheduleStatus: StatusLevel;
  profitabilityStatus: StatusLevel;
  qualityStatus: StatusLevel;
  staffingStatus: StatusLevel;
  customerStatus: StatusLevel;
  attentionSignalCount: number;
  estimateRevisionCount: number;
  nextReportTo: ReportTo;
  lastUpdatedAt: string;
  latestComment: string;
};

export type ProjectUpdate = {
  id: string;
  projectId: string;
  date: string;
  overallStatus: OverallStatus;
  trend: Trend;
  comment: string;
  supportNeeded: SupportNeeded;
  aiSummary: string;
};

export type ProjectPlan = {
  id: string;
  projectId: string;
  date: string;
  type: ProjectPlanType;
  title: string;
  owner: string;
  status: ProjectPlanStatus;
  memo: string;
};

export type OperationStatus =
  | "stable"
  | "attention"
  | "high_load"
  | "audit"
  | "aging_attention";

export type OperationSystem = {
  id: string;
  systemCode: string;
  systemName: string;
  requesterCompany: string;
  department: string;
  relatedProjectId?: string;
  startedAt: string;
  isJSOX: boolean;
  operationStatus: OperationStatus;
  inquiryCount: number;
  incidentCount: number;
  smallChangeCount: number;
  auditTaskCount: number;
  openIssueCount: number;
  dependencyRisk: RiskLevel;
  successorRisk: RiskLevel;
  attentionSignalCount: number;
  lastUpdatedAt: string;
  nextAction: string;
};

export type OperationHistoryType =
  | "memo"
  | "inquiry"
  | "incident"
  | "small_change"
  | "audit";

export type OperationHistory = {
  id: string;
  operationSystemId: string;
  date: string;
  type: OperationHistoryType;
  title: string;
  memo: string;
  createdBy: string;
};

export type SignalPhase = "request" | "estimate" | "project" | "operation";

export type SignalCategory =
  | "profitability"
  | "staffing"
  | "estimate"
  | "quality"
  | "schedule"
  | "customer"
  | "audit"
  | "dependency"
  | "aging"
  | "organization"
  | "operation"
  | "other";

export type Severity = "low" | "medium" | "high";

export type Frequency = "once" | "sometimes" | "repeated";

export type SignalStatus = "new" | "watching" | "attention" | "closed";

export type Signal = {
  id: string;
  signalCode: string;
  phase: SignalPhase;
  relatedId: string;
  title: string;
  description: string;
  department: string;
  category: SignalCategory;
  severity: Severity;
  frequency: Frequency;
  riskScore: number;
  isAttention: boolean;
  attentionReason?: string;
  recommendedReportTo: ReportTo;
  status: SignalStatus;
  createdAt: string;
};

export type ExecutiveDashboardGroup =
  | "demand"
  | "staffing"
  | "partner"
  | "profitability"
  | "incident";

export type ExecutiveDashboardItemKey =
  | "revenueForecast"
  | "monthlyWorkload"
  | "budgetGap"
  | "confidenceBreakdown"
  | "largeDealCandidates"
  | "monthlyStaffingGap"
  | "skillShortage"
  | "departmentLoad"
  | "pmMultiAssign"
  | "substituteShortage"
  | "outsourcingNeed"
  | "partnerRecommendation"
  | "partnerCapacity"
  | "outsourcingCost"
  | "partnerConcentration"
  | "profitRiskProjects"
  | "worseningProjects"
  | "effortOverrun"
  | "additionalEstimatePending"
  | "pmReportGap"
  | "majorIncidents"
  | "overdueIncidentActions"
  | "temporaryRecoveryOnly"
  | "recurrencePreventionOpen"
  | "jsoxIncidents";

export type ExecutiveDashboardFilters = {
  period: "current" | "next3" | "next6" | "next12" | "fiscalYear" | "custom";
  organization: "all" | "headquarters" | "division" | "section";
  amountScale: "all" | "under10m" | "10mTo100m" | "100mTo1b" | "over1b";
  status: "all" | "attention" | "critical" | "worsening" | "decision";
  revenueConfidence: "all" | "confirmed" | "confirmedHigh" | "includePipeline";
};

export type ExecutiveSavedDashboardView = {
  id: string;
  name: string;
  visibleItems: Partial<Record<ExecutiveDashboardItemKey, boolean>>;
  filters: ExecutiveDashboardFilters;
};

export type ExecutiveDashboardState = {
  currentView: string;
  filters: ExecutiveDashboardFilters;
  visibleItems: Record<ExecutiveDashboardItemKey, boolean>;
  settingsOpen: boolean;
  savedViews: ExecutiveSavedDashboardView[];
};

export type PrototypeState = {
  requests: RequestItem[];
  requestHistories: RequestHistory[];
  estimates: Estimate[];
  estimateHistories: EstimateHistory[];
  projects: Project[];
  projectUpdates: ProjectUpdate[];
  projectPlans: ProjectPlan[];
  operationSystems: OperationSystem[];
  operationHistories: OperationHistory[];
  signals: Signal[];
  executiveDashboard?: ExecutiveDashboardState;
};
