// Инициализация массива счетов
let accounts = [];

// Получение элементов формы
const nameInput = document.getElementById("name");
const balanceInput = document.getElementById("balance");
const createAccountButton = document.getElementById("create-account");

// Получение элемента списка счетов
const accountsList = document.getElementById("accounts");

// Функция для создания нового счета
function createAccount(name, balance) {
  const account = {
    id: accounts.length + 1,
    name: name,
    balance: balance,
    transactions: []
  };
  accounts.push(account);
  return account;
}

// Функция для вывода списка счетов
function renderAccounts() {
  accountsList.innerHTML = "";
  accounts.forEach(account => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>Имя: ${account.name}</div>
      <div>Баланс: USD$ <br> ${account.balance}</div>
      <button class="deposit" data-id="${account.id}">Пополнить</button>
      <button class="withdraw" data-id="${account.id}">Снять</button>
      <button class="delete" data-id="${account.id}">Закрыть счет</button>
    `;
    accountsList.appendChild(li);
  });
}

// Функция для создания транзакции
function createTransaction(accountId, type, amount) {
  const account = accounts.find(account => account.id === accountId);
  if (type === "deposit") {
    account.balance += amount;
    account.transactions.push({ type: "deposit", amount: amount, date: new Date() });
  } else if (type === "withdraw") {
    if (amount > account.balance) {
      alert("Недостаточно средств на счете!");
      return;
    }
    account.balance -= amount;
    account.transactions.push({ type: "withdraw", amount: amount, date: new Date() });
  }
  renderAccounts();
}

// Обработчик события для отправки формы
createAccountButton.addEventListener("click", event => {
  event.preventDefault();
  const name = nameInput.value;
  const balance = Number(balanceInput.value);
  createAccount(name, balance);
  renderAccounts();
  nameInput.value = ""
  balanceInput.value = "";
});

// Обработчик событий для кнопок Пополнить, Снять и Закрыть счет
accountsList.addEventListener("click", event => {
const target = event.target;
if (target.classList.contains("deposit")) {
const accountId = Number(target.dataset.id);
const amount = Number(prompt("Введите сумму для пополнения:"));
if (isNaN(amount)) {
alert("Некорректная сумма!");
return;
}
createTransaction(accountId, "deposit", amount);
} else if (target.classList.contains("withdraw")) {
const accountId = Number(target.dataset.id);
const amount = Number(prompt("Введите сумму для снятия:"));
if (isNaN(amount)) {
alert("Некорректная сумма!");
return;
}
createTransaction(accountId, "withdraw", amount);
} else if (target.classList.contains("delete")) {
const accountId = Number(target.dataset.id);
const accountIndex = accounts.findIndex(account => account.id === accountId);
accounts.splice(accountIndex, 1);
renderAccounts();
}
});
