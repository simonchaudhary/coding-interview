import { describe, expect, it } from "vitest";

import { buildUrl } from "@/utils/string";

describe("buildUrl", () => {
  it("builds a url removing duplicate inner slashes and trailing slash", () => {
    const url = buildUrl(
      "http://localhost:3000/",
      "//api/",
      "/v1/",
      "///users///",
      "//1////"
    );
    expect(url).toBe("http://localhost:3000/api/v1/users/1");
  });

  it("handles paths with and without leading slashes the same way", () => {
    const withSlash = buildUrl("google.com", "/searchText");
    const withoutSlash = buildUrl("google.com", "searchText");
    expect(withSlash).toBe("google.com/searchText");
    expect(withoutSlash).toBe("google.com/searchText");
  });

  it("preserves protocol and query strings while normalizing", () => {
    const urlObject = new URL("https://example.com/base/");
    const result = buildUrl(
      urlObject,
      "/path/",
      "123",
      "/?redirect=https://example.com//next"
    );
    expect(result).toBe(
      "https://example.com/base/path/123/?redirect=https://example.com/next"
    );
  });
});
