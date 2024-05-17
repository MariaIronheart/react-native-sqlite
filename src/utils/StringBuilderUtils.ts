
export class StringBuilderUtils {
    private conteudo: string[];

    constructor () {
        this.conteudo = [];
    }
    //append armazena e adiciona no array
    append(value: string):void {
        this.conteudo.push(value);
    }

    toString(): string {
        return this.conteudo.join('');
    }
}

