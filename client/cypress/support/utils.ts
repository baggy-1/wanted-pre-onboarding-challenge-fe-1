export const joinBaseUrl = (...args: string[]) => {
  return [Cypress.config().baseUrl, ...args].join("");
};
