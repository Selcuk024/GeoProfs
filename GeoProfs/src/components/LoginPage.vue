<template>
  <!-- container voor de login pagina -->
  <main class="login-page">
    <!-- sectie voor login formulier -->
    <section class="login-container" aria-labelledby="login-title">
      <div class="logo">
        <img src="@/assets/logo-geo.jpeg" alt="geoprofs logo" />
      </div>
      <!-- titel van de login pagina -->
      <h1 id="login-title">Geoprofs</h1>
      <!-- formulier voor login met preventie van standaard submit gedrag -->
      <form @submit.prevent="login" class="login-form" novalidate>
        <!-- invoerveld voor email -->
        <input
          type="text"
          v-model="email"
          id="email"
          placeholder="Email"
          required
          aria-required="true"
          aria-describedby="email-description"
        />
        <!-- invoerveld voor wachtwoord -->
        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Password"
          required
          aria-required="true"
          aria-describedby="password-description"
        />
        <!-- knop om het formulier te versturen -->
        <button type="submit" id="submit" class="submit-button" aria-label="submit login form">
          Submit
        </button>
      </form>
      <!-- foutmelding als login mislukt -->
      <p v-if="errorMessage" role="alert" class="error">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<script>
// Importeer de benodigde functies/variables
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, deleteField, updateDoc } from 'firebase/firestore'

export default {
  name: 'LoginPage',
  data() {
    return {
      // email veld voor login
      email: '',
      // wachtwoord veld voor login
      password: '',
      // foutmelding die getoond wordt bij een login error
      errorMessage: null
    }
  },
  methods: {
    async login() {
      try {
        // probeer in te loggen met email en wachtwoord via firebase auth
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        // log de ingelogde gebruiker in de console
        console.log('user logged in:', userCredential.user)
        // geef login succes door aan parent component via event
        this.$emit('login-success', userCredential.user)
      } catch (error) {
        // log de fout in de console
        console.error(error)
        // zet foutmelding zodat deze getoond wordt aan de gebruiker
        this.errorMessage = error.message || 'login failed. please try again.'
        // als er een foutmelding is, probeer in te loggen met database fallback
        this.errorMessage ? this.loginWithDatabase(this.email, this.password) : console.log('no')
      }
    },

    async loginWithDatabase(username, password) {
      // dit is alleen voor de eerste keer
      try {
        // maak een query om de gebruiker te vinden met de opgegeven username
        const userQuery = query(collection(db, 'users'), where('username', '==', username))
        const querySnapshot = await getDocs(userQuery)

        // controleer of er een gebruiker gevonden is
        if (querySnapshot.empty) {
          console.error('no user found with this email')
          return false
        }

        // haal de eerste gebruiker op uit de query resultaten
        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data()
        const ref = userDoc.ref

        // controleer of het wachtwoord overeenkomt met de database
        if (userData.password === password) {
          console.log(userData.password)
          // update het document: verwijder het wachtwoordveld en zet madePassword op false
          await updateDoc(ref, {
            password: deleteField(),
            madePassword: false
          })
          // geef login succes door aan parent component via event
          this.$emit('login-success', userData)
          console.log('login successful', userData)
          return true
        } else {
          console.error('incorrect password')
          return false
        }
      } catch (error) {
        // log de error tijdens de login met database fallback
        console.error('error during login', error)
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;

  .login-container {
    text-align: center;
    padding: 40px;
    max-width: 400px;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .logo {
      img {
        width: 80px;
        height: 80px;
        margin-bottom: 20px;
      }
    }

    h1 {
      margin-bottom: 20px;
      font-size: 2rem;
      font-weight: bold;
      color: #333;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      input {
        padding: 12px;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    .submit-button {
      padding: 12px;
      font-size: 1rem;
      background-color: black;
      color: white;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #333;
      }
    }

    .error {
      margin-top: 15px;
      color: red;
    }
  }
}
</style>
