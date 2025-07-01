"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export function FormPage() {
  const [selected, setSelected] = useState<"yes" | "no" | null>("yes");

  // Reusable style variables to reduce repetition.
  const inputStyles = `
    w-full bg-[#2b354c] text-white rounded-md px-4 py-3 outline-none
    border-[0.5px] border-[#3c4860] placeholder:text-gray-400
    focus:ring-2 focus:ring-[#fab95a] transition
  `;

  const radioButtonBase = `
    w-32 flex items-center justify-start gap-3 px-4 py-3 rounded-md transition
    bg-[#2b354c] text-white border
  `;

  const radioButtonSelected = "border-white";
  const radioButtonUnselected = "border-[0.5px] border-[#3c4860]";

  const radioIndicatorBase = `
    w-5 h-5 rounded-full border flex items-center justify-center text-sm
  `;

  // Helper component for radio buttons.
  const RadioButton = ({
    value,
    label,
    icon: Icon,
  }: {
    value: "yes" | "no";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <button
      type="button"
      onClick={() => setSelected(value)}
      className={`${radioButtonBase} ${
        selected === value ? radioButtonSelected : radioButtonUnselected
      }`}
    >
      <div
        className={`${radioIndicatorBase} ${
          selected === value ? "border-white" : "border-gray-500"
        }`}
      >
        {selected === value && <Icon className="w-4 h-4 text-white" />}
      </div>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#141e35] text-white flex items-center justify-center px-4">
      <form className="w-full max-w-md">
        {/* Name input section. */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-medium text-lg mb-4">
            What's your name? <span className="text-white">*</span>
          </label>
          <input
            id="name"
            type="text"
            className={inputStyles}
            placeholder="Enter your name"
          />
        </div>

        {/* Attendance selection section. */}
        <div className="mb-6">
          <p className="font-medium text-lg mb-4">
            Are you able to attend? <span className="text-white">*</span>
          </p>
          <div className="space-y-3">
            <RadioButton value="yes" label="Yes" icon={Check} />
            <RadioButton value="no" label="Nope" icon={X} />
          </div>
        </div>

        {/* Form submission button. */}
        <button
          type="submit"
          onClick={(e) => e.preventDefault()}
          className="bg-[#e0a650] hover:bg-[#fcbf6f] text-black font-semibold 
          rounded-md px-6 py-3 w-fit flex items-center gap-[2px] transition-colors"
        >
          Next
          <ArrowRight className="w-5 h-5 -mb-[1px]" />
        </button>
      </form>
    </div>
  );
}
