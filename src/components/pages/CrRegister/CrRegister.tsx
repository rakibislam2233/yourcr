"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Lock,
  Building2,
  BookOpen,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const CrRegister = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Step 2 - Institution Info
    institutionName: "",
    institutionType: "",
    // School fields
    className: "",
    section: "",
    group: "",
    // College fields
    collegeLevel: "",
    collegeYear: "",
    // University/Polytechnic/College fields
    department: "",
    semester: "",
    year: "",
    // Common fields
    session: "",
    shift: "",
    batch: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset dependent fields when institution type changes
    if (name === "institutionType") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        className: "",
        section: "",
        group: "",
        collegeLevel: "",
        collegeYear: "",
        department: "",
        semester: "",
        year: "",
        shift: "",
        batch: "",
      }));
    }

    // Reset college fields when level changes
    if (name === "collegeLevel") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        collegeYear: "",
        department: "",
        group: "",
      }));
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    router.push("/dashboard/cr");
  };

  // Helper function to check if a class needs group selection (9-12)
  const needsGroup = () => {
    const cls = formData.className;
    return ["9", "10", "11", "12"].includes(cls);
  };

  // Render institution-specific fields
  const renderInstitutionFields = () => {
    switch (formData.institutionType) {
      case "school":
        return (
          <>
            {/* Class */}
            <div className="space-y-2">
              <Label
                htmlFor="className"
                className="text-gray-700 text-sm sm:text-base"
              >
                Class <span className="text-red-500">*</span>
              </Label>
              <select
                id="className"
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                required
              >
                <option value="">Select class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Class {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="section"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Section <span className="text-red-500">*</span>
                </Label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                >
                  <option value="">Select section</option>
                  {["A", "B", "C", "D", "E", "F", "G", "H"].map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Group (only for class 9-12) */}
              {needsGroup() && (
                <div className="space-y-2">
                  <Label
                    htmlFor="group"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Group <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                    required
                  >
                    <option value="">Select group</option>
                    <option value="science">Science</option>
                    <option value="commerce">Commerce</option>
                    <option value="arts">Arts</option>
                  </select>
                </div>
              )}
            </div>

            {/* Shift (optional) */}
            <div className="space-y-2">
              <Label
                htmlFor="shift"
                className="text-gray-700 text-sm sm:text-base"
              >
                Shift <span className="text-gray-400 text-xs">(optional)</span>
              </Label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="">Select shift</option>
                <option value="morning">Morning</option>
                <option value="day">Day</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </>
        );

      case "college":
        return (
          <>
            {/* College Level */}
            <div className="space-y-2">
              <Label
                htmlFor="collegeLevel"
                className="text-gray-700 text-sm sm:text-base"
              >
                Level / Program <span className="text-red-500">*</span>
              </Label>
              <select
                id="collegeLevel"
                name="collegeLevel"
                value={formData.collegeLevel}
                onChange={handleChange}
                className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                required
              >
                <option value="">Select level</option>
                <option value="hsc">HSC (Higher Secondary)</option>
                <option value="degree">Degree (Pass)</option>
                <option value="honours">Honours</option>
                <option value="masters">Masters</option>
              </select>
            </div>

            {/* HSC specific fields */}
            {formData.collegeLevel === "hsc" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* HSC Year */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="collegeYear"
                      className="text-gray-700 text-sm sm:text-base"
                    >
                      Year <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="collegeYear"
                      name="collegeYear"
                      value={formData.collegeYear}
                      onChange={handleChange}
                      className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      required
                    >
                      <option value="">Select year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                    </select>
                  </div>

                  {/* Group */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="group"
                      className="text-gray-700 text-sm sm:text-base"
                    >
                      Group <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="group"
                      name="group"
                      value={formData.group}
                      onChange={handleChange}
                      className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      required
                    >
                      <option value="">Select group</option>
                      <option value="science">Science</option>
                      <option value="commerce">Commerce</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>
                </div>

                {/* Section */}
                <div className="space-y-2">
                  <Label
                    htmlFor="section"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Section{" "}
                    <span className="text-gray-400 text-xs">(optional)</span>
                  </Label>
                  <select
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    <option value="">Select section</option>
                    {["A", "B", "C", "D", "E", "F"].map((sec) => (
                      <option key={sec} value={sec}>
                        Section {sec}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Degree/Honours/Masters specific fields */}
            {["degree", "honours", "masters"].includes(
              formData.collegeLevel
            ) && (
              <>
                {/* Department */}
                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Department <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="department"
                      name="department"
                      type="text"
                      placeholder="e.g., English, BBA, Political Science"
                      value={formData.department}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Year */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="year"
                      className="text-gray-700 text-sm sm:text-base"
                    >
                      Year <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                      required
                    >
                      <option value="">Select year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      {formData.collegeLevel === "honours" && (
                        <option value="4th">4th Year</option>
                      )}
                      {formData.collegeLevel === "masters" && (
                        <>
                          <option value="preliminary">Preliminary</option>
                          <option value="final">Final</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Session */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="session"
                      className="text-gray-700 text-sm sm:text-base"
                    >
                      Session <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="session"
                      name="session"
                      type="text"
                      placeholder="e.g., 2022-2023"
                      value={formData.session}
                      onChange={handleChange}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Shift (optional) */}
            <div className="space-y-2">
              <Label
                htmlFor="shift"
                className="text-gray-700 text-sm sm:text-base"
              >
                Shift <span className="text-gray-400 text-xs">(optional)</span>
              </Label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="">Select shift</option>
                <option value="morning">Morning</option>
                <option value="day">Day</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </>
        );

      case "university":
        return (
          <>
            {/* Department */}
            <div className="space-y-2">
              <Label
                htmlFor="department"
                className="text-gray-700 text-sm sm:text-base"
              >
                Department <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="e.g., Computer Science & Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Semester */}
              <div className="space-y-2">
                <Label
                  htmlFor="semester"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Semester <span className="text-red-500">*</span>
                </Label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                >
                  <option value="">Select semester</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1}`}>
                      {i + 1}
                      {i === 0
                        ? "st"
                        : i === 1
                        ? "nd"
                        : i === 2
                        ? "rd"
                        : "th"}{" "}
                      Semester
                    </option>
                  ))}
                </select>
              </div>

              {/* Section */}
              <div className="space-y-2">
                <Label
                  htmlFor="section"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Section{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </Label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                >
                  <option value="">Select section</option>
                  {["A", "B", "C", "D"].map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Batch */}
            <div className="space-y-2">
              <Label
                htmlFor="batch"
                className="text-gray-700 text-sm sm:text-base"
              >
                Batch <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Users className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="batch"
                  name="batch"
                  type="text"
                  placeholder="e.g., 60th, Batch-22"
                  value={formData.batch}
                  onChange={handleChange}
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </>
        );

      case "polytechnic":
        return (
          <>
            {/* Department/Technology */}
            <div className="space-y-2">
              <Label
                htmlFor="department"
                className="text-gray-700 text-sm sm:text-base"
              >
                Department / Technology <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BookOpen className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="department"
                  name="department"
                  type="text"
                  placeholder="e.g., Computer Technology"
                  value={formData.department}
                  onChange={handleChange}
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Semester */}
              <div className="space-y-2">
                <Label
                  htmlFor="semester"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Semester <span className="text-red-500">*</span>
                </Label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                >
                  <option value="">Select semester</option>
                  {[...Array(8)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1}`}>
                      {i + 1}
                      {i === 0
                        ? "st"
                        : i === 1
                        ? "nd"
                        : i === 2
                        ? "rd"
                        : "th"}{" "}
                      Semester
                    </option>
                  ))}
                </select>
              </div>

              {/* Shift */}
              <div className="space-y-2">
                <Label
                  htmlFor="shift"
                  className="text-gray-700 text-sm sm:text-base"
                >
                  Shift <span className="text-red-500">*</span>
                </Label>
                <select
                  id="shift"
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  required
                >
                  <option value="">Select shift</option>
                  <option value="1st">1st Shift</option>
                  <option value="2nd">2nd Shift</option>
                </select>
              </div>
            </div>

            {/* Session */}
            <div className="space-y-2">
              <Label
                htmlFor="session"
                className="text-gray-700 text-sm sm:text-base"
              >
                Session <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <Input
                  id="session"
                  name="session"
                  type="text"
                  placeholder="e.g., 2022-2023"
                  value={formData.session}
                  onChange={handleChange}
                  className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                  required
                />
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Please select an institution type above</p>
          </div>
        );
    }
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-full max-w-3xl bg-white rounded-2xl sm:rounded-2xl  border border-gray-100 p-6 sm:p-8">
        <Image src={logo} alt="logo" className="w-40 h-auto mb-8 mx-auto" />
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter your email and we&apos;ll send you a link to reset your password
        </p>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="fullName"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <Button
                type="button"
                onClick={handleNext}
                className="w-full h-12 sm:h-14 text-base cursor-pointer gap-2 mt-4"
              >
                Continue to Institution Info
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Institution Information */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Institution Information
              </h2>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Institution Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="institutionName"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Institution Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <Input
                      id="institutionName"
                      name="institutionName"
                      type="text"
                      placeholder="e.g., Dhaka Polytechnic Institute"
                      value={formData.institutionName}
                      onChange={handleChange}
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Institution Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="institutionType"
                    className="text-gray-700 text-sm sm:text-base"
                  >
                    Institution Type <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="institutionType"
                    name="institutionType"
                    value={formData.institutionType}
                    onChange={handleChange}
                    className="w-full h-11 sm:h-12 px-4 border border-gray-200 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                    required
                  >
                    <option value="">Select institution type</option>
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="polytechnic">Polytechnic Institute</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Institution-specific Fields */}
              {renderInstitutionFields()}

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-gray-600 leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="w-full sm:w-auto h-12 sm:h-14 px-6 text-base font-medium gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full flex-1 h-12 sm:h-14 text-base cursor-pointer gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Create CR Account
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Sign In Link */}
        <div className="mt-6 sm:mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-sm sm:text-base text-gray-600">
            Already have a CR account?{" "}
            <Link
              href="/auth/cr-login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CrRegister;
