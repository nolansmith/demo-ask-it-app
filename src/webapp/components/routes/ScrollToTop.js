import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React-router documented way to scroll to the top on each page navigation
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}