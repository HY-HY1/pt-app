import axios, { AxiosResponse } from "axios";

export function handleResponse(response: AxiosResponse) {
  const { status, data } = response;

  switch (true) {
    case status >= 200 && status < 300:
      // Success: handle the response data as needed
      console.log("Success:", data);
      return data;

    case status >= 400 && status < 500:
      // Client error: handle based on specific status or default message
      console.error("Client error:", data.message || "An error occurred on the client side.");
      throw new Error(data.message || "Client error");

    case status >= 500:
      // Server error: provide a default message
      console.error("Server error:", "An issue occurred on the server. Please try again later.");
      throw new Error("Server error. Please try again later.");

    default:
      // Unknown status: handle accordingly
      console.warn("Unexpected response:", data);
      throw new Error("Unexpected response from the server.");
  }
}
