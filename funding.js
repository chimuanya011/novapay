// NovaPay Funding Engine V1

const accountName = document.getElementById("accountName");
const accountNumber = document.getElementById("accountNumber");
const fundingBtn = document.getElementById("fundingBtn");

const savedAccount =
localStorage.getItem("novapayAccountNumber");
if (savedAccount) {

    accountNumber.textContent = savedAccount;

    fundingBtn.textContent = "Copy Account Number";

} else {

    accountNumber.textContent = "Not generated yet";

    fundingBtn.textContent = "Generate Funding Account";

} fundingBtn.addEventListener("click", () => {

    if (!savedAccount) {

        const newAccount =
        Math.floor(1000000000 + Math.random() * 9000000000).toString();

        localStorage.setItem(
            "novapayAccountNumber",
            newAccount
        );

        accountNumber.textContent = newAccount;

        fundingBtn.textContent = "Copy Account Number";

        alert("Funding account generated successfully.");

    }

}); 
fundingBtn.addEventListener("click", () => {

    const account =
    localStorage.getItem("novapayAccountNumber");

    if (account) {

        navigator.clipboard.writeText(account);

        alert("Account number copied successfully.");

    }

});
