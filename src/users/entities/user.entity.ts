import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { UserRoles } from "../types/Roles";
import { Article } from "src/articles/entities/article.entity";
import { Exclude } from "class-transformer";

@Entity({ name:"users" })
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({ unique:true })
    username: string

    @Column()
    password: string

    @Column({ type: 'boolean', default: true })
    active: boolean

    @Column({ 
        type: 'enum',
        array: true,
        enum: UserRoles,
        default: [UserRoles.ADMIN]
    })
    roles: UserRoles[]

    /** Se crea la relacion uno a uno */
    /** se genera la colummna que va a mantener la relación */
    @OneToOne(()=> Profile, profile => profile.user, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: 'profile_id'})
    profile: Profile

    @OneToMany(()=> Article, article => article.user)
    articles: Article[]


    
}