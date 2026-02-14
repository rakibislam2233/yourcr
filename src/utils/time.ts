// Convert 24-hour time format (HH:mm) to AM/PM format (h:mm AM/PM)
export function convertTo12Hour(time24: string): string {
  if (!time24) return "";

  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;

  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Convert AM/PM time format (h:mm AM/PM) to 24-hour format (HH:mm)
export function convertTo24Hour(time12: string): string {
  if (!time12) return "";

  const match = time12.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return "";

  let [, hours, minutes, period] = match;
  let hours24 = parseInt(hours);

  if (period.toUpperCase() === "PM" && hours24 !== 12) {
    hours24 += 12;
  } else if (period.toUpperCase() === "AM" && hours24 === 12) {
    hours24 = 0;
  }

  return `${hours24.toString().padStart(2, "0")}:${minutes}`;
}

// Format platform name for display (convert from backend enum to display name)
export function formatPlatformName(platform: string): string {
  const platformMap: Record<string, string> = {
    ZOOM: "Zoom",
    GOOGLE_MEET: "Google Meet",
    MICROSOFT_TEAMS: "Microsoft Teams",
    OTHER: "Other",
  };

  return platformMap[platform] || platform;
}

// Convert platform display name to backend enum
export function convertPlatformToEnum(platform: string): string {
  const platformMap: Record<string, string> = {
    Zoom: "ZOOM",
    "Google Meet": "GOOGLE_MEET",
    "Microsoft Teams": "MICROSOFT_TEAMS",
    Other: "OTHER",
  };

  return platformMap[platform] || platform;
}
