require('dotenv').config();
const Keyv = require('keyv');
const KeyvFile = require('keyv-file');
const { Sequilize } = require('sequlize');

class DatabaseUtils {
    constructor() {

        this.store = new Keyv({ store: new KeyvFile() }, { namespace: 'sqlpad' });
        if (process.env.SQL_CONNECTION_STRING) {
            this.sequelizeInstance = new Sequilize(process.env.SQL_CONNECTION_STRING);
        }
    }

    async getUserInput() {
        return Keyv.get('sql_results');
    }

    async runQuery(query) {
        if (this.sequelizeInstance) {
            return this.sequelizeInstance.query(query);
        }
        
        throw new Error("SQL_CONNECTION_STRING needs to be set in environment variables or dotenv file");
    }

    async close() {
        return this.sequelizeInstance.close();
    }
    
}

export default DatabaseUtils;