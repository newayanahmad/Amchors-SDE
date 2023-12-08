import React, { useState } from "react";
import CallbackSuccess from "./CallbackSuccess";

function RequestCallback() {

    const [name, setName] = useState('')
    const [number, setNumber] = useState("")
    const [error, setError] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !number) setError("Both fields are mandatory");
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/callback`, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                number, name
            })
        })
        const data = await response.json()
        if (!data.success) {
            return setError(data.message)
        }
        setName("")
        setNumber("")
        setSubmitted(true)


    }

    return (<>
        {!submitted ? <div className="justify-center items-center bg-zinc-800 flex flex-col px-16 py-12 rounded-xl max-md:px-5">
            <div className="text-white text-center text-2xl font-medium whitespace-nowrap mt-3.5">
                Request a call back{" "}
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={e => { setName(e.target.value); setError("") }} placeholder="Enter Name" className="text-white text-xl whitespace-nowrap border self-stretch justify-center mt-10 pl-5 pr-16 py-4 rounded-xl border-solid border-neutral-500 items-start max-md:pr-5" />

                <input type="number" name="number" placeholder="Mobile number" value={number} onChange={e => { setNumber(e.target.value); setError("") }} className="text-white text-xl whitespace-nowrap border self-stretch justify-center mt-4 pl-5 pr-16 py-4 rounded-xl border-solid border-neutral-500 items-start max-md:pr-5" />

                <span className="text-red-500 mt-3">{error}</span>

                <button type="submit" className="text-black text-xl whitespace-nowrap items-stretch shadow-sm bg-white justify-center mt-7 mb-3.5 px-10 py-3 rounded-[40px] max-md:px-5">
                    Request a Call Back
                </button>
            </form>
        </div> : <CallbackSuccess />}
    </>
    );
}


export default RequestCallback;