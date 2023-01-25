# 🔒 로그인 기능이 있는 Todo App

# 목차

- [최종 구현](#최종-구현)
  - [로그인 / 회원가입 페이지](#로그인--회원가입-페이지)
  - [로그인 / 로그아웃](#로그인--로그아웃)
  - [메인 페이지](#메인-페이지)
  - [Todo 기능](#todo-기능)
    - [생성](#생성)
    - [수정](#수정)
    - [삭제](#삭제)
- [설치 및 실행 방법](#설치-및-실행-방법)
  - [client](#client)
  - [server](#server)
- [구현 요구 사항](#구현-요구-사항)
  - [Login / SignUp](#login--signup)
  - [Todo List](#todo-list)
- [사용 라이브러리](#사용-라이브러리)
- [폴더 구조](#폴더-구조)
- [고민한 점](#고민한-점)
- [한계점 및 개선 사항](#한계점-및-개선-사항)

# 최종 구현

## 로그인 / 회원가입 페이지

![login_signup_page](https://user-images.githubusercontent.com/84620459/214481319-51bf6367-e1b7-4f16-aef1-b6cec75e5e2e.gif)

## 로그인 / 로그아웃

![login_logout](https://user-images.githubusercontent.com/84620459/214481317-496b133f-846c-4db9-9b9b-c933c1c486ef.gif)

## 메인 페이지

![main_page](https://user-images.githubusercontent.com/84620459/214481321-46059cc4-3244-4c63-b6f3-0b7b6ed9a449.gif)

## Todo 기능

### 생성

![create_todo](https://user-images.githubusercontent.com/84620459/214481309-33fb28bd-ddb3-45ac-acbb-c9b767226152.gif)

### 수정

![update_todo](https://user-images.githubusercontent.com/84620459/214481324-bc1044a4-c026-4512-b105-652942d40693.gif)

### 삭제

![delete_todo](https://user-images.githubusercontent.com/84620459/214481316-bf73077b-f8dc-4ec2-bb5d-e41ef0e352e8.gif)

# 설치 및 실행 방법

## client

```shell
npm i

npm run dev
```

## [server](https://github.com/chigomuh/wanted-pre-onboarding-challenge-fe-1-api)

```shell
npm i

npm start # http://localhost:8080
```

# 구현 요구 사항

## Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [x] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

# 사용 라이브러리

- create-vite

  - create-react-app(CRA)보다 빠르고 가볍기 때문에 선택함

- @tanstack/react-query ^4.22.0

  - 컴포넌트 내부에서 서버와 클라이언트 상태를 분리하기 위해 선택함
  - 분리된 컴포넌트 간, 비동기 상태를 일치 시키기 위해 사용함

- axios ^1.2.1

  - api 호출 전후 등 서비스 별 설정들을 관리하기 위해 사용함

- cypress ^12.3.0

  - 리팩토링 시, 기존 기능의 동작을 자동으로 확인하는 e2e 테스트를 위해 사용함

- tailwindcss ^3.2.4

  - css 파일을 별도로 분리하지 않고 빠르고 동일한 스타일을 사용하기 위해 사용함

- typescript ^4.9.3
  - 런타임 오류를 개발 시점에 발견하고 타입 추론을 활용한 개발 속도 향상을 위해 사용함

# 폴더 구조

```shell
src
├── components
│   ├── common
│   │   ├── Form
│   │   ├── Layout
│   │   │   └── Nav
│   │   ├── SuspenseErrorBoundary
│   │   │   └── ErrorBoundary
│   │   └── TodoItem
│   └── views
│       ├── Login
│       ├── SignUp
│       ├── TodoDetail
│       │   └── hooks
│       └── Todos
│           ├── TodoForm
│           │   └── hooks
│           └── TodoList
├── constants
├── pages
│   ├── auth
│   │   ├── login
│   │   └── signup
│   ├── home
│   └── todos
├── providers
│   └── auth
├── services
│   ├── api
│   ├── auth
│   └── todos
├── types
└── utils
    └── hooks
```

# 고민한 점

## 어떻게 관심사를 분리할 것인가?

- 기존에는 컴포넌트 내부에서 form과 같은 사용자 로직과 api를 호출하고 처리하는 로직이 동시에 작성되어 난잡하고 어디서 어떤 흐름으로 데이터가 흘러가는지 추적하기 힘듦
- react-query를 도입하고 컴포넌트 내부에서 작성하던 api와 관련된 서비스 로직들을 react-query에서 가져가고 필요한 동작들만 내부에서 작성하게 됨으로써, 관심사를 분리할 수 있게 됨
- 하지만 비즈니스 로직과 사용자 로직에서만 관심사의 분리가 필요한 것이 아니라 각각의 로직에서도 관심사의 분리가 필요함
- 어느 부분까지 관심사를 분리할 것인지 기준이 명확히 정의되어야 함
- 이것은 경험이 쌓이면 자연스럽게 터득할 것으로 기대됨

## 테스트가 꼭 필요한 것인가?

- 초기에 코드 퀄리티와 상관없이 요구사항에 대한 기능을 동작가능하게만 구현한 후 마무리 했었음
- 이후, 코드 퀄리티를 향상 시키기 위해 리팩토링을 진행함
- 여러번 리팩토링을 진행할 때, 기존 기능의 작동 여부를 확인하는 작업이 반복 됨
- 따라서, e2e 테스트(cypress)를 활용하여 자동으로 기존 동작에 오류가 없는 지, 확인하고 리팩토링을 수행할 수 있게 됨
- 단위 테스트, 통합 테스트 등은 아직 필요성을 느끼지 못하여 도입하지 않음

## 폴더 구조를 어떻게 잡아야 할까?

- 기존에도 page, const, component, hook 등으로 폴더를 동일하게 구성했지만, 막상 해당 폴더에 들어가면 마구잡이 식으로 폴더 내부가 작성되어 있었음
- 따라서 폴더에 대한 명확한 기준과 폴더 내부에 작성할 파일들의 공통 규칙이 필요함을 느꼈음
- components를 common과 views로 분리하고 기존 hooks로 관리하던 hook에는 공통으로 사용가능한 hook들을 배치하고 component에서 사용하는 custom hook들은 각 component 폴더 내부로 옮겨 최대한 가깝게 배치하였음

## UI가 비슷하다고 해서 컴포넌트는 재사용 하는 것이 맞는가?

- 로그인 / 회원가입 페이지는 로그인, 회원가입 form만 보여주고 box하단에 각 페이지를 link하는 텍스트만 존재함
- 기존에는 비슷한 UI를 사용하기에 하나의 AuthForm을 통해 views를 type으로 분기하여 로그인 / 회원가입 페이지를 구성하였음
- 하지만 회원가입에는 비밀번호 확인, 사용자에게 조건 등을 알려주는 공지와 같이 로그인 페이지와는 다른 요구사항이 생겼음
- 계속해서 분기 처리 된 코드로 유지할 수 있지만, UI가 같다고 해서 같은 컴포넌트를 재사용하는 것이 아니라는 결론을 내림
- 따라서, LoginForm / SignupForm으로 AuthForm을 분리시켰음
- 로그인 페이지와 회원가입 페이지에 대한 요구사항이 많지 않고 변경이 많지 않을 수도 있지만 분리하여 관리하면 좋을 것이라고 판단함

# 한계점 및 개선 사항

## window.alert과 confirm을 사용함

- 브라우저의 작동을 멈추고 사용자의 응답을 받기에 사용성에 좋지 않음
- 따라서, 커스텀 alert과 confirm을 구현할 예정임

## 배포가 되어있지 않음

- client는 배포가 가능하나 server 배포에 대해 알아보고 추후 배포 예정임

## git과 github를 적절히 사용하지 않음

- pr과 commit, issue 등을 적절히 사용하면 project의 history를 한 눈에 확인할 수 있음
- 하지만 익숙하지 않아 제대로 활용하지 않음
- 추후, 계속해서 사용해봄으로써 보완할 예정
