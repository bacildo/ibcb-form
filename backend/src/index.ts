import { App } from "./initialization";

(async () => {
  const application = new App();
  await application.appInitialize();
})();
