const chai = require('chai');
const chaiHttp = require('chai-http');
const { mensagens } = require('../api/constants')

let should = chai.should();

chai.use(chaiHttp);

describe('Autenticação', () => {
    describe('Gerar token', () => {

        it('Sucesso', (done) => {
            chai.request('http://localhost:3000')
                .post('/login')
                .send({
                    email: 'bruno@trocolis.com',
                    senha: '1234'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('auth').eql(true); // Verificamos se existe a propriedade id_, e se ela e igual a id_ criada
                    res.body.should.have.property('token');
                    done();
                });
        });

        it('Senha inválida', (done) => {
            chai.request('http://localhost:3000')
                .post('/login')
                .send({
                    email: 'bruno@trocolis.com',
                    senha: 'senha_errada'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('auth').eql(false); // Verificamos se existe a propriedade id_, e se ela e igual a id_ criada
                    res.body.should.have.property('message').eql(mensagens.SENHA_INVALIDA);
                    done();
                });
        });

        it('Usuário inválida', (done) => {
            chai.request('http://localhost:3000')
                .post('/login')
                .send({
                    email: 'erro@trocolis.com',
                    senha: '1234'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('auth').eql(false); // Verificamos se existe a propriedade id_, e se ela e igual a id_ criada
                    res.body.should.have.property('message').eql(mensagens.USUARIO_NAO_ENCONTRADO);
                    done();
                });
        });
    });
});