import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const hasRole = () => 
            requiredRoles.some((role: string[]) => user?.roles?.includes(role));
            const valid = user && user.roles && hasRole();
            if(!valid) {
                throw new ForbiddenException('You dont have peromission and not allowed to access this route')
            }
            return true;
    }
    
}