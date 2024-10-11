import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({ type: 'text', unique:true })
    username: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'boolean', default: false })
    active: boolean

    /** Se crea la relacion uno a uno */
    /** se genera la colummna que va a mantener la relación */
    @OneToOne(()=> Profile, profile => profile.user )
    @JoinColumn({ name: 'profile_id'})
    profile: Profile
}