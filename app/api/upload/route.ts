import { writeFile, mkdir } from "fs/promises";
import path from "path";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const slug = (formData.get("slug") as string) || "spa-image";

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 });
    }

    // kiểm tra ảnh
    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "Only image allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();

    const cleanSlug = slugify(slug, {
      lower: true,
      strict: true,
      locale: "vi",
    });

    const fileName = `${cleanSlug}-${Date.now()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return Response.json({
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}