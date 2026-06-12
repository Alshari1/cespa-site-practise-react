import { useState  } from "react";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const [value, setValue] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-sm shadow-xl p-6 w-80 font-['Jost']">
        {/* <p className="text-sm text-[#2b3232] leading-relaxed mb-4">
          {message}
        </p> */}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="Type delete to confirm"
        />

        <div className="flex justify-end mt-5 gap-5">
          <button
            onClick={onConfirm}
            disabled={value !== "delete"}
            className={`border-none text-xs tracking-[0.14em] uppercase border px-4 py-2 transition-colors
    ${value === "delete"
                ? "text-red-600 cursor-pointer"
                : "text-[#9aabab] cursor-not-allowed opacity-50"
              }`}
          >
            delete
          </button>
          <button
            onClick={onCancel}
            className=" border-none text-xs tracking-[0.14em] uppercase text-[#9aabab] cursor-pointer transition-colors"
          >
            x
          </button>
        </div>

      </div>
    </div>
  );
}
