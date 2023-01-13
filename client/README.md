# 🔒 로그인 기능이 있는 Todo App

<details>
<summary>🪓 1️회차 리팩토링</summary>

## 폴더 구조

```shell
- src
-- api -> api 관련 (axios instance, interceptors 등)
-- components -> pages에서 바로 사용가능한 컴포넌트들
-- const -> 한 번 선언하면 바뀌기 어려운 값들
-- hooks -> 컴포넌트 내부에서 작성하기에 눈에 거슬리는 것들
-- pages -> 사용자가 마주하는 페이지, provider 제외, 상태 로직 없음
-- provider -> 공유하고자 하는 상태 provider들
-- types -> 두 번 이상 사용하는 type들
-- util -> 재사용하고자 하는 간단한 함수들
```

## hook

변경 전 useFetch

```typescript
// url, config로 axios.get에 넣어줬음
// data<T>를 받는데에는 문제없지만 한 화면에서 refetch가 안되어서 refetch 상태를 만들고 true면 한 번 더 fetch 하는 형식으로 구현했음
// 따라서, 한 데이터를 refetch 하려면 해당 hook의 setRefetch를 사용해야 해서 구조가 복잡해짐
const useFetch = <T>(url: string, config: {}) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const {
          data: { data },
        }: { data: { data: T } } = await axios.get(url, config);

        setData(data);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
        setReFetch(false);
      }
    })();
  }, [url, reFetch]);

  return { data, isLoading, isError, setReFetch };
};

export default useFetch;
```

변경 후 useFetch -> useQuery ~~react-query 보고 이름 바꿈~~

```typescript
// onSuccess와 onError, onFinally를 받아서 외부에서 작성 할 수 있게 함
interface Options<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

// useEffect에 적으니 뭔가 맘에 안들어서 따로 뺌
// authInstance는 이 Todo App에서는 데이터를 받으려면 필수적이여서 고정시킴
// authInstance: baseUrl, token 없으면 에러내는 interceptors 적용
const getData = async <T>(url: string) => {
  return await authInstance.get<T>(url);
};

// refetch 문제는 useReducer, useContext로 해결하기로 함
const useQuery = <T>(
  url: string,
  { onSuccess, onError, onFinally }: Options<T> = {} // 구조분해 할당을 위해 값 대입
) => {
  const [data, setData] = useState<T>();
  const [isError, setisError] = useState(false);

  useEffect(() => {
    getData<T>(url)
      .then(({ data }) => {
        setData(data);
        onSuccess?.(data);
      })
      .catch((error) => {
        console.error(error);
        setisError(true);
        onError?.(error);
      })
      .finally(() => {
        onFinally?.();
      });
  }, []);

  return {
    data,
    isLoading: !isError && !data,
    isError,
  };
};

export default useQuery;
```

사용 방식

```typescript
// TodoList.tsx
const TodoList = () => {
  const { todos } = useTodosState(); // provider로 받은 todos
  const dispatch = useTodosDispatch(); // provider로 받은 dispatch
  const { isLoading, isError } = useQuery<TodosResponse>(API_PATH.TODO, {
    onSuccess: ({ data: todos }) => {
      dispatch({ type: "SET_TODOS", payload: { todos } });
    }, // todos 데이터를 성공적으로 받으면 dispatch 실행
  });
};
```

useMutation
기존 useCreateTodo, useUpdateTodo ... 등을 만들다가 아무리 생각해도 이건 적절한 방법이 아닌 것 같아서 만들어 봄

```typescript
type Method = "POST" | "PUT" | "DELETE"; // post, put, delete 만 사용

interface mutateParams<T> {
  // useQuery와 마찬가지로 onSuccess시 반환 타입을 받아서 줌
  url: string;
  method: Lowercase<Method>;
  body?: unknown;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
}

const useMutation = (instance?: AxiosInstance) => {
  // token이 없어도 되는 경우(login..)에도 사용할 수 있게 instance를 받아서 사용함
  const _instance = instance || axios.create();

  const mutate = async <T>({
    url,
    method,
    body,
    onSuccess,
    onError,
    onFinally,
  }: mutateParams<T>) => {
    try {
      const { data } = await _instance<T>({
        method,
        data: body,
        url,
      });
      onSuccess?.(data);
    } catch (error) {
      console.error(error);
      onError?.(error);
    } finally {
      onFinally?.();
    }
  };

  return { mutate };
};

export default useMutation;
```

