"use client";

import PageHeader from "@/components/dashboard/shared/PageHeader";
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
  getNoticeById,
  updateNotice,
  type Notice,
  type NoticeActionState,
} from "@/services/notice.service";
import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
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

export default function EditNoticePage() {
  const router = useRouter();
  const params = useParams();
  const noticeId = params?.id as string;

  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  const updateNoticeWithId = updateNotice.bind(null, noticeId);
  const [state, formAction, isPending] = useActionState(
    updateNoticeWithId,
    initialState,
  );

  useEffect(() => {
    async function fetchNotice() {
      try {
        const res = await getNoticeById(noticeId);
        if (res.success && res.data) {
          setNotice(res.data);
        } else {
          toast.error("Failed to load notice details");
          router.push("/dashboard/cr/notices");
        }
      } catch {
        toast.error("An error occurred while fetching notice");
      } finally {
        setLoading(false);
      }
    }
    fetchNotice();
  }, [noticeId, router]);

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

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading notice details...
      </div>
    );
  }

  if (!notice) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Notice"
        description="Update notice information"
        icon={<Bell />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Notices", href: "/dashboard/cr/notices" },
          { label: "Edit Notice" },
        ]}
        action={
          <Link href="/dashboard/cr/notices">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

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
                      defaultChecked={state.inputs?.pinned ?? notice.pinned}
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
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
