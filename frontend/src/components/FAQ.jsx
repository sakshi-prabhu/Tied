import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Tied?",
      answer:
        "Tied is a centralized platform that lets you bring your social profiles, links, portfolio, and other online identities together in one customizable page. Instead of sharing multiple links, you can share one Tied profile.",
    },
    {
      question: "Who is Tied for?",
      answer:
        "Tied is for anyone who wants a simpler way to manage and share their online presence — students, creators, developers, freelancers, professionals, and anyone with multiple online profiles.",
    },
    {
      question: "Can I customize my Tied profile?",
      answer:
        "Yes. You can personalize your profile with your information, social links, colors, and other elements to make your Tied page feel like your own digital identity.",
    },
    {
      question: "Do I need to share all my social media accounts?",
      answer:
        "Not at all. You choose what appears on your Tied profile. Add only the platforms, links, and information you want others to see.",
    },
    {
      question: "Can I see how people interact with my profile?",
      answer:
        "Yes. Tied is designed to give you insights into your digital presence, helping you understand how people interact with your shared profile and links.",
    },
    {
      question: "How do I share my Tied profile?",
      answer:
        "Once your profile is ready, you can share your unique Tied link anywhere — on social media, resumes, portfolios, emails, or wherever you want people to find you.",
    },
  ];

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
    
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>

   
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                onClick={() => handleClick(index)}
                className="p-4 sm:p-6 flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {index + 1}. {faq.question}
                </h3>

                <span className="text-2xl font-medium text-teal-600 ml-4">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
