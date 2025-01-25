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
  return {
    getFirestore: vi.fn(() => ({
      collection: vi.fn(() => ({
        docs: [],
      })),
    })),
    collection: vi.fn(() => ({
      docs: [],
    })),
    getDocs: vi.fn(() =>
      Promise.resolve({
        docs: [
          {
            id: 'mockUserId',
            data: () => ({
              username: 'TestUser',
              email: 'test@example.com',
              bsn: '123456789',
              afdeling: 'IT',
              positie: 'Manager',
              date: new Date(),
            }),
          },
        ],
      })
    ),
    doc: vi.fn(() => ({})),
    setDoc: vi.fn(() => Promise.resolve()),
    deleteDoc: vi.fn(() => Promise.resolve()),
    Timestamp: {
      now: vi.fn(() => new Date()),
    },
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
    await wrapper.find('.add-user-button').trigger('click');

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
    const wrapper = mount(AdminPage);
  
    // Klik op de "Gebruiker Aanmaken"-knop
    await wrapper.find('.add-user-button').trigger('click');
  
    // Wacht tot het formulier verschijnt
    await wrapper.vm.$nextTick();
  
    // Controleer of het formulier zichtbaar is
    expect(wrapper.find('form').exists()).toBe(true);
  
    // Simuleer formulierinvoer
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser');
    await wrapper.find('input[placeholder="Enter email"]').setValue('');  // Leeg veld om foutmelding uit te lokken
    await wrapper.find('input[placeholder="Enter BSN"]').setValue('123456789');
    await wrapper.find('input[placeholder="Enter afdeling"]').setValue('IT');
  
    // Formulier indienen
    await wrapper.find('form').trigger('submit.prevent');
  
    // Controleer of de foutmelding zichtbaar is
    expect(wrapper.vm.errorMessage).toBe('Vul alle velden in voordat je doorgaat.');
  });
});
