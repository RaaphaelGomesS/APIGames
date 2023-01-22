
# API de Games

 API Restful com CRUD na entidade de games, autenticação de usuário para acessar/utilizar e HATEOAS.

## Dependências:

Dependências para o funcionamento do projeto:

```
  "dependencies": {
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^2.3.3",
    "sequelize": "^6.28.0"
  }
```
## Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.JS](https://nodejs.org/en/)
- [Express](http://expressjs.com/pt-br/)
- [mySQL](https://www.mysql.com)
## Como instalar para rodar localmente:

Clone o projeto

```bash
  git clone https://github.com/RaaphaelGomesS/APIGames.git

```

Entre no diretório do projeto

```bash
  cd APIGames
```

Instale as dependências

```bash
  npm i
```

Inicie o servidor

```bash
  npm start
```

Além disso deve criar um arquivo .env e adicionar os dados de acordo com o banco de dados que pretende utilizar, o exemplo está no arquivo .env.exemplo ou esse abaixo.

```bash
  DB_HOST=
  DB_PORT=
  DB_NAME=
  DB_USER=
  DB_PASSWORD=
  DB_DIALECT=
  KEY_JWS=
```
## Porta:
Rodando localmente a porta pode ser alterada no .env. O servidor está funcionando na railway junto ao banco de dados.

https://apigames-production.up.railway.app
## Endpoints
### POST /register
Esse endpoint é responsável de criar o usuário para posteriormente realizar o acesso.
#### Parametros
Nome, email e senha.

```
 {
	 "name": "exemplo",
	 "email": "exemplo1@gmail.com",
	 "password": "1234"
 }
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai recebar os dados do usuário criado e um link para realizar login.

Exemplo de resposta:
```
{
	"UserCreated": {
		"id": 2,
		"name": "exemplo",
		"email": "exemplo1@gmail.com",
		"password": "1234",
		"updatedAt": "2023-01-22T09:51:00.461Z",
		"createdAt": "2023-01-22T09:51:00.461Z"
	},
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/auth",
			"method": "POST",
			"rel": "login"
		}
	]
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Campo faltando ou vazio.

Exemplo de resposta:
```
{
    "err": "Falha na requisição"
}
```

### POST /auth
Esse endpoint é responsável de realizar o login e disponibilizar o token de acesso.
#### Parametros
email e senha registrados no banco.

```
 {
	 "email": "exemplo1@gmail.com",
	 "password": "1234"
 }
```
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai recebar o token.

Exemplo de resposta:
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJleGVtcGxv
    MUBnbWFpbC5jb20iLCJpYXQiOjE2NzQzODE3MTh9.6NJUOlIu26ER8_GgYE5dMtbtX7vc6JUJl4lR-Yz5fUf"
}
```
##### Falha na autenticação! 401 / 404
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: email ou senha inválidas ou usuário não encontrado.

Exemplo de resposta:
```
{
    "err": "usuário não encontrado!"
}
```
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados.
#### Parametros
nenhum
#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token do usuário na área de "Bearer Token".
#### Respostas
#### OK! 200
Caso essa resposta aconteça você vai recebar a listagem dos games junto ao link para criar um novo game.

Exemplo de resposta:
```
{
	"games": [
		{
			"id": 1,
			"title": "Sea of thieves",
			"year": 2018,
			"price": 64,
			"createdAt": "2023-01-10T10:17:30.000Z",
			"updatedAt": "2023-01-10T10:17:30.000Z"
		},
		{
			"id": 2,
			"title": "Death stranding director cut",
			"year": 2020,
			"price": 95,
			"createdAt": "2023-01-14T16:24:20.000Z",
			"updatedAt": "2023-01-14T16:24:20.000Z"
		},
	],
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/game",
			"method": "POST",
			"rel": "post_game"
		}
	]
}
```
#### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: Token inválido.

Exemplo de resposta:
```
{
	"err": "token inválido!"
}
```

### GET /game/:id
Esse endpoint é responsável por retornar o game do respectivo id.
#### Parametros
nenhum
#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token do usuário na área de "Bearer Token".
#### Respostas
#### OK! 200
Caso essa resposta aconteça você vai recebar os dados do game junto aos links para acessar a listagem geral, atualizar o próprio jogo ou deleta-lo.

Exemplo de resposta:
```
{
	"game": {
		"id": 2,
		"title": "Death stranding director cut",
		"year": 2020,
		"price": 95,
		"createdAt": "2023-01-14T16:24:20.000Z",
		"updatedAt": "2023-01-14T16:24:20.000Z"
	},
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/games",
			"method": "GET",
			"rel": "get_all_games"
		},
		{
			"href": "https://apigames-production.up.railway.app/game/2",
			"method": "PUT",
			"rel": "edit_game"
		},
		{
			"href": "https://apigames-production.up.railway.app/game/2",
			"method": "DELETE",
			"rel": "delete_game"
		}
	]
}
```
#### Falha na autenticação! 401 /404
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: Token inválido ou game não foi encontrado.

Exemplo de resposta:
```
{
	"err": "O game não foi encontrado!"
}
```

### POST /game/
Esse endpoint é responsável por adicionar um novo game ao banco.
#### Parametros
Título, ano e preço(INT).

```
 {
	 "title": "exemplo",
	 "year": "2023",
	 "price": "100"
 }
