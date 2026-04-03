/**
 * Media API Route
 * Handles CRUD operations for media files in Sanity
 */

import { sanityClient, sanityWriteClient } from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/media
 * Fetch all media files from Sanity
 */
export async function GET(request: NextRequest) {
  try {
    // Query all media documents
    const media = await sanityClient.fetch(`
      *[_type == "media"] | order(_createdAt desc) {
        _id,
        _createdAt,
        title,
        description,
        file {
          asset->{
            _id,
            url,
            originalFilename,
            mimeType,
            size
          }
        },
        tags,
        category
      }
    `);

    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/media
 * Upload new media to Sanity
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to Sanity
    const asset = await sanityWriteClient.assets.upload("file", buffer, {
      filename: file.name,
    });

    // Create media document
    const document = {
      _type: "media",
      title: title || file.name,
      description: description || "",
      file: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    };

    // Save to Sanity
    const createdMedia = await sanityWriteClient.create(document);

    return NextResponse.json({ success: true, data: createdMedia });
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload media" },
      { status: 500 }
    );
  }
}