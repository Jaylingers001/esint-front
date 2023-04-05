export const PROJECT_APPLICATION_STATUS = {
    CHATTING: 5,
    PROPOSING_CONTRACTOR: 10,
    PROPOSING_ORDERER: 20,
    RESTRICTED: 30,
    WORK_COMPLETED: 40,
    CANCELLED: 60,
    END: 99
}

//0: 非公開, 10:募集中, 20:募集完了, 30:仕事中, 40:仕事完了, 80:キャンセル済み, 99:削除
export const PROJECT_STATUS = {
    PRIVATE: 0,
    LOOKING: 10,
    RECRUITMENT_COMPLETED: 20,
    AT_WORK: 30,
    WORK_COMPLETED: 40,
    CANCELLED: 80,
    DELETED: 99
}

export const LINK_TO_URL = {
    THREADS: 'threads',
    APPLICATIONS: 'applications'
}

export const DUMMY_MESSAGE = "ダミーメッセージです。";

export const PROJECT_APPLICATIONS_STATUS_LABEL = [
    {
        code: 'CHATTING',
        label: 'チャット中',
        value: 5
    },
    {
        code: 'PROPOSING_CONTRACTOR',
        label: '受注者が提案中',
        value: 10
    },
    {
        code: 'PROPOSING_ORDERER',
        label: '発注者が提案中',
        value: 20
    },
    {
        code: 'RESTRICTED',
        label: '成約済',
        value: 30
    },
    {
        code: 'WORK_COMPLETED',
        label: '仕事完了',
        value: 40
    },
    {
        code: 'CANCELLED',
        label: 'キャンセル',
        value: 60
    },
    {
        code: 'END',
        label: '終了',
        value: 99
    },
    {
        code: 'NULL',
        label: 'ヌル',
        value: 0
    }
]

export const DEFAULT_NUMBER_DISPLAY = 20;
export const AUTHENTICATION_CODE = 111111;
export const TEL_MIN_LENGTH = 10;
export const TEL_MAX_LENGTH = 11;
export const INPUT_TEXT_MAX_LENGTH = 20;
export const ORDERER_PRICE_STATUS = 10;
export const STATUS_CODE = 200;
export const Z_INDEX_MAX_LENGTH = 9999;
export const NEGATIVE_NUMBER_ONE = -1;
export const GMO_BANKS = {
    BANK_LEVEL: 1,
    BRANCH_LEVEL: 2
}
