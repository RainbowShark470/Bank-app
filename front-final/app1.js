// Инициализация массива пользователей
let users = [
    { username: "user1", pin: "1234" },
    { username: "user2", pin: "5678" },
    { username: "user3", pin: "9012" }
  ];
  
  // Получение элементов формы входа
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const pinInput = document.getElementById("pin");
  const loginButton = document.getElementById("login-button");
  
  // Функция для проверки наличия пользователя с указанным именем и пин-кодом
  function validateUser(username, pin) {
    return users.some(user => user.username === username && user.pin === pin);
  }
  
  // Обработчик события для отправки формы входа
  loginForm.addEventListener("submit", event => {
    event.preventDefault();
    const username = usernameInput.value;
    const pin = pinInput.value;
    if (validateUser(username, pin)) {
      // Сохранение информации о пользователе в localStorage или sessionStorage
      const user = { username: username };
      localStorage.setItem("user", JSON.stringify(user));
      // Перенаправление на другую страницу
      window.location.href = "index.html";
    } else {
      alert("Неверное имя пользователя или пин-код!");
    }
  });
  
  // Обработчик события для кнопки "Войти"
loginButton.addEventListener("click", event => {
    event.preventDefault();
    const username = usernameInput.value;
    const pin = pinInput.value;
    const user = users.find(user => user.username === username && user.pin === pin);
    if (user) {
      // Сохранение информации о пользователе в localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Установка таймера для автоматического выхода из системы через 10 минут
      setTimeout(() => {
        localStorage.removeItem("currentUser");
      }, 10 * 60 * 1000); // 10 минут в миллисекундах
      // Перенаправление на другую страницу сайта
      window.location.href = "index.html";
    } else {
      alert("Неверное имя пользователя или пин-код");
    }
  });
  