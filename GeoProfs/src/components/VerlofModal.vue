<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">Default Header</slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">Default Body</slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            Default Footer
                            <button class="modal-default-button" @click="$emit('close')">OK</button>
                        </slot>
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    background: white;
    border-radius: 5px;
    width: 300px;
    padding: 20px;
}

.modal-header,
.modal-body,
.modal-footer {
    margin-bottom: 10px;
}

.modal-default-button {
    background: #42b983;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
}

.modal-default-button:hover {
    background: #3a9b7a;
}
</style>