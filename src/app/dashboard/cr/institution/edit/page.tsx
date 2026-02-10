"use client";

import React, { useState } from "react";
import { Building2, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditInstitutionPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Dhaka Polytechnic Institute",
    shortName: "DPI",
    type: "Polytechnic Institute",
    establishedYear: "1955",
    address: "Tejgaon Industrial Area, Dhaka-1208, Bangladesh",
    phone: "+880-2-8870553",
    email: "info@dpi.gov.bd",
    website: "www.dpi.gov.bd",
    department: "Computer Technology",
    semester: "8th Semester",
    session: "2020-2024",
    shift: "1st Shift",
    group: "A",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating institution:", formData);
    router.push("/dashboard/cr/institution");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Institution"
        description="Update your institution and class details"
        icon={<Building2 />}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/cr" },
          { label: "My Institution", href: "/dashboard/cr/institution" },
          { label: "Edit" },
        ]}
        action={
          <Link href="/dashboard/cr/institution">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Institution Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                value={formData.shortName}
                onChange={(e) =>
                  setFormData({ ...formData, shortName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="establishedYear">Established Year</Label>
              <Input
                id="establishedYear"
                type="number"
                value={formData.establishedYear}
                onChange={(e) =>
                  setFormData({ ...formData, establishedYear: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Class Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Class Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Input
                id="session"
                value={formData.session}
                onChange={(e) =>
                  setFormData({ ...formData, session: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift">Shift</Label>
              <Input
                id="shift"
                value={formData.shift}
                onChange={(e) =>
                  setFormData({ ...formData, shift: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Input
                id="group"
                value={formData.group}
                onChange={(e) =>
                  setFormData({ ...formData, group: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/dashboard/cr/institution" className="flex-1">
            <Button type="button" variant="outline" className="w-full">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
