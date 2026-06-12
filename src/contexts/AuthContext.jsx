import { createContext, useContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase/firebase.config'

const AuthContext = createContext(null)
const adminEmails = ['admin@example.com']

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const register = async ({ name, email, password }) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName: name })
    await signOut(auth)
    return { uid: credential.user.uid, email, name }
  }

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const googleLogin = () => signInWithPopup(auth, new GoogleAuthProvider())
  const logout = () => signOut(auth)
  const isAdmin = Boolean(user?.email && adminEmails.includes(user.email))
  const sendVerificationEmail = (user) => sendEmailVerification(user)
  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  const value = { user, loading, setLoading, isAdmin, register, login, googleLogin, logout, sendVerificationEmail, resetPassword }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
