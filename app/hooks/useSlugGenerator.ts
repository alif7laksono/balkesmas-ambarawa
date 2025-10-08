// hooks/useSlugGenerator.ts
import { useState, useEffect } from "react";

interface UseSlugGeneratorReturn {
  slug: string;
  setSlug: (slug: string) => void;
  isManualEdit: boolean;
  setIsManualEdit: (value: boolean) => void;
  generateSlug: (text: string) => string;
}

export function useSlugGenerator(
  title: string,
  initialSlug?: string // ✅ Tambah parameter untuk initial slug
): UseSlugGeneratorReturn {
  const [slug, setSlug] = useState<string>(initialSlug || "");
  const [isManualEdit, setIsManualEdit] = useState<boolean>(!!initialSlug); // ✅ Auto manual edit jika ada initial slug

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  useEffect(() => {
    // ✅ Only auto-generate if not manually edited AND title changed significantly
    if (!isManualEdit && title) {
      const newSlug = generateSlug(title);

      // ✅ Only update if the new slug is different from current
      if (newSlug !== slug) {
        setSlug(newSlug);
      }
    }
  }, [title, isManualEdit, slug]);

  const handleSlugChange = (newSlug: string): void => {
    const cleanedSlug = generateSlug(newSlug);
    setSlug(cleanedSlug);
    setIsManualEdit(true);
  };

  return {
    slug,
    setSlug: handleSlugChange,
    isManualEdit,
    setIsManualEdit,
    generateSlug,
  };
}
