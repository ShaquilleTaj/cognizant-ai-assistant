export const streamAIResponse = async (prompt, onChunk) => {
  // 🔹 Offline check
  if (!navigator.onLine) {
    throw new Error("You are offline. Please check your internet connection.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000); // 10 second timeout

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Server error. Please try again.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value);
        onChunk(chunk);
      }
    }

  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    throw err;
  } finally {
    clearTimeout(timeout);
  }
};