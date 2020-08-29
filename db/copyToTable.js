const { promisify } = require('util');
const stream = require('stream');
const copyFrom = require('pg-copy-streams').from;
const pipeline = promisify(stream.pipeline);

exports.copyToTable = async (txOrKnex, tableName, cols, readableStream) => {
  const knexClient = await (txOrKnex.trxClient || txOrKnex.client);
  const pgClient = await knexClient.acquireConnection();
  try {
    await pipeline(
      readableStream,
      pgClient.query(copyFrom(`COPY ${tableName} ${cols === null ? '' : '(' + cols.join(',') + ')'} FROM STDIN DELIMITER ',' CSV HEADER`)),
    );
  } finally {
    // Ensure that the pgClient is released once the pipeline completes
    await knexClient.releaseConnection(pgClient);
  }
};
