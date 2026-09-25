let cameraStream = null;
let cameraActive = false;


async function startCamera(videoElement) {

    try {

        cameraStream =
            await navigator.mediaDevices
                .getUserMedia({

                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: "user"
                    },

                    audio: false
                });


        videoElement.srcObject =
            cameraStream;

        cameraActive = true;

        return true;

    } catch (error) {

        console.error(
            "Camera access error:",
            error
        );

        return false;
    }
}


function stopCamera(videoElement) {

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(track => track.stop());

        cameraStream = null;
    }

    videoElement.srcObject = null;

    cameraActive = false;
}


async function toggleCamera(videoElement) {

    if (cameraActive) {

        stopCamera(videoElement);

        return false;
    }

    return await startCamera(videoElement);
}