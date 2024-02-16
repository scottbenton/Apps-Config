export enum ModuleScope {
  HomePage = "home_page",
  DeveloperTools = "dev_tools",
  Authentication = "auth_ui",
}

export interface IModule {
  name: string;
  description: string;
  scope: ModuleScope;
  defaultUrl: string;
}

export type IModuleOverrides = Partial<Record<ModuleScope, string>>;

export const modules: Record<ModuleScope, IModule> = {
  [ModuleScope.HomePage]: {
    name: "Home Page",
    description: "The root page for this microfrontend",
    scope: ModuleScope.HomePage,
    defaultUrl: "https://apps-homepage.web.app",
  },
  [ModuleScope.DeveloperTools]: {
    name: "Developer Tools",
    description:
      "A series of helpers that make developing and debugging easier",
    scope: ModuleScope.DeveloperTools,
    defaultUrl: "https://scott-benton-dev-tools.web.app",
  },
  [ModuleScope.Authentication]: {
    name: "Authentication",
    description: "Routes, contexts, and hooks related to authentication",
    scope: ModuleScope.Authentication,
    defaultUrl: "https://scottbenton-auth-ui.web.app",
  },
};

export function getModuleOverrides(): IModuleOverrides {
  const localStorageValue = localStorage.getItem("module-overrides");
  let parsedOverrides: IModuleOverrides = {};
  if (localStorageValue) {
    try {
      const values = JSON.parse(localStorageValue);
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (typeof value === "string") {
          parsedOverrides[key as ModuleScope] = value;
        }
      });
    } catch {}
  }
  return parsedOverrides;
}

export function setModuleOverride(scope: ModuleScope, url: string | undefined) {
  const newOverrides = { ...getModuleOverrides() };

  if (url) {
    newOverrides[scope] = url;
  } else {
    delete newOverrides[scope];
  }
  localStorage.setItem("module-overrides", JSON.stringify(newOverrides));
}
