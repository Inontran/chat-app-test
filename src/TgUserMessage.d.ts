interface TgUserMessage {
  id: number,
  time: number,
  type: string,
  message: {
    text: string,
    caption: string,
  },
  fromUser: {
    name: string,
  },
  chat: {
    id: string,
    name: string,
    image: string,
  },
}