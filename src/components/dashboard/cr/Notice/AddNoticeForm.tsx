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
import {
  createNotice,
  type NoticeActionState,
} from "@/services/notice.service";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
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

const AddNoticeForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createNotice,
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Notice Title
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="title"
                name="title"
                defaultValue={state.inputs?.title}
                placeholder="e.g., Mid-Term Examination Schedule"
                required
                className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary bg-gray-50/30 transition-all font-medium ${
                  state.errors?.title ? "border-red-500" : ""
                }`}
              />
            </div>
            {state.errors?.title && (
              <p className="text-red-500 text-xs mt-1">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="type"
                className="text-sm font-semibold text-gray-700"
              >
                Notice Type
              </Label>
              <Select
                name="type"
                defaultValue={state.inputs?.type ?? "general"}
              >
                <SelectTrigger
                  className={`h-12 bg-gray-50/30 border-gray-200 font-medium ${
                    state.errors?.type ? "border-red-500" : ""
                  }`}
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

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="pinned"
                className="text-sm font-semibold text-gray-700"
              >
                Pin Notice
              </Label>
              <div className="flex items-center gap-3 h-12">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="pinned"
                    name="pinned"
                    value="true"
                    defaultChecked={state.inputs?.pinned === "true"}
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

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="content"
              className="text-sm font-semibold text-gray-700"
            >
              Notice Content
            </Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={state.inputs?.content}
              placeholder="Enter the notice content here..."
              rows={6}
              required
              className={`bg-gray-50/30 resize-none transition-all font-medium ${
                state.errors?.content ? "border-red-500" : ""
              }`}
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
            {isPending ? "Creating..." : "Create Notice"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNoticeForm;
