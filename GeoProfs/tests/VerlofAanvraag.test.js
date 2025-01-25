import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import VerlofModal from '@/components/VerlofModal.vue';
describe('VerlofModal Integration Test', () => {
    it('should trigger an alert on successful submission', async () => {
        // Spy on window.alert
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        
        const wrapper = mount(VerlofModal);
        await wrapper.find('input[type="radio"][value="Persoonlijk"]').setChecked();
        await wrapper.find('textarea').setValue('Ik heb een persoonlijke afspraak.');
        await wrapper.find('input[type="date"]').setValue('2025-01-19');
        await wrapper.findAll('input[type="date"]')[1].setValue('2025-01-22');
        
        await wrapper.find('.modal-default-button').trigger('click');
        expect(alertSpy).toHaveBeenCalledWith('Verlof succesvol aangevraagd!');
        console.log(wrapper.html());
    });
});