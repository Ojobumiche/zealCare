"use client";

import { useMemo, useState, useEffect } from "react";

// API error handler utility - shows user-friendly error messages
const handleApiError = (error: any) => {
  console.error("API Error:", error);
  return error?.message || "Something went wrong. Please try again.";
};

/**
 * Admin Dashboard Component
 * Manages blog posts from Sanity CMS, media uploads, and form submissions from MongoDB
 */
export default function AdminDashboard() {
  const [activeSubmission, setActiveSubmission] = useState("contact");

  // State management for posts fetched from Sanity
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState("");

  // State management for media fetched from Sanity
  const [media, setMedia] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [mediaError, setMediaError] = useState("");

  // State management for form submissions from MongoDB
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [submissionsError, setSubmissionsError] = useState("");

  // Form state for creating/editing posts
  const [form, setForm] = useState({
    id: "",
    title: "",
    type: "Blog",
    summary: "",
    image: "",
    status: "Draft",
  });

  // Upload state
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  // Submit state for post creation/update
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Fetch posts from Sanity when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        setPostsError("");
      } catch (error) {
        setPostsError(handleApiError(error));
        setPosts([]);
      } finally {
        setPostsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Fetch media from Sanity when component mounts
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setMediaLoading(true);
        const response = await fetch("/api/media");
        if (!response.ok) throw new Error("Failed to fetch media");
        const data = await response.json();
        setMedia(data);
        setMediaError("");
      } catch (error) {
        setMediaError(handleApiError(error));
        setMedia([]);
      } finally {
        setMediaLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // Fetch form submissions from MongoDB when component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setSubmissionsLoading(true);
        const response = await fetch("/api/submissions");
        if (!response.ok) throw new Error("Failed to fetch submissions");
        const data = await response.json();
        setSubmissions(data);
        setSubmissionsError("");
      } catch (error) {
        setSubmissionsError(handleApiError(error));
        setSubmissions([]);
      } finally {
        setSubmissionsLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // Calculate key statistics for dashboard
  const stats = useMemo(() => {
    const published = posts.filter((p: any) => p.status === "Published").length;
    const drafts = posts.length - published;
    return {
      published,
      drafts,
      mediaCount: media.length,
      formsCount: submissions.length,
    };
  }, [posts, media.length, submissions.length]);

  // Filter submissions by form type (contact, volunteer, program, etc.)
  const visibleSubmissions = useMemo(() => {
    return submissions.filter((sub: any) => sub.formType === activeSubmission);
  }, [submissions, activeSubmission]);

  // Create or update a post in Sanity via API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      const postData = {
        title: form.title,
        type: form.type,
        summary: form.summary,
        image: form.image,
        status: form.status,
      };

      let response;

      if (form.id) {
        // Update existing post via PATCH request
        response = await fetch(`/api/posts/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post via POST request
        response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
      }

      if (!response.ok) throw new Error("Failed to save post");

      // Refresh posts list from server
      const postsResponse = await fetch("/api/posts");
      if (postsResponse.ok) {
        const updatedPosts = await postsResponse.json();
        setPosts(updatedPosts);
      }

      setSubmitSuccess(form.id ? "Post updated successfully!" : "Post created successfully!");
      setForm({ id: "", title: "", type: "Blog", summary: "", image: "", status: "Draft" });

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitSuccess(""), 3000);
    } catch (error) {
      setSubmitError(handleApiError(error));
    } finally {
      setSubmitLoading(false);
    }
  };

  // Prefill the form so edits stay in sync.
  const handleEdit = (post: any) => {
    setForm(post);
  };

  // Upload media asset to Sanity
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl.trim()) return;

    setUploadLoading(true);

    try {
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Upload ${media.length + 1}`,
          url: uploadUrl.trim(),
          category: "general",
        }),
      });

      if (!response.ok) throw new Error("Failed to upload media");

      // Refresh media list from server
      const mediaResponse = await fetch("/api/media");
      if (mediaResponse.ok) {
        const updatedMedia = await mediaResponse.json();
        setMedia(updatedMedia);
      }

      setUploadUrl("");
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 px-6 pt-28 pb-16">
      <header className="max-w-6xl mx-auto mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Admin Dashboard</p>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Manage stories, submissions, and media</h1>
        <p className="text-zinc-600 mt-2">Lightweight control panel for NGO content. Connected to Sanity CMS and MongoDB.</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        {/* KPI strip */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">Published posts</p>
            <p className="text-3xl font-semibold">{stats.published}</p>
          </article>
          <article className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">Drafts</p>
            <p className="text-3xl font-semibold">{stats.drafts}</p>
          </article>
          <article className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">Media assets</p>
            <p className="text-3xl font-semibold">{stats.mediaCount}</p>
          </article>
          <article className="rounded-xl border bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">Form submissions</p>
            <p className="text-3xl font-semibold">{stats.formsCount}</p>
          </article>
        </section>

        {/* Submissions */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-semibold">Form inbox</h2>
              <p className="text-sm text-zinc-500">Review messages from contact, volunteer, and program forms.</p>
            </div>
            <div className="inline-flex rounded-lg border bg-zinc-100 overflow-hidden">
              {[
                { id: "contact", label: "Contact" },
                { id: "volunteer", label: "Volunteers" },
                { id: "program", label: "Programs" },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveSubmission(option.id)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeSubmission === option.id ? "bg-blue-600 text-white" : "text-zinc-700 hover:bg-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {submissionsError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              ⚠️ {submissionsError}
            </div>
          )}

          {submissionsLoading ? (
            <div className="text-center py-8 text-zinc-500">Loading submissions...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border-b">
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Topic / Program</th>
                    <th className="py-2 pr-3">Email</th>
                    <th className="py-2">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-zinc-500">
                        No submissions yet
                      </td>
                    </tr>
                  ) : (
                    visibleSubmissions.map((item: any) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="py-3 pr-3 font-medium">{item.name}</td>
                        <td className="py-3 pr-3 text-zinc-700">{item.topic || "—"}</td>
                        <td className="py-3 pr-3 text-blue-700">{item.email}</td>
                        <td className="py-3 text-zinc-700">{item.received}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Content composer */}
        <section className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Create / edit content</h2>
              <p className="text-sm text-zinc-500">Blog, news, and impact stories live here.</p>
            </div>

            {submitError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                ❌ {submitError}
              </div>
            )}

            {submitSuccess && (
              <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                ✓ {submitSuccess}
              </div>
            )}

            <label className="block text-sm font-medium text-zinc-700">Title</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. Girls in STEM graduation"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700">Type</label>
                <select
                  className="w-full rounded-lg border px-3 py-2"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option>Blog</option>
                  <option>News</option>
                  <option>Impact Story</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700">Status</label>
                <select
                  className="w-full rounded-lg border px-3 py-2"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>

            <label className="block text-sm font-medium text-zinc-700">Cover image URL</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <label className="block text-sm font-medium text-zinc-700">Summary</label>
            <textarea
              className="w-full rounded-lg border px-3 py-2"
              rows={4}
              placeholder="Short intro for the homepage and social cards"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
            />

            <button
              type="submit"
              disabled={submitLoading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white font-semibold shadow hover:bg-blue-700 disabled:bg-blue-400"
            >
              {submitLoading ? "Saving..." : form.id ? "Save changes" : "Publish entry"}
            </button>
          </form>

          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Recent content</h2>
                <p className="text-sm text-zinc-500">Tap edit to load into the form.</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border">{posts.length} items</span>
            </div>

            {postsError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                ⚠️ {postsError}
              </div>
            )}

            {postsLoading ? (
              <div className="text-center py-8 text-zinc-500">Loading posts...</div>
            ) : (
              <div className="space-y-3">
                {posts.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500">No posts yet. Create one above!</div>
                ) : (
                  posts.map((post: any) => (
                    <article key={post.id} className="flex gap-3 rounded-xl border p-3 hover:border-blue-200 transition">
                      <div className="h-20 w-28 rounded-lg bg-zinc-100 overflow-hidden">
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full grid place-items-center text-xs text-zinc-400">No image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 items-center">
                          <p className="text-sm px-2 py-1 rounded-full bg-zinc-100 text-zinc-700 border">{post.type}</p>
                          <p
                            className={`text-sm px-2 py-1 rounded-full border ${
                              post.status === "Published"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {post.status}
                          </p>
                          <p className="text-xs text-zinc-500">{post.date}</p>
                        </div>
                        <h3 className="font-semibold mt-1 truncate">{post.title}</h3>
                        <p className="text-sm text-zinc-600 overflow-hidden max-h-14">{post.summary}</p>
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="text-blue-700 text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              // Toggle status between Draft and Published
                              fetch(`/api/posts/${post.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  status: post.status === "Draft" ? "Published" : "Draft",
                                }),
                              }).then(() => {
                                // Refresh posts list
                                fetch("/api/posts")
                                  .then((r) => r.json())
                                  .then(setPosts);
                              });
                            }}
                            className="text-sm text-zinc-600"
                          >
                            Toggle status
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        </section>

        {/* Media and stories */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">Impact photos</h2>
                <p className="text-sm text-zinc-500">Upload URLs or manage from Sanity Studio.</p>
              </div>
              <span className="text-sm text-zinc-500">{media.length} items</span>
            </div>=

            {mediaError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                ⚠️ {mediaError}
              </div>
            )}

            <form onSubmit={handleUpload} className="flex gap-3 mb-4">
              <input
                className="flex-1 rounded-lg border px-3 py-2"
                placeholder="https://image-link"
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
              />
              <button
                type="submit"
                disabled={uploadLoading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 disabled:bg-blue-400"
              >
                {uploadLoading ? "..." : "Add photo"}
              </button>
            </form>

            {mediaLoading ? (
              <div className="text-center py-8 text-zinc-500">Loading media...</div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {media.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 col-span-full">
                    No photos yet. Add one above!
                  </div>
                ) : (
                  media.map((item: any) => (
                    <figure key={item.id} className="rounded-xl border overflow-hidden bg-zinc-50">
                      <img src={item.url} alt={item.label} className="h-32 w-full object-cover" />
                      <figcaption className="px-3 py-2 text-sm font-medium">{item.label}</figcaption>
                    </figure>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
            <h2 className="text-xl font-semibold">Quick publishing tips</h2>
            <ul className="space-y-2 text-sm text-zinc-600 list-disc list-inside">
              <li>Use "Impact Story" type for beneficiary narratives.</li>
              <li>Keep photos under 1MB when using storage.</li>
              <li>Tag drafts during review, then flip to Published.</li>
              <li>Repurpose blog posts into newsletters to donors.</li>
              <li>Visit Sanity Studio (/studio) to add full content.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

