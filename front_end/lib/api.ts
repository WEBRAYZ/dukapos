const getApiUrl = () => {
  // Prioritize environment variables
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  if (typeof window === 'undefined') {
    return process.env.BACKEND_API_URL || 'http://localhost:8000';
  }

  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // Handle localhost with subdomains (e.g., tenant.localhost:3000)
  if (parts.length > 1 && parts[parts.length - 1] === 'localhost') {
    const protocol = window.location.protocol;
    const port = '8000'; // Backend port
    return `${protocol}//${hostname}:${port}`;
  }
  
  // Default to localhost if no environment variable and not a known local pattern
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiUrl();

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, ...customOptions } = options;
  
  // Construct URL
  // If it's a relative path, we prepend API_BASE_URL + /api
  let url = endpoint.startsWith('http') 
    ? endpoint 
    : `${API_BASE_URL}/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `${url.includes('?') ? '&' : '?'}${searchParams.toString()}`;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  const isFormData = customOptions.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customOptions.headers,
  };

  const config: RequestInit = {
    ...customOptions,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 401 && typeof window !== 'undefined') {
      // Handle unauthorized
      if (!url.includes('/auth/login/')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || JSON.stringify(errorData) || 'An error occurred');
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const api = {
  get: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'GET' }),
    
  post: <T>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { 
      ...options, 
      method: 'POST', 
      body: data instanceof FormData ? data : JSON.stringify(data) 
    }),
    
  put: <T>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { 
      ...options, 
      method: 'PUT', 
      body: data instanceof FormData ? data : JSON.stringify(data) 
    }),
    
  patch: <T>(url: string, data?: any, options?: RequestOptions) => 
    request<T>(url, { 
      ...options, 
      method: 'PATCH', 
      body: data instanceof FormData ? data : JSON.stringify(data) 
    }),
    
  delete: <T>(url: string, options?: RequestOptions) => 
    request<T>(url, { ...options, method: 'DELETE' }),
};
