import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Article } from "src/articles/entities/article.entity";
import { User } from "src/users/entities/user.entity";
import { Action } from "./types/action.enum";
import { Injectable } from "@nestjs/common";
import { UserRoles } from "src/users/types/Roles";

type Subjects = InferSubjects<typeof Article | typeof User> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {

    createForUser(user: User){
        const { can, cannot, build } =  new AbilityBuilder<
        Ability<[Action, Subjects]>
      >(Ability as AbilityClass<AppAbility>)

      /** 
       * En el siguiente bloque de código se pueden configurar los permisos según su rol
       * en este caso tenemos dos tipos de usuarios: usuario y admin
       * @method can() sirve para asignar permisos 
       * @method cannot() sirve para declinar permisos 
       */

      if ( user.roles.includes( UserRoles.ADMIN ) ) {
        can(Action.Manage, 'all'); // read-write access to everything (Acceso a leer y escribir)
      } else {
        can(Action.Read, 'all'); // read-only access to everything (Acceso a leer)
        can(Action.Create, Article); // read-only access to everything (Acceso a escribir articulos)
      }

      /** Aqui se asigna permisos de edicion si le pertenece el articulo al usuario */
      cannot(Action.Update, Article, { user:user });

      /** Si ya esta publicado no permite eliminar */
      cannot(Action.Delete, Article, { isPublished: true });

      return build({
        detectSubjectType: (item) =>
            item.constructor as ExtractSubjectType<Subjects>,
      })

    }


}
