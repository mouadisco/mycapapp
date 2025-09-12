// Fonctions utilitaires générales

// Formatage des dates
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

// Formatage des nombres
export const formatNumber = (number) => {
  if (typeof number !== 'number') return '0';
  return new Intl.NumberFormat('fr-FR').format(number);
};

// Génération d'initiales
export const getInitials = (firstName, lastName, username) => {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (username) {
    return username[0].toUpperCase();
  }
  return '?';
};

// Fonction de debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Fonction de throttle
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Vérification si un objet est vide
export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// Clonage profond d'un objet
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

// Génération d'un ID unique
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Capitalisation de la première lettre
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Formatage du nom complet
export const formatFullName = (firstName, lastName) => {
  if (!firstName && !lastName) return '';
  if (!firstName) return lastName;
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
};

// Vérification de la validité d'un email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour obtenir la couleur du stock
export const getStockColor = (stock) => {
  if (stock > 10) return 'success';
  if (stock > 5) return 'warning';
  if (stock > 0) return 'info';
  return 'danger';
};

// Fonction pour obtenir l'icône du stock
export const getStockIcon = (stock) => {
  if (stock > 10) return '📚';
  if (stock > 5) return '📖';
  if (stock > 0) return '📗';
  return '📕';
};

// Fonction pour obtenir l'icône du rôle
export const getRoleIcon = (role) => {
  return role === 'admin' ? '👑' : '👤';
};

// Fonction pour obtenir la couleur du rôle
export const getRoleColor = (role) => {
  return role === 'admin' ? 'admin' : 'user';
};

// Fonction pour obtenir l'icône du statut
export const getStatusIcon = (isActive) => {
  return isActive ? '✅' : '❌';
};

// Fonction pour obtenir la couleur du statut
export const getStatusColor = (isActive) => {
  return isActive ? 'success' : 'danger';
};
