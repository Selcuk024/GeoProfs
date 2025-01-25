import { mount } from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { signOut, getAuth } from 'firebase/auth';

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn().mockReturnValue({}),
  signOut: vi.fn(),
}));

vi.spyOn(console, 'error').mockImplementation(() => {});

describe('HeaderComponent.vue', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(HeaderComponent);

    expect(wrapper.exists()).toBe(true);

    const logo = wrapper.find('.logo');
    expect(logo.exists()).toBe(true);
    const profileIcon = wrapper.find('.profile-icon');
    expect(profileIcon.exists()).toBe(true);
  });

  it('calls logout method when logout button is clicked', async () => {
    const wrapper = mount(HeaderComponent);

    const logoutButton = wrapper.find('.logout-text');
    await logoutButton.trigger('click');

    expect(signOut).toHaveBeenCalled();

    expect(wrapper.emitted()['logout-success']).toBeTruthy();
  });

  it('handles logout error gracefully', async () => {
    signOut.mockRejectedValueOnce(new Error('Logout failed'));

    const wrapper = mount(HeaderComponent);

    const logoutButton = wrapper.find('.logout-text');
    await logoutButton.trigger('click');

    expect(console.error).toHaveBeenCalledWith('Error during logout:', expect.any(Error));
  });
});
