// Constantes de l'application
export const APP_CONFIG = {
  NAME: 'BookManager Pro',
  VERSION: '1.0.0',
  DESCRIPTION: 'Professional Library Management System'
};

// Constantes pour les rôles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

// Constantes pour les types d'alertes
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Constantes pour les onglets admin
export const ADMIN_TABS = {
  BOOKS: 'books',
  USERS: 'users'
};

// Constantes pour les messages
export const MESSAGES = {
  LOADING: {
    BOOKS: 'Chargement de la bibliothèque...',
    USERS: 'Chargement des utilisateurs...',
    GENERAL: 'Chargement...'
  },
  SUCCESS: {
    BOOK_ADDED: (title) => `Livre "${title}" ajouté avec succès !`,
    BOOK_UPDATED: 'Livre modifié avec succès !',
    BOOK_DELETED: 'Livre supprimé avec succès !',
    USER_ADDED: (username) => `Utilisateur "${username}" ajouté avec succès !`,
    USER_UPDATED: (username) => `Utilisateur "${username}" modifié avec succès !`,
    USER_DELETED: 'Utilisateur supprimé avec succès !',
    USER_ACTIVATED: 'Utilisateur activé avec succès !',
    USER_DEACTIVATED: 'Utilisateur désactivé avec succès !'
  },
  ERROR: {
    BOOK_LOAD_FAILED: 'Échec du chargement des livres',
    BOOK_ADD_FAILED: 'Échec de l\'ajout du livre',
    BOOK_UPDATE_FAILED: 'Échec de la modification du livre',
    BOOK_DELETE_FAILED: 'Échec de la suppression du livre',
    USER_LOAD_FAILED: 'Échec du chargement des utilisateurs',
    USER_ADD_FAILED: 'Échec de l\'ajout de l\'utilisateur',
    USER_UPDATE_FAILED: 'Échec de la modification de l\'utilisateur',
    USER_DELETE_FAILED: 'Échec de la suppression de l\'utilisateur',
    LOGIN_FAILED: 'Nom d\'utilisateur ou mot de passe incorrect',
    CONNECTION_ERROR: 'Erreur de connexion. Veuillez réessayer.'
  },
  CONFIRM: {
    DELETE_BOOK: (title) => `Êtes-vous sûr de vouloir supprimer le livre "${title}" ?`,
    DELETE_USER: (username) => `Êtes-vous sûr de vouloir supprimer l'utilisateur "${username}" ?`
  }
};

// Constantes pour la validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_TITLE_LENGTH: 111,
  MAX_AUTHOR_LENGTH: 111,
  MAX_USERNAME_LENGTH: 50,
  MAX_EMAIL_LENGTH: 100,
  MAX_NAME_LENGTH: 50
};

// Constantes pour les délais
export const TIMEOUTS = {
  ALERT_AUTO_HIDE: 3000,
  API_TIMEOUT: 10000
};
