"use client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { UserProfile } from "@/interface/user.interface";
import { updateMyProfile } from "@/services/user.service";
import {
    Building2,
    Camera,
    GraduationCap,
    Lock,
    Mail,
    Phone,
    Save,
    Settings,
    Shield,
    User,
} from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PageHeader from "../shared/PageHeader";

interface ProfileSettingsProps {
  user: UserProfile | null;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await updateMyProfile({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
      });
      await router.refresh();
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="p-12 text-center font-bold text-gray-400 animate-pulse uppercase tracking-widest">
        Syncing CR Profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <PageHeader
        title="Profile Settings"
        description="Manage your CR account and institutional sync"
        icon={<Settings />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "Profile Settings" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <div className="w-28 h-28 bg-linear-to-br from-primary to-blue-600 rounded-md flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-transform group-hover:scale-105">
                  {user?.profileImage ? (
                    <NextImage
                      src={user.profileImage}
                      alt={user.fullName}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    user?.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2) || "CR"
                  )}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-md border border-gray-200 shadow-md hover:bg-gray-50 transition-all active:scale-90">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-6 leading-tight">
                {user?.fullName}
              </h3>
              <p className="text-primary  text-[10px] uppercase tracking-[0.2em] mt-2 bg-primary/5 px-2 py-1 rounded">
                Class Representative
              </p>

              <div className="w-full mt-8 pt-6 border-t border-gray-100 space-y-4 text-left">
                <div className="flex items-center gap-4 group">
                  <div className="size-9 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-primary/5 transition-colors">
                    <Mail className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Email Address
                    </p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="size-9 rounded-md bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-primary/5 transition-colors">
                    <Phone className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {user?.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Info Card */}
          <div className="bg-white rounded-md border border-gray-100 p-6 mt-6 shadow-sm">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-5 border-b border-gray-50 pb-2">
              Institutional Details
            </h4>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="size-9 rounded-md bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
                  <Building2 className="size-4.5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Institution
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user?.institution?.name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="size-9 rounded-md bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                  <GraduationCap className="size-4.5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Department / Batch
                  </p>
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user?.currentBatch?.department || "N/A"}
                    <span className="block text-xs font-medium text-gray-500 mt-0.5">
                      {user?.currentBatch?.session}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Forms Container */}
        <div className="lg:col-span-2 space-y-6">
          <form
            onSubmit={handleUpdateProfile}
            className="bg-white rounded-md border border-gray-100 p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-none mb-1.5">
                  Personal Identity
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Update your public profile and contact info
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormInput
                label="Full Name"
                icon={User}
                value={formData.fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Full Name"
                className="border-gray-200 focus:border-primary focus:ring-primary bg-gray-50/30"
              />

              <FormInput
                type="tel"
                label="Phone Number"
                icon={Phone}
                value={formData.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                placeholder="Phone Number"
                className="border-gray-200 focus:border-primary focus:ring-primary bg-gray-50/30"
              />

              <FormInput
                type="email"
                label="Email Address (Locked)"
                icon={Mail}
                value={formData.email}
                disabled
                className="border-gray-100 bg-gray-50/50 text-gray-400 font-medium cursor-not-allowed"
              />

              <FormInput
                label="System Role"
                icon={Shield}
                value={user?.role || "CR"}
                disabled
                className="border-gray-100 bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider cursor-not-allowed"
              />
            </div>

            <div className="mt-10 flex justify-end">
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-11 px-10 font-bold bg-primary hover:bg-black text-white rounded-md flex gap-2 active:scale-95 transition-all shadow-md shadow-primary/10"
              >
                {isUpdating ? (
                  "Syncing..."
                ) : (
                  <>
                    <Save className="w-4 h-4" /> Update CR Profile
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Security Management */}
          <div className="bg-white rounded-md border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-none mb-1.5">
                  Security & Access
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Protect your account with a strong password
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <FormInput
                type="password"
                label="Current Password"
                icon={Lock}
                placeholder="Verify current identity"
                className="border-gray-200 focus:border-amber-500 font-medium"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormInput
                  type="password"
                  label="New Password"
                  icon={Lock}
                  placeholder="At least 8 characters"
                  className="border-gray-200 focus:border-amber-500 font-medium"
                />

                <FormInput
                  type="password"
                  label="Confirm Password"
                  icon={Shield}
                  placeholder="Repeat new password"
                  className="border-gray-200 focus:border-amber-500 font-medium"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <Button
                variant="outline"
                className="h-11 px-10 font-bold border-gray-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 rounded-md flex gap-2 active:scale-95 transition-all"
              >
                <Shield className="w-4 h-4" />
                Sync New Credentials
              </Button>
            </div>
          </div>

          {/* Critical Actions */}
          <div className="bg-red-50/40 rounded-md border border-red-100 p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-md">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-red-700 uppercase tracking-tighter">
                Deactivate CR Portal
              </h3>
            </div>
            <p className="text-red-800/60 text-sm mb-8 font-medium leading-relaxed">
              Caution: This will permanently delete your institutional access,
              all student records you manage, and reset your CR status. This
              action is irreversible.
            </p>
            <Button
              variant="outline"
              className="h-11 px-8 font-bold text-red-600 border-red-200 bg-white hover:bg-red-600 hover:text-white transition-all rounded-md shadow-sm"
            >
              Confirm Permanent Deletion
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
