let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Autenticação', () => {
    describe('/POST Autenticação', () => {
        it('Testando Gerar token', (done) => {
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
    });
});