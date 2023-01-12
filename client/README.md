# 🔒 로그인 기능이 있는 Todo App

# 🪓 1️회차 리팩토링

## 폴더 구조

```shell
- src
-- api -> api 관련 (axios instance, interceptors 등)
-- components -> pages에서 바로 사용가능한 컴포넌트들
-- const -> 한 번 선언하면 바뀌기 어려운 값들
-- hooks -> 컴포넌트 내부에서 작성하기에 눈에 거슬리는 것들
-- pages -> 사용자가 마주하는 페이지
-- provider -> 공유하고자 하는 상태 provider들
-- types -> 두 번 이상 사용하는 type들
-- util -> 재사용하고자 하는 간단한 함수들
```
