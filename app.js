const STORAGE_KEY = "business-flow-signal-management-prototype:v1";
const TODAY_ISO = "2026-07-10";
const TODAY_LABEL = "2026年7月10日";

const labels = {
  requestStatus: {
    received: "相談受付",
    checking: "情報確認中",
    waiting_estimate_request: "見積依頼待ち",
    estimating: "見積中",
    waiting_budget: "予算化待ち",
    likely_order: "発注見込み",
    on_hold: "保留",
    closed: "終了",
  },
  background: {
    aging: "老朽化",
    law_change: "法改正",
    policy_change: "方針変更",
    improvement: "改善",
    trouble: "障害・トラブル",
    other: "その他",
  },
  roughSize: {
    small: "小",
    medium: "中",
    large: "大",
    very_large: "特大",
  },
  budgetPlan: {
    yes: "あり",
    considering: "検討中",
    unknown: "未定",
    no: "なし",
  },
  estimateType: {
    rough: "超概算",
    conceptual: "概算",
    revised_conceptual: "改訂概算",
    formal: "正式見積",
    quarterly: "四半期見積",
    additional: "追加見積",
  },
  estimateStatus: {
    draft: "作成中",
    review: "レビュー中",
    submitted: "提出済み",
    feedback: "指摘対応中",
    confirmed: "確定",
    rejected: "差戻し",
    on_hold: "保留",
  },
  explanationQuality: {
    weak: "弱い",
    normal: "普通",
    strong: "強い",
  },
  riskLevel: {
    low: "低",
    medium: "中",
    high: "高",
  },
  statusLevel: {
    normal: "正常",
    attention: "注意",
    critical: "危険",
  },
  overallStatus: {
    normal: "正常",
    attention: "注意",
    critical: "危険",
    completed: "完了",
  },
  trend: {
    improving: "改善",
    stable: "横ばい",
    worsening: "悪化",
  },
  supportNeeded: {
    none: "なし",
    staffing: "要員",
    customer_negotiation: "顧客調整",
    executive_decision: "経営判断",
    budget: "予算",
    other: "その他",
  },
  reportTo: {
    none: "なし",
    department: "部内確認",
    division: "本部長確認候補",
    executive: "幹部会報告候補",
  },
  projectPlanType: {
    milestone: "マイルストーン",
    meeting: "会議",
    estimate: "見積",
    release: "リリース",
    customer: "顧客確認",
    audit: "監査対応",
    other: "その他",
  },
  projectPlanStatus: {
    planned: "予定",
    at_risk: "注意",
    delayed: "遅延",
    done: "完了",
  },
  operationStatus: {
    stable: "安定",
    attention: "注意",
    high_load: "高負荷",
    audit: "監査対応中",
    aging_attention: "老朽化注意",
  },
  operationHistoryType: {
    memo: "保守メモ",
    inquiry: "問い合わせ",
    incident: "障害",
    small_change: "小改修",
    audit: "監査対応",
  },
  phase: {
    request: "相談～見積（相談）",
    estimate: "相談～見積（見積）",
    project: "プロジェクト",
    operation: "保守・運用",
  },
  signalCategory: {
    profitability: "採算",
    staffing: "要員",
    estimate: "見積",
    quality: "品質",
    schedule: "納期",
    customer: "顧客",
    audit: "監査",
    dependency: "属人化",
    aging: "老朽化",
    organization: "組織コンディション",
    operation: "保守運用",
    other: "その他",
  },
  severity: {
    low: "低",
    medium: "中",
    high: "高",
  },
  frequency: {
    once: "一度だけ",
    sometimes: "時々",
    repeated: "繰り返し",
  },
  signalStatus: {
    new: "新規",
    watching: "ウォッチ継続",
    attention: "要注意",
    closed: "クローズ",
  },
};

const departments = [
  "第1開発課",
  "第2開発課",
  "経理システム課",
  "インフラ部",
  "クラウド推進部",
  "運用部",
  "品質管理部",
];

const sampleQuestions = [
  "今後6か月で要員不足になりそうな相談は？",
  "見積回数が多く現場負荷が高いものは？",
  "根拠が弱い見積は？",
  "採算悪化しそうなプロジェクトは？",
  "PM報告では問題なしだが、客観的には注意すべき案件は？",
  "要注意シグナルが増えている部門は？",
  "保守運用負荷が高いシステムは？",
  "J-SOX監査対応が重いシステムは？",
  "幹部会に上げるべきものは？",
];

const executiveDashboardItems = {
  revenueForecast: { group: "demand", label: "12か月予測売上", defaultVisible: true },
  monthlyWorkload: { group: "demand", label: "月別業務量", defaultVisible: true },
  budgetGap: { group: "demand", label: "年度予算との差", defaultVisible: false },
  confidenceBreakdown: { group: "demand", label: "受注確度別内訳", defaultVisible: false },
  largeDealCandidates: { group: "demand", label: "大型案件候補", defaultVisible: false },
  monthlyStaffingGap: { group: "staffing", label: "月別要員過不足", defaultVisible: true },
  skillShortage: { group: "staffing", label: "スキル別不足", defaultVisible: true },
  departmentLoad: { group: "staffing", label: "部門別負荷", defaultVisible: false },
  pmMultiAssign: { group: "staffing", label: "PM兼務状況", defaultVisible: false },
  substituteShortage: { group: "staffing", label: "代替要員不足", defaultVisible: false },
  outsourcingNeed: { group: "partner", label: "外注必要人月", defaultVisible: true },
  partnerRecommendation: { group: "partner", label: "推奨パートナー", defaultVisible: true },
  partnerCapacity: { group: "partner", label: "パートナー別供給余力", defaultVisible: false },
  outsourcingCost: { group: "partner", label: "外注費予測", defaultVisible: false },
  partnerConcentration: { group: "partner", label: "パートナー集中リスク", defaultVisible: false },
  profitRiskProjects: { group: "profitability", label: "採算危険案件", defaultVisible: true },
  worseningProjects: { group: "profitability", label: "悪化案件", defaultVisible: true },
  effortOverrun: { group: "profitability", label: "工数超過案件", defaultVisible: false },
  additionalEstimatePending: { group: "profitability", label: "追加見積未合意", defaultVisible: false },
  pmReportGap: { group: "profitability", label: "PM報告とのずれ", defaultVisible: false },
  majorIncidents: { group: "incident", label: "対応中重大障害", defaultVisible: true },
  overdueIncidentActions: { group: "incident", label: "期限超過対応", defaultVisible: true },
  temporaryRecoveryOnly: { group: "incident", label: "暫定復旧のみ", defaultVisible: false },
  recurrencePreventionOpen: { group: "incident", label: "再発防止未完了", defaultVisible: false },
  jsoxIncidents: { group: "incident", label: "J-SOX影響障害", defaultVisible: false },
};

const executiveDashboardGroups = [
  ["demand", "需要・売上見通し"],
  ["staffing", "正社員要員"],
  ["partner", "外注・パートナー最適化"],
  ["profitability", "プロジェクト採算・健全性"],
  ["incident", "重大障害・重要トラブル"],
];

const executiveDashboardPresets = {
  company: {
    name: "全社経営ビュー",
    items: [
      "revenueForecast",
      "monthlyWorkload",
      "monthlyStaffingGap",
      "skillShortage",
      "outsourcingNeed",
      "partnerRecommendation",
      "profitRiskProjects",
      "worseningProjects",
      "majorIncidents",
      "overdueIncidentActions",
    ],
  },
  demandStaffing: {
    name: "需要・要員ビュー",
    items: [
      "revenueForecast",
      "monthlyWorkload",
      "confidenceBreakdown",
      "monthlyStaffingGap",
      "skillShortage",
      "substituteShortage",
      "outsourcingNeed",
    ],
  },
  partner: {
    name: "外注最適化ビュー",
    items: [
      "outsourcingNeed",
      "partnerRecommendation",
      "partnerCapacity",
      "outsourcingCost",
      "partnerConcentration",
      "departmentLoad",
    ],
  },
  profitability: {
    name: "採算管理ビュー",
    items: [
      "profitRiskProjects",
      "worseningProjects",
      "effortOverrun",
      "additionalEstimatePending",
      "pmReportGap",
    ],
  },
  incidents: {
    name: "重大障害ビュー",
    items: [
      "majorIncidents",
      "overdueIncidentActions",
      "temporaryRecoveryOnly",
      "recurrencePreventionOpen",
      "jsoxIncidents",
    ],
  },
  executiveMeeting: {
    name: "幹部会前ビュー",
    items: [
      "budgetGap",
      "monthlyStaffingGap",
      "outsourcingNeed",
      "profitRiskProjects",
      "pmReportGap",
      "majorIncidents",
      "overdueIncidentActions",
    ],
  },
};

let state = loadState();

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("submit", handleSubmit);
render();

function buildInitialData() {
  const requests = [
    {
      id: "REQ-001",
      requestCode: "REQ-001",
      title: "生産管理システム老朽化対応",
      requesterCompany: "製造A社",
      background: "aging",
      targetSystem: "生産管理システム",
      department: "第1開発課",
      desiredTiming: "2027年度上期",
      roughSize: "large",
      budgetPlan: "considering",
      status: "estimating",
      summary: "現行基盤の老朽化により更改相談。J-SOX対象範囲と移行方式の確認が必要。",
      expectedSkill: "生産管理、データ移行、J-SOX対応",
      nextAction: "第2版概算の前提条件を依頼元と確認",
      attentionSignalCount: 2,
      lastUpdatedAt: "2026-07-08",
    },
    {
      id: "REQ-002",
      requestCode: "REQ-002",
      title: "法改正に伴う会計システム改修",
      requesterCompany: "グループ経理部",
      background: "law_change",
      targetSystem: "会計システム",
      department: "経理システム課",
      desiredTiming: "2026年度下期",
      roughSize: "medium",
      budgetPlan: "yes",
      status: "waiting_budget",
      summary: "法改正対応の正式見積は確定。予算化と監査証跡範囲の確認待ち。",
      expectedSkill: "会計、税制、監査証跡",
      nextAction: "予算化判断と監査対応範囲の合意",
      attentionSignalCount: 1,
      lastUpdatedAt: "2026-07-05",
    },
    {
      id: "REQ-003",
      requestCode: "REQ-003",
      title: "グループ方針変更に伴う認証基盤刷新",
      requesterCompany: "親会社IT企画部",
      background: "policy_change",
      targetSystem: "認証基盤",
      department: "インフラ部",
      desiredTiming: "2027年度",
      roughSize: "large",
      budgetPlan: "unknown",
      status: "received",
      summary: "グループ標準方針変更に伴う初期相談。対象範囲と既存連携数の洗い出し前。",
      expectedSkill: "認証、ネットワーク、ゼロトラスト",
      nextAction: "対象システムと外部連携の棚卸し",
      attentionSignalCount: 1,
      lastUpdatedAt: "2026-07-01",
    },
  ];

  const requestHistories = [
    {
      id: "RH-001",
      requestId: "REQ-001",
      date: "2026-07-01",
      title: "初回相談",
      memo: "老朽化により来年度更改を検討。現行保守期限も確認が必要。",
      createdBy: "田中",
    },
    {
      id: "RH-002",
      requestId: "REQ-001",
      date: "2026-07-08",
      title: "追加確認",
      memo: "J-SOX対象であることが判明。監査証跡の移行範囲を前提条件に追加。",
      createdBy: "田中",
    },
    {
      id: "RH-003",
      requestId: "REQ-001",
      date: "2026-07-15",
      title: "概算見積依頼",
      memo: "依頼元より予算化のため概算見積依頼あり。",
      createdBy: "山田",
    },
    {
      id: "RH-004",
      requestId: "REQ-002",
      date: "2026-06-20",
      title: "法改正対応相談",
      memo: "制度施行時期から逆算し、下期改修が必要と整理。",
      createdBy: "佐藤",
    },
    {
      id: "RH-005",
      requestId: "REQ-003",
      date: "2026-07-01",
      title: "方針変更の共有",
      memo: "親会社IT企画部より認証基盤刷新の初期相談あり。",
      createdBy: "鈴木",
    },
  ];

  const estimates = [
    {
      id: "EST-001",
      estimateCode: "EST-001",
      requestId: "REQ-001",
      projectId: "",
      title: "生産管理システム老朽化対応 第1版概算",
      version: 1,
      estimateType: "rough",
      amount: 30000000,
      personMonths: 18,
      assumptions: "現行機能の単純更改を前提。外部連携と移行データ量は未確定。",
      exclusions: "詳細なデータクレンジング、J-SOX証跡移行、周辺システム改修は除外。",
      riskLevel: "high",
      status: "submitted",
      dueDate: "2026-07-04",
      submittedDate: "2026-07-04",
      explanationQuality: "weak",
      feedbackCount: 1,
      createdBy: "田中",
    },
    {
      id: "EST-002",
      estimateCode: "EST-002",
      requestId: "REQ-001",
      projectId: "",
      title: "生産管理システム老朽化対応 第2版概算",
      version: 2,
      estimateType: "conceptual",
      amount: 42000000,
      personMonths: 25,
      assumptions: "外部連携8本、利用部門5部門、J-SOX対象範囲を含める前提。",
      exclusions: "追加帳票、周辺部門の運用変更、長期並行稼働費用は別見積。",
      riskLevel: "medium",
      status: "review",
      dueDate: "2026-07-18",
      submittedDate: "",
      explanationQuality: "normal",
      feedbackCount: 0,
      createdBy: "田中",
    },
    {
      id: "EST-003",
      estimateCode: "EST-003",
      requestId: "REQ-002",
      projectId: "",
      title: "会計システム法改正対応 正式見積",
      version: 1,
      estimateType: "formal",
      amount: 18000000,
      personMonths: 12,
      assumptions: "法改正対象帳票と税率判定ロジックの改修を対象。",
      exclusions: "会計制度全体の見直し、既存データ補正は除外。",
      riskLevel: "low",
      status: "confirmed",
      dueDate: "2026-07-10",
      submittedDate: "2026-07-08",
      explanationQuality: "strong",
      feedbackCount: 0,
      createdBy: "佐藤",
    },
  ];

  const estimateHistories = [
    {
      id: "EH-001",
      estimateId: "EST-001",
      date: "2026-07-04",
      title: "第1版提出",
      memo: "超概算として3,000万円を提示。根拠粒度が粗く、依頼元から追加説明を求められた。",
      createdBy: "田中",
    },
    {
      id: "EH-002",
      estimateId: "EST-002",
      date: "2026-07-11",
      title: "第2版レビュー開始",
      memo: "外部連携数と利用部門数を前提に追加。J-SOX範囲は依頼元確認中。",
      createdBy: "山田",
    },
    {
      id: "EH-003",
      estimateId: "EST-003",
      date: "2026-07-08",
      title: "正式見積確定",
      memo: "法改正対象範囲が明確なため、正式見積として確定。",
      createdBy: "佐藤",
    },
  ];

  const projects = [
    {
      id: "PRJ-001",
      projectCode: "PRJ-001",
      title: "A社基幹システム更改",
      requestId: "REQ-001",
      requesterCompany: "製造A社",
      department: "第1開発課",
      owner: "第1開発部長",
      pm: "山田",
      amount: 850000000,
      startDate: "2025-04",
      plannedEndDate: "2027-03",
      currentPhase: "基本設計",
      overallStatus: "critical",
      trend: "worsening",
      scheduleStatus: "attention",
      profitabilityStatus: "critical",
      qualityStatus: "attention",
      staffingStatus: "critical",
      customerStatus: "attention",
      attentionSignalCount: 3,
      estimateRevisionCount: 4,
      nextReportTo: "executive",
      lastUpdatedAt: "2026-07-08",
      latestComment: "追加見積の合意が取れておらず、採算と要員が危険水準。",
    },
    {
      id: "PRJ-002",
      projectCode: "PRJ-002",
      title: "B社インフラ刷新",
      requestId: "",
      requesterCompany: "B社",
      department: "インフラ部",
      owner: "インフラ部長",
      pm: "鈴木",
      amount: 220000000,
      startDate: "2026-01",
      plannedEndDate: "2026-12",
      currentPhase: "検証",
      overallStatus: "attention",
      trend: "stable",
      scheduleStatus: "normal",
      profitabilityStatus: "normal",
      qualityStatus: "attention",
      staffingStatus: "attention",
      customerStatus: "normal",
      attentionSignalCount: 1,
      estimateRevisionCount: 2,
      nextReportTo: "division",
      lastUpdatedAt: "2026-07-05",
      latestComment: "検証環境の安定化待ち。要員支援があれば計画維持可能。",
    },
    {
      id: "PRJ-003",
      projectCode: "PRJ-003",
      title: "C社クラウド移行",
      requestId: "",
      requesterCompany: "C社",
      department: "クラウド推進部",
      owner: "クラウド推進部長",
      pm: "森",
      amount: 110000000,
      startDate: "2026-04",
      plannedEndDate: "2027-09",
      currentPhase: "要件定義",
      overallStatus: "normal",
      trend: "stable",
      scheduleStatus: "normal",
      profitabilityStatus: "normal",
      qualityStatus: "normal",
      staffingStatus: "normal",
      customerStatus: "normal",
      attentionSignalCount: 0,
      estimateRevisionCount: 1,
      nextReportTo: "none",
      lastUpdatedAt: "2026-07-03",
      latestComment: "現時点では大きな懸念なし。",
    },
  ];

  const projectUpdates = [
    {
      id: "PU-001",
      projectId: "PRJ-001",
      date: "2026-07-01",
      overallStatus: "attention",
      trend: "worsening",
      comment: "設計工程で追加要望が増加。追加見積の合意形成が必要。",
      supportNeeded: "customer_negotiation",
      aiSummary: "顧客合意と採算の両面で注意が必要。",
    },
    {
      id: "PU-002",
      projectId: "PRJ-001",
      date: "2026-07-08",
      overallStatus: "critical",
      trend: "worsening",
      comment: "要員不足により基本設計が2週間遅延。追加見積も未合意。",
      supportNeeded: "executive_decision",
      aiSummary: "要員、採算、顧客調整を幹部会候補として扱うべき状態。",
    },
    {
      id: "PU-003",
      projectId: "PRJ-002",
      date: "2026-07-05",
      overallStatus: "attention",
      trend: "stable",
      comment: "検証環境の不具合対応中。全体計画は維持。",
      supportNeeded: "staffing",
      aiSummary: "品質と要員に注意。追加支援で吸収可能。",
    },
  ];

  const projectPlans = [
    {
      id: "PP-001",
      projectId: "PRJ-001",
      date: "2026-07-15",
      type: "estimate",
      title: "追加見積の合意期限",
      owner: "山田",
      status: "at_risk",
      memo: "仕様追加分の見積前提と顧客承認ルートを確認する。",
    },
    {
      id: "PP-002",
      projectId: "PRJ-001",
      date: "2026-07-22",
      type: "milestone",
      title: "基本設計レビュー",
      owner: "山田",
      status: "planned",
      memo: "遅延中の設計領域を先にレビュー対象へ入れる。",
    },
    {
      id: "PP-003",
      projectId: "PRJ-001",
      date: "2026-08-05",
      type: "customer",
      title: "依頼元との仕様凍結会議",
      owner: "第1開発部長",
      status: "planned",
      memo: "追加要望の扱いと次回見積要否を合意する。",
    },
    {
      id: "PP-004",
      projectId: "PRJ-002",
      date: "2026-07-18",
      type: "meeting",
      title: "検証環境の安定化判断",
      owner: "鈴木",
      status: "planned",
      memo: "検証不具合の残件と追加要員要否を確認する。",
    },
    {
      id: "PP-005",
      projectId: "PRJ-003",
      date: "2026-07-20",
      type: "milestone",
      title: "要件定義完了判定",
      owner: "森",
      status: "planned",
      memo: "移行対象とクラウド接続方式の確定状況を確認する。",
    },
  ];

  const operationSystems = [
    {
      id: "OPS-001",
      systemCode: "OPS-001",
      systemName: "販売管理システム",
      requesterCompany: "販売A社",
      department: "運用部",
      relatedProjectId: "",
      startedAt: "2018-04",
      isJSOX: true,
      operationStatus: "high_load",
      inquiryCount: 45,
      incidentCount: 3,
      smallChangeCount: 8,
      auditTaskCount: 12,
      openIssueCount: 7,
      dependencyRisk: "high",
      successorRisk: "high",
      attentionSignalCount: 3,
      lastUpdatedAt: "2026-07-08",
      nextAction: "J-SOX証跡対応の担当分散と小改修の優先順位整理",
    },
    {
      id: "OPS-002",
      systemCode: "OPS-002",
      systemName: "会計システム",
      requesterCompany: "グループ経理部",
      department: "経理システム課",
      relatedProjectId: "",
      startedAt: "2017-10",
      isJSOX: true,
      operationStatus: "audit",
      inquiryCount: 20,
      incidentCount: 1,
      smallChangeCount: 4,
      auditTaskCount: 18,
      openIssueCount: 3,
      dependencyRisk: "medium",
      successorRisk: "medium",
      attentionSignalCount: 2,
      lastUpdatedAt: "2026-07-07",
      nextAction: "監査証跡提出の定型化と後継者育成計画の確認",
    },
    {
      id: "OPS-003",
      systemCode: "OPS-003",
      systemName: "勤怠管理システム",
      requesterCompany: "人事部",
      department: "運用部",
      relatedProjectId: "",
      startedAt: "2021-01",
      isJSOX: false,
      operationStatus: "stable",
      inquiryCount: 10,
      incidentCount: 0,
      smallChangeCount: 2,
      auditTaskCount: 0,
      openIssueCount: 1,
      dependencyRisk: "low",
      successorRisk: "low",
      attentionSignalCount: 0,
      lastUpdatedAt: "2026-07-01",
      nextAction: "通常運用を継続",
    },
  ];

  const operationHistories = [
    {
      id: "OH-001",
      operationSystemId: "OPS-001",
      date: "2026-07-01",
      type: "inquiry",
      title: "問い合わせ増加",
      memo: "月次問い合わせ件数が前月比で増加。",
      createdBy: "運用担当",
    },
    {
      id: "OH-002",
      operationSystemId: "OPS-001",
      date: "2026-07-05",
      type: "audit",
      title: "J-SOX証跡提出依頼",
      memo: "証跡提出依頼が集中。特定担当者への負荷が高い。",
      createdBy: "監査対応担当",
    },
    {
      id: "OH-003",
      operationSystemId: "OPS-001",
      date: "2026-07-10",
      type: "small_change",
      title: "小改修依頼追加",
      memo: "小改修依頼が3件追加。優先順位整理が必要。",
      createdBy: "運用担当",
    },
    {
      id: "OH-004",
      operationSystemId: "OPS-002",
      date: "2026-07-07",
      type: "audit",
      title: "監査対応会議",
      memo: "監査対応件数が18件に増加。証跡の標準化が必要。",
      createdBy: "佐藤",
    },
  ];

  const signals = [
    {
      id: "SIG-001",
      signalCode: "SIG-001",
      phase: "request",
      relatedId: "REQ-001",
      title: "生産管理システム老朽化対応で必要スキルが不足する可能性",
      description: "データ移行とJ-SOX対応を同時に見られる要員が限られている。",
      department: "第1開発課",
      category: "staffing",
      severity: "high",
      frequency: "sometimes",
      riskScore: 82,
      isAttention: true,
      attentionReason: "大規模相談で必要スキルが不足する可能性",
      recommendedReportTo: "division",
      status: "attention",
      createdAt: "2026-07-08",
    },
    {
      id: "SIG-002",
      signalCode: "SIG-002",
      phase: "estimate",
      relatedId: "EST-001",
      title: "概算見積の根拠が弱く、依頼元から指摘あり",
      description: "外部連携数とデータ移行量が未確定のまま提出し、根拠説明を求められた。",
      department: "第1開発課",
      category: "estimate",
      severity: "medium",
      frequency: "repeated",
      riskScore: 76,
      isAttention: true,
      attentionReason: "見積根拠が弱く、再見積負荷が高まる可能性",
      recommendedReportTo: "division",
      status: "attention",
      createdAt: "2026-07-04",
    },
    {
      id: "SIG-003",
      signalCode: "SIG-003",
      phase: "project",
      relatedId: "PRJ-001",
      title: "A社基幹システム更改で追加見積の合意が取れていない",
      description: "仕様追加に対する追加見積の承認が滞留し、採算悪化のおそれ。",
      department: "第1開発課",
      category: "profitability",
      severity: "high",
      frequency: "repeated",
      riskScore: 88,
      isAttention: true,
      attentionReason: "採算悪化と顧客合意遅れが重なっている",
      recommendedReportTo: "executive",
      status: "attention",
      createdAt: "2026-07-08",
    },
    {
      id: "SIG-004",
      signalCode: "SIG-004",
      phase: "project",
      relatedId: "PRJ-001",
      title: "A社基幹システム更改で要員不足により設計工程が遅延",
      description: "主要設計者が複数案件を兼務しており、基本設計が2週間遅延。",
      department: "第1開発課",
      category: "staffing",
      severity: "high",
      frequency: "repeated",
      riskScore: 84,
      isAttention: true,
      attentionReason: "要員不足が納期遅延に直結",
      recommendedReportTo: "division",
      status: "attention",
      createdAt: "2026-07-08",
    },
    {
      id: "SIG-005",
      signalCode: "SIG-005",
      phase: "operation",
      relatedId: "OPS-001",
      title: "販売管理システムでJ-SOX証跡対応が特定担当者に集中",
      description: "監査対応と問い合わせが特定担当者に集中し、後継者リスクも高い。",
      department: "運用部",
      category: "audit",
      severity: "high",
      frequency: "repeated",
      riskScore: 86,
      isAttention: true,
      attentionReason: "J-SOX対応と属人化リスクが同時に高い",
      recommendedReportTo: "executive",
      status: "attention",
      createdAt: "2026-07-05",
    },
  ];

  return {
    requests,
    requestHistories,
    estimates,
    estimateHistories,
    projects,
    projectUpdates,
    projectPlans,
    operationSystems,
    operationHistories,
    signals,
  };
}

