function calculateTipAndShare() {

    const billAmount = parseFloat(document.getElementById("billAmount").value);
    const serviceRating = parseInt(document.getElementById("serviceRating").value);
    const numPeople = parseInt(document.getElementById("numPeople").value);
    const customTip = parseFloat(document.getElementById("customTip").value);

    if (isNaN(billAmount) || billAmount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }

    if (isNaN(serviceRating) || serviceRating < 1 || serviceRating > 10) {
        alert("Please select a valid service rating between 1 and 10.");
        return;
    }

    if (isNaN(numPeople) || numPeople <= 0 || !Number.isInteger(numPeople)) {
        alert("Please enter a valid number of people.");
        return;
    }

    if (!isNaN(customTip) && customTip < 0) {
        alert("Please enter a valid custom tip amount.");
        return;
    }

    const autoTipAmount = (billAmount * (serviceRating )) / 100; 
    const tipAmount = !isNaN(customTip) && customTip >= 0 ? customTip : autoTipAmount; 

    const totalAmount = billAmount + tipAmount;
    const sharePerPerson = totalAmount / numPeople;

    document.getElementById("receiptBillAmount").textContent = `₹${billAmount.toFixed(2)}`;
    document.getElementById("receiptTipAmount").textContent = `₹${tipAmount.toFixed(2)}`;
    document.getElementById("receiptTotalAmount").textContent = `₹${totalAmount.toFixed(2)}`;
    document.getElementById("receiptSharePerPerson").textContent = `₹${sharePerPerson.toFixed(2)}`;


    const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    


    document.getElementById("currentDate").textContent = currentDate;

    document.getElementById("receiptContainer").style.display = "block";
}

document.getElementById("downloadReceiptBtn").addEventListener("click", function () {
    const receiptContainer = document.getElementById("receiptContainer");
    
    // Use html2canvas to capture the receipt as an image
    html2canvas(receiptContainer).then((canvas) => {
        // Convert the canvas to an image
        const imageData = canvas.toDataURL("image/png");
        
        // Create a temporary link to download the image
        const link = document.createElement("a");
        link.href = imageData;
        link.download = "TipReceipt.png"; // Set the filename
        
        // Trigger the download
        link.click();
    });
});

