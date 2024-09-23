import html2canvas from 'html2canvas-pro';

export const takeScreenShotFunc = (elementId, fileName, fileType = 'image/png', backgroundColor = "#000000") => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    html2canvas(element, {
        backgroundColor: backgroundColor
    }).then((canvas) => {
        let image = canvas.toDataURL(fileType); // Correct method is toDataURL
        console.log("Image is:", image);
        const a = document.createElement("a");
        a.href = image;
        a.download = fileName;
        a.click();
    }).catch(err => {
        console.error("Error in taking screenshot:", err);
    });
};