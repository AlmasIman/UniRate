import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
function Terms() {
  return (
    <>
      <Header />
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          alignItems: "center",
          marginTop: "90px",
          marginBottom: "90px",
        }}
      >
        <h1
          style={{
            fontWeight: "600",
            fontSize: "38px",
            color: "rgba(45, 45, 45, 1)",
            textAlign: "center",
          }}
        >
          Terms and conditions
        </h1>
        <div
          style={{
            width: "65%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            Welcome to UniRate! These Terms and Conditions outline the rules and
            regulations for using our platform. By accessing or using UniRate,
            you agree to comply with and be bound by these terms.
          </p>

          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            UniRate is an informational platform designed to help students
            explore, compare, and evaluate universities worldwide. We also
            provide tools like a financial calculator and a student forum for
            sharing knowledge and experiences.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            All information you provide must be accurate and up-to-date. You
            agree not to misuse, modify, or harm the platform or any of its
            features.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            To access certain features (e.g., the forum), you may need to create
            an account. You are responsible for maintaining the confidentiality
            of your login information. UniRate reserves the right to suspend or
            delete accounts that violate our terms or community guidelines.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            All content on UniRate, including text, graphics, tools, and
            branding, is owned or licensed by UniRate and protected by copyright
            laws. You may not copy, distribute, or modify content without
            permission. Users retain ownership of their forum posts, but by
            posting, you grant UniRate a non-exclusive license to display and
            share your content.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Be respectful and helpful when engaging in the community. Do not
            post spam, offensive content, or misinformation. UniRate reserves
            the right to remove any content that violates these guidelines.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            UniRate strives to provide accurate and updated information, but we
            do not guarantee the completeness or reliability of university data,
            rankings, or financial estimates. Any decisions you make using our
            platform are your responsibility.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            UniRate is not liable for any damages or losses resulting from the
            use of our website or tools. We are not affiliated with any
            universities listed on the platform.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            We may update these Terms and Conditions from time to time. Any
            changes will be posted here with a revised date.
          </p>
          <p
            style={{
              color: "rgba(122, 122, 122, 1)",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            If you have any questions about these terms, feel free to reach out
            at:  <p style={{color: 'black'}}>📧 unirate@gmail.com</p>
          </p>
          <Link to="/signup" style={{textDecoration: 'none', color: "rgba(0, 147, 121, 1)", textDecorationLine: 'underline'}}>Back to the page</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
