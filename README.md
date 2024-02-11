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

Now that we have started a database server on our computer with Docker, we can log into the running container to create a database that we can use to store our vectors.

```bash
$ docker exec -it pgvector psql -U postgres
$ create database jaxnodevector;
# DATABASE CREATED
$ CREATE EXTENSION IF NOT EXISTS vector;
# EXTENSION vector CREATED
\q
```

The first line creates an interactive terminal on our container, and uses the `psql` command line application for us to interact with the `postgres` system database. On the second line we create a database called `jaxnodevector`.

On the last line we use the `\q` command to exit out of the `psql` program.

## Create a table to store our vectors

Now that we have a postgres database with the PGVector extension, we can create a table to store our vectors. I have created a script you can use to do this in this example. Run the following script with Node.js or the JavaScript engine of your choice.

```bash
$ npm run pgvector:setup
```

This script will connect to your 

## Ollama

Now we can install Ollama locally. Go to [Ollama.ai](https://Ollama.ai) to download Ollama or install using docker.

```bash
$ docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
$ docker exec -it ollama ollama run llama2
```

