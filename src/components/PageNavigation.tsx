"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { BigAddIcon, CheckIcon, DocumentIcon, InfoIcon } from "./icons";
import { DraggablePageItem } from "./DraggablePageItem";

// Define the page type and initial state.
export type Page = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

const INITIAL_PAGES: Page[] = [
  { id: "info", name: "Info", icon: InfoIcon },
  { id: "details", name: "Details", icon: DocumentIcon },
  { id: "other", name: "Other", icon: DocumentIcon },
  { id: "ending", name: "Ending", icon: CheckIcon },
];

export function PageNavigation() {
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState("info");

  // Handle adding a new page at specified index.
  const addPage = (index: number) => {
    const newPage = {
      id: `new-page-${Date.now()}`,
      name: "New Page",
      icon: DocumentIcon,
      isNew: true,
    };

    setPages([...pages.slice(0, index), newPage, ...pages.slice(index)]);

    // Remove the 'isNew' flag after animation completes.
    setTimeout(() => {
      setPages(prevPages =>
        prevPages.map(p => (p.id === newPage.id ? { ...p, isNew: false } : p))
      );
    }, 800);
  };

  // Handle deleting a page and updating active page if needed.
  const deletePage = (pageId: string) => {
    const pageIndex = pages.findIndex(p => p.id === pageId);
    if (pageIndex === -1) return;

    const newPages = pages.filter(p => p.id !== pageId);
    setPages(newPages);

    if (activePageId === pageId) {
      const newActiveIndex = Math.max(0, pageIndex - 1);
      setActivePageId(newPages[newActiveIndex]?.id || "");
    }
  };

  // Handle renaming a page via prompt.
  const renamePage = (pageId: string) => {
    const newName = prompt("Enter new page name:");
    if (newName?.trim()) {
      setPages(pages.map(p => (p.id === pageId ? { ...p, name: newName } : p)));
    }
  };

  // Styles reused across components.
  const addButtonStyle = `
    flex items-center gap-2 px-3 h-[32px] rounded-md bg-white text-black 
    shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)] 
    border-[0.5px] border-[#E1E1E1] transition-colors hover:bg-gray-100
  `;

  return (
    <div className="w-full bg-[#F9FAFB]">
      <Reorder.Group
        as="ol"
        axis="x"
        values={pages}
        onReorder={setPages}
        className="flex items-center flex-nowrap overflow-x-auto overflow-y-visible scrollbar-gutter-stable custom-scrollbar p-[20px]"
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
            showAddButton={index < pages.length - 1}
          />
        ))}

        <Reorder.Item
          value={{ id: "__add_page__" }}
          dragListener={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dragControls={undefined as any}
          className="flex-shrink-0"
        >
          <button onClick={() => addPage(pages.length)} className={addButtonStyle}>
            <BigAddIcon />
            Add page
          </button>
        </Reorder.Item>
      </Reorder.Group>
    </div>
  );
}
