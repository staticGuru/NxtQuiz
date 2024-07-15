import { useEffect } from 'react';

const useIframeResize = (attribute: any) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    // Function to send the height and attribute to the parent window
    const sendHeight = () => {
      setTimeout(() => {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(
          { height, ...attribute },
          process.env.NEXT_PUBLIC_POST_LOGIN_AREA_URL || 'http://localhost',
        );
      }, 100); // Delay to ensure all content is rendered
    };

    // Send height and attribute initially after the component mounts
    sendHeight();

    // Optionally, add an event listener for resizing or other updates
    window.addEventListener('resize', sendHeight);

    // Use MutationObserver to handle dynamic content changes
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Cleanup event listener and observer on component unmount
    return () => {
      window.removeEventListener('resize', sendHeight);
      observer.disconnect();
    };
  }, [attribute]);
};

export default useIframeResize;
