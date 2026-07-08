const STORAGE_KEY = "signal-to-case-management-prototype:v2";
const TODAY_ISO = "2026-07-08";
const TODAY_LABEL = "2026年7月8日";

const labels = {
  caseType: {
    project: "プロジェクト型",
    routine: "定型業務型",
  },
  overallStatus: {
    normal: "正常",
    attention: "注意",
    critical: "危険",
    completed: "完了",
  },
  statusLevel: {
    normal: "正常",
    attention: "注意",
    critical: "危険",
  },
  trend: {
    improving: "改善",
    stable: "横ばい",
    worsening: "悪化",
  },
  importance: {
    high: "高",
    medium: "中",
    low: "低",
  },
  nextReportTo: {
    none: "なし",
    section_meeting: "課内会議",
    division_management_meeting: "本部基幹職会議",
    executive_meeting: "幹部会",
  },
  supportNeeded: {
    none: "なし",
    staffing: "要員",
    customer_negotiation: "顧客調整",
    executive_decision: "経営判断",
    budget: "予算",
    other: "その他",
  },
  signalSource: {
    manual: "手入力",
    attendance: "勤怠",
    seat: "座席",
    meeting: "会議資料",
    document: "文書",
    worklog: "工数",
    system: "既存システム",
  },
  signalCategory: {
    profitability: "採算",
    schedule: "納期",
    quality: "品質",
    staffing: "要員",
    customer: "顧客",
    organization: "組織コンディション",
    deadline: "期限",
    approval: "承認",
    hybrid_work: "ハイブリッド勤務",
    estimate: "見積・要件",
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
    converted_to_case: "案件化済み",
    closed: "クローズ",
  },
};

const departments = [
  "第1開発部",
  "第2開発課",
  "第3開発課",
  "インフラ部",
  "クラウド推進部",
  "情報システム部",
  "運用部",
  "品質管理部",
  "経営企画部",
  "経理部",
  "人事部",
  "営業部",
  "総務部",
];

const sampleQuestions = [
  "現在、危険状態のプロジェクト型案件は？",
  "二桁億円規模で悪化傾向の案件は？",
  "要員不足シグナルが多い案件は？",
  "採算危険になりそうな案件は？",
  "前月から悪化した案件は？",
  "幹部会に上げるべき案件候補は？",
  "期限が危ない定型業務型案件は？",
  "予算策定でどの工程が遅れている？",
  "承認待ちで止まっている案件は？",
  "要注意シグナルが増えている部門は？",
];

let state = loadState();

document.addEventListener("click", handleClick);
document.addEventListener("change", handleChange);
document.addEventListener("submit", handleSubmit);
render();

