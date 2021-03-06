const express = require("express");
const cors = require("cors");
//const { v4: uuidv4 } = require('uuid');

 const { uuid: uuidv4 } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id: uuidv4(), title, url, techs, likes: 0 };

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const id = request.params.id;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }

  const repository = repositories[repositoryIndex];

  const newRepository = { ...repository, title, url, techs };

  repositories[repositoryIndex] = newRepository;

  response.json(newRepository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const id = request.params.id;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }
  
  repositories.splice(repositoryIndex);

  response.sendStatus(204);
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO  
  const id = request.params.id;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Repository not found'});
  }
  
  const repository = repositories[repositoryIndex];

  repository.likes++;

  repositories[repositoryIndex] = repository;

  response.json(repository)
});

module.exports = app;
