const express = require("express");
const server = express();
const projetos = [];
var contador = 0;

server.use(express.json());

server.use((req, res, next) => {
  contador++;
  console.log(contador);
  return next();
});

function bodyCheckId(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "Id not informed." });
  }
  return next();
}

function bodyCheckTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title not informed." });
  }
  return next();
}

function paramsCheckId(req, res, next) {
  if (!req.params.title) {
    return res.status(400).json({ error: "Title not informed." });
  }
  return next();
}

server.post("/projects", bodyCheckId, bodyCheckTitle, (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const projeto = { id, title, tasks: [] };

  const existe = projetos.some(proj => proj.id === id);
  if (!existe) {
    projetos.push(projeto);
  }

  return res.json(projetos);
});

server.get("/projects", (req, res) => {
  return res.json(projetos);
});

server.put("/projects/:id", paramsCheckId, bodyCheckTitle, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const projeto = projetos.findIndex(proj => proj.id === id);

  if (projeto !== -1) {
    projetos[projeto].title = title;
  }

  return res.json(projetos);
});

server.delete("/projects/:id", paramsCheckId, (req, res) => {
  const { id } = req.params;

  const projeto = projetos.filter(proj => proj.id === id);

  if (projeto.length > 0) {
    const index1 = projetos.indexOf(projeto[0]);
    projetos.splice(index1, 1);
  }

  return res.json(projetos);
});

server.post(
  "/projects/:id/tasks",
  paramsCheckId,
  bodyCheckTitle,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const projeto = projetos.findIndex(proj => proj.id === id);

    if (projeto !== -1) {
      projetos[projeto].tasks.push(title);
    }

    return res.json(projetos);
  }
);

server.listen(3333);
