var webapiGetMergeAllUrl = self.location.origin + "/" + self.location.href.split("/")[3] +"/api/Helper/MergeAll";

self.onmessage = function (e) {
    workerdata = e.data;

    mergeAll(workerdata.filename, workerdata.directory, workerdata.chunkCount)
}

function mergeAll(fileName, directory, chunkCount) {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if (chunkCount.numberOfUploadedChunks == chunkCount.numberOfChunks) {
                var md5hash = this.responseText.split(",");
                self.postMessage({ 'type': 'checksum', 'message': md5hash[1], 'id': workerdata.id });
            }
        }
        else if (this.readyState == 4 && this.status == 400) {
            setTimeout(function () { mergeAll(fileName, directory, chunkCount); }, 5000);
        }
    };

    xhr.open('GET', webapiGetMergeAllUrl + '/?filename=' + fileName + '&directoryname=' + directory + '&numberOfChunks=' + chunkCount.numberOfChunks, false);
    xhr.send(null);
    xhr = null;
}


