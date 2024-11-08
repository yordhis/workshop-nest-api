import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from "@casl/ability";
import { Article } from "src/articles/entities/article.entity";
import { User } from "src/users/entities/user.entity";
import { Action } from "./types/action.enum";
import { Injectable } from "@nestjs/common";
import { UserRoles } from "src/users/types/Roles";

type Subjects = InferSubjects<typeof Article | typeof User> | 'all'

export type AppAbility = PureAbility<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {

    createForUser(user: User){
        const { can, cannot, build } =  new AbilityBuilder<
        PureAbility<[Action, Subjects]>
      >(PureAbility as AbilityClass<AppAbility>)


      if ( user.roles.includes( UserRoles.ADMIN ) ) {
        can(Action.Manage, 'all'); // read-write access to everything
      } else {
        can(Action.Read, 'all'); // read-only access to everything
      }

      /** Aqui se asigna permisos de edicion si le pertenece el articulo al usuario */
      can(Action.Update, Article, { authorId: user.id });

      /** Si ya esta publicado no permite eliminar asi le pertenesca al user*/
      cannot(Action.Delete, Article, { isPublished: true });

      return build({
        detectSubjectType: (item) =>
            item.constructor as ExtractSubjectType<Subjects>,
      })

    }


}
