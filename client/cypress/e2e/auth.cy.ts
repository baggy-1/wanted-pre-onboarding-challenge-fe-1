import { joinBaseUrl } from "cypress/support/utils";

describe("토큰 및 사용자 요청 처리 이후 페이지 이동", () => {
  it("토큰 없이 메인 페이지 방문", () => {
    cy.visit("/");

    cy.url().should("eq", joinBaseUrl("/auth/login"));
  });

  it("로그인 성공 시, 메인 페이지 이동", () => {
    cy.intercept("POST", "/users/login").as("postLogin");

    cy.visit("/auth/login");

    cy.get("input[name=email]").type(Cypress.env().AUTH_ADMIN.email);
    cy.get("input[name=password]").type(Cypress.env().AUTH_ADMIN.password);
    cy.get("button[type=submit]")
      .click()
      .then(() => cy.wait("@postLogin"));

    cy.url().should("eq", joinBaseUrl("/"));
  });

  it("토큰이 없다면 로그인 페이지 이동", () => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.removeItem("token");
      },
    });

    cy.url().should("eq", joinBaseUrl("/auth/login"));
  });

  it("토큰이 있다면 메인 페이지 이동", () => {
    cy.visit("/auth/login", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "super-secret-token");
      },
    });

    cy.url().should("eq", joinBaseUrl("/"));
  });
});

describe("회원가입 폼에서 입력 값 유효성에 따른 버튼 활성화 여부", () => {
  it("이메일이 유효하지 않은 경우", () => {
    cy.visit("/auth/signup");

    cy.get("input[name=email]").type("유효하지 않은 이메일");
    cy.get("input[name=password]").type("password");
    cy.get("input[name=passwordCheck]").type("password");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("비밀번호가 유효하지 않은 경우", () => {
    cy.visit("/auth/signup");

    cy.get("input[name=email]").type("great@email.net");
    cy.get("input[name=password]").type("noPw");
    cy.get("input[name=passwordCheck]").type("noPw");
    cy.get("button[type=submit]").should("be.disabled");
  });

  it("모두 유효한 경우", () => {
    cy.visit("/auth/signup");

    cy.get("input[name=email]").type(Cypress.env().AUTH_ADMIN.email);
    cy.get("input[name=password]").type(Cypress.env().AUTH_ADMIN.password);
    cy.get("input[name=passwordCheck]").type(Cypress.env().AUTH_ADMIN.password);
    cy.get("button[type=submit]").should("be.enabled");
  });
});

export {};
