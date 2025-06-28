"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import {
  InfoIcon,
  DetailsIcon,
  OtherIcon,
  EndingIcon,
  AddIcon,
} from "./icons";
import { DraggablePageItem } from "./DraggablePageItem";

export type Page = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const INITIAL_PAGES: Page[] = [
  { id: "info", name: "Info", icon: InfoIcon },
  { id: "details", name: "Details", icon: DetailsIcon },
  { id: "other", name: "Other", icon: OtherIcon },
  { id: "ending", name: "Ending", icon: EndingIcon },
];

export function PageNavigation() {
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState<string>("info");

  const addPage = (index: number) => {
    const newPage: Page = {
      id: `new-page-${Date.now()}`,
      name: "New Page",
      icon: DetailsIcon,
    };
    const newPages = [...pages];
    newPages.splice(index, 0, newPage);
    setPages(newPages);
  };

  const deletePage = (pageId: string) => {
    const pageIndex = pages.findIndex((p) => p.id === pageId);
    if (pageIndex === -1) return;

    const newPages = pages.filter((p) => p.id !== pageId);

    if (activePageId === pageId) {
      if (newPages.length > 0) {
        const newActiveIndex = Math.max(0, pageIndex - 1);
        setActivePageId(newPages[newActiveIndex].id);
      } else {
        setActivePageId("");
      }
    }
    setPages(newPages);
  };

  const renamePage = (pageId: string) => {
    const newName = prompt("Enter new page name:");
    if (newName && newName.trim() !== "") {
      setPages(
        pages.map((p) => (p.id === pageId ? { ...p, name: newName } : p))
      );
    }
  };

  return (
    <div className="flex items-center justify-start w-full bg-[#111111] p-2">
      <Reorder.Group
        as="ol"
        axis="x"
        values={pages}
        onReorder={setPages}
        className="flex items-center flex-nowrap overflow-x-auto custom-scrollbar"
      >
        {pages.map((page, index) => (
          <DraggablePageItem
            key={page.id}
            page={page}
            isActive={activePageId === page.id}
            onClick={() => setActivePageId(page.id)}
            onAdd={() => addPage(index + 1)}
            onDelete={() => deletePage(page.id)}
            onRename={() => renamePage(page.id)}
          />
        ))}
        {/* The final 'Add page' button is now inside the scrollable list */}
        <li className="flex-shrink-0">
          <button
            onClick={() => addPage(pages.length)}
            className="flex items-center gap-2 ml-4 px-4 py-2 rounded-md text-white/70 hover:bg-white/10 transition-colors"
          >
            <AddIcon />
            Add page
          </button>
        </li>
      </Reorder.Group>
    </div>
  );
}