import { SourceDocument, GenerationParams, OutputFormatType } from '../types';

export const SAMPLE_SOURCE_PRESETS: SourceDocument[] = [
  {
    id: 'preset-threat-intel',
    title: 'Cyber Threat Intelligence: Critical Authentication Bypass (CVE-2026-9042)',
    category: 'threat_intelligence',
    authorOrSource: 'National Computer Emergency Response Team (CERT) & Threat Intel Labs',
    dateAdded: 'September 2026',
    tags: ['Cybersecurity', 'Zero-Day', 'Enterprise Infrastructure', 'Critical Vulnerability'],
    content: `INCIDENT ADVISORY & TECHNICAL BRIEFING
DOCUMENT ID: CTI-2026-0906-ALPHA
SEVERITY: CVSSv4.0 Score 9.8 / CRITICAL
AFFECTED COMPONENT: CloudGate Zero-Trust Identity Controller (v3.2.0 - v4.1.8)

SUMMARY:
A severe vulnerability (designated CVE-2026-9042) has been detected in active exploitation across financial institutions, government networks, and cloud service providers. The flaw resides in the cryptographic handshake sequence of the session token validator within the CloudGate Identity Gateway. An unauthenticated external actor can craft a malformed JWT header with an elliptical signature mismatch, causing the auth proxy to fall back to an unverified default administrative context.

EXPLOITATION DETAILS:
- Attack Vector: Network / Remote unauthenticated HTTP/2 POST request to endpoint '/v2/auth/verify-token'.
- Exploit Complexity: Low. Proof-of-concept scripts have been identified on underground forums.
- Impact: Immediate full administrative privilege escalation, arbitrary remote command injection, extraction of tenant secrets, and lateral movement into private VPC segments.
- Observed In-The-Wild: Advanced persistent threat groups (APT-44 & FIN-9) have actively breached at least 14 enterprise instances in the past 72 hours, deploying memory-resident credential harvesters.

RECOMMENDED MITIGATIONS:
1. Immediate action: Apply hotfix patch 4.1.9-p2 released at 02:00 UTC today.
2. If immediate patching is not viable, enforce perimeter WAF block rules rejecting incoming requests with header 'X-Token-Subtype: EllipticFallback'.
3. Terminate all active administrative sessions and force multi-factor hardware key re-authentication.
4. Review access logs for non-standard 200 OK responses from IP ranges originating from unknown autonomous systems.
5. Notify compliance and incident response officers under mandate Directive 17-B.`
  },
  {
    id: 'preset-clean-energy',
    title: 'National Clean Energy Transition & Smart Grid Policy Framework 2026-2030',
    category: 'policy_document',
    authorOrSource: 'Ministry of Power & Renewable Resources, Strategic Policy Bureau',
    dateAdded: 'August 2026',
    tags: ['Clean Energy', 'Public Policy', 'Smart Grid', 'Decarbonization', 'Subsidies'],
    content: `GOVERNMENT POLICY WHITE PAPER: PROJECT SURYA-URJA 2026
VISION: Accelerating 500 Gigawatt Non-Fossil Renewable Generation and Unified High-Voltage Direct Current (HVDC) Grid Resiliency by 2030.

EXECUTIVE HIGHLIGHTS:
The government announces a multi-pillar regulatory overhaul to overcome transmission congestion, stimulate domestic semiconductor-grade solar cell manufacturing, and integrate distributed battery energy storage systems (BESS).

KEY INITIATIVES:
1. Universal Time-of-Day (ToD) Tariff Reform:
Beginning November 2026, peak-hour industrial power tariffs will reflect dynamic marginal costs, incentivizing battery storage deployment and demand-side management. Solar hours (09:00 - 16:00) will see a 22% tariff rebate.

2. Production Linked Incentive (PLI) Tranche III:
An allocation of INR 28,500 Crore ($3.4B USD) for high-efficiency bifacial perovskite-silicon tandem solar cells and sodium-ion modular energy storage packs produced within domestic SEZs.

3. Green Corridor Grid Expansion:
Construction of 12,000 circuit kilometers of green energy corridors connecting the Thar Desert solar parks and southern offshore wind zones directly to heavy industrial corridors.

4. Microgrid Subsidies for Rural Healthcare and Farming:
100% capital grant for 50,000 agrarian solar feeder microgrids with bi-directional net-metering to guarantee 24/7 cold storage for perishable crops.

STAKEHOLDER MANDATE:
Distribution companies (DISCOMs) must maintain a minimum 38% Renewable Purchase Obligation (RPO) by FY 2027, facing automatic automated escrow deductions for non-compliance.`
  },
  {
    id: 'preset-cloud-outage',
    title: 'Post-Mortem: Global Cloud Infrastructure Outage & Core DNS Partitioning',
    category: 'incident_report',
    authorOrSource: 'Site Reliability Engineering & Global Infrastructure Team',
    dateAdded: 'September 2026',
    tags: ['SRE', 'Post-Mortem', 'Infrastructure Outage', 'DNS', 'High Availability'],
    content: `INTERNAL POST-MORTEM & TECHNICAL ROOT CAUSE ANALYSIS
INCIDENT DURATION: 184 minutes (08:14 UTC - 11:18 UTC)
SERVICES IMPACTED: Global Edge Routing, Managed Database Clusters (us-east-1, eu-west-1), Payment Gateway API.
CUSTOMER IMPACT: 4.2 million transactions rejected, 99.12% availability drop across affected regions.

INCIDENT TIMELINE:
- 08:12 UTC: SRE team pushed automated configuration commit #9942 to edge Anycast BGP route reflectors.
- 08:14 UTC: Syntax validation overlooked a circular reference in the regex matching geofenced health-check routes.
- 08:19 UTC: BGP daemons encountered an unhandled memory leak, triggering cascading failovers across 18 edge POPs simultaneously.
- 08:35 UTC: Traffic dumped onto secondary transit nodes, overwhelming core ingress queues by 480% of rated capacity.
- 09:20 UTC: PagerDuty Sev-0 conference bridge initialized with 45 engineers.
- 10:45 UTC: Manual rollback of BGP routing tables initiated; automated traffic shunting engaged.
- 11:18 UTC: Core routing stabilized; telemetry normalized to 99.99% baseline.

ROOT CAUSE:
The configuration deployment pipeline lacked a canary staging gate for edge BGP route daemon rules. Canary testing was performed only on stateless HTTP proxy layers.

CORRECTIVE ACTIONS & PREVENTATIVE ROADMAP:
1. Enforce automated multi-stage canary rollout with 30-minute soak period across edge routing fabrics.
2. Introduce compiler-enforced schema validation and AST-level cycle detection for all routing policy manifests.
3. Decouple critical customer telemetry databases from edge Anycast DNS dependency.
4. Establish SLA compensation protocol ($1.8M in service credits automated to enterprise tier customers).`
  },
  {
    id: 'preset-ai-health',
    title: 'Research Breakthrough: Multimodal Foundation Models in Early Oncology Detection',
    category: 'research_paper',
    authorOrSource: 'BioMed AI Research Consortium & Global Oncology Institute',
    dateAdded: 'August 2026',
    tags: ['AI in Medicine', 'Oncology', 'Medical Imaging', 'Pathology', 'Clinical Trials'],
    content: `SCIENTIFIC ADVANCE PAPER
TITLE: 'Multi-Spectral Histopathology & Genomic Synthesis via High-Parametric Vision-Language Models for Sub-Centimeter Neoplasm Identification'
JOURNAL: International Journal of Computational Oncology

ABSTRACT:
Early-stage neoplastic growth detection in tissue biopsies often suffers from diagnostic variance between clinical pathologists (estimated inter-observer discordance of 18-24%). We present OncoGemini-Vision, a specialized 70B parameter multimodal model pre-trained on 4.2 million multi-spectral whole-slide gigapixel images paired with genomic sequencing and patient longitudinal records.

CLINICAL TRIAL RESULTS:
- Sensitivity: 98.4% (vs. 91.2% board-certified pathologist benchmark) across 12 solid tumor phenotypes.
- False Positive Rate: Decreased by 41.3% compared to contemporary CNN architectures.
- Sub-Visual Micro-calcification Detection: Identified occult invasive ductal carcinoma 11.4 months prior to conventional mammographic detection in a retrospective cohort of 3,800 patients.

ETHICAL & DEPLOYMENT CONSIDERATIONS:
The algorithm operates under a mandatory "Human-in-the-Loop" decision-support paradigm. Clinicians are provided with an interpretable saliency heatmap explaining the morphological cell nuclear atypia that prompted the recommendation. Regulatory submission for Class III Medical Device approval has been initiated across 4 continents.`
  }
];

