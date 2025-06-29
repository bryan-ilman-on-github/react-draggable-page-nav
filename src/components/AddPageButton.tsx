"use client";

import { SmallAddIcon } from "./icons";

interface AddPageButtonProps {
  onClick: () => void;
}

export function AddPageButton({ onClick }: AddPageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#FFFFFF] hover:bg-gray-100 rounded-full p-[4px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.02),_0px_1px_3px_0px_rgba(0,0,0,0.04)] border-[0.5px] border-[#E1E1E1] transition-colors"
      aria-label="Add new page"
    >
      <SmallAddIcon />
    </button>
  );
}