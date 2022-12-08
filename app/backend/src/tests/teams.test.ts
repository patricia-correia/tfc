import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const teams =
  [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
  ]
describe('', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, 'findAll')
      .resolves(teams as Teams[]);
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('teste status http 200 com sucesso', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.equal(teams);
  });

  beforeEach(async () => {
    sinon
    .stub(Teams, 'findOne')
    .resolves(teams[0] as Teams);
  });

  afterEach(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('Testa se o time esta correto', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.equal({
      "id": 1,
      "teamName": "Avaí/Kindermann"
    });
  });
});