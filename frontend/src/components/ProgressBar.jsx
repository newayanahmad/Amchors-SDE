
const ProgressBar = ({ progress }) => {


    return (progress > 0 &&
        <div className="flex z-20 mt-8 items-center w-3/4 md:w-1/2 py-2">
            <div className=" bg-white h-6 w-full rounded-full overflow-hidden">
                <div
                    className="h-6 text-center bg-green-500 transition-all ease-in-out duration-500"
                    style={{ width: `${progress}%` }}
                ><span className="ml-2">{`${progress}%`}</span></div>
            </div>

        </div>
    );
};

export default ProgressBar;