export const DEFAULT_GENERATION_PARAMS: GenerationParams = {
  targetAudience: 'Cross-functional Enterprise & Executive Stakeholders',
  tone: 'Authoritative, Clear & Action-Oriented',
  language: 'English (Professional / Global)',
  detailLevel: 'Standard (Balanced)',
  communicationObjective: 'Inform, Alert & Enable Rapid Decision-Making',
  contentStyle: 'Executive Briefing & Strategic Deliverable',
  customDirectives: 'Highlight critical metrics, actionable timelines, key takeaways, and eliminate ambiguous jargon.'
};

export const FORMAT_METADATA: Record<OutputFormatType, {
  label: string;
  badge: string;
  description: string;
  iconName: string;
  accentColor: string;
  estimatedEffortSaved: string;
}> = {
  video: {
    label: 'Video Package',
    badge: 'Multi-Scene Script & Storyboard',
    description: 'Complete video package: script, scene-by-scene storyboard, camera angles, narration, subtitles, and audio recommendations.',
    iconName: 'Video',
    accentColor: 'rose',
    estimatedEffortSaved: '6-8 hours production time'
  },
  linkedin: {
    label: 'LinkedIn Post',
    badge: 'Viral & B2B Thought Leadership',
    description: 'Engaging B2B post formatted with punchy hooks, bulleted insights, visual asset suggestions, and targeted hashtags.',
    iconName: 'Linkedin',
    accentColor: 'blue',
    estimatedEffortSaved: '45 mins copy craft'
  },
  twitter: {
    label: 'Twitter / X Thread',
    badge: 'Bite-Sized Viral Thread',
    description: 'Platform-optimized, numbered tweet thread with 280-char limits, catchy opener, key stats, and closing engagement prompt.',
    iconName: 'Twitter',
    accentColor: 'sky',
    estimatedEffortSaved: '30 mins thread formatting'
  },
  advisory: {
    label: 'Structured Advisory',
    badge: 'Official / Regulatory Format',
    description: 'Formal enterprise advisory document with ID, severity rating, affected assets, immediate mitigation protocol, and verification checks.',
    iconName: 'ShieldAlert',
    accentColor: 'amber',
    estimatedEffortSaved: '3-4 hours policy drafting'
  },
  infographic: {
    label: 'Infographic Blueprint',
    badge: 'Visual Hierarchy & Copy',
    description: 'Graphic design architecture, hero statistics, step-by-step process flows, color palette specs, and visual asset directives.',
    iconName: 'LayoutGrid',
    accentColor: 'emerald',
    estimatedEffortSaved: '4-5 hours visual planning'
  },
  executive_summary: {
    label: 'Executive Summary',
    badge: 'C-Suite BLUF Briefing',
    description: 'High-impact briefing: Bottom Line Up Front (BLUF), strategic risks & opportunities matrix, budget impact, and decision recommendations.',
    iconName: 'FileText',
    accentColor: 'indigo',
    estimatedEffortSaved: '2-3 hours briefing prep'
  },
  presentation: {
    label: 'Presentation (Slide Deck)',
    badge: 'Pitch Deck & Speaker Notes',
    description: 'Slide-by-slide deck structure, titles, bulleted arguments, visual diagram directives, and comprehensive speaker notes.',
    iconName: 'Presentation',
    accentColor: 'purple',
    estimatedEffortSaved: '5-6 hours deck assembly'
  }
};
