import { Enforcer } from "casbin";
import { Request, Response } from "express";
export default function authz(newEnforcer: Promise<Enforcer>): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("express-serve-static-core").Query>, res: Response<any>, next: any) => Promise<void>;
