export type Language = {
  code: string;
  label: string;
  nativeLabel: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  bgColor: string;
};

export type RecentItem = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: "orange" | "green" | "blue" | "purple" | "gray";
  date: string;
  icon: string;
  href: string;
};

export type AISuggestion = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  href: string;
};

export type Statistic = {
  id: string;
  value: string;
  label: string;
  icon: string;
  iconBg: string;
};

export type PromptChip = {
  id: string;
  label: string;
};

export type AccessibilitySettings = {
  textSize: "sm" | "md" | "lg";
  highContrast: boolean;
  voiceAssistance: boolean;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export type MessageRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  estimatedTime: string;
  documentsNeeded: string[];
  icon: string;
  iconBg: string;
  iconColor: string;
  isPopular?: boolean;
  href: string;
};

export type ServiceCategory = {
  id: string;
  label: string;
  icon: string;
};

export type Complaint = {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: ComplaintStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  timeline: ComplaintTimelineEvent[];
};

export type ComplaintStatus =
  | "submitted"
  | "under_review"
  | "assigned"
  | "in_progress"
  | "resolved"
  | "closed";

export type ComplaintTimelineEvent = {
  id: string;
  label: string;
  description: string;
  timestamp: string;
  status: ComplaintStatus;
};

export type Document = {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadedAt: string;
  status: "verified" | "pending" | "expired";
  icon: string;
  iconBg: string;
  iconColor: string;
};

export type Scheme = {
  id: string;
  title: string;
  description: string;
  ministry: string;
  category: string;
  eligibility: string[];
  benefits: string;
  deadline?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  isEligible?: boolean;
  tag?: string;
};
