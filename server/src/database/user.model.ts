import { Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Token } from "./token.model";



@Table({tableName: 'users'})
export class User extends Model<User> {
    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: string

    @Column({type: DataType.STRING, allowNull: false})
    first_name: string

    @Column({type: DataType.STRING, allowNull: false})
    last_name: string

    @Column({type: DataType.STRING, allowNull: false})
    role_in_company: string
    
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string
} 