function buildInitialData() {
  const cases = [];
  const projectDetails = [];
  const routineDetails = [];

  const projectSeeds = [
    {
      caseName: "A社基幹システム更改",
      customerName: "A社",
      contractAmount: 850000000,
      startDate: "2025-04",
      plannedEndDate: "2027-03",
      department: "第1開発部",
      owner: "第1本部長",
      manager: "山田",
      status: "critical",
      trend: "worsening",
      importance: "high",
      nextReportTo: "executive_meeting",
      currentPhase: "基本設計",
      profitabilityStatus: "critical",
      scheduleStatus: "attention",
      qualityStatus: "attention",
      staffingStatus: "critical",
      customerStatus: "attention",
      attentionSignalCount: 3,
      changeRequestCount: 12,
      openIssueCount: 18,
      milestoneStatus: "主要工程が2週間遅延",
      latestComment: "仕様変更と追加見積未合意が重なり、採算と要員が危険水準です。",
      supportNeeded: "executive_decision",
    },
    {
      caseName: "B社インフラ刷新",
      customerName: "B社",
      contractAmount: 220000000,
      startDate: "2026-01",
      plannedEndDate: "2026-12",
      department: "インフラ部",
      owner: "インフラ部長",
      manager: "佐藤",
      status: "attention",
      trend: "stable",
      importance: "medium",
      nextReportTo: "division_management_meeting",
      currentPhase: "検証",
      profitabilityStatus: "normal",
      scheduleStatus: "normal",
      qualityStatus: "attention",
      staffingStatus: "attention",
      customerStatus: "normal",
      attentionSignalCount: 1,
      changeRequestCount: 3,
      openIssueCount: 7,
      milestoneStatus: "検証環境の安定化待ち",
      latestComment: "検証環境の不具合はあるが、全体計画は維持できています。",
      supportNeeded: "staffing",
    },
    {
      caseName: "C社クラウド移行",
      customerName: "C社",
      contractAmount: 110000000,
      startDate: "2026-04",
      plannedEndDate: "2027-09",
      department: "クラウド推進部",
      owner: "クラウド推進部長",
      manager: "鈴木",
      status: "normal",
      trend: "stable",
      importance: "medium",
      nextReportTo: "none",
      currentPhase: "要件定義",
      profitabilityStatus: "normal",
      scheduleStatus: "normal",
      qualityStatus: "normal",
      staffingStatus: "normal",
      customerStatus: "normal",
      attentionSignalCount: 0,
      changeRequestCount: 1,
      openIssueCount: 2,
      milestoneStatus: "計画通り",
      latestComment: "現時点では大きな懸念なし。",
      supportNeeded: "none",
    },
    {
      caseName: "社内セキュリティ基盤導入",
      customerName: "社内",
      contractAmount: 90000000,
      startDate: "2026-02",
      plannedEndDate: "2026-11",
      department: "情報システム部",
      owner: "情シス部長",
      manager: "高橋",
      status: "attention",
      trend: "worsening",
      importance: "high",
      nextReportTo: "division_management_meeting",
      currentPhase: "詳細設計",
      profitabilityStatus: "normal",
      scheduleStatus: "attention",
      qualityStatus: "attention",
      staffingStatus: "attention",
      customerStatus: "normal",
      attentionSignalCount: 2,
      changeRequestCount: 4,
      openIssueCount: 9,
      milestoneStatus: "運用設計の合意が遅れ気味",
      latestComment: "要員と品質の注意シグナルが増えています。",
      supportNeeded: "staffing",
    },
    {
      caseName: "M社次世代基幹システム刷新",
      customerName: "M社",
      contractAmount: 1450000000,
      startDate: "2025-10",
      plannedEndDate: "2028-03",
      department: "第1開発部",
      owner: "第1本部長",
      manager: "森",
      status: "critical",
      trend: "worsening",
      importance: "high",
      nextReportTo: "executive_meeting",
      currentPhase: "要件再整理",
      profitabilityStatus: "critical",
      scheduleStatus: "critical",
      qualityStatus: "attention",
      staffingStatus: "critical",
      customerStatus: "critical",
      attentionSignalCount: 5,
      changeRequestCount: 21,
      openIssueCount: 32,
      milestoneStatus: "要件凍結が未完了",
      latestComment: "二桁億円規模で顧客合意と採算の両方が悪化しています。",
      supportNeeded: "executive_decision",
    },
  ];

  const generatedProjectNames = [
    ["D社EC基盤刷新", "D社", 180000000, "第1開発部"],
    ["E社データ分析基盤構築", "E社", 260000000, "クラウド推進部"],
    ["F社CRM統合", "F社", 140000000, "第1開発部"],
    ["G社工場IoT導入", "G社", 320000000, "クラウド推進部"],
    ["H社認証基盤更改", "H社", 120000000, "インフラ部"],
    ["I社決済基盤改修", "I社", 420000000, "第1開発部"],
    ["J社保守運用高度化", "J社", 80000000, "運用部"],
    ["社内データレイク構築", "社内", 250000000, "情報システム部"],
    ["監視基盤更改", "社内", 65000000, "運用部"],
    ["ID管理統合", "社内", 98000000, "情報システム部"],
    ["K社大規模Web刷新", "K社", 680000000, "第1開発部"],
    ["L社モバイルアプリ刷新", "L社", 190000000, "第3開発課"],
    ["N社基盤標準化", "N社", 300000000, "インフラ部"],
    ["O社クラウド運用移管", "O社", 115000000, "クラウド推進部"],
    ["P社販売管理再構築", "P社", 510000000, "第1開発部"],
    ["Q社品質改善プロジェクト", "Q社", 73000000, "品質管理部"],
    ["R社ネットワーク更改", "R社", 210000000, "インフラ部"],
    ["S社AI活用PoC", "S社", 45000000, "クラウド推進部"],
    ["社内ワークフロー刷新", "社内", 135000000, "情報システム部"],
    ["T社DWH移行", "T社", 280000000, "クラウド推進部"],
    ["U社会員基盤統合", "U社", 360000000, "第1開発部"],
    ["V社セキュリティ監査対応", "V社", 70000000, "情報システム部"],
    ["W社基幹保守延伸", "W社", 95000000, "運用部"],
    ["X社新サービス基盤", "X社", 1250000000, "第1開発部"],
    ["Y社帳票基盤刷新", "Y社", 160000000, "第2開発課"],
  ];

  projectSeeds.concat(
    generatedProjectNames.map(([caseName, customerName, contractAmount, department], index) => {
      const statusCycle = ["normal", "attention", "normal", "attention", "critical"];
      const trendCycle = ["stable", "stable", "improving", "worsening", "worsening"];
      const status = statusCycle[index % statusCycle.length];
      const isCritical = status === "critical";
      return {
        caseName,
        customerName,
        contractAmount,
        startDate: index % 2 === 0 ? "2026-04" : "2026-07",
        plannedEndDate: index % 3 === 0 ? "2027-03" : "2027-09",
        department,
        owner: `${department}長`,
        manager: ["田中", "伊藤", "中村", "小林", "加藤"][index % 5],
        status,
        trend: trendCycle[index % trendCycle.length],
        importance: isCritical || contractAmount >= 500000000 ? "high" : status === "attention" ? "medium" : "low",
        nextReportTo: isCritical ? "executive_meeting" : status === "attention" ? "division_management_meeting" : "none",
        currentPhase: ["要件定義", "基本設計", "詳細設計", "構築", "テスト"][index % 5],
        profitabilityStatus: isCritical || index % 7 === 0 ? "critical" : index % 3 === 0 ? "attention" : "normal",
        scheduleStatus: isCritical || index % 6 === 0 ? "attention" : "normal",
        qualityStatus: index % 4 === 0 ? "attention" : "normal",
        staffingStatus: isCritical || index % 5 === 0 ? "attention" : "normal",
        customerStatus: isCritical ? "critical" : index % 8 === 0 ? "attention" : "normal",
        attentionSignalCount: isCritical ? 3 : status === "attention" ? 1 : 0,
        changeRequestCount: isCritical ? 14 : index % 4,
        openIssueCount: isCritical ? 20 : 2 + (index % 8),
        milestoneStatus: isCritical ? "主要マイルストーン再計画中" : status === "attention" ? "一部工程に注意" : "計画通り",
        latestComment: isCritical
          ? "要件変更と要員不足が重なり、上位判断が必要です。"
          : status === "attention"
            ? "一部に注意点はあるが、支援があれば計画維持可能です。"
            : "現時点では大きな懸念なし。",
        supportNeeded: isCritical ? "executive_decision" : status === "attention" ? "staffing" : "none",
      };
    }),
  ).forEach((seed, index) => {
    const id = `C-P${String(index + 1).padStart(3, "0")}`;
    cases.push({
      id,
      caseCode: `P-${String(index + 1).padStart(3, "0")}`,
      caseName: seed.caseName,
      caseType: "project",
      department: seed.department,
      owner: seed.owner,
      manager: seed.manager,
      status: seed.status,
      trend: seed.trend,
      importance: seed.importance,
      nextReportTo: seed.nextReportTo,
      latestComment: seed.latestComment,
      supportNeeded: seed.supportNeeded,
      attentionSignalCount: seed.attentionSignalCount,
      lastUpdatedAt: index % 4 === 0 ? "2026-07-08" : "2026-07-05",
    });
    projectDetails.push({
      caseId: id,
      customerName: seed.customerName,
      startDate: seed.startDate,
      plannedEndDate: seed.plannedEndDate,
      currentPhase: seed.currentPhase,
      contractAmount: seed.contractAmount,
      forecastCost: Math.round(seed.contractAmount * (seed.profitabilityStatus === "critical" ? 1.08 : seed.profitabilityStatus === "attention" ? 0.9 : 0.78)),
      forecastGrossProfit: Math.round(seed.contractAmount * (seed.profitabilityStatus === "critical" ? -0.04 : seed.profitabilityStatus === "attention" ? 0.08 : 0.18)),
      profitabilityStatus: seed.profitabilityStatus,
      scheduleStatus: seed.scheduleStatus,
      qualityStatus: seed.qualityStatus,
      staffingStatus: seed.staffingStatus,
      customerStatus: seed.customerStatus,
      changeRequestCount: seed.changeRequestCount,
      openIssueCount: seed.openIssueCount,
      milestoneStatus: seed.milestoneStatus,
    });
  });

  const routineSeeds = [
    {
      caseName: "2027年度予算策定",
      deadline: "2026-09-30",
      submitTo: "親会社",
      department: "経営企画部",
      owner: "経営企画部長",
      manager: "経営企画部長",
      currentStep: "各部門から回収",
      progressRate: 45,
      status: "attention",
      trend: "worsening",
      deadlineStatus: "attention",
      processStatus: "attention",
      approvalStatus: "normal",
      responseStatus: "critical",
      qualityStatus: "normal",
      notSubmittedDepartmentCount: 4,
      pendingApprovalCount: 1,
      overdueTaskCount: 2,
      nextReportTo: "division_management_meeting",
      latestComment: "一部部門から入力資料が未提出で、親会社提出期限への影響が懸念されます。",
    },
    {
      caseName: "四半期決算対応",
      deadline: "2026-07-31",
      submitTo: "親会社",
      department: "経理部",
      owner: "経理部長",
      manager: "経理部長",
      currentStep: "数値確認",
      progressRate: 70,
      status: "normal",
      trend: "stable",
      deadlineStatus: "normal",
      processStatus: "normal",
      approvalStatus: "attention",
      responseStatus: "normal",
      qualityStatus: "normal",
      notSubmittedDepartmentCount: 0,
      pendingApprovalCount: 2,
      overdueTaskCount: 0,
      nextReportTo: "none",
      latestComment: "承認待ちはあるが期限内に収まる見込みです。",
    },
    {
      caseName: "人事評価運用",
      deadline: "2026-08-20",
      submitTo: "人事部",
      department: "人事部",
      owner: "人事部長",
      manager: "人事部長",
      currentStep: "一次評価回収",
      progressRate: 55,
      status: "attention",
      trend: "stable",
      deadlineStatus: "attention",
      processStatus: "attention",
      approvalStatus: "normal",
      responseStatus: "attention",
      qualityStatus: "normal",
      notSubmittedDepartmentCount: 3,
      pendingApprovalCount: 0,
      overdueTaskCount: 1,
      nextReportTo: "section_meeting",
      latestComment: "一部部署の回答が遅れており、回収促進が必要です。",
    },
  ];

  const generatedRoutineNames = [
    ["監査対応", "2026-10-15", "監査法人", "経理部"],
    ["採用計画策定", "2026-08-31", "経営会議", "人事部"],
    ["労務対応方針更新", "2026-09-10", "本部基幹職会議", "人事部"],
    ["親会社提出資料作成", "2026-07-25", "親会社", "経営企画部"],
    ["制度改定対応", "2026-11-30", "経営会議", "人事部"],
    ["内部統制チェック", "2026-08-15", "監査部門", "総務部"],
    ["年度契約更新", "2026-12-20", "各取引先", "営業部"],
    ["全社棚卸対応", "2026-09-05", "経理部", "総務部"],
    ["予算実績差異分析", "2026-08-05", "経営会議", "経営企画部"],
    ["安全衛生委員会資料", "2026-07-28", "安全衛生委員会", "人事部"],
    ["教育計画取りまとめ", "2026-09-18", "本部長会議", "人事部"],
    ["個人情報点検", "2026-08-25", "情報システム部", "総務部"],
    ["取締役会資料作成", "2026-07-22", "取締役会", "経営企画部"],
    ["下期要員計画", "2026-09-12", "幹部会", "人事部"],
    ["購買申請棚卸", "2026-08-18", "経理部", "総務部"],
    ["プロジェクト原価締め", "2026-07-29", "経理部", "経理部"],
    ["BCP訓練準備", "2026-10-05", "経営会議", "総務部"],
  ];

  routineSeeds.concat(
    generatedRoutineNames.map(([caseName, deadline, submitTo, department], index) => {
      const statusCycle = ["normal", "attention", "normal", "attention", "critical", "normal"];
      const status = statusCycle[index % statusCycle.length];
      return {
        caseName,
        deadline,
        submitTo,
        department,
        owner: `${department}長`,
        manager: `${department}長`,
        currentStep: ["依頼中", "回収中", "確認中", "承認待ち", "修正中"][index % 5],
        progressRate: Math.min(95, 35 + ((index * 9) % 55)),
        status,
        trend: status === "critical" ? "worsening" : index % 4 === 0 ? "worsening" : "stable",
        deadlineStatus: status === "critical" ? "critical" : index % 3 === 0 ? "attention" : "normal",
        processStatus: index % 4 === 0 ? "attention" : "normal",
        approvalStatus: index % 5 === 0 ? "attention" : "normal",
        responseStatus: status === "critical" ? "critical" : index % 2 === 0 ? "attention" : "normal",
        qualityStatus: index % 7 === 0 ? "attention" : "normal",
        notSubmittedDepartmentCount: status === "critical" ? 5 : index % 4,
        pendingApprovalCount: index % 5,
        overdueTaskCount: status === "critical" ? 3 : index % 3,
        nextReportTo: status === "critical" ? "executive_meeting" : status === "attention" ? "division_management_meeting" : "none",
        latestComment: status === "critical"
          ? "未回答と期限超過が重なり、上位報告候補です。"
          : status === "attention"
            ? "一部工程に注意が必要です。"
            : "予定通り進行しています。",
      };
    }),
  ).forEach((seed, index) => {
    const id = `C-R${String(index + 1).padStart(3, "0")}`;
    cases.push({
      id,
      caseCode: `R-${String(index + 1).padStart(3, "0")}`,
      caseName: seed.caseName,
      caseType: "routine",
      department: seed.department,
      owner: seed.owner,
      manager: seed.manager,
      status: seed.status,
      trend: seed.trend,
      importance: seed.status === "critical" ? "high" : seed.status === "attention" ? "medium" : "low",
      nextReportTo: seed.nextReportTo,
      latestComment: seed.latestComment,
      supportNeeded: seed.status === "critical" ? "executive_decision" : seed.status === "attention" ? "other" : "none",
      attentionSignalCount: seed.status === "critical" ? 2 : seed.status === "attention" ? 1 : 0,
      lastUpdatedAt: index % 3 === 0 ? "2026-07-08" : "2026-07-04",
    });
    routineDetails.push({
      caseId: id,
      deadline: seed.deadline,
      submitTo: seed.submitTo,
      processTemplate: "依頼 → 回収 → 確認 → 承認 → 提出",
      currentStep: seed.currentStep,
      progressRate: seed.progressRate,
      overdueTaskCount: seed.overdueTaskCount,
      pendingApprovalCount: seed.pendingApprovalCount,
      requestedDepartmentCount: 12,
      notSubmittedDepartmentCount: seed.notSubmittedDepartmentCount,
      deadlineStatus: seed.deadlineStatus,
      processStatus: seed.processStatus,
      approvalStatus: seed.approvalStatus,
      responseStatus: seed.responseStatus,
      qualityStatus: seed.qualityStatus,
    });
  });

  const findCaseId = (name) => cases.find((item) => item.caseName === name)?.id;
  const signalSeeds = [
    ["A社案件で仕様変更が増えている", "A社案件で仕様変更が継続して発生しており、見積前提が崩れ始めています。", "第1開発部", "A社基幹システム更改", "estimate", "medium", "repeated", true, 82],
    ["A社案件で追加見積の合意が取れていない", "追加見積の合意が取れず、採算悪化と赤字化のおそれがあります。", "第1開発部", "A社基幹システム更改", "profitability", "high", "repeated", true, 94],
    ["A社案件で要員不足により設計工程が遅れている", "PMと設計リーダーの兼務が続き、設計工程が遅延しています。", "第1開発部", "A社基幹システム更改", "staffing", "high", "repeated", true, 91],
    ["B社インフラ刷新で検証環境の不具合が増えている", "検証環境の不具合が増え、品質とスケジュールへの影響が出始めています。", "インフラ部", "B社インフラ刷新", "quality", "medium", "sometimes", true, 74],
    ["第2開発課で突発休が増えている", "突発休が増えています。個人を責めるのではなく、課単位の負荷傾向として確認したいです。", "第2開発課", "", "organization", "high", "repeated", true, 90],
    ["チームの出社日が合わず相談機会が減っている", "出社日が分散し、若手が相談しにくい状態になっています。", "第3開発課", "", "hybrid_work", "medium", "repeated", false, 58],
    ["予算策定で一部部門から入力資料が未提出", "親会社提出に向けた予算策定で、一部部門から入力資料が未提出です。", "経営企画部", "2027年度予算策定", "deadline", "high", "sometimes", true, 88],
    ["四半期決算で承認者確認が滞留している", "承認者確認が滞留していますが、期限内に解消見込みです。", "経理部", "四半期決算対応", "approval", "medium", "sometimes", false, 62],
    ["M社案件で要件凍結ができていない", "二桁億円規模の案件で要件凍結できず、顧客影響と採算悪化が大きいです。", "第1開発部", "M社次世代基幹システム刷新", "customer", "high", "repeated", true, 96],
    ["親会社提出資料の承認待ちが長引いている", "親会社提出資料の承認待ちが長引き、提出期限に影響するおそれがあります。", "経営企画部", "親会社提出資料作成", "approval", "high", "sometimes", true, 86],
  ];

  const signals = signalSeeds.map((seed, index) => {
    const [title, description, department, relatedCaseName, category, severity, frequency, isAttentionSignal, riskScore] = seed;
    return {
      id: `S-${String(index + 1).padStart(3, "0")}`,
      signalCode: `SIG-${String(index + 1).padStart(3, "0")}`,
      title,
      description,
      department,
      source: index % 3 === 0 ? "meeting" : index % 3 === 1 ? "manual" : "worklog",
      category,
      severity,
      frequency,
      relatedCaseId: relatedCaseName ? findCaseId(relatedCaseName) : undefined,
      isAttentionSignal,
      attentionReason: isAttentionSignal ? buildAttentionReason(category, riskScore, description) : "",
      riskScore,
      status: isAttentionSignal ? "attention" : riskScore >= 40 ? "watching" : "new",
      createdAt: index < 5 ? "2026-07-04" : "2026-07-07",
    };
  });

  const histories = cases.flatMap((item, index) => [
    {
      id: `H-${String(index + 1).padStart(3, "0")}-1`,
      caseId: item.id,
      reportedDate: "2026-06-30",
      overallStatus: item.status === "critical" && item.trend === "worsening" ? "attention" : item.status,
      trend: "stable",
      comment: "前回報告時点の状態です。",
      supportNeeded: item.supportNeeded,
      createdBy: item.manager,
    },
    {
      id: `H-${String(index + 1).padStart(3, "0")}-2`,
      caseId: item.id,
      reportedDate: item.lastUpdatedAt,
      overallStatus: item.status,
      trend: item.trend,
      comment: item.latestComment,
      supportNeeded: item.supportNeeded,
      createdBy: item.manager,
    },
  ]);

  return { cases, projectDetails, routineDetails, signals, histories };
}

function loadState() {
  const base = buildInitialData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultState(base);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.cases) || !Array.isArray(parsed.signals)) {
      return defaultState(base);
    }
    return {
      ...defaultState(base),
      ...parsed,
      filters: { ...defaultFilters(), ...(parsed.filters || {}) },
      signalFilters: { ...defaultSignalFilters(), ...(parsed.signalFilters || {}) },
    };
  } catch (error) {
    return defaultState(base);
  }
}

function defaultState(base = buildInitialData()) {
  return {
    view: "overview",
    selectedCaseId: base.cases[0]?.id || "",
    selectedSignalId: base.signals.find((signal) => signal.isAttentionSignal)?.id || "",
    selectedWeeklyCaseId: base.cases[0]?.id || "",
    selectedQuestion: sampleQuestions[0],
    aiResult: null,
    weeklyAiResult: null,
    conversionResult: null,
    filters: defaultFilters(),
    signalFilters: defaultSignalFilters(),
    cases: base.cases,
    projectDetails: base.projectDetails,
    routineDetails: base.routineDetails,
    signals: base.signals,
    histories: base.histories,
  };
}

