import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { UserRoles } from "../types/Roles";
import { Article } from "src/articles/entities/article.entity";

@Entity({ name:"users" })
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({ type: 'text', unique:true })
    username: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'boolean', default: false })
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