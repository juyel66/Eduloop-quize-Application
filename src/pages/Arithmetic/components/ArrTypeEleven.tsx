import Check from "@/components/common/Check";
import Controllers from "@/components/common/Controllers";
import Hint from "@/components/common/Hint";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    column: [0, 3, 4, 5], // always have 0 at first index
    rows: [
      {
        header: 2,
        cells: [
          { value: 5, correct: 5 }, // prefilled
          { correct: 6 },
          { correct: 7 },
        ],
      },
      {
        header: 3,
        cells: [{ correct: 6 }, { correct: 7 }, { correct: 8 }],
      },
    ],
  },
];

const hint = "Use row header + column header to calculate the answer.";

export default function ArrTypeEleven() {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<"match" | "wrong" | null>(null);
  const [checked, setChecked] = useState(false); // to show feedback after check

  const handleShowHint = () => setShowHint((v) => !v);

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value,
    }));
  };

  const handleCheck = () => {
    let allCorrect = true;

    data.forEach((d) => {
      d.rows.forEach((r, rowIndex) => {
        r.cells.forEach((c, colIndex) => {
          if (c.value === undefined) {
            const userValue = userAnswers[`${rowIndex}-${colIndex}`];
            if (Number(userValue) !== c.correct) {
              allCorrect = false;
            }
          }
        });
      });
    });

    setStatus(allCorrect ? "match" : "wrong");
    setChecked(true);
  };

  const handleShowSolution = () => {
    const filled: { [key: string]: string } = {};
    data.forEach((d) => {
      d.rows.forEach((r, rowIndex) => {
        r.cells.forEach((c, colIndex) => {
          if (c.value === undefined) {
            filled[`${rowIndex}-${colIndex}`] = String(c.correct);
          }
        });
      });
    });
    setUserAnswers(filled);
  };

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

  return (
    <div>
      <div className="p-4">
        {data.map((d) => (
          <table
            key={d.id}
            className="border-collapse border-2 border-primary text-xl font-semibold"
          >
            <thead>
              <tr>
                {d.column.map((c, i) => (
                  <th
                    key={i}
                    className={`border-2 border-primary w-16 h-12 ${
                      c === 0 ? "bg-transparent" : "bg-primary/10"
                    }`}
                  >
                    {c === 0 ? "" : `+${c}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.rows.map((r, rowIndex) => (
                <tr key={rowIndex}>
                  {/* row header */}
                  <td className="border-2 border-primary w-16 h-12 bg-primary/10 text-center">
                    {r.header}
                  </td>
                  {/* row cells */}
                  {r.cells.map((c, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    const userValue = userAnswers[key];
                    let cellClass = "";

                    if (checked && c.value === undefined) {
                      if (Number(userValue) === c.correct) {
                        cellClass = "text-green-600 font-bold";
                      } else {
                        cellClass = "text-red-600 font-bold";
                      }
                    }

                    return (
                      <td
                        key={colIndex}
                        className="border-2 border-primary w-16 h-12 text-center"
                      >
                        {c.value !== undefined ? (
                          c.value
                        ) : (
                          <input
                            type="text"
                            value={userValue || ""}
                            onChange={(e) =>
                              handleInputChange(rowIndex, colIndex, e.target.value)
                            }
                            className={`w-full h-full text-center outline-none ${cellClass}`}
                            disabled={status === "match"} // lock after solved
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>

      {/* controllers */}
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
