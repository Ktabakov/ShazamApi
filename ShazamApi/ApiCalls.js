const axios = require('axios').default;
var excel = require('excel4node');
var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('Sheet 1');

const xlsx = require("xlsx");
const spreadsheet = xlsx.readFile('./AllMusicUrls.xlsx');
const sheets = spreadsheet.SheetNames;
const firstSheet = spreadsheet.Sheets[sheets[0]]; //sheet 1 is index 0


(async () => {

    let musicMP3 = [];
    let links = [];
    let items = [];

    for (let i = 2; ; i++) {
        const firstColumn = firstSheet['A' + i];
        if (!firstColumn) {
            break;
        }
        musicMP3.push(firstColumn.h);
    }
    for (let i = 2; ; i++) {
        const firstColumn = firstSheet['B' + i];
        if (!firstColumn) {
            break;
        }
        links.push(firstColumn.h);
    }

    for (let index = 0; index < musicMP3.length; index++) {
        if (musicMP3[index].toLowerCase().includes("error") || musicMP3[index] == undefined){
            let item = {
                artist: "error",
                title: "error",
                label: "error"
            }
            items.push(item);
            continue;
        }
        var data = {
            'api_token': '****************************',
            'url': musicMP3[index],
            'return': 'apple_music,spotify',
        };

        let sendPostRequest = async () => {
            try {
                const resp = await axios.post('https://api.audd.io/', data);
                console.log(`Fetch ${index}`)
                console.log(resp.data.result)
                let item = {
                    artist: resp.data.result.artist,
                    title: resp.data.result.title,
                    label: resp.data.result.label
                }
                return item
            } catch (err) {
                let item = {
                    artist: "error",
                    title: "error",
                    label: "error"
                }
                return item
            }
        };
        items.push(await sendPostRequest())
    }
    const outputFields = [
        "musicMP3",
        "links",
        "title",
        "label",
        "artist"
    ]

    for (let i = 0; i < outputFields.length; i++) {
        worksheet.cell(1, i + 1).string(outputFields[i])
    }
    for (let index = 0; index < items.length; index++) {
        let item = items[index];
        if (item.title) {
            worksheet.cell(index + 2, 1).string(musicMP3[index])
            worksheet.cell(index + 2, 2).string(links[index])
            worksheet.cell(index + 2, 3).string(item.title)
            worksheet.cell(index + 2, 4).string(item.label)
            worksheet.cell(index + 2, 5).string(item.artist)
        } else {
            worksheet.cell(index + 2, 2).string(links[index])
            worksheet.cell(index + 2, 3).string("error")
        }
    }

    workbook.write('Result.xlsx')
    console.log('Done!')
})()

