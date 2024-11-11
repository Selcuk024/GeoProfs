// tests/unit/SignUpForm.spec.js
import { mount } from '@vue/test-utils';
import SignUpForm from '../../src/components/SignUpForm.vue';
import { auth } from '../../src/firebase.js'; // Import Firebase auth to mock it

jest.mock('../../src/firebase.js'); // Mock Firebase

describe('SignUpForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SignUpForm);
  });

  it('should emit sign-up success event with valid credentials', async () => {
    // Mock successful signup
    auth.createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: { email: 'test@example.com' },
    });

    // Simulate user input
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check that the 'sign-up-success' event was emitted
    expect(wrapper.emitted('sign-up-success')).toBeTruthy();
    expect(wrapper.emitted('sign-up-success')[0]).toEqual(['test@example.com']);

    // Check that form inputs are cleared
    expect(wrapper.vm.email).toBe('');
    expect(wrapper.vm.password).toBe('');
  });

  it('should show an error message when sign-up fails', async () => {
    // Mock failed signup (invalid email or password)
    auth.createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Email already in use'));

    // Simulate user input
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#password').setValue('password123');

    // Trigger form submission
    await wrapper.find('form').trigger('submit.prevent');

    // Check if the error message is displayed
    expect(wrapper.text()).toContain('Email already in use');
  });
});
