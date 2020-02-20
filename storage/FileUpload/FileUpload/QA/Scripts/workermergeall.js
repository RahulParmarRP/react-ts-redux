// Url for WebAPI functions
var webapiGetMergeAllUrl = "../api/Helper/MergeAll";

function mergeall(filename,directory, chunkCount)
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            if (chunkCount.numberOfUploadedChunks == chunkCount.numberOfChunks) {
                var endtime = new Date();
                var timetaken = new Date();
                var timetaken = (((endtime.getTime() - chunkCount.starttime.getTime()) / 1000) / 60);
                var md5hash = this.responseText.split(",");
                self.postMessage({ 'type': 'checksum', 'message': md5hash[1], 'id': workerdata.id });

            }
        }

        if (this.readyState == 4 && this.status == 400) {
            setTimeout(function () { mergeall(filename,directory, chunkCount); }, 5000);
        }
    };

    xhr.open('GET', webapiGetMergeAllUrl + '/?filename=' + filename + '&directoryname=' + directory + '&numberOfChunks=' + chunkCount.numberOfChunks, false);
    xhr.send(null);
    xhr = null;

}

self.onmessage = function(e)
{
    workerdata = e.data;

    mergeall(workerdata.filename, workerdata.directory, workerdata.chunkCount)
}
