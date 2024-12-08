import React from "react";

function Footer() {
  return (
    <div>
      <div
        className="mt-8 w-full bg-black px-4 sm:px-6 md:px-16 lg:px-[300px] flex flex-col md:flex-row 
    space-y-6 md:space-y-0 items-start justify-between text-sm md:text-base lg:text-base py-10"
      >
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Post</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
        </div>
      </div>

      <p className="py-2 pb-6 text-center text-white bg-black text-sm">
        {" "}
        All rights Reserved @ 2024{" "}
      </p>
    </div>
  );
}

export default Footer;