사용 방식

```typescript
// TodoList.tsx
const TodoList = () => {
  // ...

  const onClickDeleteTodo = (id: string) => async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    mutate({
      url: join(API_PATH.TODO, "/", id),
      method: "delete",
      onSuccess: () => {
        // 성공 시, 무엇을 할지만 작성
        dispatch({ type: "DELETE_TODO", payload: { id } });
        navigate(PAGE_PATH.HOME, { replace: true });
      },
    });
  };

  // ...
};
```

변경 전 useInput, useInputWithValid

```typescript
const useInput = (initValue: string) => {
  const [value, setValue] = useState(initValue);
  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  return { value, onChange, setValue };
};

export default useInput;
```

```typescript
const useInputWithValid = (initValue: string, type: ValueType) => {
  const [value, setValue] = useState(initValue);
  const [isValidValue, setIsValidValue] = useState(false);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
    setIsValidValue(isValid(value, type));
  };

  return { value, onChange, isValid: isValidValue };
};

export default useInputWithValid;
```

변경 후 useInput

```typescript
// useInputWithValid를 제거하고 isValid로 선택적으로 검증함
interface Props {
  initValue?: string;
  isValid?: (value: string) => boolean; // 값을 인자로 받아서 처리 함
}

const useInput = ({ initValue = "", isValid }: Props = {}) => {
  const [value, setValue] = useState(initValue);
  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  // 해당 return은 좀 더 고민을 해봐야 될 것 같음
  // props와 others로 나눈 이유는 input element에 ...연산자로 바로 넣기 위해서임
  return {
    props: { value, onChange },
    others: { setValue, isValid: isValid?.(value) }, //isValid를 내부 값으로 처리 후 return
  };
};

export default useInput;
```

사용 방식

```typescript
// SignupForm.tsx
const SignupForm = () => {
  const {
    others: { isValid: isValidPassword },
    props: passwordProps,
  } = useInput({
    isValid: (value) => REGEXP.PASSWORD.test(value),
  });
  const {
    others: { isValid: isValidPasswordCheck },
    props: passwordCheckProps,
  } = useInput({
    isValid: (value) => passwordProps.value === value,
  });

  // ...
  return (
    // ...
        <Form.Notice>
          {!isValidPasswordCheck && passwordCheckProps.value !== ""
            ? "비밀번호를 확인해주세요."
            : ""}
        </Form.Notice>
        <Form.Button
          type="submit"
          disabled={!isValidEmail || !isValidPassword || !isValidPasswordCheck}
        >
          회원가입
        </Form.Button>
        // ...
  )

  export default SignupForm;
};
```

## components

변경 전 AuthFormBox.tsx, AuthForm.tsx (로그인, 회원가입 컴포넌트)

```typescript
// AuthFormBox.tsx

interface Props {
  type: "LOGIN" | "SIGNUP";
}

const AuthFormBox = ({ type }: Props) => {
  const { text, value, link } = AUTH_FORM_BOX_LINK_FOR_TYPE[type]; // 상수들을 한 곳에 박아놨음

  // 도대체 뭘 의미하는지 모르겠는 코드
  return (
    <div className={styles.box}>
      <AuthForm type={type} />
      <CenterBox>
        <span>{text}</span>
        <Link to={link}>{value}</Link>
      </CenterBox>
    </div>
  );
};

export default AuthFormBox;
```

