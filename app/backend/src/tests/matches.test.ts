import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';
import { inProgressFalse, inProgressTrue, matchesMock } from './Mocks/matchesMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teste de funcionalidade de matches', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as unknown as Matches[])
  });

  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Testa se o retorno do status http é 200 e retorna corretamente todos as partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
  });

  it('Testa se o retorno do status http é 201 e retorna os dados atualizados', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })

    const response = await chai.request(app).post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({
      "id": 62,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
  });

  it('Testa se o retorno do status http é 200 e retorna inProgress = false', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(inProgressFalse);
  });

  it('Testa se o retorno do status http é 200 e retorna inProgress = true', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(inProgressTrue);
  });

  it('Testa se o retorno do status http é 200 com messagem /Finished/', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })

    const response = await chai.request(app)
      .patch('/matches/42/finish')
      .set('Authorization', chaiHttpResponse.body.token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('Testa se o retorno do status http é 200 com messagem /Updated/', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })

    const response = await chai.request(app).patch('/matches/42')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 2,
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Updated' });
  });

  it('Testa se não é possível inserir uma partida com times iguais', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })

    const response = await chai.request(app).post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeam: 8,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({
      message: 'It is not possible to create a match with two equal teams'
    });
  });

  it('Testa se não é possível inserir uma partida com time inválido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    })

    const response = await chai.request(app).post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeam: 1000,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({
      message: 'There is no team with such id!'
    });
  });

  it('Testa se não é possível inserir uma partida sem token', async () => {
    const response = await chai.request(app).post('/matches')
      .send({
        homeTeam: 1000,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'Token must be a valid token'
    });
  });
});