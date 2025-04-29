import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { useState } from "react";
import classNames from "classnames";
import plus from "../assets/icons/plus.svg";
import minus from "../assets/icons/minusFaq.svg";
import faq from "../assets/styles/Faq.module.css";

const faqData = [
  {
    question: "What is Unirate?",
    answer:
      "Unirate is a platform that helps students explore and compare universities in Kazakhstan. We provide detailed information about programs, admission scores, grants, reviews, and career paths to help you make informed decisions.",
  },
  {
    question: "Is Unirate free to use?",
    answer:
      "Yes, Unirate is completely free for all users. You can browse universities, programs, and student reviews without any charges or sign-up.",
  },
  {
    question: "How accurate is the information on Unirate?",
    answer:
      "We gather our data from official sources such as the Ministry of Education of Kazakhstan, university websites, and verified student contributions. We regularly update content to ensure accuracy.",
  },
  {
    question: "I’m a high school student. How can Unirate help me?",
    answer:
      "Unirate helps you: Discover suitable university programs. Learn about admission requirements and scores. See real student reviews. Understand career prospects based on your interests.",
  },
  {
    question: "How can I contact the Unirate team?",
    answer:
      "You can reach out to us via our Contact Us page or email us directly at support@unirate.kz. We’re happy to help!",
  },
];

function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
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
