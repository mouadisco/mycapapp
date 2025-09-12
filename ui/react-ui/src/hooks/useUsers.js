import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(async (userData) => {
    try {
      setError('');
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      return { success: true, message: `User "${userData.username}" added successfully!` };
    } catch (err) {
      const errorMessage = err.message || 'Failed to add user';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const updateUser = useCallback(async (userId, updateData) => {
    try {
      setError('');
      const updatedUser = await userService.update(userId, updateData);
      setUsers(prev => prev.map(user => 
        user.ID === userId ? { ...user, ...updatedUser } : user
      ));
      return { success: true, message: `User "${updateData.username || 'user'}" updated successfully!` };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update user';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const deleteUser = useCallback(async (userId) => {
    try {
      setError('');
      await userService.delete(userId);
      setUsers(prev => prev.filter(user => user.ID !== userId));
      return { success: true, message: 'User deleted successfully!' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete user';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  const toggleUserStatus = useCallback(async (user) => {
    try {
      setError('');
      const updatedUser = await userService.update(user.ID, { isActive: !user.isActive });
      setUsers(prev => prev.map(u => 
        u.ID === user.ID ? { ...u, ...updatedUser } : u
      ));
      return { 
        success: true, 
        message: `User ${!user.isActive ? 'activated' : 'deactivated'} successfully!` 
      };
    } catch (err) {
      const errorMessage = err.message || 'Failed to update user status';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    clearError: () => setError('')
  };
};
