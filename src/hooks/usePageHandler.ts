import { useEffect } from "react";

const usePageHandler = (callback: () => void) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Call the provided callback function
      callback();
      // Optionally, add a confirmation dialog if needed
      // event.preventDefault();
      // event.returnValue = ''; // This triggers the confirmation dialog in some browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [callback]);
};

export default usePageHandler;
