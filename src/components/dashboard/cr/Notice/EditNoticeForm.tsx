"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Notice } from "@/interface/notice.interface";
import {
  updateNotice,
  type NoticeActionState,
} from "@/services/notice.service";
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
          <div className="space-y-2">
            <Label htmlFor="title">Notice Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={state.inputs?.title ?? notice.title}
              placeholder="e.g., Mid-Term Examination Schedule"
              className={state.errors?.title ? "border-red-500" : ""}
              required
            />
            {state.errors?.title && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type">Notice Type</Label>
              <Select
                name="type"
                defaultValue={state.inputs?.type ?? notice.type}
              >
                <SelectTrigger
                  className={state.errors?.type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.type[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinned">Pin Notice</Label>
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

          <div className="space-y-2">
            <Label htmlFor="content">Notice Content</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={state.inputs?.content ?? notice.content}
              placeholder="Enter the notice content here..."
              rows={6}
              required
              className={
                state.errors?.content
                  ? "border-red-500 resize-none"
                  : "resize-none"
              }
            />
            {state.errors?.content && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.content[0]}
              </p>
            )}
          </div>
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
