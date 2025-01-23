import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AdminPage from '../../src/components/AdminPage.vue'
import { db, auth } from '../../src/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

// Mock Firebase functies
vi.mock('@/firebase', () => ({
  db: {},
  auth: {}
}))

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn()
}))

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn()
}))

describe('AdminPage.vue', () => {
  it('toont formulier en voegt een gebruiker toe wanneer het formulier wordt ingediend', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({
      user: { uid: 'test-uid' }
    })

    const wrapper = mount(AdminPage)

    // Zorg ervoor dat het formulier eerst niet zichtbaar is
    expect(wrapper.find('form').exists()).toBe(false)

    // Klik op de "Gebruiker Aanmaken"-knop om het formulier zichtbaar te maken
    await wrapper.find('.addUserButton').trigger('click')

    // Het formulier zou nu zichtbaar moeten zijn
    expect(wrapper.find('form').exists()).toBe(true)

    // Simuleer formulierinvoer
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser')
    await wrapper.find('input[placeholder="Enter email"]').setValue('test@example.com')
    await wrapper.find('input[placeholder="Enter BSN"]').setValue('123456789')
    await wrapper.find('input[placeholder="Enter afdeling"]').setValue('IT')
    await wrapper.find('select').setValue('Manager')

    // Wachtwoord genereren simuleren
    wrapper.vm.generatedPassword = 'Test@1234'

    // Formulier indienen
    await wrapper.find('form').trigger('submit.prevent')

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'Test@1234')
    expect(setDoc).toHaveBeenCalledWith(doc(db, 'users', 'test-uid'), {
      username: 'TestUser',
      email: 'test@example.com',
      date: expect.any(String),
      bsn: '123456789',
      wachtwoord: 'Test@1234',
      afdeling: 'IT',
      positie: 'Manager'
    })
  })

  it('toont een foutmelding bij een mislukte registratie', async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error('Registratie mislukt'))

    const wrapper = mount(AdminPage)

    // Klik op de "Gebruiker Aanmaken"-knop om het formulier zichtbaar te maken
    await wrapper.find('.addUserButton').trigger('click')

    // Simuleer formulierinvoer
    await wrapper.find('input[placeholder="Enter username"]').setValue('TestUser')
    await wrapper.find('input[placeholder="Enter email"]').setValue('test@example.com')
    wrapper.vm.generatedPassword = 'Test@1234'

    // Formulier indienen
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.showForm).toBe(true)
  })
})
