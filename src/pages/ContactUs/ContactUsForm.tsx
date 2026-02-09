"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ContactActionState,
  submitContactForm,
} from "@/services/contact.service";
import { Mail, MessageSquare, Phone, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: ContactActionState = {
  success: false,
  message: "",
  inputs: {
    fullName: "",
    email: "",
    phone: "",
    description: "",
  },
};

const ContactUsForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="p-6 md:p-10 space-y-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="fullName"
            name="fullName"
            placeholder="e.g. Rahul Islam"
            defaultValue={state.inputs?.fullName}
            className={`pl-12 h-12 border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.fullName
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
        </div>
        {state.errors?.fullName && (
          <p className="text-sm text-red-500 mt-1">
            {state.errors.fullName[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            defaultValue={state.inputs?.email}
            className={`pl-12 h-12 border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.email
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
        </div>
        {state.errors?.email && (
          <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="phone"
            name="phone"
            placeholder="01XXXXXXXXX"
            defaultValue={state.inputs?.phone}
            className={`pl-12 h-12 border-gray-300 focus:border-primary focus:ring-primary ${
              state.errors?.phone
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
        </div>
        {state.errors?.phone && (
          <p className="text-sm text-red-500 mt-1">{state.errors.phone[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Message/Description</Label>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          <Textarea
            id="description"
            name="description"
            placeholder="How can we help you?"
            rows={4}
            defaultValue={state.inputs?.description}
            className={`pl-12 pt-3 border-gray-300 focus:border-primary focus:ring-primary resize-none ${
              state.errors?.description
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
        </div>
        {state.errors?.description && (
          <p className="text-sm text-red-500 mt-1">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-bold bg-primary hover:bg-blue-700 cursor-pointer "
        disabled={isPending}
      >
        {isPending ? "Sending Message..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactUsForm;
