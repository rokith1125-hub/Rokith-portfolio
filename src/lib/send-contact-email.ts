import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const { name, email, message } = data as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      throw new Error("Missing required fields");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email address");
    }
    if (name.length > 200 || message.length > 5000) {
      throw new Error("Input too long");
    }

    return { name, email, message };
  })
  .handler(async ({ data }) => {
    const resend = new Resend(process.env["RESEND_API_KEY"]);
    const { name, email, message } = data;

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "rokith1125@gmail.com", // <-- replace with your real inbox
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });