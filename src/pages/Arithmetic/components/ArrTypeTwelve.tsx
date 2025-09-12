import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import React, { useState } from "react";

const hint =
  "Look at the pattern of hours. The missing clock should be between the given ones.";

const data = [
  {
    id: 1,
    clocks: [
      { value: { hour: 7, minute: 0 }, correct: { hour: 7, minute: 0 } },
      { user: true, correct: { hour: 8, minute: 0 } },
      { value: { hour: 9, minute: 0 }, correct: { hour: 9, minute: 0 } },
    ],
  },
  {
    id: 2,
    clocks: [
      { value: { hour: 3, minute: 0 }, correct: { hour: 3, minute: 0 } },
      { user: true, correct: { hour: 4, minute: 0 } },
      { value: { hour: 5, minute: 0 }, correct: { hour: 5, minute: 0 } },
    ],
  },
];

export default function ArrTypeTwelve() {
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: { hour: number; minute: number };
  }>({});
  const [isOpen, setIsOpen] = useState<{ rowId: number; clockIndex: number } | null>(
    null
  );
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(0);
  const [status, setStatus] = useState<"match" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleOpenModal = (
    rowId: number,
    clockIndex: number,
    existing?: { hour: number; minute: number }
  ) => {
    setTempHour(existing?.hour || 0);
    setTempMinute(existing?.minute || 0);
    setIsOpen({ rowId, clockIndex });
  };

  const handleSave = () => {
    if (isOpen) {
      setUserAnswers((prev) => ({
        ...prev,
        [`${isOpen.rowId}-${isOpen.clockIndex}`]: {
          hour: tempHour,
          minute: tempMinute,
        },
      }));
      setIsOpen(null);
    }
  };

  const handleCheck = () => {
    let allCorrect = true;
    data.forEach((row) => {
      row.clocks.forEach((clock, index) => {
        if (clock.user) {
          const ans = userAnswers[`${row.id}-${index}`];
          if (
            !ans ||
            ans.hour !== clock.correct.hour ||
            ans.minute !== clock.correct.minute
          ) {
            allCorrect = false;
          }
        }
      });
    });
    setStatus(allCorrect ? "match" : "wrong");
    setChecked(true);
  };

  const handleShowSolution = () => {
    const filled: { [key: string]: { hour: number; minute: number } } = {};
    data.forEach((row) => {
      row.clocks.forEach((clock, index) => {
        if (clock.user) {
          filled[`${row.id}-${index}`] = clock.correct;
        }
      });
    });
    setUserAnswers(filled);
    setStatus("match");
    setChecked(true);
  };

  const handleShowHint = () => setShowHint((v) => !v);

  const summary =
    status === "match"
      ? {
          text: "🎉 All Correct! Great job",
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-600",
        }
      : status === "wrong"
      ? {
          text: "❌ Some answers are wrong. Check again.",
          color: "text-red-600",
          bgColor: "bg-red-100",
          borderColor: "border-red-600",
        }
      : null;

  // ⏰ Clock component
  const Clock = ({
    hour,
    minute,
    onClick,
    highlight,
    hideHands,
  }: {
    hour: number;
    minute: number;
    onClick?: () => void;
    highlight?: "correct" | "wrong";
    hideHands?: boolean;
  }) => {
    const hourDeg = (hour % 12) * 30 + minute * 0.5;
    const minuteDeg = minute * 6;
    return (
      <div
        className={`relative w-32 h-32 border-2 border-green-600 rounded-full flex items-center justify-center bg-slate-50 cursor-pointer
          ${
            highlight === "correct"
              ? "ring-4 ring-green-400"
              : highlight === "wrong"
              ? "ring-4 ring-red-400"
              : ""
          }`}
        onClick={onClick}
      >
        {/* Hands (only show if not hidden) */}
        {!hideHands && (
          <>
            {/* Hour hand */}
            <div
              className="absolute bottom-1/2 left-1/2 w-1 rounded-lg h-10 bg-gray-700 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
            />
            {/* Minute hand */}
            <div
              className="absolute bottom-1/2 left-1/2 w-0.5 h-11 rounded-lg bg-red-500 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
            />
            {/* Center dot */}
            <div className="absolute w-2 h-2 bg-red-500 rounded-full" />
          </>
        )}

        {/* Placeholder for empty user clock */}
        {hideHands && (
          <div className="absolute text-xs text-gray-500 font-medium">
            Set Time
          </div>
        )}

        {/* Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const x = 50 + 40 * Math.sin((angle * Math.PI) / 180);
          const y = 50 - 40 * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-[10px] font-bold"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* Multiple sets of clocks stacked vertically */}
      <div className="flex flex-col items-center gap-10 p-6">
        {data.map((row) => (
          <div key={row.id} className="flex gap-6">
            {row.clocks.map((clock, index) => {
              const userAns = userAnswers[`${row.id}-${index}`];
              let highlight: "correct" | "wrong" | undefined;

              if (checked && clock.user) {
                if (
                  userAns &&
                  userAns.hour === clock.correct.hour &&
                  userAns.minute === clock.correct.minute
                ) {
                  highlight = "correct";
                } else {
                  highlight = "wrong";
                }
              }

              return (
                <Clock
                  key={`${row.id}-${index}`}
                  hour={clock.value?.hour ?? userAns?.hour ?? 0}
                  minute={clock.value?.minute ?? userAns?.minute ?? 0}
                  onClick={
                    clock.user
                      ? () => handleOpenModal(row.id, index, userAns)
                      : undefined
                  }
                  highlight={highlight}
                  hideHands={clock.user && !userAns}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Set Time</h2>
            <div className="flex gap-4">
              <div>
                <label className="block text-sm mb-1">Hour</label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={tempHour}
                  onChange={(e) => setTempHour(Number(e.target.value))}
                  className="border p-2 rounded w-20"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Minute</label>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={tempMinute}
                  onChange={(e) => setTempMinute(Number(e.target.value))}
                  className="border p-2 rounded w-20"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsOpen(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controllers */}
      <div>
        <Controllers
          handleCheck={handleCheck}
          handleShowSolution={handleShowSolution}
          handleShowHint={handleShowHint}
        />
        {showHint && <Hint hint={hint} />}
        <Check summary={summary} />
      </div>
    </div>
  );
}
