<template>
  <div name="modal" role="dialog" aria-labelledby="verlofaanvraag-title" aria-modal="true">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1 id="verlofaanvraag-title" class="verlofaanvraag-header">Verlofaanvraag</h1>
            <img 
              class="modal-close-button" 
              src="@/assets/close-icon.png" 
              @click="$emit('close')" 
              alt="Sluiten" 
              aria-label="Sluit de verlofaanvraag"/>
          </div>
          <div class="modal-body">
            <h1 class="verlof-type-header">Verlof Type</h1>
            <div class="row">
              <input 
                class="checkbox" 
                type="radio" 
                v-model="verlofType" 
                value="Ziek" 
                id="verlof-ziek"
                aria-labelledby="verlof-ziek-label" />
              <label id="verlof-ziek-label" class="verlofaanvraag-label" for="verlof-ziek">Ziek</label>
            </div>
            <div class="row">
              <input 
                class="checkbox" 
                type="radio" 
                v-model="verlofType" 
                value="Persoonlijk" 
                id="verlof-persoonlijk"
                aria-labelledby="verlof-persoonlijk-label" />
              <label id="verlof-persoonlijk-label" class="verlofaanvraag-label" for="verlof-persoonlijk">Persoonlijk</label>
            </div>
            <div class="row">
              <input 
                class="checkbox" 
                type="radio" 
                v-model="verlofType" 
                value="Vakantie" 
                id="verlof-vakantie"
                aria-labelledby="verlof-vakantie-label" />
              <label id="verlof-vakantie-label" class="verlofaanvraag-label" for="verlof-vakantie">Vakantie</label>
            </div>
            <div class="row">
              <input 
                class="checkbox" 
                type="radio" 
                v-model="verlofType" 
                value="Overige" 
                id="verlof-overige"
                aria-labelledby="verlof-overige-label" />
              <label id="verlof-overige-label" class="verlofaanvraag-label" for="verlof-overige">Overige</label>
            </div>
            <textarea 
              class="verlofaanvraag-input-field" 
              v-model="reason" 
              placeholder="Reden" 
              rows="4" 
              aria-required="true"></textarea>
            <div class="date-container">
              <input 
                class="verlofaanvraag-date" 
                type="date" 
                v-model="startDate" 
                aria-required="true" 
                aria-label="Startdatum" />
              <input 
                class="verlofaanvraag-date" 
                type="date" 
                v-model="endDate" 
                aria-required="true" 
                aria-label="Einddatum" />
            </div>
          </div>
          <div class="modal-footer">
            <button 
              class="modal-default-button" 
              @click="saveVerlof" 
              aria-label="Verstuur verlofaanvraag">
              Versturen
            </button>
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
      console.log('saveVerlof called');
      if (!this.startDate || !this.endDate || !this.reason) {
        alert('Vul alle velden in.');
        return;
      }

      const startDateObj = new Date(this.startDate);
      const endDateObj = new Date(this.endDate);
      if (endDateObj < startDateObj) {
        alert('De einddatum mag niet eerder zijn dan de startdatum.');
        return;
      }

      try {
        const newVerlof = {
          type: this.verlofType,
          reason: this.reason,
          startDate: this.startDate,
          endDate: this.endDate,
          status: "Verzonden", // Default status
          timestamp: new Date() // Save timestamp for sorting later
        };

        // Save to Firestore
        await addDoc(collection(db, 'verlofAanvragen'), newVerlof);

        console.log('Data submitted:', newVerlof);
        alert('Verlof succesvol aangevraagd!');

        this.$emit('close'); // Close modal after success
      } catch (error) {
        console.error(error);
        alert('Er is iets fout gegaan bij het aanvragen van uw verlof. Probeer het later opnieuw.');
      }
    }

  },
}
</script>

<style scoped lang="scss">
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

  .modal-wrapper {
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    background: white;
    border-radius: 4%;
    width: 23.8vw;
    padding: 1.8%;

    .modal-header {
      margin-bottom: 4%;

      .verlofaanvraag-header {
        font-size: 35px;
        font-weight: 600;
        margin-bottom: 4%;
      }

      .modal-close-button {
        position: absolute;
        height: 5%;
        top: 0;
        right: 0;
        margin-top: 4%;
        margin-right: 4%;
        cursor: pointer;
      }
    }

    .modal-body {
      margin-bottom: 4%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .verlof-type-header {
        font-size: 22px;
        font-weight: 200;
      }

      .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1%;

        .checkbox {
          margin-right: 1.4%;
        }

        .verlofaanvraag-label {
          margin: 0;
        }
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

        .verlofaanvraag-date {
          border: solid 2px #e6e6e6;
          color: black;
          font-family: 'Inter', sans-serif;
          padding: 10px;
          border-radius: 5px;
          margin-right: 5px;
        }
      }
    }

    .modal-footer {
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
    }
  }
}
@media (max-width: 1422px) {
  .modal-mask {
    .modal-wrapper {
      display: flex;
      width: 50vw;
      justify-content: center;
    }
  }
}
@media (max-width: 709px) {
  .modal-mask {
    .modal-wrapper {
      display: flex;
      width: 80vw;
      justify-content: center;
    }
  }
}
</style>
