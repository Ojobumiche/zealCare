/**
 * GET /api/posts - Fetch all published blog posts and news from Sanity
 * POST /api/posts - Create a new post in Sanity
 * 
 * These routes bridge your Next.js app to Sanity CMS.
 */

import { sanityClient, sanityWriteClient } from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * GROQ query to fetch all posts with their complete details.
 * Filters to only published status by default.
 */
const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    type,
    status,
    summary,
    "coverImage": coverImage.asset->url,
    "slug": slug.current,
    publishedAt,
    tags
  }
`;

/**
 * GET handler: Fetch posts from Sanity
 */
export async function GET() {
  try {
    // Fetch from Sanity using GROQ query
    const posts = await sanityClient.fetch(postsQuery);

    // Transform data to match admin dashboard structure
    const formattedPosts = posts.map((post: any) => ({
      id: post._id,
      title: post.title,
      type: post.type,
      status: post.status,
      summary: post.summary,
      image: post.coverImage || "",
      slug: post.slug,
      date: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      tags: post.tags || [],
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts from Sanity" },
      { status: 500 }
    );
  }
}

/**
 * POST handler: Create a new post in Sanity
 */
export async function POST(req: NextRequest) {
  try {
    // Parse incoming request data
    const body = await req.json();
    const { title, type, summary, image, status, tags } = body;

    // Validate required fields
    if (!title || !summary) {
      return NextResponse.json(
        { error: "Title and summary are required" },
        { status: 400 }
      );
    }

    // Create slug from title (URL-friendly version)
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Build the document object to send to Sanity
    const newPost = {
      _type: "post",
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      type: type || "Blog",
      status: status || "Draft",
      summary,
      publishedAt: new Date().toISOString(),
      tags: tags || [],
      image: image || "",
      // If coverImage URL provided, we could store it as reference
      // For now, admins upload directly in Sanity Studio
    };

    // Use the write client to create the post
    const createdPost = await sanityWriteClient.create(newPost);

    return NextResponse.json({
      id: createdPost._id,
      title: createdPost.title,
      type: createdPost.type,
      status: createdPost.status,
      summary: createdPost.summary,
      date: new Date().toISOString().slice(0, 10),
      image: createdPost.image || "",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post in Sanity" },
      { status: 500 }
    );
  }
}
