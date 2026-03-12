const fs = require('fs');
const xml2js = require('xml2js');
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "securin",
  password: "9833",
  port: 5432,
});

async function processXmlAndStore() {
    const xmlFilePath = './data/test.xml';
    const parser = new xml2js.Parser({ explicitArray: false });

    try {
        const xmlString = fs.readFileSync(xmlFilePath, 'utf8');
        const jsonData = await parser.parseStringPromise(xmlString);

        const items = jsonData['cpe-list']['cpe-item'];
        const xmldata = Array.isArray(items) ? items : [items];

        const client = await pool.connect();

        try {
            for (const data of xmldata) {
                const cpe_title = typeof data.title === 'object' ? data.title._ : data.title;

                const cpe_22_uri = data.$ ? data.$.name : null;

                const cpe_23_item = data['cpe-23:cpe23-item'];
                const cpe_23_uri = cpe_23_item ? cpe_23_item.$.name : null;

                let reference_links = [];
                if (data.references && data.references.reference) {
                    const refs = Array.isArray(data.references.reference) ? data.references.reference : [data.references.reference];
                    reference_links = refs.map(ref => ref.$.href);
                }

                const insertQuery = `
                    INSERT INTO xmldata (cpe_title, cpe_22_uri, cpe_23_uri, reference_links, cpe_22_deprecation_date, cpe_23_deprecation_date)
                    VALUES ($1, $2, $3, $4, $5, $6)
                `;

                const values = [cpe_title, cpe_22_uri, cpe_23_uri, reference_links, null, null];

                await client.query(insertQuery, values);
            }

            console.log(`Successfully processed ${xmldata.length} items.`);

        } catch (e) {
            console.error('Error during database operation:', e);
            throw e;
        } finally {
            client.release();
        }

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await pool.end();
    }
}

processXmlAndStore();
