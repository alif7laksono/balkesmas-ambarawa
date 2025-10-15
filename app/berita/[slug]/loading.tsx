// app/berita/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-gray-200 animate-pulse"></div>

      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-8 animate-pulse"></div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button Skeleton */}
            <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>

            {/* Article Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Image Skeleton */}
              <div className="w-full aspect-video bg-gray-200 animate-pulse"></div>

              {/* Content Skeleton */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="hidden lg:block space-y-6">
            <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="h-20 bg-gray-200 animate-pulse"></div>
    </div>
  );
}
