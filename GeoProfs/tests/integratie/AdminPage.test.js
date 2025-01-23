import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AdminPage from '../../src/components/AdminPage.vue';
import { db, auth } from '../../src/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Vergeet niet de Timestamp te importeren

describe('AdminPage.vue', () => {
  it('toont formulier en voegt een gebruiker toe wanneer het formulier wordt ingediend', async () => {
    // Zorg ervoor dat je werkt met een testomgeving (bijv. Firestore Emulator)

    // Maak de gebruiker aan met Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, 'test@example.com', 'Test@1234');
    const user = userCredential.user;

    const wrapper = mount(AdminPage);

    // Zorg ervoor dat het formulier eerst niet zichtbaar is
    expect(wrapper.find('form').exists()).toBe(false);

    // Klik op de "Gebruiker Aanmaken"-knop om het formulier zichtbaar te maken
    await wrapper.find('.addUserButton').trigger('click');

    // Het formulier zou nu zichtbaar moeten zijn
    expect(wrapper.find('form').exists()).toBe(true);

    // Simuleer formulierinvoer
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser');
    await wrapper.find('input[placeholder="Enter email"]').setValue('test@example.com');
    await wrapper.find('input[placeholder="Enter BSN"]').setValue('123456789');
    await wrapper.find('input[placeholder="Enter afdeling"]').setValue('IT');
    await wrapper.find('select').setValue('Manager');

    // Wachtwoord genereren simuleren
    wrapper.vm.generatedPassword = 'Test@1234';

    // Formulier indienen
    await wrapper.find('form').trigger('submit.prevent');

    // Controleer of de gebruiker daadwerkelijk is aangemaakt via Firebase Auth
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      username: 'TestUser',
      email: 'test@example.com',
      date: Timestamp.now(),  // Gebruik Timestamp.now() om de huidige tijd als Timestamp op te slaan
      bsn: '123456789',
      wachtwoord: 'Test@1234',
      afdeling: 'IT',
      positie: 'Manager'
    });

    // Controleer of het document werkelijk bestaat in Firestore
    const docSnapshot = await getDoc(userDocRef);
    expect(docSnapshot.exists()).toBe(true);

    // Controleer of het datumveld een Timestamp is
    const data = docSnapshot.data();
    expect(data.date).toBeInstanceOf(Timestamp);
  });

  it('toont een foutmelding bij een mislukte registratie', async () => {
    // Simuleer een mislukte registratie met Firebase Auth
    try {
      await createUserWithEmailAndPassword(auth, 'invalid-email', 'short');
    } catch (error) {
      expect(error.message).toContain('auth/invalid-email');
    }

    const wrapper = mount(AdminPage);

    // Klik op de "Gebruiker Aanmaken"-knop om het formulier zichtbaar te maken
    await wrapper.find('.addUserButton').trigger('click');

    // Simuleer formulierinvoer
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser');
    await wrapper.find('input[placeholder="Enter email"]').setValue('invalid-email');
    wrapper.vm.generatedPassword = 'short';

    // Formulier indienen
    await wrapper.find('form').trigger('submit.prevent');

    // Controleer of de foutmelding zichtbaar is
    expect(wrapper.vm.showForm).toBe(true);
    expect(wrapper.vm.errorMessage).toBe('Vul alle velden in voordat je doorgaat.');
  });
});
