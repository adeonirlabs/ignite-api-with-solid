# Requisitos funcionais

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível se autenticar
- [x] Deve ser possível visualizar o perfil de um usuário
- [x] Deve ser possível obter o número total de check-ins
- [x] Deve ser possível visualizar o histórico de check-ins
- [x] Deve ser possível buscar academias próximas
- [x] Deve ser possível buscar academias pelo nome
- [x] Deve ser possível realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

# Regras de negócio

- [x] O usuário não pode se cadastrar com um e-mail já existente
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver a 100 metros da academia
- [x] O check-in só pode ser validado até 20 minutos após ser criado
- [x] O check-in só pode ser validado por um administrador
- [x] A academia só pode ser cadastrada por um usuário administrador

# Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco de dados
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado pelo token JWT
