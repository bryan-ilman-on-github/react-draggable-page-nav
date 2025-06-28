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
}

export function DraggablePageItem({
  page,
  isActive,
  onClick,
  onAdd,
  onDelete,
  onRename,
}: DraggablePageItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={page}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center flex-shrink-0 z-10" // z-10 ensures buttons are above the line
    >
      {/* This div provides a background to mask the dashed line */}
      <div className="bg-[#111111] pr-1">
        <PageButton
          page={page}
          isActive={isActive}
          onClick={onClick}
          dragControls={dragControls}
          onDelete={onDelete}
          onRename={onRename}
        />
      </div>

      <div className="relative flex items-center justify-center w-10 h-8 group transition-all duration-300 ease-in-out hover:w-20">
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity">
          <AddPageButton onClick={onAdd} />
        </div>
      </div>
    </Reorder.Item>
  );
}