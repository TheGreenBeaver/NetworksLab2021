const DnsReplicaServer = require('./dns-replica-server');


async function run({ port, database, dump, cli }) {
  const { accessor: server, existing } = await DnsReplicaServer.createAccessor(database);

  if (dump) {
    await server.runDbPopulation(dump)
  }

  const noInitialData = !dump && !existing;
  if (cli || noInitialData) {
    await server.runCli(noInitialData);
  }

  server.runServer(port);
}

module.exports = run;
