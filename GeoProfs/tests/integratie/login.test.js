import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import LoginPage from '@/components/LoginPage.vue';
import { getDocs } from 'firebase/firestore'; // Zorg ervoor dat dit correct wordt gemockt

// Mock firebase/auth
vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({
      app: {},
    })),
    signInWithEmailAndPassword: vi.fn((auth, email, password) => {
      if (!email || !password) {
        return Promise.reject(new Error('Login failed. Please try again.'));
      }
      if (email === 'admin@gmail.com' && password === 'DxjBWPkfXXVQ') {
        return Promise.resolve({ user: { email } });
      }
      return Promise.reject(new Error('Invalid credentials'));
    }),
  };
});

// Mock firebase/firestore
vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    getDocs: vi.fn(async () => ({
      empty: true,
      docs: [],
    })),
    deleteField: vi.fn(),
    updateDoc: vi.fn(),
    getFirestore: vi.fn(() => ({})),
  };
});

describe('LoginPage Unit Tests', () => {
  it('displays error message on login failure', async () => {
    const wrapper = mount(LoginPage);

    wrapper.setData({ email: 'wrong@gmail.com', password: 'wrongpassword' });
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errorMessage).toBe('Invalid credentials');
    expect(wrapper.find('.error').text()).toBe('Invalid credentials');
  });

  it('calls loginWithDatabase if login fails', async () => {
    const wrapper = mount(LoginPage);
    const loginWithDatabaseMock = vi.spyOn(wrapper.vm, 'loginWithDatabase');

    wrapper.setData({ email: 'dbuser@gmail.com', password: 'password123' });
    await wrapper.find('form').trigger('submit.prevent');

    expect(loginWithDatabaseMock).toHaveBeenCalledWith('dbuser@gmail.com', 'password123');
  });

  it('handles empty email and password fields', async () => {
    const wrapper = mount(LoginPage);

    wrapper.setData({ email: '', password: '' });
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.errorMessage).toBe('Login failed. Please try again.');
    expect(wrapper.find('.error').exists()).toBe(true);
  });

  it('loginWithDatabase fails when user not found', async () => {
    vi.mocked(getDocs).mockResolvedValueOnce({ empty: true, docs: [] });

    const wrapper = mount(LoginPage);
    const result = await wrapper.vm.loginWithDatabase('nonexistentuser', 'password123');
    expect(result).toBe(false);
  });

  it('loginWithDatabase fails with incorrect password', async () => {
    vi.mocked(getDocs).mockResolvedValueOnce({
      empty: false,
      docs: [{ data: () => ({ password: 'wrongpassword' }), ref: {} }],
    });

    const wrapper = mount(LoginPage);
    const result = await wrapper.vm.loginWithDatabase('user@gmail.com', 'password123');
    expect(result).toBe(false);
  });

  it('loginWithDatabase succeeds with correct password', async () => {
    vi.mocked(getDocs).mockResolvedValueOnce({
      empty: false,
      docs: [{ data: () => ({ password: 'password123' }), ref: {} }],
    });

    const wrapper = mount(LoginPage);
    const result = await wrapper.vm.loginWithDatabase('user@gmail.com', 'password123');
    expect(result).toBe(true);
  });
});
