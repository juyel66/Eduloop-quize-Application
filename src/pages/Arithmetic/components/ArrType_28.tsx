import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import { useState } from "react";
import useResultTracker from "@/hooks/useResultTracker";
import { useQuestionMeta } from "@/context/QuestionMetaContext";

/* ---- DashedInput Component ---- */
function DashedInput({
  value,
  onChange,
  invalid,
  correct,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  correct?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        className={`h-10 w-24 bg-transparent px-3 text-lg font-semibold outline-none
          text-center font-mono tabular-nums`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 border-b-2 border-dashed
          ${invalid ? "border-rose-500" : correct ? "border-emerald-600" : "border-slate-400"}`}
      />
    </div>
  );
}

/* ---- FractionProblem Component ---- */
function FractionProblem({
  numerator,
  denominator,
  inputState,
  onChange,
  isCorrect,
  isInvalid,
}: {
  numerator: number;
  denominator: number;
  inputState: string;
  onChange: (v: string) => void;
  isCorrect: boolean;
  isInvalid: boolean;
}) {
  const fractionColor = isCorrect ? "text-emerald-600" : "text-slate-800";
  const equalsColor = isCorrect ? "text-emerald-600" : "text-slate-800";

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex flex-col items-center">
          <span className={`text-2xl font-semibold ${fractionColor}`}>{numerator}</span>
          <div className="w-6 h-px bg-slate-400" />
          <span className={`text-2xl font-semibold ${fractionColor}`}>{denominator}</span>
        </div>
        <span className={`text-2xl font-semibold ${equalsColor}`}>=</span>
        <DashedInput
          value={inputState}
          onChange={onChange}
          invalid={isInvalid}
          correct={isCorrect}
        />
      </div>
    </div>
  );
}

/* ---- ArrType_28 Component ---- */
type Problem = {
  id: number;
  numerator: number;
  denominator: number;
  expected: string;
};

type ArrType28Props = {
  showHint: boolean;
  handleCheckAll: () => void;
  handleShowSolution: () => void;
  handleShowHint: () => void;
  hintText: string;
  summary?: { text: string; color: string };
};

const DUMMY_DATA: Problem[] = [
  { id: 1, numerator: 5, denominator: 3, expected: "1" },
  { id: 2, numerator: 9, denominator: 6, expected: "1" },
  { id: 3, numerator: 6, denominator: 3, expected: "2" },
  { id: 4, numerator: 12, denominator: 5, expected: "2" },
  { id: 5, numerator: 5, denominator: 3, expected: "1" },
  { id: 6, numerator: 9, denominator: 6, expected: "1" },
  { id: 7, numerator: 6, denominator: 3, expected: "2" },
  { id: 8, numerator: 12, denominator: 5, expected: "2" },
  { id: 9, numerator: 5, denominator: 3, expected: "1" },
  { id: 10, numerator: 9, denominator: 6, expected: "1" },
  { id: 11, numerator: 6, denominator: 3, expected: "2" },
  { id: 12, numerator: 12, denominator: 5, expected: "2" },
];

export default function ArrType_28({
  showHint,
  handleCheckAll,
  handleShowSolution,
  handleShowHint,
  hintText,
  summary,
}: ArrType28Props) {
  const [state, setState] = useState<Record<number, { val: string; checked: boolean }>>(() => {
    const init: Record<number, { val: string; checked: boolean }> = {};
    DUMMY_DATA.forEach((p) => (init[p.id] = { val: "", checked: false }));
    return init;
  });

  const setVal = (id: number, v: string) => {
    setState((s) => ({
      ...s,
      [id]: { ...s[id], val: v },
    }));
  };

  const isSolved = summary?.text.includes("Correct");

  return (
    <div className="flex flex-col items-start justify-start w-full px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Question 1</h2>
        <p className="text-slate-600 text-lg">Take the whole out.</p>
      </div>

      {/* Grid of problems */}
      <div className="grid grid-cols-4 gap-x-8 gap-y-12 w-full">
        {DUMMY_DATA.map((p) => {
          const correctVal = Math.floor(p.numerator / p.denominator).toString();
          const isCorrect = isSolved || (state[p.id].checked && state[p.id].val === correctVal);
          const isInvalid = state[p.id].checked && !isCorrect;

          return (
            <FractionProblem
              key={p.id}
              numerator={p.numerator}
              denominator={p.denominator}
              inputState={state[p.id].val}
              onChange={(v) => setVal(p.id, v)}
              isCorrect={isCorrect}
              isInvalid={isInvalid}
            />
          );
        })}
      </div>
    </div>
  );
}
