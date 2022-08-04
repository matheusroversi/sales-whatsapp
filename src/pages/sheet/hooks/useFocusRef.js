import {
  useRef,
  useEffect,
  useLayoutEffect as useOriginalLayoutEffect
} from "react";

export const useLayoutEffect =
  typeof window === "undefined" ? useEffect : useOriginalLayoutEffect;

export const useFocusRef = isSelected => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!isSelected) return;
    ref.current?.focus({ preventScroll: true });
  }, [isSelected]);

  return {
    ref,
    tabIndex: isSelected ? 0 : -1
  };
};
