curl -X POST http://localhost:8000/gateway/api/v1/autor/1/livro \
    -H "Content-Type: application/json" \
    -H "apikey: BXSShLVAf2YZnU3HD8RKEWFQSJkMbEwW" \
    -d '{"numero": 1, "Titulo": "Coraline", "Edicao" :"Primeira", "ISBN": "123", "Categoria": "Juvenil"}'