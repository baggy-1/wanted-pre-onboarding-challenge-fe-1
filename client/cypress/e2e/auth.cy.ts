import { joinBaseUrl } from "cypress/support/utils";

describe("Todo App Test", () => {
  it("토큰 없이 메인 페이지 방문", () => {
    cy.visit("/");

    cy.url().should("eq", joinBaseUrl("/auth/login"));
  });

  it("로그인 성공 시, 메인 페이지로 이동", () => {
    cy.intercept("POST", "/users/login").as("postLogin");

    cy.visit("/auth/login");

    cy.get("input[placeholder=이메일]").type("qwe@qwe.qwe");
    cy.get("input[placeholder=비밀번호]").type("qweqweqwe");
    cy.get("button[type=submit]")
      .click()
      .then(() => cy.wait("@postLogin"));

    cy.url().should("eq", joinBaseUrl("/"));
  });
});

export {};
