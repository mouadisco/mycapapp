import axios from 'axios';

// Configuration de base pour axios
const api = axios.create({
  baseURL: '/odata/v4/catalog',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.error?.message || 
                   error?.message || 
                   'Une erreur est survenue';
    return Promise.reject(new Error(message));
  }
);

// Service pour les livres
export const bookService = {
  getAll: async () => {
    const response = await api.get('/Books?$orderby=ID');
    return response.data.value || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Books(${id})`);
    return response.data;
  },

  create: async (bookData) => {
    const payload = {
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      stock: Math.max(0, Number(bookData.stock) || 0)
    };
    const response = await api.post('/Books', payload);
    return response.data;
  },

  update: async (id, updateData) => {
    const response = await api.patch(`/Books(${id})`, updateData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/Books(${id})`);
    return true;
  }
};

// Service pour les utilisateurs
export const userService = {
  getAll: async () => {
    const response = await api.get('/Users?$orderby=ID');
    return response.data.value || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/Users(${id})`);
    return response.data;
  },

  create: async (userData) => {
    const payload = {
      username: userData.username.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      role: userData.role,
      isActive: userData.isActive
    };
    const response = await api.post('/Users', payload);
    return response.data;
  },

  update: async (id, updateData) => {
    const payload = { ...updateData };
    
    // Nettoyer les données
    if (payload.username) payload.username = payload.username.trim();
    if (payload.email) payload.email = payload.email.trim();
    if (payload.firstName) payload.firstName = payload.firstName.trim();
    if (payload.lastName) payload.lastName = payload.lastName.trim();
    if (payload.password) payload.password = payload.password.trim();
    
    const response = await api.patch(`/Users(${id})`, payload);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/Users(${id})`);
    return true;
  },

  // Méthode pour l'authentification
  authenticate: async (username, password) => {
    const users = await userService.getAll();
    const user = users.find(u => 
      u.username === username && 
      u.password === password &&
      u.isActive === true
    );
    
    if (!user) {
      throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
    }
    
    return {
      id: user.ID,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
  }
};

export default api;
