import { joinBaseUrl } from "cypress/support/utils";

describe("Todo 로직 테스트", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "super-secret-token");
      },
    });
  });

  it("Todo CRUD", () => {
    cy.intercept("GET", "/todos").as("getTodos");
    cy.intercept("POST", "/todos").as("postTodos");
    cy.intercept("PUT", "/todos/*").as("putTodos");
    cy.intercept("DELETE", "/todos/*").as("deleteTodos");

    // create
    cy.get("input[name=title]").type("테스트 작성하기");
    cy.get("input[name=content]").type("멋진 테스트 작성하기");
    cy.get("button[type=submit]")
      .click()
      .then(() => cy.wait("@postTodos"))
      .then(() => cy.wait("@getTodos"))
      .then(() => cy.get("div").contains("테스트 작성하기").should("exist"))
      .then(() => cy.get("div").contains("테스트 작성하기").click());

    // update
    cy.get("button").contains("수정").click();
    cy.get("input[name=updateTitle]").clear().type("테스트 업데이트");
    cy.get("input[name=updateContent]").clear().type("멋진 테스트 업데이트");
    cy.get("button[type=submit]")
      .contains("저장")
      .click()
      .then(() => cy.wait("@putTodos"))
      .then(() => cy.wait("@getTodos"))
      .then(() => cy.get("div").contains("테스트 업데이트").should("exist"));

    // delete
    cy.get("button")
      .contains("삭제")
      .click()
      .then(() => cy.wait("@deleteTodos"))
      .then(() => cy.url().should("eq", joinBaseUrl("/")))
      .then(() => cy.wait("@getTodos"))
      .then(() =>
        cy.get("div").contains("테스트 업데이트").should("not.exist")
      );
  });

  it("새로고침 시, 데이터 정합성 테스트", () => {
    cy.intercept("GET", "/todos").as("getTodos");
    cy.intercept("POST", "/todos").as("postTodos");
    cy.intercept("PUT", "/todos/*").as("putTodos");
    cy.intercept("DELETE", "/todos/*").as("deleteTodos");

    // read
    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .should("have.length", 4);

    cy.reload();

    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .should("have.length", 4);

    // create
    cy.get("input[name=title]").type("새로고침 테스트 작성하기");
    cy.get("input[name=content]").type("멋진 새로고침 테스트 작성하기");
    cy.get("button[type=submit]")
      .click()
      .then(() => cy.wait("@postTodos"))
      .then(() => cy.wait("@getTodos"))
      .then(() =>
        cy.get("div").contains("새로고침 테스트 작성하기").should("exist")
      )
      .then(() => cy.get("div").contains("새로고침 테스트 작성하기").click());

    cy.reload();

    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .should("have.length", 5);
    cy.get("div").contains("새로고침 테스트 작성하기").should("exist");

    // update
    cy.get("button").contains("수정").click();
    cy.get("input[name=updateTitle]").clear().type("새로고침 테스트 업데이트");
    cy.get("input[name=updateContent]")
      .clear()
      .type("멋진 새로고침 테스트 업데이트");
    cy.get("button[type=submit]")
      .contains("저장")
      .click()
      .then(() => cy.wait("@putTodos"))
      .then(() => cy.wait("@getTodos"))
      .then(() =>
        cy.get("div").contains("새로고침 테스트 업데이트").should("exist")
      );

    cy.reload();

    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .should("have.length", 5);
    cy.get("div").contains("새로고침 테스트 업데이트").should("exist");

    // delete
    cy.get("button")
      .contains("삭제")
      .click()
      .then(() => cy.wait("@deleteTodos"))
      .then(() => cy.url().should("eq", joinBaseUrl("/")))
      .then(() => cy.wait("@getTodos"))
      .then(() =>
        cy.get("div").contains("새로고침 테스트 업데이트").should("not.exist")
      );

    cy.reload();

    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .should("have.length", 4);
    cy.get("div").contains("새로고침 테스트 업데이트").should("not.exist");
  });
});

export {};
