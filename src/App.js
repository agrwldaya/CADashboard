import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import Layout from "./components/Layout";

// Landing Page Components
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Stats from "./components/Stats";
// import ClientLogos from "./components/ClientLogos";
import ContactForm from "./components/ContactForm";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/Whatweare";
import ContactUs from "./components/Contact";
import Chatbot from "./components/Chatbot";

// Menu Page Components
import About from "./pages/About";
import ServicesComponent from "./pages/ServicesComponent";
import FAQ from "./pages/FAQ";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Services />
                  <WhyChooseUs />
                  <LandingPage />
                  <Stats />
                  {/* <ClientLogos /> */}
                  <ContactForm />
                </>
              }
            />

            {/* Menu Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesComponent />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/dash2" element={<Dashboard />} />
          </Routes>
          <Chatbot />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