```typescript
// AuthForm.tsx

// AuthFormBox에서 type을 받아서 login, signup form을 만듦
const AuthForm = ({ type }: Props) => {
  const navigate = useNavigate();
  const {
    value: email,
    onChange: onChangeEmail,
    isValid: isValidEmail,
  } = useInputWithValid("", "EMAIL"); // "EMAIL" 타입을 주면 내부에서 검증해서 보내 줌 -> 외부에서는 컨트롤 불가
  const {
    value: password,
    onChange: onChangePassword,
    isValid: isValidPassword,
  } = useInputWithValid("", "PASSWORD"); // 마찬가지

  // 로그인 또는 회원가입 정보를 서버에 제출하는 함수
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 괜히 복잡해 보이고 난잡한 코드
    try {
      const body = {
        email,
        password,
      };
      const {
        data: { token },
      }: {
        [key: string]: unknown;
        data: AuthResponse;
      } = await axios.post(AUTH_TYPE[type].api, body);
      localStorage.setItem("token", token);
      navigate(PAGE_PATH.HOME);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          alert(error.response.data.details);
          return;
        }
        if (error.response?.status === 400) {
          alert(error.response.data.details);
          return;
        }
      }
      console.error(error);
    }
  };

  // 이미 token이 있다면 home으로
  useEffect(() => {
    if (getLocalStorageItem("token")) {
      navigate(PAGE_PATH.HOME);
    }
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="최소 '@', '.'를 포함해야 합니다"
          />
        </div>
        <div className={styles.inputBox}>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호는 8자 이상입니다"
          />
        </div>
        <button
          className={styles.button}
          type="submit"
          disabled={!(isValidEmail && isValidPassword)}
        >
          {AUTH_TYPE[type].text}
        </button>
      </form>
    </>
  );
};

export default AuthForm;
```

변경 후 AuthForm -> LoginForm, SignupForm 분리, AuthFormBox 제거

```typescript
// SignupForm.tsx

// 분리의 이유: 만약 회원가입 form에만 추가해야하는 input이 있다면? 을 상상해봤더니 어질어질해서 바로 분리했음
const SignupForm = () => {
  const navigate = useNavigate();
  const {
    others: { isValid: isValidEmail },
    props: emailProps,
  } = useInput({
    isValid: (value) => REGEXP.EMAIL.test(value), // isValid 체크를 외부에서 결정함
  });
  const {
    others: { isValid: isValidPassword },
    props: passwordProps,
  } = useInput({
    isValid: (value) => REGEXP.PASSWORD.test(value),
  });
  const {
    others: { isValid: isValidPasswordCheck },
    props: passwordCheckProps,
  } = useInput({
    isValid: (value) => passwordProps.value === value, // 리팩토링 한 useInput 덕분에 꼭 정규식이 아니어도 isValid 확인 가능
  });
  const { mutate } = useMutation(); // 토큰이 필요없어서 기본 axios.instance 사용

  // 회원가입 정보를 서버에 제출하는 함수
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate<AuthResponse>({
      url: API_URL.SIGNUP, // 어디에
      method: "post", // 어떤 동작을
      body: {
        // 어떤 정보를
        email: emailProps.value,
        password: passwordProps.value,
      },
      // 성공하면
      onSuccess: ({ token }) => {
        setAuthToken(token); // 토큰 저장
        navigate(PAGE_PATH.HOME); // home으로 이동
      },
      // 실패하면
      onError: (error) => {
        if (!(error instanceof AxiosError)) {
          console.error(error);
          return;
        }
        switch (error.response?.status) {
          // 미리 알고 있는 error code 처리
          case 409:
          case 400:
            alert(error.response.data.details);
            break;
          default:
            console.error(error);
        }
      },
    });
  };

  // return문에서 notice 조건 처리가 어지러워서 객체로 처리
  const isShowNotice = {
    email: !isValidEmail && emailProps.value !== "",
    password: !isValidPassword && passwordProps.value !== "",
    passwordCheck: !isValidPasswordCheck && passwordCheckProps.value !== "",
  };

  // 토큰이 있다면 home으로
  useEffect(() => {
    if (getAuthToken()) {
      navigate(PAGE_PATH.HOME);
    }
  }, []);

  // 각 input별 notice 추가
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[20rem] h-auto p-8 border rounded-lg gap-4 shadow-xl">
      <Form onSubmit={onSubmit}>
        <Form.Input type="email" label="이메일" {...emailProps} />
        <Form.Notice>
          {isShowNotice.email ? "이메일 형식에 맞춰주세요." : ""}
        </Form.Notice>
        <Form.Input type="password" label="비밀번호" {...passwordProps} />
        <Form.Notice>
          {isShowNotice.password ? "비밀번호는 8자 이상입니다." : ""}
        </Form.Notice>
        <Form.Input
          type="password"
          label="비밀번호 확인"
          {...passwordCheckProps}
        />
        <Form.Notice>
          {isShowNotice.passwordCheck ? "비밀번호를 확인해주세요." : ""}
        </Form.Notice>
        <Form.Button
          type="submit"
          disabled={!isValidEmail || !isValidPassword || !isValidPasswordCheck}
        >
          회원가입
        </Form.Button>
      </Form>
      <span>이미 가입하셨나요?</span>
      <Link to={PAGE_PATH.LOGIN}>로그인</Link>
    </div>
  );
};

export default SignupForm;
```

