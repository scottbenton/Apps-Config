import { getModuleOverrides, modules } from "./modules";

export function initModules() {
  const moduleOverrides = getModuleOverrides();
  Object.values(modules).forEach((module) => {
    const moduleUrl = moduleOverrides[module.scope] ?? module.defaultUrl;
    console.debug(`Setting ${module.scope} to ${moduleUrl}.`);
    (window as any)[`${module.scope}_url`] = moduleUrl;
  });
}
