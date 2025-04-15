export type FeedbackSource = 'Zendesk' | 'Twitter' | 'Salesforce' | 'G2' | 'Other';
export type FeedbackType = 'Bug' | 'Feature Request' | 'Complaint' | 'Praise';
export type FeedbackStatus = 'New' | 'In Review' | 'Addressed';
export type Sentiment = 'Positive' | 'Negative' | 'Neutral';
export type Priority = 'High' | 'Medium' | 'Low';

export interface FeedbackUser {
  id: string;
  name: string;
  role: string;
}

export interface FeedbackAccount {
  id: string;
  name: string;
  tier: 'Enterprise' | 'Business' | 'Startup';
}

export interface FeedbackOpportunity {
  id: string;
  name: string;
  value: string;
  stage: string;
}

export interface FeedbackStore {
  id: string;
  name: string;
  location: string;
}

export interface FeedbackProduct {
  id: string;
  name: string;
  category: string;
}

export interface FeedbackRecord {
  id: string;
  source: FeedbackSource;
  dateReceived: string;
  customerName: string;
  customerId: string;
  type: FeedbackType;
  status: FeedbackStatus;
  sentiment: Sentiment;
  priority: Priority;
  theme: string;
  content: string;
  summary: string;
  assignedTo?: string;
  tags: string[];
  user?: FeedbackUser;
  account?: FeedbackAccount;
  opportunity?: FeedbackOpportunity;
  store?: FeedbackStore;
  product?: FeedbackProduct;
} 