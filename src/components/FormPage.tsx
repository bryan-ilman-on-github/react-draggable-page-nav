"use client";

import { Check, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export function FormPage() {
  const [selected, setSelected] = useState<"yes" | "no" | null>("yes");

  return (
    <div className="min-h-screen bg-[#16223a] text-white flex items-center justify-center px-4">
      <form className="w-full max-w-md">
        {/* Name Input */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block font-medium text-lg mb-2"
          >
            What's your name? <span className="text-white">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-full bg-[#1c2b49] text-white rounded-md px-4 py-3 outline-none border-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#fab95a] transition"
          />
        </div>

        {/* Radio Options */}
        <div className="mb-8">
          <p className="font-medium text-lg mb-3">
            Are you able to attend? <span className="text-white">*</span>
          </p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSelected("yes")}
              className={`w-32 flex items-center justify-start gap-3 px-4 py-3 rounded-md transition
                ${
                  selected === "yes"
                    ? "bg-[#1c2b49] border border-white text-white"
                    : "bg-[#1c2b49] border border-[#1c2b49] text-white opacity-60"
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-sm ${
                  selected === "yes" ? "border-white" : "border-gray-500"
                }`}
              >
                {selected === "yes" && (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
              Yes
            </button>

            <button
              type="button"
              onClick={() => setSelected("no")}
              className={`w-32 flex items-center justify-start gap-3 px-4 py-3 rounded-md transition
                ${
                  selected === "no"
                    ? "bg-[#1c2b49] border border-white text-white"
                    : "bg-[#1c2b49] border border-[#1c2b49] text-white opacity-60"
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center text-sm ${
                  selected === "no" ? "border-white" : "border-gray-500"
                }`}
              >
                {selected === "no" && (
                  <X className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
              Nope
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={(e) => e.preventDefault()}
          className="bg-[#fab95a] hover:bg-[#fcbf6f] text-black font-semibold rounded-md px-6 py-3 w-fit flex items-center gap-[2px] transition-colors"
        >
          Next<ArrowRight className="w-5 h-5 -mb-[1px]" />
        </button>
      </form>
    </div>
  );
}