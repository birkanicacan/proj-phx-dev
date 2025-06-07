import React from 'react';
import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { FeedbackRecord } from '@/app/types/feedback';

interface FeedbackDetailsPanelProps {
  feedback: FeedbackRecord;
  onClose: () => void;
}

export default function FeedbackDetailsPanel({ feedback, onClose }: FeedbackDetailsPanelProps) {
  const [panelWidth, setPanelWidth] = React.useState(600); // Default width
  const [isResizing, setIsResizing] = React.useState(false);

  // Handle mouse events for resizing - must be defined before useEffect
  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const minWidth = 400;
    const maxWidth = window.innerWidth * 0.8;
    
    setPanelWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isResizing]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  // useEffect for resize functionality
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  return (
    <div 
      className="fixed inset-y-0 right-0 bg-white shadow-xl border-l border-gray-200 overflow-y-auto z-[60]"
      style={{ width: panelWidth }}
    >
      {/* Resize Handle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize"
        onMouseDown={handleMouseDown}
      />
      <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Feedback Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-6">
          {/* Metadata Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Source</label>
              <div className="mt-1">
                <Badge variant="outline" className="text-gray-900 border-gray-200">
                  {feedback.source}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date Received</label>
              <div className="mt-1 text-gray-900">{feedback.dateReceived}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(feedback.status)}>
                  {feedback.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Sentiment</label>
              <div className="mt-1">
                <Badge className={getSentimentColor(feedback.sentiment)}>
                  {feedback.sentiment}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Priority</label>
              <div className="mt-1">
                <Badge className={getPriorityColor(feedback.priority)}>
                  {feedback.priority}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Theme</label>
              <div className="mt-1 text-gray-900">{feedback.theme}</div>
            </div>
          </div>

          {/* Content Section */}
          <div>
            <label className="text-sm font-medium text-gray-500">Content</label>
            <div className="mt-1 text-gray-900 whitespace-pre-wrap">{feedback.content}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Summary</label>
            <div className="mt-1 text-gray-900">{feedback.summary}</div>
          </div>

          {/* User Section */}
          {feedback.user && (
            <div>
              <label className="text-sm font-medium text-gray-500">User</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {feedback.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">{feedback.user.name}</div>
                    <div className="text-sm text-gray-500">{feedback.user.role}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Section */}
          {feedback.account && (
            <div>
              <label className="text-sm font-medium text-gray-500">Account</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{feedback.account.name}</div>
                  <div className="text-sm text-gray-500">Tier: {feedback.account.tier}</div>
                </div>
              </div>
            </div>
          )}

          {/* Opportunity Section */}
          {feedback.opportunity && (
            <div>
              <label className="text-sm font-medium text-gray-500">Opportunity</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{feedback.opportunity.name}</div>
                  <div className="text-sm text-gray-500">
                    <span>Value: {feedback.opportunity.value}</span>
                    <span className="mx-2">•</span>
                    <span>Stage: {feedback.opportunity.stage}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Store Section */}
          {feedback.store && (
            <div>
              <label className="text-sm font-medium text-gray-500">Store</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{feedback.store.name}</div>
                  <div className="text-sm text-gray-500">{feedback.store.location}</div>
                </div>
              </div>
            </div>
          )}

          {/* Product Section */}
          {feedback.product && (
            <div>
              <label className="text-sm font-medium text-gray-500">Product</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{feedback.product.name}</div>
                  <div className="text-sm text-gray-500">{feedback.product.category}</div>
                </div>
              </div>
            </div>
          )}

          {/* Linear Issue Section */}
          {feedback.linearIssue && (
            <div>
              <label className="text-sm font-medium text-gray-500">Linear Issue</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="font-medium text-gray-900">{feedback.linearIssue.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">{feedback.linearIssue.id}</Badge>
                    <Badge className="bg-gray-100 text-gray-800">{feedback.linearIssue.status}</Badge>
                  </div>
                  {feedback.linearIssue.url && (
                    <a 
                      href={feedback.linearIssue.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      View in Linear
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Assigned To Section */}
          {feedback.assignedTo && (
            <div>
              <label className="text-sm font-medium text-gray-500">Assigned To</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-200 text-gray-700">
                      {feedback.assignedTo.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium text-gray-900">{feedback.assignedTo}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tags Section */}
          <div>
            <label className="text-sm font-medium text-gray-500">Tags</label>
            <div className="mt-2 flex gap-2 flex-wrap">
              {feedback.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm bg-gray-100 text-gray-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-900';
    case 'In Review':
      return 'bg-yellow-100 text-yellow-900';
    case 'Addressed':
      return 'bg-green-100 text-green-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'Positive':
      return 'bg-green-100 text-green-900';
    case 'Negative':
      return 'bg-red-100 text-red-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-900';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-900';
    case 'Low':
      return 'bg-green-100 text-green-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
}; 