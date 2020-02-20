importScripts('../Scripts/spark-md5.js');

var LARGE_FILE = 500 * 1024 * 1024;
var workerdata = '';

// 1MB chunk sizes. The default
var BYTES_PER_CHUNK = 1 * 1024 * 1024;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function processFile(blob) {

    var SIZE = blob[0].size;

    var Total_Number_of_Chunks = Math.ceil(blob[0].size / BYTES_PER_CHUNK);

    var chunkCount = {

        currentNumber: 1,
        numberOfChunks: Total_Number_of_Chunks,
        numberOfUploadedChunks: 0,
        starttime: new Date()
    };

    var start = 0;
    var end = BYTES_PER_CHUNK;

    var fileReader = new FileReaderSync();
    var spark = new SparkMD5.ArrayBuffer();

    while (start < SIZE) {


        var chunk = blob[0].slice(start, end);

        // Read the chunk into another variable to calculate the checksum
        var chunk1 = fileReader.readAsArrayBuffer(chunk);
        spark.append(chunk1);

        // Send the chunk back to the parent
        self.postMessage({ 'type': 'upload', 'filename': blob[0].name, 'blob': chunk, 'chunkCount': chunkCount, 'id': workerdata.id });

        chunkCount.currentNumber++;
        chunkCount.numberOfUploadedChunks++;

        start = end;
        end = start + BYTES_PER_CHUNK;

        if (chunkCount.numberOfUploadedChunks == chunkCount.numberOfChunks) {

            var md5hash = spark.end();
            self.postMessage({ 'type': 'checksum', 'message': md5hash.toUpperCase()});

            self.postMessage({ 'type': 'merge', 'filename': blob[0].name, 'chunkCount': chunkCount});
        }
    }

}

self.onmessage = function (e) {

    workerdata = e.data;

    // Start processing the file
    processFile(workerdata.files);

}
