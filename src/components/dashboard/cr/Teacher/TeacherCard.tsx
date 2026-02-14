import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Teacher } from "@/interface/teacher.interface";
import {
  BookOpen,
  Edit,
  Mail,
  MoreVertical,
  Phone,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import studentCard from "@/assets/students/student-card.png";
import Image from "next/image";

interface TeacherCardProps {
  teacher: Teacher;
  onDelete?: (teacher: Teacher) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onDelete }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="shadow-none relative overflow-hidden rounded-md border-gray-100 group">
      {/* Background Image - Card er upore */}
      <div className="absolute inset-0 z-0">
        <Image src={studentCard} alt="Student card background" fill />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 rounded-md border-2 border-white shadow-sm">
            <AvatarImage
              src={teacher?.photoUrl}
              alt={teacher.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-md">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {teacher.name}
            </h3>
            <p className="text-sm text-primary font-medium truncate">
              {teacher.designation}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {teacher.department}
            </p>
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
                href={`/dashboard/cr/teachers/${teacher.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(teacher)}
              className="text-red-600 focus:text-red-600 cursor-pointer rounded-md"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-4 pt-4 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="p-1.5 bg-gray-100 rounded-md shrink-0">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <span className="truncate">{teacher.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="p-1.5 bg-gray-100 rounded-md shrink-0">
              <Phone className="w-3.5 h-3.5 text-gray-500" />
            </div>
            <span className="truncate">{teacher.phone}</span>
          </div>
        </div>

        {teacher.subjects && teacher.subjects.length > 0 && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subjects
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {teacher.subjects.slice(0, 3).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-primary/5 text-primary text-xs font-medium rounded-md truncate max-w-[120px]"
                >
                  {subject}
                </span>
              ))}
              {teacher.subjects.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-md">
                  +{teacher.subjects.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeacherCard;
