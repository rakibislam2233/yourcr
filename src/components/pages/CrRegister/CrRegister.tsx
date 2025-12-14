"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User2,
  School,
  Badge,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdSecurity } from "react-icons/md";

const CrRegister = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    institutionType: "", // school | college | university | polytechnic
    institutionName: "",
    department: "",
    session: "",
    shift: "",
    section: "",
    group: "",
    classLevel: "", // school or HSC
    year: "", // honours/degree/masters
    semester: "", // university/polytechnic
    batch: "", // university
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    console.log("CR Registration Data:", formData);
    router.push("/dashboard/cr");
  };

  // Group needed for Class 9-12 (school) or HSC (college)
  const needsGroup = () => {
    if (
      formData.institutionType === "school" &&
      ["9", "10", "11", "12"].includes(formData.classLevel)
    )
      return true;
    if (formData.institutionType === "college" && formData.classLevel === "hsc")
      return true;
    return false;
  };

  return (
    <div className="relative flex  w-full flex-col bg-gray-50">
      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10 md:py-16">
        <div className="w-full max-w-4xl">
          {/* Page Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Create your CR Account
            </h1>
            <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
              Join the centralized hub for academic coordination. Manage your
              class efficiently across schools, colleges, universities, and
              polytechnics.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Step 1 */}
            <div
              className={`relative flex flex-col gap-3 rounded-xl p-6 border-2 ${
                step === 1
                  ? "border-blue-600 bg-white "
                  : "border-gray-300 bg-gray-50"
              } overflow-hidden`}
            >
              {step === 1 && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
              )}
              <div className="flex items-center justify-between">
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    step === 1 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Step 1
                </p>
                <User2
                  className={step === 1 ? "text-blue-600" : "text-gray-500"}
                />
              </div>
              <p
                className={`text-lg font-bold ${
                  step === 1 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Personal Info
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`relative flex flex-col gap-3 rounded-xl p-6 border-2 ${
                step === 2
                  ? "border-blue-600 bg-white "
                  : "border-gray-300 bg-gray-50"
              } overflow-hidden`}
            >
              {step === 2 && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
              )}
              <div className="flex items-center justify-between">
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    step === 2 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Step 2
                </p>
                <School
                  className={step === 2 ? "text-blue-600" : "text-gray-500"}
                />
              </div>
              <p
                className={`text-lg font-bold ${
                  step === 2 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Academic Details
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`relative flex flex-col gap-3 rounded-xl p-6 border-2 ${
                step === 3
                  ? "border-blue-600 bg-white "
                  : "border-gray-300 bg-gray-50"
              } overflow-hidden`}
            >
              {step === 3 && (
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
              )}
              <div className="flex items-center justify-between">
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    step === 3 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Step 3
                </p>
                <MdSecurity
                  className={`size-6 ${
                    step === 3 ? "text-blue-600" : "text-gray-500"
                  }`}
                />
              </div>
              <p
                className={`text-lg font-bold ${
                  step === 3 ? "text-gray-900" : "text-gray-600"
                }`}
              >
                Account Setup
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-gray-200 bg-white  overflow-hidden">
            <div className="px-8 py-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">
                Registration Form
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-10">
              {/* Step 1: Personal Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <User className="w-6 h-6  -mt-1" />
                    <h4 className="text-base font-bold uppercase tracking-wide text-gray-900">
                      Personal Details
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="e.g. Alex Johnson"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+880 1XXX-XXXXXX"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="student@university.edu"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        Please use your official institutional email if
                        available.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="h-12 px-8 font-bold gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">
                      domain
                    </span>
                    <h4 className="text-base font-bold uppercase tracking-wide text-gray-900">
                      Academic Information
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Institution Type */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Institution Type</Label>
                      <select
                        name="institutionType"
                        value={formData.institutionType}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-white"
                        required
                      >
                        <option value="">Select type</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="university">University</option>
                        <option value="polytechnic">
                          Polytechnic Institute
                        </option>
                      </select>
                    </div>

                    {/* Institution Name */}
                    <div className="space-y-2 md:col-span-2">
                      <Label>Institution Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          name="institutionName"
                          placeholder="e.g. Dhaka College"
                          value={formData.institutionName}
                          onChange={handleChange}
                          className="pl-12 h-12"
                          required
                        />
                      </div>
                    </div>

                    {/* Dynamic Fields */}
                    {formData.institutionType === "school" && (
                      <>
                        <div className="space-y-2">
                          <Label>Class</Label>
                          <select
                            name="classLevel"
                            value={formData.classLevel}
                            onChange={handleChange}
                            className="w-full h-12 px-4 border rounded-lg"
                            required
                          >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                              (c) => (
                                <option key={c} value={c}>
                                  Class {c}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Section</Label>
                          <Input
                            name="section"
                            placeholder="e.g. A"
                            value={formData.section}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                        {needsGroup() && (
                          <div className="space-y-2">
                            <Label>Group</Label>
                            <select
                              name="group"
                              value={formData.group}
                              onChange={handleChange}
                              className="w-full h-12 px-4 border rounded-lg"
                            >
                              <option value="">Select</option>
                              <option>Science</option>
                              <option>Commerce</option>
                              <option>Arts</option>
                            </select>
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label>Shift (Optional)</Label>
                          <Input
                            name="shift"
                            placeholder="e.g. Morning"
                            value={formData.shift}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                      </>
                    )}

                    {/* Similar blocks for college, university, polytechnic (same as previous) */}
                    {/* ... (college, university, polytechnic fields same as before) */}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="h-12 px-8 font-bold gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="h-12 px-8 font-bold gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Account Setup */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">
                      lock
                    </span>
                    <h4 className="text-base font-bold uppercase tracking-wide text-gray-900">
                      Security
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 8 characters"
                          onChange={handleChange}
                          className="pl-12 pr-12 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          onChange={handleChange}
                          className="pl-12 pr-12 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(c) => setTermsAccepted(c as boolean)}
                      required
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-gray-600 cursor-pointer leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        href="#"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </Label>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="h-12 px-8 font-bold gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </Button>
                    <Button
                      type="submit"
                      className="h-12 px-10 font-bold gap-3 shadow-lg shadow-blue-600/20"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Create Account
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Help */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link
                href="#"
                className="text-blue-600 font-medium hover:underline"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrRegister;
