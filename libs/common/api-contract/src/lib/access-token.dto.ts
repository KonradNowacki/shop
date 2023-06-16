import {StorageKey} from "@shop/common-utils";

export interface AccessTokenDto {
  readonly [StorageKey.ACCESS_TOKEN]: string;
}
