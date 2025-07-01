"use client";

import { useState, KeyboardEvent, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import type { Page } from "./PageNavigation";
import { MoreIcon } from "./icons";
import { SettingsMenu } from "./SettingsMenu";

interface PageButtonProps {
  page: Page;
  isActive: boolean;
  isBeingDragged?: boolean;
  onClick: () => void;
  dragControls: ReturnType<typeof useDragControls>;
  onDelete: () => void;
  onRename: () => void;
}

export function PageButton({
  page,
  isActive,
  isBeingDragged,
  onClick,
  dragControls,
  onDelete,
  onRename,
}: PageButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  
  const isEffectivelyActive = isActive || isBeingDragged;

  // Base styles for the button container.
  const baseContainerStyle = `
    flex items-center gap-[6px] px-[10px] py-[4px] h-[32px] rounded-md
    transition-all duration-200 cursor-grab outline-none group
  `;

  // Dynamic styles based on state.
  const containerVariantStyle = isEffectivelyActive
    ? "bg-white font-[Inter] font-medium text-[14px] text-[#1A1A1A] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)] border-[0.5px] border-[#E1E1E1]"
    : "bg-[#9DA4B226] font-[Inter] font-medium text-[14px] text-[#677289] hover:bg-[#9DA4B259] border border-transparent";

  const focusStyle = `
    focus-visible:bg-white focus-visible:font-[Inter] font-medium text-[14px] text-[#1A1A1A]
    focus-visible:shadow-[0px_0px_0px_1.5px_rgba(18,87,203,0.25),_0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)]
    focus-visible:border-[0.5px] focus-visible:border-[#2F72E2]
  `;

  // Combined container classes.
  const containerClasses = `${baseContainerStyle} ${containerVariantStyle} ${focusStyle}`;

  // Drag state visual styling.
  const dragStyle = isBeingDragged
    ? {
        boxShadow: "0px 0px 0px 1.5px rgba(18, 87, 203, 0.25), 0px 1px 1px 0px rgba(0, 0, 0, 0.02), 0px 1px 3px 0px rgba(0, 0, 0, 0.04)",
        border: "0.5px solid #2F72E2",
      }
    : {};

  // Handle keyboard interactions.
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  // Open settings menu with proper positioning.
  const openMenu = () => {
    if (containerRef.current) {
      setAnchorRect(containerRef.current.getBoundingClientRect());
    }
    setIsMenuOpen(true);
  };

  // Toggle menu visibility.
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      openMenu();
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={isActive}
        className={containerClasses}
        style={dragStyle}
        onTap={onClick}
        onKeyDown={handleKeyDown}
        onContextMenu={(e) => {
          e.preventDefault();
          openMenu();
        }}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <page.icon
          className={isEffectivelyActive ? "text-[#F59D0E]" : "group-focus-visible:text-[#F59D0E]"}
        />
        <span>{page.name}</span>
        
        {isActive && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={toggleMenu}
            aria-label="Page settings"
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
