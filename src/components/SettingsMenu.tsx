"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlagIcon, RenameIcon, CopyIcon, DuplicateIcon, DeleteIcon } from "./icons";

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onRename: () => void;
  anchorRect: DOMRect | null;
}

export function SettingsMenu({
  isOpen,
  onClose,
  onDelete,
  onRename,
  anchorRect,
}: SettingsMenuProps) {
  // Handle escape key press to close menu.
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Calculate menu position relative to anchor element.
  const menuStyle = useMemo(() => {
    if (!anchorRect) return {};
    
    return {
      position: "fixed" as const,
      left: `${anchorRect.left}px` as const,
      bottom: `${window.innerHeight - anchorRect.top + 8}px` as const,
      top: "auto" as const,
    };
  }, [anchorRect]);

  // Standard menu items configuration.
  const standardItems = [
    { icon: FlagIcon, label: "Set as first page", action: () => {} },
    { icon: RenameIcon, label: "Rename", action: onRename },
    { icon: CopyIcon, label: "Copy", action: () => {} },
    { icon: DuplicateIcon, label: "Duplicate", action: () => {} },
  ];

  // Destructive menu item configuration.
  const destructiveItem = {
    icon: DeleteIcon,
    label: "Delete",
    action: onDelete,
  };

  // Base styles for menu items.
  const menuItemStyle = `
    w-full text-left flex items-center gap-[6px] p-[6px]
    font-[Inter] font-medium text-[14px] text-[#1A1A1A]
    hover:bg-[#E1E1E1] transition-colors
  `;

  const destructiveItemStyle = `
    ${menuItemStyle} text-[#EF494F] hover:bg-red-50
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop that closes menu when clicked. */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Animated menu container. */}
          <motion.div
            style={menuStyle}
            className="w-[240px] bg-white rounded-lg z-50 overflow-hidden flex flex-col
            shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),0px_1px_3px_0px_rgba(0,0,0,0.04)]
            border-[0.5px] border-[#E1E1E1]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Menu header. */}
            <div className="h-[40px] bg-[#FAFBFC] p-[12px] flex items-center">
              <h1 className="font-[BL_Melody] font-medium text-[16px] text-[#1A1A1A]">
                Settings
              </h1>
            </div>

            <div className="h-[0.5px] w-full bg-[#E1E1E1]" />

            {/* Menu items container. */}
            <div className="flex-1 py-[6px]">
              {/* Standard items list. */}
              <ul className="flex flex-col">
                {standardItems.map(({ icon: Icon, label, action }) => (
                  <li key={label}>
                    <button
                      onClick={() => { action(); onClose(); }}
                      className={menuItemStyle}
                    >
                      <Icon />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="h-[0.2px] mx-[12px] my-[6px] bg-[#E1E1E1]" />

              {/* Destructive item. */}
              <ul>
                <li>
                  <button
                    onClick={() => { destructiveItem.action(); onClose(); }}
                    className={destructiveItemStyle}
                  >
                    <destructiveItem.icon />
                    <span>{destructiveItem.label}</span>
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
