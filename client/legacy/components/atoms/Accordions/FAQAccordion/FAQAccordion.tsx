import { useState } from "react";
import { FAQData } from "./FAQAccordion.data";
import { RiAddCircleLine, RiIndeterminateCircleLine } from "@/components/atoms/Icons/Icons";
import './FAQAccordion.scss';

export default function FAQAccordion() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <div className="faq-accordion">
      {/* {FAQData.map((item, index) => (
        <div className="faq-accordion__item" key={item.id || index}>
          <button 
            className={`faq-accordion__button ${
              expandedIndices.includes(index) ? 'faq-accordion__button--expanded' : ''
            }`}
            id={`heading-${index}`} 
            onClick={() => toggleAccordion(index)}
            aria-expanded={expandedIndices.includes(index)}
            aria-controls={`panel-${index}`}
          >
            <h3 className="faq-accordion__question">
              {t(item.question)}
            </h3>
            <span className="faq-accordion__icon">
              {expandedIndices.includes(index) ? <RiIndeterminateCircleLine /> : <RiAddCircleLine />}
            </span>
          </button>
          
          {expandedIndices.includes(index) && (
            <div 
              className="faq-accordion__panel faq-accordion__panel--expanded"
              id={`panel-${index}`}
              aria-labelledby={`heading-${index}`}
            >
              <p className="faq-accordion__answer">
                {t(item.answer)}
              </p>
              {item.links && (
                <div className="faq-accordion__links">
                  <ul>
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.link} target="_blank" rel="noopener noreferrer">
                          {t(link.title)}
                        </a>
                      </li>
                    ))}
                  </ul>
                  {item.answer2 && (
                    <p className="faq-accordion__answer2">
                      {t(item.answer2)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
}
