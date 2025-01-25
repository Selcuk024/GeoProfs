import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import HomePage from '@/components/HomePage.vue';
import { getAuth } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
}));

describe('HomePage.vue', () => {
  it('renders the correct component based on the currentTab', async () => {
    // Mock de getAuth en de huidige gebruiker
    getAuth.mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    const wrapper = mount(HomePage);

    // Test of de initiale component correct wordt weergegeven
    expect(wrapper.findComponent({ name: 'VerlofPage' }).exists()).toBe(true);

    // Verander de tab naar "afwezig" en controleer of de component verandert
    await wrapper.setData({ currentTab: 'afwezig' });
    expect(wrapper.findComponent({ name: 'AfwezigPage' }).exists()).toBe(true);

    // Verander de tab naar "profiel" en controleer of de component verandert
    await wrapper.setData({ currentTab: 'profiel' });
    expect(wrapper.findComponent({ name: 'ProfilePage' }).exists()).toBe(true);

    // Verander de tab naar "admin" en controleer of de component verandert
    await wrapper.setData({ currentTab: 'admin' });
    expect(wrapper.findComponent({ name: 'AdminPage' }).exists()).toBe(true);
  });

  it('sets userId correctly after created hook', async () => {
    // Mock de getAuth en de huidige gebruiker
    getAuth.mockReturnValue({
      currentUser: { uid: 'user123' },
    });

    const wrapper = mount(HomePage);

    // Wacht totdat de created hook is uitgevoerd
    await wrapper.vm.$nextTick();

    // Test of de userId correct is ingesteld
    expect(wrapper.vm.userId).toBe('user123');
  });

  it('logs an error if no user is logged in', async () => {
    // Mock de getAuth en geen huidige gebruiker
    getAuth.mockReturnValue({
      currentUser: null,
    });

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(HomePage);

    // Wacht totdat de created hook is uitgevoerd
    await wrapper.vm.$nextTick();

    // Test of de error wordt gelogd
    expect(consoleError).toHaveBeenCalledWith('Geen gebruiker ingelogd.');

    consoleError.mockRestore();
  });
});
