import React, { useState, useCallback, useEffect, useMemo } from "react";
import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import { useQuestionControls } from "@/context/QuestionControlsContext";
import { useQuestionMeta } from "@/context/QuestionMetaContext";
import useResultTracker from "@/hooks/useResultTracker";

// Data for the grid problems
const problemsData = [
  {
    id: 1,
    title: "Find the way in jumps of 10.",
    grid: [
      [730, 500, 497, 482, 616, 542],
      [456, 466, 366, 580, 530, 546],
      [556, 476, 480, 508, 526, 536],
      [650, 486, 496, 506, 516, 357],
      [730, 500, 497, 482, 616, 542],
    ],
    // Correct cells to be highlighted for validation (row, col)
    correctCells: [
      // Grid 1 correct cells
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 4 }, { row: 1, col: 5 },
      { row: 2, col: 1 }, { row: 2, col: 4 },
      { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 },
    ],
  },
  {
    id: 2,
    title: "Find the way in jumps of 10.",
    grid: [
      [730, 500, 497, 482, 616, 542],
      [456, 466, 366, 580, 530, 546],
      [556, 476, 480, 508, 526, 536],
      [650, 486, 496, 506, 516, 357],
      [730, 500, 497, 482, 616, 542],
    ],
    // Correct cells for the second grid, assuming they are the same as the first based on the image
    correctCells: [
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 4 }, { row: 1, col: 5 },
      { row: 2, col: 1 }, { row: 2, col: 4 },
      { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 },
    ],
  },
];

export default function ArrType_37({ hint }: { hint: string }) {
  const [selectedCells, setSelectedCells] = useState(
    problemsData.map((problem) => 
      problem.grid.map(() => problem.grid[0].map(() => false))
    )
  );
  const [status, setStatus] = useState<"match" | "wrong" | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { addResult } = useResultTracker();
  const { id: qId, title: qTitle } = useQuestionMeta();
  const { setControls } = useQuestionControls();

  const handleCellClick = useCallback(
    (problemIdx: number, rowIdx: number, colIdx: number) => {
      setSelectedCells((prev) => {
        const newSelectedCells = [...prev];
        newSelectedCells[problemIdx][rowIdx][colIdx] =
          !newSelectedCells[problemIdx][rowIdx][colIdx];
        return newSelectedCells;
      });
      setStatus(null); // Reset status on new interaction
    },
    []
  );

  const handleCheck = useCallback(() => {
    let allCorrect = true;
    problemsData.forEach((problem, problemIdx) => {
      problem.grid.forEach((row, rowIdx) => {
        row.forEach((_, colIdx) => {
          const isCorrectCell = problem.correctCells.some(
            (cell) => cell.row === rowIdx && cell.col === colIdx
          );
          const isSelected = selectedCells[problemIdx][rowIdx][colIdx];

          if (isCorrectCell !== isSelected) {
            allCorrect = false;
          }
        });
      });
    });

    setStatus(allCorrect ? "match" : "wrong");
    addResult({ id: qId, title: qTitle }, allCorrect);
  }, [selectedCells, addResult, qId, qTitle]);

  const handleShowSolution = useCallback(() => {
    const solutionCells = problemsData.map((problem) => {
      const problemGrid = problem.grid.map(() => problem.grid[0].map(() => false));
      problem.correctCells.forEach((cell) => {
        problemGrid[cell.row][cell.col] = true;
      });
      return problemGrid;
    });
    setSelectedCells(solutionCells);
    setShowSolution(true);
    setStatus("match"); // Solution is always "match"
  }, []);

  const handleShowHint = useCallback(() => setShowHint((v) => !v), []);

  const summary = useMemo(() => {
    if (!status) return null;
    return status === "match"
      ? { text: "🎉 Correct! Good Job", color: "text-green-600" }
      : { text: "❌ Some answers are wrong", color: "text-red-600" };
  }, [status]);

  useEffect(() => {
    setControls({
      handleCheck,
      handleShowHint,
      handleShowSolution,
      hint,
      showHint,
      summary,
    });
  }, [setControls, handleCheck, handleShowHint, handleShowSolution, hint, showHint, summary]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="text-xl font-semibold text-gray-800">Question 1</div>
      <div className="text-gray-600">Find the way in jumps of 10.</div>

      <div className="flex flex-wrap justify-center gap-8">
        {problemsData.map((problem, problemIdx) => (
          <div key={problem.id} className="border-2 border-orange-300 rounded-lg p-1">
            <div
              className="grid gap-0"
              style={{
                gridTemplateColumns: `repeat(${problem.grid[0].length}, minmax(0, 1fr))`,
              }}
            >
              {problem.grid.map((row, rowIdx) =>
                row.map((cellValue, colIdx) => (
                  <div
                    key={`${problem.id}-${rowIdx}-${colIdx}`}
                    className={`
                      flex items-center justify-center p-2 text-sm font-medium
                      border border-orange-200
                      w-16 h-10
                      ${selectedCells[problemIdx][rowIdx][colIdx] ? "bg-green-200" : "bg-white"}
                      ${showSolution && problem.correctCells.some(c => c.row === rowIdx && c.col === colIdx) ? 'border-green-500' : ''}
                      cursor-pointer select-none
                    `}
                    onClick={() => handleCellClick(problemIdx, rowIdx, colIdx)}
                  >
                    {cellValue}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <Controllers
        handleCheck={handleCheck}
        handleShowSolution={handleShowSolution}
        handleShowHint={handleShowHint}
      />
      {showHint && <Hint hint={hint} />}
      <Check summary={summary} />
    </div>
  );
}