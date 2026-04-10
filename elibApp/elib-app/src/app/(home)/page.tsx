export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Banner from "./components/banner";
import { BookList } from "./components/BookList";
import Loading from "@/src/components/Loading";

export default async function Home() {
  return (
    <main className="mt-20">
      <Banner />
      <Suspense fallback={<Loading />}>
        <BookList />
      </Suspense>
    </main>
  );
}
