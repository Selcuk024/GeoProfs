<template>
  <div name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1 class="verlofaanvraag-header">Verlofaanvraag</h1>
            <img class="modal-close-button" src="@/assets/close-icon.png" @click="$emit('close')" />
          </div>
          <div class="modal-body">
            <h1 class="verlof-type-header">Verlof Type</h1>
            <div class="row">
              <input class="checkbox" type="radio" v-model="verlofType" value="Ziek" />
              <label class="verlofaanvraag-label">Ziek</label>
            </div>
            <div class="row">
              <input class="checkbox" type="radio" v-model="verlofType" value="Persoonlijk" />
              <label class="verlofaanvraag-label">Persoonlijk</label>
            </div>
            <div class="row">
              <input class="checkbox" type="radio" v-model="verlofType" value="Vakantie" />
              <label class="verlofaanvraag-label">Vakantie</label>
            </div>
            <div class="row">
              <input class="checkbox" type="radio" v-model="verlofType" value="Overige" />
              <label class="verlofaanvraag-label">Overige</label>
            </div>
            <textarea
              class="verlofaanvraag-input-field"
              v-model="reason"
              placeholder="Reden"
              rows="4"
            ></textarea>
            <div class="date-container">
              <input class="verlofaanvraag-date" type="date" v-model="startDate" />
              <input class="verlofaanvraag-date" type="date" v-model="endDate" />
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="saveVerlof">Versturen</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  name: 'VerlofModal',
  data() {
    return {
      verlofType: 'Ziek',
      reason: '',
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    async saveVerlof() {
      if (!this.startDate || !this.endDate || !this.reason) {
        alert('Vul alle velden in.')
        return;
      } // else {
        // alert('Incorrecte datum(s)')
      // }

      try {
        await addDoc(collection(db, 'verlofAanvragen'), {
          type: this.verlofType,
          reason: this.reason,
          startDate: this.startDate,
          endDate: this.endDate,
          status: 'Verzonden',
          timestamp: new Date()
        })
        alert('Verlof succesvol aangevraagd!')
        this.$emit('close')
      } catch (error) {
        console.error("Error adding document: ", error);
        alert('Er is iets fout gegaan bij het aanvragen van uw verlof. Probeer het later opnieuw.')
      }
    }
  }
}
</script>

<style scoped>
.modal-close-button {
  position: absolute;
  height: 5%;
  top: 0;
  right: 0;
  margin-top: 4%;
  margin-right: 4%;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: white;
  border-radius: 4%;
  width: 23.8vw;
  padding: 1.8%;
}

.modal-header {
  margin-bottom: 4%;
}

.modal-default-button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 50px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 20px;
  margin-left: auto;
  background-color: #209fd2;
  color: white;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.verlofaanvraag-header {
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 4%;
}

.verlof-type-header {
  font-size: 22px;
  font-weight: 200;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1%;
}

.checkbox {
  margin-right: 1.4%;
}

.verlofaanvraag-input-field {
  border: none;
  font-family: 'Inter', sans-serif;
  height: 18%;
  width: 75.5%;
  padding: 2%;
  margin-top: 4%;
  margin-bottom: 5%;
  border-radius: 5px;
  background-color: #e6e6e6;
}

.date-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.verlofaanvraag-date {
  border: solid 2px #e6e6e6;
  color: black;
  font-family: 'Inter', sans-serif;
  padding: 10px;
  border-radius: 5px;
  margin-right: 5px;
}
</style>
