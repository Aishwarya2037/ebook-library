"use client";

import { useSearchParams } from "next/navigation";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div>
      Search Query: {query}
    </div>
  );
}
