import { HttpStatus } from "@nestjs/common";

export interface BaseResponse<T> {
  readonly statusCode: HttpStatus;
  readonly message?: string;
  readonly resource: T;
}
