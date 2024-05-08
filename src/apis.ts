export enum API {
  Auth = "auth_api",
  DungeonManager = "dungeon_manager_api",
}

export interface IAPI {
  name: string;
  description: string;
  key: API;
  defaultUrl: string;
}

export type IAPIOverrides = Partial<Record<API, string>>;

export const apis: Record<API, IAPI> = {
  [API.Auth]: {
    name: "Authentication API",
    description:
      "This api handles setting and fetching user credentials, sessions, and info",
    key: API.Auth,
    defaultUrl: "https://api.auth.scottbenton.dev",
  },
  [API.DungeonManager]: {
    name: "Dungeon Manager API",
    description: "This api is the backend for the dungeon manager app",
    key: API.Auth,
    defaultUrl: "https://api.dungeon-manager.scottbenton.dev",
  },
};

export function getAPIOverrides(): IAPIOverrides {
  const localStorageValue = localStorage.getItem("api-overrides");
  let parsedOverrides: IAPIOverrides = {};
  if (localStorageValue) {
    try {
      const values = JSON.parse(localStorageValue);
      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (typeof value === "string") {
          parsedOverrides[key as API] = value;
        }
      });
    } catch {}
  }
  return parsedOverrides;
}

export function setAPIOverride(key: API, url: string | undefined) {
  const newOverrides = { ...getAPIOverrides() };

  if (url) {
    newOverrides[key] = url;
  } else {
    delete newOverrides[key];
  }
  localStorage.setItem("api-overrides", JSON.stringify(newOverrides));
}

export function getApiUrl(api: API) {
  const overrides = getAPIOverrides();
  return overrides[api] ?? apis[api].defaultUrl;
}
