// components/news/NewsCard.tsx
import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  eventDate: Date;
}

export default function NewsCard({
  title,
  content,
  imageUrl,
  slug,
  eventDate,
}: NewsCardProps) {
  const displayDate = eventDate ? new Date(eventDate) : new Date();

  return (
    <Link href={`/berita/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative md:h-72 h-60 w-full">
          <Image
            src={imageUrl || "/images/default-news.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{content}</p>
          {/* ✅ Hanya tampilkan eventDate saja */}
          <p className="text-gray-500 text-xs flex items-center gap-1">
            <span>📅</span>
            {displayDate.toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
