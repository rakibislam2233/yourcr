
import sharp from "sharp";
export async function generateBlurPlaceholder(
  imageBuffer: Buffer,
): Promise<string> {
  try {
    const blurredBuffer = await sharp(imageBuffer)
      .resize(10, 10, { fit: "inside" })
      .blur(5)
      .toBuffer();

    const base64 = blurredBuffer.toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Error generating blur placeholder:", error);
    // Fallback to shimmer
    return "";
  }
}
export async function fetchAndGenerateBlur(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return await generateBlurPlaceholder(buffer);
  } catch (error) {
    console.error("Error fetching image for blur:", error);
    return "";
  }
}