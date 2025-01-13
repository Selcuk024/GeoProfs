<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h1 class="verlofaanvraag-header">Verlofaanvraag</h1>
                        <button class="modal-close-button" @click="$emit('close')">X</button>
                    </div>
                    <div class="modal-body">
                        <h1 class="verlof-type-header">Verlof Type</h1>
                        <div class="row">
                            <input type="radio" checked="checked" name="radio">
                            <label class="verlofaanvraag-label">Ziek</label>
                        </div>
                        <div class="row">
                            <input type="radio" name="radio">
                            <label class="verlofaanvraag-label">Persoonlijk</label>
                        </div>
                        <div class="row">
                            <input type="radio" name="radio">
                            <label class="verlofaanvraag-label">Vakantie</label>
                        </div>
                        <div class="row">
                            <input type="radio" name="radio">
                            <label class="verlofaanvraag-label">Overige</label>
                        </div>
                        <textarea class="verlofaanvraag-input-field" placeholder="Reden" id="w3review" name="w3review" rows="4"
                            cols="50"></textarea>
                        <div class="date-container">
                            <input class="verlofaanvraag-date" type="date" id="start-date" name="start-date">
                            <input class="verlofaanvraag-date" type="date" id="end-date" name="end-date">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-default-button">Versturen</button>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "VerlofModal"
};
</script>

<style scoped>
.modal-close-button {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 20px;
    font-weight: 400;
    background-color: #0000;
    border: none;
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
    border-radius: 15px;
    width: 23.8vw;
    padding: 35px;
}

.modal-header,
.modal-footer {
    margin-bottom: 10px;
}

.modal-default-button {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 50px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 20px;
    margin-left: auto;
    background-color: #209FD2;
    color: white;
}

.modal-body {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.verlofaanvraag-header {
    font-size: 35px;
    font-weight: 600;
    margin-bottom: 20px;
}

.verlof-type-header {
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 200;
}

.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
}

.verlofaanvraag-input-field {
    border: none;
    font-family: 'Inter', sans-serif;
    height: 70px;
    width: 80%;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #F1F1F1;
}

.date-container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.verlofaanvraag-date {
    border: solid 2px #E6E6E6;
    color: black;
    font-family: 'Inter', sans-serif;
    padding: 10px;
    border-radius: 5px;
    margin-right: 5px;
}
</style>