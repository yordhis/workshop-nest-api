import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity({ name: "profiles" })
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    name: string
    
    @Column({ nullable:true, name:'last_name' })
    lastname: string

    @Column()
    age: number

    @OneToOne(() => User, user => user.profile)
    user: User
}