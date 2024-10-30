import { mount } from "@vue/test-utils";
import LoginPage from "@/components/LoginPage.vue";

describe("LoginPage.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginPage);
  });

  it("moet succesvol inloggen met correcte gebruikersnaam en wachtwoord", async () => {
    // Simuleer invoer voor gebruikersnaam en wachtwoord
    await wrapper.find("#username").setValue("admin");
    await wrapper.find("#password").setValue("password123");

    // Klik op de login-knop
    await wrapper.find("form").trigger("submit.prevent");

    // Controleer of het `login-success` event is uitgezonden
    expect(wrapper.emitted("login-success")).toBeTruthy();
  });

  it("moet een foutmelding tonen met onjuiste inloggegevens", async () => {
    // Simuleer onjuiste invoer voor gebruikersnaam en wachtwoord
    await wrapper.find("#username").setValue("wrongUser");
    await wrapper.find("#password").setValue("wrongPassword");

    // Klik op de login-knop
    await wrapper.find("form").trigger("submit.prevent");

    // Controleer of er een foutmelding wordt weergegeven
    expect(wrapper.text()).toContain("Invalid username or password.");
  });
});
