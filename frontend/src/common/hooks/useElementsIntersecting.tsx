import React from 'react';

type Prop = React.RefObject<HTMLElement>;

/*
 * This hook checks if two elements are intersecting with each other
 * and returns a boolean value
 */
const useElementsIntersecting = (firstRef: Prop, secondRef: Prop) => {
  const [intersecting, setIntersecting] = React.useState(false);

  const checkIfElementIsOverlapping = React.useCallback(() => {
    if (firstRef.current && secondRef.current) {
      const a = firstRef.current.getBoundingClientRect();
      const b = secondRef.current.getBoundingClientRect();

      if (a.bottom >= b.top && a.top <= b.bottom) {
        setIntersecting(true);
      } else {
        setIntersecting(false);
      }
    }
  }, [firstRef, secondRef]);

  React.useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', checkIfElementIsOverlapping);
    }
    watchScroll();
    checkIfElementIsOverlapping();

    // Using mutation observer so that in case the children of ref changes, it will
    // call checkIfElementIsOverlapping function again
    const observer = new MutationObserver(checkIfElementIsOverlapping);
    if (firstRef.current) {
      observer.observe(firstRef.current, { childList: true });
    }
    if (secondRef.current) {
      observer.observe(secondRef.current, { childList: true });
    }

    return () => {
      window.removeEventListener('scroll', checkIfElementIsOverlapping);
      observer.disconnect(); // Stop observing on cleanup
    };
  }, [checkIfElementIsOverlapping, firstRef, secondRef]);

  return intersecting;
};

export default useElementsIntersecting;
