import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ rank, id, title, views, like, uploaded, earning, comment }) => {
    return (
        <div className="mr-6 max-md:max-w-full max-md:mr-2.5">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[58%] max-md:w-full max-md:ml-0">
                    <div className="grow max-md:max-w-full max-md:mt-10">
                        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                                <div className="items-stretch flex grow flex-col pr-3.5 max-md:mt-5">
                                    <div className="items-stretch rounded bg-neutral-500 flex justify-between gap-1 px-2.5 py-1">
                                        <img
                                            loading="lazy"
                                            src="/batch.svg"
                                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                                        />
                                        <div className="text-white text-base leading-5 self-center grow whitespace-nowrap my-auto">
                                            {rank == 1 ? <>{"Top earner video"}</> : <> {`# ${rank} rank`}</>}
                                        </div>
                                    </div>
                                    <Link to={`https://youtu.be/${id}`} target='_blank'>
                                        <img
                                            loading="lazy"
                                            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                                            className="aspect-[1.78] object-contain object-center w-full overflow-hidden mt-5"
                                        /></Link>
                                    <div className="text-white text-opacity-50 text-base whitespace-nowrap mt-5">
                                        Uploaded on - {uploaded}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                                <div className="items-stretch flex flex-col my-auto max-md:mt-10">
                                    <div className="overflow-hidden text-white text-ellipsis whitespace-nowrap text-xl font-medium">
                                        {title}
                                    </div>
                                    <div className="items-stretch flex justify-between gap-2 mt-3">
                                        <img
                                            loading="lazy"
                                            src="/eye.svg"
                                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                                        />
                                        <div className="text-white text-opacity-50 text-base self-center grow whitespace-nowrap my-auto">
                                            {views}
                                        </div>
                                    </div>
                                    <div className="items-stretch flex justify-between gap-2 mt-3">
                                        <img
                                            loading="lazy"
                                            src="/like.svg"
                                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                                        />
                                        <div className="text-white text-opacity-50 text-base self-center grow whitespace-nowrap my-auto">
                                            {like}
                                        </div>
                                    </div>
                                    <div className="items-stretch flex justify-between gap-2 mt-3">
                                        <img
                                            loading="lazy"
                                            src="/comment.svg"
                                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                                        />
                                        <div className="text-white text-opacity-50 text-base self-center grow whitespace-nowrap my-auto">
                                            {comment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-stretch w-[42%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch bg-zinc-800 flex flex-col justify-center w-full my-auto px-5 py-10 rounded-2xl max-md:mt-10">
                        <div className="items-stretch flex flex-col px-20 max-md:px-5">
                            <div className="items-center flex justify-between gap-0 max-md:ml-2 max-md:mr-1.5">

                                <div className="text-white text-4xl font-bold self-stretch grow whitespace-nowrap">
                                    ₹ {earning}
                                </div>
                            </div>
                            <div className="justify-center items-center bg-white self-center flex w-[143px] shrink-0 h-12 flex-col mt-6 rounded-[35px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard