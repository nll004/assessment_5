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
        return
    }
    return domain
}

function writeHtmlToFile(fileName, content){
    fs.writeFile(`${fileName}.txt`, content, err => {
        if (err) {
            console.log(`${fileName} was not written to file`)
            console.error(err);
        }
        console.log(`Wrote to ${fileName}`)
    });
}

function getUrlContentAndWriteToFile(arrayOfUrls){
    arrayOfUrls.forEach(url => axios.get(url)
        .then(resp => writeHtmlToFile(getDomainName(url), resp.data)))
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
    console.log(`Please enter a valid file. ${err}`)
}
