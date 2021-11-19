const axios = require('axios').default;
// var excel = require('excel4node');
// var workbook = new excel.Workbook();
// var worksheet = workbook.addWorksheet('Sheet 1');

// const xlsx = require("xlsx");
// const spreadsheet = xlsx.readFile('./Props.xlsx');
// const sheets = spreadsheet.SheetNames;
// const firstSheet = spreadsheet.Sheets[sheets[0]]; //sheet 1 is index 0


(async () => {

    let urls = ["https://sf77-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/7014874309772528390.mp3", "https://sf77-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/7014523753476754181.mp3"]

    var data = {
        'api_token': '84e523fa07ed70ddcbc9e909e60e7968',
        'url': urls,
        'return': 'apple_music,spotify',
    };

    let sendPostRequest = async () => {
        try {
            const resp = await axios.post('https://api.audd.io/', data);
            console.log(resp.data)
            return item
        } catch (err) {
            console.log(error)
        }
    };
    sendPostRequest()
})()

