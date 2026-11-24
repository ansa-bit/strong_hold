"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import OpenContactButton from '@/component/OpenContactButton';
import type { Faq } from '@/sanity/lib/content';

interface FAQSectionProps {
  page?: string;
  faqs: Faq[];
}

const FAQSection = ({ page, faqs }: FAQSectionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id={page === "services" ? "services-faq" : "faq"}
      className={`${page==="services"?"bg-white":"bg-[#EBF9FB]"} py-20 md:py-32 px-6 md:px-12`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
      
        <div className="flex flex-col gap-8">
          <div>
            <span className="px-4 py-1.5 border border-gray-400/30 rounded-lg text-sm font-medium text-gray-700 bg-white/20">
              FAQ&apos;s
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-gray-900 ">
            Frequently Asked Questions
          </h2>

          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-gray-900">
              Looking for clarity before you begin?

            </p>
            <p className="text-[#6B7C8B] max-w-sm">
            Our team is always ready to guide you with the right information and timely support, ensuring confidence at every stage of your project.
            </p>
          </div>

          <OpenContactButton className="bg-[#002D5B] hover:bg-[#003B73] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all w-fit active:scale-95 shadow-lg shadow-blue-900/10">
            Get a Free Call
            <ArrowUpRight size={20} />
          </OpenContactButton>
        </div>

       
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="border-b border-blue-200/60"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full py-7 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${activeIndex === index ? 'text-[#00A3B1]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                
               
                <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-[#00D1FF] border-[#00D1FF] text-white rotate-180' : 'border-[#00D1FF] text-[#00D1FF]'}`}>
                  <ChevronDown size={16} strokeWidth={3} />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-[#6B7C8B] leading-relaxed max-w-xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
