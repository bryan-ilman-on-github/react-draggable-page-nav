"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import type { Page } from "./PageNavigation";
import { MoreIcon } from "./icons";
import { SettingsMenu } from "./SettingsMenu";

interface PageButtonProps {
  page: Page;
  isActive: boolean;
  onClick: () => void;
  dragControls: ReturnType<typeof useDragControls>;
  onDelete: () => void;
  onRename: () => void;
}

export function PageButton({
  page,
  isActive,
  onClick,
  dragControls,
  onDelete,
  onRename,
}: PageButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const containerClasses = `
    flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 cursor-grab
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]
    ${
      isActive
        ? "bg-white text-black shadow-md"
        : "bg-[#2a2a2a] text-white/70 hover:bg-[#3a3a3a]"
    }
  `;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const openMenu = () => {
    if (containerRef.current) {
      setAnchorRect(containerRef.current.getBoundingClientRect());
    }
    setIsMenuOpen(true);
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        className={containerClasses}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onContextMenu={(e) => {
          e.preventDefault();
          openMenu();
        }}
        // The entire button is now the drag handle
        onPointerDown={(e) => dragControls.start(e)}
        whileTap={{ scale: isActive ? 1 : 0.95 }}
      >
        <page.icon
          className={`h-5 w-5 ${
            isActive ? "text-orange-500" : "text-white/50"
          }`}
        />
        <span>{page.name}</span>
        {isActive && (
          <button
            // Stop propagation to prevent dragging when clicking the settings button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              isMenuOpen ? setIsMenuOpen(false) : openMenu();
            }}
            aria-label="Open page settings"
            className="ml-1 p-0.5 rounded hover:bg-black/10 cursor-pointer"
          >
            <MoreIcon className="h-5 w-5" />
          </button>
        )}
      </motion.div>
      <SettingsMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onDelete={onDelete}
        onRename={onRename}
        anchorRect={anchorRect}
      />
    </div>
  );
}