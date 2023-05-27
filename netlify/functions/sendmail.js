exports.handler = async function (event, context) {
  const SUCCESS_MESSAGE = "Mail sent successfully!";
  const ERROR_MESSAGE = "Mail sending failed!";

  const body = JSON.parse(event.body);
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${process.env.MAILGUN_API_KEY}`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("from", `${process.env.MAILGUN_ADDRESS}`);
    urlencoded.append("to", `${process.env.MAILGUN_ADDRESS}`);
    urlencoded.append("subject", body.subject);
    urlencoded.append("text", body.message);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(process.env.MAILGUN_DOMAIN, requestOptions);
    if (!response.ok) {
      throw new Error(`Response Error: ${response.statusText}`);
    }
    console.log(SUCCESS_MESSAGE);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: SUCCESS_MESSAGE }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `${ERROR_MESSAGE}: ${error.message}` }),
    };
  }
};
