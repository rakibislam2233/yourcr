import React from "react";

const ContactUsForm = () => {
  return (
    <div className="p-6 md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="fullName" className="text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            className="mt-1.5 h-11"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="mt-1.5 h-11"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="+880 1X XXX XXXX"
            className="mt-1.5 h-11"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="text-gray-700">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us how we can help you..."
            rows={4}
            className="mt-1.5 resize-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary cursor-pointer text-white font-medium mt-2"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactUsForm;
