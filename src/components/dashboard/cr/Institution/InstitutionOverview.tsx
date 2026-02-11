import { Button } from "@/components/ui/button";
import { Batch } from "@/interface/batch.interface";
import { Institution } from "@/interface/instituion.interface";
import {
  Building2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";

const InstitutionOverview = ({
  institutionData,
  batchInfo,
}: {
  institutionData: Partial<Institution>;
  batchInfo: Partial<Batch>;
}) => {
  return (
    <section className="w-full">
      {/* Institution Overview Card */}
      <div className="bg-linear-to-r from-primary to-primary/80 rounded-md p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {institutionData?.logo ? (
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                <Image
                  src={institutionData?.logo}
                  alt={institutionData?.name || "Institution Logo"}
                  width={80}
                  height={80}
                  className="rounded-2xl"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <Building2 className="w-10 h-10" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{institutionData?.name}</h2>
              <p className="text-white/80 mt-1">{institutionData?.type}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  Est. {institutionData?.establishedYear || "N/A"}
                </span>
              </div>
            </div>
          </div>
          {institutionData?.website && (
            <div className="flex gap-3">
              <a
                href={
                  institutionData?.website?.startsWith("http")
                    ? institutionData?.website
                    : `https://${institutionData?.website}`
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
          )}
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
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">
                  {institutionData?.address || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-green-100 text-green-600 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {institutionData?.contactPhone || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-purple-100 text-purple-600 rounded-lg">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {institutionData?.contactEmail || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-md">
              <div className="p-2.5 bg-orange-100 text-orange-600 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium text-gray-900">
                  {institutionData?.website || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Class Info */}
        <div className="bg-white rounded-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Batch Information
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-semibold text-gray-900 mt-1">
                {batchInfo?.department || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Academic Year</p>
              <p className="font-semibold text-gray-900 mt-1">
                {batchInfo?.academicYear || "N/A"}
              </p>
            </div>
            {batchInfo?.semester && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Semester</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {batchInfo?.semester || "N/A"}
                </p>
              </div>
            )}
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Session</p>
              <p className="font-semibold text-gray-900 mt-1">
                {batchInfo?.session || "N/A"}
              </p>
            </div>
            {batchInfo?.shift && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Shift</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {batchInfo?.shift}
                </p>
              </div>
            )}
            {batchInfo?.group && (
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">Group / Class</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {batchInfo?.group}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionOverview;
