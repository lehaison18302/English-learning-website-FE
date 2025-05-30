import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user');
        
        if (user) {
          // Lấy thông tin user từ Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data from Firestore:', userData);
            setIsAdmin(userData.isAdmin === 1);
            setCurrentUser({
              ...user,
              ...userData
            });
          } else {
            console.log('No user document found in Firestore');
            // Nếu không tìm thấy user trong Firestore, đăng xuất
            await auth.signOut();
            setCurrentUser(null);
            setIsAdmin(false);
          }
        } else {
          console.log('No authenticated user');
          setCurrentUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setCurrentUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    setCurrentUser, // Thêm hàm này để có thể gọi từ Sidebar
    isAdmin,
    loading,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <span>Đang tải...</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}