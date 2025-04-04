export default function Footer() {
  return (
    <div className="w-screen h-fit bg-indigo-700 flex justify-center text-white overflow-hidden">
      <div className="w-[1200px] flex justify-between flex-wrap">
        <div className="pt-[40px]">
          <a href="" className="flex gap-[10px]">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id=" film">
                <path
                  id="Vector"
                  d="M5.83366 2.16675V18.8334M14.167 2.16675V18.8334M1.66699 10.5001H18.3337M1.66699 6.33341H5.83366M1.66699 14.6667H5.83366M14.167 14.6667H18.3337M14.167 6.33341H18.3337M3.48366 2.16675H16.517C17.5203 2.16675 18.3337 2.9801 18.3337 3.98341V17.0167C18.3337 18.0201 17.5203 18.8334 16.517 18.8334H3.48366C2.48034 18.8334 1.66699 18.0201 1.66699 17.0167V3.98341C1.66699 2.9801 2.48034 2.16675 3.48366 2.16675Z"
                  stroke="#FFFFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <p className="italic font-bold">Movie film</p>
          </a>
          <div>© 2024 Movie Z. All Rights Reserved.</div>
        </div>
        <div className="flex mt-[30px] gap-[40px] flex-wrap">
            <div className="flex flex-col gap-[10px]">
                <p>Contact Information</p>
                <div className="flex gap-[15px] w-[200px]">
                    <img src="./mail.svg" alt="" />
                    <div>
                        <p className="font-bold">Email</p>
                        <p>support@movieZ.com</p>
                    </div>
                </div>
                <div className="flex gap-[15px] w-[200px]">
                    <img src="./phone.svg" alt="" />
                    <div>
                        <p className="font-bold">Phone</p>
                        <p>+976 (11) 123-4567</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px]">
                <p>Follow us</p>
                <div className="flex flex-wrap gap-[20px] font-bold">
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>Youtube</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