function loadState() {
  const base = buildInitialData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState(base);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.requests) || !Array.isArray(parsed.signals)) {
      return defaultState(base);
    }
    return {
      ...defaultState(base),
      ...parsed,
      filters: {
        ...defaultFilters(),
        ...(parsed.filters || {}),
        request: { ...defaultFilters().request, ...((parsed.filters || {}).request || {}) },
        estimate: { ...defaultFilters().estimate, ...((parsed.filters || {}).estimate || {}) },
        project: { ...defaultFilters().project, ...((parsed.filters || {}).project || {}) },
        operation: { ...defaultFilters().operation, ...((parsed.filters || {}).operation || {}) },
        signal: { ...defaultFilters().signal, ...((parsed.filters || {}).signal || {}) },
      },
      activeTabs: { ...defaultTabs(), ...(parsed.activeTabs || {}) },
      executiveDashboard: mergeExecutiveDashboardState(parsed.executiveDashboard),
    };
  } catch (error) {
    return defaultState(base);
  }
}

function defaultState(base = buildInitialData()) {
  return {
    view: "overview",
    selectedRequestId: base.requests[0]?.id || "",
    selectedEstimateId: base.estimates[0]?.id || "",
    selectedProjectId: base.projects[0]?.id || "",
    selectedOperationSystemId: base.operationSystems[0]?.id || "",
    selectedSignalId: base.signals[0]?.id || "",
    selectedQuestion: sampleQuestions[0],
    signalDraftTarget: null,
    activeTabs: defaultTabs(),
    lastAiResult: null,
    filters: defaultFilters(),
    executiveDashboard: defaultExecutiveDashboardState(),
    ...base,
  };
}

function defaultExecutiveDashboardState() {
  return {
    currentView: "company",
    settingsOpen: false,
    filters: {
      period: "next12",
      organization: "all",
      amountScale: "all",
      status: "all",
      revenueConfidence: "all",
    },
    visibleItems: visibleItemsFromKeys(executiveDashboardPresets.company.items),
    savedViews: [],
  };
}

function mergeExecutiveDashboardState(value) {
  const base = defaultExecutiveDashboardState();
  const savedViews = Array.isArray(value?.savedViews) ? value.savedViews : [];
  return {
    ...base,
    ...(value || {}),
    filters: {
      ...base.filters,
      ...(value?.filters || {}),
    },
    visibleItems: {
      ...defaultDashboardVisibleItems(),
      ...(value?.visibleItems || {}),
    },
    savedViews,
  };
}

function defaultDashboardVisibleItems() {
  return Object.fromEntries(Object.entries(executiveDashboardItems).map(([key, item]) => [key, Boolean(item.defaultVisible)]));
}

function visibleItemsFromKeys(keys) {
  const visible = Object.fromEntries(Object.keys(executiveDashboardItems).map((key) => [key, false]));
  keys.forEach((key) => {
    if (key in visible) visible[key] = true;
  });
  return visible;
}

function defaultTabs() {
  return {
    request: "history",
    estimate: "history",
    project: "plans",
    operation: "history",
  };
}

function defaultFilters() {
  return {
    request: {
      requesterCompany: "all",
      department: "all",
      background: "all",
      status: "all",
      budgetPlan: "all",
      attentionOnly: "all",
    },
    estimate: {
      status: "all",
      estimateType: "all",
      explanationQuality: "all",
      feedbackOnly: "all",
    },
    project: {
      department: "all",
      overallStatus: "all",
      trend: "all",
      attentionOnly: "all",
      reportTo: "all",
      amountScale: "all",
    },
    operation: {
      department: "all",
      jsoxOnly: "all",
      status: "all",
      dependencyRisk: "all",
      attentionOnly: "all",
    },
    signal: {
      phase: "all",
      department: "all",
      category: "all",
      attentionOnly: "yes",
      reportTo: "all",
      status: "all",
    },
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleClick(event) {
  const action = event.target.closest("[data-action]");
  if (action) {
    handleAction(action.dataset.action, action.dataset);
    return;
  }

  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    selectFromDataset(viewButton.dataset);
    state.view = viewButton.dataset.view;
    saveState();
    render();
    return;
  }

  const resetButton = event.target.closest("[data-reset]");
  if (resetButton) {
    if (window.confirm("登録データを初期状態に戻しますか？")) {
      localStorage.removeItem(STORAGE_KEY);
      state = defaultState();
      render();
    }
    return;
  }

  const questionButton = event.target.closest("[data-question]");
  if (questionButton) {
    state.selectedQuestion = questionButton.dataset.question;
    saveState();
    render();
    return;
  }

  const tabButton = event.target.closest("[data-tab]");
  if (tabButton) {
    state.activeTabs[tabButton.dataset.tabGroup] = tabButton.dataset.tab;
    saveState();
    render();
  }
}

function handleChange(event) {
  const executiveFilter = event.target.closest("[data-executive-filter]");
  if (executiveFilter) {
    updateExecutiveDashboardFilter(executiveFilter.dataset.executiveFilter, executiveFilter.value);
    saveState();
    render();
    return;
  }

  const executiveItem = event.target.closest("[data-executive-item]");
  if (executiveItem) {
    state.executiveDashboard.visibleItems[executiveItem.dataset.executiveItem] = executiveItem.checked;
    state.executiveDashboard.currentView = "custom";
    saveState();
    render();
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.filters[filter.dataset.filterGroup][filter.dataset.filter] = filter.value;
    saveState();
    render();
  }
}

function updateExecutiveDashboardFilter(key, value) {
  if (key === "currentView") {
    applyExecutiveDashboardView(value);
    return;
  }
  state.executiveDashboard.filters[key] = value;
}

function applyExecutiveDashboardView(viewId) {
  const preset = executiveDashboardPresets[viewId];
  const saved = state.executiveDashboard.savedViews.find((view) => view.id === viewId);
  if (preset) {
    state.executiveDashboard.currentView = viewId;
    state.executiveDashboard.visibleItems = visibleItemsFromKeys(preset.items);
    return;
  }
  if (saved) {
    state.executiveDashboard.currentView = saved.id;
    state.executiveDashboard.visibleItems = { ...defaultDashboardVisibleItems(), ...(saved.visibleItems || {}) };
    state.executiveDashboard.filters = { ...state.executiveDashboard.filters, ...(saved.filters || {}) };
    return;
  }
  state.executiveDashboard.currentView = "custom";
}

function handleSubmit(event) {
  const form = event.target;
  if (form.id === "request-history-form") {
    event.preventDefault();
    addRequestHistory(form);
  }
  if (form.id === "estimate-history-form") {
    event.preventDefault();
    addEstimateHistory(form);
  }
  if (form.id === "project-update-form") {
    event.preventDefault();
    addProjectUpdate(form);
  }
  if (form.id === "project-plan-form") {
    event.preventDefault();
    addProjectPlan(form);
  }
  if (form.id === "operation-history-form") {
    event.preventDefault();
    addOperationHistory(form);
  }
  if (form.id === "signal-form") {
    event.preventDefault();
    addSignal(form);
  }
  if (form.id === "ai-question-form") {
    event.preventDefault();
    const input = Object.fromEntries(new FormData(form).entries());
    state.selectedQuestion = input.question.trim() || sampleQuestions[0];
    saveState();
    render();
  }
}

function selectFromDataset(dataset) {
  if (dataset.requestId) state.selectedRequestId = dataset.requestId;
  if (dataset.estimateId) state.selectedEstimateId = dataset.estimateId;
  if (dataset.projectId) state.selectedProjectId = dataset.projectId;
  if (dataset.operationId) state.selectedOperationSystemId = dataset.operationId;
  if (dataset.signalId) state.selectedSignalId = dataset.signalId;
  if (dataset.view === "signal-form") {
    if (dataset.requestId) {
      const request = findRequest(dataset.requestId);
      state.signalDraftTarget = request ? { phase: "request", relatedId: request.id, department: request.department } : null;
    } else if (dataset.estimateId) {
      const estimate = findEstimate(dataset.estimateId);
      const request = estimate ? findRequest(estimate.requestId) : null;
      state.signalDraftTarget = estimate ? { phase: "estimate", relatedId: estimate.id, department: request?.department || departments[0] } : null;
    } else if (dataset.projectId) {
      const project = findProject(dataset.projectId);
      state.signalDraftTarget = project ? { phase: "project", relatedId: project.id, department: project.department } : null;
    } else if (dataset.operationId) {
      const operation = findOperation(dataset.operationId);
      state.signalDraftTarget = operation ? { phase: "operation", relatedId: operation.id, department: operation.department } : null;
    }
  }
}

function handleAction(action, dataset) {
  if (action === "reset-filters") {
    state.filters[dataset.filterGroup] = defaultFilters()[dataset.filterGroup];
  }
  if (action === "create-estimate") {
    createEstimate(dataset.requestId);
  }
  if (action === "create-estimate-version") {
    createEstimateVersion(dataset.estimateId);
  }
  if (action === "create-project") {
    createProject(dataset.requestId);
  }
  if (action === "migrate-operation") {
    migrateOperation(dataset.projectId);
  }
  if (action === "share-request") {
    markRequestForDivision(dataset.requestId);
  }
  if (action === "signal-watch" || action === "signal-division" || action === "signal-executive" || action === "signal-close") {
    updateSignalAction(action, dataset.signalId);
  }
  if (action === "toggle-dashboard-settings") {
    state.executiveDashboard.settingsOpen = !state.executiveDashboard.settingsOpen;
  }
  if (action === "apply-dashboard-settings") {
    state.executiveDashboard.settingsOpen = false;
  }
  if (action === "reset-dashboard-settings") {
    state.executiveDashboard.visibleItems = visibleItemsFromKeys(executiveDashboardPresets.company.items);
    state.executiveDashboard.currentView = "company";
  }
  if (action === "save-dashboard-view") {
    saveExecutiveDashboardView();
  }
  saveState();
  render();
}

function saveExecutiveDashboardView() {
  const fallbackName = `保存ビュー${state.executiveDashboard.savedViews.length + 1}`;
  const name = typeof window.prompt === "function" ? window.prompt("保存ビュー名を入力してください", fallbackName) : fallbackName;
  if (!name) return;
  const id = `saved-${Date.now()}`;
  const view = {
    id,
    name: String(name).trim() || fallbackName,
    visibleItems: { ...state.executiveDashboard.visibleItems },
    filters: { ...state.executiveDashboard.filters },
  };
  state.executiveDashboard.savedViews = [view, ...state.executiveDashboard.savedViews].slice(0, 8);
  state.executiveDashboard.currentView = id;
  state.executiveDashboard.settingsOpen = false;
}

function addRequestHistory(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const request = findRequest(input.requestId);
  if (!request) return;
  state.requestHistories = [
    {
      id: nextId("RH", state.requestHistories),
      requestId: request.id,
      date: input.date || TODAY_ISO,
      title: input.title.trim(),
      memo: input.memo.trim(),
      createdBy: input.createdBy.trim() || "担当者",
    },
    ...state.requestHistories,
  ];
  request.summary = input.memo.trim();
  request.lastUpdatedAt = input.date || TODAY_ISO;
  request.nextAction = inferNextAction(input.memo, "request");
  saveState();
  render();
}

function addEstimateHistory(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const estimate = findEstimate(input.estimateId);
  if (!estimate) return;
  state.estimateHistories = [
    {
      id: nextId("EH", state.estimateHistories),
      estimateId: estimate.id,
      date: input.date || TODAY_ISO,
      title: input.title.trim(),
      memo: input.memo.trim(),
      createdBy: input.createdBy.trim() || estimate.createdBy,
    },
    ...state.estimateHistories,
  ];
  if (input.memo.includes("指摘") || input.memo.includes("差戻")) {
    estimate.feedbackCount += 1;
    estimate.status = "feedback";
  }
  saveState();
  render();
}

function addProjectUpdate(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const project = findProject(input.projectId);
  if (!project) return;
  project.overallStatus = input.overallStatus;
  project.trend = input.trend;
  project.supportNeeded = input.supportNeeded;
  project.latestComment = input.comment.trim();
  project.nextReportTo = recommendReportTo(input.overallStatus, input.trend, input.supportNeeded);
  project.lastUpdatedAt = input.date || TODAY_ISO;
  const ai = runPseudoAiForProjectUpdate(project, input.comment);
  state.projectUpdates = [
    {
      id: nextId("PU", state.projectUpdates),
      projectId: project.id,
      date: input.date || TODAY_ISO,
      overallStatus: input.overallStatus,
      trend: input.trend,
      comment: input.comment.trim(),
      supportNeeded: input.supportNeeded,
      aiSummary: ai.summary,
    },
    ...state.projectUpdates,
  ];
  applyProjectAxis(project, ai.axisPatch);
  state.lastAiResult = ai;
  saveState();
  render();
}

function addProjectPlan(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const project = findProject(input.projectId);
  if (!project) return;
  state.projectPlans = [
    {
      id: nextId("PP", state.projectPlans || []),
      projectId: project.id,
      date: input.date || TODAY_ISO,
      type: input.type,
      title: input.title.trim(),
      owner: input.owner.trim() || project.pm,
      status: input.status,
      memo: input.memo.trim(),
    },
    ...(state.projectPlans || []),
  ];
  project.currentPhase = input.phase?.trim() || project.currentPhase;
  project.lastUpdatedAt = TODAY_ISO;
  saveState();
  render();
}

function addOperationHistory(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const system = findOperation(input.operationSystemId);
  if (!system) return;
  state.operationHistories = [
    {
      id: nextId("OH", state.operationHistories),
      operationSystemId: system.id,
      date: input.date || TODAY_ISO,
      type: input.type,
      title: input.title.trim(),
      memo: input.memo.trim(),
      createdBy: input.createdBy.trim() || "運用担当",
    },
    ...state.operationHistories,
  ];
  if (input.type === "inquiry") system.inquiryCount += 1;
  if (input.type === "incident") system.incidentCount += 1;
  if (input.type === "small_change") system.smallChangeCount += 1;
  if (input.type === "audit") system.auditTaskCount += 1;
  if (input.type === "incident" || input.type === "audit") system.operationStatus = input.type === "audit" ? "audit" : "attention";
  system.lastUpdatedAt = input.date || TODAY_ISO;
  system.nextAction = inferNextAction(input.memo, "operation");
  saveState();
  render();
}

function addSignal(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const category = input.category || inferSignalCategory(`${input.title} ${input.description}`);
  const related = findRelatedObject(input.phase, input.relatedId);
  const riskScore = calculateRiskScore({
    severity: input.severity,
    frequency: input.frequency,
    category,
    text: `${input.title} ${input.description}`,
    related,
  });
  const isAttention = riskScore >= 70 || input.forceAttention === "on";
  const signal = {
    id: nextId("SIG", state.signals),
    signalCode: nextId("SIG", state.signals),
    phase: input.phase,
    relatedId: input.relatedId,
    title: input.title.trim(),
    description: input.description.trim(),
    department: input.department,
    category,
    severity: input.severity,
    frequency: input.frequency,
    riskScore,
    isAttention,
    attentionReason: isAttention ? buildAttentionReason(category, riskScore, input.description) : "通常シグナルとして記録",
    recommendedReportTo: riskScore >= 85 ? "executive" : riskScore >= 70 ? "division" : "none",
    status: isAttention ? "attention" : riskScore >= 40 ? "watching" : "new",
    createdAt: TODAY_ISO,
  };
  state.signals = [signal, ...state.signals];
  bumpAttentionCount(signal);
  state.selectedSignalId = signal.id;
  state.view = "attention-signals";
  saveState();
  render();
}

function createEstimate(requestId) {
  const request = findRequest(requestId);
  if (!request) return;
  const version = relatedEstimates(request.id).length + 1;
  const id = nextId("EST", state.estimates);
  const estimate = {
    id,
    estimateCode: id,
    requestId: request.id,
    projectId: "",
    title: `${request.title} 第${version}版概算`,
    version,
    estimateType: version === 1 ? "rough" : "conceptual",
    amount: 0,
    personMonths: 0,
    assumptions: "対象範囲、外部連携、利用部門、データ移行量を確認中。",
    exclusions: "未確定要件、周辺システム改修、長期並行稼働は別途確認。",
    riskLevel: "medium",
    status: "draft",
    dueDate: TODAY_ISO,
    submittedDate: "",
    explanationQuality: "weak",
    feedbackCount: 0,
    createdBy: "担当者",
  };
  state.estimates = [estimate, ...state.estimates];
  state.estimateHistories = [
    {
      id: nextId("EH", state.estimateHistories),
      estimateId: id,
      date: TODAY_ISO,
      title: "見積作成開始",
      memo: "相談～見積ステップから見積版を作成。",
      createdBy: "担当者",
    },
    ...state.estimateHistories,
  ];
  request.status = "estimating";
  request.lastUpdatedAt = TODAY_ISO;
  state.selectedEstimateId = id;
  state.view = "estimate-detail";
}

function createEstimateVersion(estimateId) {
  const base = findEstimate(estimateId);
  if (!base) return;
  const version = Math.max(...relatedEstimates(base.requestId).map((item) => item.version), 0) + 1;
  const id = nextId("EST", state.estimates);
  const estimate = {
    ...base,
    id,
    estimateCode: id,
    title: `${requestTitle(base.requestId)} 第${version}版${labels.estimateType.revised_conceptual}`,
    version,
    estimateType: "revised_conceptual",
    amount: Math.round(base.amount * 1.08),
    personMonths: Math.round(base.personMonths * 1.08),
    status: "draft",
    submittedDate: "",
    explanationQuality: "normal",
    feedbackCount: 0,
  };
  state.estimates = [estimate, ...state.estimates];
  state.estimateHistories = [
    {
      id: nextId("EH", state.estimateHistories),
      estimateId: id,
      date: TODAY_ISO,
      title: "改訂版を追加",
      memo: "前版をコピーし、変更がある前提だけ更新する想定。",
      createdBy: estimate.createdBy,
    },
    ...state.estimateHistories,
  ];
  state.selectedEstimateId = id;
  state.view = "estimate-detail";
}

function createProject(requestId) {
  const request = findRequest(requestId);
  if (!request) return;
  const estimate = relatedEstimates(request.id).sort((a, b) => b.version - a.version)[0];
  const id = nextId("PRJ", state.projects);
  const project = {
    id,
    projectCode: id,
    title: request.title.replace("対応", "プロジェクト"),
    requestId: request.id,
    requesterCompany: request.requesterCompany,
    department: request.department,
    owner: `${request.department}長`,
    pm: "未設定",
    amount: estimate?.amount || 0,
    startDate: TODAY_ISO.slice(0, 7),
    plannedEndDate: request.desiredTiming,
    currentPhase: "立ち上げ",
    overallStatus: request.attentionSignalCount > 0 ? "attention" : "normal",
    trend: "stable",
    scheduleStatus: "normal",
    profitabilityStatus: "normal",
    qualityStatus: "normal",
    staffingStatus: request.attentionSignalCount > 0 ? "attention" : "normal",
    customerStatus: "normal",
    attentionSignalCount: request.attentionSignalCount,
    estimateRevisionCount: relatedEstimates(request.id).length,
    nextReportTo: request.attentionSignalCount > 0 ? "division" : "none",
    lastUpdatedAt: TODAY_ISO,
    latestComment: "相談～見積ステップからプロジェクト化。初回計画を確認中。",
  };
  state.projects = [project, ...state.projects];
  request.status = "likely_order";
  request.lastUpdatedAt = TODAY_ISO;
  if (estimate) estimate.projectId = id;
  state.projectUpdates = [
    {
      id: nextId("PU", state.projectUpdates),
      projectId: id,
      date: TODAY_ISO,
      overallStatus: project.overallStatus,
      trend: project.trend,
      comment: "相談～見積ステップからプロジェクト化。",
      supportNeeded: "none",
      aiSummary: "初期状態を登録。今後は週次・月次更新を蓄積する。",
    },
    ...state.projectUpdates,
  ];
  state.projectPlans = [
    {
      id: nextId("PP", state.projectPlans || []),
      projectId: id,
      date: TODAY_ISO,
      type: "milestone",
      title: "初回計画確認",
      owner: project.pm,
      status: "planned",
      memo: "立ち上げ後の予定、見積経緯、体制を確認する。",
    },
    ...(state.projectPlans || []),
  ];
  state.selectedProjectId = id;
  state.view = "project-detail";
}

function migrateOperation(projectId) {
  const project = findProject(projectId);
  if (!project) return;
  const existing = state.operationSystems.find((item) => item.relatedProjectId === project.id);
  if (existing) {
    state.selectedOperationSystemId = existing.id;
    state.view = "operation-detail";
    return;
  }
  const id = nextId("OPS", state.operationSystems);
  const system = {
    id,
    systemCode: id,
    systemName: project.title.replace("プロジェクト", "システム").replace("更改", ""),
    requesterCompany: project.requesterCompany,
    department: project.department,
    relatedProjectId: project.id,
    startedAt: TODAY_ISO.slice(0, 7),
    isJSOX: /会計|販売|基幹|生産/.test(project.title),
    operationStatus: "attention",
    inquiryCount: 0,
    incidentCount: 0,
    smallChangeCount: 0,
    auditTaskCount: /会計|販売|基幹|生産/.test(project.title) ? 1 : 0,
    openIssueCount: 1,
    dependencyRisk: "medium",
    successorRisk: "medium",
    attentionSignalCount: 0,
    lastUpdatedAt: TODAY_ISO,
    nextAction: "初期保守体制と監査対応範囲を整理",
  };
  state.operationSystems = [system, ...state.operationSystems];
  state.operationHistories = [
    {
      id: nextId("OH", state.operationHistories),
      operationSystemId: id,
      date: TODAY_ISO,
      type: "memo",
      title: "保守・運用へ移行",
      memo: "プロジェクトから保守・運用対象として登録。",
      createdBy: project.pm,
    },
    ...state.operationHistories,
  ];
  project.overallStatus = "completed";
  project.lastUpdatedAt = TODAY_ISO;
  state.selectedOperationSystemId = id;
  state.view = "operation-detail";
}

function markRequestForDivision(requestId) {
  const request = findRequest(requestId);
  if (!request) return;
  const id = nextId("SIG", state.signals);
  state.signals = [
    {
      id,
      signalCode: id,
      phase: "request",
      relatedId: request.id,
      title: `${request.title}を本部長共有候補に設定`,
      description: request.summary,
      department: request.department,
      category: inferSignalCategory(request.summary),
      severity: "medium",
      frequency: "sometimes",
      riskScore: 72,
      isAttention: true,
      attentionReason: "相談段階だが上位層が早めに見るべき候補",
      recommendedReportTo: "division",
      status: "attention",
      createdAt: TODAY_ISO,
    },
    ...state.signals,
  ];
  request.attentionSignalCount += 1;
  request.nextAction = "本部長確認候補として背景と要員影響を整理";
  request.lastUpdatedAt = TODAY_ISO;
}

function updateSignalAction(action, signalId) {
  const signal = findSignal(signalId);
  if (!signal) return;
  if (action === "signal-watch") {
    signal.status = "watching";
  }
  if (action === "signal-division") {
    signal.status = "attention";
    signal.recommendedReportTo = "division";
    signal.attentionReason = `${signal.attentionReason || ""} / 本部長確認候補`;
  }
  if (action === "signal-executive") {
    signal.status = "attention";
    signal.recommendedReportTo = "executive";
    signal.attentionReason = `${signal.attentionReason || ""} / 幹部会報告候補`;
  }
  if (action === "signal-close") {
    signal.status = "closed";
  }
}

function render() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main">
        <div class="page">
          ${renderCurrentView()}
          <p class="footer-note">プロトタイプ日付: ${TODAY_LABEL} / データはブラウザの localStorage に保存されます。</p>
        </div>
      </main>
    </div>
  `;
}

function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">BF</div>
        <h1>業務フロー統合型・予兆管理プラットフォーム</h1>
        <p>Business Flow & Signal Management</p>
      </div>
      ${renderNavSection("共通", [
        ["overview", "トップ / 説明", ""],
        ["comparison", "初期版と本番化", ""],
      ])}
      ${renderNavSection("経営・俯瞰", [
        ["executive-dashboard", "経営ダッシュボード", ""],
        ["attention-signals", "要注意シグナル", String(attentionSignals().length)],
        ["ai-qa", "AI質問画面", ""],
      ])}
      ${renderNavSection("業務フロー", [
        ["requests", "相談～見積一覧", String(state.requests.length)],
        ["request-detail", "相談～見積詳細", ""],
        ["estimates", "見積履歴一覧", String(state.estimates.length)],
        ["estimate-detail", "見積詳細 / AI支援", ""],
        ["projects", "プロジェクトポートフォリオ", String(state.projects.length)],
        ["project-detail", "プロジェクト詳細", ""],
        ["operations", "保守・運用一覧", String(state.operationSystems.length)],
        ["operation-detail", "保守・運用詳細", ""],
      ])}
      ${renderNavSection("入力", [
        ["signal-form", "シグナル登録", ""],
      ])}
      <div class="nav-section">
        <button class="btn danger" data-reset>データ初期化</button>
      </div>
    </aside>
  `;
}

