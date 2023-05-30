const { APIClient } = require("@wharfkit/antelope");

const client = new APIClient({ url: "http://144.217.253.32:8888"});

const start_height = 39590000
const end_height = 39990000

// Run tests against the v1/chain/get_block call
const getBlockChain = async (resolve, reject, height) => {

    const start = new Date()
    await client.v1.chain.get_block(height);
    const end = new Date()
    console.log(`chain, ${height}, ${end - start}`);

    height++;

    if (height < end_height) {
        getBlockChain(resolve, reject, height);
    } else {
        return resolve();
    }
}

// Run tests against the v1/trace_api/get_block call
const getBlockTrace = async (resolve, reject, height) => {

    const start = new Date()
    await client.provider.call("/v1/trace_api/get_block", { block_num_or_id: height })
    const end = new Date()
    console.log(`trace_api, ${height}, ${end - start}`);

    height++;

    if (height < end_height) {
        getBlockTrace(resolve, reject, height);
    } else {
        return resolve();
    }
}

// Perform all tests
const runScript = async () => {
    await new Promise((r, j) => getBlockChain(r, j, start_height));
    await new Promise((r, j) => getBlockTrace(r, j, start_height));
};

runScript();