// app/lib/excerptUtils.ts
export function createExcerpt(
  htmlContent: string,
  maxLength: number = 160
): string {
  // Remove HTML tags
  const plainText = htmlContent.replace(/<[^>]*>/g, "");

  // Trim and get first meaningful part
  const trimmed = plainText.trim();

  // Find a good breaking point (end of sentence or word)
  if (trimmed.length <= maxLength) return trimmed;

  // Try to break at sentence end
  const sentenceEnd = trimmed.substring(0, maxLength).lastIndexOf(".");
  if (sentenceEnd > maxLength * 0.5) {
    return trimmed.substring(0, sentenceEnd + 1);
  }

  // Try to break at word boundary
  const wordBoundary = trimmed.substring(0, maxLength).lastIndexOf(" ");
  if (wordBoundary > maxLength * 0.7) {
    return trimmed.substring(0, wordBoundary) + "...";
  }

  // Fallback: hard break with ellipsis
  return trimmed.substring(0, maxLength - 3) + "...";
}
