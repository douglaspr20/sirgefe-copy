import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import sirge_black_logo from '../../images/sirge_black_logo.svg';

/** TODO: Unused? */
function GuestNavbar() {
  const [statusMobileNavbar, setDisplayMobileNavbar] = useState(false);

  function displayMobileNavbar() {
    const element = document.getElementById('nav_menu');

    if (statusMobileNavbar === true) {
      element?.classList.remove('nav-menu-open');

      setDisplayMobileNavbar(false);
    } else {
      element?.classList.add('nav-menu-open');

      setDisplayMobileNavbar(true);
    }
  }

  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      role="banner"
      className="menu_guest w-nav"
    >
      <div className="nav-container">
        <a
          href={`${process.env.NEXT_PUBLIC_LANDING_URL}`}
          className="brand w-nav-brand"
        >
          <Image
            height={56}
            width={140}
            src={sirge_black_logo}
            loading="lazy"
            alt=""
            className="logo"
          />
        </a>
        <nav role="navigation" className="nav-menu w-nav-menu" id="nav_menu">
          <Link href="/register" className="nav-link alt w-nav-link">
            START FREE TRIAL
          </Link>
          <Link href="/login" className="nav-link w-nav-link">
            LOGIN
          </Link>
        </nav>
        <div
          className="menu-button w-nav-button"
          onClick={() => {
            displayMobileNavbar();
          }}
        >
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}

export default GuestNavbar;
