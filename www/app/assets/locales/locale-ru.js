module.exports = {

languages: {

        en: 'Английский (EN)',
        de: 'Немецкий (DE)',
        es: 'Испанский (ES)',
        fr: 'Французский (FR)',
        sk: 'Словацкий (SK)',
        fi: 'Финский (Fi)',
        bg: 'Болгарский (BG)',
        ja: 'Японский (JA)',
        zh: 'Китайский (ZH; упрощенный, mandarin)',
        hi: 'Индийский (Hi)',
        tr: 'Турецкий (TR)',
        hr: 'Хорватский (HR)',
        el: 'Греческий (EL)',
        it: 'Итальянский (IT)',
        pl: 'Польский (PL)',
        bs: 'Боснийский (BS)',
        ro: 'Румынский (RO)',
        sr: 'Сербский (SR)',
        ar: 'Арабский (AR)',
        sq: 'Албанский (SQ)',
        hu: 'Венгерский (HU)',
        ru: 'Русский (RU)'
 },

  wallet: {

    switch_language: 'Выбрать язык: ',
    // additional
    existing_password: "Существующий PIN",
    verify: "Проверить",
    enter_password: "Введите PIN",
    reset: "Сброс",
    //change_password: "Change PIN",
    accept: "Подтвердить",
    transaction_sent: "Отправлено",
    transaction_to: "Кому",
    transaction_op: "Все",
    transaction_info: "Info",
    transaction_date: "Date",
    transaction_fee: "Комиссия",
    transaction_from: "От",
    transaction_amount: "Сумма",
    was_reg_account: "registered by",
    fraudAttemptMessage: 'Попытка мошенничества! (3 неверных PIN-кода подряд)', // дубликат
    sync_block: "Блок #",
    transfer_available: 'доступно',
    settings_hideDonations : 'Не показывать пожертвования разработчикам в списке операций',
    account_name : 'Учетная запись',
    account_name_is_taken: 'Учетная запись с таким именем уже существует',
    account_not_found: 'Учетная запись не найдена',
    enter_valid_account_name : "Пожалуйста, введите корректное имя учетной записи",
    account_premium_name_warn: "Это премиальное имя учетной записи. Они дорогостоящие и не могут быть зарегистрированы бесплатно обычным пользователем. Попробуйте выбрать имя, содержащее одно и более тире, цифру, или не содержащее гласных",
    reset: 'Сброс',
    done: 'Готово',


home: {
balances: "БАЛАНСЫ",
contacts: "КОНТАКТЫ",
finder: "FINDER",
exchange: "ОБМЕН",
receive: "ПОЛУЧИТЬ",
send: "ОТПРАВИТЬ",
balances: "Балансы",
transactions: "Операции",
date: "Дата",
all: "Все",
sent: "Отправлено",
recd: "Получено",
to: "Кому",
from: "От",
amount: "Сумма",
asset: "Актив",
name: "Имя",
account: "Аккаунт",
memo: "Примечание",
donateToDevs: "Пожертвовать 2 BTS на поддержку разработчиков BitShares Munich",
hideDonations: "Не показывать пожертвования на домашнем экране списка операций",
requestSpecificAmount: "Запрос конкретной суммы (опционально)",
sharePaymentRequest: "Отправить этот запрос на платеж",
inviteFriend: "Пригласить друга",
buyLifetimeAnnual: "Приобрести пожизненную или годовую подписки",
continue: "Продолжить",
buy: "Купить",
sell: "Продать",
cancel: "Отмена",
back: "Назад",
none: "Никто",
please_wait: "Пожалуйста, подождите",
thank_you: "Спасибо",
balance: "Баланс",
publicKey: "Открытый ключ",
privateKey: "Секретный ключ",
yes: "Да",
no: "Нет",

}, settings: {
bitsharesWalletSettings: "Настройки бумажника BitShares",
taxableCountry: "Страна налогообложения",
preferredLanguage: "Предпочитаемый язык",
displayDtAs: "Показывать дату и время как",
getPricesFrom: "Получать цены от",
additionalSettings: "Дополнительные настройки",
checkUpdatesStartup: "Проверить наличие обновлений при запуске",
autoInstallMajorVer: "Автоматическая установка новых версий",
requirePinToSend: "Требовать PIN-код, при отправке средств",
autoCloseWalletAfterInactivity: "Автоматически блокировать бумажник BitShares через 3 минуты бездействия",
searchTransactions: "Поиск операции",
exportTransactionsTo: "Экспорт операции в:",
alwaysDonateDevsMunich: "Всегда отправлять 2 BTS как пожертвование на поддержку разработчиков BitShares Munich (bitshares-munich)",
allowUse_GpsToFind: "Разрешить Finder (v2.0), использовать геолокацию, для поиска ближайших банкоматов, людей и POS систем принимающих Smartcoins",
allowReportPosition : "Разрешить Finder (v2.0), сообщать свое местоположение, для того чтобы другие могли купить у Вас или продать Вам Smartcoins",
pinNumber: "PIN-код",
createEditPin: "Задать или сменить 6-значный PIN-код для защиты ваших средств и аккаунтов",
editPin: "Сменить 6-значный PIN-код для защиты ваших средств и аккаунтов",
secureWithPin: "Защитить весь бумажник BitShares этим PIN-кодом",
pinFraudNote: "Примечание: Если неправильный PIN-код будет введен 3 раза, BitShares кошелек заблокируется, и Вы не сможете его разблокировать в течение 15 минут.",
backup: "Резервная копия",
promprtForMonthlyBackup: "Подтверждение создания ежемесячной резервной копии",
createEditSeed: "Задать или сменить мастер-ключ (brain wallet состоящий из 12 слов)",
editSeed: "Сменить мастер-ключ (brain wallet состоящий из 12 слов)",
coldStorageSpending: "Траты из холодного хранилища",
importPrivateKey: "Импорт секретного ключа и средств на нем при помощи QR кода или буфера обмена.",
qa: "Вопросы и Ответы",
q_sharePublicAddress: "Вопрос: Как я могу кому-то сообщить свой публичный адрес BTS?",
a_sharePublicAddress: "Ответ: На главном экране, нажмите на QR код или нажмите и удерживайте на поле BTS ... адреса.",
q_accessPrivateKeys: "Вопрос: Как получить доступ к моим секретным ключам?",
a_accessPrivateKeys: "Ответ: На главном экране, нажмите и удерживайте на поле аккаунта пользователя, которое появляется слева от имени аккаунта пользователя.",
q_switchAccount : "Вопрос: Как я могу переключиться на другой аккаунт с главного экрана?",
a_switchAccount : "Ответ: Нажмите на маленькую черную стрелку, которая появляется справа от имени аккаунта пользователя.",
q_searchTransaction: "Вопрос: Как мне найти конкретную операцию?",
a_searchTransaction: "Ответ: Нажмите на заголовок столбца, чтобы отсортировать данные (по возрастанию или убыванию). Поле поиска будет добавлено в ближайшее время.",
about: "О программе",
bitsharesMunichDonationRequest: "BitShares Munich открывает технологии и услуги Smartcoin для инвесторов и бизнеса по всему миру. Пожалуйста, поддержите проект бумажника BitShares чтобы разработчики могли поддерживать его безопасность, исправлять возможные ошибки и постоянно его совершенствовать. Спасибо!",

privacy: "Конфиденциальность",
tcTitle: "Условия",
cancelAndExit: "Отменить и выйти",
iAgree: "Я согласен",
confirmSendAmount: "Вы уверены, что хотите отправить nn XX",
confirmSendAmountRecipient: "для yy?",
continue: "Продолжить",
cancel: "Отмена",

}, dialog: {
enterPin: "Введите PIN",
incorrectPin: "Неверный PIN",
protectPinMessage: "Пожалуйста, защитите свой PIN-код",
fraudAttemptMessage: "Попытка мошенничества! (3 последовательных неправильных PIN-кода)",
}



  }
};