"use client";

import { Reorder, useDragControls } from "framer-motion";
import type { Page } from "./PageNavigation";
import { PageButton } from "./PageButton";
import { AddPageButton } from "./AddPageButton";

interface DraggablePageItemProps {
  page: Page;
  isActive: boolean;
  onClick: () => void;
  onAdd: () => void;
  onDelete: () => void;
  onRename: () => void;
  showAddButton: boolean;
}

export function DraggablePageItem({
  page,
  isActive,
  onClick,
  onAdd,
  onDelete,
  onRename,
  showAddButton,
}: DraggablePageItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={page}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center flex-shrink-0"
    >
      <PageButton
        page={page}
        isActive={isActive}
        onClick={onClick}
        dragControls={dragControls}
        onDelete={onDelete}
        onRename={onRename}
      />

      <div
        className={
          `relative flex items-center justify-center h-8 transition-all duration-200 ease-in-out ` +
          (showAddButton ? "w-10 hover:w-20 group" : "w-10")
        }
      >
        {/* Dashed line always visible */}
        <div className="w-full border-t-2 border-dashed border-gray-700 transition-all"></div>

        {/* Add button only if allowed */}
        {showAddButton ? (
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity">
            <AddPageButton onClick={onAdd} />
          </div>
        ) : null}
      </div>
    </Reorder.Item>
  );
}