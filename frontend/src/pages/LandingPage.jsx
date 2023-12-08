import React, { useEffect, useState } from "react";
import { ProgressBar } from "../components"
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
    const [link, setLink] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState("")

    const navigation = useNavigate()
    const getVideoID = (url) => {
        let regex = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
        let matches = url.match(regex);
        if (matches && matches[5]) {
            return matches[5];
        } else {
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!getVideoID(link)) return setError("Invalid youtube video link!")
        setSubmitting(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/video`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    link
                }),
            })
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setSubmitting(false);
                setProgress(100);
                navigation(`/earning?id=${data.id}`)
            }
            else {
                setSubmitting(false);
                setProgress(0);
                setError(data.message)
            }
        }
        catch {
            setSubmitting(false);
            setProgress(0);
            setError("Something went wrong. Please try again.")
        }

    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (submitting) {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + (100 - prevProgress) / 100;
                    const intervalDelay = 100 + Math.sqrt(newProgress) * 20;
                    return newProgress < 100 ? newProgress : 93; // Cap at 99%
                });
            }
        }, 100); // Adjust the interval as needed

        return () => clearInterval(interval);
    }, [submitting]);

    return (
        <div className="bg-stone-950 min-h-screen flex flex-col h-[100dvh] w-screen items-stretch">
            <header className="justify-center items-center bg-stone-950 flex w-full flex-col px-16 py-4 max-md:max-w-full max-md:px-5">
                <div className=" flex w-full max-w-[1079px] justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                    <Link to={""}>
                        <div className="flex gap-3.5 mt-1.5 items-start max-md:justify-center">
                            <img
                                loading="lazy"
                                src="/logo.png" className="aspect-square object-contain object-center w-[22px] overflow-hidden shrink-0 max-w-full mt-1.5"
                            />
                            <h1 className="text-white text-3xl font-semibold mt-1.5">anchors</h1>
                            <div className="text-neutral-800 text-xs whitespace-nowrap items-stretch rounded bg-stone-300 aspect-[2.125] justify-center px-1.5 py-0.5">
                                Beta
                            </div>
                        </div>
                    </Link>
                    <div className="items-center border flex shrink-0 h-11 flex-col flex-1 rounded-[40px] border-solid border-white border-opacity-0" />
                </div>
            </header>
            <div className="self-center flex justify-center items-center w-full max-w-[1040px] flex-col mt-14 px-5 max-md:max-w-full max-md:mt-10">
                <h2 className="text-white mx-auto text-center text-5xl font-bold leading-[72px] max-w-[741px] self-start max-md:max-w-full max-md:text-4xl max-md:leading-[64px]">
                    Discover your earning potential
                </h2>
                <p className="text-white text-opacity-80 text-center m-auto text-2xl leading-9 max-w-[583px] mt-6 self-start max-md:max-w-full">
                    Turn your Youtube expertise into a lucrative income
                    <br /> through resource sharing
                </p>
                <form onSubmit={handleSubmit} className="z-20 items-stretch mx-auto flex gap-5 mt-16 self-start max-md:max-w-full max-md:flex-wrap max-md:mt-10">
                    <div className="items-stretch border flex justify-between gap-2.5 px-10 py-3 rounded-[10000px] border-solid border-white border-opacity-50 max-md:max-w-full  max-md:px-5 w-full">
                        <img
                            loading="lazy"
                            src="/yt.svg"
                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                        />

                        <input type="text" value={link} onChange={e => { setLink(e.target.value), setError("") }} id="youtube-link" className="text-white bg-transparent outline-none text-xl grow shrink basis-auto max-md:max-w-full" placeholder="Enter YouTube video link" />
                    </div>
                    <button disabled={submitting} className="justify-center items-center bg-red-600 disabled:bg-red-400 flex w-full md:w-[158px] shrink-0 h-12 flex-col rounded-[35px]" type="submit">
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
                <span className="text-red-500 font-bold pt-2 z-20">{error}</span>
                <ProgressBar progress={parseInt(progress)} />
                <div className=" z-0 justify-center absolute bottom-16 right-16 bg-white bg-opacity-10 flex w-[260px] max-w-full flex-col mt-12 px-16 py-12 rounded-[100000px] self-end items-end max-md:mt-10 max-md:px-5">
                    <img
                        loading="lazy"
                        src="/play.svg"
                        className="z-0 aspect-square object-contain object-center w-20 overflow-hidden max-w-full mr-2.5 mt-16 max-md:mt-10"
                    />
                </div>
            </div >
        </div >
    );
}

export default LandingPage;
