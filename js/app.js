document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNavigation();

        initializeApplication();

    }
);


function initializeNavigation() {

    const links =
        document.querySelectorAll(
            "nav a"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                links.forEach(item =>
                    item.classList.remove(
                        "active"
                    )
                );

                link.classList.add(
                    "active"
                );

            }
        );

    });
}


function initializeApplication() {

    console.log(
        "EmotionSense AI frontend initialized"
    );

}