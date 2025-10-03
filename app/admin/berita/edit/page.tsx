// app/admin/berita/edit/page.tsx
import { redirect, RedirectType } from "next/navigation";
import React from "react";
export default function page() {
  redirect("/admin/berita", RedirectType.replace);
  return <></>;
}
