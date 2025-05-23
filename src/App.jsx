import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/custom/Header.jsx";
import Hero from "./components/custom/Hero.jsx";
import CreateTrip from "./components/routes/plan-a-trip/CreateTrip.jsx";
import Mytrips from "./components/routes/my-trips/[tripId]/Mytrips.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { LogInContext } from "./Context/LogInContext/Login.jsx";
import Footer from "./components/custom/Footer.jsx";
import Alltrips from "./components/routes/all-trips/Alltrips.jsx";
import toast from "react-hot-toast";
import gsap from "gsap";
import ProgressBar from "./components/constants/ProgressBar.jsx";
import { useRefContext } from "./Context/RefContext/RefContext.jsx";

// ✅ NEW: Import useAuth0 if you haven't already
import { useAuth0 } from "@auth0/auth0-react";
import AuthLayout from "./components/Layout.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useContext(LogInContext); // or useAuth0() directly
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();

  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const createTripPageRef = useRef(null);
  const footerRef = useRef(null);
  const { locationInfoRef } = useRefContext();

  // ✅ Show loading state while Auth0 is initializing
  if (isLoading) return <div>Loading...</div>;

  useEffect(() => {
    if (!loggedIn && isAuthenticated) {
      setLoggedIn(true);
      toast.success("Logged In Successfully");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "elastic.out(1,1)" } });

    // Hero Animations
    const heading = heroRef.current?.querySelector(".heading");
    const desc = heroRef.current?.querySelector(".desc");
    const buttons = heroRef.current?.querySelector(".buttons");
    const marquee = heroRef.current?.querySelector(".marquee");
    if (heading && desc && buttons && marquee) {
      timeline
        .from(heading, { opacity: 0, y: 100 })
        .from(desc, { opacity: 0, y: 100 }, "-=0.3")
        .from(buttons, { opacity: 0, y: 100 }, "-=0.3")
        .from(marquee, { y: 100, opacity: 0 }, "-=0.3");
    }

    // Create Trip Page
    const text = createTripPageRef.current?.querySelector(".text");
    const place = createTripPageRef.current?.querySelector(".place");
    const day = createTripPageRef.current?.querySelector(".day");
    const budget = createTripPageRef.current?.querySelector(".budget");
    const people = createTripPageRef.current?.querySelector(".people");
    const createTripBtn =
      createTripPageRef.current?.querySelector(".create-trip-btn");
    if (text && place && day && budget && people && createTripBtn) {
      timeline
        .from(text, { opacity: 0, y: 100 })
        .from(place, { opacity: 0, y: 100 }, "-=0.3")
        .from(day, { opacity: 0, y: 100 }, "-=0.3")
        .from(budget, { opacity: 0, y: 100 }, "-=0.3")
        .from(people, { opacity: 0, y: 100 }, "-=0.3")
        .from(createTripBtn, { opacity: 0, y: 100 }, "-=0.3");
    }

    // Location info
    const locationElement = locationInfoRef?.current?.querySelector(".location");
    const carousel = locationInfoRef?.current?.querySelectorAll(".carousel");
    const locationInfo =
      locationInfoRef?.current?.querySelector(".location-info");
    if (locationElement && carousel && locationInfo) {
      timeline
        .from(locationElement, { opacity: 0, y: 100 })
        .from(carousel, { opacity: 0, y: 100 })
        .from(locationInfo, { opacity: 0, y: 100 });
    }

    // Footer
    timeline.from(footerRef.current, { opacity: 0, y: 100 });

    return () => {
      timeline.kill();
    };
  }, [location.pathname]);

  return (
    <>
      <ProgressBar />
      <div className="app tracking-tight min-w-[320px]">
        <Header headerRef={headerRef} />
        <div className="container max-w-[1024px] w-full min-w-[320px] h-auto">
          <Routes>
            <Route
              path="/"
              element={<Hero heroRef={heroRef} />}
            />
            <Route
              path="/plan-a-trip"
              element={
                isAuthenticated ? (
                  <CreateTrip createTripPageRef={createTripPageRef} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/my-trips/:tripId"
              element={
                isAuthenticated ? (
                  <Mytrips />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/all-trips"
              element={
                isAuthenticated ? (
                  <Alltrips />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>
        <Footer footerRef={footerRef} />
      </div>
    </>
  );
}

export default App;