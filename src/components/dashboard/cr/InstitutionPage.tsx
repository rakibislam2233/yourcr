import { Button } from "@/components/ui/button";
import { UserProfile } from "@/interface/user.interface";
import {
  Building2,
  Edit,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import PageHeader from "../shared/PageHeader";

interface InstitutionPageProps {
  user: UserProfile | null;
}

const InstitutionPage: React.FC<InstitutionPageProps> = ({ user }) => {
  const institutionData = {
    name: user?.institution?.name || "N/A",
    shortName: user?.institution?.shortName || "N/A",
    type: user?.institution?.type || "Polytechnic Institute",
    establishedYear: user?.institution?.establishedYear || "N/A",
    address: user?.institution?.address || "N/A",
    phone: user?.institution?.contactPhone || "N/A",
    email: user?.institution?.contactEmail || "N/A",
    website: user?.institution?.website || "N/A",
    totalStudents: 5000, // Placeholder
    totalDepartments: 12, // Placeholder
  };

  const classInfo = {
    department: user?.currentBatch?.department || "N/A",
    academicYear: user?.currentBatch?.academicYear || "N/A",
    semester: user?.currentBatch?.semester,
    session: user?.currentBatch?.session || "N/A",
    shift: user?.currentBatch?.shift,
    group: user?.currentBatch?.group,
  };
  return (
    <section className="w-full space-y-6">
      <PageHeader
        title="My Institution"
        description="View and manage your institution details"
        icon={<Building2 className="w-6 h-6" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution" },
        ]}
        action={
          <Link href="/dashboard/cr/institution/edit">
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Details
            </Button>
          </Link>
        }
      />
      {/* Institution Overview Card */}
      <div className="bg-linear-to-r from-primary to-primary/80 rounded-md p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Building2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{institutionData.name}</h2>
              <p className="text-white/80 mt-1">{institutionData.type}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  Est. {institutionData.establishedYear}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={
                institutionData.website.startsWith("http")
                  ? institutionData.website
                  : `https://${institutionData.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                className="gap-2 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Globe className="w-4 h-4" />
                Visit Website
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-md">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">
                  {institutionData.address}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-green-100 text-green-600 rounded-md">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {institutionData.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-purple-100 text-purple-600 rounded-md">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {institutionData.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-orange-100 text-orange-600 rounded-md">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium text-gray-900">
                  {institutionData.website}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Class Info */}
        <div className="bg-white rounded-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Class Information
            </h3>
            <Link href="/dashboard/cr/profile">
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-gray-900 mt-1">
                {classInfo.department}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Academic Year</p>
              <p className="font-semibold text-gray-900 mt-1">
                {classInfo.academicYear}
              </p>
            </div>
            {classInfo.semester && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Semester</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {classInfo.semester}
                </p>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Session</p>
              <p className="font-semibold text-gray-900 mt-1">
                {classInfo.session}
              </p>
            </div>
            {classInfo.shift && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Shift</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {classInfo.shift}
                </p>
              </div>
            )}
            {classInfo.group && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Group / Class</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {classInfo.group}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionPage;
