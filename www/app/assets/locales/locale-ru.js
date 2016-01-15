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
        brainkey_backup : 'Backup brainkey',
    wallet_brainkey: 'Wallet brainkey',
    close: 'Close',
    verified: 'verified',
    wallet_created: "Wallet Created",
    import_bts1: "Import from BitShares 0.9.3c",
    import_backup: "Import Backup",
    wallet_name :   "Wallet Name",


home: {
        balances: 'Баланс',
        contacts: 'Контакты ',
        finder: 'FINDER',
        exchange: 'Биржа',
        receive: 'ПОЛУЧИТЬ',
        send: 'ОТПРАВИТЬ',
        transactions: 'Операции',
        date: 'Дата',
        all: 'Все',
        sent: 'Отправлено',
        recd: "Получено",
        to: 'Кому',
        from: 'От',
        amount: 'Сумма',
        asset: 'Актив',
        name: 'Имя',
        account: 'Учетная запись',
        memo: 'Примечание',
        donateToDevs: 'Пожертвовать 2 BTS на поддержку разработчиков BitShares Munich',
        requestSpecificAmount: 'Запрос конкретной суммы (опционально)',
        sharePaymentRequest: 'Отправить платежный запрос',
        inviteFriend: 'Пригласить друга',
        continue: 'Продолжить',
        buy: 'Купить',
        sell: 'Продать',
        cancel: 'Отмена',
        back: 'Назад',
        none: 'нет данных',
        please_wait: 'Пожалуйста, подождите',
        thank_you: 'Спасибо',
        balance: 'Баланс',
        publicKey: 'Открытый ключ',
        privateKey: 'Закрытый ключ',
        yes: 'Да',
        no: 'Нет'



    },
    settings:{
        bitsharesWalletSettings: 'Настройки кошелька BitShares',
        taxableCountry: 'Страна налогообложения',
        preferredLanguage: 'Предпочтительный язык',
        displayDtAs: 'Показывать дату и время как',
        getPricesFrom: 'Получать цены от',
        additionalSettings: 'Дополнительные настройки',
        checkUpdatesStartup: 'Проверить наличие обновлений при запуске',
        autoInstallMajorVer: 'Автоматическая установка новых версий',
        requirePinToOpen: 'Требовать PIN-код при отправке средств',
        autoCloseWalletAfterInactivity: 'Автоматически блокировать кошелек BitShares через 3 минуты бездействия',
        alwaysDonateDevsMunich: 'Всегда отправлять 2 BTS в качестве пожертвования на поддержку разработчиков BitShares Munich (bitshares-munich)',
        allowUse_GpsToFind: 'Разрешить Finder (v2.0), использовать геолокацию, для поиска ближайших банкоматов, лиц и POS систем, принимающих Smartcoins',
        allowReportPosition : 'Разрешить Finder (v2.0), сообщать свое местоположение, для того чтобы другие могли купить у Вас или продать Smartcoins с вашей помощью',
        pinNumber: 'PIN-код',
        createEditPin: 'Задать или сменить 6-значный PIN-код для защиты ваших средств и учетных записей',
        editPin: 'Сменить 6-значный PIN-код для защиты ваших средств и учетных записей',
        secureWithPin: 'Защитить все содержимое кошелька BitShares этим PIN-кодом',
        pinFraudNote: 'Примечание: Если неправильный PIN-код будет введен 3 раза, BitShares кошелек заблокируется, и Вы не сможете его разблокировать в течение 15 минут.',
        backup: 'Резервная копия',
        createEditSeed: 'Задать или сменить мастер-ключ (brain wallet, состоящий из 12 слов)',
        editSeed: 'Сменить мастер-ключ (brain wallet, состоящий из 12 слов)',
        coldStorageSpending: 'Траты из постоянного хранилища', // ????
        importPrivateKey: 'Импорт закрытого ключа и средств на нем при помощи QR кода или буфера обмена.',
        qa: 'Вопросы и Ответы',
        q_sharePublicAddress: 'Вопрос: Как я могу  отправить свой публичный адрес BTS другим лицам?',
        a_sharePublicAddress: 'Ответ: На главном экране, нажмите на QR код, или нажмите и удерживайте на поле BTS адреса.',
        q_accessPrivateKeys: 'Вопрос: Как получить доступ к моим закрытым ключам?',
        a_accessPrivateKeys: 'Ответ: На главном экране, нажмите и удерживайте на изображение "идентикона" учетной записи пользователя, который появляется слева от имени учетной записи пользователя.',
        q_switchAccount : 'Вопрос: Как я могу переключиться на другую учетную запись с главного экрана?',
        a_switchAccount : 'Ответ: Нажмите на маленькую черную стрелку, которая появляется справа от имени вашей учетной записи',
        q_searchTransaction: 'Вопрос: Как мне найти определенную операцию?',
        a_searchTransaction: 'Ответ: Нажмите на заголовок столбца, чтобы отсортировать данные (по возрастанию или убыванию). Фильтр по полю поиска будет добавлен в ближайшее время.',
        about: 'О программе',
        bitsharesMunichDonationRequest: 'BitShares Munich открывает технологии и услуги Smartcoin для инвесторов и бизнеса по всему миру. Пожалуйста, поддержите проект "Кошелек BitShares"", чтобы разработчики могли поддерживать его безопасность, исправлять возможные ошибки и постоянно его совершенствовать. Спасибо!',
        privacy: 'Конфиденциальность',
        tcTitle: 'Условия',
        tcFullText: 'Средства, данные и активы могут быть утеряны при использовании данного ПО. Я не намереваюсь использовать это ПО для нелегальных действий. Баланс и биржевые ставки могут быть недостаточно точными. Ни BitShares Munich, ни BitShares, ни другие организации, участвующие в разработке и поддержке данного ПО, не могут быть привлечены к ответственности за возможные потери. Используйте ПО под свою личную ответстенность. Если вы согласны с этими условиями, нажмите  кнопку “Я согласен” ниже.',
        cancelAndExit: 'Отменить и выйти',
        iAgree: 'Я согласен',
        confirmSendAmount: 'Вы уверены, что хотите отправить nn XX',
        confirmSendAmountRecipient: ' yy?',
        continue: 'Продолжить',
        cancel: 'Отмена',
    },
    backup:{
        create_backup: "Создать резервную копию",
        reset: "Сброс",
        download: "Скачать",
        createBackupPrompt: 'Пожалуйста, создайте резервную копию кошелька, чтобы продолжить',

    },


    unused: {
        import_backup: "Импотрировать резервную копию",
        restore_backup: "Восстановаить резервную копию",
        create_backup_of: "Создать резервную копию (кошелек %(name))",
        title: "Кошелек",
        confirm: "Пароль (подтверджение)",
        password: "Password",
        change_wallet: "Change Wallet",
        wallet_created: "Wallet Created",
        create_wallet: "Create Wallet",
        import_bts1: "Import from BitShares 0.9.3c",
        setup_wallet: "Setup your wallet",
        delete_wallet: "Delete Wallet",
        delete_confirm_line1: "Are you ABSOLUTELY sure?",
        delete_confirm_line2: "Unexpected bad things will happen if you don’t read this!",
        delete_confirm_line3: "This action CANNOT be undone.",
        delete_wallet_name: "Delete Wallet (%(name)s)",
        balance_claims: "Balance Claims",
        name: "Wallet Name",
        create: "Create",
        console: "Wallet Management Console",
        create_backup: "Create Backup",
        backup_brainkey: "Backup Brainkey",
        import_keys: "Import Keys",
        import_keys_tool: "Key Import Tool",
        brainkey: "Brainkey",
        new_wallet: "New Wallet",
        active_wallet: "Active Wallet",
        verified: "Verified",
        verify_prior_backup: "Verify Prior Backup",
        brainkey_not_verified: "This Brainkey is not verified",
        cancel: "Cancel",
        done: "Done",
        invalid_format: "Invalid Format",
        downoad: "Download",
        new_wallet_name: "New Wallet Name",
        wallet_exist: "Wallet exists, choose a new name",
        wallet_exist_with_name: "Wallet (%(name)s) exists, please change the name",

        ready_to_restore: "Ready to Restore",
        restore_wallet_of: "Restore (%(name)s Wallet)",
        restore_success: "Successfully restored (%(name)s) wallet",
        change: "Change (%(name)s Wallet)",
        import_20_notice1: "Import your BTS 2.0+ BACKUP first",
        import_20_notice2: "(if you have one)",
        loading_balances: "Loading balance claims",
        no_balance: "No balance claims",
        claim_balance: "Claim Balance",
        claim_balances: "Claim Balances",
        balance_claim_lookup: "Lookup balances",
        unclaimed: "Unclaimed",
        unclaimed_vesting: "Unclaimed (vesting)",
        no_accounts: "No Accounts",
        brainkey_no_match: "Brainkey does not match, keep going",
        reenter_brainkey: "Re-Enter Brainkey",
        pwd4brainkey: "Enter password to show your brainkey",
        show_brainkey: "Show Brainkey",
        brainkey_w1: "WARNING: Print this out, or write it down.",
        brainkey_w2: "Anyone with access to your recovery key will",
        brainkey_w3: "have access to funds within this wallet.",
        custom_brainkey: "Custom Brainkey (advanced)",
        last_backup: "Last backup",
        never_backed_up: "This Wallet has never been backed up",
        need_backup: "This Wallet needs a backup",
        noneed_backup: "No backup is needed"
    },
    dialog: {
        enterPin: 'Введите PIN-код',
        incorrectPin: 'Неверный PIN-код',
        protectPinMessage: 'Пожалуйста, защитите свой PIN-код',
        fraudAttemptMessage: 'Попытка мошенничества! (3 неверных PIN-кода подряд)'
}


  }
};