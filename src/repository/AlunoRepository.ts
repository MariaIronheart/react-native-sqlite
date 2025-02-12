import { executeTransation } from "../database/SQLiteDatabase";
import { StringBuilderUtils } from "../utils/StringBuilderUtils";

export type Aluno = {
    id?: number;
    nome: string;
    cpf: string;
    idade: number;
}

export default class AlunoRepository {

    private tableName: string = "aluno";

    constructor() {
        this.up();
    }

    private async up() : Promise<void> {
        const sb: StringBuilderUtils = new StringBuilderUtils();
        sb.append(`CREATE TABLE IF NOT EXISTS ${this.tableName} ( `);
        sb.append("id INTEGER PRIMARY KEY AUTOINCREMENT, ");
        sb.append("nome TEXT NOT NULL, ");
        sb.append("cpf TEXT NOT NULL, ");
        sb.append("idade INTEGER NOT NULL );");
        const sql: string = sb.toString();
        await executeTransation(sql);
    }

    public async down(): Promise<void> {
        await executeTransation(`DROP TABLE ${this.tableName}`);
    }

    public async create(aluno: Aluno): Promise<number | undefined> {
        const sql: string = `INSERT INTO ${this.tableName} (nome, cpf, idade) VALUES (?, ?, ?)`;
        const args = [
            aluno.nome,
            aluno.cpf,
            aluno.idade
        ];
        const resultado = await executeTransation(sql, args);
        return resultado.insertId;
    }

    public async listarAlunos(): Promise<Aluno[]> {

        const alunos: Aluno[] = [];

        const sql: string = `SELECT * FROM ${this.tableName}`;
        const consulta = await executeTransation(sql);

        for(let i = 0; i < consulta.rows.length; i++){
            const aluno = consulta.rows.item(i);
            alunos.push({
                id: aluno.id,
                nome: aluno.nome,
                cpf: aluno.cpf,
                idade: aluno.idade
            });
        }

        return alunos;
    }

    public async deletarAlunos(id: number): Promise<void> {

        const sql : string = `DELETE FROM ${this.tableName} WHERE id = ?`;

        const deletar = await executeTransation(sql, [id]);
    }
}