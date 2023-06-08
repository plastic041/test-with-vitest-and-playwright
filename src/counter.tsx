import { useState } from "react";
import { Button } from "./button";

const MAX_COUNT = 999 as const;
const MIN_COUNT = 0 as const;

type CounterProps = {
  initial?: number;
};

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);
  const countPadded = count.toString().padStart(3, "0");
  const [first, second, third] = countPadded.split("");

  return (
    <div className="flex flex-row items-stretch gap-2">
      <h2
        aria-label="count"
        className="text-8xl font-bold tabular-nums font-mono p-4 flex items-center tracking-tighter text-gray-900"
      >
        <span className={`${count < 100 && "opacity-25"} transition-opacity`}>
          {first}
        </span>
        <span className={`${count < 10 && "opacity-25"} transition-opacity`}>
          {second}
        </span>
        <span className="text-gray-900">{third}</span>
      </h2>
      <div aria-hidden className="border-r-2 border-gray-500" />
      <div className="flex flex-col ml-4 gap-2">
        <Button
          aria-label="increment"
          disabled={count >= MAX_COUNT}
          className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white disabled:bg-green-500/50 disabled:text-white/50"
          onClick={() =>
            setCount((prev) => {
              if (prev >= MAX_COUNT) {
                return MAX_COUNT;
              }
              return prev + 1;
            })
          }
        >
          <span className="i-radix-icons-plus" />
        </Button>
        <Button
          aria-label="decrement"
          disabled={count <= MIN_COUNT}
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white disabled:bg-red-500/50 disabled:text-white/50"
          onClick={() =>
            setCount((prev) => {
              if (prev <= MIN_COUNT) {
                return MIN_COUNT;
              }
              return prev - 1;
            })
          }
        >
          <span className="i-radix-icons-minus" />
        </Button>
      </div>
    </div>
  );
}
