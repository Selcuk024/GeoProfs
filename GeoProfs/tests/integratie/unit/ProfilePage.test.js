import { mount } from '@vue/test-utils';
import ProfilePage from '@/components/ProfilePage.vue';
import { vi } from 'vitest';

describe('ProfilePage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProfilePage);
  });

  it('renders the username correctly', () => {
    const usernameElement = wrapper.find('.username');
    expect(usernameElement.exists()).toBe(true);
    expect(usernameElement.text()).toBe('Welkom Marco');
  });

  it('displays the correct data in the personal data columns', () => {
    const personalDataElements = wrapper.findAll('.personal-data');
    
    expect(personalDataElements.length).toBe(5);
    const firstData = personalDataElements.at(0);
    expect(firstData.text()).toContain('Geoorloofd afwezig');
    expect(firstData.text()).toContain('21 uur');
    
    const secondData = personalDataElements.at(1);
    expect(secondData.text()).toContain('Aantal aanvragen');
    expect(secondData.text()).toContain('6');
    
    const thirdData = personalDataElements.at(2);
    expect(thirdData.text()).toContain('Goedgekeurd');
    expect(thirdData.text()).toContain('3');
    
    const fourthData = personalDataElements.at(3);
    expect(fourthData.text()).toContain('Afgekeurd');
    expect(fourthData.text()).toContain('2');
    
    const fifthData = personalDataElements.at(4);
    expect(fifthData.text()).toContain('Verzonden');
    expect(fifthData.text()).toContain('3');
  });
});
