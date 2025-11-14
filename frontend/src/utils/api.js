const API_BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (method, endpoint, data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API Error');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Auth APIs
export const signup = (name, email, password, role) => {
  return apiCall('POST', '/auth/signup', { name, email, password, role });
};

export const login = (email, password) => {
  return apiCall('POST', '/auth/login', { email, password });
};

// Notice APIs
export const getAllNotices = () => {
  return apiCall('GET', '/notices');
};

export const getNoticeById = (id) => {
  return apiCall('GET', `/notices/${id}`);
};

export const createNotice = (title, date, type, token) => {
  return apiCall('POST', '/notices', { title, date, type }, token);
};

export const updateNotice = (id, title, date, type, token) => {
  return apiCall('PUT', `/notices/${id}`, { title, date, type }, token);
};

export const deleteNotice = (id, token) => {
  return apiCall('DELETE', `/notices/${id}`, null, token);
};
