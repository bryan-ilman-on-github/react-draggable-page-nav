"use client";

import { Reorder, useDragControls } from "framer-motion";
import type { Page } from "./PageNavigation";
import { PageButton } from "./PageButton";
import { AddPageButton } from "./AddPageButton";
import { RefObject } from "react";

interface DraggablePageItemProps {
  page: Page;
  isActive: boolean;
  onClick: () => void;
  onAdd: () => void;
  onDelete: () => void;
  onRename: () => void;
  isLast: boolean;
  constraintsRef: RefObject<HTMLElement>;
}

export function DraggablePageItem({
  page,
  isActive,
  onClick,
  onAdd,
  onDelete,
  onRename,
  isLast,
  constraintsRef,
}: DraggablePageItemProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={page}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={constraintsRef}
      dragElastic={0}
      className="flex items-center flex-shrink-0 z-10"
    >
      <div className="pr-1">
        <PageButton
          page={page}
          isActive={isActive}
          onClick={onClick}
          dragControls={dragControls}
          onDelete={onDelete}
          onRename={onRename}
        />
      </div>

      {isLast ? (
        <div className="w-10 h-8"></div>
      ) : (
        <div className="relative flex items-center justify-center w-10 h-8 group transition-all duration-300 ease-in-out hover:w-20">
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity">
            <AddPageButton onClick={onAdd} />
          </div>
        </div>
      )}
    </Reorder.Item>
  );
}