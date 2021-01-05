import store from 'store';

export function addLocalStorageTranslation(context, id, translation) {
  const contextStore = store.get(context) || {};
  contextStore[id] = translation;

  store.set(context, contextStore);
}

export function getLocalStorageTranslation(context, id) {
  const contextStore = store.get(context) || {};
  return contextStore[id];
}

export function getLocalStorageTranslations(context) {
  const contextStore = store.get(context) || {};
  return contextStore;
}

export function loadLocalStorageTranslations(context, data) {
  const contextStore = store.get(context) || {};

  Object.keys(data).forEach((key) => {
    contextStore[key] = data[key];
  });

  store.set(context, contextStore);
}
