import { requireNativeModule } from "expo-modules-core";

const LaunchArgumentsModule = requireNativeModule("LaunchArguments");

type RawMap = Record<string, string>;

type ParsedMap = Record<string, string | boolean | number>;

type LaunchArgumentsType = {
  value<T extends object = ParsedMap>(): T;
};

let parsed: ParsedMap | null = null;

export const LaunchArguments: LaunchArgumentsType = {
  value<T>(): T {
    if (parsed) {
      return parsed as T;
    }

    parsed = {};

    const raw = LaunchArgumentsModule.value as RawMap;

    for (const k in raw) {
      const rawValue = raw[k];
      try {
        parsed[k] = JSON.parse(rawValue);
      } catch {
        parsed[k] = rawValue;
      }
    }

    return parsed as T;
  },
};
