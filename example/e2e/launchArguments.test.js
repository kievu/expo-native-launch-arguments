const { stringifyPair } = require("../stringifyPair");

const launchArgs = {
  string: "foo",
  bool: true,
};

describe("Launch arguments", () => {
  beforeAll(async () => {
    await device.launchApp({ launchArgs });
  });

  it("should be provided and parsed", async () => {
    for (const key in launchArgs) {
      const value = launchArgs[key];
      await expect(element(by.text(stringifyPair(key, value)))).toBeVisible();
    }
  });
});
