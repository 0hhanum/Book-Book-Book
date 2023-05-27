import { fetchData } from "./baseApi";

interface ISendMail {
  subject?: string;
  message?: string;
}
const sendMail = async (data: ISendMail) => {
  const MAIL_ENDPOINT = "sendmail";
  const MAIL_URL =
    process.env.ENVIRONMENT === "dev"
      ? `/${MAIL_ENDPOINT}`
      : `/.netlify/functions/${MAIL_ENDPOINT}`;

  const result = await fetchData(MAIL_URL, {
    method: "POST",
    body: data,
  });
  return result;
};

export { sendMail };
