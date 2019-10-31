import {
  RequireLogin,
  ForbidOptions,
  RedirectOptions,
  // @ts-ignore
} from '@wix/wix-bootstrap-require-login';
import { Request } from 'express';
import { FunctionContext } from './types';

export const forbid = async (
  { req, res, context }: FunctionContext,
  options?: ForbidOptions,
): Promise<void> => {
  const requireLogin: RequireLogin = context.requireLogin;

  return new Promise((resolve, reject) => {
    // @ts-ignore
    requireLogin.forbid(options)(req, res, error =>
      error ? reject(error) : resolve(),
    );
  });
};

export const redirect = async (
  { req, res, context }: FunctionContext,
  options?: string | RedirectOptions | ((req: Request) => string),
): Promise<void> => {
  const requireLogin: RequireLogin = context.requireLogin;

  return new Promise((resolve, reject) => {
    // @ts-ignore
    requireLogin.redirect(options)(req, res, error =>
      error ? reject(error) : resolve(),
    );
  });
};
