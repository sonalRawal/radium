const fs = require('fs');
const fastcsv = require("fast-csv");
const logger = require('./logger')
const db = require('./mysql');
const ejsLint = require('ejs-lint');

const createTable = (req, res) => {
    try {
        let sql = 'CREATE TABLE costmer(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))'
        db.query(sql, (err, result) => {
            if (err) logger.err(err);
            else {
                logger.info('table <costmer> created')
                res.send('posts table created...');
            }
        })
    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}

const renderfile = (req, res) => {
    try {
        logger.info('rendering <index.html>')
        res.sendFile(__dirname + '/index.html')
    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}

const uploadFile = (req, res) => {
    try {
        logger.info('post  / exicution start')
        if (req.files) {
            const file = req.files.file
            const fileName = file.name
            logger.debug(`request param req.files : ${fileName}`)
            file.mv('./uploads/' + fileName, (err) => {
                if (err)
                    logger.error(err);
                else
                    logger.debug(`${fileName} file saved in <./uploads/${fileName}`)

            })
            let stream = fs.createReadStream('./uploads/data1.csv');

            let csvData = [];
            let csvStream = fastcsv
                .parse()
                .on("data", function (data) {
                    csvData.push(data);
                })
                .on("end", function () {
                    // remove the first line: header
                    csvData.shift();
                    let query =
                        'INSERT INTO museumcsv(objectID,isHighlight,accessionNumber,accessionYear,isPublicDomain,primaryImage,primaryImageSmall,additionalImages,`constituents.0.constituentID`,`constituents.0.role`,`constituents.0.name`, `constituents.0.constituentULAN_URL`,`constituents.0.constituentWikidata_URL`, `constituents.0.gender`, department,objectName, title, culture, period, dynasty, reign, portfolio, artistRole, artistPrefix,artistDisplayName, artistDisplayBio, artistSuffix, artistAlphaSort, artistNationality,artistBeginDate, artistEndDate, artistGender, artistWikidata_URL, artistULAN_URL,objectDate, objectBeginDate, objectEndDate, medium, dimensions,measurements, creditLine, geographyType, city, state, county, country,region, subregion, locale, locus, excavation, river, classification, rightsAndReproduction,linkResource, metadataDate, repository, objectURL, tags, objectWikidata_URL, isTimelineWork,GalleryNumber, constituents,`measurements.0.elementName`, `measurements.0.elementDescription`, `measurements.0.elementMeasurements.Diameter`) VALUES  ?';
                    db.query(query, [csvData], (error, response) => {
                        if (error) throw error;
                        else {
                            logger.info('data inserted in <museumcsv> table')
                        }
                    });
                });
            stream.pipe(csvStream);
            return res.redirect('/getdata')
        } else {
            logger.info('not found')
            res.send('not found')
        }
    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }


}
const insertData = (req, res) => {
    try {
        let data = req.body
        if (!data) {
            return req.status(400).send('please provide request body')
        }
        let insertedData = []
        for (const key in data) {
            insertedData.push(`${data[key]}`)
        }
        let query =
            'INSERT INTO museumcsv(objectID,isHighlight,accessionNumber,accessionYear,isPublicDomain,primaryImage,primaryImageSmall,additionalImages,`constituents.0.constituentID`,`constituents.0.role`,`constituents.0.name`, `constituents.0.constituentULAN_URL`,`constituents.0.constituentWikidata_URL`, `constituents.0.gender`, department,objectName, title, culture, period, dynasty, reign, portfolio, artistRole, artistPrefix,artistDisplayName, artistDisplayBio, artistSuffix, artistAlphaSort, artistNationality,artistBeginDate, artistEndDate, artistGender, artistWikidata_URL, artistULAN_URL,objectDate, objectBeginDate, objectEndDate, medium, dimensions,measurements, creditLine, geographyType, city, state, county, country,region, subregion, locale, locus, excavation, river, classification, rightsAndReproduction,linkResource, metadataDate, repository, objectURL, tags, objectWikidata_URL, isTimelineWork,GalleryNumber, constituents,`measurements.0.elementName`, `measurements.0.elementDescription`, `measurements.0.elementMeasurements.Diameter`) VALUES (?)';
        db.query(query, [insertedData], (error, response) => {
            if (error) throw error;
            else {
                logger.info('data inserted in <museumcsv> table')
                res.redirect('/getdata')
            }
        });

    } catch (err) {
        logger.error(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}


const getData = (req, res) => {
    try {
        const sql = "select * from museumcsv";
        db.query(sql, (err, response) => {
            if (err) throw err;
            else {
                logger.info('data get from <museumcsv> table')
                res.render('show',{data: response}); 
            }
        });
    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}

const show = (req, res) => {
    res.render('insert')
}

const getDataById = (req, res) => {
    try {
        const id = req.params.id;

        const sql = `select * from museumcsv where objectID = '${id}'`;
        db.query(sql, (err, response) => {
            if (err) throw err;
            else {
                if (response.length == 0) {
                    return res.status(404).send({ msg: "id not exist in DB" })
                }
                logger.info('data get from <museumcsv> table')
                res.send({ data: response })
            }
        });
    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}
const edit = (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from museumcsv where objectID = '${id}'`;
        db.query(sql, (err, response) => {
            if (err) throw err;
            logger.info(`data updated from id ${id}`)
            
            res.render('update',{data: response})
        });

    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }
};
const updateData = (req, res) => {
    try {
        const id = req.params.id;
        if (req.body) {
            const { isHighlight, accessionNumber, accessionYear, isPublicDomain } = req.body
            const updatequery = `update museumcsv set isHighlight = '${isHighlight}', accessionNumber ='${accessionNumber}', accessionYear ='${accessionYear}' , isPublicDomain ='${isPublicDomain}' where objectID = '${id}'`;

            db.query(updatequery, (err, response) => {
                if (err) throw err;
                logger.info(`data updated from id ${id}`)
                
                res.redirect('/getdata')
            });
        } else {
            res.status(400).send({ status: false, msg: 'povide update data in request body' })
        }

    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }


}
const deleteByID = (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from museumcsv where objectID = '${id}'`;
        db.query(sql, (err, response) => {
            if (err) logger.error(err);
            else {
                if (response.length == 0) {
                    return res.status(404).send({ msg: "id not available in DB for delete"})
                }

                const deletequery = `delete from museumcsv where objectID = '${id}'`;
                db.query(deletequery, (err, response) => {
                    if (err) throw err;
                    logger.info(`data deleted from id ${id}`)
                    
                    res.redirect('/getdata')
                });
            }
        })

    } catch (err) {
        logger.err(err)
        res.status(500).send("Something Went Wrong !!!");
    }

}


module.exports = { createTable, renderfile, uploadFile, insertData, getData, getDataById, updateData, deleteByID, show, edit }