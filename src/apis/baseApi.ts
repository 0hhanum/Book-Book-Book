interface IOptions {
  method: string;
  headers?: Record<string, string>;
  body?: any;
}
const fetchData = async (url: string, options?: IOptions) => {
  console.log(`${process.env.BASE_URL}${url}`);
  try {
    const response = await fetch(`${process.env.BASE_URL}${url}`, {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong. Please try again.");
  }
};

export { fetchData };
