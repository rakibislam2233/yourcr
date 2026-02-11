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
import {
  getSubjectById,
  updateSubject,
  type Subject,
  type SubjectActionState,
} from "@/services/subject.service";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const typeOptions = ["Theory", "Theory + Lab", "Lab", "Project"];

const colorOptions = [
  { value: "bg-blue-500", label: "Blue" },
  { value: "bg-green-500", label: "Green" },
  { value: "bg-purple-500", label: "Purple" },
  { value: "bg-orange-500", label: "Orange" },
  { value: "bg-pink-500", label: "Pink" },
  { value: "bg-cyan-500", label: "Cyan" },
  { value: "bg-amber-500", label: "Amber" },
  { value: "bg-red-500", label: "Red" },
];

const initialState: SubjectActionState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
  timestamp: 0,
};

export default function EditSubjectPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params?.id as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  const updateSubjectWithId = updateSubject.bind(null, subjectId);
  const [state, formAction, isPending] = useActionState(
    updateSubjectWithId,
    initialState,
  );

  useEffect(() => {
    async function fetchSubject() {
      try {
        const res = await getSubjectById(subjectId);
        if (res.success && res.data) {
          setSubject(res.data);
        } else {
          toast.error("Failed to load subject");
          router.push("/dashboard/cr/subjects");
        }
      } catch {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchSubject();
  }, [subjectId, router]);

  useEffect(() => {
    if (state.timestamp && state.timestamp > 0) {
      if (state.success) {
        toast.success(state.message);
        router.push("/dashboard/cr/subjects");
      } else if (state.message && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading subject details...
      </div>
    );
  }

  if (!subject) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Subject"
        description="Update subject information"
        icon={<BookOpen />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Manage Subjects", href: "/dashboard/cr/subjects" },
          { label: "Edit Subject" },
        ]}
        action={
          <Link href="/dashboard/cr/subjects">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                name="code"
                defaultValue={state.inputs?.code ?? subject.code}
                placeholder="e.g., CSE-401"
                required
                className={state.errors?.code ? "border-red-500" : ""}
              />
              {state.errors?.code && (
                <p className="text-xs text-red-500">{state.errors.code[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={state.inputs?.name ?? subject.name}
                placeholder="e.g., Database Management System"
                required
                className={state.errors?.name ? "border-red-500" : ""}
              />
              {state.errors?.name && (
                <p className="text-xs text-red-500">{state.errors.name[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                name="teacher"
                defaultValue={state.inputs?.teacher ?? subject.teacher}
                placeholder="e.g., Dr. Kamal Ahmed"
                required
                className={state.errors?.teacher ? "border-red-500" : ""}
              />
              {state.errors?.teacher && (
                <p className="text-xs text-red-500">
                  {state.errors.teacher[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                name="credits"
                type="number"
                min={0}
                max={10}
                defaultValue={state.inputs?.credits ?? subject.credits}
                required
                className={state.errors?.credits ? "border-red-500" : ""}
              />
              {state.errors?.credits && (
                <p className="text-xs text-red-500">
                  {state.errors.credits[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                defaultValue={state.inputs?.type ?? subject.type}
              >
                <SelectTrigger
                  className={state.errors?.type ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.type && (
                <p className="text-xs text-red-500">{state.errors.type[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select
                name="color"
                defaultValue={state.inputs?.color ?? subject.color}
              >
                <SelectTrigger
                  className={state.errors?.color ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.color && (
                <p className="text-xs text-red-500">{state.errors.color[0]}</p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                name="schedule"
                defaultValue={state.inputs?.schedule ?? subject.schedule}
                placeholder="e.g., Sun, Tue - 10:00 AM"
                className={state.errors?.schedule ? "border-red-500" : ""}
              />
              {state.errors?.schedule && (
                <p className="text-xs text-red-500">
                  {state.errors.schedule[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Link href="/dashboard/cr/subjects" className="flex-1">
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
