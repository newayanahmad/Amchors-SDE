import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoListCard = ({ _id, rank, title, id, views, likes, comment, uploaded, earning }) => {
    const navigation = useNavigate()
    return (
        <tr onClick={() => navigation(`../earning?id=${_id}`)} className="cursor-pointer text-white text-base">
            <td className="py-2 px-4">{rank}</td>
            <td className="py-2 px-4 text-ellipsis">{title}</td>
            <td className="py-2 pr-4"><img
                loading="lazy"
                src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
                className="aspect-[1.76] object-contain object-center w-[120px] overflow-hidden shrink-0 max-w-full"
            /></td>
            <td className="py-2 px-4">{views}</td>
            <td className="py-2 px-4">{likes}</td>
            <td className="py-2 px-4">{comment}</td>
            <td className="py-2 px-4">{uploaded}</td>
            <td className="py-2 px-4">{earning}</td>
        </tr>
    );
};

export default VideoListCard;
