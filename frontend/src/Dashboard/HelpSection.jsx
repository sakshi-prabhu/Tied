import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineChartBar,
  HiOutlineChevronDown,
  HiOutlineColorSwatch,
  HiOutlineLink,
  HiOutlineShare,
} from "react-icons/hi";

const steps = [
  {
    icon: HiOutlineLink,
    title: "Add your links",
    text: "Go to My Links and click “+ Add Link”. Paste a URL and give it a title. The icon is picked automatically.",
    to: "/dashboard/mylinks",
    cta: "Open My Links",
  },
  {
    icon: HiOutlineColorSwatch,
    title: "Style your profile",
    text: "In Appearance, upload a photo, write a short bio and choose a theme and button style.",
    to: "/dashboard/appearance",
    cta: "Open Appearance",
  },
  {
    icon: HiOutlineShare,
    title: "Share your Tied link",
    text: "On the Overview page, copy your profile link and put it in your bio, posts or messages.",
    to: "/dashboard",
    cta: "Open Overview",
  },
  {
    icon: HiOutlineChartBar,
    title: "Track how it's doing",
    text: "Analytics shows profile views, link clicks and click-through rate for the period you choose.",
    to: "/dashboard/analytics",
    cta: "Open Analytics",
  },
];

const faqs = [
  {
    question: "How do I hide a link without deleting it?",
    answer:
      "On My Links, click the Visible / Hidden toggle on that link. Hidden links stay saved but don't show on your public profile.",
  },
  {
    question: "How do I edit or delete a link?",
    answer: "On My Links, open the ⋯ menu on the link and choose Edit or Delete.",
  },
  {
    question: "Will my old links break if I change my username?",
    answer:
      "No. Links using your previous usernames automatically redirect to your new profile link, so anything you've already shared keeps working.",
  },
  {
    question: "What is click-through rate?",
    answer:
      "It's the percentage of profile visits where the visitor tapped at least one of your links: visits with a click ÷ total visits × 100. For example, if 100 people visit and 25 of them tap a link, your click-through rate is 25%, even if some of them tap several links. So it's always between 0% and 100%. Each visitor counts once per day, and bot traffic isn't counted.",
  },
  {
    question: "Why can't I change my password?",
    answer:
      "If you signed up with Google, your password is managed by Google, so there is no Tied password to change. Email accounts can use Change Password above.",
  },
  {
    question: "Can I change my email address?",
    answer: "Not yet. Your email is tied to how you sign in, so it can't be edited from Settings.",
  },
];

const HelpSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>

      {/* Getting started */}
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Getting started
      </h3>

      <ol className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex gap-4 p-4 border border-gray-200 rounded-lg dark:border-slate-700"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xl dark:bg-teal-950/50 dark:text-teal-400">
              <step.icon />
            </div>

            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {index + 1}. {step.title}
              </p>

              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                {step.text}
              </p>

              <Link
                to={step.to}
                className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-teal-700 hover:text-teal-800 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
              >
                {step.cta} <HiOutlineArrowRight />
              </Link>
            </div>
          </li>
        ))}
      </ol>


      {/* FAQ */}
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Frequently asked questions
      </h3>

      <div className="mt-3 border border-gray-200 rounded-lg divide-y divide-gray-200 dark:border-slate-700 dark:divide-slate-700">
        {faqs.map((faq, index) => {
          const open = openIndex === index;

          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-slate-800/60"
              >
                {faq.question}
                <HiOutlineChevronDown
                  className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default HelpSection;
