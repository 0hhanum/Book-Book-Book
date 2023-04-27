import { fetchData } from "./baseApi";

interface ISendMail {
  subject?: string;
  message?: string;
}
const sendMail = async (data: ISendMail) => {
  const result = await fetchData("/sendmail", {
    method: "POST",
    body: data,
  });
  return result;
};

export { sendMail };
