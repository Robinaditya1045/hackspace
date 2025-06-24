import { auth, db } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export const signUpUser = async (email, password, displayName) => {
  try {
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { success: false, message: "User already exists. Please log in." };
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    await setDoc(doc(db, "emailVerifications", email), {
      verifyCode,
      createdAt: serverTimestamp(),
    });

      const emailResponse = await sendVerificationEmail(
        email,
        verifyCode
      );

     if(!emailResponse.success){
      console.error('Error sending verification email:', emailResponse.message);
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
     }

    return { 
      success: true, 
      message: "Verification email sent. Please check your inbox." 
    };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { success: false, message: error.message };
  }
};

export const verifyEmailCode = async (email, code, password, displayName) => {
  try {
    const verificationRef = doc(db, "emailVerifications", email);
    const verificationSnap = await getDoc(verificationRef);

    if (!verificationSnap.exists()) {
      return { success: false, message: "No verification code found." };
    }

    const { verifyCode, createdAt } = verificationSnap.data();

    const expirationTime = 10 * 60 * 1000; 
    const now = new Date();
    const codeAge = now - createdAt.toDate();

    if (code !== verifyCode) {
      return { success: false, message: "Incorrect verification code." };
    }

    if (codeAge > expirationTime) {
      await deleteDoc(verificationRef);
      return { success: false, message: "Code has expired. Please request a new one." };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await setDoc(doc(db, "users", email), {
      email: user.email,
      displayName,
      photoURL: user.photoURL || "/robotic.png",
      authProvider: "email",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      twoFactorEnabled: false,
      workspaces: {},
      settings: {
        theme: "dark",
        fontSize: 14,
        showLineNumbers: true,
        aiSuggestions: true,
      },
      snippets: [],
    });

    await deleteDoc(verificationRef);

    return { success: true, user };
  } catch (error) {
    console.error("Verification error:", error);
    return { success: false, message: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || "robotic.png",
        authProvider: "google",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        twoFactorEnabled: false,
        workspaces: {},
        settings: {
          theme: "dark",
          fontSize: 14,
          showLineNumbers: true,
          aiSuggestions: true,
        },
        snippets: [],
      });
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};