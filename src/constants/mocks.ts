const REPORT_CONTENT_MOCK = JSON.stringify({
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Это мой первый отчёт",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 4,
      },
      content: [
        {
          type: "text",
          text: "Главные ошибки",
        },
      ],
    },
    {
      type: "orderedList",
      attrs: {
        start: 1,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Нельзя оставлять много пустого пространства в отчёте - МИНУС БАЛЛ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Правильно расставлять знаки препинания - МИНУС БАЛЛ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: "left",
              },
              content: [
                {
                  type: "text",
                  text: "Знак умножение это не * - МИНУС БАЛЛ",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: "left",
        level: 4,
      },
      content: [
        {
          type: "text",
          text: "О чём важно помнить",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Услуга вкладывается в заявку, а заявка в услугу.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "8 минут, время пошло.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "За языком-то надо следить.",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "Делать нормально.",
        },
      ],
    },
  ],
});

export const REPORTS_MOCK = [
  {
    id: 1,
    owner: "Grevtsov Mark",
    sendedTime: new Date(),
    recievedTime: new Date(),
    payload: REPORT_CONTENT_MOCK,
    status: "SUCCESS",
    file: [],
  },
  {
    id: 2,
    owner: "Ayushiev Timur",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: REPORT_CONTENT_MOCK,
    status: "SUCCESS",
    file: [],
  },
  {
    id: 3,
    owner: "Talankina Varvara",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "ERROR",
    file: [],
  },
  {
    id: 4,
    owner: "Kabanets Vladimir",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "PENDING",
    file: [],
  },
  {
    id: 5,
    owner: "Grevtsov Mark",
    sendedTime: new Date(),
    recievedTime: new Date(),
    payload: "Lorem ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 6,
    owner: "Ayushiev Timur",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 7,
    owner: "Talankina Varvara",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "ERROR",
    file: [],
  },
  {
    id: 8,
    owner: "Kabanets Vladimir",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "PENDING",
    file: [],
  },
  {
    id: 9,
    owner: "Grevtsov Mark",
    sendedTime: new Date(),
    recievedTime: new Date(),
    payload: "Lorem ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 10,
    owner: "Ayushiev Timur",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "karina ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 11,
    owner: "Talankina Varvara",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "ERROR",
    file: [],
  },
  {
    id: 12,
    owner: "Kabanets Vladimir",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "PENDING",
    file: [],
  },
  {
    id: 13,
    owner: "Grevtsov Mark",
    sendedTime: new Date(),
    recievedTime: new Date(),
    payload: "Lorem ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 14,
    owner: "Ayushiev Timur",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "SUCCESS",
    file: [],
  },
  {
    id: 15,
    owner: "Talankina Varvara",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Lorem ipsum dolorem sit amet",
    status: "ERROR",
    file: [],
  },
  {
    id: 16,
    owner: "Kabanets Vladimir",
    sendedTime: new Date(),
    recievedTime: undefined,
    payload: "Karina dolorem sit amet",
    status: "PENDING",
    file: [],
  },
];
