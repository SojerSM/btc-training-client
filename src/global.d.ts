declare namespace google {
  namespace accounts {
    namespace id {
      function initialize(options: {
        client_id: string;
        callback: (response: any) => void;
      }): void;
      function renderButton(
        element: HTMLElement,
        options: { theme: string; size: string }
      ): void;
      function prompt(): void;
    }
  }
}
