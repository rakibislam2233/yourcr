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
  { value: "GENERAL", label: "General" },
  { value: "URGENT", label: "Urgent" },
  { value: "EVENT", label: "Event" },
  { value: "EXAM", label: "Exam" },
  { value: "HOLIDAY", label: "Holiday" },
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
              defaultValue={state.inputs?.type ?? notice.type ?? "GENERAL"}
              options={typeOptions}
              placeholder="Select type"
              error={state.errors?.type}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fileUrl" className="text-sm font-semibold text-gray-700">
              Attachment (Optional)
            </Label>
            <input
              id="fileUrl"
              name="fileUrl"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
              className="h-12 text-base border border-gray-200 rounded-md focus:border-primary focus:ring-primary transition-all font-medium bg-gray-50/30 px-3 file:mr-3 file:h-8 file:border-0 file:rounded file:bg-gray-200 file:px-3 file:text-sm"
            />
            {notice.fileUrl && (
              <a
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary font-medium hover:underline"
              >
                View current attachment
              </a>
            )}
            {state.errors?.fileUrl && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.fileUrl[0]}
              </p>
            )}
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
