import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "articles"})
export class Article {
    
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'text'})
    description: string

    @Column({ type: 'boolean', name: 'is_published', default: false })
    isPublished: boolean

    @Column({ type: 'numeric',  name:'author_id'})
    authorId: number
    
    @ManyToOne(()=> User, user => user.id)
    @JoinColumn({ name: 'user_id'})
    user: User
    
}