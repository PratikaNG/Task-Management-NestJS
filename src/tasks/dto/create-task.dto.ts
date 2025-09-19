import { IsNotEmpty } from "class-validator";


export class CreateTaskDto{
    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    description:string;
}


// without validation pipe
// export class CreateTaskDto{
//     title:string;
//     description:string;
// }