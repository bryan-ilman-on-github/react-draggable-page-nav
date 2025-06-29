"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion, MotionStyle } from "framer-motion";
import {
  FlagIcon,
  RenameIcon,
  CopyIcon,
  DuplicateIcon,
  DeleteIcon,
} from "./icons";

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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const openUp = useMemo(() => {
    if (!anchorRect) return false;
    return anchorRect.top > window.innerHeight / 2;
  }, [anchorRect]);

  const menuStyle = useMemo(() => {
    if (!anchorRect) return {};
    return {
      position: "fixed",
      top: openUp ? "auto" : `${anchorRect.bottom + 4}px`,
      bottom: openUp ? `${window.innerHeight - anchorRect.top + 4}px` : "auto",
      left: `${anchorRect.left}px`,
    };
  }, [anchorRect, openUp]);

  const menuItems = [
    { icon: FlagIcon, label: "Set as first page", action: () => {} },
    { icon: RenameIcon, label: "Rename", action: onRename },
    { icon: CopyIcon, label: "Copy", action: () => {} },
    { icon: DuplicateIcon, label: "Duplicate", action: () => {} },
    {
      icon: DeleteIcon,
      label: "Delete",
      action: onDelete,
      isDestructive: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            style={menuStyle as MotionStyle}
            className="w-56 bg-white rounded-lg shadow-lg z-50 py-2"
            initial={{ opacity: 0, y: openUp ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUp ? 5 : -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <p className="px-4 py-2 text-sm font-semibold text-gray-800">
              Settings
            </p>
            <ul>
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.label === "Delete" && <hr className="my-1" />}
                  <button
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className={`w-full text-left flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                      item.isDestructive
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {/* TODO: Remove extra attributes */}
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}