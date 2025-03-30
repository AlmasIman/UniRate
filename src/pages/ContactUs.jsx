import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import contactstyle from "../assets/styles/ContactUs.module.css";
import Button from "../components/Button.jsx";
function Contacts() {
  return (
    <>
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
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <input
              type="text"
              placeholder="Name"
              className={contactstyle.inputsty}
            />
            <input
              type="text"
              placeholder="Email"
              className={contactstyle.inputsty}
            />
          </div>
          <br />
          <input
            type="text"
            placeholder="Message"
            className={contactstyle.message}
          />
          <br />
          <br />

          <Button content="Send Request" />
        </div>
        <img src="/map.png" alt="" style={{ width: "43%" }} />
      </div>
      <Footer />
    </>
  );
}

export default Contacts;
