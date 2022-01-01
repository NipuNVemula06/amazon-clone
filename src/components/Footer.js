import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <div
        onClick={scrollToTop}
        className="bg-gray-700 hover:bg-gray-600 h-14 text-white text-xl flex items-center justify-center cursor-pointer"
      >
        <button className="border-none  focus:outline-none">Back to top</button>
      </div>
      <div className=" p-10 bg-gray-800 text-gray-200 ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <div className="mb-5">
              <h4 className="font-bold mb-5 text-lg">Get to Know Us</h4>
              <ul className="leading-loose text-base">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press Releases</li>
                <li>Amazon Cares</li>
                <li>Gift a Smile</li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="font-bold mb-5 text-lg">Connect with Us</h4>
              <ul className="leading-loose text-base">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="font-bold mb-5 text-lg">Make Money with Us</h4>
              <ul className="leading-loose text-base">
                <li>Sell on Amazon</li>
                <li>Sell under Amazon Accelerator</li>
                <li>Amazon Global Selling</li>
                <li>Become an Affiliate</li>
                <li>Fulfilment by Amazon</li>
                <li>Advertise Your Products</li>
                <li>Amazon Pay on Merchants</li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="font-bold mb-5 text-lg">Let Us Help You</h4>
              <ul className="leading-loose text-base">
                <li>COVID-19 and Amazon</li>
                <li>Your Account</li>
                <li>Returns Centre</li>
                <li>100% Purchase Protection</li>
                <li>Amazon App Download</li>
                <li>Amazon Assistant Download </li>
                <li>Help</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between px-[100px] items-center pb-2">
            <span>
              <p className="text-2xl font-medium"> &copy; 2021 Nipun Vemula</p>
            </span>
            <span className="flex items-center">
              <a
                href="https://github.com/NipuNVemula06/amazon-clone"
                className="mr-10"
              >
                <p>
                  <GitHubIcon style={{ color: "#4078c0", fontSize: "45px" }} />
                </p>
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
