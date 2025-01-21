import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function createAdminAccount(email, password, role) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, "users", userId), {
      email: email,
      role: role,
    });

    console.log("Gebruiker aangemaakt met rol:", role);
    return true;
  } catch (error) {
    console.error("Fout bij het aanmaken van de gebruiker:", error.message);
    throw error;
  }
}
