import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Student from "@/interface/student.interface";
import { Edit, MoreVertical, Phone, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import studentCard from "@/assets/students/student-card.png";

interface StudentCardProps {
  student: Student;
  onDelete?: (student: Student) => void;
}

const StudentCard = ({ student, onDelete }: StudentCardProps) => {
  return (
    <Card className="w-full shadow-none relative overflow-hidden rounded-md border-gray-100 group">
      {/* Background Image - Card er upore */}
      <div className="absolute inset-0 z-0">
        <Image src={studentCard} alt="Student card background" fill />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 rounded-md border-2 border-white shadow-sm">
            <AvatarImage src={student.profileImage} alt={student.fullName} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold rounded-md">
              {student.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg leading-none text-gray-900">
              {student.fullName}
            </h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="h-8 w-8 p-0 rounded-md bg-primary text-white">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-md">
            <DropdownMenuItem asChild className="rounded-md">
              <Link
                href={`/dashboard/cr/students/${student.id}/edit`}
                className="cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(student)}
              className="text-red-600 focus:text-red-600 cursor-pointer rounded-md"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid gap-2 text-sm mt-2">
          <div className="flex items-center gap-2">
            <span className="font-medium min-w-[80px]">Student ID:</span>
            <span className="bg-secondary/20 px-2 py-0.5 rounded-md text-xs font-mono">
              {student.studentId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium min-w-[80px]">Phone:</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{student.phoneNumber}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium min-w-[80px]">Status:</span>
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium capitalize ${
                student.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {student.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
