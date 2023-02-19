import Layout from "../components/Layout";
import MeetingHeader from "../components/MeetingHeader";
import MeetingSidebar from "../components/MeetingSidebar";

export default function Meeting() {
  return (
    <div
      style={{
        backgroundImage: `url('Background.jpg')`,
        backgroundSize: "cover",
      }}
      className="h-screen flex"
    >
      <MeetingSidebar />
      <div className="flex-grow">
        <MeetingHeader />
        <div className="grid grid-cols-2 gap-6 py-8 px-6">
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Understanding user needs</p>
            </div>
            <ol className="list-decimal m-0 p-0 list-inside">
              <li>
                {" "}
                Can you walk me through a specific scenario where you used our
                product?
              </li>{" "}
              <li> How did it help you achieve your goal?</li>
              <li>
                Were there any features or aspects of the product that you found
                confusing or difficult to use?
              </li>
              <li>
                How did you overcome those challenges? How frequently do you use
                our product, and for what purposes?
              </li>
            </ol>
          </div>
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Understanding user needs</p>
            </div>
            <ol className="list-decimal m-0 p-0 list-inside">
              <li>
                {" "}
                Can you walk me through a specific scenario where you used our
                product?
              </li>{" "}
              <li> How did it help you achieve your goal?</li>
              <li>
                Were there any features or aspects of the product that you found
                confusing or difficult to use?
              </li>
              <li>
                How did you overcome those challenges? How frequently do you use
                our product, and for what purposes?
              </li>
            </ol>
          </div>
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Understanding user needs</p>
            </div>
            <ol className="list-decimal m-0 p-0 list-inside">
              <li>
                {" "}
                Can you walk me through a specific scenario where you used our
                product?
              </li>{" "}
              <li> How did it help you achieve your goal?</li>
              <li>
                Were there any features or aspects of the product that you found
                confusing or difficult to use?
              </li>
              <li>
                How did you overcome those challenges? How frequently do you use
                our product, and for what purposes?
              </li>
            </ol>
          </div>
          <div className="break-inside-avoid-column border-[1px] border-gray-300 rounded-xl py-8 px-10 mb-6 text-sm bg-white bg-opacity-70">
            <div className="border-2 rounded-md px-5 py-2 bg-white bg-opacity-100">
              <p>Understanding user needs</p>
            </div>
            <ol className="list-decimal m-0 p-0 list-inside">
              <li>
                {" "}
                Can you walk me through a specific scenario where you used our
                product?
              </li>{" "}
              <li> How did it help you achieve your goal?</li>
              <li>
                Were there any features or aspects of the product that you found
                confusing or difficult to use?
              </li>
              <li>
                How did you overcome those challenges? How frequently do you use
                our product, and for what purposes?
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
