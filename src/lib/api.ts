import { AuthResponse, User, Book, BookResponse, BooksListResponse, CreateBookPayload, UpdateBookPayload } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
  : "http://localhost:5000/api/v1/users";

// Log API configuration for debugging
console.log("API_BASE_URL:", API_BASE_URL);

// Helper function to decode JWT and extract user info
function decodeJWT(token: string): { sub: string } | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    console.log("Registering user with:", { name, email });
    console.log("Using API URL:", `${API_BASE_URL}/register`);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    console.log("Response status:", response.status);
    const text = await response.text();
    console.log("Response text:", text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: "Invalid response from server",
      };
    }

    if (!response.ok) {
      console.error("Registration error:", data);
      return {
        success: false,
        message: data.message || data.error || "Registration failed",
      };
    }

    // Backend returns { accessToken: token }
    const token = data.accessToken || data.token;
    console.log("Token received:", token ? "Yes" : "No");
    
    if (!token) {
      return {
        success: false,
        message: "No token received from server",
      };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
      const userInfo = {
        name,
        email,
        _id: decodeJWT(token)?.sub || "",
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      // Trigger auth change event for real-time navbar updates
      window.dispatchEvent(new Event('auth-change'));
    }

    return {
      success: true,
      message: "Registration successful",
      token,
      user: {
        name,
        email,
        _id: decodeJWT(token)?.sub || "",
      },
    };
  } catch (error) {
    console.error("Register error:", error);
    
    // Better error messages for different failure types
    let errorMessage = "Failed to connect to server";
    
    if (error instanceof TypeError) {
      if (error.message.includes("fetch")) {
        errorMessage = `Network error: Unable to reach ${API_BASE_URL}/register. Make sure backend is running.`;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    console.log("Logging in user:", { email });
    console.log("Using API URL:", `${API_BASE_URL}/login`);
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);
    const text = await response.text();
    console.log("Response text:", text);
    
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return {
        success: false,
        message: "Invalid response from server",
      };
    }

    if (!response.ok) {
      console.error("Login error:", data);
      return {
        success: false,
        message: data.message || data.error || "Login failed",
      };
    }

    // Backend returns { accessToken: token }
    const token = data.accessToken || data.token;
    console.log("Token received:", token ? "Yes" : "No");
    
    if (!token) {
      return {
        success: false,
        message: "No token received from server",
      };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
      const decoded = decodeJWT(token);
      const userInfo = {
        email,
        name: "",
        _id: decoded?.sub || "",
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      // Trigger auth change event for real-time navbar updates
      window.dispatchEvent(new Event('auth-change'));
    }

    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        email,
        name: "",
        _id: decodeJWT(token)?.sub || "",
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    
    // Better error messages for different failure types
    let errorMessage = "Failed to connect to server";
    
    if (error instanceof TypeError) {
      if (error.message.includes("fetch")) {
        errorMessage = `Network error: Unable to reach ${API_BASE_URL}/login. Make sure backend is running.`;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}

export function logoutUser(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

export function getStoredUser(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

// Book API Functions
const BOOKS_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/books`
  : "http://localhost:5000/api/v1/books";

export async function createBook(
  payload: CreateBookPayload
): Promise<BookResponse> {
  try {
    const token = getStoredToken();
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    
    if (payload.coverImage) {
      formData.append("coverImage", payload.coverImage);
    }
    if (payload.file) {
      formData.append("file", payload.file);
    }

    console.log("Creating book...");
    const response = await fetch(`${BOOKS_API_URL}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Create book response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create book",
      };
    }

    return {
      success: true,
      message: data.message || "Book created successfully",
      book: data.book,
    };
  } catch (error) {
    console.error("Create book error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function updateBook(
  bookId: string,
  payload: UpdateBookPayload
): Promise<BookResponse> {
  try {
    const token = getStoredToken();
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    const formData = new FormData();
    if (payload.title) formData.append("title", payload.title);
    if (payload.description) formData.append("description", payload.description);
    if (payload.coverImage) formData.append("coverImage", payload.coverImage);
    if (payload.file) formData.append("file", payload.file);

    console.log("Updating book...");
    const response = await fetch(`${BOOKS_API_URL}/${bookId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log("Update book response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update book",
      };
    }

    return {
      success: true,
      message: data.message || "Book updated successfully",
      book: data.book,
    };
  } catch (error) {
    console.error("Update book error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function deleteBook(bookId: string): Promise<BookResponse> {
  try {
    const token = getStoredToken();
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    console.log("Deleting book...");
    const response = await fetch(`${BOOKS_API_URL}/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("Delete book response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete book",
      };
    }

    return {
      success: true,
      message: data.message || "Book deleted successfully",
    };
  } catch (error) {
    console.error("Delete book error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function getUserBooks(): Promise<BooksListResponse> {
  try {
    const token = getStoredToken();
    if (!token) {
      return {
        success: false,
        message: "No authentication token found",
      };
    }

    console.log("Fetching user books...");
    const response = await fetch(`${BOOKS_API_URL}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("User books response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch books",
      };
    }

    return {
      success: true,
      message: data.message || "Books fetched successfully",
      books: Array.isArray(data) ? data : data.books || [],
    };
  } catch (error) {
    console.error("Get user books error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function getSingleBook(bookId: string): Promise<BookResponse> {
  try {
    console.log("Fetching single book...");
    const response = await fetch(`${BOOKS_API_URL}/${bookId}`);
    const data = await response.json();
    console.log("Single book response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch book",
      };
    }

    return {
      success: true,
      message: data.message || "Book fetched successfully",
      book: data.book || data,
    };
  } catch (error) {
    console.error("Get single book error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
