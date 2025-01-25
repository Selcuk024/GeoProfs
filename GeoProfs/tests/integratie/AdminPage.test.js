import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AdminPage from '../../src/components/AdminPage.vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore';

// Mock de Firebase modules correct
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  createUserWithEmailAndPassword: vi.fn(() =>
    Promise.resolve({ user: { uid: 'mockUserId' } })
  ),
}));

vi.mock('firebase/firestore', async () => {
  const actualFirestore = await vi.importActual('firebase/firestore');
  return {
    ...actualFirestore, // Haal alle originele functies op (indien nodig)
    getFirestore: vi.fn(() => ({})),  // Mock Firestore-initialisatie
    setDoc: vi.fn(() => Promise.resolve()),  // Simuleer setDoc-functie
    doc: vi.fn(() => ({})),  // Mock doc-functie
  };
});

describe('AdminPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AdminPage);
  });

  it('voert form submission uit en slaat data op in Firestore', async () => {
    const wrapper = mount(AdminPage);

    // Open het form
    await wrapper.find('.addUserButton').trigger('click');

    // Vul het in
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser');
    await wrapper.find('input[placeholder="Enter email"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="Enter BSN"]').setValue('123456789');
    await wrapper.find('input[placeholder="Enter afdeling"]').setValue('IT');
    await wrapper.find('select').setValue('Manager');

    // Genereer wachtwoord
    wrapper.vm.generatedPassword = 'Test@1234';

    // Form submitten
    await wrapper.find('form').trigger('submit.prevent');

    // Controleer of de Firebase-auth-functie werd aangeroepen
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      'test@example.com',
      'Test@1234'
    );

    // Controleer of setDoc werd aangeroepen met de juiste gegevens
    expect(setDoc).toHaveBeenCalledWith(
      expect.any(Object),
      {
        username: 'TestUser',
        email: 'test@example.com',
        date: expect.any(Object), 
        bsn: '123456789',
        wachtwoord: 'Test@1234',
        afdeling: 'IT',
        positie: 'Manager',
      }
    );
  });


  it('toont een foutmelding bij een onvolledig formulier', async () => {
    // Klik op de "Gebruiker Aanmaken" button
    await wrapper.find('.addUserButton').trigger('click');

    // Sommige fielden leeg laten
    await wrapper.find('input[placeholder="Enter username"]').setValue('');
    await wrapper.find('input[placeholder="Enter email"]').setValue('invalid-email');
    await wrapper.find('form').trigger('submit.prevent');

    // Controleer of de foutmelding verschijnt
    expect(wrapper.vm.errorMessage).toBe('Vul alle velden in voordat je doorgaat.');
  });
});
