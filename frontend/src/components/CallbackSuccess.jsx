import { Link } from "react-router-dom";

function CallbackSuccess() {
    return (
        <div className="justify-center items-center bg-zinc-800 flex flex-col px-20 py-12 rounded-xl max-md:px-5">
            <img
                loading="lazy"
                src="/tick.svg"
                className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full"
                alt="Logo"
            />
            <header className="text-white text-center text-2xl font-medium self-center whitespace-nowrap mt-5">
                Request a call back{" "}
            </header>
            <div className="text-white text-opacity-80 text-center text-base leading-5 max-w-[244px] self-center mt-5">
                Our Team will call you shortly in <br /> 12-24 hrs
            </div>
            <div className="text-white text-opacity-80 text-center text-base leading-5 self-center whitespace-nowrap mt-2">
                Can’t you wait for call?
            </div>
            <Link
                to="../" className="justify-between items-stretch shadow-sm bg-red-600 self-stretch flex gap-1 mt-7 px-10 py-3 rounded-[40px] max-md:ml-2 max-md:mr-2 max-md:px-5">
                <span
                    className="text-white text-xl grow whitespace-nowrap"
                    aria-label="Check another video"
                >
                    Check another video
                </span>
                <img
                    loading="lazy"
                    src="/arrow.svg"
                    className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                    alt="Play Button"
                />
            </Link>
        </div>
    );
}

export default CallbackSuccess;