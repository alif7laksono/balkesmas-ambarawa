// components/news/NewsCard.tsx

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye, Share2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NewsCardProps {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: string;
  eventDate: Date;
  category?: string;
  readTime?: number;
  views?: number;
}

export default function NewsCard({
  title,
  content,
  imageUrl,
  slug,
  eventDate,
  category,
  readTime = 3,
  views = 0,
}: NewsCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [copied, setCopied] = useState(false);
  const displayDate = eventDate ? new Date(eventDate) : new Date();

  // Prevent double click and multiple navigation
  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isNavigating) return;

    setIsNavigating(true);

    // Simulate a small delay to show loading state
    setTimeout(() => {
      window.location.href = `/berita/${slug}`;
    }, 300);
  };

  // Share functionality
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/berita/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: content.substring(0, 100) + "...",
          url: url,
        });
      } catch (error) {
        console.log("Sharing cancelled");
        console.log(error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        // Fallback for older browsers
        console.log(error);
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Format views count
  const formatViews = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  useEffect(() => {
    setImageSrc(imageUrl);
    setImageError(false);
  }, [imageUrl]);

  const handleImageError = () => {
    setImageError(true);
    setImageSrc("/images/default-news.jpg");
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      {/* Image with overlay effect */}
      <div className="relative h-48 md:h-60 w-full overflow-hidden">
        <Image
          src={imageUrl || "/images/default-news.jpg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        {category && (
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
            {category}
          </Badge>
        )}

        {/* Share button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Tersalin!" : "Bagikan"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Content excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {content}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {displayDate.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{readTime} min baca</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{formatViews(views)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleReadMore}
          disabled={isNavigating}
          className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200"
          size="sm"
        >
          {isNavigating ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Membuka...
            </>
          ) : (
            "Baca Selengkapnya"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
