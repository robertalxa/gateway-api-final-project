curl -i -X POST http://localhost:8001/plugins \
  --data "name=response-transformer" \
  --data "config.remove.json=id"
# Dessa maneira aqui ele só remove o id quando o payload for um objeto único ex: {}, quando é retornada uma lista [{}] o kong não consegue remover os ids
# Vi que dá pra fazer utilizando o Plugin Lua mas não consegui configurar, então na prática o efeito dessa config aqui
# vai ser notada somente na requisição "getAutorPorNumero.sh"