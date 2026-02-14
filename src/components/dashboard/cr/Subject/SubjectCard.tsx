import studentCard from "@/assets/students/student-card.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subject } from "@/interface/subject.interface";
import {
  BookOpen,
  BookOpenText,
  Building2,
  CreditCard,
  Edit,
  MoreVertical,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SubjectCardProps {
  subject: Subject;
  onDelete?: (subject: Subject) => void;
}

const SubjectCard = ({ subject, onDelete }: SubjectCardProps) => {
  return (
    <Card className="shadow-none relative overflow-hidden rounded-md border-gray-100 group">
      {/* Background Image - Card er upore */}
      <div className="absolute inset-0 z-0">
        <Image src={studentCard} alt="Subject card background" fill />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 rounded-md border-2 border-white shadow-sm bg-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-md">
              <BookOpen className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {subject?.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-md">
                {subject?.credit} Credits
              </span>
              {subject?.isDepartmental && (
                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-md">
                  Departmental
                </span>
              )}
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="h-8 w-8 p-0 rounded-md bg-primary text-white"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-md">
            <DropdownMenuItem asChild className="rounded-md">
              <Link
                href={`/dashboard/cr/subjects/${subject.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(subject)}
              className="text-red-600 focus:text-red-600 cursor-pointer rounded-md"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 relative z-10">
        <div className="flex flex-col gap-2">
          {/* Teacher Name */}
          <div className="flex items-center gap-3  text-gray-600">
            <span className="font-medium">Teacher Name:</span>
            <span className="truncate">
              {subject?.teacher?.name || "Assigned Teacher"}
            </span>
          </div>
          {/* Subject Code */}
          <div className="flex items-center gap-3  text-gray-600">
            <span className="font-medium">Subject Code:</span>
            <span className="truncate">{subject?.code}</span>
          </div>
          {/* Credit */}
          <div className="flex items-center gap-3  text-gray-600">
            <span className="font-medium">Credit:</span>
            <span className="truncate">{subject?.credit}</span>
          </div>
          {/* Room Number */}
          <div className="flex items-center gap-3  text-gray-600">
            <span className="font-medium">Room Number:</span>
            <span className="truncate">{subject?.roomNumber || "N/A"}</span>
          </div>
        </div>

        {subject?.description && (
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="size-4 text-primary" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </span>
            </div>
            <p className=" text-gray-600 line-clamp-3">
              {subject?.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
