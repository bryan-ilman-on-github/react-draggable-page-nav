"use client";

import { AddIcon } from "./icons";

interface AddPageButtonProps {
  onClick: () => void;
}

export function AddPageButton({ onClick }: AddPageButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full p-1 text-white/70 transition-colors"
      aria-label="Add new page"
    >
      <AddIcon className="h-5 w-5" />
    </button>
  );
}