"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, Filter as FilterIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type AnalyzeFilter = {
  id: string;
  kind: "L1" | "L2" | "THEME" | "SUBTHEME";
  label: string;
  path: string[]; // [L1, L2, L3?]
};

export type ThemeRow = {
  id: number;
  name: string; // Theme name (L2)
  feedbackCount: number;
  uniqueUsers?: number;
  csatImpact: number;
  l1: string;
  l2: string; // theme name, duplicate of name for clarity
  subthemes: Array<{
    id: number;
    name: string; // Sub-theme name (L3)
    feedbackCount: number;
    uniqueUsers?: number;
    csatImpact: number;
    l1: string;
    l2: string;
    l3: string;
  }>;
};

interface AnalyzeThemesTableProps {
  rows?: ThemeRow[];
  onAddFilter: (filter: AnalyzeFilter) => void;
}

// Minimal mock dataset for now; can be replaced by real data later
const mockRows: ThemeRow[] = [
  {
    id: 2001,
    name: "Overall Satisfaction with Account Management",
    feedbackCount: 45,
    uniqueUsers: 32,
    csatImpact: -2.1,
    l1: "L1: Account Management",
    l2: "L2: Overall Satisfaction with Account Management",
    subthemes: [
      { id: 2002, name: "Praise For Authentication Options", feedbackCount: 18, uniqueUsers: 14, csatImpact: -2.8, l1: "L1: Account Management", l2: "L2: Overall Satisfaction with Account Management", l3: "L3: Praise For Authentication Options" },
      { id: 2003, name: "Account Settings Confusion", feedbackCount: 15, uniqueUsers: 12, csatImpact: -1.9, l1: "L1: Account Management", l2: "L2: Overall Satisfaction with Account Management", l3: "L3: Account Settings Confusion" },
      { id: 2004, name: "Profile Management Problems", feedbackCount: 12, uniqueUsers: 6, csatImpact: -1.4, l1: "L1: Account Management", l2: "L2: Overall Satisfaction with Account Management", l3: "L3: Profile Management Problems" }
    ],
  },
  {
    id: 2009,
    name: "Design Editor Usability",
    feedbackCount: 52,
    uniqueUsers: 41,
    csatImpact: -1.6,
    l1: "L1: Core Design Editor",
    l2: "L2: Design Editor Usability",
    subthemes: [
      { id: 2010, name: "Element Manipulation Difficulties", feedbackCount: 28, uniqueUsers: 24, csatImpact: -1.9, l1: "L1: Core Design Editor", l2: "L2: Design Editor Usability", l3: "L3: Element Manipulation Difficulties" },
      { id: 2011, name: "Canvas Performance Issues", feedbackCount: 16, uniqueUsers: 12, csatImpact: -1.4, l1: "L1: Core Design Editor", l2: "L2: Design Editor Usability", l3: "L3: Canvas Performance Issues" },
      { id: 2012, name: "Tool Accessibility Problems", feedbackCount: 8, uniqueUsers: 5, csatImpact: -1.2, l1: "L1: Core Design Editor", l2: "L2: Design Editor Usability", l3: "L3: Tool Accessibility Problems" }
    ],
  },
  {
    id: 2013,
    name: "Text and Typography Features",
    feedbackCount: 31,
    uniqueUsers: 24,
    csatImpact: -1.3,
    l1: "L1: Text & Typography",
    l2: "L2: Text and Typography Features",
    subthemes: [
      { id: 2014, name: "Font Selection and Loading", feedbackCount: 19, uniqueUsers: 15, csatImpact: -1.6, l1: "L1: Text & Typography", l2: "L2: Text and Typography Features", l3: "L3: Font Selection and Loading" },
      { id: 2015, name: "Text Formatting Options", feedbackCount: 8, uniqueUsers: 6, csatImpact: -1.0, l1: "L1: Text & Typography", l2: "L2: Text and Typography Features", l3: "L3: Text Formatting Options" },
      { id: 2016, name: "Typography Alignment Issues", feedbackCount: 4, uniqueUsers: 3, csatImpact: -0.9, l1: "L1: Text & Typography", l2: "L2: Text and Typography Features", l3: "L3: Typography Alignment Issues" }
    ],
  },
];

const getCsatColor = (impact: number) => {
  if (impact >= 0) return "text-green-600";
  if (impact >= -1) return "text-yellow-600";
  if (impact >= -2) return "text-orange-600";
  return "text-red-600";
};

