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
          <h1>Contact us</h1>
          <p>
            The harder you work for something, the greater you’ll feel when you
            achieve it.
          </p>
          <div style={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
          </div>
          <input type="text" placeholder="Message" />
          <Button content="Send Request" />
        </div>
        <img src="/map.png" alt="" />
      </div>
      <Footer />
    </>
  );
}

export default Contacts;
