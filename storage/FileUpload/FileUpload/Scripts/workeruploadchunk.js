debugger;
var webapiUrl = self.location.origin + "/" + self.location.href.split("/")[3] + "/api/Helper/UploadChunk";
var urlcount = 0;
var workerdata = '';
var uploadUrl = '';
var xhrworkerspool = '';

self.onmessage = function (e) {
    debugger;
    workerdata = e.data;
    xhrworkerspool = new XHRWorkerPool(1);

    if (workerdata.chunk != null) {
        if (urlcount >= 0) {
            urlcount = 0;
        }
        if (urlcount == 0) {
            uploadUrl = webapiUrl;
        }
        else {
            uploadUrl = webapiUrl + urlcount
        }

        upload(workerdata.chunk, workerdata.filename, workerdata.directory, workerdata.chunkCount, uploadUrl);
        urlcount++;
    }
}

function XHRWorkerPool(numberofxhr) {
    this.xhrworkerpool = [];
    for (var i = 0; i < numberofxhr; i++) {
        var xhr = new XMLHttpRequest();
        this.xhrworkerpool.push(xhr);
    }
}

XHRWorkerPool.prototype.getWorker = function () {
    var xhr;
    if (this.xhrworkerpool.length > 0) {
        xhr = this.xhrworkerpool.pop();
    }
    else {
        xhr = new XMLHttpRequest();
    }
    return xhr;
}
XHRWorkerPool.prototype.releaseWorker = function (xhr) {
    this.xhrworkerpool.push(xhr);
}
XHRWorkerPool.prototype.terminateWorkers = function () {
    for (var i = 0; i < this.workerpool.length; i++) {
        this.xhrworkerpool[i].abort();
    }
}

function buildFormData(chunk) {

    // Transform the data into a base64 string
    var reader = new FileReaderSync();
    var dataUrl = reader.readAsDataURL(chunk);
    var chunkdata = dataUrl.match(/,(.*)$/)[1];

    // Hard code the boundary
    var boundary = '----12345678wertysdfg';

    // We start a new part in our body's request
    var data = '';
    data += '--' + boundary + '\r\n' + 'Content-Disposition: form-data; name="Slice"; filename="blob"';
    data += '\r\n';

    // We provide the mime type of the file. In this case it is text for base64 encoded file
    data += 'Content-Type: text/html; charset=UTF-8'
    data += '\r\n';

    // There is always a blank line between the meta-data and the data
    data += '\r\n';

    // We append the binary data to our body's request
    data += chunkdata + '\r\n';

    // Once we are done, we "close" the body's request
    data += '--' + boundary + '--';

    reader = null;
    return data;
}

function upload(chunk, filename, directory, chunkCount, uploadUrl) {
    var xhr = xhrworkerspool.getWorker();

    xhr.upload.onprogress = function (e) {
    }(chunkCount);

    xhr.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
        }
        else if (this.readyState == 4 && this.status == 415) {
            console.log(this.responseText + workerdata.id);
        }
        else if (this.readyState == 4 && this.status == 413) {
            console.log(this.responseText + workerdata.id);
        }
        else if (this.readyState == 4 && this.status == 500) {
            console.log(this.responseText + workerdata.id);
        }
    };

    xhr.onerror = function (e) {
        console.log(this.statusText);
    };

    xhr.open('POST', uploadUrl + '?filename=' + filename + '&directoryname=' + directory + '&chunkNumber=' + chunkCount.currentNumber + '&numberOfChunks=' + chunkCount.numberOfChunks);
    var formData = '';

    if (typeof FormData == "undefined") {

        formData = buildFormData(chunk);

        // Create the form with appropriate header
        xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=----12345678wertysdfg");
        xhr.setRequestHeader("Content-Length", formData.length);
        xhr.setRequestHeader("FileUpload-Encoded", "base64");

    }
    else {
        formData = new FormData();
        formData.append("Slice", chunk);
    }

    xhr.send(formData);
    formData = null;
    xhrworkerspool.releaseWorker(xhr);
}


