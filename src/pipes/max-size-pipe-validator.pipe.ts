import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class MaxSizeValidatorPipe implements PipeTransform {
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        
        const maxSize = 200000;

        if(value.size > maxSize) throw new BadRequestException('The file must be less than 200Kb.');

        return value;
    }
    
}