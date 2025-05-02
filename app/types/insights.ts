export type InsightStatus = 'New' | 'In Progress' | 'Resolved' | 'Archived';
export type InsightCategory = 'Complaint' | 'Improvement' | 'Help' | 'Praise';
export type InsightPriority = 'High' | 'Medium' | 'Low';
export type InsightSentiment = 'Positive' | 'Negative' | 'Neutral';

export interface InsightRecord {
  id: string;
  title: string;
  description: string;
  status: InsightStatus;
  category: InsightCategory;
  priority: InsightPriority;
  sentiment: InsightSentiment;
  feedbackCount: number;
  affectedUsers: number;
  affectedAccounts: number;
  revenueImpact: string;
  dateGenerated: string;
  tags: string[];
  relatedFeedbackIds: string[];
  assignedTo?: string;
  lastUpdated: string;
} 