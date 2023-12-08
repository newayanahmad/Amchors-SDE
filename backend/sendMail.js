const nodemailer = require('nodemailer');

const sendCallbackRequestEmail = async (userData) => {
    const { name, number, preferredCallbackTime, additionalComments } = userData;

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    await transport.sendMail({
        from: `Anchors.in (Ayan Ahmad)<${process.env.MAIL_USERNAME}>`,
        to: "ravi@anchors.in", // Change to the actual recipient's email address
        subject: 'New Callback Request',
        html: `<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="background-color: #f4f4f4; padding: 10px;">
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background-color: #fff; padding: 20px; text-align: center; border-radius: 15px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #444; font-size: 24px;">New Callback Request 📞</h2>
                    <p style="font-size: 16px; color: #666;">
                        A new user has requested a callback. Below are the details:
                    </p>
                    <ul style="list-style-type: none; padding: 0; margin: 0;">
                        <li style="font-size: 16px; color: #666;">Name: ${name}</li>
                        <li style="font-size: 16px; color: #666;">Contact Number: ${number}</li>
                        ${preferredCallbackTime ? `<li style="font-size: 16px; color: #666;">Preferred Callback Time: ${preferredCallbackTime}</li>` : ''}
                        ${additionalComments ? `<li style="font-size: 16px; color: #666;">Additional Comments/Questions: ${additionalComments}</li>` : ''}
                    </ul>
                    <p style="font-size: 16px; color: #666;">
                        Thanks,<br>Anchors.in (Ayan Ahmad)
                    </p>
                </div>
            </div>
        </div>
    </body>`
    });
};

module.exports = sendCallbackRequestEmail;
