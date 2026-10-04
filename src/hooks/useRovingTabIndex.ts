import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

interface UseRovingTabIndexOptions {
  itemCount: number;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

export function useRovingTabIndex({
  itemCount,
  orientation = "horizontal",
  loop = true,
}: UseRovingTabIndexOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const setItemRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      itemRefs.current[index] = element;
    },
    [],
  );

  const moveFocus = useCallback(
    (nextIndex: number) => {
      if (itemCount === 0) {
        return;
      }

      let newIndex = nextIndex;

      if (loop) {
        if (newIndex < 0) {
          newIndex = itemCount - 1;
        }

        if (newIndex >= itemCount) {
          newIndex = 0;
        }
      } else {
        newIndex = Math.max(
          0,
          Math.min(newIndex, itemCount - 1),
        );
      }

      setActiveIndex(newIndex);

      requestAnimationFrame(() => {
        itemRefs.current[newIndex]?.focus();
      });
    },
    [itemCount, loop],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const nextKey =
        orientation === "horizontal"
          ? "ArrowRight"
          : "ArrowDown";

      const previousKey =
        orientation === "horizontal"
          ? "ArrowLeft"
          : "ArrowUp";

      if (event.key === nextKey) {
        event.preventDefault();
        moveFocus(activeIndex + 1);
      }

      if (event.key === previousKey) {
        event.preventDefault();
        moveFocus(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        moveFocus(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        moveFocus(itemCount - 1);
      }
    },
    [
      activeIndex,
      itemCount,
      moveFocus,
      orientation,
    ],
  );

  useEffect(() => {
    if (itemCount === 0) {
      return;
    }

    if (activeIndex >= itemCount) {
      setActiveIndex(itemCount - 1);
    }
  }, [activeIndex, itemCount]);

  return {
    activeIndex,
    setItemRef,
    handleKeyDown,
  };
}