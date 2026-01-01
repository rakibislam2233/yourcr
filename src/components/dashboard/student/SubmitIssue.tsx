"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import PageHeader from "../shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const previousIssues = [
  {
    id: 1,
    title: "Project Deadline Extension Request",
    status: "resolved",
    date: "2 days ago",
    response: "Extended to Dec 10",
  },
  {
    id: 2,
    title: "Attendance Record Correction",
    status: "resolved",
    date: "5 days ago",
    response: "Corrected",
  },
  {
    id: 3,
    title: "Lab Equipment Issue",
    status: "in_progress",
    date: "1 week ago",
    response: "Being addressed",
  },
];

const issueCategories = [
  "Academic Issue",
  "Attendance Problem",
  "Lab/Equipment Issue",
  "Schedule Conflict",
  "Assessment Related",
  "General Query",
  "Other",
];

const submitIssueSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Please select a priority level",
  }),
});

type SubmitIssueFormData = z.infer<typeof submitIssueSchema>;

const SubmitIssue: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SubmitIssueFormData>({
    resolver: zodResolver(submitIssueSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: SubmitIssueFormData) => {
    console.log("Submitting issue:", data);
  };

  const handlePriorityChange = (priority: "low" | "medium" | "high") => {
    setValue("priority", priority);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Issue"
        description="Report an issue or request to your Class Representative"
        icon={MessageSquare}
        breadcrumbs={[
          { label: "Home", href: "/dashboard/student" },
          { label: "Submit Issue" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Form */}
        <motion.div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              New Issue
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label>Issue Title</Label>
                <Input
                  placeholder="Brief title for your issue"
                  className={errors.title ? "border-red-500" : ""}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex gap-3">
                  {(["low", "medium", "high"] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handlePriorityChange(priority)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium border-2 transition-all ${
                        watch("priority") === priority
                          ? priority === "high"
                            ? "border-red-500 bg-red-50 text-red-700"
                            : priority === "medium"
                            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                            : "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
                {errors.priority && (
                  <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe your issue in detail..."
                  rows={5}
                  className={errors.description ? "border-red-500" : ""}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full gap-2" size="lg">
                <Send className="w-4 h-4" />
                Submit Issue
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Previous Issues */}
        <motion.div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Your Recent Issues
            </h3>
            <div className="space-y-4">
              {previousIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {issue.status === "resolved" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                        )}
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            issue.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {issue.status === "resolved"
                            ? "Resolved"
                            : "In Progress"}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mt-2 text-sm">
                        {issue.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {issue.date}
                      </p>
                      {issue.response && (
                        <p className="text-xs text-primary mt-2">
                          Response: {issue.response}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <motion.div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Tips for Submitting Issues
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                Be specific and clear about your issue
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                Select the appropriate category
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                Set priority based on urgency
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                Check your previous issues before submitting
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitIssue;
