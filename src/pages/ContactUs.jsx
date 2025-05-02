import { useState } from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import contactstyle from "../assets/styles/ContactUs.module.css";
import Button from "../components/Button.jsx";
import LearningBro from "../assets/LearningBro.svg";

function Contacts() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    const subject = encodeURIComponent("Contact from UniRate");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
    );
    window.location.href = `mailto:uniRate@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div className={contactstyle.contactMainDiv}>
        <div>
          <h1 className={contactstyle.title}>Contact us</h1>
          <br />
          <p className={contactstyle.paragraphdf}>
            The harder you work for something, the greater you’ll feel when you
            achieve it.
          </p>
          <br />
          <div className={contactstyle.divForInputs}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={contactstyle.inputsty}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={contactstyle.inputsty}
            />
          </div>
          <br />
          <input
            type="text"
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className={contactstyle.message}
          />
          <br />
          <br />

          <div onClick={handleSend}>
            <Button content="Send Request" />
          </div>
        </div>
        <img src={LearningBro} alt="" className={contactstyle.imgInContact} />
      </div>
      <Footer />
    </div>
  );
}

export default Contacts;
