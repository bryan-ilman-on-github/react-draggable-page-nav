"use client";

import { motion, Reorder, useDragControls } from "framer-motion";
import type { Page } from "./PageNavigation";
import { PageButton } from "./PageButton";
import { AddPageButton } from "./AddPageButton";

interface DraggablePageItemProps {
  page: Page & { isNew?: boolean };
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
      <motion.div
        initial={page.isNew ? { opacity: 0, y: -10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: page.isNew ? 0.2 : 0,
          ease: "easeOut",
        }}
      >
        <PageButton
          page={page}
          isActive={isActive}
          onClick={onClick}
          dragControls={dragControls}
          onDelete={onDelete}
          onRename={onRename}
        />
      </motion.div>

      <div
        className={
          `relative flex items-center justify-center h-8 transition-all duration-200 ease-in-out ` +
          (showAddButton ? "w-[20px] hover:w-[56px] group" : "w-[20px]")
        }
      >
        {/* Dashed line always visible */}
        <div className="w-full border-t-2 border-dashed border-[#C0C0C0] transition-all"></div>

        {/* Add button only if allowed */}
        {showAddButton ? (
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <AddPageButton onClick={onAdd} />
          </div>
        ) : null}
      </div>
    </Reorder.Item>
  );
}