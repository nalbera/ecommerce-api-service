import { Global, Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export function loggerGlobal(req: Request, res: Response, next: NextFunction){
    console.log(`${req.method} ${req.url} ${Date()}`);
    next()
}