export default function AnalyzeThemesTable({ rows = mockRows, onAddFilter }: AnalyzeThemesTableProps) {
  const [expandedThemeIds, setExpandedThemeIds] = useState<Set<number>>(new Set());

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => b.feedbackCount - a.feedbackCount);
  }, [rows]);

  const toggleExpand = (id: number) => {
    setExpandedThemeIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = (kind: AnalyzeFilter["kind"], path: string[], label: string) => {
    onAddFilter({ id: `${kind}:${path.join("/")}`, kind, path, label });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">Stack ranked by Feedback volume</div>
      </div>
      <div className="border rounded-lg bg-white overflow-hidden">
        <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="text-gray-900 font-medium">Theme Name</TableHead>
                <TableHead className="text-center text-gray-900 font-medium"># of Feedback</TableHead>
                <TableHead className="text-center text-gray-900 font-medium">Unique Users</TableHead>
                <TableHead className="text-center text-gray-900 font-medium">CSAT Impact</TableHead>
                <TableHead className="w-12 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRows.map((theme) => {
                const isExpanded = expandedThemeIds.has(theme.id);
                const hasChildren = theme.subthemes && theme.subthemes.length > 0;
                return (
                  <React.Fragment key={theme.id}>
                    <TableRow className="hover:bg-gray-50">
                      <TableCell className="align-middle">
                        {hasChildren ? (
                          <button
                            className="p-1 rounded hover:bg-gray-100"
                            onClick={() => toggleExpand(theme.id)}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-gray-900">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{theme.name}</span>
                            <Badge variant="outline" className="text-xs text-gray-700 border-gray-200">Theme</Badge>
                            <button
                              className="ml-2 text-xs text-blue-700 hover:underline flex items-center gap-1"
                              onClick={() => handleAdd("THEME", [theme.l1, theme.l2], theme.name)}
                            >
                              <FilterIcon className="w-3 h-3" /> Add filter
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">
                            {theme.l1} / {theme.l2}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-gray-900 font-medium">{theme.feedbackCount.toLocaleString()}</TableCell>
                      <TableCell className="text-center text-gray-700">{theme.uniqueUsers?.toLocaleString() ?? "-"}</TableCell>
                      <TableCell className={`text-center font-medium ${getCsatColor(theme.csatImpact)}`}>{theme.csatImpact > 0 ? "+" : ""}{theme.csatImpact}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <MoreHorizontal className="w-4 h-4 text-gray-600" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAdd("THEME", [theme.l1, theme.l2], theme.name)} className="text-gray-700">
                              Add filter: This Theme
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdd("L2", [theme.l1, theme.l2], theme.l2)} className="text-gray-700">
                              Add filter: L2
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdd("L1", [theme.l1], theme.l1)} className="text-gray-700">
                              Add filter: L1
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {isExpanded && hasChildren &&
                      theme.subthemes
                        .slice()
                        .sort((a, b) => b.feedbackCount - a.feedbackCount)
                        .map((sub) => (
                          <TableRow key={sub.id} className="hover:bg-gray-50">
                            <TableCell></TableCell>
                            <TableCell className="pl-6">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-900">{sub.name}</span>
                                  <Badge variant="outline" className="text-xs text-gray-700 border-gray-200">Sub-theme</Badge>
                                  <button
                                    className="ml-2 text-xs text-blue-700 hover:underline flex items-center gap-1"
                                    onClick={() => handleAdd("SUBTHEME", [sub.l1, sub.l2, sub.l3], sub.name)}
                                  >
                                    <FilterIcon className="w-3 h-3" /> Add filter
                                  </button>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {sub.l1} / {sub.l2} / {sub.l3}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center text-gray-900 font-medium">{sub.feedbackCount.toLocaleString()}</TableCell>
                            <TableCell className="text-center text-gray-700">{sub.uniqueUsers?.toLocaleString() ?? "-"}</TableCell>
                            <TableCell className={`text-center font-medium ${getCsatColor(sub.csatImpact)}`}>{sub.csatImpact > 0 ? "+" : ""}{sub.csatImpact}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 rounded hover:bg-gray-100">
                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleAdd("SUBTHEME", [sub.l1, sub.l2, sub.l3], sub.name)} className="text-gray-700">
                                    Add filter: This Sub-theme
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAdd("THEME", [sub.l1, sub.l2], sub.l2)} className="text-gray-700">
                                    Add filter: Theme
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAdd("L2", [sub.l1, sub.l2], sub.l2)} className="text-gray-700">
                                    Add filter: L2
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAdd("L1", [sub.l1], sub.l1)} className="text-gray-700">
                                    Add filter: L1
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 