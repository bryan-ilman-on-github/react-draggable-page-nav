"use client";

import { JSX, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FlagIcon,
  RenameIcon,
  CopyIcon,
  DuplicateIcon,
  DeleteIcon,
} from "./icons";

/**
 * Defines the properties for the SettingsMenu component.
 */
interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onRename: () => void;
  /**
   * The DOMRect of the element the menu should anchor to.
   */
  anchorRect: DOMRect | null;
}

/**
 * A reusable settings menu component that appears anchored to a specific element.
 * @param {SettingsMenuProps} props - The properties for the SettingsMenu.
 */
export function SettingsMenu({
  isOpen,
  onClose,
  onDelete,
  onRename,
  anchorRect,
}: SettingsMenuProps): JSX.Element {
  /**
   * Handles closing the menu when the 'Escape' key is pressed.
   * This effect sets up and cleans up a keyboard event listener.
   */
  useEffect(() => {
    // Defines the function to handle keydown events.
    const handleEscape = (event: KeyboardEvent) => {
      // If the pressed key is 'Escape', close the menu.
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Adds the event listener when the component mounts.
    document.addEventListener("keydown", handleEscape);

    // Removes the event listener when the component unmounts or onClose changes.
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]); // Dependency array ensures the effect re-runs if onClose changes.

  /**
   * Determines if the menu should open upwards based on the anchor's vertical position.
   * This prevents the menu from rendering off-screen if the anchor is too low.
   */
  const shouldOpenUpwards = useMemo(() => {
    // If no anchor is provided, the menu won't open upwards.
    if (!anchorRect) return false;
    // Check if the anchor's top is in the lower half of the window.
    return anchorRect.top > window.innerHeight / 2;
  }, [anchorRect]); // Recalculates when anchorRect changes.

  /**
   * Calculates the inline style for positioning the menu.
   * The position is fixed and relative to the anchorRect, adjusting for 'shouldOpenUpwards'.
   */
  const menuStyle = useMemo(() => {
    // If there's no anchor, return an empty style object.
    if (!anchorRect) return {};

    // Base styles for the menu.
    const baseStyle: React.CSSProperties = {
      position: "fixed",
      left: `${anchorRect.left}px`, // Align left edge with anchor.
    };

    // Adjusts top or bottom based on menu direction.
    if (shouldOpenUpwards) {
      // If opening upwards, set bottom relative to anchor's top with a 4px offset.
      baseStyle.bottom = `${window.innerHeight - anchorRect.top + 4}px`;
      baseStyle.top = "auto"; // Ensure top is not set.
    } else {
      // If opening downwards, set top relative to anchor's bottom with a 4px offset.
      baseStyle.top = `${anchorRect.bottom + 4}px`;
      baseStyle.bottom = "auto"; // Ensure bottom is not set.
    }

    return baseStyle;
  }, [anchorRect, shouldOpenUpwards]); // Recalculates when anchorRect or shouldOpenUpwards changes.

  /**
   * Defines the standard menu items.
   * Each item has an icon, a display label, and an action function.
   */
  const menuItems = [
    { icon: FlagIcon, label: "Set as first page", action: () => {} },
    { icon: RenameIcon, label: "Rename", action: onRename },
    { icon: CopyIcon, label: "Copy", action: () => {} },
    { icon: DuplicateIcon, label: "Duplicate", action: () => {} },
  ];

  /**
   * Defines the destructive action item, distinct from standard items.
   * This item typically has a different visual treatment to signify its importance.
   */
  const destructiveMenuItem = {
    icon: DeleteIcon,
    label: "Delete",
    action: onDelete,
    isDestructive: true, // Flag to easily identify destructive actions.
  };

  return (
    // AnimatePresence manages enter/exit animations for direct children.
    <AnimatePresence>
      {/* Renders the menu content only when 'isOpen' is true. */}
      {isOpen && (
        <>
          {/* A backdrop to cover the screen and close the menu on outside clicks. */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose} // Closes the menu when clicked.
            aria-hidden="true" // Hides from accessibility tree.
          />
          {/* The main menu container, using Framer Motion for animations. */}
          <motion.div
            style={menuStyle} // Applies the calculated positioning style.
            className="w-[240px] bg-white rounded-lg shadow-lg z-50 overflow-hidden flex flex-col" // Tailwind CSS for appearance.
            initial={{ opacity: 0, y: shouldOpenUpwards ? 10 : -10 }} // Initial animation state.
            animate={{ opacity: 1, y: 0 }} // Animation when opening.
            exit={{ opacity: 0, y: shouldOpenUpwards ? 10 : -10 }} // Animation when closing.
            transition={{ duration: 0.2, ease: "easeOut" }} // Animation speed and curve.
          >
            {/* Header section for the menu. */}
            <div className="h-[40px] bg-[#FAFBFC] p-[12px] flex items-center">
              <h1 className="font-[BL_Melody] font-medium text-[16px] text-[#1A1A1A]">
                Settings
              </h1>
            </div>

            {/* A thin horizontal divider. */}
            <div className="h-[0.5px] w-full bg-[#E1E1E1]" />

            {/* Section containing the list of menu items. */}
            <div className="flex-1">
              <ul className="flex flex-col">
                {/* Renders each standard menu item. */}
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        item.action(); // Execute the item's specific action.
                        onClose(); // Close the menu after the action.
                      }}
                      className="w-full text-left flex items-center gap-[6px] p-[12px] text-[14px] font-[Inter] font-medium text-[#1A1A1A] transition-colors hover:bg-[#E1E1E1]"
                    >
                      <item.icon /> {/* Item's icon. */}
                      <span>{item.label}</span> {/* Item's label. */}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Another horizontal divider, visually separating item groups. */}
              <div className="h-[0.2px] mx-[12px] bg-[#E1E1E1]" />

              {/* Section for the destructive action item. */}
              <ul>
                <li>
                  <button
                    onClick={() => {
                      destructiveMenuItem.action(); // Execute the destructive action.
                      onClose(); // Close the menu.
                    }}
                    className="w-full text-left flex items-center gap-[6px] p-[12px] text-[14px] font-[Inter] font-medium text-[#EF494F] transition-colors hover:bg-red-50"
                  >
                    <destructiveMenuItem.icon />{" "}
                    {/* Destructive item's icon. */}
                    <span>{destructiveMenuItem.label}</span>{" "}
                    {/* Destructive item's label. */}
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