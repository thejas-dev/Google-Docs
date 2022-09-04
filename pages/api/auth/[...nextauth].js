import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {db,storage} from '../../../firebase'
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import * as firestoreFunctions from 'firebase/firestore'

const LOGIN_URL = " http://localhost:3000/api/auth/callback/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     
    }),
    
  ],
    
 
  
})