function renderNavSection(title, items) {
  return `
    <div class="nav-section">
      <p class="nav-section-title">${escapeHtml(title)}</p>
      ${items
        .map(([view, label, count]) => `
          <button class="nav-button ${state.view === view ? "active" : ""}" data-view="${view}">
            <span>${escapeHtml(label)}</span>
            ${count ? `<span class="nav-badge">${escapeHtml(count)}</span>` : ""}
          </button>
        `)
        .join("")}
    </div>
  `;
}

function renderCurrentView() {
  if (state.view === "executive-dashboard") return renderExecutiveDashboard();
  if (state.view === "requests") return renderRequests();
  if (state.view === "request-detail") return renderRequestDetail();
  if (state.view === "estimates") return renderEstimates();
  if (state.view === "estimate-detail") return renderEstimateDetail();
  if (state.view === "projects") return renderProjects();
  if (state.view === "project-detail") return renderProjectDetail();
  if (state.view === "operations") return renderOperations();
  if (state.view === "operation-detail") return renderOperationDetail();
  if (state.view === "attention-signals") return renderAttentionSignals();
  if (state.view === "signal-form") return renderSignalForm();
  if (state.view === "ai-qa") return renderAiQa();
  if (state.view === "comparison") return renderComparison();
  return renderOverview();
}

