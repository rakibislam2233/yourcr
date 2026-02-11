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
import { createClass, type ClassActionState } from "@/services/class.service";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Link as LinkIcon,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const platformOptions = ["Google Meet", "Zoom", "Microsoft Teams", "Other"];

const initialState: ClassActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

export default function AddClassPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createClass,
    initialState,
  );

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/classes");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule New Class"
        description="Schedule an online class"
        icon={<Video />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Classes", href: "/dashboard/cr/classes" },
          { label: "Schedule Class" },
        ]}
        action={
          <Link href="/dashboard/cr/classes">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="subject"
                className="text-sm font-semibold text-gray-700"
              >
                Subject
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="subject"
                  name="subject"
                  defaultValue={state.inputs?.subject}
                  placeholder="e.g., Database Management System"
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.subject ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.subject && (
                <p className="text-xs text-red-500">
                  {state.errors.subject[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="teacher"
                className="text-sm font-semibold text-gray-700"
              >
                Teacher
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="teacher"
                  name="teacher"
                  defaultValue={state.inputs?.teacher}
                  placeholder="e.g., Dr. Kamal Ahmed"
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.teacher ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.teacher && (
                <p className="text-xs text-red-500">
                  {state.errors.teacher[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="date"
                className="text-sm font-semibold text-gray-700"
              >
                Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={state.inputs?.date}
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.date ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.date && (
                <p className="text-xs text-red-500">{state.errors.date[0]}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="platform"
                className="text-sm font-semibold text-gray-700"
              >
                Platform
              </Label>
              <Select
                name="platform"
                defaultValue={state.inputs?.platform ?? "Google Meet"}
              >
                <SelectTrigger
                  className={`h-12 border-gray-200 ${state.errors?.platform ? "border-red-500" : "bg-gray-50/30"} font-medium`}
                >
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.platform && (
                <p className="text-xs text-red-500">
                  {state.errors.platform[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="startTime"
                className="text-sm font-semibold text-gray-700"
              >
                Start Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  defaultValue={state.inputs?.startTime}
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.startTime ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.startTime && (
                <p className="text-xs text-red-500">
                  {state.errors.startTime[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="endTime"
                className="text-sm font-semibold text-gray-700"
              >
                End Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  defaultValue={state.inputs?.endTime}
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.endTime ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.endTime && (
                <p className="text-xs text-red-500">
                  {state.errors.endTime[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <Label
                htmlFor="link"
                className="text-sm font-semibold text-gray-700"
              >
                Meeting Link
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="link"
                  name="link"
                  defaultValue={state.inputs?.link}
                  placeholder="e.g., https://meet.google.com/xxx-xxxx-xxx"
                  required
                  className={`pl-10 h-12 text-base border-gray-200 rounded-md focus:border-primary focus:ring-primary ${
                    state.errors?.link ? "border-red-500" : "bg-gray-50/30"
                  } transition-all font-medium`}
                />
              </div>
              {state.errors?.link && (
                <p className="text-xs text-red-500">{state.errors.link[0]}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/classes" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? "Scheduling Class..." : "Schedule Class"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
