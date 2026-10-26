import { useLayoutEffect, useRef, useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

// "?" button that shows a short explanation; place inside a `relative` container.
// Hover on desktop, tap on mobile (tapping elsewhere closes it)
const InfoTip = ({ label, text }) => {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(false);
  const tipRef = useRef(null);

  // Open upward when there isn't room below (e.g. a card at the bottom of the page),
  // otherwise the tooltip runs off the screen and stretches the page
  useLayoutEffect(() => {
    if (!show) return;
    const tip = tipRef.current;
    const anchor = tip.parentElement.getBoundingClientRect();
    const height = tip.offsetHeight + 8;
    setAbove(anchor.bottom + height > window.innerHeight && anchor.top > height);
  }, [show]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onBlur={() => setShow(false)}
        aria-label={`What is ${label}?`}
        aria-expanded={show}
        className="text-gray-400 hover:text-gray-600 text-lg dark:text-gray-500 dark:hover:text-gray-300"
      >
        <HiOutlineQuestionMarkCircle />
      </button>

      {show && (
        <p
          ref={tipRef}
          role="tooltip"
          className={`absolute left-0 z-10 w-72 max-w-[80vw] p-3 text-sm font-normal text-white bg-slate-900 rounded-lg shadow-lg dark:bg-slate-700 ${
            above ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {text}
        </p>
      )}
    </>
  );
};

export default InfoTip;
