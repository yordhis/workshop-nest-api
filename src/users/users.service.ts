import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            nombre: "Juan",
            apellido: "Pérez",
            correo: "juanperez@example.com"
        },
        {
            id: 2,
            nombre: "María",
            apellido: "García",
            correo: "mariagarcia@example.com"
        },
        {
            id: 3,
            nombre: "Pedro",
            apellido: "Rodríguez",
            correo: "pedrorodriguez@example.com"
        }
    ]

    findAll(){
        return this.users
    }

    findOne( id: number ){
        const user = this.users.find(user => user.id === id) 
        if (!user) {
            throw new NotFoundException({
                message: "Usuario no existe",
                status: HttpStatus.NOT_FOUND
            })
        }

    }

    create(user: any){
        this.users.push(user);
        return user.id;
    }

    delete(id: number){
        const index = this.users.findIndex(user => user.id === id) 
        console.log(index);
        
        if (index === -1) {
            throw new NotFoundException({
                message: "Usuario no existe",
                status: HttpStatus.NOT_FOUND
            })
        }
        this.users.splice(index, 1)
        return "usuario eliminado"
    }

    update(id: number, body: any){
        return "usuario actualizado"
    }


}
