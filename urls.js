const argv = process.argv;
const axios = require('axios')
const fs = require('fs')

function getDomainName(url){
    let domain;
    try{
        domain = (new URL(url))
        domain = domain.hostname.replace('www.', '')
    }
    catch (err){
        console.error(err)
    }
    return domain
}

function writeHtmlToFile(fileName, content){
    fs.writeFile(`${fileName}.txt`, content, err => {
        if (err) {
            console.log(`${fileName}.txt failed to be written due to ${err}`)
        }
        console.log(`Wrote to ${fileName}`)
    });
}

function getUrlContentAndWriteToFile(arrayOfUrls){
    // Potential errors?- empty array, url is invalid, request failed?, getdomain failed, writefile failed
    arrayOfUrls.forEach(url => axios.get(url)
    .then(resp => writeHtmlToFile(getDomainName(url), resp.data))
    .catch(err => console.log(`Could not get data from ${url} due to ${err}`)))
}

function extractUrlsFromTextFile(file){
    let arrayOfUrls = [];
    try{
        const allFileContents = fs.readFileSync(`${file}`, 'utf-8');
        allFileContents.split(/\r?\n/).forEach(line =>  {
            if(line !== ''){
                arrayOfUrls.push(line)
            }
        });
    }
    catch (err){
        throw `Problem parsing text file. ${err}`
    }
    return arrayOfUrls
}

try{
    let urlArray = extractUrlsFromTextFile(argv[2])
    getUrlContentAndWriteToFile(urlArray)
}
catch (err) {
    console.log(`${err}`)
}
