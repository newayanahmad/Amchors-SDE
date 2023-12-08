import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CallbackModal, VideoCard, VideoListCard } from "../components";

function EarningPage() {
    let query = new URLSearchParams(useLocation().search);
    let id = query.get('id');
    console.log(id)
    const [videos, setVideos] = useState([])

    const [show, setShow] = useState(false)
    const onHide = () => {
        setShow(false)
    }

    function formatDate(dateString) {
        var options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' };
        var date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }

    useLayoutEffect(() => {
        const fetchVideos = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get-videos`)
            const data = await res.json()
            if (data.success) {
                setVideos(data.videos)
            }
            else {
                alert('Could not fetch videos')
            }
        }
        fetchVideos()
    }, [])
    return (
        <div className="bg-stone-950 min-h-screen flex flex-col pb-4 w-screen">
            <CallbackModal show={show} onHide={onHide} />
            <div className="justify-center items-center bg-stone-950 self-stretch flex w-full flex-col px-16 py-4 max-md:max-w-full max-md:px-5">
                <div className="flex w-full max-w-[1079px] justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                    <Link to={"../"}>
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

                    <div onClick={() => setShow(true)} className="cursor-pointer items-stretch self-stretch flex flex-col justify-center pr-16 max-md:pr-5">
                        <div className="justify-between items-center border flex gap-2 px-6 py-2.5 rounded-[40px] border-solid border-white border-opacity-50 max-md:mr-1 max-md:px-5">
                            <img
                                loading="lazy"
                                src="/phone.svg"
                                className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full my-auto"
                            />
                            <div className="text-white text-xl leading-6 self-stretch grow whitespace-nowrap">
                                Request a call back
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {id && <div className="justify-center items-center bg-stone-950 self-stretch flex w-full flex-col px-16 py-12 max-md:max-w-full max-md:px-5">
                <div className="items-stretch bg-stone-900 flex w-[1079px] max-w-full flex-col justify-center pl-10 pr-16 py-5 rounded-2xl max-md:px-5">
                    {videos.map((video, index) => {
                        return (id == video._id) ? <VideoCard key={index} rank={index + 1} title={video.videoTitle} id={video.videoId} views={video.videoViews} earning={video.earnings} like={video.likeCount} comment={video.commentCount} uploaded={formatDate(video.publishedAt)} /> : <></>
                    })}
                </div>
            </div>}
            <div className="text-white text-opacity-70 text-xl font-medium leading-7 self-center whitespace-nowrap mt-7">
                Other Videos Potentials
            </div>
            <div className="px-3 mx-auto max-w-[95%]">
                <table className="bg-stone-900 overflow-scroll self-center inline-block w-full max-w-[1079px] mt-7 border border-white border-opacity-20">
                    {/* Table Header */}
                    <thead className="px-4">
                        <tr className="text-white text-base font-bold">
                            <td className="py-2 px-4">Rank</td>
                            <td className="py-2 px-4">Title</td>
                            <td className="py-2 px-4">Thumbnail</td>
                            <td className="py-2 px-4">Views</td>
                            <td className="py-2 px-4">Likes</td>
                            <td className="py-2 px-4">Comment</td>
                            <td className="py-2 px-4">Uploaded on</td>
                            <td className="py-2 px-4">*Estimated Earning</td>
                        </tr>
                    </thead>
                    {/* Table Rows */}
                    {videos.map((video, index) => {
                        return id != video._id ? <VideoListCard key={index} _id={video._id} rank={index + 1} title={video.videoTitle} id={video.videoId} views={video.videoViews} earning={video.earnings} likes={video.likeCount} comment={video.commentCount} uploaded={formatDate(video.publishedAt)} /> : <></>
                    })}
                </table>
            </div>

        </div>
    );
}



export default EarningPage