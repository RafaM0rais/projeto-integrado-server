import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";
import { hash } from "bcryptjs";
import cors from "@fastify/cors";

const app = fastify();
app.register(cors, {});

const prisma = new PrismaClient();

//Retorna todos os clientes
app.get("/clientes", async () => {
  const clientes = await prisma.cliente.findMany();

  return { clientes };
});

//Cadastra cliente
app.post("/clientes", async (request, reply) => {
  const createClienteSchema = z.object({
    fullname: z.string().min(3).max(64),
    email: z.string().email(),
    password: z.string(),
    cellphone: z.string().max(11),
  });

  const { fullname, email, password, cellphone } = createClienteSchema.parse(request.body);

  const passwordHash = await hash(password, 8);

  await prisma.cliente.create({
    data: {
      fullname,
      email,
      password: passwordHash,
      cellphone: cellphone.replace(/(\D)/g, ""),
    },
  });

  reply.status(201).send();
});

//Cadastra agenda
app.post("/agendas", async (request, reply) => {
  const createAgendaSchema = z.object({
    data: z.coerce.date(),
    clienteId: z.string().cuid(),
  });

  const { data, clienteId } = createAgendaSchema.parse(request.body);

  await prisma.agenda.create({
    data: {
      data,
      clienteId,
    },
  });

  reply.status(201).send();
});

//Retorna todos os agendamentos
app.get("/agendas", async (request) => {
  if (!request.body) {
    const agendas = await prisma.agenda.findMany();

    return { agendas };
  }
});

//Retorna um agendamento específico
app.get("/agendas/:agenda", async (request) => {
  const listAgendaSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = listAgendaSchema.parse(request.params);

  const agenda = await prisma.agenda.findUnique({
    where: {
      id,
    },
  });

  return { agenda };
});

// //Retorna agendamentos de um cliente específico
// app.get("/agendas/cliente/:cliente", async (request) => {
//   const listAgendaSchema = z.object({
//     clienteId: z.string().cuid(),
//   });

//   const { clienteId } = listAgendaSchema.parse(request.params);

//   const agendas = await prisma.agenda.findUnique({
//     cliente: {
//       where: {
//         id: clienteId,
//       },
//     },
//   });

//   return { agendas };
// });

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log("HTTP Server Running");
  });
