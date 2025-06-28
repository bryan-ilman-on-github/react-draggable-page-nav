"use client";

import { PageNavigation } from "@/components/PageNavigation";
import { FormPage } from "@/components/FormPage";

export default function Home() {
  return (
    // The main layout is simplified. FormPage now controls its own background and layout.
    <div>
      <main>
        <FormPage />
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10">
        <PageNavigation />
      </footer>
    </div>
  );
}