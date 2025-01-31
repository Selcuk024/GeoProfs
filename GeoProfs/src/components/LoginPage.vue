<template>
  <main class="login-page">
    <section class="login-container" aria-labelledby="login-title">
      <div class="logo">
        <img src="@/assets/logo-geo.jpeg" alt="Geoprofs logo" />
      </div>
      <h1 id="login-title">Geoprofs</h1>
      <form @submit.prevent="login" class="login-form" novalidate>
        <input
          type="text"
          v-model="email"
          id="email"
          placeholder="Email"
          required
          aria-required="true"
          aria-describedby="email-description"
        />

        <input
          type="password"
          v-model="password"
          id="password"
          placeholder="Password"
          required
          aria-required="true"
          aria-describedby="password-description"
        />
        <button type="submit" id="submit" class="submit-button" aria-label="Submit login form">
          Submit
        </button>
      </form>

      <p v-if="errorMessage" role="alert" class="error">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { collection, query, where, getDocs, deleteField, updateDoc } from 'firebase/firestore'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null
    }
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
        console.log('User logged in:', userCredential.user)
        this.$emit('login-success', userCredential.user)
      } catch (error) {
        console.error(error)
        this.errorMessage = error.message || 'Login failed. Please try again.'
        this.errorMessage ? this.loginWithDatabase(this.email, this.password) : console.log('no')
      }
    },

    async loginWithDatabase(username, password) {
      //dit is alleen voor de eerste keer
      try {
        const userQuery = query(collection(db, 'users'), where('username', '==', username))
        const querySnapshot = await getDocs(userQuery)

        if (querySnapshot.empty) {
          console.error('No user found with this email')
          return false
        }

        const userDoc = querySnapshot.docs[0]
        const userData = userDoc.data()
        const ref = userDoc.ref

        if (userData.password === password) {
          console.log(userData.password)
          await updateDoc(ref, {
            password: deleteField(),
            madePassword: false
          })
          this.$emit('login-success', userData)
          console.log('Login successful', userData)
          return true
        } else {
          console.error('Incorrect password')
          return false
        }
      } catch (error) {
        console.error('Error during login', error)
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
/* Algemene pagina opmaak */
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

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 20px;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      label {
        text-align: left;
        font-size: 0.9rem;
        color: #666;
      }

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