SignupForm과 비슷하지만 분명히 다른 UI와 로직

```typescript
// LoginForm.tsx

const LoginForm = () => {
  const navigate = useNavigate();
  const { props: emailProps } = useInput(); // 로그인은 입력 값 검증을 하지 않음
  const { props: passwordProps } = useInput();
  const { mutate } = useMutation();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate<AuthResponse>({
      url: API_URL.LOGIN,
      method: "post",
      body: {
        email: emailProps.value,
        password: passwordProps.value,
      },
      onSuccess: ({ token }) => {
        setAuthToken(token);
        navigate(PAGE_PATH.HOME);
      },
      onError: (error) => {
        if (!(error instanceof AxiosError)) {
          console.error(error);
          return;
        }
        switch (error.response?.status) {
          case 409:
          case 400:
            alert(error.response.data.details);
            break;
          default:
            console.error(error);
        }
      },
    });
  };

  useEffect(() => {
    if (getAuthToken()) {
      navigate(PAGE_PATH.HOME);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[20rem] h-auto p-8 border rounded-lg gap-4 shadow-xl">
      <Form onSubmit={onSubmit}>
        <Form.Input type="email" label="이메일" {...emailProps} />
        <Form.Input type="password" label="비밀번호" {...passwordProps} />
        <Form.Button type="submit">로그인</Form.Button>
      </Form>
      <span>처음이신가요?</span>
      <Link to={PAGE_PATH.SIGNUP}>회원가입</Link>
    </div>
  );
};

export default LoginForm;
```

</details>

<details>
<summary>🪓 2회차 리팩토링</summary>

## 폴더구조

```shell
└── src
    ├── components
    │    ├── common -> 특정 view에 종속되지 않는 UI 컴포넌트
    │    │   └── hooks -> 컴포넌트에 필요한 hooks
    │    └── views -> 특정 view에 적용되는 컴포넌트
    │        └── [view]
    │            ├── hooks
    │            └── [component] -> view 컴포넌트에 필요한 컴포넌트
    ├── constants -> 공통 상수(ex. token)
    ├── pages
    │    └── [page] -> view를 불러오고 배치하는 페이지 단위
    │        ├── index.tsx
    │        └── [dynamic].tsx -> 동적 라우트 페이지
    ├── provider -> 공유하고자 하는 상태 provider들
    ├── services -> 서비스 관련
    │    ├── @api -> instance 생성 관련
    │    └── [service]
    │        └── index.ts -> 서비스의 api 호출 정의
    ├── types
    │    ├── common.ts -> 공통 타입
    │    └── [service].ts -> 서비스 별 타입
    └── util
        ├── hooks
        │    └── index.ts -> 유틸리티 훅
        └── [util].ts -> 유틸리티 함수

```

</details>
