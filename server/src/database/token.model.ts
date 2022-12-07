import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

 

@Table({tableName: 'tokens'})
export class Token extends Model<Token> {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    userId: number

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token: string
    
    @Column({type: DataType.STRING, allowNull: false})
    refresh_token_exp: string

    @Column({type: DataType.STRING, allowNull: false})
    ip_address: any

    @BelongsTo(() => User)
    token: User
}