import React, { useState, useCallback } from 'react';

// Import Components
import Header from './components/Header';
import BookForm from './components/BookForm';
import BookLibrary from './components/BookLibrary';
import UserManagement from './components/UserManagement';
import AdminNavigation from './components/AdminNavigation';
import AlertContainer from './components/AlertContainer';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';

// Import Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Import Hooks
import { useBooks } from './hooks/useBooks';
import { useAlert, AlertProvider } from './hooks/useAlert.jsx';

// Import Constants
import { ADMIN_TABS, MESSAGES } from './constants';

// Import Styles
import './styles/design-system.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState(ADMIN_TABS.BOOKS);
  const { isAdmin } = useAuth();
  const { showSuccess, showError } = useAlert();
  
  const {
    books,
    loading: booksLoading,
    error: booksError,
    addBook,
    updateBook,
    deleteBook,
    clearError: clearBooksError
  } = useBooks();

  // Gestionnaires optimisés avec useCallback
  const handleAddBook = useCallback(async (bookData) => {
    const result = await addBook(bookData);
    if (result.success) {
      showSuccess(result.message);
    } else {
      showError(result.message);
    }
  }, [addBook, showSuccess, showError]);

  const handleUpdateStock = useCallback(async (bookId, stockData) => {
    const result = await updateBook(bookId, stockData);
    if (!result.success) {
      showError(result.message);
    }
  }, [updateBook, showError]);

  const handleDeleteBook = useCallback(async (bookId) => {
    const book = books.find(b => b.ID === bookId);
    const bookTitle = book?.title || 'ce livre';
    
    if (window.confirm(MESSAGES.CONFIRM.DELETE_BOOK(bookTitle))) {
      const result = await deleteBook(bookId);
      if (result.success) {
        showSuccess(result.message);
      } else {
        showError(result.message);
      }
    }
  }, [books, deleteBook, showSuccess, showError]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // Affichage des erreurs de livres
  if (booksError) {
    showError(booksError);
    clearBooksError();
  }

  return (
    <ProtectedRoute>
      <div className="app">
        <Header />
        
        <main className="container">
          {/* Container pour les alertes */}
          <AlertContainer />

          {/* Navigation Admin */}
          {isAdmin() && (
            <AdminNavigation 
              activeTab={activeTab} 
              onTabChange={handleTabChange} 
            />
          )}
          
          {/* Contenu basé sur le rôle et l'onglet actif */}
          {isAdmin() ? (
            // Vue admin avec onglets
            <>
              {activeTab === ADMIN_TABS.BOOKS && (
                <>
                  <BookForm 
                    onSubmit={handleAddBook}
                    loading={booksLoading}
                  />
                  
                  <BookLibrary 
                    books={books}
                    loading={booksLoading}
                    onUpdateStock={handleUpdateStock}
                    onDelete={handleDeleteBook}
                  />
                </>
              )}
              
              {activeTab === ADMIN_TABS.USERS && (
                <UserManagement />
              )}
            </>
          ) : (
            // Vue utilisateur - livres en lecture seule
            <BookLibrary 
              books={books}
              loading={booksLoading}
              onUpdateStock={handleUpdateStock}
              onDelete={handleDeleteBook}
            />
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;