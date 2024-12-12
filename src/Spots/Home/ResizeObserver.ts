import { useState, useCallback, useRef } from "react";

export interface ElementDimensions {
  contentWidth: number;
  contentHeight: number;
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  isOverflowingX: boolean;
  isOverflowingY: boolean;
  isOverflowing?: boolean;
}

export interface UseResizeObserverResponse {
  observeRef: (target: HTMLElement) => void;
  dimensions: ElementDimensions;
}

/**
 * @returns ref to pass to the target element, ElementDimensions
 */
export const useResizeObserver = (): UseResizeObserverResponse => {
  const [dimensions, setDimensions] = useState<ElementDimensions>(
    {} as ElementDimensions
  );
  const observer = useRef<ResizeObserver | null>(null); // we only need one observer instance
  const element = useRef<HTMLElement | null>(null);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    const newDimensions: ElementDimensions = {
      contentWidth: entry.contentRect.width,
      contentHeight: entry.contentRect.height,
      clientWidth: entry.target.clientWidth,
      clientHeight: entry.target.clientHeight,
      scrollWidth: entry.target.scrollWidth,
      scrollHeight: entry.target.scrollHeight,
      isOverflowingX: entry.target.clientWidth < entry.target.scrollWidth,
      isOverflowingY: entry.target.clientHeight < entry.target.scrollHeight,
      // compute once on access then replace the getter with result
      get isOverflowing() {
        delete this.isOverflowing;
        return (this.isOverflowing =
          this.isOverflowingX || this.isOverflowingY);
      },
    };

    setDimensions(newDimensions);
  }, []);

  // initialize resize observer
  const observeRef = useCallback(
    (target: HTMLElement) => {
      // the callback ref fires often without a target, so only process when we have a target
      if (!target) {
        return;
      }

      // instantiate a new observer if needed
      if (!observer.current) {
        observer.current = new ResizeObserver((entries) =>
          handleResize(entries)
        );
      }

      // monitor the new element with cleanup of the old element
      if (element.current !== target) {
        element.current && observer.current?.disconnect(); // call disconnect if monitoring old element
        observer.current.observe(target);
        element.current = target;
      }
    },
    [handleResize]
  );

  return { observeRef, dimensions };
};
