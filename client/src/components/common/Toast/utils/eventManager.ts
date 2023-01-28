import { Options } from "../types";

// Todo: 구현이 완료되면 타입 변경
type ToastEvent = "show";
type ShowCallback = (content: string, options: Options) => void;
type Callback = ShowCallback;

const eventManager = {
  list: new Map<ToastEvent, Callback[]>(),
  on(event: ToastEvent, callback: Callback) {
    // event가 있으면 바로 callback 추가
    // event가 없다면 event 생성 후 callback 추가
    this.list.has(event) || this.list.set(event, []);
    this.list.get(event)!.push(callback);

    return this;
  },
  off(event: ToastEvent, callback: Callback) {
    // callback이 있으면 해당 event에서 특정 callback 제거
    // callback이 없다면 event 전체 제거
    if (callback && this.list.has(event)) {
      const removedCallbacks = this.list
        .get(event)!
        .filter((cb) => cb !== callback);
      this.list.set(event, removedCallbacks);

      return this;
    }
  },
  emit(event: ToastEvent, ...args: Parameters<Callback>) {
    // event가 있으면 해당 event의 모든 callback 실행
    // event가 없다면 아무것도 실행하지 않음
    // callback은 timer를 사용하여 순차적으로 실행
    if (!this.list.has(event)) {
      return;
    }
    this.list.get(event)!.forEach((callback: Callback) => {
      setTimeout(() => {
        callback(...args);
      }, 0);
    });
  },
};

export default eventManager;
