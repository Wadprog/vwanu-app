import * as SecureStore from "expo-secure-store";
// eslint-disable-next-line import/no-unresolved
import Logger from "./logger";

const prefix = "cache_";
const defaultExpiredTime = 5 * 60 * 1000;

/**
 * @description Check if a value is expired
 * @param item The item to check
 * @param expiredTime The time in milliseconds to expire the value
 * @returns boolean
 */
const isExpired = (item: any, expiredTime = defaultExpiredTime) => {
  const now = Date.now();
  const diff = now - item.timestamp;
  return diff > expiredTime;
};

/**
 *@description Remove a value from the cache
 * @param key  The key to remove from the cache
 * @returns Promise<void>
 *
 */
export const remove = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(prefix + key);
  } catch (e) {
    // remove error
    Logger.error("error removing", e);
  }
};
/**
 *@description Store a value in the cache
 * @param key The key to store in the cache
 * @param value Any value to store in the cache
 */
export const store = async (key: string, value: unknown) => {
  if (!value) {
    throw new Error("No value to store");
  }

  const item = {
    value,
    timestamp: Date.now(),
  };
  try {
    await SecureStore.setItemAsync(prefix + key, JSON.stringify(item));
  } catch (e) {
    Logger.error("error storing", e);
  }
};

/**
 * @description Get a value from the cache if exist and not expired else return null
 * @param key The key to get from the cache
 * @param returnExpired Whether to return expired values
 * @param expiredTime The time in milliseconds to expire the value
 * @returns Promise<unknown>
 */

export const get = async (
  key: string,
  returnExpired = true,
  expiredTime = defaultExpiredTime
) => {
  try {
    const value = await SecureStore.getItemAsync(prefix + key);
    if (!value) return null;
    const item = JSON.parse(value);
    if (returnExpired) return item.value;
    if (isExpired(item, expiredTime)) {
      await remove(key);
      return null;
    }
    return item.value;
  } catch (e) {
    Logger.error("error getting key" + key + e);
    // error reading value
  }
};
/**
 * @description create a value in the cache if not exist or update if exist
 * @param key  The key to update in the cache
 * @param value |unknown| The value to update the key with
 * @returns Promise<void>
 */

export const restore = async (key: string, value: unknown) => {
  try {
    const val = await get(key);
    if (!val) {
      return store(key, value);
    }

    await remove(key);
    return store(key, value);
  } catch (e) {
    // saving error
    Logger.error("error restoring" + key + e);
  }
};
