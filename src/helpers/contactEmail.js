import { resend } from "@/lib/resend";
import contactformEmail from "@/emails/contactformEmail";

export const sendContactEmail = async (name, email, message) => {
    try {
        await resend.emails.send({
            from: "business@growmint.net",
            to: "business@growmint.net",
            subject: "New Contact Form Submission",
            html: contactformEmail({ name, email, message }),
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
