const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type") || "";
  let data;
  if (contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = new Error(data?.message || data?.error || response.statusText || "API request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function authLogin(credentials) {
  return request("/api/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function authRegister(payload) {
  return request("/api/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function fetchMe(token) {
  return request("/api/auth/me", {
    method: "GET",
    token,
  });
}

export function sendChatMessage(message, conversationId) {
  return request("/api/chat", {
    method: "POST",
    body: { message, conversationId },
  });
}
