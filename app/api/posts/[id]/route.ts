/**
 * PATCH /api/posts/[id] - Update a post in Sanity
 * DELETE /api/posts/[id] - Delete a post from Sanity
 */

import { sanityWriteClient } from "@/lib/sanityClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * PATCH handler: Update an existing post
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, type, summary, status, tags } = body;

    // Build update object with only provided fields
    const updateData: any = {
      _type: "post",
      _id: id,
    };

    if (title) updateData.title = title;
    if (type) updateData.type = type;
    if (summary) updateData.summary = summary;
    if (status) updateData.status = status;
    if (tags) updateData.tags = tags;

    // Use patch method to update specific fields
    const updatedPost = await sanityWriteClient.patch(id).set(updateData).commit();

    return NextResponse.json({
      id: updatedPost._id,
      title: updatedPost.title,
      type: updatedPost.type,
      status: updatedPost.status,
      summary: updatedPost.summary,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler: Remove a post from Sanity
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Delete the document from Sanity
    await sanityWriteClient.delete(id);

    return NextResponse.json({
      message: "Post deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
