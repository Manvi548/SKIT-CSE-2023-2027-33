const emotionEmojis = {

    Happy: "😊",

    Neutral: "😐",

    Sad: "😢",

    Angry: "😠",

    Surprise: "😲",

    Fear: "😨"
};


function updateAnalysis(result) {

    const emotion =
        result.emotion;

    const confidence =
        Number(result.confidence)
            .toFixed(1);


    const emotionElement =
        document.getElementById(
            "mainEmotion"
        );


    const confidenceElement =
        document.getElementById(
            "mainConfidence"
        );


    const faceElement =
        document.getElementById(
            "mainFace"
        );


    if (emotionElement) {

        emotionElement.textContent =
            emotion;
    }


    if (confidenceElement) {

        confidenceElement.textContent =
            `Confidence: ${confidence}%`;
    }


    if (faceElement) {

        faceElement.textContent =
            emotionEmojis[emotion]
            || "🙂";
    }


    if (result.scores) {

        Object.entries(
            result.scores
        ).forEach(
            ([name, score]) => {

                const id =
                    name.toLowerCase();


                const bar =
                    document.getElementById(
                        `${id}Bar`
                    );


                const value =
                    document.getElementById(
                        `${id}Value`
                    );


                if (bar) {

                    bar.style.width =
                        `${score}%`;
                }


                if (value) {

                    value.textContent =
                        `${Number(score).toFixed(1)}%`;
                }

            }
        );
    }
}