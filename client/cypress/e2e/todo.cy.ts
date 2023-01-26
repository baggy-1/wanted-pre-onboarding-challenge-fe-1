import { joinBaseUrl } from "cypress/support/utils";

const createActions = (title: string, content: string) => {
  const createTitleContent = () => {
    cy.get("input[name=title]").clear().type(title);
    cy.get("input[name=content]").clear().type(content);
  };

  const createDialogOpen = () => {
    createTitleContent();
    cy.get("button").contains("Todo 추가").click();
  };

  createDialogOpen();
  cy.get("div[data-testid=backdrop]").click("right", { force: true });
  createDialogOpen();
  cy.get("button[data-testid=create-cancel]").click();
  createDialogOpen();

  cy.get("button[data-testid=create-submit]")
    .click()
    .then(() => cy.wait("@postTodos"))
    .then(() => cy.wait("@getTodos"))
    .then(() => cy.get("div").contains(title).should("exist"))
    .then(() => cy.get("div").contains(title).click());
};

const updateActions = (title: string, content: string) => {
  const updateTitleContent = () => {
    cy.get("input[name=updateTitle]").clear().type(title);
    cy.get("input[name=updateContent]").clear().type(content);
  };
  const updateDialogOpen = () => {
    cy.get("button").contains("수정").click();
    updateTitleContent();
    cy.get("button[type=button]").contains("저장").click();
  };

  // update dialog cancel
  updateDialogOpen();
  cy.get("div[data-testid=backdrop]").click("right", { force: true });
  updateDialogOpen();
  cy.get("button[data-testid=update-cancel]").click();
  updateDialogOpen();

  // update submit
  cy.get("button[data-testid=update-submit]")
    .click()
    .then(() => cy.wait("@putTodos"))
    .then(() => cy.wait("@getTodos"))
    .then(() => cy.get("div").contains(title).should("exist"));
};

const deleteActions = (title: string) => {
  const deleteDialogOpen = () => {
    cy.get("button").contains("삭제").click();
  };

  // delete dialog cancel
  deleteDialogOpen();
  cy.get("div[data-testid=backdrop]").click("right", { force: true });
  deleteDialogOpen();
  cy.get("button[data-testid=delete-cancel]").click();
  cy.get("button").contains("삭제").click();

  // delete submit
  cy.get("button[data-testid=delete-submit]")
    .click()
    .then(() => cy.wait("@deleteTodos"))
    .then(() => cy.url().should("eq", joinBaseUrl("/")))
    .then(() => cy.wait("@getTodos"))
    .then(() => cy.get("div").contains(title).should("not.exist"));
};

const todosIntercept = () => {
  cy.intercept("GET", "/todos").as("getTodos");
  cy.intercept("POST", "/todos").as("postTodos");
  cy.intercept("PUT", "/todos/*").as("putTodos");
  cy.intercept("DELETE", "/todos/*").as("deleteTodos");
};

describe("Todo 로직 테스트", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem("token", "super-secret-token");
      },
    });
  });

  it("Todo CRUD", () => {
    todosIntercept();

    const random = Math.random().toString(36).substring(2, 15);
    const randomTitle = `테스트 작성하기${random}`;
    const randomContent = `멋진 테스트 작성하기${random}`;
    const randomUpdateTitle = `테스트 업데이트${random}`;
    const randomUpdateContent = `멋진 테스트 업데이트${random}`;

    // create
    createActions(randomTitle, randomContent);

    // update
    updateActions(randomUpdateTitle, randomUpdateContent);

    // delete
    deleteActions(randomUpdateTitle);
  });

  it("새로고침 시, 데이터 정합성 테스트", () => {
    todosIntercept();

    const random = Math.random().toString(36).substring(2, 15);
    const randomTitle = `새로고침 테스트 작성하기${random}`;
    const randomContent = `새로고침 멋진 테스트 작성하기${random}`;
    const randomUpdateTitle = `새로고침 테스트 업데이트${random}`;
    const randomUpdateContent = `새로고침 멋진 테스트 업데이트${random}`;

    // read
    cy.visit("/");

    let todoListLength = 0;
    cy.get("div")
      .contains("Todo 목록")
      .next()
      .children()
      .each((_) => todoListLength++)
      .then(() => {
        console.log(todoListLength);

        cy.reload();

        cy.get("div")
          .contains("Todo 목록")
          .next()
          .children()
          .should("have.length", todoListLength);

        // create
        createActions(randomTitle, randomContent);

        cy.reload();

        cy.get("div")
          .contains("Todo 목록")
          .next()
          .children()
          .should("have.length", todoListLength + 1);
        cy.get("div").contains(randomTitle).should("exist");

        // update
        updateActions(randomUpdateTitle, randomUpdateContent);

        cy.reload();

        cy.get("div")
          .contains("Todo 목록")
          .next()
          .children()
          .should("have.length", todoListLength + 1);
        cy.get("div").contains(randomUpdateTitle).should("exist");

        // delete
        deleteActions(randomUpdateTitle);

        cy.reload();

        cy.get("div")
          .contains("Todo 목록")
          .next()
          .children()
          .should("have.length", todoListLength);
        cy.get("div").contains(randomUpdateTitle).should("not.exist");
      });
  });
});

export {};
