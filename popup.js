document.addEventListener('DOMContentLoaded', function () {
    var checkForUserMediaButton = document.getElementById('checkUserMediaButton');
    checkForUserMediaButton.addEventListener('click',
        function () {
        if (hasGetUserMedia()) {
            alert("getUserMedia() is supported by your browser");
            getMediaSourcesAvailable();
            
        } else {
            alert("getUserMedia() is not supported by your browser");
        } });
}, false);


function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}



function getMediaSourcesAvailable() {
    var devices = navigator.mediaDevices.enumerateDevices();
    devices.then(function (devices) {
        for (var i = 0; i < devices.length; i++) {
            var device = devices[i];
            if (device.kind === 'videoinput') {
                var deviceID = device.deviceId;
                var label = device.label;
                var deviceDetailsJSON = device.toJSON();
                //var deviceData = "<tr><td>" + deviceID + "</td><td>" + label + "</td></tr>";

                var tbodyRef = document.getElementById('mediaSourceTable').getElementsByTagName('tbody')[0];

                // Insert a row at the end of table
                var newRow = tbodyRef.insertRow();

                // Insert a cell at the end of the row
                var deviceIdCell = newRow.insertCell();
                // Append a text node to the cell
                var deviceIdText = document.createTextNode(deviceID);

                deviceIdCell.appendChild(deviceIdText);

                var deviceLabelCell = newRow.insertCell();
                var deviceLabelText = document.createTextNode(label);
                deviceLabelCell.appendChild(deviceLabelText);

                var deviceJSONCell = newRow.insertCell();
                var deviceJSONCellText = document.createTextNode(deviceDetailsJSON);
                deviceJSONCell.appendChild(deviceJSONCellText);
            }
        };
    });
}