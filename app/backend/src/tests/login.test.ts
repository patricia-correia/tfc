import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('teste rota "/login"', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 2,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '12345678'
      } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('testa se o login retorna status 200 com sucesso ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '12345678' })

    expect(chaiHttpResponse.status).to.be.equals(200)
  });

  it('testa se a rota login retorna um token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '12345678' })

    expect(chaiHttpResponse.body.token).to.be.string
  });
});
