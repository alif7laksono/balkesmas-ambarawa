// app/berita/[slug]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import Category from "@/app/models/Category";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getNewsDetail(slug: string) {
  await connectDB();

  const news = await News.findOne({ slug }).populate("category");

  if (!news) {
    return null;
  }

  return JSON.parse(JSON.stringify(news));
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 to-gray-50 py-8 md:py-12">
          <div className="absolute inset-0 bg-white/60"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Breadcrumbs - Mobile Optimized */}
            <nav className="mb-6 md:mb-8">
              <div className="flex items-center space-x-1 text-sm text-gray-600 flex-wrap">
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors hover:underline"
                >
                  Informasi
                </Link>
                <span className="text-gray-400">›</span>
                <Link
                  href="/berita"
                  className="hover:text-blue-600 transition-colors hover:underline"
                >
                  Berita
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900 font-medium line-clamp-1 max-w-[200px] sm:max-w-none">
                  {news.title}
                </span>
              </div>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Back Button - Mobile Sticky */}
                <div className="sticky top-4 z-10 md:static mb-6 md:mb-8">
                  <Link
                    href="/berita"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Kembali ke Berita
                  </Link>
                </div>

                {/* Article Header */}
                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative w-full aspect-video md:h-full bg-gray-100">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Article Meta */}
                  <div className="p-6 md:p-8">
                    {/* Category Badge */}
                    {news.category && (
                      <div className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-4">
                        {news.category.name}
                      </div>
                    )}

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                      {news.title}
                    </h1>

                    {/* Date & Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <time dateTime={news.eventDate || news.createdAt}>
                          {new Date(
                            news.eventDate || news.createdAt
                          ).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="prose prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-p:text-gray-700 
                                prose-p:leading-relaxed
                                prose-a:text-blue-600 
                                prose-a:no-underline
                                prose-a:border-b-2
                                prose-a:border-blue-200
                                prose-a:hover:border-blue-600
                                prose-strong:text-gray-900
                                prose-ul:text-gray-700
                                prose-ol:text-gray-700
                                prose-blockquote:border-l-blue-500
                                prose-blockquote:bg-blue-50
                                prose-blockquote:py-1
                                prose-img:rounded-xl
                                prose-img:shadow-md
                                prose-table:shadow-sm
                                prose-table:border
                                prose-table:rounded-lg
                                prose-th:bg-gray-50
                                prose-th:text-gray-900
                                prose-td:border-t
                                prose-td:border-gray-100"
                      dangerouslySetInnerHTML={{ __html: news.content }}
                    />
                  </div>
                </article>
              </div>

              {/* Sidebar - Desktop Only */}
              <aside className="hidden space-y-6">
                {/* Share Widget */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">Bagikan</h3>
                  <div className="flex gap-3">
                    {/* Facebook */}
                    <button
                      className="flex-1 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-blue-600 hover:text-blue-700 hover:scale-105"
                      title="Bagikan ke Facebook"
                    >
                      <IconBrandFacebook className="w-5 h-5 mx-auto" />
                    </button>

                    {/* LinkedIn */}
                    <button
                      className="flex-1 p-3 bg-pink-50 hover:bg-pink-100 rounded-xl transition-all duration-200 text-pink-600 hover:text-pink-700 hover:scale-105"
                      title="Bagikan ke Instagram"
                    >
                      <IconBrandInstagram className="w-5 h-5 mx-auto" />
                    </button>

                    {/* WhatsApp */}
                    <button
                      className="flex-1 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 text-green-600 hover:text-green-700 hover:scale-105"
                      title="Bagikan ke WhatsApp"
                    >
                      <IconBrandWhatsapp className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>

                {/* Related News Placeholder */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Berita Terkait
                  </h3>
                  <p className="text-sm text-gray-500 text-center py-8">
                    Fitur berita terkait akan segera hadir
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
