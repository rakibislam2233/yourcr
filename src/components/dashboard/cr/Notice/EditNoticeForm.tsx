"use client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Label } from "@/components/ui/label";
import { Notice } from "@/interface/notice.interface";
import {
  updateNotice,
  type NoticeActionState,
} from "@/services/notice.service";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

const typeOptions = [
  { value: "important", label: "Important" },
  { value: "alert", label: "Alert" },
  { value: "info", label: "Information" },
  { value: "general", label: "General" },
];

const initialState: NoticeActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

interface EditNoticeFormProps {
  notice: Notice;
}

const EditNoticeForm: React.FC<EditNoticeFormProps> = ({ notice }) => {
  const router = useRouter();
  const updateNoticeWithId = updateNotice.bind(null, notice.id);
  const [state, formAction, isPending] = useActionState(
    updateNoticeWithId,
    initialState,
  );

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/notices");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormInput
            id="title"
            name="title"
            label="Notice Title"
            icon={FileText} // Added icon import required
            defaultValue={state.inputs?.title ?? notice.title}
            placeholder="e.g., Mid-Term Examination Schedule"
            error={state.errors?.title}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              name="type"
              label="Notice Type"
              defaultValue={state.inputs?.type ?? notice.type}
              options={typeOptions}
              placeholder="Select type"
              error={state.errors?.type}
            />

            <div className="space-y-2">
              <Label
                htmlFor="pinned"
                className="text-sm font-semibold text-gray-700"
              >
                Pin Notice
              </Label>
              <div className="flex items-center gap-3 h-10 border border-transparent">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="pinned"
                    name="pinned"
                    value="true"
                    defaultChecked={
                      state.inputs?.pinned === "true" ||
                      (state.inputs?.pinned === undefined && notice.pinned)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-600">
                    Pin this notice to top
                  </span>
                </label>
              </div>
              {state.errors?.pinned && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.pinned[0]}
                </p>
              )}
            </div>
          </div>

          <FormTextarea
            id="content"
            name="content"
            label="Notice Content"
            defaultValue={state.inputs?.content ?? notice.content}
            placeholder="Enter the notice content here..."
            rows={6}
            error={state.errors?.content}
            className="resize-none"
            required
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Link href="/dashboard/cr/notices" className="flex-1">
            <Button type="button" variant="outline" className="w-full h-12">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1 h-12" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditNoticeForm;