```

#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token do usuário na área de "Bearer Token".
#### Respostas
#### OK! 200
Caso essa resposta aconteça você vai recebar os dados do game registrado junto ao link para acessar a listagem geral.

Exemplo de resposta:
```
{
	"game": {
		"id": 5,
		"title": "hades",
		"year": "2018",
		"price": "47",
		"updatedAt": "2023-01-22T10:28:36.345Z",
		"createdAt": "2023-01-22T10:28:36.345Z"
	},
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/games",
			"method": "GET",
			"rel": "get_all_games"
		}
	]
}
```
#### Falha na autenticação! 400
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: Algum campo está errado, tanto a chave quanto o valor.

Exemplo de resposta:
```
{
	"err": "Falha na requisição"
}
```

### PUT /game/:id
Esse endpoint é responsável por atualizar um game pré existente no banco.
#### Parametros
Título, ano e preço(INT).

```
 {
	 "title": "exemploAtualizado",
	 "year": "2023",
	 "price": "100"
 }
```

#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token do usuário na área de "Bearer Token".
#### Respostas
#### OK! 200
Caso essa resposta aconteça você vai recebar o título do game atualizado junto ao link para acessar a listagem geral e o próprio game.

Exemplo de resposta:
```
{
	"gameUpdate": "exemploAtualizado",
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/games",
			"method": "GET",
			"rel": "get_all_games"
		},
		{
			"href": "https://apigames-production.up.railway.app/game/5",
			"method": "GET",
			"rel": "get_game"
		}
	]
}
```
#### Falha na autenticação! 400
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: Algum campo está errado, tanto a chave quanto o valor ou não foi encontrado um game com respectivo id.

Exemplo de resposta:
```
{
	"err": "Falha na requisição"
}
```
### DELETE /game/:id
Esse endpoint é responsável por deletar um game pré existente no banco.
#### Parametros
Nenhum
#### Auth
Para conseguir o retorno esperado, no headers da requisição deve ser passado o token do usuário na área de "Bearer Token".
#### Respostas
#### OK! 200
Caso essa resposta aconteça você vai receber uma mesagem junto ao link para acessar a listagem geral e para adicionar um novo game.

Exemplo de resposta:
```
{
	"msg": "Game foi deletado!",
	"_links": [
		{
			"href": "https://apigames-production.up.railway.app/games",
			"method": "GET",
			"rel": "get_all_games"
		},
		{
			"href": "https://apigames-production.up.railway.app/game",
			"method": "POST",
			"rel": "post_game"
		}
	]
}
```
#### Falha na autenticação! 400
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo na requisição. Motivos: Não foi encontrado um game com o respectivo id ou necessita estar autenticado.

Exemplo de resposta:
```
{
	"err": "Falha na requisição"
}
```