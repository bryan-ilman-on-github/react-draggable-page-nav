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
  const buttonRef = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const containerClasses = `
    flex items-center gap-[6px] px-[10px] py-[4px] h-[32px] rounded-md transition-all duration-200 cursor-grab
    outline-none
    ${
      isActive
        ? "bg-white text-[#1A1A1A] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)] border-[0.5px] border-[#E1E1E1]"
        : "bg-[#9DA4B226] text-[#677289] hover:bg-[#9DA4B259] border border-transparent"
    }
    /* keyboard focus */
    focus-visible:bg-white
    focus-visible:text-[#1A1A1A]
    focus-visible:shadow-[0px_0px_0px_1.5px_rgba(47,114,226,0.25),_0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)]
    focus-visible:border-[0.5px]
    focus-visible:border-[#2F72E2]
    /* mouse/programmatic focus */
    focus:bg-white
    focus:text-[#1A1A1A]
    focus:shadow-[0px_0px_0px_1.5px_rgba(47,114,226,0.25),_0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)]
    focus:border-[0.5px]
    focus:border-[#2F72E2]
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
        ref={buttonRef}
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        className={containerClasses}
        onClick={(e) => {
          buttonRef.current?.focus(); // programmatically set focus
          onClick();
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onContextMenu={(e) => {
          e.preventDefault();
          openMenu();
        }}
        onPointerDown={(e) => {
          dragControls.start(e);
          buttonRef.current?.focus(); // also focus when dragging
        }}
      >
        <page.icon
          {...(isActive || isFocused ? { className: "text-[#F59D0E]" } : {})}
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
            className="ml-[2px] py-[2px] rounded hover:bg-black/10 cursor-pointer"
          >
            <MoreIcon />
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