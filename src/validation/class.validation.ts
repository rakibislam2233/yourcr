import z from "zod";

// Helper to convert 24-hour time to AM/PM format
export const timeAmPmSchema = z.string().min(1, "Time is required");

export const createClassSchema = z
  .object({
    subjectId: z.string().min(1, "Subject is required"),
    teacherId: z.string().min(1, "Teacher is required"),
    classDate: z.string().min(1, "Class date is required"),
    startTime: timeAmPmSchema,
    endTime: timeAmPmSchema,
    classType: z.enum(["ONLINE", "OFFLINE"]),
    status: z
      .enum(["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"])
      .optional()
      .default("SCHEDULED"),
    platform: z
      .enum(["ZOOM", "GOOGLE_MEET", "MICROSOFT_TEAMS", "OTHER"])
      .optional(),
    roomNumber: z.string().optional(),
    joinLink: z.string().url({ message: "Invalid join link URL" }).optional(),
  })
  .refine(
    (data) => {
      // If ONLINE, platform is required
      if (data.classType === "ONLINE" && !data.platform) {
        return false;
      }
      return true;
    },
    {
      message: "Platform is required for online classes",
      path: ["platform"],
    },
  )
  .refine(
    (data) => {
      // If OFFLINE, roomNumber is required
      if (data.classType === "OFFLINE" && !data.roomNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Room number is required for offline classes",
      path: ["roomNumber"],
    },
  );

export const updateClassSchema = z
  .object({
    subjectId: z.string().min(1, "Subject is required"),
    teacherId: z.string().min(1, "Teacher is required"),
    classDate: z.string().min(1, "Class date is required"),
    startTime: timeAmPmSchema,
    endTime: timeAmPmSchema,
    classType: z.enum(["ONLINE", "OFFLINE"]),
    status: z
      .enum(["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"])
      .optional(),
    platform: z
      .enum(["ZOOM", "GOOGLE_MEET", "MICROSOFT_TEAMS", "OTHER"])
      .optional(),
    roomNumber: z.string().optional(),
    joinLink: z.string().url({ message: "Invalid join link URL" }).optional(),
  })
  .refine(
    (data) => {
      if (data.classType === "ONLINE" && !data.platform) {
        return false;
      }
      return true;
    },
    {
      message: "Platform is required for online classes",
      path: ["platform"],
    },
  )
  .refine(
    (data) => {
      if (data.classType === "OFFLINE" && !data.roomNumber) {
        return false;
      }
      return true;
    },
    {
      message: "Room number is required for offline classes",
      path: ["roomNumber"],
    },
  );

export type CreateClassValues = z.infer<typeof createClassSchema>;
export type UpdateClassValues = z.infer<typeof updateClassSchema>;
