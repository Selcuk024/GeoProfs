import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginPage from '@/components/LoginPage.vue';

// Mock firebase/auth
vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({
      app: {},
    })),
    signInWithEmailAndPassword: vi.fn((auth, email, password) => {
      if (email === 'admin@gmail.com' && password === 'DxjBWPkfXXVQ') {
        return Promise.resolve({
          user: { email },
        });
      } else {
        return Promise.reject(new Error('Invalid credentials'));
      }
    }),
  };
});

describe('LoginPage Integration Test', () => {
  it('logs in successfully with correct credentials', async () => {
    const wrapper = mount(LoginPage);

    wrapper.setData({ email: 'admin@gmail.com', password: 'DxjBWPkfXXVQ' });
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('login-success')).toBeTruthy();
    expect(wrapper.emitted('login-success')[0][0]).toEqual({ email: 'admin@gmail.com' });
  });

});