function renderPageHeader(kicker, title, lead, actions = "") {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(kicker)}</p>
        <h2>${escapeHtml(title)}</h2>
        <p class="lead">${escapeHtml(lead)}</p>
      </div>
      ${actions ? `<div class="top-actions">${actions}</div>` : ""}
    </div>
  `;
}

function renderOverview() {
  return `
    ${renderPageHeader(
      "CONCEPT",
      "相談～見積から保守までを3つの流れで見る",
      "相談～見積、プロジェクト、保守・運用を別々の資料で管理せず、履歴と要注意シグナルを横断して見る説明用プロトタイプです。",
      `<button class="btn primary" data-view="executive-dashboard">経営ダッシュボード</button><button class="btn" data-view="requests">相談～見積を見る</button>`,
    )}
    <div class="message-band">
      <strong>この仕組みは、相談～見積、プロジェクト、保守・運用を別々に管理するのではなく、一連の業務ライフサイクルとしてつなぎます。</strong><br>
      各フェーズで発生する情報を履歴として蓄積し、AIが要約・分類・リスク検知を支援します。
      小さな違和感はシグナルとして拾い、重要なものは要注意シグナルとして本部長・幹部が確認できます。
      目的は監視ではなく、見積負荷を下げ、プロジェクト状況と保守・運用の隠れた負荷を早期に把握することです。
    </div>
    <section class="section">
      <div class="flow lifecycle-flow">
        ${renderFlowStep("1", "相談～見積", "将来売上の入口", "正式案件になる前の相談、見積版、前提条件、次アクションを軽く記録します。")}
        ${renderFlowStep("2", "プロジェクト", "受注後の売上を管理", "進捗、採算、品質、要員、顧客の変化を週次・月次で追加します。")}
        ${renderFlowStep("3", "保守・運用", "継続売上を見える化", "問い合わせ、障害、小改修、監査対応、属人化リスクを蓄積します。")}
      </div>
    </section>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>横断する仕組み</h3>
        <div class="axis-grid section">
          <div class="axis-card">
            <h4>要注意シグナル</h4>
            <p>各フェーズの小さな違和感から、本部長・幹部が見るべき兆候を抽出します。</p>
          </div>
          <div class="axis-card">
            <h4>疑似AI支援</h4>
            <p>分類、要約、リスクスコア、見積説明文、不足前提の提示を関数で再現します。</p>
          </div>
        </div>
      </div>
      <div class="panel">
        <h3>UI/UXの前提</h3>
        <ul class="safety-list">
          <li>入力は短いメモを追加する体験を中心にします。</li>
          <li>履歴はタイムライン形式で自然に積み上げます。</li>
          <li>詳細はタブで切り替え、過去の経緯を追いやすくします。</li>
          <li>AIは現場評価ではなく、要約・分類・見積支援・予兆検知の補助として扱います。</li>
        </ul>
      </div>
    </section>
  `;
}

function renderFlowStep(number, title, label, description) {
  return `
    <div class="flow-step">
      <div class="flow-kicker">STEP ${escapeHtml(number)}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      <p><strong>${escapeHtml(label)}</strong></p>
    </div>
  `;
}

function renderExecutiveDashboard() {
  const dashboard = buildExecutiveDecisionDashboard();

  return `
    ${renderPageHeader(
      "EXECUTIVE DASHBOARD",
      "経営ダッシュボード",
      "今後の売上、正社員要員、外注最適化、採算、重大障害を短時間で判断する画面です。",
      `<button class="btn primary" data-action="toggle-dashboard-settings">表示設定</button><button class="btn" data-view="ai-qa">AIに質問する</button>`,
    )}
    ${renderExecutiveDashboardControls()}
    ${renderExecutiveDashboardMessage()}
    ${renderRevenueForecast(buildRevenueForecast())}
    ${renderExecutiveKpiCards(dashboard)}
    <div class="executive-dashboard-layout">
      <div class="executive-dashboard-main">
        ${renderExecutiveDashboardSections(dashboard)}
      </div>
      ${state.executiveDashboard.settingsOpen ? renderExecutiveSettingsPanel() : ""}
    </div>
  `;
}

function renderRequests() {
  const rows = filteredRequests();
  return `
    ${renderPageHeader(
      "REQUESTS",
      "相談～見積一覧",
      "正式案件になる前の需要と見積状況を、背景、所管課、予算化予定、次アクションで可視化します。",
      `<button class="btn primary" data-view="request-detail">選択中の詳細</button>`,
    )}
    ${renderRequestFilters()}
    ${renderTable(
      ["相談ID", "相談タイトル", "依頼元", "背景", "対象システム", "所管課", "希望時期", "規模", "予算化", "状態", "要注意", "最終更新", "次アクション"],
      rows.map((item) => [
        escapeHtml(item.requestCode),
        renderRequestButton(item),
        escapeHtml(item.requesterCompany),
        badge(labels.background[item.background], "neutral"),
        escapeHtml(item.targetSystem),
        escapeHtml(item.department),
        escapeHtml(item.desiredTiming),
        badge(labels.roughSize[item.roughSize], item.roughSize === "large" || item.roughSize === "very_large" ? "high" : "neutral"),
        escapeHtml(labels.budgetPlan[item.budgetPlan]),
        badge(labels.requestStatus[item.status], item.status === "estimating" ? "medium" : "info"),
        String(attentionCount("request", item.id)),
        escapeHtml(item.lastUpdatedAt),
        escapeHtml(item.nextAction),
      ]),
      "portfolio-table",
    )}
  `;
}

function renderRequestFilters() {
  const filter = state.filters.request;
  return `
    <div class="filter-bar">
      ${filterSelect("request", "requesterCompany", "依頼元", [["all", "すべて"], ...unique(state.requests.map((item) => item.requesterCompany)).map((value) => [value, value])])}
      ${filterSelect("request", "department", "所管課", [["all", "すべて"], ...unique(state.requests.map((item) => item.department)).map((value) => [value, value])])}
      ${filterSelect("request", "background", "背景分類", [["all", "すべて"], ...Object.entries(labels.background)])}
      ${filterSelect("request", "status", "状態", [["all", "すべて"], ...Object.entries(labels.requestStatus)])}
      ${filterSelect("request", "budgetPlan", "予算化予定", [["all", "すべて"], ...Object.entries(labels.budgetPlan)])}
      ${filterSelect("request", "attentionOnly", "要注意", [["all", "すべて"], ["yes", "あり"]])}
      <button class="btn" data-action="reset-filters" data-filter-group="request">フィルタ解除</button>
    </div>
  `;
}

function renderRequestDetail() {
  const request = findRequest(state.selectedRequestId) || state.requests[0];
  if (!request) return `<div class="empty">相談～見積の対象がありません。</div>`;
  const histories = relatedRequestHistories(request.id);
  const estimates = relatedEstimates(request.id);
  const projects = relatedProjects(request.id);
  const signals = relatedSignals("request", request.id);
  return `
    ${renderPageHeader(
      "REQUEST DETAIL",
      "相談～見積詳細",
      "1つの相談の経緯、関連見積、関連プロジェクト、要注意シグナルを追います。",
      `<button class="btn" data-view="requests">一覧へ</button><button class="btn primary" data-action="create-estimate" data-request-id="${escapeAttr(request.id)}">見積を作成</button>`,
    )}
    <section class="section panel">
      <div class="section-header">
        <div>
          <h3>${escapeHtml(request.title)}</h3>
          <p class="section-note">${escapeHtml(request.summary)}</p>
        </div>
        ${badge(labels.requestStatus[request.status], "info")}
      </div>
      <dl class="definition-list">
        <dt>相談ID</dt><dd>${escapeHtml(request.requestCode)}</dd>
        <dt>依頼元</dt><dd>${escapeHtml(request.requesterCompany)}</dd>
        <dt>背景</dt><dd>${badge(labels.background[request.background], "neutral")}</dd>
        <dt>対象システム</dt><dd>${escapeHtml(request.targetSystem)}</dd>
        <dt>希望時期</dt><dd>${escapeHtml(request.desiredTiming)}</dd>
        <dt>所管課</dt><dd>${escapeHtml(request.department)}</dd>
        <dt>想定スキル</dt><dd>${escapeHtml(request.expectedSkill)}</dd>
        <dt>概算規模</dt><dd>${escapeHtml(labels.roughSize[request.roughSize])}</dd>
        <dt>予算化予定</dt><dd>${escapeHtml(labels.budgetPlan[request.budgetPlan])}</dd>
        <dt>次アクション</dt><dd>${escapeHtml(request.nextAction)}</dd>
      </dl>
      <div class="actions">
        <button class="btn" data-action="share-request" data-request-id="${escapeAttr(request.id)}">本部長共有候補にする</button>
        <button class="btn" data-view="signal-form" data-request-id="${escapeAttr(request.id)}">要注意シグナルを追加</button>
        <button class="btn primary" data-action="create-project" data-request-id="${escapeAttr(request.id)}">プロジェクト化する</button>
      </div>
      ${renderAiDisclosure(
        "AI要約・示唆",
        `<p class="section-note">${escapeHtml(aiRequestSummary(request))}</p>
        <div class="axis-grid section">
          <div class="axis-card"><h4>関連見積</h4><p>${estimates.length} 件</p></div>
          <div class="axis-card"><h4>関連プロジェクト</h4><p>${projects.length} 件</p></div>
          <div class="axis-card"><h4>要注意シグナル</h4><p>${attentionCount("request", request.id)} 件</p></div>
        </div>`,
      )}
    </section>
    ${renderTabs("request", [
      ["history", "相談履歴", `
        ${renderTimeline(histories, (history) => `${history.date} ${history.title}`, (history) => `${history.memo} / ${history.createdBy}`)}
        ${renderRequestHistoryForm(request)}
      `],
      ["estimates", "関連見積", renderTable(["見積", "版", "金額", "状態"], estimates.map((item) => [renderEstimateButton(item), String(item.version), escapeHtml(formatCurrency(item.amount)), badge(labels.estimateStatus[item.status], "neutral")]))],
      ["projects", "関連プロジェクト", renderTable(["プロジェクト", "状態", "推移", "報告先"], projects.map((item) => [renderProjectButton(item), renderOverallStatus(item.overallStatus), renderTrend(item.trend), escapeHtml(labels.reportTo[item.nextReportTo])]))],
      ["signals", "関連シグナル", renderSignalTable(signals)],
    ])}
  `;
}

function renderRequestHistoryForm(request) {
  return `
    <form id="request-history-form" class="section">
      <input type="hidden" name="requestId" value="${escapeAttr(request.id)}">
      <div class="form-grid">
        <div class="field"><label>日付</label><input name="date" type="date" value="${TODAY_ISO}"></div>
        <div class="field"><label>記入者</label><input name="createdBy" value="担当者"></div>
        <div class="field full"><label>タイトル</label><input name="title" required placeholder="例：追加確認"></div>
        <div class="field full"><label>メモ</label><textarea name="memo" required placeholder="短い相談メモを追加"></textarea></div>
      </div>
      <div class="actions"><button class="btn primary" type="submit">相談メモを追加</button></div>
    </form>
  `;
}

function renderEstimates() {
  const rows = filteredEstimates();
  return `
    ${renderPageHeader(
      "ESTIMATES",
      "見積一覧",
      "見積作成状況、版数、根拠の充足度、指摘有無を確認します。",
      `<button class="btn primary" data-view="estimate-detail">選択中の見積支援</button>`,
    )}
    ${renderEstimateFilters()}
    ${renderTable(
      ["見積ID", "関連相談", "見積タイトル", "依頼元", "種別", "版数", "金額", "工数", "状態", "作成者", "提出期限", "提出日", "根拠", "指摘", "関連シグナル"],
      rows.map((item) => {
        const request = findRequest(item.requestId);
        return [
          escapeHtml(item.estimateCode),
          request ? renderRequestButton(request) : badge("なし", "neutral"),
          renderEstimateButton(item),
          escapeHtml(request?.requesterCompany || ""),
          badge(labels.estimateType[item.estimateType], "info"),
          String(item.version),
          escapeHtml(formatCurrency(item.amount)),
          `${item.personMonths}人月`,
          badge(labels.estimateStatus[item.status], item.status === "feedback" ? "high" : "neutral"),
          escapeHtml(item.createdBy),
          escapeHtml(item.dueDate),
          escapeHtml(item.submittedDate || "-"),
          badge(labels.explanationQuality[item.explanationQuality], item.explanationQuality === "weak" ? "high" : "neutral"),
          item.feedbackCount > 0 ? badge("あり", "high") : badge("なし", "low"),
          String(attentionCount("estimate", item.id)),
        ];
      }),
      "portfolio-table",
    )}
  `;
}

function renderEstimateFilters() {
  return `
    <div class="filter-bar">
      ${filterSelect("estimate", "estimateType", "見積種別", [["all", "すべて"], ...Object.entries(labels.estimateType)])}
      ${filterSelect("estimate", "status", "状態", [["all", "すべて"], ...Object.entries(labels.estimateStatus)])}
      ${filterSelect("estimate", "explanationQuality", "根拠充足度", [["all", "すべて"], ...Object.entries(labels.explanationQuality)])}
      ${filterSelect("estimate", "feedbackOnly", "指摘", [["all", "すべて"], ["yes", "あり"]])}
      <button class="btn" data-action="reset-filters" data-filter-group="estimate">フィルタ解除</button>
    </div>
  `;
}

function renderEstimateDetail() {
  const estimate = findEstimate(state.selectedEstimateId) || state.estimates[0];
  if (!estimate) return `<div class="empty">見積がありません。</div>`;
  const request = findRequest(estimate.requestId);
  const histories = relatedEstimateHistories(estimate.id);
  const ai = pseudoEstimateSupport(estimate);
  return `
    ${renderPageHeader(
      "ESTIMATE DETAIL",
      "見積詳細 / 見積支援AI",
      "見積版、前提、除外事項、指摘履歴を蓄積し、疑似AIが説明文と不足前提を提示します。",
      `<button class="btn" data-view="estimates">一覧へ</button><button class="btn primary" data-action="create-estimate-version" data-estimate-id="${escapeAttr(estimate.id)}">見積版を追加</button>`,
    )}
    <section class="section panel">
      <div class="section-header">
        <div>
          <h3>${escapeHtml(estimate.title)}</h3>
          <p class="section-note">${escapeHtml(request?.title || "関連相談なし")}</p>
        </div>
        ${badge(labels.estimateStatus[estimate.status], "info")}
      </div>
      <dl class="definition-list">
        <dt>見積ID</dt><dd>${escapeHtml(estimate.estimateCode)}</dd>
        <dt>関連相談</dt><dd>${request ? renderRequestButton(request) : "なし"}</dd>
        <dt>見積版数</dt><dd>第${estimate.version}版</dd>
        <dt>見積種別</dt><dd>${escapeHtml(labels.estimateType[estimate.estimateType])}</dd>
        <dt>前提条件</dt><dd>${escapeHtml(estimate.assumptions)}</dd>
        <dt>除外事項</dt><dd>${escapeHtml(estimate.exclusions)}</dd>
        <dt>工数</dt><dd>${estimate.personMonths}人月</dd>
        <dt>金額</dt><dd>${escapeHtml(formatCurrency(estimate.amount))}</dd>
        <dt>リスク係数</dt><dd>${escapeHtml(labels.riskLevel[estimate.riskLevel])}</dd>
        <dt>提出期限</dt><dd>${escapeHtml(estimate.dueDate)}</dd>
        <dt>根拠充足度</dt><dd>${escapeHtml(labels.explanationQuality[estimate.explanationQuality])}</dd>
      </dl>
      <div class="actions">
        <button class="btn">見積前提を追加</button>
        <button class="btn">指摘・コメントを追加</button>
        <button class="btn warning">AIで説明文を生成</button>
        <button class="btn warning">AIで不足前提をチェック</button>
        <button class="btn">類似過去見積を表示</button>
      </div>
      ${renderAiDisclosure(
        "AI支援パネル",
        `
        <dl class="definition-list">
          <dt>類似過去見積</dt><dd>${escapeHtml(ai.similar)}</dd>
          <dt>不足前提</dt><dd>${escapeHtml(ai.missingAssumptions)}</dd>
          <dt>確認質問</dt><dd>${escapeHtml(ai.questions)}</dd>
          <dt>WBS案</dt><dd>${escapeHtml(ai.wbs)}</dd>
          <dt>説明文案</dt><dd>${escapeHtml(ai.explanation)}</dd>
          <dt>除外事項候補</dt><dd>${escapeHtml(ai.exclusions)}</dd>
          <dt>根拠が弱い項目</dt><dd>${escapeHtml(ai.weakPoints)}</dd>
        </dl>`,
      )}
    </section>
    ${renderTabs("estimate", [
      ["history", "見積履歴", `
        ${renderTimeline(histories, (history) => `${history.date} ${history.title}`, (history) => `${history.memo} / ${history.createdBy}`)}
        ${renderEstimateHistoryForm(estimate)}
      `],
      ["signals", "関連シグナル", renderSignalTable(relatedSignals("estimate", estimate.id))],
    ])}
  `;
}

function renderEstimateHistoryForm(estimate) {
  return `
    <form id="estimate-history-form" class="section">
      <input type="hidden" name="estimateId" value="${escapeAttr(estimate.id)}">
      <div class="form-grid">
        <div class="field"><label>日付</label><input name="date" type="date" value="${TODAY_ISO}"></div>
        <div class="field"><label>記入者</label><input name="createdBy" value="${escapeAttr(estimate.createdBy)}"></div>
        <div class="field full"><label>タイトル</label><input name="title" required placeholder="例：前提条件を追加"></div>
        <div class="field full"><label>メモ</label><textarea name="memo" required placeholder="依頼元からの指摘、前提追加、除外事項の変更など"></textarea></div>
      </div>
      <div class="actions"><button class="btn primary" type="submit">指摘・コメントを追加</button></div>
    </form>
  `;
}

function renderProjects() {
  const rows = filteredProjects();
  return `
    ${renderPageHeader(
      "PROJECT PORTFOLIO",
      "プロジェクトポートフォリオ",
      "進捗、採算、品質、要員、顧客の5軸と推移で、複数プロジェクトを俯瞰します。",
      `<button class="btn primary" data-view="project-detail">選択中の詳細</button>`,
    )}
    ${renderProjectFilters()}
    ${renderTable(
      ["プロジェクトID", "プロジェクト名", "依頼元", "部門", "PM", "金額", "期間", "フェーズ", "次の予定", "総合", "推移", "進捗", "採算", "品質", "要員", "顧客", "要注意", "見積改訂", "最終更新", "次回報告先"],
      rows.map((item) => {
        const plan = nextProjectPlan(item.id);
        return [
          escapeHtml(item.projectCode),
          renderProjectButton(item),
          escapeHtml(item.requesterCompany),
          escapeHtml(item.department),
          escapeHtml(item.pm),
          escapeHtml(formatCurrency(item.amount)),
          escapeHtml(`${item.startDate}〜${item.plannedEndDate}`),
          escapeHtml(item.currentPhase),
          plan ? `${escapeHtml(plan.date)}<div class="cell-sub">${escapeHtml(plan.title)}</div>` : badge("未登録", "neutral"),
          renderOverallStatus(item.overallStatus),
          renderTrend(item.trend),
          renderStatusLevel(item.scheduleStatus),
          renderStatusLevel(item.profitabilityStatus),
          renderStatusLevel(item.qualityStatus),
          renderStatusLevel(item.staffingStatus),
          renderStatusLevel(item.customerStatus),
          String(attentionCount("project", item.id)),
          String(item.estimateRevisionCount),
          escapeHtml(item.lastUpdatedAt),
          escapeHtml(labels.reportTo[item.nextReportTo]),
        ];
      }),
      "portfolio-table",
    )}
  `;
}

function renderProjectFilters() {
  return `
    <div class="filter-bar">
      ${filterSelect("project", "department", "所管部門", [["all", "すべて"], ...unique(state.projects.map((item) => item.department)).map((value) => [value, value])])}
      ${filterSelect("project", "overallStatus", "総合状態", [["all", "すべて"], ...Object.entries(labels.overallStatus)])}
      ${filterSelect("project", "trend", "推移", [["all", "すべて"], ...Object.entries(labels.trend)])}
      ${filterSelect("project", "attentionOnly", "要注意", [["all", "すべて"], ["yes", "あり"]])}
      ${filterSelect("project", "reportTo", "報告候補", [["all", "すべて"], ["division", "本部長"], ["executive", "幹部会"]])}
      ${filterSelect("project", "amountScale", "金額規模", [["all", "すべて"], ["large", "5億円以上"], ["mid", "1億円以上"]])}
      <button class="btn" data-action="reset-filters" data-filter-group="project">フィルタ解除</button>
    </div>
  `;
}

function renderProjectDetail() {
  const project = findProject(state.selectedProjectId) || state.projects[0];
  if (!project) return `<div class="empty">プロジェクトがありません。</div>`;
  const updates = relatedProjectUpdates(project.id);
  const plans = relatedProjectPlans(project.id);
  const nextPlan = nextProjectPlan(project.id);
  const estimates = state.estimates.filter((item) => item.projectId === project.id || item.requestId === project.requestId);
  const request = findRequest(project.requestId);
  return `
    ${renderPageHeader(
      "PROJECT DETAIL",
      "プロジェクト詳細",
      "プロジェクト状態、更新履歴、見積経緯、要注意シグナルを確認します。",
      `<button class="btn" data-view="projects">一覧へ</button><button class="btn primary" data-action="migrate-operation" data-project-id="${escapeAttr(project.id)}">保守・運用へ移行</button>`,
    )}
    <section class="section panel">
      <div class="section-header">
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p class="section-note">${escapeHtml(project.latestComment)}</p>
        </div>
        <div class="stack">${renderOverallStatus(project.overallStatus)}${renderTrend(project.trend)}</div>
      </div>
      <dl class="definition-list">
        <dt>関連相談</dt><dd>${request ? renderRequestButton(request) : "なし"}</dd>
        <dt>関連見積</dt><dd>${estimates.length} 件</dd>
        <dt>依頼元</dt><dd>${escapeHtml(project.requesterCompany)}</dd>
        <dt>金額</dt><dd>${escapeHtml(formatCurrency(project.amount))}</dd>
        <dt>期間</dt><dd>${escapeHtml(`${project.startDate}〜${project.plannedEndDate}`)}</dd>
        <dt>現在フェーズ</dt><dd>${escapeHtml(project.currentPhase)}</dd>
        <dt>次の予定</dt><dd>${nextPlan ? `${escapeHtml(nextPlan.date)} ${escapeHtml(nextPlan.title)} ${badge(labels.projectPlanStatus[nextPlan.status], planTone(nextPlan.status))}` : "未登録"}</dd>
        <dt>責任者</dt><dd>${escapeHtml(project.owner)}</dd>
        <dt>PM</dt><dd>${escapeHtml(project.pm)}</dd>
        <dt>状態軸</dt><dd>${renderProjectAxisBadges(project)}</dd>
        <dt>次回報告先</dt><dd>${escapeHtml(labels.reportTo[project.nextReportTo])}</dd>
      </dl>
      <div class="actions">
        <button class="btn" data-tab-group="project" data-tab="plans">予定を見る</button>
        <button class="btn" data-tab-group="project" data-tab="updates">更新履歴を見る</button>
        <button class="btn">課題を追加</button>
        <button class="btn" data-view="signal-form" data-project-id="${escapeAttr(project.id)}">要注意シグナルを追加</button>
        <button class="btn" data-action="create-estimate" data-request-id="${escapeAttr(project.requestId)}">見積を追加</button>
        <button class="btn">会議メモを追加</button>
        <button class="btn">関連資料を追加</button>
      </div>
      ${renderAiDisclosure(
        "AI要約・示唆",
        `<p class="section-note">${escapeHtml(aiProjectSummary(project))}</p>
        ${state.lastAiResult?.projectId === project.id ? renderProjectAiResult(state.lastAiResult) : ""}`,
      )}
    </section>
    ${renderTabs("project", [
      ["plans", "予定", `
        ${renderProjectPlansTable(plans)}
        ${renderProjectPlanForm(project)}
      `],
      ["updates", "更新履歴", `
        ${renderTimeline(updates, (update) => `${update.date} ${labels.overallStatus[update.overallStatus]} / ${labels.trend[update.trend]}`, (update) => `${update.comment} / 支援: ${labels.supportNeeded[update.supportNeeded]} / AI: ${update.aiSummary}`)}
        ${renderProjectUpdateForm(project)}
      `],
      ["estimates", "見積経緯", renderTable(["見積", "版", "金額", "状態"], estimates.map((item) => [renderEstimateButton(item), String(item.version), escapeHtml(formatCurrency(item.amount)), badge(labels.estimateStatus[item.status], "neutral")]))],
      ["signals", "関連シグナル", renderSignalTable(relatedSignals("project", project.id))],
    ])}
  `;
}

function renderProjectPlansTable(plans) {
  return renderTable(
    ["日付", "種別", "予定", "担当", "状態", "メモ"],
    plans.map((plan) => [
      escapeHtml(plan.date),
      badge(labels.projectPlanType[plan.type], "info"),
      escapeHtml(plan.title),
      escapeHtml(plan.owner),
      badge(labels.projectPlanStatus[plan.status], planTone(plan.status)),
      escapeHtml(plan.memo),
    ]),
  );
}

function renderProjectPlanForm(project) {
  return `
    <form id="project-plan-form" class="section">
      <input type="hidden" name="projectId" value="${escapeAttr(project.id)}">
      <div class="form-grid">
        <div class="field"><label>予定日</label><input name="date" type="date" value="${TODAY_ISO}"></div>
        <div class="field"><label>種別</label><select name="type">${renderEnumOptions(labels.projectPlanType, "milestone")}</select></div>
        <div class="field"><label>状態</label><select name="status">${renderEnumOptions(labels.projectPlanStatus, "planned")}</select></div>
        <div class="field"><label>担当</label><input name="owner" value="${escapeAttr(project.pm)}"></div>
        <div class="field full"><label>予定タイトル</label><input name="title" required placeholder="例：基本設計レビュー"></div>
        <div class="field"><label>現在フェーズ更新</label><input name="phase" value="${escapeAttr(project.currentPhase)}"></div>
        <div class="field full"><label>メモ</label><textarea name="memo" required placeholder="確認観点、合意したいこと、遅延時の対応など"></textarea></div>
      </div>
      <div class="actions"><button class="btn primary" type="submit">予定を追加</button></div>
    </form>
  `;
}

function renderProjectUpdateForm(project) {
  return `
    <form id="project-update-form" class="section">
      <input type="hidden" name="projectId" value="${escapeAttr(project.id)}">
      <div class="form-grid">
        <div class="field"><label>日付</label><input name="date" type="date" value="${TODAY_ISO}"></div>
        <div class="field"><label>総合状態</label><select name="overallStatus">${renderEnumOptions(labels.overallStatus, project.overallStatus)}</select></div>
        <div class="field"><label>前回からの変化</label><select name="trend">${renderEnumOptions(labels.trend, project.trend)}</select></div>
        <div class="field"><label>必要な支援</label><select name="supportNeeded">${renderEnumOptions(labels.supportNeeded, project.supportNeeded || "none")}</select></div>
        <div class="field full"><label>一言コメント</label><textarea name="comment" required placeholder="例：追加見積の合意が遅れており、採算悪化のおそれがあります。">${escapeHtml(project.latestComment)}</textarea></div>
      </div>
      <div class="actions"><button class="btn primary" type="submit">週次更新を追加</button></div>
    </form>
  `;
}

function renderOperations() {
  const rows = filteredOperations();
  return `
    ${renderPageHeader(
      "OPERATIONS",
      "保守・運用一覧",
      "本番稼働後の問い合わせ、障害、小改修、監査対応、属人化リスクを可視化します。",
      `<button class="btn primary" data-view="operation-detail">選択中の詳細</button>`,
    )}
    ${renderOperationFilters()}
    ${renderTable(
      ["システムID", "システム名", "依頼元", "担当課", "J-SOX", "運用負荷", "問い合わせ", "障害", "小改修", "監査", "未対応", "属人化", "後継者", "要注意", "最終更新"],
      rows.map((item) => [
        escapeHtml(item.systemCode),
        renderOperationButton(item),
        escapeHtml(item.requesterCompany),
        escapeHtml(item.department),
        item.isJSOX ? badge("対象", "high") : badge("対象外", "neutral"),
        badge(labels.operationStatus[item.operationStatus], item.operationStatus === "high_load" || item.operationStatus === "audit" ? "high" : "neutral"),
        String(item.inquiryCount),
        String(item.incidentCount),
        String(item.smallChangeCount),
        String(item.auditTaskCount),
        String(item.openIssueCount),
        badge(labels.riskLevel[item.dependencyRisk], riskTone(item.dependencyRisk)),
        badge(labels.riskLevel[item.successorRisk], riskTone(item.successorRisk)),
        String(attentionCount("operation", item.id)),
        escapeHtml(item.lastUpdatedAt),
      ]),
      "portfolio-table",
    )}
  `;
}

function renderOperationFilters() {
  return `
    <div class="filter-bar">
      ${filterSelect("operation", "department", "担当課", [["all", "すべて"], ...unique(state.operationSystems.map((item) => item.department)).map((value) => [value, value])])}
      ${filterSelect("operation", "jsoxOnly", "J-SOX", [["all", "すべて"], ["yes", "対象"]])}
      ${filterSelect("operation", "status", "運用負荷", [["all", "すべて"], ...Object.entries(labels.operationStatus)])}
      ${filterSelect("operation", "dependencyRisk", "属人化", [["all", "すべて"], ...Object.entries(labels.riskLevel)])}
      ${filterSelect("operation", "attentionOnly", "要注意", [["all", "すべて"], ["yes", "あり"]])}
      <button class="btn" data-action="reset-filters" data-filter-group="operation">フィルタ解除</button>
    </div>
  `;
}

function renderOperationDetail() {
  const system = findOperation(state.selectedOperationSystemId) || state.operationSystems[0];
  if (!system) return `<div class="empty">保守・運用対象がありません。</div>`;
  const project = findProject(system.relatedProjectId);
  const histories = relatedOperationHistories(system.id);
  return `
    ${renderPageHeader(
      "OPERATION DETAIL",
      "保守・運用詳細",
      "問い合わせ、障害、小改修、監査対応を継続的に登録し、隠れた負荷や属人化リスクを見ます。",
      `<button class="btn" data-view="operations">一覧へ</button><button class="btn primary" data-view="signal-form" data-operation-id="${escapeAttr(system.id)}">要注意シグナルを追加</button>`,
    )}
    <section class="section panel">
      <div class="section-header">
        <div>
          <h3>${escapeHtml(system.systemName)}</h3>
          <p class="section-note">${escapeHtml(system.nextAction)}</p>
        </div>
        ${badge(labels.operationStatus[system.operationStatus], "info")}
      </div>
      <dl class="definition-list">
        <dt>依頼元</dt><dd>${escapeHtml(system.requesterCompany)}</dd>
        <dt>担当課</dt><dd>${escapeHtml(system.department)}</dd>
        <dt>J-SOX対象</dt><dd>${system.isJSOX ? "はい" : "いいえ"}</dd>
        <dt>稼働開始</dt><dd>${escapeHtml(system.startedAt)}</dd>
        <dt>関連プロジェクト</dt><dd>${project ? renderProjectButton(project) : "なし"}</dd>
        <dt>問い合わせ</dt><dd>${system.inquiryCount} 件</dd>
        <dt>障害</dt><dd>${system.incidentCount} 件</dd>
        <dt>小改修</dt><dd>${system.smallChangeCount} 件</dd>
        <dt>監査対応</dt><dd>${system.auditTaskCount} 件</dd>
        <dt>未対応課題</dt><dd>${system.openIssueCount} 件</dd>
        <dt>属人化リスク</dt><dd>${escapeHtml(labels.riskLevel[system.dependencyRisk])}</dd>
        <dt>後継者リスク</dt><dd>${escapeHtml(labels.riskLevel[system.successorRisk])}</dd>
      </dl>
      ${renderAiDisclosure(
        "AI要約・示唆",
        `<p class="section-note">${escapeHtml(aiOperationSummary(system))}</p>
        <div class="axis-grid section">
          <div class="axis-card"><h4>要注意シグナル</h4><p>${attentionCount("operation", system.id)} 件</p></div>
          <div class="axis-card"><h4>監査対応</h4><p>${system.auditTaskCount} 件</p></div>
          <div class="axis-card"><h4>運用負荷</h4><p>${escapeHtml(labels.operationStatus[system.operationStatus])}</p></div>
        </div>`,
      )}
    </section>
    ${renderTabs("operation", [
      ["history", "保守運用履歴", `
        ${renderTimeline(histories, (history) => `${history.date} ${labels.operationHistoryType[history.type]} / ${history.title}`, (history) => `${history.memo} / ${history.createdBy}`)}
        ${renderOperationHistoryForm(system)}
      `],
      ["signals", "関連シグナル", renderSignalTable(relatedSignals("operation", system.id))],
    ])}
  `;
}

function renderOperationHistoryForm(system) {
  return `
    <form id="operation-history-form" class="section">
      <input type="hidden" name="operationSystemId" value="${escapeAttr(system.id)}">
      <div class="form-grid">
        <div class="field"><label>日付</label><input name="date" type="date" value="${TODAY_ISO}"></div>
        <div class="field"><label>種別</label><select name="type">${renderEnumOptions(labels.operationHistoryType, "memo")}</select></div>
        <div class="field"><label>記入者</label><input name="createdBy" value="運用担当"></div>
        <div class="field"><label>タイトル</label><input name="title" required placeholder="例：J-SOX証跡提出依頼"></div>
        <div class="field full"><label>メモ</label><textarea name="memo" required placeholder="保守メモ、問い合わせ、障害、小改修、監査対応を短く記録"></textarea></div>
      </div>
      <div class="actions">
        <button class="btn primary" type="submit">保守運用記録を追加</button>
      </div>
    </form>
  `;
}

function renderAttentionSignals() {
  const signals = filteredSignals();
  return `
    ${renderPageHeader(
      "ATTENTION SIGNALS",
      "要注意シグナル一覧",
      "相談～見積、プロジェクト、保守・運用を横断して、上位層が注意すべき兆候を確認します。",
      `<button class="btn primary" data-view="signal-form">シグナルを追加</button>`,
    )}
    ${renderSignalFilters()}
    ${renderTable(
      ["シグナルID", "タイトル", "発生フェーズ", "関連対象", "部門", "カテゴリ", "スコア", "要注意理由", "推奨報告先", "状態", "作成日", "アクション"],
      signals.map((signal) => [
        escapeHtml(signal.signalCode),
        escapeHtml(signal.title),
        badge(labels.phase[signal.phase], "info"),
        renderRelatedObjectButton(signal),
        escapeHtml(signal.department),
        badge(labels.signalCategory[signal.category], "neutral"),
        renderScore(signal.riskScore),
        escapeHtml(signal.attentionReason || ""),
        escapeHtml(labels.reportTo[signal.recommendedReportTo]),
        badge(labels.signalStatus[signal.status], signal.status === "attention" ? "high" : "neutral"),
        escapeHtml(signal.createdAt),
        `<div class="stack">
          <button class="btn" data-action="signal-watch" data-signal-id="${escapeAttr(signal.id)}">ウォッチ継続</button>
          <button class="btn warning" data-action="signal-division" data-signal-id="${escapeAttr(signal.id)}">本部長共有</button>
          <button class="btn warning" data-action="signal-executive" data-signal-id="${escapeAttr(signal.id)}">幹部会候補</button>
          <button class="btn danger" data-action="signal-close" data-signal-id="${escapeAttr(signal.id)}">クローズ</button>
        </div>`,
      ]),
      "portfolio-table",
    )}
  `;
}

function renderSignalFilters() {
  return `
    <div class="filter-bar">
      ${filterSelect("signal", "phase", "発生フェーズ", [["all", "すべて"], ...Object.entries(labels.phase)])}
      ${filterSelect("signal", "department", "部門", [["all", "すべて"], ...unique(state.signals.map((item) => item.department)).map((value) => [value, value])])}
      ${filterSelect("signal", "category", "カテゴリ", [["all", "すべて"], ...Object.entries(labels.signalCategory)])}
      ${filterSelect("signal", "attentionOnly", "要注意", [["all", "すべて"], ["yes", "要注意のみ"]])}
      ${filterSelect("signal", "reportTo", "報告先", [["all", "すべて"], ["division", "本部長"], ["executive", "幹部会"]])}
      ${filterSelect("signal", "status", "状態", [["all", "すべて"], ...Object.entries(labels.signalStatus)])}
      <button class="btn" data-action="reset-filters" data-filter-group="signal">フィルタ解除</button>
    </div>
  `;
}

function renderSignalForm() {
  const selectedTarget = defaultSignalTarget();
  return `
    ${renderPageHeader(
      "SIGNAL INPUT",
      "シグナル登録",
      "正式な課題でなくてよい小さな違和感を、フェーズと関連対象に紐づけて軽く登録します。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>軽いシグナル入力</h3>
        <form id="signal-form" class="section">
          <div class="form-grid">
            <div class="field"><label>発生フェーズ</label><select name="phase">${renderEnumOptions(labels.phase, selectedTarget.phase)}</select></div>
            <div class="field"><label>関連対象ID</label><input name="relatedId" value="${escapeAttr(selectedTarget.relatedId)}" placeholder="REQ-001 / EST-001 / PRJ-001 / OPS-001"></div>
            <div class="field"><label>部門</label><select name="department">${renderOptions(departments, selectedTarget.department)}</select></div>
            <div class="field"><label>カテゴリ</label><select name="category"><option value="">疑似AIに任せる</option>${Object.entries(labels.signalCategory).map(([value, text]) => `<option value="${escapeAttr(value)}">${escapeHtml(text)}</option>`).join("")}</select></div>
            <div class="field full"><label>タイトル</label><input name="title" required placeholder="例：追加見積の合意が取れていない"></div>
            <div class="field full"><label>気になること</label><textarea name="description" required placeholder="小さな違和感、増えていること、気になる反応などを短く記録"></textarea></div>
            <div class="field"><label>深刻度</label><select name="severity">${renderEnumOptions(labels.severity, "medium")}</select></div>
            <div class="field"><label>発生頻度</label><select name="frequency">${renderEnumOptions(labels.frequency, "sometimes")}</select></div>
            <div class="field full"><label><input type="checkbox" name="forceAttention"> 要注意シグナルとして登録する</label></div>
          </div>
          <div class="actions"><button class="btn primary" type="submit">登録して疑似AI処理</button></div>
        </form>
      </div>
      <div class="ai-result">
        <h3>疑似AIで行うこと</h3>
        <dl class="definition-list">
          <dt>分類</dt><dd>キーワードから採算、要員、見積、監査、属人化などを推定します。</dd>
          <dt>リスクスコア</dt><dd>深刻度、頻度、カテゴリ、J-SOX、大規模、遅延などから算出します。</dd>
          <dt>要注意判定</dt><dd>70点以上を要注意、85点以上を幹部確認候補として扱います。</dd>
          <dt>報告先</dt><dd>スコアと内容から本部長確認候補または幹部会報告候補を推奨します。</dd>
        </dl>
      </div>
    </section>
  `;
}

function renderAiQa() {
  const selected = state.selectedQuestion || sampleQuestions[0];
  return `
    ${renderPageHeader(
      "AI QUESTION",
      "AI質問画面",
      "自然文の質問に対して、ダミーデータと疑似ロジックで回答する画面です。実AI APIは使っていません。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>サンプル質問</h3>
        <div class="question-list section">
          ${sampleQuestions.map((question) => `<button class="question-button ${question === selected ? "active" : ""}" data-question="${escapeAttr(question)}">${escapeHtml(question)}</button>`).join("")}
        </div>
        <form id="ai-question-form" class="section">
          <div class="field">
            <label>自由質問</label>
            <input name="question" value="${escapeAttr(selected)}">
          </div>
          <div class="actions"><button class="btn primary" type="submit">質問する</button></div>
        </form>
      </div>
      <div class="ai-result">
        <h3>回答</h3>
        ${renderQaAnswer(selected)}
      </div>
    </section>
  `;
}

function renderQaAnswer(question) {
  if (question.includes("要員不足")) {
    const requests = state.requests.filter((item) => item.expectedSkill.includes("J-SOX") || attentionSignals().some((signal) => signal.phase === "request" && signal.relatedId === item.id && signal.category === "staffing"));
    return `<p>今後6か月で要員不足になりそうな相談は ${requests.length} 件です。必要スキルと兼務状況を確認してください。</p>${renderTable(["相談", "所管課", "想定スキル"], requests.map((item) => [renderRequestButton(item), escapeHtml(item.department), escapeHtml(item.expectedSkill)]))}`;
  }
  if (question.includes("見積回数")) {
    const rows = state.requests.map((request) => ({ request, count: relatedEstimates(request.id).length })).filter((item) => item.count >= 2);
    return `<p>見積回数が多く現場負荷が高いものは ${rows.length} 件です。前提の未確定や指摘履歴を確認してください。</p>${renderTable(["相談", "見積数", "状態"], rows.map((item) => [renderRequestButton(item.request), String(item.count), escapeHtml(labels.requestStatus[item.request.status])]))}`;
  }
  if (question.includes("根拠が弱い")) {
    const rows = state.estimates.filter((item) => item.explanationQuality === "weak");
    return `<p>根拠が弱い見積は ${rows.length} 件です。外部連携数、利用部門数、除外事項を補う必要があります。</p>${renderTable(["見積", "関連相談", "提出期限"], rows.map((item) => [renderEstimateButton(item), escapeHtml(requestTitle(item.requestId)), escapeHtml(item.dueDate)]))}`;
  }
  if (question.includes("採算悪化")) {
    const rows = state.projects.filter((item) => item.profitabilityStatus === "critical" || item.trend === "worsening");
    return `<p>採算悪化しそうなプロジェクトは ${rows.length} 件です。追加見積の合意、工数超過、契約前提変更が確認観点です。</p>${renderTable(["プロジェクト", "採算", "推移"], rows.map((item) => [renderProjectButton(item), renderStatusLevel(item.profitabilityStatus), renderTrend(item.trend)]))}`;
  }
  if (question.includes("PM報告")) {
    const rows = state.projects.filter((item) => item.overallStatus === "normal" && attentionCount("project", item.id) > 0);
    return `<p>PM報告だけでは見落とす可能性がある案件は ${rows.length} 件です。現データでは正常案件に強い要注意シグナルはありません。</p>${renderTable(["プロジェクト", "状態", "要注意"], rows.map((item) => [renderProjectButton(item), renderOverallStatus(item.overallStatus), String(attentionCount("project", item.id))]))}`;
  }
  if (question.includes("部門")) {
    return `<p>要注意シグナルが増えている部門は、件数順に以下です。</p>${renderBarList(countBy(attentionSignals(), (signal) => signal.department))}`;
  }
  if (question.includes("保守運用負荷")) {
    const rows = state.operationSystems.filter((item) => item.operationStatus === "high_load" || item.inquiryCount >= 30 || item.smallChangeCount >= 5);
    return `<p>保守運用負荷が高いシステムは ${rows.length} 件です。問い合わせ、小改修、未対応課題の増加を確認してください。</p>${renderTable(["システム", "問い合わせ", "小改修", "未対応"], rows.map((item) => [renderOperationButton(item), String(item.inquiryCount), String(item.smallChangeCount), String(item.openIssueCount)]))}`;
  }
  if (question.includes("J-SOX")) {
    const rows = state.operationSystems.filter((item) => item.isJSOX && item.auditTaskCount >= 10);
    return `<p>J-SOX監査対応が重いシステムは ${rows.length} 件です。証跡提出の集中と属人化リスクを確認してください。</p>${renderTable(["システム", "監査対応", "属人化"], rows.map((item) => [renderOperationButton(item), String(item.auditTaskCount), badge(labels.riskLevel[item.dependencyRisk], riskTone(item.dependencyRisk))]))}`;
  }
  const signals = attentionSignals().filter((item) => item.recommendedReportTo === "executive");
  return `<p>幹部会に上げるべきものは ${signals.length} 件です。スコア85点以上、採算・監査・属人化・要員の複合リスクを優先します。</p>${renderSignalTable(signals)}`;
}

function renderComparison() {
  const rows = [
    ["データ入力", "短いメモとダミーデータ", "既存システム、Excel、PowerPoint、Teams、SharePoint連携"],
    ["AI機能", "疑似AI関数", "OpenAI / Azure OpenAI による分類、要約、類似見積検索"],
    ["見積支援", "前提・除外事項・説明文のダミー提示", "過去見積DB、見積Excel、WBS標準との連携"],
    ["プロジェクト把握", "週次更新とシグナルで把握", "資料、メール、工数、課題表から自動抽出"],
    ["保守運用", "問い合わせ・障害・監査件数を手入力", "問い合わせ管理、障害管理、J-SOX証跡管理と連携"],
    ["権限", "なし", "本部長、幹部、部課長、担当者で閲覧範囲を分離"],
  ];
  const future = [
    "見積Excelとの連携",
    "過去見積DBとの連携",
    "工数管理システムとの連携",
    "プロジェクト課題表Excelとの連携",
    "PowerPoint報告資料からのAI抽出",
    "メール・Teamsからのシグナル抽出",
    "保守運用問い合わせ管理との連携",
    "障害管理システムとの連携",
    "J-SOX監査証跡管理との連携",
    "Power BIとの連携",
    "Microsoft 365、SharePoint、Teamsとの連携",
    "権限管理と個人情報・健康情報の取り扱いルール",
  ];
  return `
    ${renderPageHeader(
      "ROADMAP",
      "初期版と本番化の違い",
      "このプロトタイプはダミーデータと疑似AIで仕組みを説明し、本番化時に既存システム連携を広げる前提です。",
    )}
    ${renderTable(["項目", "初期版", "本番化"], rows.map((row) => row.map(escapeHtml)), "compare-table")}
    <section class="section grid cols-2">
      <div class="panel">
        <h3>将来拡張ポイント</h3>
        <ul class="safety-list">${future.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div class="panel">
        <h3>注意事項</h3>
        <ul class="safety-list">
          <li>目的は監視ではなく、業務フローの可視化と早期支援です。</li>
          <li>入力はできるだけ軽くし、履歴が自然に蓄積される設計にします。</li>
          <li>AIは現場を評価するためではなく、要約・分類・見積支援・予兆検知を支援するために使います。</li>
          <li>本番化時は権限管理、個人情報、健康情報、監査情報の取り扱いを厳格に設計します。</li>
        </ul>
      </div>
    </section>
  `;
}

function renderProjectAiResult(result) {
  return `
    <div class="update-copy section">
      <div><span>AI要約</span><strong>${escapeHtml(result.summary)}</strong></div>
      <div><span>状態軸</span><strong>${escapeHtml(result.axisMessage)}</strong></div>
      <div><span>要注意候補</span><strong>${escapeHtml(result.signalTitle)}</strong></div>
      <div><span>推奨報告先</span><strong>${escapeHtml(labels.reportTo[result.reportTo])}</strong></div>
      <div><span>次に確認</span><strong>${escapeHtml(result.nextCheck)}</strong></div>
    </div>
  `;
}

function renderSignalTable(signals) {
  return renderTable(
    ["タイトル", "フェーズ", "関連対象", "カテゴリ", "スコア"],
    signals.map((signal) => [
      escapeHtml(signal.title),
      badge(labels.phase[signal.phase], "info"),
      renderRelatedObjectButton(signal),
      badge(labels.signalCategory[signal.category], "neutral"),
      renderScore(signal.riskScore),
    ]),
  );
}

function renderTimeline(items, titleSelector, bodySelector) {
  if (!items.length) return `<div class="empty">履歴はまだありません。</div>`;
  return `
    <div class="timeline section">
      ${items
        .map((item) => `
          <div class="timeline-item">
            <strong>${escapeHtml(titleSelector(item))}</strong>
            <span>${escapeHtml(bodySelector(item))}</span>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function renderTabs(group, tabs) {
  const active = tabs.some(([id]) => id === state.activeTabs[group]) ? state.activeTabs[group] : tabs[0]?.[0];
  const activeContent = tabs.find(([id]) => id === active)?.[2] || "";
  return `
    <section class="section tab-shell">
      <div class="tab-list" role="tablist">
        ${tabs
          .map(([id, label]) => `
            <button class="tab-button ${id === active ? "active" : ""}" data-tab-group="${escapeAttr(group)}" data-tab="${escapeAttr(id)}" type="button">
              ${escapeHtml(label)}
            </button>
          `)
          .join("")}
      </div>
      <div class="tab-panel">
        ${activeContent}
      </div>
    </section>
  `;
}

function renderAiDisclosure(title, content) {
  return `
    <details class="ai-disclosure">
      <summary>${escapeHtml(title)}を表示</summary>
      <div class="ai-disclosure-body">
        ${content}
      </div>
    </details>
  `;
}

function renderProjectAxisBadges(project) {
  return `
    <div class="stack">
      ${axisBadge("進捗", project.scheduleStatus)}
      ${axisBadge("採算", project.profitabilityStatus)}
      ${axisBadge("品質", project.qualityStatus)}
      ${axisBadge("要員", project.staffingStatus)}
      ${axisBadge("顧客", project.customerStatus)}
    </div>
  `;
}

function axisBadge(axis, level) {
  return `<span class="axis-badge ${escapeAttr(level)}"><span>${escapeHtml(axis)}</span><strong>${escapeHtml(labels.statusLevel[level])}</strong></span>`;
}

function renderExecutiveDashboardControls() {
  const dashboard = state.executiveDashboard;
  const savedViews = dashboard.savedViews || [];
  return `
    <section class="executive-control-bar">
      ${executiveSelect("currentView", "表示ビュー", [
        ...Object.entries(executiveDashboardPresets).map(([id, preset]) => [id, preset.name]),
        ...savedViews.map((view) => [view.id, `保存: ${view.name}`]),
        ["custom", "カスタム"],
      ], dashboard.currentView)}
      ${executiveSelect("period", "対象期間", [
        ["current", "今月"],
        ["next3", "今後3か月"],
        ["next6", "今後6か月"],
        ["next12", "今後12か月"],
        ["fiscalYear", "年度"],
        ["custom", "任意期間"],
      ], dashboard.filters.period)}
      ${executiveSelect("organization", "対象組織", [
        ["all", "全社"],
        ["headquarters", "本部"],
        ["division", "部"],
        ["section", "課"],
      ], dashboard.filters.organization)}
      ${executiveSelect("amountScale", "金額規模", [
        ["all", "すべて"],
        ["under10m", "1,000万円未満"],
        ["10mTo100m", "1,000万円〜1億円"],
        ["100mTo1b", "1億円〜10億円"],
        ["over1b", "10億円以上"],
      ], dashboard.filters.amountScale)}
      ${executiveSelect("status", "状態", [
        ["all", "すべて"],
        ["attention", "注意以上"],
        ["critical", "危険のみ"],
        ["worsening", "悪化傾向"],
        ["decision", "経営判断待ち"],
      ], dashboard.filters.status)}
      ${executiveSelect("revenueConfidence", "売上確度", [
        ["all", "すべて"],
        ["confirmed", "確定のみ"],
        ["confirmedHigh", "確定＋高確度"],
        ["includePipeline", "見込みを含む"],
      ], dashboard.filters.revenueConfidence)}
      <button class="btn primary executive-control-button" data-action="toggle-dashboard-settings" type="button">表示設定</button>
    </section>
  `;
}

function executiveSelect(key, label, options, selected) {
  return `
    <label class="executive-filter">
      <span>${escapeHtml(label)}</span>
      <select data-executive-filter="${escapeAttr(key)}">
        ${options.map(([value, text]) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderExecutiveDashboardMessage() {
  return `
    <div class="message-band executive-message">
      <strong>この経営ダッシュボードは、相談件数やプロジェクト件数を並べるためのものではありません。</strong><br>
      今後の売上・業務量を予測し、正社員で対応できるかを確認し、不足分を外注・パートナーでどう補うかを判断し、
      進行中プロジェクトの採算と重大障害への対応を追跡するための意思決定画面です。
      相談・見積・プロジェクト・保守運用の情報を横断して使い、課や部の個別最適ではなく全社最適での判断を支援します。
    </div>
  `;
}

function renderExecutiveKpiCards(dashboard) {
  return `
    <section class="executive-kpi-grid">
      ${executiveKpiCard({
        title: "12か月予測売上",
        value: formatOku(dashboard.revenue.total),
        tone: dashboard.revenue.budgetGap < 0 ? "warning" : "good",
        lines: [
          `確定: ${formatOku(dashboard.revenue.confirmed)}`,
          `高確度: ${formatOku(dashboard.revenue.highConfidence)}`,
          `見込み: ${formatOku(dashboard.revenue.pipeline)}`,
          `予算差: ${formatOkuSigned(dashboard.revenue.budgetGap)}`,
        ],
        targetView: "requests",
      })}
      ${executiveKpiCard({
        title: "正社員不足",
        value: `${dashboard.staffing.shortage}人月`,
        tone: "danger",
        lines: [
          `必要: ${dashboard.staffing.required}人月`,
          `供給: ${dashboard.staffing.supply}人月`,
          `不足開始: ${dashboard.staffing.shortageStart}`,
          `主な不足: ${dashboard.staffing.mainShortages.join("、")}`,
        ],
        targetView: "attention-signals",
      })}
      ${executiveKpiCard({
        title: "必要外注",
        value: `${dashboard.partner.required}人月`,
        tone: dashboard.partner.unsecured > 0 ? "warning" : "good",
        lines: [
          `確保済み: ${dashboard.partner.secured}人月`,
          `未確保: ${dashboard.partner.unsecured}人月`,
          `外注費: ${formatOku(dashboard.partner.cost)}`,
          `推奨: ${dashboard.partner.recommendedCount}社`,
        ],
        targetView: "projects",
      })}
      ${executiveKpiCard({
        title: "採算危険プロジェクト",
        value: `${dashboard.profitability.criticalCount}件`,
        tone: "danger",
        lines: [
          `注意: ${dashboard.profitability.attentionCount}件`,
          `危険契約額: ${formatOku(dashboard.profitability.criticalAmount)}`,
          `想定損失: ${formatOku(dashboard.profitability.expectedLoss)}`,
          `悪化: ${dashboard.profitability.worsenedCount}件`,
        ],
        targetView: "projects",
      })}
      ${executiveKpiCard({
        title: "対応中重大障害",
        value: `${dashboard.incidents.activeCount}件`,
        tone: dashboard.incidents.overdueCount > 0 ? "danger" : "warning",
        lines: [
          `暫定復旧: ${dashboard.incidents.temporaryRecovered}件`,
          `恒久対応中: ${dashboard.incidents.permanentAction}件`,
          `期限超過: ${dashboard.incidents.overdueCount}件`,
          `再発防止未完了: ${dashboard.incidents.recurrenceOpen}件`,
        ],
        targetView: "operations",
      })}
    </section>
  `;
}

function executiveKpiCard({ title, value, tone, lines, targetView }) {
  return `
    <button class="executive-kpi-card ${escapeAttr(tone)}" data-view="${escapeAttr(targetView)}" type="button">
      <span>${escapeHtml(title)}</span>
      <strong>${escapeHtml(value)}</strong>
      ${lines.map((line) => `<small>${escapeHtml(line)}</small>`).join("")}
    </button>
  `;
}

function renderExecutiveDashboardSections(dashboard) {
  const visible = state.executiveDashboard.visibleItems;
  const sections = [
    visibleGroup("demand", visible) ? renderDemandDecisionSection(dashboard) : "",
    visibleGroup("staffing", visible) ? renderStaffingDecisionSection(dashboard) : "",
    visibleGroup("partner", visible) ? renderPartnerDecisionSection(dashboard) : "",
    visibleGroup("profitability", visible) ? renderProfitabilityDecisionSection(dashboard) : "",
    visibleGroup("incident", visible) ? renderIncidentDecisionSection(dashboard) : "",
  ].filter(Boolean);
  if (!sections.length) return `<div class="empty">表示設定で表示する情報を選択してください。</div>`;
  return sections.join("");
}

function visibleGroup(group, visible) {
  return Object.entries(executiveDashboardItems).some(([key, item]) => item.group === group && visible[key]);
}

function itemVisible(key) {
  return Boolean(state.executiveDashboard.visibleItems[key]);
}

function renderDemandDecisionSection(dashboard) {
  return `
    <section class="section executive-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">1. DEMAND & SALES</p>
          <h3>需要・売上見通し</h3>
          <p class="section-note">今後12か月の売上と業務量を、確度別・月別に確認します。</p>
        </div>
        <button class="btn" data-view="requests" type="button">相談・見積へ</button>
      </div>
      <div class="grid cols-2">
        ${itemVisible("revenueForecast") ? renderRevenueStackChart(dashboard.revenue.monthly) : ""}
        ${itemVisible("monthlyWorkload") ? renderWorkloadChart(dashboard.workload.monthly) : ""}
      </div>
      ${itemVisible("budgetGap") || itemVisible("confidenceBreakdown") || itemVisible("largeDealCandidates") ? `
        <div class="grid cols-3 section">
          ${itemVisible("budgetGap") ? executiveMiniPanel("年度予算との差", formatOkuSigned(dashboard.revenue.budgetGap), "予算44.9億円に対する差分", "warning") : ""}
          ${itemVisible("confidenceBreakdown") ? executiveMiniPanel("受注確度別内訳", `確定${formatOku(dashboard.revenue.confirmed)}`, `高確度${formatOku(dashboard.revenue.highConfidence)} / 見込み${formatOku(dashboard.revenue.pipeline)}`, "good") : ""}
          ${itemVisible("largeDealCandidates") ? executiveMiniPanel("大型案件候補", "3件", "A社更改、B社刷新、C社移行", "neutral") : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function renderStaffingDecisionSection(dashboard) {
  return `
    <section class="section executive-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">2. EMPLOYEE STAFFING</p>
          <h3>正社員要員</h3>
          <p class="section-note">時期・スキル・部門単位で、正社員供給だけで足りるかを確認します。</p>
        </div>
        <button class="btn" data-view="attention-signals" type="button">要員シグナルへ</button>
      </div>
      <div class="grid cols-2">
        ${itemVisible("monthlyStaffingGap") ? renderStaffingGapChart(dashboard.staffing.monthly) : ""}
        ${itemVisible("skillShortage") ? renderSkillShortageTable(dashboard.staffing.skills) : ""}
      </div>
      ${itemVisible("departmentLoad") || itemVisible("pmMultiAssign") || itemVisible("substituteShortage") ? `
        <div class="grid cols-3 section">
          ${itemVisible("departmentLoad") ? executiveMiniPanel("部門別負荷", "第1開発課が高負荷", "PM・SAP領域に集中", "warning") : ""}
          ${itemVisible("pmMultiAssign") ? executiveMiniPanel("PM兼務状況", "4件", "複数案件兼務のPMが増加", "warning") : ""}
          ${itemVisible("substituteShortage") ? executiveMiniPanel("代替要員不足", "SAP / セキュリティ", "3か月以内に不足", "danger") : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function renderPartnerDecisionSection(dashboard) {
  return `
    <section class="section executive-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">3. PARTNER OPTIMIZATION</p>
          <h3>外注・パートナー最適化</h3>
          <p class="section-note">正社員不足分を、どのパートナーで補うのが全社最適かを確認します。</p>
        </div>
        <button class="btn" data-view="projects" type="button">対象案件へ</button>
      </div>
      <div class="grid cols-2">
        ${itemVisible("outsourcingNeed") ? renderOutsourceNeedPanel(dashboard.partner) : ""}
        ${itemVisible("partnerRecommendation") ? renderPartnerRecommendationTable(dashboard.partner.recommendations) : ""}
      </div>
      ${itemVisible("partnerCapacity") || itemVisible("outsourcingCost") || itemVisible("partnerConcentration") ? `
        <div class="grid cols-3 section">
          ${itemVisible("partnerCapacity") ? executiveMiniPanel("パートナー別供給余力", "A社 12人月", "B社 6人月 / C社 4人月", "good") : ""}
          ${itemVisible("outsourcingCost") ? executiveMiniPanel("外注費予測", formatOku(dashboard.partner.cost), "未確保分を含む見込み", "warning") : ""}
          ${itemVisible("partnerConcentration") ? executiveMiniPanel("集中リスク", "1社が高依存", "特定SAP要員に依存", "danger") : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function renderProfitabilityDecisionSection(dashboard) {
  return `
    <section class="section executive-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">4. PROFITABILITY HEALTH</p>
          <h3>プロジェクト採算・健全性</h3>
          <p class="section-note">採算危険、悪化傾向、PM報告とのずれを経営観点で確認します。</p>
        </div>
        <button class="btn" data-view="projects" type="button">プロジェクトへ</button>
      </div>
      <div class="grid cols-2">
        ${itemVisible("profitRiskProjects") ? renderProfitabilitySummary(dashboard.profitability) : ""}
        ${itemVisible("worseningProjects") ? renderProfitabilityRanking(dashboard.profitability.ranking) : ""}
      </div>
      ${itemVisible("effortOverrun") || itemVisible("additionalEstimatePending") || itemVisible("pmReportGap") ? `
        <div class="grid cols-3 section">
          ${itemVisible("effortOverrun") ? executiveMiniPanel("工数超過案件", "5件", "工数消化率が進捗率を超過", "warning") : ""}
          ${itemVisible("additionalEstimatePending") ? executiveMiniPanel("追加見積未合意", "3件", "顧客承認待ち", "danger") : ""}
          ${itemVisible("pmReportGap") ? executiveMiniPanel("PM報告とのずれ", `${dashboard.profitability.pmReportGap}件`, "自己評価よりデータ判定が悪い", "danger") : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function renderIncidentDecisionSection(dashboard) {
  return `
    <section class="section executive-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">5. MAJOR INCIDENTS</p>
          <h3>重大障害・重要トラブル対応</h3>
          <p class="section-note">経営影響の大きい障害に絞り、期限と再発防止の進捗を確認します。</p>
        </div>
        <button class="btn" data-view="operations" type="button">保守・運用へ</button>
      </div>
      <div class="grid cols-2">
        ${itemVisible("majorIncidents") ? renderIncidentStagePanel(dashboard.incidents) : ""}
        ${itemVisible("overdueIncidentActions") ? renderIncidentTable(dashboard.incidents.items) : ""}
      </div>
      ${itemVisible("temporaryRecoveryOnly") || itemVisible("recurrencePreventionOpen") || itemVisible("jsoxIncidents") ? `
        <div class="grid cols-3 section">
          ${itemVisible("temporaryRecoveryOnly") ? executiveMiniPanel("暫定復旧のみ", `${dashboard.incidents.temporaryRecovered}件`, "恒久対応の期限確認が必要", "warning") : ""}
          ${itemVisible("recurrencePreventionOpen") ? executiveMiniPanel("再発防止未完了", `${dashboard.incidents.recurrenceOpen}件`, "再発防止期限を確認", "danger") : ""}
          ${itemVisible("jsoxIncidents") ? executiveMiniPanel("J-SOX影響障害", "1件", "統制影響の説明が必要", "danger") : ""}
        </div>
      ` : ""}
    </section>
  `;
}

function executiveMiniPanel(title, value, note, tone = "neutral") {
  return `
    <div class="executive-mini-panel ${escapeAttr(tone)}">
      <span>${escapeHtml(title)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(note)}</small>
    </div>
  `;
}

function renderRevenueStackChart(months) {
  const max = Math.max(...months.map((month) => month.confirmed + month.highConfidence + month.pipeline), 1);
  const scopeLabel = months.length === 1 ? "今月" : `${months.length}か月`;
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>${escapeHtml(scopeLabel)}売上予測</h4>
        <span class="pill">確定 / 高確度 / 見込み</span>
      </div>
      <div class="stack-chart">
        ${months.map((month) => {
          const total = month.confirmed + month.highConfidence + month.pipeline;
          return `
            <div class="stack-month">
              <div class="stack-bar" title="${escapeAttr(`${month.label}: ${formatOku(total)}`)}">
                <span class="stack-segment confirmed" style="height:${(month.confirmed / max) * 100}%"></span>
                <span class="stack-segment high-confidence" style="height:${(month.highConfidence / max) * 100}%"></span>
                <span class="stack-segment pipeline" style="height:${(month.pipeline / max) * 100}%"></span>
              </div>
              <strong>${escapeHtml(formatOku(total))}</strong>
              <span>${escapeHtml(month.shortLabel)}</span>
            </div>
          `;
        }).join("")}
      </div>
      <div class="chart-legend">
        <span><i class="legend-dot confirmed"></i>確定</span>
        <span><i class="legend-dot high-confidence"></i>高確度</span>
        <span><i class="legend-dot pipeline"></i>見込み</span>
        <span><i class="budget-line"></i>年度予算線</span>
      </div>
    </div>
  `;
}

function renderWorkloadChart(months) {
  const max = Math.max(...months.map((month) => month.total), 1);
  const scopeLabel = months.length === 1 ? "今月" : `${months.length}か月`;
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>${escapeHtml(scopeLabel)}業務量予測</h4>
        <span class="pill">必要人月</span>
      </div>
      <div class="line-bar-chart">
        ${months.map((month) => `
          <div class="line-bar-item">
            <div class="line-bar-track"><span style="height:${(month.total / max) * 100}%"></span></div>
            <strong>${escapeHtml(String(month.total))}</strong>
            <span>${escapeHtml(month.shortLabel)}</span>
          </div>
        `).join("")}
      </div>
      <div class="chart-note">PM、アプリ開発、インフラ、セキュリティ、保守運用、監査対応を合算。</div>
    </div>
  `;
}

function renderStaffingGapChart(months) {
  const max = Math.max(...months.map((month) => Math.max(month.required, month.supply, month.shortage)), 1);
  const scopeLabel = months.length === 1 ? "今月" : `${months.length}か月`;
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>${escapeHtml(scopeLabel)}要員過不足</h4>
        <span class="pill danger">不足開始 2026年10月</span>
      </div>
      <div class="staffing-chart">
        ${months.map((month) => `
          <div class="staffing-month">
            <div class="staffing-bars">
              <span class="required" style="height:${(month.required / max) * 100}%"></span>
              <span class="supply" style="height:${(month.supply / max) * 100}%"></span>
              <span class="shortage" style="height:${(Math.max(month.shortage, 0) / max) * 100}%"></span>
            </div>
            <strong>${escapeHtml(month.shortage > 0 ? `▲${month.shortage}` : `+${Math.abs(month.shortage)}`)}</strong>
            <span>${escapeHtml(month.shortLabel)}</span>
          </div>
        `).join("")}
      </div>
      <div class="chart-legend">
        <span><i class="legend-dot required"></i>必要</span>
        <span><i class="legend-dot supply"></i>正社員供給</span>
        <span><i class="legend-dot shortage"></i>不足</span>
      </div>
    </div>
  `;
}

function renderSkillShortageTable(rows) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>スキル別不足</h4>
        <span class="pill">部門・スキル単位</span>
      </div>
      ${renderTable(
        ["スキル", "必要人月", "正社員供給", "不足"],
        rows.map((row) => [
          escapeHtml(row.skill),
          String(row.required),
          String(row.supply),
          shortageBadge(row.shortage),
        ]),
        "executive-compact-table",
      )}
    </div>
  `;
}

function renderOutsourceNeedPanel(partner) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>外注必要人月</h4>
        <span class="pill warning">未確保 ${escapeHtml(String(partner.unsecured))}人月</span>
      </div>
      <div class="executive-metrics-row">
        ${executiveMiniPanel("必要量", `${partner.required}人月`, "正社員不足分", "warning")}
        ${executiveMiniPanel("確保済み", `${partner.secured}人月`, "契約・調整済み", "good")}
        ${executiveMiniPanel("外注費", formatOku(partner.cost), "12か月見込み", "neutral")}
      </div>
    </div>
  `;
}

function renderPartnerRecommendationTable(rows) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>推奨パートナー</h4>
        <span class="pill">疑似AI推奨</span>
      </div>
      ${renderTable(
        ["対象", "不足", "推奨", "理由", "評価"],
        rows.map((row) => [
          escapeHtml(row.target),
          escapeHtml(`${row.skill} ${row.shortage}人月`),
          escapeHtml(row.partner),
          escapeHtml(row.reason),
          badge(row.score, row.score === "高" ? "low" : "medium"),
        ]),
        "executive-compact-table",
      )}
    </div>
  `;
}

function renderProfitabilitySummary(data) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>採算状況</h4>
        <span class="pill danger">危険 ${escapeHtml(String(data.criticalCount))}件</span>
      </div>
      <div class="profit-health-grid">
        ${executiveMiniPanel("正常", `${data.normalCount}件`, "計画範囲内", "good")}
        ${executiveMiniPanel("注意", `${data.attentionCount}件`, "早期支援候補", "warning")}
        ${executiveMiniPanel("危険", `${data.criticalCount}件`, `契約額 ${formatOku(data.criticalAmount)}`, "danger")}
        ${executiveMiniPanel("想定損失", formatOku(data.expectedLoss), "採算悪化見込み", "danger")}
      </div>
    </div>
  `;
}

function renderProfitabilityRanking(rows) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>採算悪化ランキング</h4>
        <span class="pill">粗利率差</span>
      </div>
      ${renderTable(
        ["案件", "契約額", "計画", "見込", "差", "主因"],
        rows.map((row) => [
          `<button class="btn" data-view="projects">${escapeHtml(row.project)}</button>`,
          escapeHtml(formatOku(row.amount)),
          escapeHtml(`${row.planMargin}%`),
          escapeHtml(`${row.forecastMargin}%`),
          badge(`${row.gap}pt`, row.gap <= -5 ? "high" : "medium"),
          escapeHtml(row.reason),
        ]),
        "executive-compact-table",
      )}
    </div>
  `;
}

function renderIncidentStagePanel(data) {
  const stages = ["検知", "影響確認", "暫定復旧", "原因特定", "恒久対応", "再発防止", "クローズ"];
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>重大障害対応ステージ</h4>
        <span class="pill danger">対応中 ${escapeHtml(String(data.activeCount))}件</span>
      </div>
      <div class="incident-stage-flow">
        ${stages.map((stage) => `<span class="${stage === "恒久対応" || stage === "再発防止" ? "active" : ""}">${escapeHtml(stage)}</span>`).join("")}
      </div>
      <div class="executive-metrics-row">
        ${executiveMiniPanel("期限超過", `${data.overdueCount}件`, "経営確認候補", "danger")}
        ${executiveMiniPanel("暫定復旧", `${data.temporaryRecovered}件`, "恒久対応待ち", "warning")}
        ${executiveMiniPanel("再発防止未完了", `${data.recurrenceOpen}件`, "期限管理対象", "danger")}
      </div>
    </div>
  `;
}

function renderIncidentTable(rows) {
  return `
    <div class="executive-panel">
      <div class="panel-title-row">
        <h4>障害対応一覧</h4>
        <span class="pill">経営影響のみ</span>
      </div>
      ${renderTable(
        ["障害", "影響", "現在状態", "責任者", "次アクション", "期限"],
        rows.map((row) => [
          escapeHtml(row.name),
          escapeHtml(row.impact),
          badge(row.stage, row.overdue ? "high" : "medium"),
          escapeHtml(row.owner),
          escapeHtml(row.nextAction),
          escapeHtml(row.deadline),
        ]),
        "executive-compact-table",
      )}
    </div>
  `;
}

function renderExecutiveSettingsPanel() {
  return `
    <aside class="executive-settings-panel">
      <div class="panel-title-row">
        <h3>表示する情報</h3>
        <button class="btn" data-action="toggle-dashboard-settings" type="button">閉じる</button>
      </div>
      <div class="executive-settings-body">
        ${executiveDashboardGroups.map(([group, label]) => `
          <details open class="settings-group">
            <summary>${escapeHtml(label)}</summary>
            ${Object.entries(executiveDashboardItems)
              .filter(([, item]) => item.group === group)
              .map(([key, item]) => `
                <label class="settings-check">
                  <input type="checkbox" data-executive-item="${escapeAttr(key)}" ${itemVisible(key) ? "checked" : ""}>
                  <span>${escapeHtml(item.label)}</span>
                </label>
              `)
              .join("")}
          </details>
        `).join("")}
      </div>
      <div class="settings-actions">
        <button class="btn primary" data-action="apply-dashboard-settings" type="button">適用</button>
        <button class="btn" data-action="reset-dashboard-settings" type="button">初期状態に戻す</button>
        <button class="btn warning" data-action="save-dashboard-view" type="button">この表示を保存</button>
      </div>
    </aside>
  `;
}

function shortageBadge(value) {
  if (value > 0) return badge(`▲${value}`, value >= 8 ? "high" : "medium");
  return badge(`${Math.abs(value)}余力`, "low");
}

function buildExecutiveDecisionDashboard() {
  const filters = state.executiveDashboard?.filters || defaultExecutiveDashboardState().filters;
  const months = buildExecutiveMonths(TODAY_ISO, executivePeriodMonthCount(filters.period));
  return {
    months,
    revenue: buildExecutiveRevenueData(months, filters),
    workload: buildExecutiveWorkloadData(months),
    staffing: buildExecutiveStaffingData(months),
    partner: buildExecutivePartnerData(),
    profitability: buildExecutiveProfitabilityData(filters),
    incidents: buildExecutiveIncidentData(filters),
  };
}

function executivePeriodMonthCount(period) {
  if (period === "current") return 1;
  if (period === "next3") return 3;
  if (period === "next6") return 6;
  return 12;
}

function buildExecutiveMonths(todayIso, count) {
  const [year, month] = String(todayIso).split("-").map(Number);
  const months = [];
  for (let index = 0; index < count; index += 1) {
    const absolute = monthIndex(year, month) + index;
    const itemYear = Math.floor(absolute / 12);
    const itemMonth = (absolute % 12) + 1;
    months.push({
      key: `${itemYear}-${String(itemMonth).padStart(2, "0")}`,
      label: `${itemYear}年${itemMonth}月`,
      shortLabel: `${itemMonth}月`,
      year: itemYear,
      month: itemMonth,
      index,
    });
  }
  return months;
}

function buildExecutiveRevenueData(months, filters = {}) {
  const weights = [0.07, 0.08, 0.08, 0.09, 0.08, 0.09, 0.08, 0.09, 0.08, 0.08, 0.09, 0.09];
  const confirmed = 31.0;
  const highConfidence = filters.revenueConfidence === "confirmed" ? 0 : 7.5;
  const pipeline = filters.revenueConfidence === "confirmed" || filters.revenueConfidence === "confirmedHigh" ? 0 : 4.3;
  const budget = 44.9;
  const total = confirmed + highConfidence + pipeline;
  return {
    confirmed,
    highConfidence,
    pipeline,
    total,
    budget,
    budgetGap: total - budget,
    previousForecastGap: -0.8,
    monthly: months.map((month, index) => ({
      ...month,
      confirmed: roundOne(confirmed * weights[index]),
      highConfidence: roundOne(highConfidence * weights[index]),
      pipeline: roundOne(pipeline * weights[index]),
      budget: roundOne(budget / 12),
    })),
  };
}

function buildExecutiveWorkloadData(months) {
  const totals = [45, 48, 50, 55, 53, 56, 49, 52, 50, 51, 54, 57];
  return {
    monthly: months.map((month, index) => ({
      ...month,
      pm: Math.round(totals[index] * 0.14),
      app: Math.round(totals[index] * 0.34),
      infra: Math.round(totals[index] * 0.16),
      security: Math.round(totals[index] * 0.09),
      operation: Math.round(totals[index] * 0.2),
      audit: Math.round(totals[index] * 0.07),
      total: totals[index],
    })),
  };
}

function buildExecutiveStaffingData(months) {
  const required = [45, 48, 50, 55, 53, 56, 49, 52, 50, 51, 54, 57];
  const supply = [48, 48, 49, 48, 47, 46, 46, 46, 45, 44, 44, 43];
  return {
    required: 620,
    supply: 552,
    shortage: 68,
    shortageStart: "2026年10月",
    mainShortages: ["PM", "SAP", "セキュリティ"],
    monthly: months.map((month, index) => ({
      ...month,
      required: required[index],
      supply: supply[index],
      shortage: Math.max(required[index] - supply[index], 0),
      surplus: Math.max(supply[index] - required[index], 0),
    })),
    skills: [
      { skill: "PM", required: 35, supply: 25, shortage: 10 },
      { skill: "SAP", required: 40, supply: 28, shortage: 12 },
      { skill: "インフラ", required: 32, supply: 30, shortage: 2 },
      { skill: "セキュリティ", required: 18, supply: 10, shortage: 8 },
      { skill: "保守運用", required: 45, supply: 48, shortage: -3 },
    ],
  };
}

function buildExecutivePartnerData() {
  return {
    required: 68,
    secured: 42,
    unsecured: 26,
    cost: 1.4,
    recommendedCount: 3,
    recommendations: [
      {
        target: "A社基幹システム更改",
        skill: "SAP",
        shortage: 6,
        partner: "パートナーA社",
        reason: "類似案件・J-SOX経験あり、6人月確保可能",
        score: "高",
      },
      {
        target: "認証基盤刷新",
        skill: "セキュリティ",
        shortage: 4,
        partner: "パートナーC社",
        reason: "セキュリティ対応経験と品質評価が高い",
        score: "高",
      },
      {
        target: "B社インフラ刷新",
        skill: "インフラ",
        shortage: 3,
        partner: "パートナーB社",
        reason: "供給余力あり、単価は中位",
        score: "中",
      },
    ],
  };
}

function buildExecutiveProfitabilityData(filters = {}) {
  const ranking = [
    { project: "A社更改", amount: 8.5, planMargin: 15, forecastMargin: 4, gap: -11, reason: "追加工数", status: "critical", worsening: true, decision: true },
    { project: "B社刷新", amount: 2.2, planMargin: 12, forecastMargin: 8, gap: -4, reason: "外注費増", status: "attention", worsening: true, decision: false },
    { project: "C社移行", amount: 1.1, planMargin: 15, forecastMargin: 14, gap: -1, reason: "軽微", status: "attention", worsening: false, decision: false },
  ].filter((row) => executiveStatusMatch(row, filters.status));

  return {
    normalCount: 31,
    attentionCount: 11,
    criticalCount: 6,
    criticalAmount: 14.2,
    expectedLoss: 1.1,
    worsenedCount: 4,
    pmReportGap: 4,
    ranking,
  };
}

function buildExecutiveIncidentData(filters = {}) {
  const items = [
    {
      name: "生産管理停止",
      impact: "工場操業",
      stage: "恒久対応中",
      owner: "IT本部長",
      nextAction: "DB改修",
      deadline: "7/20",
      overdue: false,
      status: "critical",
      worsening: false,
      decision: true,
    },
    {
      name: "会計連携障害",
      impact: "決算処理",
      stage: "暫定復旧",
      owner: "経理システム部長",
      nextAction: "原因分析",
      deadline: "7/18",
      overdue: true,
      status: "critical",
      worsening: true,
      decision: true,
    },
    {
      name: "認証基盤障害",
      impact: "グループ業務",
      stage: "再発防止",
      owner: "インフラ部長",
      nextAction: "監視強化",
      deadline: "7/25",
      overdue: false,
      status: "attention",
      worsening: false,
      decision: false,
    },
  ].filter((item) => executiveStatusMatch(item, filters.status));

  return {
    activeCount: 4,
    temporaryRecovered: 2,
    permanentAction: 2,
    overdueCount: 1,
    recurrenceOpen: 3,
    items,
  };
}

function executiveStatusMatch(item, status) {
  if (!status || status === "all") return true;
  if (status === "attention") return item.status === "attention" || item.status === "critical";
  if (status === "critical") return item.status === "critical";
  if (status === "worsening") return Boolean(item.worsening);
  if (status === "decision") return Boolean(item.decision);
  return true;
}

function roundOne(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function renderDashboardMatrix() {
  const dashboard = buildDashboardMatrix();
  return `
    <section class="section dashboard-sheet">
      <div class="dashboard-sheet-heading">
        <h3>ダッシュボード</h3>
        <span>金額単位：百万円</span>
      </div>
      <div class="dashboard-sheet-scroll">
        <table class="dashboard-sheet-table">
          <thead>
            <tr>
              <th class="sheet-corner"></th>
              <th class="sheet-row-label"></th>
              ${dashboard.months.map((month) => `<th colspan="4" class="sheet-month">${escapeHtml(month.label)}</th>`).join("")}
              <th class="sheet-forecast">${escapeHtml(dashboard.forecastLabel)}</th>
            </tr>
            <tr>
              <th class="sheet-corner"></th>
              <th class="sheet-row-label"></th>
              ${dashboard.months.map(() => ["売上", "件数", "社員", "外注"].map((label) => `<th>${escapeHtml(label)}</th>`).join("")).join("")}
              <th>売上</th>
            </tr>
          </thead>
          <tbody>
            ${dashboard.rows
              .map((row) => `
                <tr class="${escapeAttr(row.kind)}">
                  <td class="sheet-gutter"></td>
                  <th>${escapeHtml(row.label)}</th>
                  ${row.months.map((metrics) => renderDashboardMetricCells(metrics)).join("")}
                  <td class="forecast-cell">${formatDashboardNumber(row.forecastSales)}</td>
                </tr>
              `)
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="dashboard-attention">
        <div class="dashboard-attention-title">要注意</div>
        <div class="dashboard-attention-grid">
          ${dashboard.attention
            .map((item) => `
              <button class="dashboard-attention-item" data-view="${escapeAttr(item.view)}">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(`${item.count}件`)}</strong>
              </button>
            `)
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderDashboardMetricCells(metrics) {
  if (!metrics) return `<td></td><td></td><td></td><td></td>`;
  return `
    <td>${formatDashboardNumber(metrics.sales)}</td>
    <td>${formatDashboardNumber(metrics.count)}</td>
    <td>${formatDashboardNumber(metrics.employee)}</td>
    <td>${formatDashboardNumber(metrics.vendor)}</td>
  `;
}

function renderRevenueForecast(forecast) {
  const maxTotal = Math.max(...forecast.periods.map((period) => period.total), 1);
  const directionTone = forecast.direction === "increase" ? "good" : forecast.direction === "decrease" ? "danger" : "warning";
  const directionLabel = forecast.direction === "increase" ? "増加見込み" : forecast.direction === "decrease" ? "減少見込み" : "横ばい";
  const changeText = `${formatCurrency(Math.abs(forecast.changeAmount))} / ${formatPercent(Math.abs(forecast.changeRate))}`;

  return `
    <section class="section revenue-forecast">
      <div class="section-header">
        <div>
          <p class="eyebrow">FUTURE SALES OUTLOOK</p>
          <h3>当年から3年後までの半年別売上見通し</h3>
          <p class="section-note">相談～見積、プロジェクト、保守・運用の売上を合計し、将来の売上が増えそうか減りそうかを最初に確認します。</p>
        </div>
        <div class="revenue-verdict ${escapeAttr(directionTone)}">
          <span>総合判定</span>
          <strong>${escapeHtml(directionLabel)}</strong>
          <small>初回半期比 ${escapeHtml(changeText)}</small>
        </div>
      </div>
      <div class="revenue-legend">
        <span><i class="legend-dot consult"></i>相談～見積</span>
        <span><i class="legend-dot project"></i>プロジェクト</span>
        <span><i class="legend-dot operation"></i>保守・運用</span>
      </div>
      <div class="revenue-bars" aria-label="半年別売上見通し">
        ${forecast.periods
          .map((period) => `
            <div class="revenue-period">
              <div class="revenue-bar">
                ${revenueSegment(period.consultEstimate, maxTotal, "consult", "相談～見積")}
                ${revenueSegment(period.project, maxTotal, "project", "プロジェクト")}
                ${revenueSegment(period.operation, maxTotal, "operation", "保守・運用")}
              </div>
              <div class="revenue-period-label">${escapeHtml(period.label)}</div>
              <strong>${escapeHtml(formatCurrency(period.total))}</strong>
            </div>
          `)
          .join("")}
      </div>
      ${renderTable(
        ["半期", "相談～見積", "プロジェクト", "保守・運用", "合計", "前半期比"],
        forecast.periods.map((period, index) => [
          escapeHtml(period.label),
          escapeHtml(formatCurrency(period.consultEstimate)),
          escapeHtml(formatCurrency(period.project)),
          escapeHtml(formatCurrency(period.operation)),
          `<strong>${escapeHtml(formatCurrency(period.total))}</strong>`,
          revenueTrendBadge(period.total, index === 0 ? null : forecast.periods[index - 1].total),
        ]),
        "revenue-table",
      )}
    </section>
  `;
}

function revenueSegment(value, maxTotal, type, label) {
  if (value <= 0) return "";
  const height = Math.max((value / maxTotal) * 100, 4);
  return `<span class="revenue-segment ${escapeAttr(type)}" style="height: ${height}%;" title="${escapeAttr(`${label}: ${formatCurrency(value)}`)}"></span>`;
}

function metricCard(label, value, sub, tone = "") {
  return `
    <div class="metric-card ${escapeAttr(tone)}">
      <div class="metric-label">${escapeHtml(label)}</div>
      <div class="metric-value">${escapeHtml(value)}</div>
      <div class="metric-sub">${escapeHtml(sub)}</div>
    </div>
  `;
}

function renderTable(headers, rows, className = "") {
  if (!rows.length) return `<div class="empty">表示するデータがありません。</div>`;
  return `
    <div class="table-wrap">
      <table class="${escapeAttr(className)}">
        <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderBarList(items) {
  if (!items.length) return `<div class="empty">表示するデータがありません。</div>`;
  const max = Math.max(...items.map((item) => item.value), 1);
  return `
    <div class="bar-list">
      ${items
        .map((item) => `
          <div class="bar-row">
            <div class="bar-label" title="${escapeAttr(item.label)}">${escapeHtml(item.label)}</div>
            <div class="bar-track"><div class="bar-fill" style="width: ${(item.value / max) * 100}%"></div></div>
            <div class="bar-value">${item.value}</div>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function filterSelect(group, key, label, options) {
  const selected = state.filters[group][key];
  return `
    <label class="filter-field">
      <span>${escapeHtml(label)}</span>
      <select data-filter-group="${escapeAttr(group)}" data-filter="${escapeAttr(key)}">
        ${options.map(([value, text]) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderOverallStatus(status) {
  return badge(labels.overallStatus[status], status === "critical" ? "critical" : status === "attention" ? "medium" : status === "completed" ? "neutral" : "low");
}

function renderStatusLevel(level) {
  return badge(labels.statusLevel[level], level === "critical" ? "critical" : level === "attention" ? "medium" : "low");
}

function renderTrend(trend) {
  return badge(labels.trend[trend], trend === "worsening" ? "high" : trend === "improving" ? "low" : "neutral");
}

function renderScore(score) {
  return `<span class="score ${scoreClass(score)}">${escapeHtml(score)}</span>`;
}

function badge(text, type = "neutral") {
  return `<span class="badge ${escapeAttr(type)}">${escapeHtml(text)}</span>`;
}

function renderRequestButton(item) {
  return `<button class="btn" data-view="request-detail" data-request-id="${escapeAttr(item.id)}">${escapeHtml(item.title)}</button>`;
}

function renderEstimateButton(item) {
  return `<button class="btn" data-view="estimate-detail" data-estimate-id="${escapeAttr(item.id)}">${escapeHtml(item.title)}</button>`;
}

function renderProjectButton(item) {
  return `<button class="btn" data-view="project-detail" data-project-id="${escapeAttr(item.id)}">${escapeHtml(item.title)}</button>`;
}

function renderOperationButton(item) {
  return `<button class="btn" data-view="operation-detail" data-operation-id="${escapeAttr(item.id)}">${escapeHtml(item.systemName)}</button>`;
}

function renderRelatedObjectButton(signal) {
  if (signal.phase === "request") {
    const item = findRequest(signal.relatedId);
    return item ? renderRequestButton(item) : badge("なし", "neutral");
  }
  if (signal.phase === "estimate") {
    const item = findEstimate(signal.relatedId);
    return item ? renderEstimateButton(item) : badge("なし", "neutral");
  }
  if (signal.phase === "project") {
    const item = findProject(signal.relatedId);
    return item ? renderProjectButton(item) : badge("なし", "neutral");
  }
  const item = findOperation(signal.relatedId);
  return item ? renderOperationButton(item) : badge("なし", "neutral");
}

function filteredRequests() {
  const filter = state.filters.request;
  return state.requests.filter((item) => {
    if (filter.requesterCompany !== "all" && item.requesterCompany !== filter.requesterCompany) return false;
    if (filter.department !== "all" && item.department !== filter.department) return false;
    if (filter.background !== "all" && item.background !== filter.background) return false;
    if (filter.status !== "all" && item.status !== filter.status) return false;
    if (filter.budgetPlan !== "all" && item.budgetPlan !== filter.budgetPlan) return false;
    if (filter.attentionOnly === "yes" && attentionCount("request", item.id) <= 0) return false;
    return true;
  });
}

function filteredEstimates() {
  const filter = state.filters.estimate;
  return state.estimates.filter((item) => {
    if (filter.estimateType !== "all" && item.estimateType !== filter.estimateType) return false;
    if (filter.status !== "all" && item.status !== filter.status) return false;
    if (filter.explanationQuality !== "all" && item.explanationQuality !== filter.explanationQuality) return false;
    if (filter.feedbackOnly === "yes" && item.feedbackCount <= 0) return false;
    return true;
  });
}

function filteredProjects() {
  const filter = state.filters.project;
  return state.projects.filter((item) => {
    if (filter.department !== "all" && item.department !== filter.department) return false;
    if (filter.overallStatus !== "all" && item.overallStatus !== filter.overallStatus) return false;
    if (filter.trend !== "all" && item.trend !== filter.trend) return false;
    if (filter.attentionOnly === "yes" && attentionCount("project", item.id) <= 0) return false;
    if (filter.reportTo !== "all" && item.nextReportTo !== filter.reportTo) return false;
    if (filter.amountScale === "large" && item.amount < 500000000) return false;
    if (filter.amountScale === "mid" && item.amount < 100000000) return false;
    return true;
  });
}

function filteredOperations() {
  const filter = state.filters.operation;
  return state.operationSystems.filter((item) => {
    if (filter.department !== "all" && item.department !== filter.department) return false;
    if (filter.jsoxOnly === "yes" && !item.isJSOX) return false;
    if (filter.status !== "all" && item.operationStatus !== filter.status) return false;
    if (filter.dependencyRisk !== "all" && item.dependencyRisk !== filter.dependencyRisk) return false;
    if (filter.attentionOnly === "yes" && attentionCount("operation", item.id) <= 0) return false;
    return true;
  });
}

function filteredSignals() {
  const filter = state.filters.signal;
  return state.signals.filter((item) => {
    if (filter.phase !== "all" && item.phase !== filter.phase) return false;
    if (filter.department !== "all" && item.department !== filter.department) return false;
    if (filter.category !== "all" && item.category !== filter.category) return false;
    if (filter.attentionOnly === "yes" && !item.isAttention) return false;
    if (filter.reportTo !== "all" && item.recommendedReportTo !== filter.reportTo) return false;
    if (filter.status !== "all" && item.status !== filter.status) return false;
    return true;
  });
}

function attentionSignals() {
  return state.signals.filter((item) => item.isAttention && item.status !== "closed");
}

function attentionCount(phase, id) {
  return attentionSignals().filter((item) => item.phase === phase && item.relatedId === id).length;
}

function relatedSignals(phase, id) {
  return state.signals.filter((item) => item.phase === phase && item.relatedId === id);
}

function relatedRequestHistories(requestId) {
  return state.requestHistories.filter((item) => item.requestId === requestId).sort((a, b) => b.date.localeCompare(a.date));
}

function relatedEstimates(requestId) {
  return state.estimates.filter((item) => item.requestId === requestId).sort((a, b) => b.version - a.version);
}

function relatedEstimateHistories(estimateId) {
  return state.estimateHistories.filter((item) => item.estimateId === estimateId).sort((a, b) => b.date.localeCompare(a.date));
}

function relatedProjects(requestId) {
  return state.projects.filter((item) => item.requestId === requestId);
}

function relatedProjectUpdates(projectId) {
  return state.projectUpdates.filter((item) => item.projectId === projectId).sort((a, b) => b.date.localeCompare(a.date));
}

function relatedProjectPlans(projectId) {
  return (state.projectPlans || [])
    .filter((item) => item.projectId === projectId)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function nextProjectPlan(projectId) {
  const plans = relatedProjectPlans(projectId).filter((item) => item.status !== "done");
  return plans.find((item) => item.date >= TODAY_ISO) || plans[0] || null;
}

function relatedOperationHistories(operationSystemId) {
  return state.operationHistories.filter((item) => item.operationSystemId === operationSystemId).sort((a, b) => b.date.localeCompare(a.date));
}

function findRequest(id) {
  return state.requests.find((item) => item.id === id);
}

function findEstimate(id) {
  return state.estimates.find((item) => item.id === id);
}

function findProject(id) {
  return state.projects.find((item) => item.id === id);
}

function findOperation(id) {
  return state.operationSystems.find((item) => item.id === id);
}

function findSignal(id) {
  return state.signals.find((item) => item.id === id);
}

function findRelatedObject(phase, id) {
  if (phase === "request") return findRequest(id);
  if (phase === "estimate") return findEstimate(id);
  if (phase === "project") return findProject(id);
  if (phase === "operation") return findOperation(id);
  return null;
}

function requestTitle(requestId) {
  return findRequest(requestId)?.title || "関連相談なし";
}

function defaultSignalTarget() {
  if (state.signalDraftTarget) return state.signalDraftTarget;
  const project = findProject(state.selectedProjectId);
  if (project) return { phase: "project", relatedId: project.id, department: project.department };
  const request = findRequest(state.selectedRequestId);
  return { phase: "request", relatedId: request?.id || "", department: request?.department || departments[0] };
}

function aiRequestSummary(request) {
  const estimates = relatedEstimates(request.id);
  const signals = attentionCount("request", request.id);
  const estimateText = estimates.length ? `見積は${estimates.length}版まで発生しています。` : "見積はまだ未作成です。";
  const signalText = signals ? `要注意シグナルが${signals}件あり、上位層の早期確認候補です。` : "要注意シグナルは現時点で少ない状態です。";
  return `${request.title}は${labels.background[request.background]}を背景とする${labels.roughSize[request.roughSize]}規模の相談です。${estimateText}${signalText} 次は「${request.nextAction}」です。`;
}

function pseudoEstimateSupport(estimate) {
  const weak = estimate.explanationQuality === "weak";
  return {
    similar: "A社基幹システム更改、販売管理システム更改、会計システム法改正対応",
    missingAssumptions: weak ? "外部連携数、移行データ量、J-SOX対象範囲、利用部門数" : "運用変更範囲と並行稼働期間",
    questions: "対象機能数、現行データ量、移行リハーサル回数、監査証跡の保存期間を確認してください。",
    wbs: "要件確認、基本設計、詳細設計、移行設計、開発、テスト、切替、監査証跡整備",
    explanation: "本見積は、現行システムの機能数、外部連携数、利用部門数、および過去の類似案件実績を前提に算出しています。現時点では要件が未確定のため、概算見積として一定の変動可能性があります。特にデータ移行、外部連携、J-SOX対応範囲については、詳細確認後に再見積が必要です。",
    exclusions: "追加帳票、周辺システム改修、長期並行稼働、データクレンジング、運用部門の教育費用",
    weakPoints: weak ? "金額根拠、工数根拠、除外事項、リスク係数" : "運用変更と監査対応範囲",
  };
}

function aiProjectSummary(project) {
  const risky = [
    ["進捗", project.scheduleStatus],
    ["採算", project.profitabilityStatus],
    ["品質", project.qualityStatus],
    ["要員", project.staffingStatus],
    ["顧客", project.customerStatus],
  ].filter(([, level]) => level !== "normal");
  const axes = risky.length ? risky.map(([axis, level]) => `${axis}:${labels.statusLevel[level]}`).join("、") : "全軸おおむね正常";
  return `${project.title}は総合状態が${labels.overallStatus[project.overallStatus]}、推移は${labels.trend[project.trend]}です。注意軸は${axes}です。要注意シグナルと更新履歴から、次回報告先は${labels.reportTo[project.nextReportTo]}が妥当です。`;
}

function aiOperationSummary(system) {
  const concerns = [];
  if (system.isJSOX && system.auditTaskCount >= 10) concerns.push("J-SOX監査対応が重い");
  if (system.inquiryCount >= 30) concerns.push("問い合わせが多い");
  if (system.dependencyRisk === "high") concerns.push("属人化リスクが高い");
  if (system.successorRisk === "high") concerns.push("後継者リスクが高い");
  return concerns.length
    ? `${system.systemName}は${concerns.join("、")}状態です。次アクションは「${system.nextAction}」です。`
    : `${system.systemName}は安定運用です。通常保守の履歴を継続して蓄積します。`;
}

function runPseudoAiForProjectUpdate(project, comment) {
  const category = inferSignalCategory(comment);
  const axisPatch = inferProjectAxisPatch(comment);
  const reportTo = recommendReportTo(project.overallStatus, project.trend, project.supportNeeded || "none");
  const signalTitle = project.overallStatus === "critical" || project.trend === "worsening" || category !== "other"
    ? `${project.title}の更新から要注意候補`
    : "現時点では要注意候補なし";
  return {
    projectId: project.id,
    summary: summarizeText(comment),
    category,
    axisPatch,
    axisMessage: describeProjectAxisPatch(axisPatch),
    signalTitle,
    reportTo,
    nextCheck: nextCheckPoint(category),
  };
}

function inferProjectAxisPatch(text) {
  const level = /危険|赤字|大幅|遅延|未合意|障害|不足/.test(text) ? "critical" : "attention";
  return {
    profitabilityStatus: /採算|赤字|利益|追加見積|工数超過|未合意/.test(text) ? level : undefined,
    scheduleStatus: /納期|遅延|スケジュール|期限|工程/.test(text) ? level : undefined,
    qualityStatus: /品質|不具合|障害|テスト|手戻り/.test(text) ? level : undefined,
    staffingStatus: /要員|人手不足|兼務|負荷|PM|不足/.test(text) ? level : undefined,
    customerStatus: /顧客|依頼元|承認|合意|指摘/.test(text) ? level : undefined,
  };
}

function applyProjectAxis(project, axisPatch) {
  Object.entries(axisPatch).forEach(([key, value]) => {
    if (value) project[key] = value;
  });
}

function describeProjectAxisPatch(axisPatch) {
  const axisNames = {
    profitabilityStatus: "採算",
    scheduleStatus: "進捗",
    qualityStatus: "品質",
    staffingStatus: "要員",
    customerStatus: "顧客",
  };
  const entries = Object.entries(axisPatch).filter(([, value]) => value);
  if (!entries.length) return "状態軸への明確な変化は検出されませんでした。";
  return entries.map(([key, value]) => `${axisNames[key]}:${labels.statusLevel[value]}`).join("、");
}

function inferSignalCategory(text) {
  const rules = [
    ["aging", ["老朽化", "更改", "保守期限"]],
    ["estimate", ["見積", "概算", "根拠", "前提", "除外", "再見積"]],
    ["profitability", ["採算", "赤字", "利益", "工数超過", "追加見積", "未合意"]],
    ["staffing", ["要員", "人手不足", "兼務", "パートナー", "スキル", "PM不足"]],
    ["schedule", ["納期", "遅延", "期限", "スケジュール", "工程"]],
    ["quality", ["不具合", "品質", "テスト", "障害", "手戻り"]],
    ["customer", ["顧客", "依頼元", "指摘", "承認", "調整", "合意"]],
    ["audit", ["監査", "J-SOX", "証跡", "統制"]],
    ["dependency", ["属人化", "後継者", "特定担当者"]],
    ["operation", ["問い合わせ", "小改修", "運用負荷", "保守"]],
    ["organization", ["方針変更", "組織", "負荷集中"]],
  ];
  const normalized = String(text || "");
  const hit = rules.find(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)));
  return hit ? hit[0] : "other";
}

function calculateRiskScore({ severity, frequency, category, text, related }) {
  let score = 0;
  if (severity === "high") score += 30;
  if (severity === "medium") score += 15;
  if (frequency === "repeated") score += 20;
  if (frequency === "sometimes") score += 10;
  if (["profitability", "staffing", "customer", "audit", "dependency"].includes(category)) score += 20;
  if (related?.roughSize === "large" || related?.roughSize === "very_large" || related?.amount >= 500000000) score += 10;
  if (related?.isJSOX) score += 10;
  if (/遅延|赤字|未提出|未合意|承認滞留|障害|負荷集中|危険|指摘/.test(text)) score += 20;
  return Math.max(0, Math.min(100, score));
}

function buildAttentionReason(category, riskScore, text) {
  const reasons = [`リスクスコア${riskScore}点`];
  if (category === "profitability") reasons.push("採算悪化に関係");
  if (category === "staffing") reasons.push("要員・スキルに関係");
  if (category === "estimate") reasons.push("見積根拠または前提条件に関係");
  if (category === "audit") reasons.push("監査対応に関係");
  if (category === "dependency") reasons.push("属人化に関係");
  if (/遅延|未合意|指摘|障害/.test(text)) reasons.push("明確な悪化キーワードあり");
  return reasons.join(" / ");
}

function bumpAttentionCount(signal) {
  if (!signal.isAttention) return;
  const target = findRelatedObject(signal.phase, signal.relatedId);
  if (target && typeof target.attentionSignalCount === "number") {
    target.attentionSignalCount += 1;
    target.lastUpdatedAt = TODAY_ISO;
  }
}

function inferNextAction(text, phase) {
  const category = inferSignalCategory(text);
  if (phase === "operation") {
    if (category === "audit") return "監査対応の担当分散と証跡整理";
    if (category === "dependency") return "後継者と手順書の整備";
    if (category === "operation") return "問い合わせと小改修の優先順位整理";
    return "次回運用会議で継続確認";
  }
  if (category === "estimate") return "見積前提と除外事項を確認";
  if (category === "staffing") return "必要スキルと要員確保を確認";
  if (category === "audit") return "J-SOX対象範囲と証跡要件を確認";
  return "次回確認事項を整理";
}

function recommendReportTo(status, trend, supportNeeded) {
  if (status === "critical" || supportNeeded === "executive_decision" || supportNeeded === "budget") return "executive";
  if (status === "attention" || trend === "worsening" || supportNeeded !== "none") return "division";
  return "none";
}

function nextCheckPoint(category) {
  if (category === "profitability" || category === "estimate") return "追加見積、工数見通し、契約前提の変更有無";
  if (category === "staffing") return "PM兼務、主要工程の担当余力、支援要員の要否";
  if (category === "quality") return "同種不具合の再発状況とリリース影響";
  if (category === "customer") return "顧客合意、承認遅れ、上位者同席の必要性";
  if (category === "audit") return "監査証跡、統制範囲、特定担当者への集中";
  return "次回更新で変化があった状態軸";
}

function scoreClass(score) {
  if (Number(score) >= 85) return "critical";
  if (Number(score) >= 70) return "high";
  if (Number(score) >= 40) return "medium";
  return "low";
}

function riskTone(risk) {
  if (risk === "high") return "high";
  if (risk === "medium") return "medium";
  return "low";
}

function planTone(status) {
  if (status === "delayed") return "high";
  if (status === "at_risk") return "medium";
  if (status === "done") return "low";
  return "neutral";
}

function buildDashboardMatrix() {
  const months = buildDashboardMonths(TODAY_ISO);
  const rowDefs = dashboardRowDefinitions();
  const rows = rowDefs.map((def) => ({
    ...def,
    months: months.map(() => (def.blank ? null : emptyDashboardMetrics())),
    forecastSales: def.blank ? null : 0,
  }));
  const rowByKey = new Map(rows.map((row) => [row.key, row]));

  months.forEach((month, monthIndexValue) => {
    const consult = monthlyConsultEstimateMetrics(month);
    const project = monthlyProjectMetrics(month);
    const operation = monthlyOperationMetrics(month, monthIndexValue);

    rowByKey.get("consultEstimate").months[monthIndexValue] = consult;
    addMetrics(rowByKey.get("requirements").months[monthIndexValue], scaleDashboardMetrics(project, 0.18));
    addMetrics(rowByKey.get("design").months[monthIndexValue], scaleDashboardMetrics(project, 0.26));
    addMetrics(rowByKey.get("codingTest").months[monthIndexValue], scaleDashboardMetrics(project, 0.34));
    addMetrics(rowByKey.get("migrationCare").months[monthIndexValue], scaleDashboardMetrics(project, 0.22));
    rowByKey.get("operation").months[monthIndexValue] = operation;

    const total = emptyDashboardMetrics();
    ["consultEstimate", "requirements", "design", "codingTest", "migrationCare", "operation"].forEach((key) => {
      addMetrics(total, rowByKey.get(key).months[monthIndexValue]);
    });
    rowByKey.get("total").months[monthIndexValue] = total;
  });

  rows.forEach((row) => {
    if (row.blank) return;
    row.forecastSales = row.months.reduce((sum, metrics) => sum + (metrics?.sales || 0), 0);
  });

  return {
    months,
    rows,
    forecastLabel: `${new Date(TODAY_ISO).getFullYear()}年見込`,
    attention: [
      { label: "相談・見積", count: attentionSignals().filter((signal) => signal.phase === "request" || signal.phase === "estimate").length, view: "attention-signals" },
      { label: "プロジェクト", count: attentionSignals().filter((signal) => signal.phase === "project").length, view: "attention-signals" },
      { label: "保守・運用", count: attentionSignals().filter((signal) => signal.phase === "operation").length, view: "attention-signals" },
    ],
  };
}

function dashboardRowDefinitions() {
  return [
    { key: "consultEstimate", label: "相談・見積", kind: "primary-row" },
    { key: "project", label: "プロジェクト", kind: "group-row", blank: true },
    { key: "requirements", label: "　要件定義", kind: "sub-row" },
    { key: "design", label: "　設計", kind: "sub-row" },
    { key: "codingTest", label: "　コーディング・テスト", kind: "sub-row" },
    { key: "migrationCare", label: "　本番移行・ハイパーケア", kind: "sub-row" },
    { key: "operation", label: "保守・運用", kind: "primary-row" },
    { key: "total", label: "合計", kind: "total-row" },
  ];
}

function buildDashboardMonths(todayIso) {
  const [year, month] = String(todayIso).split("-").map(Number);
  const months = [];
  for (let currentMonth = month; currentMonth <= 12; currentMonth += 1) {
    months.push({
      key: `${year}-${String(currentMonth).padStart(2, "0")}`,
      label: `${currentMonth}/1/${String(year).slice(2)}`,
      year,
      month: currentMonth,
      startMonthIndex: monthIndex(year, currentMonth),
      endMonthIndex: monthIndex(year, currentMonth) + 1,
    });
  }
  return months;
}

function monthlyConsultEstimateMetrics(month) {
  const metrics = emptyDashboardMetrics();
  (state.requests || []).forEach((request) => {
    if (request.status === "closed" || request.status === "on_hold") return;
    const activeMonths = requestTimingMonths(request.desiredTiming);
    if (!activeMonths.includes(month.startMonthIndex)) return;
    const amount = latestEstimateAmount(request.id) || roughRequestAmount(request.roughSize);
    const monthlyRevenue = amount / Math.max(activeMonths.length, 1);
    const latestEstimate = relatedEstimates(request.id)[0];
    metrics.sales += toDashboardAmount(monthlyRevenue);
    metrics.count += 1;
    metrics.employee += latestEstimate ? Math.max(1, Math.round(latestEstimate.personMonths / Math.max(activeMonths.length, 1))) : roughEmployeeCount(request.roughSize);
    metrics.vendor += Math.max(1, Math.round(toDashboardAmount(monthlyRevenue) * 0.35));
  });
  return normalizeDashboardMetrics(metrics);
}

function monthlyProjectMetrics(month) {
  const metrics = emptyDashboardMetrics();
  (state.projects || []).forEach((project) => {
    const revenue = projectRevenueInPeriod(project, month);
    if (revenue <= 0) return;
    const sales = toDashboardAmount(revenue);
    metrics.sales += sales;
    metrics.count += 1;
    metrics.employee += Math.max(1, Math.round(sales / 28));
    metrics.vendor += Math.max(1, Math.round(sales / 8));
  });
  return normalizeDashboardMetrics(metrics);
}

function monthlyOperationMetrics(month, offset) {
  const metrics = emptyDashboardMetrics();
  (state.operationSystems || []).forEach((system) => {
    const monthlyRevenue = (operationSemiannualRevenue(system) / 6) * (1 + offset * 0.01);
    const sales = toDashboardAmount(monthlyRevenue);
    metrics.sales += sales;
    metrics.count += 1;
    metrics.employee += Math.max(1, Math.round((system.inquiryCount + system.smallChangeCount + system.auditTaskCount) / 12));
    metrics.vendor += system.dependencyRisk === "high" ? 2 : 1;
  });
  return normalizeDashboardMetrics(metrics);
}

function requestTimingMonths(desiredTiming) {
  const text = String(desiredTiming || "");
  const yearMatch = text.match(/20\d{2}/);
  if (!yearMatch) return [];
  const year = Number(yearMatch[0]);
  const startMonth = text.includes("下期") ? 7 : 1;
  const endMonth = text.includes("上期") ? 6 : 12;
  const months = [];
  for (let month = startMonth; month <= endMonth; month += 1) {
    months.push(monthIndex(year, month));
  }
  return months;
}

function emptyDashboardMetrics() {
  return { sales: 0, count: 0, employee: 0, vendor: 0 };
}

function scaleDashboardMetrics(metrics, ratio) {
  return normalizeDashboardMetrics({
    sales: metrics.sales * ratio,
    count: metrics.count * ratio,
    employee: metrics.employee * ratio,
    vendor: metrics.vendor * ratio,
  });
}

function addMetrics(target, source) {
  if (!target || !source) return target;
  target.sales += source.sales || 0;
  target.count += source.count || 0;
  target.employee += source.employee || 0;
  target.vendor += source.vendor || 0;
  return normalizeDashboardMetrics(target);
}

function normalizeDashboardMetrics(metrics) {
  return {
    sales: Math.round(metrics.sales || 0),
    count: Math.round(metrics.count || 0),
    employee: Math.round(metrics.employee || 0),
    vendor: Math.round(metrics.vendor || 0),
  };
}

function toDashboardAmount(value) {
  return Math.round(Number(value || 0) / 1000000);
}

function roughEmployeeCount(size) {
  const counts = { small: 1, medium: 2, large: 4, very_large: 8 };
  return counts[size] || 2;
}

function formatDashboardNumber(value) {
  if (value === null || value === undefined || Number(value) === 0) return "";
  return Number(value).toLocaleString("ja-JP");
}

function buildRevenueForecast() {
  const periods = buildHalfYearPeriods(TODAY_ISO, 7).map((period) => ({
    ...period,
    consultEstimate: 0,
    project: 0,
    operation: 0,
    total: 0,
  }));
  const periodMap = new Map(periods.map((period) => [period.key, period]));

  (state.requests || []).forEach((request) => {
    const amount = latestEstimateAmount(request.id) || roughRequestAmount(request.roughSize);
    const allocations = allocateRequestAmount(request.desiredTiming, amount);
    allocations.forEach(({ key, value }) => {
      const period = periodMap.get(key);
      if (period && request.status !== "closed" && request.status !== "on_hold") {
        period.consultEstimate += value;
      }
    });
  });

  (state.projects || []).forEach((project) => {
    periods.forEach((period) => {
      period.project += projectRevenueInPeriod(project, period);
    });
  });

  (state.operationSystems || []).forEach((system) => {
    const base = operationSemiannualRevenue(system);
    periods.forEach((period, index) => {
      period.operation += base * (1 + index * 0.02);
    });
  });

  periods.forEach((period) => {
    period.consultEstimate = roundRevenue(period.consultEstimate);
    period.project = roundRevenue(period.project);
    period.operation = roundRevenue(period.operation);
    period.total = roundRevenue(period.consultEstimate + period.project + period.operation);
  });

  const firstTotal = periods[0]?.total || 0;
  const lastTotal = periods[periods.length - 1]?.total || 0;
  const changeAmount = lastTotal - firstTotal;
  const changeRate = firstTotal ? changeAmount / firstTotal : 0;
  const direction = changeRate > 0.05 ? "increase" : changeRate < -0.05 ? "decrease" : "flat";

  return { periods, direction, changeAmount, changeRate };
}

function buildHalfYearPeriods(todayIso, count) {
  const [currentYear, currentMonth] = String(todayIso).split("-").map(Number);
  let year = currentYear;
  let half = currentMonth <= 6 ? 1 : 2;
  const periods = [];

  for (let index = 0; index < count; index += 1) {
    const startMonth = half === 1 ? 1 : 7;
    const endMonth = half === 1 ? 6 : 12;
    periods.push({
      key: `${year}-H${half}`,
      label: `${year}年${half === 1 ? "上期" : "下期"}`,
      startMonthIndex: monthIndex(year, startMonth),
      endMonthIndex: monthIndex(year, endMonth) + 1,
    });
    if (half === 1) {
      half = 2;
    } else {
      year += 1;
      half = 1;
    }
  }

  return periods;
}

function latestEstimateAmount(requestId) {
  const estimates = relatedEstimates(requestId);
  return estimates[0]?.amount || 0;
}

function roughRequestAmount(size) {
  const amounts = {
    small: 12000000,
    medium: 30000000,
    large: 90000000,
    very_large: 180000000,
  };
  return amounts[size] || amounts.medium;
}

function allocateRequestAmount(desiredTiming, amount) {
  const text = String(desiredTiming || "");
  const yearMatch = text.match(/20\d{2}/);
  if (!yearMatch || !amount) return [];
  const year = Number(yearMatch[0]);
  if (text.includes("上期")) return [{ key: `${year}-H1`, value: amount }];
  if (text.includes("下期")) return [{ key: `${year}-H2`, value: amount }];
  return [
    { key: `${year}-H1`, value: amount / 2 },
    { key: `${year}-H2`, value: amount / 2 },
  ];
}

function projectRevenueInPeriod(project, period) {
  const start = parseYearMonth(project.startDate);
  const end = parseYearMonth(project.plannedEndDate);
  if (!start || !end || !project.amount) return 0;
  const projectStart = monthIndex(start.year, start.month);
  const projectEnd = monthIndex(end.year, end.month) + 1;
  const totalMonths = Math.max(projectEnd - projectStart, 1);
  const overlapMonths = Math.max(0, Math.min(projectEnd, period.endMonthIndex) - Math.max(projectStart, period.startMonthIndex));
  return project.amount * (overlapMonths / totalMonths);
}

function operationSemiannualRevenue(system) {
  const base = 6000000;
  const inquiry = (system.inquiryCount || 0) * 100000;
  const incident = (system.incidentCount || 0) * 1200000;
  const smallChange = (system.smallChangeCount || 0) * 800000;
  const audit = (system.auditTaskCount || 0) * 300000;
  const jsox = system.isJSOX ? 3000000 : 0;
  return base + inquiry + incident + smallChange + audit + jsox;
}

function parseYearMonth(value) {
  const match = String(value || "").match(/^(20\d{2})-(\d{1,2})/);
  if (!match) return null;
  return { year: Number(match[1]), month: Number(match[2]) };
}

function monthIndex(year, month) {
  return year * 12 + month - 1;
}

function roundRevenue(value) {
  return Math.round(Number(value || 0) / 1000000) * 1000000;
}

function revenueTrendBadge(value, previous) {
  if (!previous) return badge("基準", "neutral");
  const rate = (value - previous) / previous;
  if (rate > 0.05) return badge(`増加 ${formatPercent(rate)}`, "low");
  if (rate < -0.05) return badge(`減少 ${formatPercent(Math.abs(rate))}`, "high");
  return badge("横ばい", "neutral");
}

function formatCurrency(value) {
  const number = Number(value || 0);
  if (number >= 100000000) {
    const amount = number / 100000000;
    return `${Number.isInteger(amount) ? amount.toFixed(0) : amount.toFixed(1)}億円`;
  }
  if (number >= 10000) return `${Math.round(number / 10000)}万円`;
  return `${number}円`;
}

function formatOku(value) {
  const number = Number(value || 0);
  return `${Number.isInteger(number) ? number.toFixed(0) : number.toFixed(1)}億円`;
}

function formatOkuSigned(value) {
  const number = Number(value || 0);
  const abs = Math.abs(number);
  const text = `${Number.isInteger(abs) ? abs.toFixed(0) : abs.toFixed(1)}億円`;
  if (number < 0) return `▲${text}`;
  if (number > 0) return `+${text}`;
  return text;
}

function formatPercent(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function summarizeText(text) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  return compact.length > 76 ? `${compact.slice(0, 76)}...` : compact;
}

function nextId(prefix, items) {
  const max = items.reduce((current, item) => {
    const match = String(item.id || "").match(/(\d+)$/);
    return Math.max(current, match ? Number(match[1]) : 0);
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

function renderOptions(values, selected) {
  return values.map((value) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
}

function renderEnumOptions(map, selected) {
  return Object.entries(map).map(([value, text]) => `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(text)}</option>`).join("");
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, "ja"));
}

function countBy(items, selector) {
  const counts = new Map();
  items.forEach((item) => {
    const label = selector(item) || "未設定";
    counts.set(label, (counts.get(label) || 0) + 1);
  });
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "ja"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
