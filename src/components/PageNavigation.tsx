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
    <div className="w-full bg-[#111111] p-2">
      <div className="h-12 overflow-hidden"> {/* 👈 fixed height wrapper */}
        <Reorder.Group
          as="ol"
          axis="x"
          values={pages}
          onReorder={setPages}
          className="flex items-center flex-nowrap overflow-x-auto scrollbar-gutter-stable custom-scrollbar pb-1.5"
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
              showAddButton={index < pages.length - 1} // 👈 only show '+' if not last
            />
          ))}
          <Reorder.Item
            value={{ id: "__add_page__" }} // 👈 just a placeholder value
            dragListener={false}
            dragControls={undefined as any} // not draggable
            className="flex-shrink-0"
          >
            <button
              onClick={() => addPage(pages.length)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-black shadow-md hover:bg-gray-200 transition-colors"
            >
              <AddIcon className="h-5 w-5 text-black" />
              Add page
            </button>
          </Reorder.Item>
        </Reorder.Group>
      </div>
    </div>
  );
}