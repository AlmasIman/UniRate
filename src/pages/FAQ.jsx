import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { useState } from "react";
import classNames from "classnames";
import plus from "../assets/icons/plus.svg";
import minus from "../assets/icons/minusFaq.svg";
import faq from "../assets/styles/Faq.module.css";

const faqData = [
  {
    question: "Posuere amet vel egestas malesuada vel odio neque.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum arcu, dolor, molestie feugiat rutrum id urna quisque purus. Sit ut non urna auctor libero, dictumst ut adipiscing. Platea non convallis vel iaculis nec odio. Nulla habitant felis laoreet pharetra scelerisque placerat scelerisque interdum. Lacus habitasse neque, scelerisque aliquet. Nec, bibendum viverra vitae, molestie cum ut. Pharetra lectus volutpat arcu ut ultrices eu sit volutpat. Pretium egestas in massa cursus ornare. Amet, non gravida rutrum luctus ",
  },
  {
    question: "Posuere amet vel egestas malesuada vel odio neque.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum arcu, dolor, molestie feugiat rutrum id urna quisque purus. Sit ut non urna auctor libero, dictumst ut adipiscing. Platea non convallis vel iaculis nec odio. Nulla habitant felis laoreet pharetra scelerisque placerat scelerisque interdum. Lacus habitasse neque, scelerisque aliquet. Nec, bibendum viverra vitae, molestie cum ut. Pharetra lectus volutpat arcu ut ultrices eu sit volutpat. Pretium egestas in massa cursus ornare. Amet, non gravida rutrum luctus ",
  },
  {
    question: "Posuere amet vel egestas malesuada vel odio neque.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum arcu, dolor, molestie feugiat rutrum id urna quisque purus. Sit ut non urna auctor libero, dictumst ut adipiscing. Platea non convallis vel iaculis nec odio. Nulla habitant felis laoreet pharetra scelerisque placerat scelerisque interdum. Lacus habitasse neque, scelerisque aliquet. Nec, bibendum viverra vitae, molestie cum ut. Pharetra lectus volutpat arcu ut ultrices eu sit volutpat. Pretium egestas in massa cursus ornare. Amet, non gravida rutrum luctus ",
  },
  {
    question: "Posuere amet vel egestas malesuada vel odio neque.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum arcu, dolor, molestie feugiat rutrum id urna quisque purus. Sit ut non urna auctor libero, dictumst ut adipiscing. Platea non convallis vel iaculis nec odio. Nulla habitant felis laoreet pharetra scelerisque placerat scelerisque interdum. Lacus habitasse neque, scelerisque aliquet. Nec, bibendum viverra vitae, molestie cum ut. Pharetra lectus volutpat arcu ut ultrices eu sit volutpat. Pretium egestas in massa cursus ornare. Amet, non gravida rutrum luctus ",
  },
];

function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes(
      (prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index) 
          : [...prevIndexes, index] 
    );
  };
  return (
    <>
      <Header />
      <div className={faq.mainDiv}>
        <h1>FAQ</h1>
        <div className={faq.accordion}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={classNames(faq.accordionItem, {
                [faq.active]: openIndexes.includes(index),
              })}
            >
              <div
                className={faq.accordionHeader}
                onClick={() => toggleAccordion(index)}
              >
                <img
                  src={openIndexes.includes(index) ? minus : plus}
                  alt="Toggle"
                  className={faq.icon}
                />
                <p className={faq.question}>{item.question}</p>
              </div>
              <div
                className={faq.accordionContent}
                style={{
                  maxHeight: openIndexes.includes(index) ? "200px" : "0",
                }}
              >
                <div className={faq.answerDiv}>
                  <p>{item.question}</p>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default FAQ;
