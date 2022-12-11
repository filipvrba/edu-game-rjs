import { ENV } from "../env";

export default class MRuby {
  static get_result(mrb_code, callback) {
    let encode_mrb_code = encodeURIComponent(mrb_code);
    let mrb_token = ENV.MRBAPI_TOKEN;
    console.log(mrb_code);
    let uri = `${ENV.VITE_MRBAPI_URL}?token=${mrb_token}&mrb=${encode_mrb_code}`;
    Net.get_json(uri, data => callback(data.result, data.message))
  }
}