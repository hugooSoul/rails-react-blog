export const API_URL = process.env.NODE_ENV === "test" ? "http://mocked-api-url" : 'http://localhost:3000/api/v1/posts';

// export const API_URL = process.env.NODE_ENV === "test" ? "http://mocked-api-url" : import.meta.env.API_URL;
