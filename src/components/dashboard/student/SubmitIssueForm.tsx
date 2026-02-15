"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Label } from "@/components/ui/label";
import { createIssue, type IssueActionState } from "@/services/issue.service";
import { Send } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const issueCategories = [
  "Academic Issue",
  "Attendance Problem",
  "Lab/Equipment Issue",
  "Schedule Conflict",
  "Assessment Related",
  "General Query",
  "Other",
];

const initialState: IssueActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

const SubmitIssueForm = () => {
  const [state, formAction, isPending] = useActionState(
    createIssue,
    initialState,
  );

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        // Maybe redirect or clear form? For now, just toast.
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">New Issue</h3>
      <form action={formAction} className="space-y-6">
        <FormInput
          id="title"
          name="title"
          label="Issue Title"
          defaultValue={state.inputs?.title}
          placeholder="Brief title for your issue"
          error={state.errors?.title}
          required
        />

        <FormSelect
          name="category"
          label="Category"
          defaultValue={state.inputs?.category}
          options={issueCategories.map((c) => ({ value: c, label: c }))}
          placeholder="Select a category"
          error={state.errors?.category}
        />

        <div className="space-y-2">
          <Label>Priority</Label>
          <div className="flex gap-3">
            {(["low", "medium", "high"] as const).map((priority) => (
              <label key={priority} className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  className="peer sr-only"
                  defaultChecked={
                    state.inputs?.priority === priority ||
                    (state.inputs?.priority === undefined &&
                      priority === "medium")
                  }
                />
                <div
                  className={`py-3 px-4 rounded-xl text-sm font-medium border-2 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary border-gray-200 hover:border-gray-300`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
              </label>
            ))}
          </div>
          {state.errors?.priority && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.priority[0]}
            </p>
          )}
        </div>

        <FormTextarea
          id="description"
          name="description"
          label="Description"
          defaultValue={state.inputs?.description}
          placeholder="Describe your issue in detail..."
          rows={5}
          error={state.errors?.description}
          required
        />

        <Button
          type="submit"
          className="w-full gap-2"
          size="lg"
          disabled={isPending}
        >
          <Send className="w-4 h-4" />
          {isPending ? "Submitting..." : "Submit Issue"}
        </Button>
      </form>
    </div>
  );
};

export default SubmitIssueForm;