function defaultFilters() {
  return {
    caseType: "all",
    department: "all",
    status: "all",
    trend: "all",
    attentionOnly: "all",
    reportTo: "all",
    profitabilityCritical: "all",
    deadlineCritical: "all",
    amountScale: "all",
  };
}

function defaultSignalFilters() {
  return {
    attentionOnly: "all",
    department: "all",
    category: "all",
    source: "all",
    relatedOnly: "all",
    highScore: "all",
    openOnly: "all",
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function handleClick(event) {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    if (viewButton.dataset.caseId) state.selectedCaseId = viewButton.dataset.caseId;
    if (viewButton.dataset.signalId) state.selectedSignalId = viewButton.dataset.signalId;
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

  const filterReset = event.target.closest("[data-reset-filters]");
  if (filterReset) {
    state.filters = defaultFilters();
    saveState();
    render();
    return;
  }

  const signalFilterReset = event.target.closest("[data-reset-signal-filters]");
  if (signalFilterReset) {
    state.signalFilters = defaultSignalFilters();
    saveState();
    render();
    return;
  }

  const questionButton = event.target.closest("[data-question]");
  if (questionButton) {
    state.selectedQuestion = questionButton.dataset.question;
    saveState();
    render();
    return;
  }

  const signalSelect = event.target.closest("[data-select-signal]");
  if (signalSelect) {
    state.selectedSignalId = signalSelect.dataset.selectSignal;
    saveState();
    render();
    return;
  }

  const actionButton = event.target.closest("[data-attention-action]");
  if (actionButton) {
    handleAttentionAction(actionButton.dataset.attentionAction, actionButton.dataset.signalId);
  }
}

function handleChange(event) {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    state.filters[filter.dataset.filter] = filter.value;
    saveState();
    render();
    return;
  }

  const signalFilter = event.target.closest("[data-signal-filter]");
  if (signalFilter) {
    state.signalFilters[signalFilter.dataset.signalFilter] = signalFilter.value;
    saveState();
    render();
    return;
  }

  const weeklyCase = event.target.closest("[data-weekly-case]");
  if (weeklyCase) {
    state.selectedWeeklyCaseId = weeklyCase.value;
    saveState();
    render();
    return;
  }
}

function handleSubmit(event) {
  if (event.target.id === "signal-form") {
    event.preventDefault();
    registerSignal(event.target);
    return;
  }

  if (event.target.id === "weekly-update-form") {
    event.preventDefault();
    registerWeeklyUpdate(event.target);
    return;
  }

  if (event.target.id === "case-convert-form") {
    event.preventDefault();
    convertSignalToCase(event.target);
  }
}

function registerSignal(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const ai = runPseudoAiForSignal(input);
  const id = nextSignalId();
  const signal = {
    id,
    signalCode: `SIG-${id.split("-")[1]}`,
    title: input.title.trim(),
    description: input.description.trim(),
    department: input.department,
    source: "manual",
    category: input.category || ai.category,
    severity: input.severity,
    frequency: input.frequency,
    relatedCaseId: ai.relatedCaseId || undefined,
    isAttentionSignal: ai.isAttentionCandidate,
    attentionReason: ai.attentionReason,
    riskScore: ai.riskScore,
    status: ai.isAttentionCandidate ? "attention" : ai.riskScore >= 40 ? "watching" : "new",
    createdAt: TODAY_ISO,
  };

  state.signals = [signal, ...state.signals];
  if (signal.isAttentionSignal && signal.relatedCaseId) {
    const related = findCase(signal.relatedCaseId);
    if (related) {
      related.attentionSignalCount += 1;
      related.latestComment = `新しい要注意シグナル: ${signal.title}`;
      related.lastUpdatedAt = TODAY_ISO;
    }
  }
  state.aiResult = { ...ai, signalId: id };
  saveState();
  render();
}

function registerWeeklyUpdate(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const item = findCase(input.caseId);
  if (!item) return;

  item.status = input.overallStatus;
  item.trend = input.trend;
  item.latestComment = input.comment.trim();
  item.supportNeeded = input.supportNeeded;
  item.lastUpdatedAt = TODAY_ISO;
  item.nextReportTo = recommendReportTo(input.overallStatus, input.trend, input.supportNeeded);

  const ai = runPseudoAiForWeeklyUpdate(item, input.comment);
  const history = {
    id: nextHistoryId(),
    caseId: item.id,
    reportedDate: TODAY_ISO,
    overallStatus: input.overallStatus,
    trend: input.trend,
    comment: input.comment.trim(),
    supportNeeded: input.supportNeeded,
    createdBy: item.manager,
    ...ai.axisPatch,
  };
  state.histories = [history, ...state.histories];
  state.weeklyAiResult = ai;
  state.selectedCaseId = item.id;
  saveState();
  render();
}

function convertSignalToCase(form) {
  const input = Object.fromEntries(new FormData(form).entries());
  const signal = findSignal(input.signalId);
  if (!signal) return;

  const id = input.caseType === "project" ? nextCaseId("C-P") : nextCaseId("C-R");
  const newCase = {
    id,
    caseCode: input.caseType === "project" ? `P-${id.split("P")[1]}` : `R-${id.split("R")[1]}`,
    caseName: input.caseName.trim(),
    caseType: input.caseType,
    department: signal.department,
    owner: input.owner.trim(),
    manager: input.manager.trim(),
    status: input.status,
    trend: "stable",
    importance: input.status === "critical" ? "high" : input.status === "attention" ? "medium" : "low",
    nextReportTo: input.nextReportTo,
    latestComment: input.policy.trim(),
    supportNeeded: input.nextReportTo === "executive_meeting" ? "executive_decision" : "other",
    attentionSignalCount: 1,
    lastUpdatedAt: TODAY_ISO,
  };
  state.cases = [newCase, ...state.cases];

  if (input.caseType === "project") {
    const amount = parseAmount(input.impact);
    state.projectDetails = [
      {
        caseId: id,
        customerName: input.customerName || signal.department,
        startDate: TODAY_ISO.slice(0, 7),
        plannedEndDate: input.dueDate,
        currentPhase: "立ち上げ",
        contractAmount: amount,
        forecastCost: Math.round(amount * 0.85),
        forecastGrossProfit: Math.round(amount * 0.15),
        profitabilityStatus: signal.category === "profitability" ? "attention" : "normal",
        scheduleStatus: signal.category === "schedule" ? "attention" : "normal",
        qualityStatus: signal.category === "quality" ? "attention" : "normal",
        staffingStatus: signal.category === "staffing" || signal.category === "organization" ? "attention" : "normal",
        customerStatus: signal.category === "customer" ? "attention" : "normal",
        changeRequestCount: signal.category === "estimate" ? 1 : 0,
        openIssueCount: 1,
        milestoneStatus: "案件化直後",
      },
      ...state.projectDetails,
    ];
  } else {
    state.routineDetails = [
      {
        caseId: id,
        deadline: input.dueDate,
        submitTo: input.submitTo || "未設定",
        processTemplate: "依頼 → 回収 → 確認 → 承認 → 提出",
        currentStep: "立ち上げ",
        progressRate: 0,
        overdueTaskCount: signal.category === "deadline" ? 1 : 0,
        pendingApprovalCount: signal.category === "approval" ? 1 : 0,
        requestedDepartmentCount: 10,
        notSubmittedDepartmentCount: signal.category === "deadline" ? 1 : 0,
        deadlineStatus: signal.category === "deadline" || signal.category === "schedule" ? "attention" : "normal",
        processStatus: "normal",
        approvalStatus: signal.category === "approval" ? "attention" : "normal",
        responseStatus: "normal",
        qualityStatus: signal.category === "quality" ? "attention" : "normal",
      },
      ...state.routineDetails,
    ];
  }

  signal.relatedCaseId = id;
  signal.status = "converted_to_case";
  signal.isAttentionSignal = true;
  state.histories = [
    {
      id: nextHistoryId(),
      caseId: id,
      reportedDate: TODAY_ISO,
      overallStatus: newCase.status,
      trend: newCase.trend,
      comment: `要注意シグナル「${signal.title}」から案件化。${input.policy}`,
      supportNeeded: newCase.supportNeeded,
      createdBy: input.manager,
    },
    ...state.histories,
  ];
  state.conversionResult = { caseId: id, signalId: signal.id };
  state.selectedCaseId = id;
  state.view = "case-detail";
  saveState();
  render();
}

function handleAttentionAction(action, signalId) {
  const signal = findSignal(signalId);
  if (!signal) return;

  if (action === "watch") {
    signal.status = "watching";
    signal.attentionReason = `${signal.attentionReason || ""} ウォッチ継続として確認中。`.trim();
  }
  if (action === "report-division") {
    signal.status = "attention";
    signal.attentionReason = `${signal.attentionReason || ""} 本部基幹職会議への報告候補。`.trim();
    updateRelatedReport(signal, "division_management_meeting");
  }
  if (action === "report-exec") {
    signal.status = "attention";
    signal.attentionReason = `${signal.attentionReason || ""} 幹部会への報告候補。`.trim();
    updateRelatedReport(signal, "executive_meeting");
  }
  if (action === "convert") {
    state.selectedSignalId = signal.id;
    state.view = "case-demo";
  }
  if (action === "close") {
    signal.status = "closed";
    signal.isAttentionSignal = false;
  }

  saveState();
  render();
}

function updateRelatedReport(signal, nextReportTo) {
  if (!signal.relatedCaseId) return;
  const item = findCase(signal.relatedCaseId);
  if (item) {
    item.nextReportTo = nextReportTo;
    item.lastUpdatedAt = TODAY_ISO;
  }
}

function runPseudoAiForSignal(input) {
  const text = [input.title, input.description, input.relatedText, input.comment].filter(Boolean).join(" ");
  const category = input.category || inferCategory(text);
  const relatedCase = findRelatedCase(input.relatedCaseId, text);
  const riskScore = calculateRiskScore({
    severity: input.severity,
    frequency: input.frequency,
    category,
    text,
    hasRelatedCase: Boolean(relatedCase),
  });
  const isAttentionCandidate = isAttentionSignalCandidate({ category, riskScore, text, frequency: input.frequency, relatedCase });
  return {
    summary: summarizeText(input.description || input.title),
    category,
    riskScore,
    decision: riskDecision(riskScore),
    isAttentionCandidate,
    attentionReason: isAttentionCandidate ? buildAttentionReason(category, riskScore, text) : "通常シグナルとして記録し、増加傾向があれば再評価します。",
    relatedCaseId: relatedCase?.id || "",
    relatedCaseCandidates: findRelatedCaseCandidates(text, category),
    recommendedAction: recommendSignalAction(riskScore, isAttentionCandidate),
  };
}

function runPseudoAiForWeeklyUpdate(item, comment) {
  const text = `${comment} ${item.latestComment}`;
  const category = inferCategory(text);
  const reportTo = recommendReportTo(item.status, item.trend, item.supportNeeded);
  const axisPatch = inferAxisPatch(item, text);
  const attentionCandidate = item.status === "critical" || item.trend === "worsening" || category !== "other";
  return {
    caseId: item.id,
    summary: summarizeText(comment),
    category,
    axisPatch,
    axisMessage: describeAxisPatch(item, axisPatch),
    attentionCandidate,
    attentionTitle: attentionCandidate ? `${item.caseName}の週次更新から要注意候補` : "現時点では要注意候補なし",
    reportTo,
    nextCheck: nextCheckPoint(item, category),
  };
}

function inferCategory(text) {
  const rules = [
    ["profitability", ["採算", "赤字", "利益", "工数超過", "追加見積"]],
    ["estimate", ["仕様変更", "要件変更", "前提変更", "見積"]],
    ["quality", ["不具合", "障害", "品質", "手戻り", "テスト"]],
    ["schedule", ["納期", "遅延", "スケジュール", "期限"]],
    ["staffing", ["要員", "人手不足", "兼務", "負荷集中", "PM不足", "PM"]],
    ["organization", ["突発休", "休職", "疲弊", "気分", "体調"]],
    ["hybrid_work", ["出社", "在宅", "テレワーク", "座席", "相談機会"]],
    ["customer", ["顧客", "クレーム", "承認遅れ", "反応が悪い"]],
    ["approval", ["承認", "滞留", "決裁"]],
    ["deadline", ["提出", "親会社", "締切", "未提出"]],
  ];
  const normalized = String(text || "");
  const hit = rules.find(([, keywords]) => keywords.some((keyword) => normalized.includes(keyword)));
  return hit ? hit[0] : "other";
}

function calculateRiskScore({ severity, frequency, category, text, hasRelatedCase }) {
  let score = 0;
  if (severity === "high") score += 30;
  if (severity === "medium") score += 15;
  if (frequency === "repeated") score += 20;
  if (frequency === "sometimes") score += 10;
  if (["profitability", "customer", "organization", "deadline", "approval"].includes(category)) score += 20;
  if (/遅延|赤字|休職|障害|未提出|承認滞留|滞留|幹部会|危険|負荷集中/.test(text)) score += 20;
  if (hasRelatedCase) score += 10;
  return Math.max(0, Math.min(100, score));
}

function isAttentionSignalCandidate({ category, riskScore, text, frequency, relatedCase }) {
  if (riskScore >= 70) return true;
  if (["profitability", "schedule", "customer", "organization", "deadline", "approval"].includes(category)) return true;
  if (/採算悪化|納期遅延|顧客影響|突発休|休職|負荷集中|親会社|承認滞留|二桁億円|大規模/.test(text)) return true;
  if (frequency === "repeated") return true;
  if (relatedCase && relatedCase.importance === "high") return true;
  return false;
}

function riskDecision(score) {
  if (score >= 85) return "案件化候補";
  if (score >= 70) return "要注意シグナル";
  if (score >= 40) return "ウォッチ";
  return "通常シグナル";
}

function buildAttentionReason(category, riskScore, text) {
  const reasons = [];
  if (riskScore >= 70) reasons.push(`リスクスコア${riskScore}点`);
  if (category === "profitability" || /採算|赤字|追加見積/.test(text)) reasons.push("採算悪化に関係");
  if (category === "schedule" || /遅延|納期/.test(text)) reasons.push("納期遅延に関係");
  if (category === "customer" || /顧客|クレーム/.test(text)) reasons.push("顧客影響あり");
  if (category === "organization" || /突発休|休職|負荷集中|疲弊/.test(text)) reasons.push("組織コンディションに関係");
  if (category === "deadline" || /親会社|未提出|締切/.test(text)) reasons.push("親会社提出期限に影響");
  if (category === "approval" || /承認|滞留|決裁/.test(text)) reasons.push("承認滞留あり");
  if (!reasons.length) reasons.push("複数回発生または上位層のウォッチ対象");
  return reasons.join(" / ");
}

function recommendSignalAction(score, isAttention) {
  if (score >= 85) return "案件化候補として、責任者・期限・金額・対応方針を設定してください。";
  if (isAttention) return "要注意シグナルとして、本部長または管理職がウォッチしてください。";
  if (score >= 40) return "ウォッチ継続。類似シグナルが増えるか確認してください。";
  return "通常シグナルとして軽く記録します。";
}

function inferAxisPatch(item, text) {
  const level = item.status === "critical" || /危険|赤字|大幅|遅延|未提出/.test(text) ? "critical" : "attention";
  if (item.caseType === "project") {
    return {
      profitabilityStatus: /採算|赤字|利益|追加見積|工数超過/.test(text) ? level : undefined,
      scheduleStatus: /納期|遅延|スケジュール|期限/.test(text) ? level : undefined,
      qualityStatus: /品質|不具合|障害|テスト|手戻り/.test(text) ? level : undefined,
      staffingStatus: /要員|人手不足|兼務|負荷集中|PM/.test(text) ? level : undefined,
      customerStatus: /顧客|クレーム|承認遅れ|反応/.test(text) ? level : undefined,
    };
  }
  return {
    deadlineStatus: /期限|締切|提出|未提出|親会社/.test(text) ? level : undefined,
    processStatus: /工程|遅延|スケジュール/.test(text) ? level : undefined,
    approvalStatus: /承認|滞留|決裁/.test(text) ? level : undefined,
    responseStatus: /回答|未回答|回収|未提出/.test(text) ? level : undefined,
    qualityStatus: /品質|不備|差戻|手戻り/.test(text) ? level : undefined,
  };
}

function describeAxisPatch(item, axisPatch) {
  const entries = Object.entries(axisPatch).filter(([, value]) => value);
  if (!entries.length) return "状態軸への明確な変更は検出されませんでした。";
  return entries
    .map(([key, value]) => `${axisLabel(item.caseType, key)}: ${labels.statusLevel[value]}`)
    .join("、");
}

function nextCheckPoint(item, category) {
  if (item.caseType === "project") {
    if (category === "profitability" || category === "estimate") return "追加見積、工数見通し、契約前提の変更有無";
    if (category === "staffing" || category === "organization") return "PM兼務、主要工程の担当余力、支援要員の要否";
    if (category === "quality") return "同種不具合の再発状況とリリース影響";
    if (category === "customer") return "顧客合意、承認遅れ、上位者同席の必要性";
    return "進捗、採算、品質、要員、顧客のうち悪化している軸";
  }
  if (category === "deadline") return "親会社提出期限、未提出部門、期限超過タスク";
  if (category === "approval") return "承認者、承認待ち件数、決裁期限";
  return "期限、工程、承認、回答、品質のうち悪化している軸";
}

function recommendReportTo(status, trend, supportNeeded) {
  if (status === "critical" || supportNeeded === "executive_decision" || supportNeeded === "budget") return "executive_meeting";
  if (status === "attention" || trend === "worsening" || supportNeeded !== "none") return "division_management_meeting";
  return "none";
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
        <div class="brand-mark">S2C</div>
        <h1>経営論点・予兆管理システム</h1>
        <p>Signal-to-Case Management</p>
      </div>
      ${renderNavSection("共通", [
        ["overview", "トップ / 説明", ""],
        ["comparison", "初期版と最終形の比較", ""],
      ])}
      ${renderNavSection("経営・俯瞰", [
        ["executive-dashboard", "経営ダッシュボード", ""],
        ["portfolio", "案件ポートフォリオ", String(state.cases.length)],
        ["ai-qa", "AI質問デモ", ""],
      ])}
      ${renderNavSection("案件", [
        ["project-cases", "プロジェクト型案件", String(projectCases().length)],
        ["routine-cases", "定型業務型案件", String(routineCases().length)],
        ["case-detail", "案件詳細", ""],
        ["weekly-update", "週次一言更新", ""],
        ["case-demo", "案件化デモ", ""],
      ])}
      ${renderNavSection("シグナル", [
        ["signals", "シグナル一覧", String(state.signals.length)],
        ["signal-form", "シグナル登録", ""],
        ["attention-signals", "要注意シグナル一覧", String(attentionSignals().length)],
      ])}
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
  if (state.view === "portfolio") return renderPortfolio();
  if (state.view === "project-cases") return renderProjectCases();
  if (state.view === "routine-cases") return renderRoutineCases();
  if (state.view === "case-detail") return renderCaseDetail();
  if (state.view === "signals") return renderSignals();
  if (state.view === "signal-form") return renderSignalForm();
  if (state.view === "attention-signals") return renderAttentionSignals();
  if (state.view === "weekly-update") return renderWeeklyUpdate();
  if (state.view === "case-demo") return renderCaseDemo();
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
        ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ""}
      </div>
      <div class="top-actions">
        ${actions}
        <button class="btn" data-reset>データ初期化</button>
      </div>
    </div>
  `;
}

function renderOverview() {
  return `
    ${renderPageHeader(
      "CONCEPT",
      "入口は軽く、重要なものだけ要注意化し、案件化したらしっかり管理する",
      "会議別Excel・PowerPoint管理から、案件・シグナル中心の管理へ移行する説明用プロトタイプです。",
      `<button class="btn primary" data-view="executive-dashboard">経営ダッシュボード</button><button class="btn" data-view="portfolio">案件ポートフォリオ</button>`,
    )}
    <div class="message-band">
      <strong>この仕組みは、現場に重い報告を強いるものではありません。</strong><br>
      まずは小さな違和感をシグナルとして軽く登録します。
      その中で幹部・本部長が注意すべきものを要注意シグナルとして可視化します。
      必要なものだけを案件化し、責任者・期限・金額・対応方針を持たせて厳格に管理します。
      これにより、全社の論点・予兆を早期に把握し、手遅れになる前に支援・判断・対策ができます。
    </div>
    <section class="section">
      <div class="flow">
        ${renderFlowStep("1", "シグナル", "軽い", "現場の違和感、懸念、兆しを短く登録します。", 1)}
        ${renderFlowStep("2", "要注意シグナル", "中程度", "上位層がウォッチすべき重要な兆候だけを可視化します。", 2)}
        ${renderFlowStep("3", "案件", "厳格", "責任者、期限、金額、対応方針、報告先を持つ正式管理にします。", 3)}
      </div>
    </section>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>案件タイプの違い</h3>
        <div class="axis-grid section">
          <div class="axis-card">
            <h4>プロジェクト型案件</h4>
            <p>複数年・高額のシステム開発やITインフラ整備を、進捗・採算・品質・要員・顧客で見ます。</p>
          </div>
          <div class="axis-card">
            <h4>定型業務型案件</h4>
            <p>予算策定、決算、監査、親会社提出資料などを、期限・工程・承認・回答・品質で見ます。</p>
          </div>
        </div>
      </div>
      <div class="panel">
        <h3>早期支援の前提</h3>
        <ul class="safety-list">
          <li>目的は監視ではなく、手遅れになる前の早期支援です。</li>
          <li>個人を責めるためではなく、組織課題を早く見つけるために使います。</li>
          <li>評価・査定には使いません。</li>
          <li>本番化時は、個人情報・健康情報の閲覧権限を厳格に分けます。</li>
          <li>初期版ではチーム・課単位の傾向把握を重視します。</li>
        </ul>
      </div>
    </section>
  `;
}

function renderFlowStep(number, title, weight, description, level) {
  return `
    <div class="flow-step">
      <div class="flow-kicker">STEP ${number}</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="weight-scale">${[1, 2, 3].map((item) => `<span class="weight-dot ${item <= level ? "active" : ""}"></span>`).join("")}</div>
      <p><strong>${escapeHtml(weight)}</strong></p>
    </div>
  `;
}

function renderExecutiveDashboard() {
  const criticalCases = state.cases.filter((item) => item.status === "critical");
  const attentionCases = state.cases.filter((item) => item.status === "attention");
  const execCandidates = reportCandidates().filter((item) => item.nextReportTo === "executive_meeting");
  const profitabilityCritical = projectCases().filter((item) => projectDetail(item.id)?.profitabilityStatus === "critical");
  const deadlineCritical = routineCases().filter((item) => routineDetail(item.id)?.deadlineStatus === "critical");
  const orgSignals = attentionSignals().filter((signal) => signal.category === "organization");
  const worsening = state.cases.filter((item) => item.trend === "worsening");
  const largeCritical = projectCases().filter((item) => item.status === "critical" && (projectDetail(item.id)?.contractAmount || 0) >= 1000000000);

  return `
    ${renderPageHeader(
      "EXECUTIVE DASHBOARD",
      "経営ダッシュボード",
      "経営層・本部長が、全社の案件状態、要注意シグナル、報告候補を俯瞰する画面です。",
      `<button class="btn primary" data-view="attention-signals">要注意シグナルを見る</button>`,
    )}
    <div class="grid cols-5">
      ${metricCard("総案件数", state.cases.length, "40〜50件を俯瞰", "good")}
      ${metricCard("危険案件数", criticalCases.length, "総合状態が危険", "danger")}
      ${metricCard("注意案件数", attentionCases.length, "総合状態が注意", "warning")}
      ${metricCard("要注意シグナル数", attentionSignals().length, "上位層がウォッチ", "warning")}
      ${metricCard("幹部会報告候補数", execCandidates.length, "上位判断候補", "danger")}
      ${metricCard("採算危険案件数", profitabilityCritical.length, "プロジェクト型", "danger")}
      ${metricCard("期限危険案件数", deadlineCritical.length, "定型業務型", "danger")}
      ${metricCard("組織コンディション要注意件数", orgSignals.length, "課単位の傾向", "warning")}
      ${metricCard("前月比で悪化した案件数", worsening.length, "推移が悪化", "warning")}
      ${metricCard("二桁億円規模の危険案件数", largeCritical.length, "10億円以上", "danger")}
    </div>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>予兆スコア上位の要注意シグナル</h3>
        ${renderTable(
          ["シグナル", "関連案件", "カテゴリ", "スコア"],
          attentionSignals()
            .sort((a, b) => b.riskScore - a.riskScore)
            .slice(0, 6)
            .map((signal) => [
              escapeHtml(signal.title),
              renderRelatedCaseButton(signal.relatedCaseId),
              badge(labels.signalCategory[signal.category], "info"),
              renderScore(signal.riskScore),
            ]),
        )}
      </div>
      <div class="panel">
        <h3>悪化傾向の案件</h3>
        ${renderTable(
          ["案件", "タイプ", "状態", "報告先"],
          worsening.slice(0, 8).map((item) => [
            renderCaseButton(item),
            badge(labels.caseType[item.caseType], "neutral"),
            renderOverallStatus(item.status),
            escapeHtml(labels.nextReportTo[item.nextReportTo]),
          ]),
        )}
      </div>
    </section>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>幹部会に上げるべき候補</h3>
        ${renderTable(
          ["候補", "理由", "推移", "支援"],
          execCandidates.slice(0, 8).map((item) => [
            renderCaseButton(item),
            escapeHtml(reportReason(item)),
            renderTrend(item.trend),
            escapeHtml(labels.supportNeeded[item.supportNeeded]),
          ]),
        )}
      </div>
      <div class="panel">
        <h3>部門別の注意・危険案件数</h3>
        ${renderBarList(countDepartmentRisk())}
      </div>
    </section>
  `;
}

function renderPortfolio() {
  const rows = filteredCases();
  return `
    ${renderPageHeader(
      "CASE PORTFOLIO",
      "案件ポートフォリオ",
      "常時40〜50件ある案件群を、タイプ・状態・推移・報告候補・リスク軸で俯瞰します。",
      `<button class="btn primary" data-view="weekly-update">週次一言更新</button>`,
    )}
    ${renderPortfolioFilters()}
    ${renderTable(
      ["案件名", "タイプ", "所管部門", "責任者", "金額または期限", "総合状態", "推移", "状態軸", "要注意", "最終更新", "次回報告先"],
      rows.map((item) => [
        renderCaseButton(item),
        badge(labels.caseType[item.caseType], item.caseType === "project" ? "info" : "neutral"),
        escapeHtml(item.department),
        escapeHtml(item.owner),
        escapeHtml(amountOrDeadline(item)),
        renderOverallStatus(item.status),
        renderTrend(item.trend),
        renderAxisBadges(item),
        String(item.attentionSignalCount),
        escapeHtml(item.lastUpdatedAt),
        escapeHtml(labels.nextReportTo[item.nextReportTo]),
      ]),
      "portfolio-table",
    )}
  `;
}

function renderPortfolioFilters() {
  const deptOptions = ["all", ...unique(state.cases.map((item) => item.department))];
  return `
    <div class="filter-bar">
      ${filterSelect("caseType", "案件タイプ", [["all", "すべて"], ["project", "プロジェクト型"], ["routine", "定型業務型"]])}
      ${filterSelect("department", "部門", deptOptions.map((value) => [value, value === "all" ? "すべて" : value]))}
      ${filterSelect("status", "総合状態", [["all", "すべて"], ["normal", "正常"], ["attention", "注意"], ["critical", "危険"], ["completed", "完了"]])}
      ${filterSelect("trend", "推移", [["all", "すべて"], ["improving", "改善"], ["stable", "横ばい"], ["worsening", "悪化"]])}
      ${filterSelect("attentionOnly", "要注意シグナル", [["all", "すべて"], ["yes", "あり"]])}
      ${filterSelect("reportTo", "報告候補", [["all", "すべて"], ["executive_meeting", "幹部会"], ["division_management_meeting", "本部基幹職会議"]])}
      ${filterSelect("profitabilityCritical", "採算危険", [["all", "すべて"], ["yes", "あり"]])}
      ${filterSelect("deadlineCritical", "期限危険", [["all", "すべて"], ["yes", "あり"]])}
      ${filterSelect("amountScale", "金額規模", [["all", "すべて"], ["large", "10億円以上"], ["mid", "1億円以上"]])}
      <button class="btn" data-reset-filters>フィルタ解除</button>
    </div>
  `;
}

function filterSelect(key, label, options) {
  return `
    <label class="filter-field">
      <span>${escapeHtml(label)}</span>
      <select data-filter="${escapeAttr(key)}">
        ${options.map(([value, text]) => `<option value="${escapeAttr(value)}" ${state.filters[key] === value ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderProjectCases() {
  return `
    ${renderPageHeader(
      "PROJECT CASES",
      "プロジェクト型案件一覧",
      "複数年・高額のプロジェクトを、進捗・採算・品質・要員・顧客の5軸で確認します。",
    )}
    ${renderTable(
      ["案件名", "顧客名", "金額規模", "期間", "現在フェーズ", "進捗", "採算", "品質", "要員", "顧客", "要注意", "推移", "次回報告先"],
      projectCases().map((item) => {
        const detail = projectDetail(item.id);
        return [
          renderCaseButton(item),
          escapeHtml(detail.customerName),
          escapeHtml(formatCurrency(detail.contractAmount)),
          escapeHtml(`${detail.startDate}〜${detail.plannedEndDate}`),
          escapeHtml(detail.currentPhase),
          renderStatusLevel(detail.scheduleStatus),
          renderStatusLevel(detail.profitabilityStatus),
          renderStatusLevel(detail.qualityStatus),
          renderStatusLevel(detail.staffingStatus),
          renderStatusLevel(detail.customerStatus),
          String(item.attentionSignalCount),
          renderTrend(item.trend),
          escapeHtml(labels.nextReportTo[item.nextReportTo]),
        ];
      }),
    )}
  `;
}

function renderRoutineCases() {
  return `
    ${renderPageHeader(
      "ROUTINE CASES",
      "定型業務型案件一覧",
      "予算策定、決算、監査、親会社提出資料などを、期限・工程・承認・回答・品質の5軸で確認します。",
    )}
    ${renderTable(
      ["案件名", "期限", "提出先", "現在工程", "完了率", "期限", "工程", "承認", "回答", "品質", "未提出部門", "承認待ち", "期限超過", "次回報告先"],
      routineCases().map((item) => {
        const detail = routineDetail(item.id);
        return [
          renderCaseButton(item),
          escapeHtml(detail.deadline),
          escapeHtml(detail.submitTo),
          escapeHtml(detail.currentStep),
          `${detail.progressRate}%`,
          renderStatusLevel(detail.deadlineStatus),
          renderStatusLevel(detail.processStatus),
          renderStatusLevel(detail.approvalStatus),
          renderStatusLevel(detail.responseStatus),
          renderStatusLevel(detail.qualityStatus),
          String(detail.notSubmittedDepartmentCount),
          String(detail.pendingApprovalCount),
          String(detail.overdueTaskCount),
          escapeHtml(labels.nextReportTo[item.nextReportTo]),
        ];
      }),
    )}
  `;
}

function renderCaseDetail() {
  const item = findCase(state.selectedCaseId) || state.cases[0];
  if (!item) return `<div class="empty">案件がありません。</div>`;
  const relatedSignals = state.signals.filter((signal) => signal.relatedCaseId === item.id);
  const relatedAttention = relatedSignals.filter((signal) => signal.isAttentionSignal);
  const histories = state.histories.filter((history) => history.caseId === item.id).sort((a, b) => b.reportedDate.localeCompare(a.reportedDate));

  return `
    ${renderPageHeader(
      "CASE DETAIL",
      "案件詳細",
      "案件タイプに応じて、プロジェクト型は5つのプロジェクト軸、定型業務型は5つの業務軸で詳細を確認します。",
      `<button class="btn" data-view="portfolio">ポートフォリオへ</button><button class="btn primary" data-view="weekly-update">週次更新</button>`,
    )}
    <section class="section split">
      <div class="panel">
        <div class="section-header">
          <div>
            <h3>${escapeHtml(item.caseName)}</h3>
            <p class="section-note">${escapeHtml(item.latestComment)}</p>
          </div>
          <div class="stack">${renderOverallStatus(item.status)}${renderTrend(item.trend)}</div>
        </div>
        ${item.caseType === "project" ? renderProjectDetailDefinition(item) : renderRoutineDetailDefinition(item)}
      </div>
      <div class="panel">
        <h3>AI要約</h3>
        <p class="section-note">${escapeHtml(aiCaseSummary(item, relatedSignals))}</p>
        <div class="axis-grid section">
          <div class="axis-card">
            <h4>必要な支援</h4>
            <p>${escapeHtml(labels.supportNeeded[item.supportNeeded])}</p>
          </div>
          <div class="axis-card">
            <h4>次回報告先</h4>
            <p>${escapeHtml(labels.nextReportTo[item.nextReportTo])}</p>
          </div>
          <div class="axis-card">
            <h4>要注意シグナル</h4>
            <p>${relatedAttention.length} 件</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>関連要注意シグナル</h3>
        ${renderTable(
          ["シグナル", "カテゴリ", "スコア", "理由"],
          relatedAttention.map((signal) => [
            escapeHtml(signal.title),
            badge(labels.signalCategory[signal.category], "info"),
            renderScore(signal.riskScore),
            escapeHtml(signal.attentionReason || ""),
          ]),
        )}
      </div>
      <div class="panel">
        <h3>関連シグナル</h3>
        ${renderTable(
          ["ID", "タイトル", "状態", "作成日"],
          relatedSignals.map((signal) => [
            escapeHtml(signal.signalCode),
            escapeHtml(signal.title),
            badge(labels.signalStatus[signal.status], signal.status === "attention" ? "high" : "neutral"),
            escapeHtml(signal.createdAt),
          ]),
        )}
      </div>
    </section>
    <section class="section grid cols-2">
      <div class="panel">
        <h3>週次コメント履歴</h3>
        <div class="timeline section">
          ${histories
            .slice(0, 8)
            .map((history) => `
              <div class="timeline-item">
                <strong>${escapeHtml(history.reportedDate)} / ${escapeHtml(labels.overallStatus[history.overallStatus])} / ${escapeHtml(labels.trend[history.trend])}</strong>
                <span>${escapeHtml(history.comment)} / 支援: ${escapeHtml(labels.supportNeeded[history.supportNeeded])}</span>
              </div>
            `)
            .join("")}
        </div>
      </div>
      <div class="panel">
        <h3>状態推移</h3>
        ${renderBarList(historyTrendBars(histories))}
      </div>
    </section>
  `;
}

function renderProjectDetailDefinition(item) {
  const detail = projectDetail(item.id);
  return `
    <dl class="definition-list">
      <dt>案件タイプ</dt><dd>${badge(labels.caseType[item.caseType], "info")}</dd>
      <dt>顧客名</dt><dd>${escapeHtml(detail.customerName)}</dd>
      <dt>契約金額</dt><dd>${escapeHtml(formatCurrency(detail.contractAmount))}</dd>
      <dt>期間</dt><dd>${escapeHtml(`${detail.startDate}〜${detail.plannedEndDate}`)}</dd>
      <dt>現在フェーズ</dt><dd>${escapeHtml(detail.currentPhase)}</dd>
      <dt>責任者</dt><dd>${escapeHtml(item.owner)}</dd>
      <dt>PM</dt><dd>${escapeHtml(item.manager)}</dd>
      <dt>状態軸</dt><dd>${renderAxisBadges(item)}</dd>
      <dt>変更要望</dt><dd>${detail.changeRequestCount} 件</dd>
      <dt>未解決課題</dt><dd>${detail.openIssueCount} 件</dd>
      <dt>マイルストーン</dt><dd>${escapeHtml(detail.milestoneStatus)}</dd>
    </dl>
  `;
}

function renderRoutineDetailDefinition(item) {
  const detail = routineDetail(item.id);
  return `
    <dl class="definition-list">
      <dt>案件タイプ</dt><dd>${badge(labels.caseType[item.caseType], "neutral")}</dd>
      <dt>期限</dt><dd>${escapeHtml(detail.deadline)}</dd>
      <dt>提出先</dt><dd>${escapeHtml(detail.submitTo)}</dd>
      <dt>工程テンプレート</dt><dd>${escapeHtml(detail.processTemplate)}</dd>
      <dt>現在工程</dt><dd>${escapeHtml(detail.currentStep)}</dd>
      <dt>完了率</dt><dd>${detail.progressRate}%</dd>
      <dt>責任者</dt><dd>${escapeHtml(item.owner)}</dd>
      <dt>状態軸</dt><dd>${renderAxisBadges(item)}</dd>
      <dt>未提出部門数</dt><dd>${detail.notSubmittedDepartmentCount} 件</dd>
      <dt>承認待ち件数</dt><dd>${detail.pendingApprovalCount} 件</dd>
      <dt>期限超過タスク</dt><dd>${detail.overdueTaskCount} 件</dd>
    </dl>
  `;
}

function renderSignals() {
  const signals = filteredSignals();
  return `
    ${renderPageHeader(
      "SIGNALS",
      "シグナル一覧",
      "現場からの軽い入力や既存データから拾った違和感を、要注意判定と関連案件付きで確認します。",
      `<button class="btn primary" data-view="signal-form">シグナル登録</button>`,
    )}
    ${renderSignalFilters()}
    ${renderTable(
      ["ID", "タイトル / 内容", "部門", "入力元", "カテゴリ", "深刻度", "頻度", "関連案件", "要注意", "スコア", "状態", "作成日"],
      signals.map((signal) => [
        escapeHtml(signal.signalCode),
        `<span class="cell-main">${escapeHtml(signal.title)}</span><div class="cell-sub">${escapeHtml(signal.description)}</div>`,
        escapeHtml(signal.department),
        badge(labels.signalSource[signal.source], "source"),
        badge(labels.signalCategory[signal.category], "info"),
        badge(labels.severity[signal.severity], signal.severity === "high" ? "high" : signal.severity === "medium" ? "medium" : "low"),
        escapeHtml(labels.frequency[signal.frequency]),
        renderRelatedCaseButton(signal.relatedCaseId),
        signal.isAttentionSignal ? badge("要注意", "high") : badge("通常", "neutral"),
        renderScore(signal.riskScore),
        badge(labels.signalStatus[signal.status], signal.status === "attention" ? "high" : "neutral"),
        escapeHtml(signal.createdAt),
      ]),
    )}
  `;
}

function renderSignalFilters() {
  const deptOptions = ["all", ...unique(state.signals.map((signal) => signal.department))];
  const categoryOptions = ["all", ...Object.keys(labels.signalCategory)];
  const sourceOptions = ["all", ...Object.keys(labels.signalSource)];
  return `
    <div class="filter-bar">
      ${signalFilterSelect("attentionOnly", "要注意", [["all", "すべて"], ["yes", "要注意のみ"]])}
      ${signalFilterSelect("department", "部門", deptOptions.map((value) => [value, value === "all" ? "すべて" : value]))}
      ${signalFilterSelect("category", "カテゴリ", categoryOptions.map((value) => [value, value === "all" ? "すべて" : labels.signalCategory[value]]))}
      ${signalFilterSelect("source", "入力元", sourceOptions.map((value) => [value, value === "all" ? "すべて" : labels.signalSource[value]]))}
      ${signalFilterSelect("relatedOnly", "関連案件", [["all", "すべて"], ["yes", "あり"]])}
      ${signalFilterSelect("highScore", "高スコア", [["all", "すべて"], ["yes", "70以上"]])}
      ${signalFilterSelect("openOnly", "未対応", [["all", "すべて"], ["yes", "未対応"]])}
      <button class="btn" data-reset-signal-filters>フィルタ解除</button>
    </div>
  `;
}

function signalFilterSelect(key, label, options) {
  return `
    <label class="filter-field">
      <span>${escapeHtml(label)}</span>
      <select data-signal-filter="${escapeAttr(key)}">
        ${options.map(([value, text]) => `<option value="${escapeAttr(value)}" ${state.signalFilters[key] === value ? "selected" : ""}>${escapeHtml(text)}</option>`).join("")}
      </select>
    </label>
  `;
}

function renderSignalForm() {
  return `
    ${renderPageHeader(
      "SIGNAL INPUT",
      "シグナル登録画面",
      "現場が小さな違和感を軽く入力し、疑似AIがカテゴリ、リスクスコア、要注意候補、関連案件候補を補完します。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>軽いシグナル入力</h3>
        <form id="signal-form" class="section">
          <div class="form-grid">
            <div class="field">
              <label for="title">タイトル</label>
              <input id="title" name="title" required placeholder="例：A社案件で追加見積の合意が取れていない" />
            </div>
            <div class="field">
              <label for="department">部門</label>
              <select id="department" name="department" required>${renderOptions(departments, "第1開発部")}</select>
            </div>
            <div class="field full">
              <label for="description">気になること</label>
              <textarea id="description" name="description" required placeholder="正式な課題でなくて構いません。小さな違和感、増えていること、気になる反応などを書いてください。"></textarea>
            </div>
            <div class="field">
              <label for="relatedCaseId">関連案件</label>
              <select id="relatedCaseId" name="relatedCaseId">
                <option value="">なし / AIに任せる</option>
                ${state.cases.map((item) => `<option value="${escapeAttr(item.id)}">${escapeHtml(item.caseName)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="relatedText">関連案件または顧客</label>
              <input id="relatedText" name="relatedText" placeholder="例：A社 / 予算策定" />
            </div>
            <div class="field">
              <label for="category">カテゴリ</label>
              <select id="category" name="category">
                <option value="">AIに任せる</option>
                ${Object.entries(labels.signalCategory).map(([value, text]) => `<option value="${escapeAttr(value)}">${escapeHtml(text)}</option>`).join("")}
              </select>
            </div>
            <div class="field">
              <label for="severity">深刻度</label>
              <select id="severity" name="severity" required>${renderEnumOptions(labels.severity, "medium")}</select>
            </div>
            <div class="field">
              <label for="frequency">発生頻度</label>
              <select id="frequency" name="frequency" required>${renderEnumOptions(labels.frequency, "sometimes")}</select>
            </div>
            <div class="field full">
              <label for="comment">コメント</label>
              <input id="comment" name="comment" placeholder="補足、見てほしい観点など" />
            </div>
          </div>
          <div class="actions">
            <button class="btn primary" type="submit">登録して疑似AI処理</button>
            <button class="btn" type="button" data-view="signals">一覧を見る</button>
          </div>
        </form>
      </div>
      <div>${state.aiResult ? renderSignalAiResult(state.aiResult) : renderSignalAiPlaceholder()}</div>
    </section>
  `;
}

function renderSignalAiPlaceholder() {
  return `
    <div class="ai-result">
      <h3>登録後の疑似AI結果</h3>
      <dl class="definition-list">
        <dt>AI要約</dt><dd>入力文を短く整形します。</dd>
        <dt>推定カテゴリ</dt><dd>キーワードから採算、納期、要員、承認などを推定します。</dd>
        <dt>リスクスコア</dt><dd>深刻度、頻度、カテゴリ、リスク語、関連案件有無から算出します。</dd>
        <dt>要注意候補</dt><dd>スコア70以上または重要条件に該当するものを候補にします。</dd>
        <dt>関連案件候補</dt><dd>案件名、顧客名、カテゴリから候補を提示します。</dd>
      </dl>
    </div>
  `;
}

function renderSignalAiResult(result) {
  return `
    <div class="ai-result">
      <h3>疑似AI処理結果</h3>
      <dl class="definition-list">
        <dt>シグナルID</dt><dd>${escapeHtml(result.signalId)}</dd>
        <dt>AI要約</dt><dd>${escapeHtml(result.summary)}</dd>
        <dt>推定カテゴリ</dt><dd>${badge(labels.signalCategory[result.category], "info")}</dd>
        <dt>リスクスコア</dt><dd>${renderScore(result.riskScore)}</dd>
        <dt>判定</dt><dd>${badge(result.decision, result.riskScore >= 85 ? "critical" : result.riskScore >= 70 ? "high" : result.riskScore >= 40 ? "medium" : "low")}</dd>
        <dt>要注意候補</dt><dd>${result.isAttentionCandidate ? badge("候補", "high") : badge("通常", "neutral")}</dd>
        <dt>要注意理由</dt><dd>${escapeHtml(result.attentionReason)}</dd>
        <dt>関連案件候補</dt>
        <dd>${result.relatedCaseCandidates.length ? result.relatedCaseCandidates.map((item) => `<span class="pill">${escapeHtml(item.caseName)}</span>`).join(" ") : "候補なし"}</dd>
        <dt>推奨対応</dt><dd>${escapeHtml(result.recommendedAction)}</dd>
      </dl>
      <div class="actions">
        <button class="btn" data-view="attention-signals">要注意シグナル一覧へ</button>
        <button class="btn" data-view="signals">シグナル一覧へ</button>
      </div>
    </div>
  `;
}

function renderAttentionSignals() {
  const signals = attentionSignals();
  return `
    ${renderPageHeader(
      "ATTENTION SIGNALS",
      "要注意シグナル一覧",
      "幹部・本部長・管理職がウォッチすべき重要な兆候だけを確認し、報告・案件化・クローズを判断します。",
      `<button class="btn primary" data-view="case-demo">案件化デモ</button>`,
    )}
    ${renderTable(
      ["要注意シグナル名", "関連案件", "部門", "カテゴリ", "スコア", "要注意理由", "推奨報告先", "状態", "作成日", "アクション"],
      signals.map((signal) => [
        escapeHtml(signal.title),
        renderRelatedCaseButton(signal.relatedCaseId),
        escapeHtml(signal.department),
        badge(labels.signalCategory[signal.category], "info"),
        renderScore(signal.riskScore),
        escapeHtml(signal.attentionReason || ""),
        escapeHtml(recommendedSignalReport(signal)),
        badge(labels.signalStatus[signal.status], signal.status === "attention" ? "high" : "medium"),
        escapeHtml(signal.createdAt),
        `<div class="stack">
          <button class="btn" data-attention-action="watch" data-signal-id="${signal.id}">ウォッチ継続</button>
          <button class="btn warning" data-attention-action="report-division" data-signal-id="${signal.id}">本部会議へ報告</button>
          <button class="btn warning" data-attention-action="report-exec" data-signal-id="${signal.id}">幹部会へ報告</button>
          <button class="btn primary" data-attention-action="convert" data-signal-id="${signal.id}">案件化する</button>
          <button class="btn danger" data-attention-action="close" data-signal-id="${signal.id}">クローズ</button>
        </div>`,
      ]),
    )}
  `;
}

function renderWeeklyUpdate() {
  const item = findCase(state.selectedWeeklyCaseId) || findCase(state.selectedCaseId) || state.cases[0];
  return `
    ${renderPageHeader(
      "WEEKLY ONE-LINE UPDATE",
      "週次一言更新画面",
      "毎回すべてを入力させず、前回値をコピーし、変化がある項目だけを一言で更新するイメージです。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>前回値コピー</h3>
        <div class="update-copy section">
          <div><span>対象案件</span><strong>${escapeHtml(item.caseName)}</strong></div>
          <div><span>総合状態</span><strong>${escapeHtml(labels.overallStatus[item.status])}</strong></div>
          <div><span>推移</span><strong>${escapeHtml(labels.trend[item.trend])}</strong></div>
          <div><span>必要な支援</span><strong>${escapeHtml(labels.supportNeeded[item.supportNeeded])}</strong></div>
          <div><span>前回コメント</span><strong>${escapeHtml(item.latestComment)}</strong></div>
        </div>
        <form id="weekly-update-form" class="section">
          <div class="form-grid">
            <div class="field full">
              <label for="caseId">対象案件</label>
              <select id="caseId" name="caseId" data-weekly-case>${state.cases.map((caseItem) => `<option value="${escapeAttr(caseItem.id)}" ${caseItem.id === item.id ? "selected" : ""}>${escapeHtml(caseItem.caseName)}</option>`).join("")}</select>
            </div>
            <div class="field">
              <label for="overallStatus">総合状態</label>
              <select id="overallStatus" name="overallStatus">${renderEnumOptions(labels.overallStatus, item.status)}</select>
            </div>
            <div class="field">
              <label for="trend">前回からの変化</label>
              <select id="trend" name="trend">${renderEnumOptions(labels.trend, item.trend)}</select>
            </div>
            <div class="field full">
              <label for="comment">一言コメント</label>
              <textarea id="comment" name="comment" required placeholder="例：追加見積の合意が遅れており、採算悪化のおそれがあります。">${escapeHtml(item.latestComment)}</textarea>
            </div>
            <div class="field">
              <label for="supportNeeded">必要な支援</label>
              <select id="supportNeeded" name="supportNeeded">${renderEnumOptions(labels.supportNeeded, item.supportNeeded)}</select>
            </div>
          </div>
          <div class="actions">
            <button class="btn primary" type="submit">週次更新して疑似AI処理</button>
          </div>
        </form>
      </div>
      <div>${state.weeklyAiResult ? renderWeeklyAiResult(state.weeklyAiResult) : renderWeeklyAiPlaceholder()}</div>
    </section>
  `;
}

function renderWeeklyAiPlaceholder() {
  return `
    <div class="ai-result">
      <h3>週次更新後の疑似AI結果</h3>
      <dl class="definition-list">
        <dt>AI要約</dt><dd>一言コメントを短く整形します。</dd>
        <dt>状態軸の変化</dt><dd>採算、納期、要員、期限、承認などへの影響を推定します。</dd>
        <dt>要注意候補</dt><dd>悪化や危険状態から要注意シグナル候補を提示します。</dd>
        <dt>推奨報告先</dt><dd>状態、推移、必要な支援から報告先を推定します。</dd>
      </dl>
    </div>
  `;
}

function renderWeeklyAiResult(result) {
  return `
    <div class="ai-result">
      <h3>疑似AI処理結果</h3>
      <dl class="definition-list">
        <dt>AI要約</dt><dd>${escapeHtml(result.summary)}</dd>
        <dt>推定カテゴリ</dt><dd>${badge(labels.signalCategory[result.category], "info")}</dd>
        <dt>状態軸の変化</dt><dd>${escapeHtml(result.axisMessage)}</dd>
        <dt>要注意候補</dt><dd>${result.attentionCandidate ? badge(result.attentionTitle, "high") : badge("なし", "neutral")}</dd>
        <dt>推奨報告先</dt><dd>${escapeHtml(labels.nextReportTo[result.reportTo])}</dd>
        <dt>次に確認すべきこと</dt><dd>${escapeHtml(result.nextCheck)}</dd>
      </dl>
      <div class="actions">
        <button class="btn" data-view="case-detail" data-case-id="${result.caseId}">案件詳細を見る</button>
      </div>
    </div>
  `;
}

function renderCaseDemo() {
  const signals = attentionSignals().filter((signal) => signal.status !== "converted_to_case");
  const selected = findSignal(state.selectedSignalId) || signals[0] || attentionSignals()[0];
  return `
    ${renderPageHeader(
      "CONVERT TO CASE",
      "案件化デモ画面",
      "要注意シグナルを選択し、必要なものだけ正式案件として責任者・期限・金額・報告先を持たせます。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>要注意シグナルを選択</h3>
        <div class="grid cols-2 section">
          ${signals
            .map((signal) => `
              <div class="attention-card ${selected?.id === signal.id ? "active" : ""}">
                <h4>${escapeHtml(signal.title)}</h4>
                <p>${escapeHtml(signal.attentionReason || signal.description)}</p>
                <div class="stack">${renderScore(signal.riskScore)}${badge(labels.signalCategory[signal.category], "info")}</div>
                <button class="btn" data-select-signal="${signal.id}">この要注意シグナルを選択</button>
              </div>
            `)
            .join("")}
        </div>
      </div>
      <div class="panel">
        <h3>正式案件として追加する項目</h3>
        ${selected ? renderCaseConvertForm(selected) : `<div class="empty">案件化できる要注意シグナルがありません。</div>`}
      </div>
    </section>
  `;
}

function renderCaseConvertForm(signal) {
  return `
    <form id="case-convert-form" class="section">
      <input type="hidden" name="signalId" value="${escapeAttr(signal.id)}" />
      <div class="form-grid">
        <div class="field full">
          <label for="caseName">案件名</label>
          <input id="caseName" name="caseName" required value="${escapeAttr(`${signal.title} 対応案件`)}" />
        </div>
        <div class="field">
          <label for="caseType">案件タイプ</label>
          <select id="caseType" name="caseType" required>${renderEnumOptions(labels.caseType, signal.category === "deadline" || signal.category === "approval" ? "routine" : "project")}</select>
        </div>
        <div class="field">
          <label for="customerName">顧客名または提出先</label>
          <input id="customerName" name="customerName" placeholder="例：A社 / 親会社" />
        </div>
        <div class="field">
          <label for="owner">責任者</label>
          <input id="owner" name="owner" required placeholder="例：本部長" />
        </div>
        <div class="field">
          <label for="manager">主担当</label>
          <input id="manager" name="manager" required placeholder="例：山田" />
        </div>
        <div class="field">
          <label for="dueDate">期限または終了予定日</label>
          <input id="dueDate" name="dueDate" required type="date" value="2026-09-30" />
        </div>
        <div class="field">
          <label for="impact">影響額または金額規模</label>
          <input id="impact" name="impact" required placeholder="例：1500万円 / 1.2億円" />
        </div>
        <div class="field">
          <label for="submitTo">提出先</label>
          <input id="submitTo" name="submitTo" placeholder="定型業務型の場合: 親会社など" />
        </div>
        <div class="field">
          <label for="nextReportTo">次回報告先</label>
          <select id="nextReportTo" name="nextReportTo" required>${renderEnumOptions(labels.nextReportTo, signal.riskScore >= 85 ? "executive_meeting" : "division_management_meeting")}</select>
        </div>
        <div class="field">
          <label for="status">ステータス</label>
          <select id="status" name="status" required>${renderEnumOptions(labels.overallStatus, signal.riskScore >= 85 ? "critical" : "attention")}</select>
        </div>
        <div class="field full">
          <label for="policy">対応方針</label>
          <textarea id="policy" name="policy" required>${escapeHtml(signal.attentionReason || signal.description)}</textarea>
        </div>
      </div>
      <div class="actions">
        <button class="btn primary" type="submit">案件化する</button>
      </div>
    </form>
  `;
}

function renderAiQa() {
  const selected = state.selectedQuestion || sampleQuestions[0];
  return `
    ${renderPageHeader(
      "AI QUESTION DEMO",
      "AI質問画面",
      "自然文の質問を選ぶと、現在のダミーデータをもとにした疑似回答を表示します。",
    )}
    <section class="section split">
      <div class="panel">
        <h3>サンプル質問</h3>
        <div class="question-list section">
          ${sampleQuestions.map((question) => `<button class="question-button ${question === selected ? "active" : ""}" data-question="${escapeAttr(question)}">${escapeHtml(question)}</button>`).join("")}
        </div>
      </div>
      <div class="panel">
        <h3>ダミー回答</h3>
        <div class="section">${renderQaAnswer(selected)}</div>
      </div>
    </section>
  `;
}

function renderQaAnswer(question) {
  if (question.includes("危険状態のプロジェクト")) {
    const items = projectCases().filter((item) => item.status === "critical");
    return `<p>危険状態のプロジェクト型案件は ${items.length} 件です。採算・要員・顧客の複数軸が悪化している案件を優先確認します。</p>${renderCaseMiniTable(items)}`;
  }
  if (question.includes("二桁億円")) {
    const items = projectCases().filter((item) => (projectDetail(item.id)?.contractAmount || 0) >= 1000000000 && item.trend === "worsening");
    return `<p>二桁億円規模で悪化傾向の案件は ${items.length} 件です。幹部会への報告候補です。</p>${renderCaseMiniTable(items)}`;
  }
  if (question.includes("要員不足")) {
    const signals = attentionSignals().filter((signal) => signal.category === "staffing" || /要員|負荷|PM/.test(signal.description));
    return `<p>要員不足に関係する要注意シグナルは ${signals.length} 件です。関連案件のPM兼務と主要工程の担当余力を確認してください。</p>${renderSignalMiniTable(signals)}`;
  }
  if (question.includes("採算危険")) {
    const items = projectCases().filter((item) => projectDetail(item.id)?.profitabilityStatus === "critical");
    return `<p>採算危険になりそうな案件は ${items.length} 件です。追加見積、工数超過、契約前提変更が主な確認観点です。</p>${renderCaseMiniTable(items)}`;
  }
  if (question.includes("前月から悪化")) {
    const items = state.cases.filter((item) => item.trend === "worsening");
    return `<p>前月から悪化した案件は ${items.length} 件です。注意から危険へ進む前に支援要否を確認します。</p>${renderCaseMiniTable(items.slice(0, 10))}`;
  }
  if (question.includes("幹部会")) {
    const items = reportCandidates().filter((item) => item.nextReportTo === "executive_meeting");
    return `<p>幹部会に上げるべき案件候補は ${items.length} 件です。危険状態、二桁億円規模、経営判断・予算支援が必要な案件を優先します。</p>${renderCaseMiniTable(items)}`;
  }
  if (question.includes("期限が危ない")) {
    const items = routineCases().filter((item) => routineDetail(item.id)?.deadlineStatus === "critical" || item.status === "critical");
    return `<p>期限が危ない定型業務型案件は ${items.length} 件です。親会社提出、未提出部門、期限超過タスクを確認してください。</p>${renderCaseMiniTable(items)}`;
  }
  if (question.includes("予算策定")) {
    const item = state.cases.find((caseItem) => caseItem.caseName === "2027年度予算策定");
    const detail = routineDetail(item.id);
    return `<p>予算策定では「${escapeHtml(detail.currentStep)}」工程が遅れています。未提出部門数は ${detail.notSubmittedDepartmentCount}、期限超過タスクは ${detail.overdueTaskCount} です。</p>${renderCaseMiniTable([item])}`;
  }
  if (question.includes("承認待ち")) {
    const items = routineCases().filter((item) => routineDetail(item.id)?.pendingApprovalCount > 0 || routineDetail(item.id)?.approvalStatus !== "normal");
    return `<p>承認待ちで止まっている可能性がある案件は ${items.length} 件です。承認者と決裁期限を確認してください。</p>${renderCaseMiniTable(items.slice(0, 10))}`;
  }
  const counts = countBy(attentionSignals(), (signal) => signal.department);
  return `<p>要注意シグナルが増えている部門は、${counts.slice(0, 3).map((item) => `${item.label} ${item.value}件`).join("、")} です。</p>${renderBarList(counts)}`;
}

function renderCaseMiniTable(items) {
  return renderTable(
    ["案件", "タイプ", "状態", "推移", "報告先"],
    items.map((item) => [
      renderCaseButton(item),
      badge(labels.caseType[item.caseType], item.caseType === "project" ? "info" : "neutral"),
      renderOverallStatus(item.status),
      renderTrend(item.trend),
      escapeHtml(labels.nextReportTo[item.nextReportTo]),
    ]),
  );
}

function renderSignalMiniTable(signals) {
  return renderTable(
    ["シグナル", "関連案件", "カテゴリ", "スコア"],
    signals.map((signal) => [
      escapeHtml(signal.title),
      renderRelatedCaseButton(signal.relatedCaseId),
      badge(labels.signalCategory[signal.category], "info"),
      renderScore(signal.riskScore),
    ]),
  );
}

function renderComparison() {
  const rows = [
    ["データ入力", "手入力中心", "手入力＋既存システム連携"],
    ["AI機能", "疑似AI", "本物のAI分類・要約・類似検出"],
    ["シグナル", "手入力", "勤怠、座席、会議資料、工数、気分登録から自動検知"],
    ["要注意シグナル", "リスクスコアで疑似判定", "AIとルールで自動抽出"],
    ["案件管理", "ダミーデータ中心", "実案件・実ステータスと連携"],
    ["案件タイプ", "プロジェクト型・定型業務型を表現", "実業務テンプレートと連携"],
    ["状態推移", "ダミー履歴", "月次・週次スナップショット"],
    ["導入範囲", "1〜2部門", "全社"],
    ["目的", "仕組みの理解", "全社の予兆管理・経営可視化"],
  ];
  const futureItems = [
    "勤怠システムとの連携",
    "座席管理システムとの連携",
    "テレワーク・出社データとの連携",
    "工数管理との連携",
    "案件管理・原価管理との連携",
    "会議資料、Excel、PowerPointからのAI抽出",
    "Microsoft 365、Teams、SharePointとの連携",
    "気分登録機能の追加",
    "Azure OpenAIまたはOpenAI APIによる本物のAI分類",
    "AIによる要注意シグナル自動抽出",
    "AIによる幹部会向けサマリー生成",
    "Power BIとの連携",
    "権限管理",
    "個人情報・健康情報の取り扱いルール",
    "人事評価には使わない明確な方針",
    "本部長、人事、産業保健、経営層で閲覧範囲を分ける設計",
  ];
  return `
    ${renderPageHeader(
      "ROADMAP",
      "初期版と最終形の比較",
      "初期版はダミーデータと疑似AIで仕組みを理解し、本番化時に既存システム連携を広げる想定です。",
    )}
    ${renderTable(["項目", "初期版", "最終形"], rows.map((row) => row.map(escapeHtml)), "compare-table")}
    <section class="section grid cols-2">
      <div class="panel">
        <h3>本番化する場合の拡張ポイント</h3>
        <ul class="safety-list">${futureItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div class="panel">
        <h3>運用上の注意</h3>
        <ul class="safety-list">
          <li>このプロトタイプは従業員を監視するためのものではありません。</li>
          <li>目的は監視ではなく早期支援です。</li>
          <li>評価・査定には使いません。</li>
          <li>個人情報・健康情報は本番化時に閲覧権限を厳格にします。</li>
          <li>最初は個人単位ではなく、チーム・課単位の傾向把握を重視します。</li>
        </ul>
      </div>
    </section>
  `;
}

function metricCard(label, value, sub, tone = "") {
  return `
    <div class="metric-card ${tone}">
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
      ${items.map((item) => `
        <div class="bar-row">
          <div class="bar-label" title="${escapeAttr(item.label)}">${escapeHtml(item.label)}</div>
          <div class="bar-track"><div class="bar-fill" style="width: ${(item.value / max) * 100}%"></div></div>
          <div class="bar-value">${item.value}</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAxisBadges(item) {
  if (item.caseType === "project") {
    const detail = projectDetail(item.id);
    return `
      <div class="stack">
        ${axisBadge("進捗", detail.scheduleStatus)}
        ${axisBadge("採算", detail.profitabilityStatus)}
        ${axisBadge("品質", detail.qualityStatus)}
        ${axisBadge("要員", detail.staffingStatus)}
        ${axisBadge("顧客", detail.customerStatus)}
      </div>
    `;
  }
  const detail = routineDetail(item.id);
  return `
    <div class="stack">
      ${axisBadge("期限", detail.deadlineStatus)}
      ${axisBadge("工程", detail.processStatus)}
      ${axisBadge("承認", detail.approvalStatus)}
      ${axisBadge("回答", detail.responseStatus)}
      ${axisBadge("品質", detail.qualityStatus)}
    </div>
  `;
}

function axisBadge(axis, level) {
  return `<span class="axis-badge ${level}"><span>${escapeHtml(axis)}</span><strong>${escapeHtml(labels.statusLevel[level])}</strong></span>`;
}

function renderOverallStatus(status) {
  return badge(labels.overallStatus[status], status === "critical" ? "critical" : status === "attention" ? "medium" : "low");
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
  return `<span class="badge ${type}">${escapeHtml(text)}</span>`;
}

function renderCaseButton(item) {
  return `<button class="btn" data-view="case-detail" data-case-id="${escapeAttr(item.id)}">${escapeHtml(item.caseName)}</button>`;
}

function renderRelatedCaseButton(caseId) {
  const item = caseId ? findCase(caseId) : null;
  if (!item) return badge("なし", "neutral");
  return renderCaseButton(item);
}

function filteredCases() {
  return state.cases.filter((item) => {
    const detail = item.caseType === "project" ? projectDetail(item.id) : routineDetail(item.id);
    if (state.filters.caseType !== "all" && item.caseType !== state.filters.caseType) return false;
    if (state.filters.department !== "all" && item.department !== state.filters.department) return false;
    if (state.filters.status !== "all" && item.status !== state.filters.status) return false;
    if (state.filters.trend !== "all" && item.trend !== state.filters.trend) return false;
    if (state.filters.attentionOnly === "yes" && item.attentionSignalCount <= 0) return false;
    if (state.filters.reportTo !== "all" && item.nextReportTo !== state.filters.reportTo) return false;
    if (state.filters.profitabilityCritical === "yes" && !(item.caseType === "project" && detail.profitabilityStatus === "critical")) return false;
    if (state.filters.deadlineCritical === "yes" && !(item.caseType === "routine" && detail.deadlineStatus === "critical")) return false;
    if (state.filters.amountScale === "large" && !(item.caseType === "project" && detail.contractAmount >= 1000000000)) return false;
    if (state.filters.amountScale === "mid" && !(item.caseType === "project" && detail.contractAmount >= 100000000)) return false;
    return true;
  });
}

function filteredSignals() {
  return state.signals.filter((signal) => {
    if (state.signalFilters.attentionOnly === "yes" && !signal.isAttentionSignal) return false;
    if (state.signalFilters.department !== "all" && signal.department !== state.signalFilters.department) return false;
    if (state.signalFilters.category !== "all" && signal.category !== state.signalFilters.category) return false;
    if (state.signalFilters.source !== "all" && signal.source !== state.signalFilters.source) return false;
    if (state.signalFilters.relatedOnly === "yes" && !signal.relatedCaseId) return false;
    if (state.signalFilters.highScore === "yes" && signal.riskScore < 70) return false;
    if (state.signalFilters.openOnly === "yes" && ["closed", "converted_to_case"].includes(signal.status)) return false;
    return true;
  });
}

function projectCases() {
  return state.cases.filter((item) => item.caseType === "project");
}

function routineCases() {
  return state.cases.filter((item) => item.caseType === "routine");
}

function attentionSignals() {
  return state.signals.filter((signal) => signal.isAttentionSignal && signal.status !== "closed");
}

function reportCandidates() {
  return state.cases.filter((item) =>
    item.nextReportTo !== "none" ||
    item.status === "critical" ||
    item.trend === "worsening" ||
    item.supportNeeded === "executive_decision" ||
    item.supportNeeded === "budget",
  );
}

function projectDetail(caseId) {
  return state.projectDetails.find((detail) => detail.caseId === caseId) || {};
}

function routineDetail(caseId) {
  return state.routineDetails.find((detail) => detail.caseId === caseId) || {};
}

function findCase(id) {
  return state.cases.find((item) => item.id === id);
}

function findSignal(id) {
  return state.signals.find((signal) => signal.id === id);
}

function findRelatedCase(selectedCaseId, text) {
  if (selectedCaseId) return findCase(selectedCaseId);
  return findRelatedCaseCandidates(text, "other")[0] || null;
}

function findRelatedCaseCandidates(text, category) {
  const normalized = String(text || "");
  return state.cases
    .filter((item) => {
      if (normalized && (normalized.includes(item.caseName) || item.caseName.includes(normalized))) return true;
      const detail = item.caseType === "project" ? projectDetail(item.id) : routineDetail(item.id);
      if (item.caseType === "project" && detail.customerName && normalized.includes(detail.customerName)) return true;
      if (item.caseType === "routine" && detail.submitTo && normalized.includes(detail.submitTo)) return true;
      if (category === "deadline" || category === "approval") return item.caseType === "routine";
      if (["profitability", "estimate", "staffing", "quality", "customer", "schedule"].includes(category)) return item.caseType === "project";
      return false;
    })
    .slice(0, 4);
}

function recommendedSignalReport(signal) {
  if (signal.riskScore >= 85 || /幹部会|二桁億円|赤字|経営判断/.test(signal.attentionReason || "")) return "幹部会";
  if (signal.riskScore >= 70 || signal.relatedCaseId) return "本部基幹職会議";
  return "課内会議";
}

function reportReason(item) {
  if (item.status === "critical") return "総合状態が危険";
  if (item.trend === "worsening") return "推移が悪化";
  if (item.supportNeeded === "executive_decision") return "経営判断が必要";
  if (item.supportNeeded === "budget") return "予算支援が必要";
  return "上位報告候補";
}

function amountOrDeadline(item) {
  if (item.caseType === "project") return formatCurrency(projectDetail(item.id).contractAmount || 0);
  return routineDetail(item.id).deadline || "";
}

function axisLabel(caseType, key) {
  const project = {
    profitabilityStatus: "採算",
    scheduleStatus: "進捗",
    qualityStatus: "品質",
    staffingStatus: "要員",
    customerStatus: "顧客",
  };
  const routine = {
    deadlineStatus: "期限",
    processStatus: "工程",
    approvalStatus: "承認",
    responseStatus: "回答",
    qualityStatus: "品質",
  };
  return caseType === "project" ? project[key] || key : routine[key] || key;
}

function aiCaseSummary(item, signals) {
  const signalText = signals.length ? `関連シグナルは${signals.length}件、要注意は${signals.filter((signal) => signal.isAttentionSignal).length}件です。` : "関連シグナルはまだ少ない状態です。";
  if (item.caseType === "project") {
    const detail = projectDetail(item.id);
    return `${item.caseName}は${labels.overallStatus[item.status]}、推移は${labels.trend[item.trend]}です。${signalText} 進捗・採算・品質・要員・顧客のうち、${renderPlainCriticalAxes(item, detail)}を優先確認してください。`;
  }
  const detail = routineDetail(item.id);
  return `${item.caseName}は${labels.overallStatus[item.status]}、推移は${labels.trend[item.trend]}です。${signalText} 期限・工程・承認・回答・品質のうち、${renderPlainCriticalAxes(item, detail)}を優先確認してください。`;
}

function renderPlainCriticalAxes(item, detail) {
  const entries = item.caseType === "project"
    ? [
        ["進捗", detail.scheduleStatus],
        ["採算", detail.profitabilityStatus],
        ["品質", detail.qualityStatus],
        ["要員", detail.staffingStatus],
        ["顧客", detail.customerStatus],
      ]
    : [
        ["期限", detail.deadlineStatus],
        ["工程", detail.processStatus],
        ["承認", detail.approvalStatus],
        ["回答", detail.responseStatus],
        ["品質", detail.qualityStatus],
      ];
  const risky = entries.filter(([, level]) => level !== "normal").map(([name, level]) => `${name}:${labels.statusLevel[level]}`);
  return risky.length ? risky.join("、") : "現時点では全軸正常";
}

function countDepartmentRisk() {
  const counts = new Map();
  state.cases.forEach((item) => {
    if (item.status === "attention" || item.status === "critical") {
      counts.set(item.department, (counts.get(item.department) || 0) + 1);
    }
  });
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label, "ja"));
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

function historyTrendBars(histories) {
  const counts = countBy(histories, (history) => labels.overallStatus[history.overallStatus]);
  return counts.length ? counts : [{ label: "履歴なし", value: 0 }];
}

function scoreClass(score) {
  if (Number(score) >= 85) return "critical";
  if (Number(score) >= 70) return "high";
  if (Number(score) >= 40) return "medium";
  return "low";
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

function parseAmount(value) {
  const text = String(value || "").replace(/,/g, "");
  const number = Number((text.match(/\d+(\.\d+)?/) || ["0"])[0]);
  if (text.includes("億")) return Math.round(number * 100000000);
  if (text.includes("万")) return Math.round(number * 10000);
  return Math.round(number);
}

function summarizeText(text) {
  const compact = String(text || "").replace(/\s+/g, " ").trim();
  return compact.length > 76 ? `${compact.slice(0, 76)}...` : compact;
}

function nextSignalId() {
  const max = state.signals.reduce((current, signal) => Math.max(current, Number((signal.id.match(/S-(\d+)/) || [0, 0])[1])), 0);
  return `S-${String(max + 1).padStart(3, "0")}`;
}

function nextHistoryId() {
  return `H-${String(Date.now()).slice(-8)}-${state.histories.length + 1}`;
}

function nextCaseId(prefix) {
  const regexp = prefix === "C-P" ? /C-P(\d+)/ : /C-R(\d+)/;
  const max = state.cases.reduce((current, item) => Math.max(current, Number((item.id.match(regexp) || [0, 0])[1])), 0);
  return `${prefix}${String(max + 1).padStart(3, "0")}`;
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
