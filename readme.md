# Projeto Final Gateway API

## Descrição do projeto

- A API foi criada utilizando Typescript + NodeJS + ExpressJS;
- A estrutura de dados utilizada foi um vetor de autores dentro da própria aplicação Node, a mesma se encontra no arquivo /src/contollers/autorController.ts na linha 34;
- Foram criadas duas interfaces para modelar as entidades descritas no exercício (autor e livro), as mesmas se encontram também no mesmo arquivo citado acima;
- O método de autenticação utilizado foi o API Key do Kong.

## Rotas Originais da API

- GET http://localhost:3030/api/v1/autor → Retorna a lista de todos os Autores e seus livros;
- GET http://localhost:3030/api/v1/autor/1 → Retorna somente o Autor correspondente ao número passado via parâmetro;
- GET http://localhost:3030/api/v1/autor/1/livro → Retorna a lista de livros correspondentes ao Autor passado via parâmetro
- POST http://localhost:3030/api/v1/autor → Cria um Autor;
- POST http://localhost:3030/api/v1/autor/1/livro → Cria um livro para o Autor passado via parâmetro.

## Rotas Pós Configuração do Gateway API

- GET http://localhost:8000/gateway/api/v1/autor
- GET http://localhost:8000/gateway/api/v1/autor/1
- GET http://localhost:8000/gateway/api/v1/autor/1/livro
- POST http://localhost:8000/gateway/api/v1/autor
- POST http://localhost:8000/gateway/api/v1/autor/1/livro

_Nessas novas rotas é necessário passar o apikey via header_

# Como rodar o projeto?

## Rodar a API em NodeJS

- Primeiro passo de todos é executar o clone do repositório

- Ao fim do clone, rodar:

```
npm install
```

- A API está configurada para rodar na porta 3030 porém é possível alterar esta porta em /src/config.json
- Rodar o comando:

```
npm run dev
```

- Após a API exibir a mensagem "Listening on port XXXX" é hora de partir para o kong

## Configurar o Kong

_Obs: eu utilizei o wsl para rodar os comandos então os passos abaixo estão baseados na minha experiência_

- Rodar o Docker Desktop
- Rodar o wsl **caso esteja no windows**
- Rodar o seguinte comando para iniciar e configurar o Kong:

```
./kong/0001_start.sh
```

- Em seguida para criar o serviço execute:

**MODIFICAR NESTE ARQUIVO 0002_criandoServico.sh o IP do Servidor que está rodando a API original**

```
./kong/0002_criandoServico.sh
```

- Para configurar a rota execute:

```
./kong/0003_criandoRota.sh
```

Pronto, aqui finalizamos a configuração do gateway, agora vamos para o API Key

- Para configurar o API Key execute:

```
./kong/0004_configApiKey.sh
```

- Para criar o consumidor do API Key:

```
./kong/0005_criaConsumidor.sh
```

- Agora vamos gerar a API Key que será utilizada no header das requisições (**Será necessário guardar essa chave gerada em um bloco de notas, pois não consegui armazena-la** ):

```
./kong/0006_geraApiKey.sh
```

- Última configuração, vamos configurar a transformação do payload (deixei um comentário no arquivo):

```
./kong/0007_transformaPayload.sh
```

Agora está tudo pronto pra começarmos a realizar as requisições no gateway API!
Deixei arquivos prontos de requisição CURL dentro de ./kong/requisicoes/ cada arquivo dentro dessa pasta faz requisição para uma rota apontando para o endereço do Gateway API

**Importante**
Nas requisições CURL da pasta ./kong/requisicoes/ será necessário inserir manualmente o API Key

Por fim, para finalizar o kong e zerar suas configurações é só executar:

```
./kong/0010_stop.sh
```

Vou deixar abaixo um vídeo demonstrando todo o passo a passo descrito acima e também mostrando que tudo está funcionando bonitinho. :)

Realizando as configurações

https://github.com/user-attachments/assets/b1e0103a-d305-43e8-8796-117325eced96

Realizando as requisições:

https://github.com/user-attachments/assets/837770c8-5451-4149-8491-995c29850677

# Configurações do Postman

Criei duas variáveis de ambiente do postman
base_url: http://localhost:8000/gateway/api/v1
api_key: api gerada no passo 6

Collection do postman se encontra na pasta ./postman/
