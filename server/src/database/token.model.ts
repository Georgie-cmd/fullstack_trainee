import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

 

@Table({tableName: 'tokens'})
export class Token extends Model<Token> {
    @ForeignKey(() => User)
    @Column({type: DataType.UUID, unique: true, defaultValue: DataType.UUIDV4, primaryKey: true})
    userId: string

    @Column({type: DataType.STRING, allowNull: false})
    refresh_token: string
    
    @Column({type: DataType.STRING, allowNull: false})
    refresh_token_exp: string

    @Column({type: DataType.STRING, allowNull: false})
    ip_address: any

    @BelongsTo(() => User)
    token: User
}