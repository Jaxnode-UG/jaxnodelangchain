# JaxNode Langchain Demo

Create a empty folder in your home directory.

```bash
$ cd ~/
$ mkdir pgvector
```

Now that you have added a folder to your home directory for persisting your database. Now we can run a docker command to start a vector store for our RAG application.

```bash
$ docker run -d --name pgvector -e POSTGRES_PASSWORD=password -v ${HOME}/pgvector/:/var/lib/postgresql/data -p 5432:5432 pgvector/pgvector:pg16
```

## Ollama

Now we can install Ollama locally. Go to [Ollama.ai](https://Ollama.ai) to download Ollama or install using docker.

```bash
$ docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
$ docker exec -it ollama ollama run llama2
```

