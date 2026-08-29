export default function BrandsSection() {

  return (

    <section
  id="brands"
  className="brands-section"
>

      {/* BACKGROUND VIDEO */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="brands-video"
      >
        <source src="/CIN2.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}

      <div className="brands-overlay"></div>

      {/* CONTENT */}

      <div className="brands-content">

        <p className="brands-mini-text">
          TRUSTED GLOBAL BRANDS
        </p>

        <h2 className="brands-heading">
          Technology Partners{" "}
          <br className="hidden sm:inline" />
          We Work With.
        </h2>

        {/* SLIDER */}

        <div className="brands-slider">

          <div className="brands-track">

            {/* ORIGINAL */}

            <div className="brand-card">
              <img src="/brands/apple.png" alt="Apple" />
            </div>

            <div className="brand-card">
              <img src="/brands/asus.png" alt="Asus" />
            </div>

            <div className="brand-card">
              <img src="/brands/BENQ.png" alt="BenQ" />
            </div>

            <div className="brand-card">
              <img src="/brands/CP.png" alt="CP Plus" />
            </div>

            <div className="brand-card">
              <img src="/brands/dell.png" alt="Dell" />
            </div>

            <div className="brand-card">
              <img src="/brands/hp.png" alt="HP" />
            </div>

            <div className="brand-card">
              <img src="/brands/lenovo.png" alt="Lenovo" />
            </div>

            <div className="brand-card">
              <img src="/brands/LOGI.png" alt="Logitech" />
            </div>

            <div className="brand-card">
              <img src="/brands/TP.png" alt="TP Link" />
            </div>

            {/* DUPLICATE FOR SMOOTH LOOP */}

            <div className="brand-card">
              <img src="/brands/apple.png" alt="Apple" />
            </div>

            <div className="brand-card">
              <img src="/brands/asus.png" alt="Asus" />
            </div>

            <div className="brand-card">
              <img src="/brands/BENQ.png" alt="BenQ" />
            </div>

            <div className="brand-card">
              <img src="/brands/CP.png" alt="CP Plus" />
            </div>

            <div className="brand-card">
              <img src="/brands/dell.png" alt="Dell" />
            </div>

            <div className="brand-card">
              <img src="/brands/hp.png" alt="HP" />
            </div>

            <div className="brand-card">
              <img src="/brands/lenovo.png" alt="Lenovo" />
            </div>

            <div className="brand-card">
              <img src="/brands/LOGI.png" alt="Logitech" />
            </div>

            <div className="brand-card">
              <img src="/brands/TP.png" alt="TP Link" />
            </div>

          </div>

        </div>

      </div>

    </section>

  );

}