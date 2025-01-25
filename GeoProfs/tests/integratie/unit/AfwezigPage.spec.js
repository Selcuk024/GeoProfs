import { mount } from '@vue/test-utils';
import AfwezigPage from '@/components/AfwezigPage.vue';

describe('AfwezigPage.vue', () => {
  it('renders the component and contains the correct elements', () => {
    const wrapper = mount(AfwezigPage);

    // Controleer of de component correct is gerenderd
    expect(wrapper.exists()).toBe(true);

    // Controleer of de afwezig-page klasse aanwezig is
    const page = wrapper.find('.afwezig-page');
    expect(page.exists()).toBe(true);

    // Controleer of de absence-card klasse aanwezig is
    const card = wrapper.find('.absence-card');
    expect(card.exists()).toBe(true);

    // Controleer of de titel correct is
    const title = wrapper.find('h3');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Geoorloofd afwezig');

    // Controleer of de tekst '0 uur' correct wordt weergegeven
    const hours = wrapper.find('p');
    expect(hours.exists()).toBe(true);
    expect(hours.text()).toBe('0 uur');
  });
});
