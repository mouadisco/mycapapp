import { VALIDATION } from '../constants';

// Validation des livres
export const validateBook = (bookData) => {
  const errors = {};

  if (!bookData.title?.trim()) {
    errors.title = 'Le titre du livre est requis';
  } else if (bookData.title.length > VALIDATION.MAX_TITLE_LENGTH) {
    errors.title = `Le titre ne peut pas dépasser ${VALIDATION.MAX_TITLE_LENGTH} caractères`;
  }

  if (!bookData.author?.trim()) {
    errors.author = 'L\'auteur est requis';
  } else if (bookData.author.length > VALIDATION.MAX_AUTHOR_LENGTH) {
    errors.author = `L'auteur ne peut pas dépasser ${VALIDATION.MAX_AUTHOR_LENGTH} caractères`;
  }

  if (bookData.stock !== undefined) {
    const stock = Number(bookData.stock);
    if (isNaN(stock) || stock < 0) {
      errors.stock = 'Le stock doit être un nombre positif';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation des utilisateurs
export const validateUser = (userData, isEditMode = false) => {
  const errors = {};

  if (!userData.username?.trim()) {
    errors.username = 'Le nom d\'utilisateur est requis';
  } else if (userData.username.length > VALIDATION.MAX_USERNAME_LENGTH) {
    errors.username = `Le nom d'utilisateur ne peut pas dépasser ${VALIDATION.MAX_USERNAME_LENGTH} caractères`;
  }

  if (!userData.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (userData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
    errors.email = `L'email ne peut pas dépasser ${VALIDATION.MAX_EMAIL_LENGTH} caractères`;
  } else if (!VALIDATION.EMAIL_REGEX.test(userData.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!userData.firstName?.trim()) {
    errors.firstName = 'Le prénom est requis';
  } else if (userData.firstName.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.firstName = `Le prénom ne peut pas dépasser ${VALIDATION.MAX_NAME_LENGTH} caractères`;
  }

  if (!userData.lastName?.trim()) {
    errors.lastName = 'Le nom est requis';
  } else if (userData.lastName.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.lastName = `Le nom ne peut pas dépasser ${VALIDATION.MAX_NAME_LENGTH} caractères`;
  }

  if (!isEditMode && !userData.password?.trim()) {
    errors.password = 'Le mot de passe est requis';
  } else if (userData.password && userData.password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.password = `Le mot de passe doit contenir au moins ${VALIDATION.MIN_PASSWORD_LENGTH} caractères`;
  }

  if (!userData.role || !['admin', 'user'].includes(userData.role)) {
    errors.role = 'Le rôle doit être admin ou user';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation des identifiants de connexion
export const validateLogin = (loginData) => {
  const errors = {};

  if (!loginData.username?.trim()) {
    errors.username = 'Le nom d\'utilisateur est requis';
  }

  if (!loginData.password?.trim()) {
    errors.password = 'Le mot de passe est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Fonction utilitaire pour nettoyer les données
export const sanitizeData = (data) => {
  const sanitized = { ...data };
  
  // Nettoyer les chaînes de caractères
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  });

  return sanitized;
};
