import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBExYmu-feHogQi4WkCsJfE8bcriIfK-TA",
  authDomain: "practice-login-be38b.firebaseapp.com",
  projectId: "practice-login-be38b",
  storageBucket: "practice-login-be38b.firebasestorage.app",
  messagingSenderId: "533337496677",
  appId: "1:533337496677:web:73640d2c472261a9cafa8c"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
