import React, { useState } from "react";
import AlunoRepository, {Aluno} from "../repository/AlunoRepository";
import { Button, View , Text} from "react-native";


const repository = new AlunoRepository;


const HomePage: React.FC = () => {

    const [alunos, setAlunos] = useState<Aluno[]>([]);

    const criarAluno = async () => {
        const alunoId = await repository.create(
            {
                nome: 'Nome de teste',
                cpf: '99999999999',
                idade: Math.floor(Math.random() * (100 - 11)) + 10
            }
        );
        console.log('ALUNO CRIADO COM IDO:', alunoId);
    }

    const ListarAlunos = async () => {
        const alunos: Aluno[] = await repository.listarAlunos();
        setAlunos(alunos);
        console.log(alunos);
    }

    const deletarAlunos = async (id: number) => {
        await repository.deletarAlunos(id);

        console.log('Alunos deletados');

    }

    return(
        <View>
            <Button onPress={criarAluno} title="Criar"/>
            <Button onPress={ListarAlunos} title="Listar"/>
            <Button onPress={() => { deletarAlunos(1)}} title="Deletar"/>
            {alunos.map(aluno => (
            <View key={`aluno-item-${aluno.id}`}>
                    <Text>{`${aluno.id} - ${aluno.nome} - ${aluno.cpf}`}</Text>
                </View>
            ) )}
        </View>
    )
}

export default HomePage;