import axios from "axios";

import { ENV } from "@/config/env";

import { buildUrl } from "@/utils/string";

export const axiosClient = axios.create({
  baseURL: buildUrl(ENV.API_BASE_URL, ENV.API_VERSION),
});
